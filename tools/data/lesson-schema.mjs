// Schema + validator cho "giáo án / phiếu giao nhiệm vụ" của teacher mode (issue #17).
//
// Teacher mode là LỚP DỮ LIỆU + TÀI LIỆU:
//   - KHÔNG sửa engine game, KHÔNG sửa CORE lines (tools/lib/core.mjs),
//   - KHÔNG thu video/ảnh học sinh (mọi báo cáo đều đọc từ màn hình game).
// Mọi kiểm tra đều dựa trên dữ liệu sẵn có của repo:
//   - tools/data/games.mjs     (85 worlds: id, tên, gesture, cluster)
//   - tools/data/standards.mjs (STANDARDS: mạch, nhãn ngắn, khoảng tuần [tuan])
//   - tools/data/clusters.mjs  (errorTag để nhóm lỗi ở màn tổng kết)
//
// Quy ước validate:
//   - validateLesson(plan) -> string[] : mảng LỖI tiếng Việt; rỗng = hợp lệ,
//     có lỗi là tools/build-lesson-plan.mjs từ chối sinh phiếu.
//   - canhBaoGiaoAn(plan) -> string[] : mảng CẢNH BÁO (không chặn sinh phiếu),
//     ví dụ world thuộc cụm thường dạy tuần khác với tuần trong giáo án.

import { GAMES } from './games.mjs';
import { STANDARDS } from './standards.mjs';

const GAME_BY_ID = new Map(GAMES.map((g) => [g.id, g]));

// Môn học suy từ tiền tố id (đúng quy ước đặt id của repo:
// L4-/T5- là Toán lớp 4/5; ST-/MV-/FY- là tiếng Anh Starters/Movers/Flyers).
export function monCuaGame(id) {
  if (/^(L4|T5)-/.test(id)) return 'Toán';
  if (/^(ST|MV|FY)-/.test(id)) return 'Tiếng Anh';
  return null;
}

// Lớp suy từ tiền tố id; game tiếng Anh lấy thêm trường lop trong GAMES.
export function lopCuaGame(id) {
  const g = GAME_BY_ID.get(id);
  if (g && g.lop) return g.lop;
  if (/^L4-/.test(id)) return 4;
  if (/^T5-/.test(id)) return 5;
  return null;
}

// Mô tả schema để tài liệu (docs/TEACHER_MODE.md) và tool khác tái dùng.
export const LESSON_SCHEMA = {
  ten: 'string, bắt buộc — tên giáo án, ví dụ "Ôn tập hàng số — Tuần 1"',
  tuan: 'số nguyên 1–35, bắt buộc — tuần học trong phân phối chương trình',
  mon: '"Toán" | "Tiếng Anh", bắt buộc — phải khớp môn của mọi worldIds',
  lop: '4 | 5, bắt buộc — phải khớp lớp của mọi worldIds',
  worldIds: 'mảng id game không rỗng, bắt buộc — mỗi id phải có trong 85 worlds của catalog',
  skills: 'mảng cụm kiến thức (key trong STANDARDS), tùy chọn — bỏ trống thì tự suy từ worldIds',
  durationMinutes: 'số nguyên 5–45, bắt buộc — tổng thời lượng buổi học (mỗi game ≈ 10 phút/phiên)',
  difficulty: '1 | 2 | 3, bắt buộc — 1=dễ, 2=trung bình, 3=khó (khớp level 1/2/3 trong ngân hàng câu hỏi của game)',
  classSize: 'số nguyên 1–60, bắt buộc — sĩ số lớp để chia lượt (mỗi em ≤ 20 giây chờ theo CORE)',
  ghiChu: 'string, tùy chọn — dặn dò thêm cho buổi học',
};

const laSoNguyen = (v) => typeof v === 'number' && Number.isInteger(v);

