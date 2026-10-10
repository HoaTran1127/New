# Kiểm tra license thư viện (OSS License Audit)

_Ngày audit: 2026-10-10 · Repo: `gemini-canvas-ar-prompts` · Phục vụ issue #16_

Repo này sinh game AR giáo dục dưới dạng **1 file HTML duy nhất**. Ràng buộc CORE (`tools/lib/core.mjs`) quy định: game chỉ được tải **MediaPipe (CDN + model) và font** qua CDN — mọi thư viện khác đều vi phạm ràng buộc này.

---

## 1. Bảng tóm tắt

| Thư viện | Phiên bản repo dùng | License (đã xác minh) | CDN | Khuyến nghị |
|---|---|---|---|---|
| `@mediapipe/tasks-vision` | `1.0.1` (pin trong prompts) | Apache-2.0 | jsDelivr / unpkg / fastly.jsdelivr.net | ✅ DÙNG ĐƯỢC |
| Three.js | `0.160.0` (repo anh em `ar-toan-app`) | MIT | jsDelivr được | ⚠️ DÙNG CÓ ĐIỀU KIỆN |
| Tone.js | (legacy, docs đã chuyển sang Web Audio API) | MIT | jsDelivr được | ❌ KHÔNG NÊN |
| `@mediapipe/hands` (legacy) | tham chiếu trong `src/core/HandTracker.js` | Apache-2.0 | jsDelivr được | ❌ KHÔNG NÊN (đã lỗi thời) |
| `@mediapipe/pose` (legacy) | tham chiếu trong `src/core/PoseTracker.js` | Apache-2.0 | jsDelivr được | ❌ KHÔNG NÊN (đã lỗi thời) |

---

## 2. Chi tiết từng thư viện

### 2.1. `@mediapipe/tasks-vision@1.0.1` — ✅ DÙNG ĐƯỢC

- **License:** Apache-2.0 — xác minh trực tiếp qua npm registry (`license: Apache-2.0`, bản mới nhất tại thời điểm audit là 1.1.0; repo pin 1.0.1).
- **Dùng thương mại / giáo dục:** Được. Apache-2.0 cho phép dùng, sửa, phân phối cả mục đích thương mại.
- **Attribution:** Khi hotlink qua CDN (không tái phân phối code) thì không bắt buộc ghi attribution; nếu vendoring (copy file vào repo) thì phải giữ lại copyright notice + bản sao license theo điều khoản Apache-2.0.
- **Model `.task`** (`hand_landmarker.task`, `pose_landmarker.task` tải runtime từ Google Storage): model card của MediaPipe ghi Apache License 2.0.
- **CDN:** Repo dùng jsDelivr làm chính, `unpkg.com` và `fastly.jsdelivr.net` làm dự phòng. jsDelivr tuyên bố miễn phí, **không giới hạn băng thông**, multi-CDN (Cloudflare + Fastly), file đã cache thì giữ vĩnh viễn kể cả khi gói npm bị xóa — phù hợp production. unpkg không có SLA, đuôi phân phối chậm hơn, có thể bị giới hạn ngầm khi traffic bất thường.
- **Tương thích CORE:** ✅ Đúng thư viện duy nhất CORE cho phép tải qua CDN. Đang dùng 528 lần trong prompts — không cần đổi gì.
- **Nguồn:** npm registry (`registry.npmjs.org/@mediapipe/tasks-vision`), các tài liệu third-party notices độc lập, jsDelivr README, so sánh CDN 2026.

### 2.2. Three.js — ⚠️ DÙNG CÓ ĐIỀU KIỆN

- **License:** MIT — xác minh trực tiếp qua npm registry (`license: MIT`). Cho phép dùng thương mại/giáo dục; điều kiện duy nhất là giữ lại copyright notice + nội dung license trong bản sao.
- **CDN:** Có sẵn trên jsDelivr (`three@0.160.0`), hotlink bình thường, không giới hạn băng thông.
- **Tương thích CORE:** ⚠️ **Vi phạm ràng buộc CORE nếu đưa vào game sinh từ prompt** — CORE chỉ cho tải MediaPipe + font. Hiện Three.js chỉ dùng ở repo anh em `ar-toan-app` (nạp động `three@0.160.0/three.module.js` trong `try/catch`, lỗi thì lùi về 2D) — ở đó dùng hợp lệ vì `ar-toan-app` không chịu ràng buộc "1 file HTML chỉ tải MediaPipe" của repo này.
- **Kết luận:** Giữ nguyên ở `ar-toan-app`; KHÔNG đưa vào prompt game của repo này trừ khi sửa đổi CORE.

