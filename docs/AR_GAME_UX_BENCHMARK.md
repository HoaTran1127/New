# AR/Webcam Game UX Benchmark — Toán 4 Physical Playground

## Nguồn tham khảo

### Motion Arcade
Pattern đáng học: webcam là controller; mỗi cabinet chọn một vocabulary chuyển động rõ ràng (wave/swipe/pinch/rally); onboarding ngắn; zero-install. Không copy visual identity.

### Move Arcade
Pattern đáng học: phân loại game theo mức vận động như full-body, hands/reflexes, music/rhythm; game loop đơn giản: chọn → bật camera → thực hiện động tác. Điều này phù hợp để trẻ hiểu ngay "mình phải làm gì".

### InclusionGames
Pattern đáng học: camera-powered learning, không controller, setup nhanh, accessibility-first. Với Toán 4 nên giữ upper-body/seated fallback thay vì buộc mọi bé phải có full-body frame.

### SwayJoy
Pattern đáng học: hand tracking 21 landmarks, game phản hồi trực tiếp với gesture; gameplay lấy movement làm controller chính.

### Zlice / các game Fruit Ninja webcam
Pattern đáng học: fingertip tracking + trail + collision + combo. Cần giữ strike pulse/cooldown để tránh false hit.

### Pug's Hunt
Pattern đáng học: một gesture = một hành động rõ ràng (point = aim, pinch = fire). Đây là nguyên tắc quan trọng cho trẻ: không dùng 5 gesture trong cùng một round.

### Embodied AR geometry research
Một nghiên cứu triển khai game AR embodied cho học sinh lớp 4 báo cáo cải thiện hiểu biết hình học từ pre-test đến post-test; phân tích log/gesture cho thấy thời gian ở hoạt động tạo góc có liên hệ với learning gain. Kết luận thiết kế: movement phải phục vụ trực tiếp learning objective, không phải chỉ làm game "đã mắt".

## UX rules rút ra

1. **One move, one meaning.** Ví dụ: POINT = chọn; PUNCH = phá; PINCH = nhặt.
2. **Show the movement before asking the answer.**
3. **Camera framing is part of gameplay.** Có silhouette/zone để bé biết đứng ở đâu.
4. **Feedback < 150 ms cảm nhận.** Correct: burst/chime; wrong: freeze + visual explanation.
5. **Round ngắn, reset nhanh.**
6. **Không phụ thuộc text dài.** Dùng icon + animation + voice-ready copy.
7. **Difficulty tăng bằng cognitive load trước, speed sau.**
8. **Upper-body fallback** khi không thấy chân.
9. **No camera data upload**; chỉ xử lý landmark/client state.
10. **Movement safety:** không yêu cầu chạy khỏi vùng camera, không yêu cầu động tác mạnh gần vật cứng.

## UI layout đề xuất

- Top-left: world + learning objective ngắn.
- Top-center: nhiệm vụ hiện tại.
- Top-right: score/combo/progress.
- Center: playfield lớn, ít chrome.
- Bottom: camera framing + movement hint.
- Khi cần: một "ghost hand/body" minh họa động tác.
- Kết thúc round: 3 thẻ **Đúng / Cần luyện / Động tác** thay vì bảng điểm dài.

## Game loop chuẩn

CAMERA CHECK
→ 3s CALIBRATION
→ MOVEMENT TUTORIAL
→ 30–120s ROUND
→ INSTANT FEEDBACK
→ MINI EXPLANATION
→ RETRY / NEXT
→ MASTERY PROGRESS

## Không nên

- Không để camera video che UI.
- Không dùng hover = answer.
- Không spam particle/animation khi đang học.
- Không cho một round có quá nhiều loại gesture.
- Không dùng leaderboard làm mục tiêu chính cho trẻ.
