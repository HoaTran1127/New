# Bài 6: Triển Khai Lên GitHub Pages & Chia Sẻ Cho Lớp Học

## 1. Tại sao GitHub Pages là lựa chọn số 1?
1. **Hoàn toàn miễn phí 100%:** Không tốn tiền thuê máy chủ hosting hay tên miền.
2. **Có sẵn chứng chỉ bảo mật HTTPS:** Trình duyệt **bắt buộc phải có HTTPS** mới cho phép mở Camera Webcam của người dùng. GitHub Pages tự động cấp HTTPS miễn phí!
3. **Băng thông mạnh mẽ:** Hàng trăm học sinh trong trường cùng mở một lúc vẫn mượt mà.

---

## 2. Các Bước Đưa Dự Án Lên GitHub

### Bước 1: Khởi tạo và Đẩy code lên GitHub
Mở cửa sổ dòng lệnh (Terminal / PowerShell) tại thư mục dự án và chạy:

```bash
# 1. Khởi tạo Git repository
git init

# 2. Thêm tất cả các file
git add .

# 3. Tạo bản commit đầu tiên
git commit -m "feat: Khởi tạo nền tảng game toán thực tế ảo AR Math Kids"

# 4. Đổi tên nhánh chính thành main
git branch -M main

# 5. Liên kết tới kho lưu trữ GitHub của bạn (thay đường dẫn thật của bạn)
git remote add origin https://github.com/TÊN-GITHUB-CỦA-BẠN/TÊN-REPO.git

# 6. Đẩy code lên
git push -u origin main
```

---

### Bước 2: Kích hoạt GitHub Pages (Chỉ 3 Click chuột)
1. Mở trang Repo của bạn trên website GitHub (ví dụ: `https://github.com/username/math-ar-game`).
2. Bấm vào tab **Settings** (ở thanh menu phía trên).
3. Ở cột bên trái, cuộn xuống chọn mục **Pages**.
4. Tại phần **Build and deployment**:
   - **Source:** Chọn `Deploy from a branch`.
   - **Branch:** Chọn `main`, thư mục `/ (root)`.
5. Bấm nút **Save**.

Sau khoảng 1 đến 2 phút, GitHub sẽ xuất hiện thông báo màu xanh:
> **"Your site is live at https://username.github.io/math-ar-game/"**

---

## 3. Cách Chia Sẻ Cho Học Sinh & Phòng Máy Trường Học
- **Chia sẻ link trực tiếp:** Gửi đường link trên vào Zalo nhóm lớp, Google Classroom hoặc dán vào trình duyệt của phòng máy tính.
- **Tạo mã QR:** Dùng các công cụ tạo mã QR miễn phí (hoặc tính năng tạo mã QR có sẵn trên thanh địa chỉ của trình duyệt Chrome) để in ra giấy hoặc chiếu lên màn hình máy chiếu lớp học. Học sinh hoặc giáo viên chỉ cần quét mã là vào chơi ngay!

---

👉 **Ở bài tiếp theo:** Chúng ta sẽ học cách tái sử dụng Core Engine để xây dựng tiếp các Mini-Game AR mới (như game hứng táo, trắc nghiệm giơ ngón tay...)!