// LỖI: có lỗi là phiếu không được sinh.
export function validateLesson(plan) {
  const loi = [];
  if (!plan || typeof plan !== 'object' || Array.isArray(plan)) {
    return ['Giáo án phải là một object JSON.'];
  }
  if (typeof plan.ten !== 'string' || !plan.ten.trim()) {
    loi.push('Thiếu "ten" (tên giáo án, ví dụ "Ôn tập hàng số — Tuần 1").');
  }
  if (!laSoNguyen(plan.tuan) || plan.tuan < 1 || plan.tuan > 35) {
    loi.push('"tuan" phải là số nguyên từ 1 đến 35 (tuần học trong năm học).');
  }
  if (plan.mon !== 'Toán' && plan.mon !== 'Tiếng Anh') {
    loi.push('"mon" phải là "Toán" hoặc "Tiếng Anh".');
  }
  if (plan.lop !== 4 && plan.lop !== 5) {
    loi.push('"lop" phải là 4 hoặc 5.');
  }
  if (!Array.isArray(plan.worldIds) || plan.worldIds.length === 0) {
    loi.push('"worldIds" phải là mảng không rỗng, chứa id game trong catalog (ví dụ "L4-01").');
  } else {
    for (const id of plan.worldIds) {
      const g = GAME_BY_ID.get(id);
      if (!g) {
        loi.push(`"worldIds" có id lạ: "${id}" (không có trong 85 worlds của catalog).`);
        continue;
      }
      const monG = monCuaGame(id);
      if (monG && plan.mon && monG !== plan.mon) {
        loi.push(`"${id}" là game ${monG} nhưng giáo án ghi môn "${plan.mon}".`);
      }
      const lopG = lopCuaGame(id);
      if (lopG && plan.lop && lopG !== plan.lop) {
        loi.push(`"${id}" là game lớp ${lopG} nhưng giáo án ghi lớp ${plan.lop}.`);
      }
    }
  }
  if (plan.skills !== undefined) {
    if (!Array.isArray(plan.skills)) {
      loi.push('"skills" phải là một mảng (hoặc bỏ trống để tự suy từ worldIds).');
    } else {
      for (const s of plan.skills) {
        if (!STANDARDS[s]) {
          loi.push(`"skills" có cụm lạ: "${s}" (không có trong bảng chuẩn STANDARDS).`);
        }
      }
    }
  }
  if (!laSoNguyen(plan.durationMinutes) || plan.durationMinutes < 5 || plan.durationMinutes > 45) {
    loi.push('"durationMinutes" phải là số nguyên từ 5 đến 45 (phút, vừa một tiết học).');
  }
  if (![1, 2, 3].includes(plan.difficulty)) {
    loi.push('"difficulty" phải là 1 (dễ), 2 (trung bình) hoặc 3 (khó).');
  }
  if (!laSoNguyen(plan.classSize) || plan.classSize < 1 || plan.classSize > 60) {
    loi.push('"classSize" (sĩ số) phải là số nguyên từ 1 đến 60.');
  }
  if (plan.ghiChu !== undefined && typeof plan.ghiChu !== 'string') {
    loi.push('"ghiChu" phải là chuỗi văn bản (hoặc bỏ trống).');
  }
  return loi;
}

// CẢNH BÁO: không chặn sinh phiếu, chỉ nhắc cô kiểm tra lại.
export function canhBaoGiaoAn(plan) {
  const cb = [];
  if (!plan || !Array.isArray(plan.worldIds)) return cb;
  const skills = plan.skills && plan.skills.length
    ? plan.skills
    : [...new Set(plan.worldIds.map((id) => GAME_BY_ID.get(id)).filter(Boolean).map((g) => g.cluster))];
  for (const id of plan.worldIds) {
    const g = GAME_BY_ID.get(id);
    if (!g) continue;
    const st = STANDARDS[g.cluster];
    if (st && st.tuan && laSoNguyen(plan.tuan)) {
      const [a, b] = st.tuan;
      if (plan.tuan < a || plan.tuan > b) {
        cb.push(`"${id}" thuộc cụm "${g.cluster}" (${st.ngan}) thường dạy tuần ${a}–${b}, giáo án đặt tuần ${plan.tuan} — cô kiểm tra lại phân phối chương trình.`);
      }
    }
  }
  const cumCuaWorlds = new Set(
    plan.worldIds.map((id) => GAME_BY_ID.get(id)).filter(Boolean).map((g) => g.cluster),
  );
  for (const s of skills) {
    if (!cumCuaWorlds.has(s)) {
      cb.push(`Cụm "${s}" không thuộc world nào trong danh sách — cô kiểm tra lại có chọn nhầm game không.`);
    }
  }
  return cb;
}