### 2.3. Tone.js — ❌ KHÔNG NÊN

- **License:** MIT — xác minh qua file LICENSE.md chính thức trên GitHub Tonejs/Tone.js (Copyright 2014–2025 Yotam Mann) và npm registry (`license: MIT`). Về mặt pháp lý dùng được cho thương mại/giáo dục.
- **Lý do không nên dùng:** (1) Docs của repo đã cập nhật chuẩn (2026-10): **"Tone.js → Web Audio API tự tổng hợp"** — âm thanh arcade hiện tổng hợp trực tiếp bằng Web Audio API, không cần thư viện ngoài, offline 100% (`src/core/AudioManager.js`). (2) **Vi phạm ràng buộc CORE** nếu tải qua CDN trong game sinh ra.
- **Kết luận:** Giữ Tone.js ở trạng thái legacy trong docs; không đưa trở lại game mới.

### 2.4. Các lựa chọn tracking khác (so sánh ngắn)

- **`@mediapipe/hands` (Solution API cũ):** cùng họ MediaPipe → Apache-2.0. Google đã chuyển sang Tasks Vision; docs repo ghi rõ đây là legacy. ❌ Không dùng cho game mới.
- **`@mediapipe/pose` (Solution API cũ):** cùng họ MediaPipe → Apache-2.0; đã lỗi thời, bản kế nhiệm là PoseLandmarker trong Tasks Vision. ❌ Không dùng cho game mới.
- Cả hai vẫn xuất hiện trong `src/core/` của repo (code tham chiếu), không có trong prompts sinh game.

---

## 3. Chính sách CDN (áp dụng chung)

- **jsDelivr:** CDN chính của repo. Miễn phí, không giới hạn băng thông, không tính năng trả phí; multi-CDN (Cloudflare, Fastly) nên uptime cao; file đã phục vụ lần đầu được lưu vĩnh viễn. Hotlink là mục đích sử dụng chính thức — không vi phạm điều khoản.
- **unpkg:** Dùng làm dự phòng. Không có SLA, không cam kết uptime; có thể bị giới hạn ngầm khi traffic bất thường. Không nên làm CDN duy nhất cho lớp học đông.
- **Khuyến nghị cho repo:** giữ thứ tự hiện tại (jsDelivr → unpkg → fastly.jsdelivr.net); pin đúng phiên bản (`@1.0.1`), không dùng range để tránh đổi byte bất ngờ.

---

## 4. Chưa xác minh (theo Definition of Done của issue #16)

- Chưa đọc trực tiếp văn bản Apache-2.0 đi kèm gói `tasks-vision@1.0.1` (kết luận dựa trên metadata npm registry + tài liệu third-party độc lập, chưa mở tarball kiểm tra file LICENSE).
- License model `.task`: dựa trên model card MediaPipe (một nguồn thứ ba ghi trang 2 của model card ghi Apache 2.0) — chưa tải model card gốc đọc trực tiếp trong đợt audit này.
- Font (Google Fonts, CORE cho phép): chưa audit chi tiết license từng font (thường là SIL OFL 1.1).
- Chính sách CDN có thể thay đổi theo thời gian — số liệu trong mục 3 đúng tại ngày audit.
- Không phải tư vấn pháp lý: khi phát hành thương mại quy mô lớn, nên cho pháp chế rà soát lại một lần.

---

## 5. Kết luận

Không có thư viện nào trong diện dùng của repo vi phạm license. Giữ nguyên `@mediapipe/tasks-vision@1.0.1` qua jsDelivr; không đưa Three.js/Tone.js vào game sinh từ prompt khi chưa sửa CORE; hai API MediaPipe legacy giữ ở trạng thái tham chiếu, không dùng cho game mới.
