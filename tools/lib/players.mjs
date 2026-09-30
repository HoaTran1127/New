// Chế độ 1/2/3 người: chọn số người, chia làn, gán làn, hiệu chỉnh, luật làn trống/đông, dự phòng không camera.
// Thay cho CLASSROOM.twoPlayer cũ (một máy hai tay chia đôi). validate.mjs so khớp nguyên văn các chuỗi này,
// nên đổi ở đây phải chạy lại node tools/build.mjs.
//
// Lý do tồn tại: lớp đông mà một máy một em thì quá chậm; nhưng nhận 2N bàn tay cùng lúc thì máy yếu không kham nổi
// và gán tay nhầm người. Vì vậy game không lấy tay làm cơ chế chính chạy PoseLandmarker cho N cơ thể chơi cùng lúc,
// còn game dùng ngón tay theo mục "Cách nhận tay khi 2–3 bạn" (tools/lib/input.mjs): theo lượt hoặc cổ tay.
import { TASKS_VISION } from './ar.mjs';

export const PLAYERS = {
  select:    'Trước ván, màn "Mấy bạn cùng chơi?" có ba nút to 1 · 2 · 3 (mặc định 1, nhớ trong localStorage "miti-players").',
  lanes:     'Chia màn hình thành N làn dọc bằng nhau (N = số người), mỗi làn viền màu riêng (vàng #FFD84D, xanh #4DD2FF, hồng #FF6FB1) kèm nhãn P1/P2/P3 để không phụ thuộc màu; N = 1 thì cả màn là một làn.',
  detector:  'Nhận diện khi N ≥ 2: game không lấy tay làm cơ chế chính dùng PoseLandmarker numPoses = N, mọi em chơi CÙNG LÚC trong làn của mình; game dùng tay/ngón tay theo mục "Cách nhận tay khi 2–3 bạn". N = 1 giữ model theo cơ chế của game.',
  assign:    'Gán làn mỗi khung theo tâm cơ thể = trung điểm hông 23/24 (thiếu hông thì vai 11/12), x đã lật gương: lane = min(N-1, floor(x·N)); không gán theo thứ tự model trả về.',
  action:    'Chỉ ghi nhận động tác (với tay, nghiêng người, bước chân, cổ tay chạm mục tiêu) khi điểm chạm nằm trong làn của chính em; vật thể và đáp án sinh riêng từng làn, đề chung ở dải trên.',
  calibrate: 'Hiệu chỉnh từng làn trước đếm ngược: hướng dẫn "đứng lùi cách màn hình khoảng 2 m, cách nhau một sải tay, thấy cả người"; mỗi làn có ĐÚNG MỘT cơ thể liên tục 1 giây mới hiện "P<n> sẵn sàng"; đủ N làn mới đếm 3-2-1.',
  guard:     'Làn trống quá 2 giây: dừng đồng hồ riêng làn đó, hiện "P<n> quay lại vị trí nhé", làn khác chơi tiếp. Làn có hơn một cơ thể: hiện "Mỗi bạn đứng đúng làn của mình", ngưng ghi nhận làn đó tới khi còn một người.',
  fallback:  'Không camera hoặc bị từ chối quyền: giữ N làn; P1 chạm/chuột trong làn 1 hoặc phím A/S/D, P2 phím mũi tên, P3 phím J/K/L; màn cảm ứng thì mỗi em chạm trong làn của mình.',
};

// Phân loại cơ chế (nguồn duy nhất, test và build-prompts cùng import).
export const POSE_CODES   = ['STEP', 'TWO_HAND_STRETCH', 'TWO_HAND_BALANCE', 'ANGLE_POSE', 'HOLD_POSE'];
export const FINGER_CODES = ['POINT', 'SWIPE', 'PUNCH', 'GRAB', 'DRAG', 'CLAP', 'PINCH', 'FINGER_COUNT'];
export const isFingerGame = (gestures) => FINGER_CODES.includes(gestures[0]);

// Bảng chọn model TRƯỚC nâng cấp (build-prompts.mjs cũ): có bất kỳ mã nào trong danh sách này thì dùng PoseLandmarker,
// còn lại HandLandmarker. Giữ nguyên để N = 1 không đổi model của game nào (vd. L4-07 POINT+TWO_HAND_STRETCH vẫn là pose).
const PRE_UPGRADE_POSE = ['STEP', 'TWO_HAND_STRETCH', 'TWO_HAND_BALANCE', 'ANGLE_POSE'];
const poseAtSolo = (gestures) => gestures.some((x) => PRE_UPGRADE_POSE.includes(x));

// Kế hoạch model theo cơ chế + số người + Input_Mode (dùng để in câu "model:" ở mục Kỹ thuật và để test).
// mode ∈ 'turn' | 'wrist'; bỏ qua khi N = 1 hoặc game không phải Finger_Game.
export function detectorPlan(gestures, n, mode = 'turn') {
  if (n === 1) return poseAtSolo(gestures) ? { pose: 1, hands: 0 } : { pose: 0, hands: 2 }; // như trước nâng cấp (3.2)
  if (!isFingerGame(gestures)) return { pose: n, hands: 0 };                                 // pose đồng thời (3.1, 9.13)
  if (mode === 'wrist') return { pose: n, hands: 0, wrist: [15, 16] };                        // 9.11
  return { pose: n, hands: 2, handLane: 'active', poseEvery: 3 };                             // Turn_Mode (9.6)
}

// Chỉ in cho game có VOICE: Speech API không tách được người nói.
export const VOICE_TURN =
  'Khi chơi 2–3 người: em giơ tay trong làn của mình để giành lượt nói; chỉ người giành lượt mới được chấm câu nói đó.';

// Một câu "model:" duy nhất, sinh từ detectorPlan cho N = 1 và N ≥ 2.
export function modelLine(gestures) {
  const solo = detectorPlan(gestures, 1);
  const soloPart = solo.pose
    ? `N = 1 → ${TASKS_VISION.pose} (PoseLandmarker, numPoses = 1)`
    : `N = 1 → ${TASKS_VISION.hand} (HandLandmarker)`;
  if (!isFingerGame(gestures)) {
    const poseModel = solo.pose ? 'cùng PoseLandmarker' : `${TASKS_VISION.pose} (PoseLandmarker)`;
    return `model: ${soloPart}; N ≥ 2 → ${poseModel} với numPoses = N, không chạy HandLandmarker, mọi em chơi cùng lúc trong làn của mình.`;
  }
  const turn = detectorPlan(gestures, 2, 'turn');
  const wrist = detectorPlan(gestures, 2, 'wrist');
  return (
    `model: ${soloPart}; N ≥ 2 → theo lượt: HandLandmarker numHands = ${turn.hands} chỉ nhận tay trong làn của bạn đang tới lượt, ` +
    `kèm ${TASKS_VISION.pose} (PoseLandmarker) numPoses = N chạy mỗi ${turn.poseEvery} khung hình để giữ luật làn; ` +
    `cổ tay: chỉ PoseLandmarker numPoses = N, cổ tay ${wrist.wrist.join('/')} làm con trỏ trong làn của từng em.`
  );
}
