# Bài 5: Hiệu Ứng Âm Thanh Arcade Với Tone.js

> **⚠️ Cập nhật chuẩn MiTi (2026-10)** — bài này vẫn đúng về ý tưởng, nhưng ba phụ thuộc đã đổi: **Tone.js → Web Audio API tự tổng hợp**, **MediaPipe Hands legacy → MediaPipe Tasks Vision pin `@1.0.1`** (vision_bundle.mjs + wasm + hand_landmarker.task), **Tailwind Play CDN → CSS nội tuyến một khối `<style>`**.
> Bản chuẩn để viết prompt cho Gemini Canvas: `prompts/00-master-canvas-prompt.md` — khung 5 mục (Ý TƯỞNG · MỤC TIÊU HỌC TẬP · RÀNG BUỘC CỐT LÕI · NGÂN HÀNG DỮ LIỆU · TỰ KIỂM TRA), trần 15 KB mỗi prompt. Mọi quy định dùng chung nằm trong 14 dòng `CORE_LINES` ở `tools/lib/core.mjs`; 425 biến thể điều khiển ở `prompts/VARIANTS_425.md`.
> Bài viết dưới đây mô tả kiến trúc cũ (nhiều module `tools/lib/*`, prompt dài hàng trăm KB), nên đọc để hiểu cơ chế chứ không copy cấu trúc. Mã nguồn demo trong `games/` là bản cũ, chưa theo hợp đồng AR này.


## 1. Tại sao không dùng file MP3 tải sẵn?
Khi làm game giáo dục trên web, việc tải 10 - 20 file `.mp3` âm thanh thường dẫn đến các vấn đề:
1. **Độ trễ cao (Latency):** Đấm trúng thẻ rồi nhưng 0.3 giây sau tiếng nổ mới phát ra, làm mất cảm giác "đã tay".
2. **Lỗi tải file (404 / CORS):** Khi đưa lên GitHub Pages hoặc mạng trường học bị chặn tải file âm thanh.
3. **Không linh hoạt:** Không thể tăng cao độ nốt nhạc theo cấp số nhân khi học sinh đạt chuỗi Combo $x2, x3, x4$.

---

## 2. Giải pháp: Tổng hợp âm thanh bằng Tone.js
Thư viện **Tone.js** biến trình duyệt thành một nhạc cụ điện tử (Synthesizer). Mọi âm thanh đều được máy tính tự tính toán dạng sóng và phát ra loa tức thì:

### 2.1. Âm thanh Vung Tay Gió Rít (Whoosh / Slash)
Sử dụng bộ tạo tạp âm hồng (`NoiseSynth` với `noise: pink`):
```javascript
this.slashSynth = new Tone.NoiseSynth({
  noise: { type: 'pink' },
  envelope: { attack: 0.005, decay: 0.09, sustain: 0 }
}).toDestination();

// Phát khi tay vung nhanh:
this.slashSynth.triggerAttackRelease("0.07");
```

### 2.2. Âm thanh Nhặt Tiền Vàng / Trả Lời Đúng Đa Âm (Chord)
Sử dụng bộ tổng hợp đa âm `PolySynth`. Đặc biệt, khi học sinh đạt Combo càng cao, hợp âm phát ra càng hào hùng:
```javascript
playCorrect(combo = 1) {
  // Combo càng cao, các nốt nhạc càng bay bổng
  const notes = combo > 4 
    ? ["C5", "E5", "G5", "C6"]    // Hợp âm Đô trưởng quãng 6 rực rỡ
    : (combo > 2 ? ["E5", "G#5", "B5"] : ["D5", "G5"]);
  this.coinSynth.triggerAttackRelease(notes, "0.18");
}
```

### 2.3. Âm thanh Kính Vỡ (Glass Shatter)
Kết hợp giữa tạp âm trắng (`white noise`) mô phỏng tiếng va đập mạnh và hợp âm nốt cao (`C7, F#7, B7`) mô phỏng tiếng mảnh kính rơi leng keng:
```javascript
this.glassNoise.triggerAttackRelease("0.35");
this.glassChink.triggerAttackRelease(["C7", "F#7", "B7"], "0.3");
```

---

## 3. Lưu ý sống còn: Trình duyệt chặn tự động phát âm thanh (Autoplay Policy)
Các trình duyệt hiện đại (Chrome, Edge, Safari) mặc định khóa không cho trang web phát ra tiếng động cho đến khi người dùng có **ít nhất một hành động tương tác** (Click chuột hoặc Chạm màn hình).
- Vì vậy, ta gọi `await Tone.start()` bên trong sự kiện click vào nút **"BẬT CAMERA & CHIẾN NGAY"**:
  ```javascript
  document.getElementById('btnStartGame').addEventListener('click', async () => {
    await Tone.start();
    console.log("AudioContext đã được mở khóa thành công!");
  });
  ```

---

👉 **Ở bài tiếp theo:** Chúng ta sẽ học cách đưa toàn bộ mã nguồn game lên GitHub và kích hoạt GitHub Pages hoàn toàn miễn phí chỉ trong 2 phút!
