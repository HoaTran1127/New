// Hai câu mẫu cho mỗi cụm kiến thức: Gemini bám theo khuôn này để sinh cả ngân hàng dữ liệu.
// Khuôn: { prompt, choices, answer, explanation, errorTag }

export const EXAMPLES = {
  'hang-so': [
    { prompt: 'Số nào có chữ số 7 ở hàng chục nghìn?', choices: ['748 560', '174 560', '480 756'], answer: '748 560', explanation: 'Ở 748 560 chữ số 7 đứng hàng chục nghìn vì đếm từ phải sang: 0-đơn vị, 6-chục, 5-trăm, 8-nghìn, 4-chục nghìn, 7-trăm nghìn. Ờ sai: 174 560 có 7 ở hàng nghìn.', errorTag: 'doc_nham_hang' },
    { prompt: 'Viết số gồm 3 trăm nghìn, 5 chục nghìn, 0 nghìn, 2 trăm, 4 chục, 1 đơn vị.', choices: ['350 241', '352 241', '305 241'], answer: '350 241', explanation: 'Hàng nghìn bằng 0 nên vẫn phải viết chữ số 0 ở vị trí đó: 3-5-0 / 2-4-1.', errorTag: 'thieu_hang_trong' },
  ],
  'so-sanh-sap-xep': [
    { prompt: 'Sắp xếp tăng dần: 65 412 · 65 142 · 6 541 · 654 120', answer: '6 541 < 65 142 < 65 412 < 654 120', explanation: 'Số ít chữ số hơn thì nhỏ hơn. Hai số 5 chữ số có cùng 65 nghìn thì so hàng nghìn: 1 < 4.', errorTag: 'so_sanh_khong_cung_hang' },
    { prompt: 'Chọn dấu đúng: 1 299 999 ... 1 300 001', choices: ['>', '<', '='], answer: '<', explanation: 'So từ trái sang: hàng triệu và trăm nghìn bằng nhau (1, 3), hàng chục nghìn 9 < 0? Không — 1 299 999 có trăm nghìn là 2, còn 1 300 001 có trăm nghìn là 3, nên số trước bé hơn.', errorTag: 'dau_lon_hon_be_hon' },
  ],
  'lam-tron': [
    { prompt: 'Làm tròn 28 653 đến hàng nghìn.', choices: ['28 000', '29 000', '28 700'], answer: '29 000', explanation: 'Chữ số hàng trăm là 6 (>= 5) nên hàng nghìn tăng 28 lên 29, các chữ số sau thành 0.', errorTag: 'quên_lam_tron_khi_bang_5' },
    { prompt: 'Số nào trên tia số được làm tròn thành 40 000?', choices: ['34 500', '39 480', '45 200'], answer: '39 480', explanation: 'Vùng làm tròn về 40 000 là từ 35 000 đến 44 999; 34 500 về 30 000, 45 200 về 50 000.', errorTag: 'doc_thước_sai_vach' },
  ],
  'chan-le': [
    { prompt: 'Số 487 là số chẵn hay số lẻ?', choices: ['Chẵn', 'Lẻ'], answer: 'Lẻ', explanation: 'Chỉ cần nhìn chữ số tận cùng: 7 là số lẻ nên 487 lẻ. Các chữ số phía trước không ảnh hưởng.', errorTag: 'xet_hang_chuc_thay_vi_don_vi' },
    { prompt: 'Tổng 245 + 348 là chẵn hay lẻ?', choices: ['Chẵn', 'Lẻ'], answer: 'Lẻ', explanation: 'Chẵn + lẻ = lẻ. 245 lẻ, 348 chẵn nên tổng lẻ; thử lại: 593.', errorTag: 'tinh_chat_chan_le_nham' },
  ],
  'khoi-luong': [
    { prompt: '3 tấn 5 tạ = ... kg', choices: ['3 500 kg', '350 kg', '30 500 kg'], answer: '3 500 kg', explanation: '1 tấn = 1000 kg nên 3 tấn = 3000 kg; 1 tạ = 100 kg nên 5 tạ = 500 kg. Cộng lại 3500 kg.', errorTag: 'doi_don_vi_thieu_so_0' },
    { prompt: 'So sánh: 2 tạ 60 kg ... 260 kg', choices: ['>', '<', '='], answer: '=', explanation: 'Đổi về cùng đơn vị trước khi so sánh: 2 tạ = 200 kg, cộng 60 kg = 260 kg.', errorTag: 'san_nhau_don_vi_tru_khi_so_sanh' },
  ],
  'dien-tich-don-vi': [
    { prompt: 'Hình chữ nhật 7 cm × 4 cm có diện tích bao nhiêu?', choices: ['28 cm²', '22 cm²', '28 cm'], answer: '28 cm²', explanation: '7 × 4 = 28 ô vuông 1 cm². 22 cm là chu vi (7+4)×2 — đừng nhầm hai đại lượng.', errorTag: 'nham_chu_vi_thanh_dien_tich' },
    { prompt: 'Đếm lưới: hình tô phủ 14 ô vuông 1 cm² và 4 nửa ô. Diện tích?', choices: ['16 cm²', '18 cm²', '14 cm²'], answer: '16 cm²', explanation: '4 nửa ô ghép thành 2 ô nguyên; 14 + 2 = 16 cm².', errorTag: 'dem_o_chuong_lac' },
  ],
  'thoi-gian': [
    { prompt: 'Đồng hồ chỉ kim ngắn giữa số 8 và 9, kim dài chỉ số 6. Là mấy giờ?', choices: ['8 giờ 30 phút', '6 giờ 40 phút', '8 giờ 6 phút'], answer: '8 giờ 30 phút', explanation: 'Kim dài chỉ số 6 nghĩa là 30 phút (mỗi số = 5 phút), không phải 6 phút.', errorTag: 'kim_ngan_kim_dai_nguoc' },
    { prompt: 'Bộ phim bắt đầu 19 giờ 45 phút, kéo dài 1 giờ 25 phút. Kết thúc lúc nào?', choices: ['21 giờ 10 phút', '20 giờ 10 phút', '20 giờ 30 phút'], answer: '21 giờ 10 phút', explanation: '45 + 25 = 70 phút = 1 giờ 10 phút; 19 + 1 + 1 = 21 giờ.', errorTag: 'nham_1gio_60_phut' },
  ],
  'goc': [
    { prompt: 'Góc có số đo 125° là góc gì?', choices: ['Góc tù', 'Góc nhọn', 'Góc bẹt'], answer: 'Góc tù', explanation: 'Góc nhọn < 90°, vuông = 90°, tù trong khoảng 90°–180°, bẹt = 180°.', errorTag: 'nham_goc_tu_goc_nhon' },
    { prompt: 'Thước đo góc chỉ cạnh thứ hai qua vạch 40, cạnh đầu ở vạch 0 bên trong. Số đo góc?', choices: ['40°', '140°', '50°'], answer: '40°', explanation: 'Đọc theo thang đo trùng với cạnh đi qua 0; đọc thang ngược sẽ ra 140°.', errorTag: 'doc_o_vach_ngoai' },
  ],
  'vuong-goc-song-song': [
    { prompt: 'Hai đường không cắt nhau dù kéo dài về hai phía thì quan hệ là?', choices: ['Song song', 'Vuông góc', 'Cắt nhau'], answer: 'Song song', explanation: 'Song song là không bao giờ cắt nhau; vuông góc là cắt nhau tạo góc 90°.', errorTag: 'keo_dai_nghi_la_song_song' },
    { prompt: 'Kẻ đường thẳng đi qua điểm O trên đường d và cắt d tạo góc 90°. Đường đó gọi là?', choices: ['Đường vuông góc với d', 'Đường song song với d', 'Đường chéo'], answer: 'Đường vuông góc với d', explanation: 'Vì đi qua O và cắt d tại góc vuông nên d’ được gọi là đường vuông góc với d.', errorTag: 'qua_tam_dinh_khi_ke' },
  ],
  'cong-tru': [
    { prompt: 'Tính 50 003 − 27 846.', choices: ['22 157', '23 157', '22 257'], answer: '22 157', explanation: 'Ở hàng nghìn phải mượn 1 của hàng chục nghìn rồi mới trừ; 10 − 3 = 7, 9 − 4 = 5, 9 − 8 = 1, 4 − 7 không được nên mượn 5 = 10 → 14 − 7 = 7? Kiểm tra lại theo cột dọc, kết quả 22 157.', errorTag: 'thieu_muon' },
    { prompt: 'Giá trị biểu thức 12 000 − (2 350 + 1 650) là?', choices: ['8 000', '11 000', '6 000'], answer: '8 000', explanation: 'Tính trong ngoặc trước: 2 350 + 1 650 = 4 000, rồi 12 000 − 4 000 = 8 000.', errorTag: 'tinh_trai_thu_tu_khong_co ngoặc' },
  ],
  'nhan': [
    { prompt: 'Tính nhẩm 24 × 11.', choices: ['264', '246', '242'], answer: '264', explanation: '24 × 11 = 2 (2+4) 4 = 264: viết tổng hai chữ số vào giữa.', errorTag: 'nham_11_sai_quy_tac' },
    { prompt: 'Tính 305 × 20.', choices: ['6 100', '610', '6 010'], answer: '6 100', explanation: '305 × 2 = 610, nhân tiếp với 10 → thêm một chữ số 0 ở tận cùng: 6100.', errorTag: 'quen_them_chu_so_0' },
  ],
  'chia': [
    { prompt: '850 : 4 được thương và số dư là?', choices: ['212 dư 2', '213', '212 dư 6'], answer: '212 dư 2', explanation: '8 : 4 = 2; 5 : 4 = 1 dư 1; 10 : 4 = 2 dư 2. Số dư bao giờ cũng nhỏ hơn số chia nên "dư 6" vô lý.', errorTag: 'bo_qua_so_du' },
    { prompt: 'Chia đều 47 quyển vở cho 5 bạn. Mỗi bạn mấy quyển, còn mấy quyển?', choices: ['9 quyển, dư 2', '10 quyển', '7 quyển, dư 12'], answer: '9 quyển, dư 2', explanation: '47 : 5 = 9 dư 2. Không thể chia 10 vì 10 × 5 = 50 > 47; dư 12 vô lý vì 12 > 5.', errorTag: 'thuong_khong_nguyen_to' },
  ],
  'tat-ca': [
    { prompt: 'Biểu thức nào có giá trị bằng 25 × (4 + 6)?', choices: ['25 × 4 + 25 × 6', '25 × 4 + 6', '(25 + 4) × 6'], answer: '25 × 4 + 25 × 6', explanation: 'Tính chất phân phối của phép nhân đối với phép cộng: nhân 25 với từng số hạng rồi cộng lại = 100 + 150 = 250.', errorTag: 'doi_tinh_chat_nham' },
    { prompt: 'Chọn đáp án: 360 : (9 × 4) bằng?', choices: ['10', '16', '90'], answer: '10', explanation: 'Trong ngoặc trước: 9 × 4 = 36, rồi 360 : 36 = 10. Nếu tính 360 : 9 = 40 rồi mới × 4 sẽ sai.', errorTag: 'nhan_sai_thu_tu_thuc_hien' },
  ],
  'bai-toan-nhieu-buoc': [
    { prompt: '5 cái bút hết 45 000 đồng. 8 cái bút cùng loại hết bao nhiêu tiền?', choices: ['72 000 đồng', '56 000 đồng', '80 000 đồng'], answer: '72 000 đồng', explanation: 'Rút về đơn vị: 1 cái = 45 000 : 5 = 9 000 đồng; 8 cái = 9 000 × 8 = 72 000 đồng.', errorTag: 'chon_sai_phep_tinh' },
    { prompt: 'Tổng hai số 96, tỉ số 3 : 5. Số lớn là?', choices: ['60', '36', '48'], answer: '60', explanation: 'Tổng số phần bằng nhau 3 + 5 = 8; một phần = 96 : 8 = 12; số lớn = 12 × 5 = 60.', errorTag: 'thieu_buoc_tinh_tong_so_phan' },
  ],
  'bang-so-lieu': [
    { prompt: 'Bảng số cây của 4 lớp: 32, 28, 41, 35. Trung bình cộng?', choices: ['34 cây', '35 cây', '36 cây'], answer: '34 cây', explanation: '(32 + 28 + 41 + 35) : 4 = 136 : 4 = 34.', errorTag: 'tinh_trung_binh_cong_sai' },
    { prompt: 'Dãy số liệu 15, 8, 15, 22, 8 có bao nhiêu giá trị khác nhau?', choices: ['3', '5', '2'], answer: '3', explanation: 'Giá trị khác nhau là 8, 15, 22 — đếm theo giá trị distinct, không đếm số ô.', errorTag: 'dem_trung_gia_tri' },
  ],
  'bieu-do-cot': [
    { prompt: 'Biểu đồ cột, 1 ô = 5 quyển. Lớp 4A cao 6 ô. Lớp 4A có bao nhiêu quyển?', choices: ['30', '6', '35'], answer: '30', explanation: 'Phải nhân theo chú giải tỉ lệ: 6 × 5 = 30 quyển.', errorTag: 'dem_o_sai_ty_le' },
    { prompt: 'Cột tháng 4 cao 90, cột tháng 5 cao 60. Tháng 4 nhiều hơn tháng 5 bao nhiêu?', choices: ['30', '150', '20'], answer: '30', explanation: 'So sánh hai cột bằng cách trừ chiều cao: 90 − 60 = 30.', errorTag: 'so_sanh_chieu_cao_khong_cung_goc' },
  ],
  'bieu-do-tranh': [
    { prompt: 'Biểu đồ tranh, chú giải "1 🍊 = 4 quả". Hàng của Lan có 3 hình. Lan có bao nhiêu quả?', choices: ['12', '3', '7'], answer: '12', explanation: 'Đọc chú giải trước: 3 × 4 = 12 quả.', errorTag: 'quen_nhan_cua_1_hinh' },
    { prompt: 'Hàng Nam có 2 hình rưỡi, 1 hình = 4 que kem. Nam có bao nhiêu que?', choices: ['10', '8', '12'], answer: '10', explanation: 'Nửa hình = 4 : 2 = 2 que; 2 hình = 8 que; tổng 8 + 2 = 10 que.', errorTag: 'chia_le_chinh_xac' },
  ],
  'xac-suat': [
    { prompt: 'Hộp có 5 bóng đỏ và 3 bóng xanh. Rút 1 bóng, khả năng nào chắc chắn xảy ra?', choices: ['Rút được bóng đỏ hoặc xanh', 'Rút được bóng đỏ', 'Rút được bóng vàng'], answer: 'Rút được bóng đỏ hoặc xanh', explanation: 'Trong hộp chỉ có đỏ và xanh nên rút thế nào cũng được một trong hai màu: chắc chắn. Còn màu vàng là không thể.', errorTag: 'nham_co_the_kha_chac' },
    { prompt: 'Hộp 2 đỏ, 8 xanh: rút 1 bóng màu nào có khả năng cao hơn?', choices: ['Xanh', 'Đỏ', 'Bằng nhau'], answer: 'Xanh', explanation: 'So số kết quả thuận lợi: 8 > 2 nên khả năng rút bóng xanh cao hơn.', errorTag: 'dem_khong_het_mau' },
  ],
  'phan-so-dau': [
    { prompt: 'Hình vuông chia 8 phần bằng nhau, tô màu 3 phần. Phân số chỉ phần tô màu?', choices: ['3/8', '8/3', '3/5'], answer: '3/8', explanation: 'Mẫu số là tổng số phần bằng nhau (8), tử số là số phần được lấy (3).', errorTag: 'tu_so_mau_so_dao_nguoc' },
    { prompt: 'Phân số nào lớn hơn 1?', choices: ['7/5', '5/7', '6/6'], answer: '7/5', explanation: 'Lớn hơn 1 khi tử số lớn hơn mẫu số; 6/6 bằng 1, 5/7 bé hơn 1.', errorTag: 'so_sanh_theo_so_phan_tu_thoi' },
  ],
  'phan-so-bang-nhau': [
    { prompt: 'Rút gọn 18/24 được phân số tối giản?', choices: ['3/4', '9/12', '6/8'], answer: '3/4', explanation: 'Chia cả tử và mẫu cho ƯCLN(18, 24) = 6 → 3/4. 9/12 và 6/8 vẫn rút gọn tiếp được nên chưa tối giản.', errorTag: 'rut_gon_chua_het' },
    { prompt: 'Phân số nào bằng 2/5?', choices: ['4/10', '2/10', '5/2'], answer: '4/10', explanation: 'Nhân cả tử và mẫu của 2/5 với 2 được 4/10. 2/10 rút gọn thành 1/5, còn 5/2 là phân số đảo ngược.', errorTag: 'nhan_chia_tu_ma_khong_cung_so' },
  ],
  'quy-dong-mau': [
    { prompt: 'Quy đồng mẫu số 1/4 và 2/6 (MSCNN = 12). Kết quả?', choices: ['3/12 và 4/12', '2/8 và 4/12', '3/12 và 2/12'], answer: '3/12 và 4/12', explanation: '12 : 4 = 3 → 1/4 = 3/12; 12 : 6 = 2 → 2/6 = 4/12. Nhân cả tử lẫn mẫu cùng một số.', errorTag: 'doi_mau_quen_doi_tu' },
    { prompt: 'Mẫu số chung nhỏ nhất của 1/6 và 1/8 là?', choices: ['24', '48', '14'], answer: '24', explanation: 'MSCNN là BCNN(6, 8) = 24. Dùng 48 vẫn quy đồng được nhưng chưa gọn nhất.', errorTag: 'chon_mau_chung_khong_phai_MNBC' },
  ],
  'cong-tru-phan-so': [
    { prompt: 'Tính 3/7 + 2/7.', choices: ['5/7', '5/14', '6/14'], answer: '5/7', explanation: 'Cộng hai phân số cùng mẫu: cộng tử, giữ nguyên mẫu → 5/7. Không được cộng mẫu.', errorTag: 'cong_tu_voi_mau' },
    { prompt: 'Tính 5/6 − 1/3 rồi rút gọn.', choices: ['1/2', '4/3', '3/2'], answer: '1/2', explanation: 'Quy đồng 1/3 = 2/6, rồi 5/6 − 2/6 = 3/6 = 1/2. Quên rút gọn là lỗi hay gặp.', errorTag: 'ket_qua_khong_rut_gon' },
  ],
  'phan-so-cua-mot-so': [
    { prompt: 'Tìm 2/5 của 30 kg gạo.', choices: ['12 kg', '75 kg', '6 kg'], answer: '12 kg', explanation: '30 : 5 × 2 = 12 kg. Chia theo mẫu số trước rồi nhân theo tử số.', errorTag: 'chia_thieu_bang_so_phan_chia' },
    { prompt: 'Lớp có 28 bạn, 3/4 số bạn thích bơi. Có bao nhiêu bạn thích bơi?', choices: ['21 bạn', '37 bạn', '7 bạn'], answer: '21 bạn', explanation: '28 : 4 = 7, 7 × 3 = 21 bạn.', errorTag: 'do_dai_cac_phan_bang_nhau' },
  ],
  'ti-so-tong-hieu': [
    { prompt: 'Tổng hai số 45, tỉ số 4/5. Hai số là?', choices: ['20 và 25', '15 và 30', '18 và 27'], answer: '20 và 25', explanation: 'Tổng số phần 4 + 5 = 9; một phần 45 : 9 = 5; số bé 20, số lớn 25.', errorTag: 'thieu_buoc_tinh_tong_so_phan' },
    { prompt: 'Hiệu hai số 12, tỉ số 2/5. Số lớn?', choices: ['20', '32', '8'], answer: '20', explanation: 'Hiệu số phần 5 − 2 = 3; một phần 12 : 3 = 4; số lớn 4 × 5 = 20.', errorTag: 'nham_ti_so_thanh_hieu_so' },
  ],
  'ti-le-ban-do': [
    { prompt: 'Bản đồ tỉ lệ 1 : 10 000, hai điểm cách nhau 4 cm trên bản đồ. Ngoài thực tế?', choices: ['400 m', '40 m', '4 000 m'], answer: '400 m', explanation: '4 cm × 10 000 = 40 000 cm = 400 m. Phải đổi cm ra m ở bước cuối.', errorTag: 'doi_don_vi_cm_km' },
    { prompt: 'Quãng đường thật 6 km, bản đồ tỉ lệ 1 : 100 000. Trên bản đồ dài bao nhiêu cm?', choices: ['6 cm', '60 cm', '0,6 cm'], answer: '6 cm', explanation: '6 km = 600 000 cm; 600 000 : 100 000 = 6 cm.', errorTag: 'nham_chieu_dai_thuc_te' },
  ],
  'hinh-binh-hanh': [
    { prompt: 'Hình bình hành có đáy 8 cm, chiều cao 5 cm. Diện tích?', choices: ['40 cm²', '26 cm²', '13 cm²'], answer: '40 cm²', explanation: 'S = đáy × chiều cao = 8 × 5 = 40 cm². Chiều cao là khoảng cách vuông góc giữa hai đáy, không phải cạnh bên.', errorTag: 'dung-canh-ben-lam-chenh-cao' },
    { prompt: 'Hình bình hành đáy 12 cm, cạnh bên 7 cm. Chu vi?', choices: ['38 cm', '84 cm', '19 cm'], answer: '38 cm', explanation: 'P = (12 + 7) × 2 = 38 cm.', errorTag: 'nham-chu-vi-dien-tich' },
  ],
  'hinh-thoi': [
    { prompt: 'Hình thoi có hai đường chéo 6 cm và 8 cm. Diện tích?', choices: ['24 cm²', '48 cm²', '14 cm²'], answer: '24 cm²', explanation: 'S = (6 × 8) : 2 = 24 cm². Quên chia 2 là lỗi phổ biến.', errorTag: 'quen-chia-2-tich-hai-duong-cheo' },
    { prompt: 'Hình thoi có cạnh 5 cm. Chu vi?', choices: ['20 cm', '25 cm', '10 cm'], answer: '20 cm', explanation: 'Bốn cạnh bằng nhau nên P = 5 × 4 = 20 cm.', errorTag: 'doi-deu-dai-hai-chenh' },
  ],
  'on-tap-toan-4': [
    { prompt: 'Số gồm 4 triệu, 0 trăm nghìn, 7 nghìn, 5 chục?', choices: ['4 007 050', '4 070 050', '4 700 500'], answer: '4 007 050', explanation: 'Viết đủ cả ba lớp, hàng nào thiếu thì ghi 0.', errorTag: 'thieu_hang_trong' },
    { prompt: 'Tính nhanh: 25 × 9 × 4.', choices: ['900', '360', '225'], answer: '900', explanation: 'Đổi chỗ 25 × 4 = 100 rồi × 9 = 900 (tính chất giao hoán).', errorTag: 'nhan_sai_thu_tu_thuc_hien' },
  ],
  'thap-phan-khai-niem': [
    { prompt: 'Số 3,05 đọc là?', choices: ['ba phẩy không năm', 'ba phẩy năm', 'ba mươi lăm phần nghìn'], answer: 'ba phẩy không năm', explanation: 'Đọc từng chữ số sau dấu phẩy; số 0 ở hàng phần mười phải được đọc.', errorTag: 'doc_phan_thap_phan_tram' },
    { prompt: 'Phân số 7/100 viết thành số thập phân?', choices: ['0,07', '0,7', '7,0'], answer: '0,07', explanation: 'Mẫu 100 → hai chữ số sau dấu phẩy.', errorTag: 'gia_tri_tuong_ung_hang_thap_phan' },
  ],
  'chuyen-dong-f-d-p': [
    { prompt: 'Phân số nào bằng 0,25?', choices: ['1/4', '2/5', '1/2'], answer: '1/4', explanation: '1 : 4 = 0,25 và 25%. Ba cách viết cùng một giá trị.', errorTag: 'nham_ty_le_10_100_1000' },
    { prompt: '3/5 viết dưới dạng phần trăm?', choices: ['60%', '30%', '35%'], answer: '60%', explanation: '3 : 5 = 0,6; 0,6 × 100 = 60%.', errorTag: 'them_so_0_ben_phai_sai_gia_tri' },
  ],
  'phan-tram': [
    { prompt: 'Tính 15% của 240 kg.', choices: ['36 kg', '34 kg', '150 kg'], answer: '36 kg', explanation: '240 : 100 × 15 = 36 kg.', errorTag: 'tinh_phan_tram_cua_mot_so_sai_buoc' },
    { prompt: 'Áo 500 000 đồng giảm 20%. Giá phải trả?', choices: ['400 000 đồng', '100 000 đồng', '480 000 đồng'], answer: '400 000 đồng', explanation: 'Giảm 100 000 đồng nên trả 400 000 đồng; 100 000 chỉ là phần giảm.', errorTag: 'tru_giam_gia_nham_cong_tru' },
  ],
  'the-tich': [
    { prompt: 'Hình hộp chữ nhật 5 cm × 4 cm × 3 cm. Thể tích?', choices: ['60 cm³', '47 cm³', '94 cm³'], answer: '60 cm³', explanation: 'V = 5 × 4 × 3 = 60 cm³; 47 là chu vi-related, 94 là diện tích toàn phần của bộ ba mặt.', errorTag: 'nham_the_tich_voi_dien_tich_mat' },
    { prompt: 'Kho 12 cm × 5 cm × 4 cm chứa bao nhiêu khối lập phương 1 cm³?', choices: ['240', '60', '120'], answer: '240', explanation: 'Mỗi lớp 12 × 5 = 60 khối, có 4 lớp → 240 khối = thể tích 240 cm³.', errorTag: 'dem_lap_phuong_thieu_lo' },
  ],
  'ti-so-dau-bep': [
    { prompt: 'Công thức cho 2 người: 300 g gạo. Nấu cho 6 người cần bao nhiêu gạo?', choices: ['900 g', '600 g', '1 800 g'], answer: '900 g', explanation: 'Gấp 3 lần (6 : 2 = 3), nên 300 × 3 = 900 g. Nhân cả hệ số cho mọi nguyên liệu.', errorTag: 'gap_doi_khong_gap_den_4' },
    { prompt: 'Lúa : nước = 1 : 2. Nấu 150 g lúa cần bao nhiêu nước?', choices: ['300 ml', '150 ml', '75 ml'], answer: '300 ml', explanation: 'Nước gấp đôi lúa: 150 × 2 = 300 ml.', errorTag: 'nham_ti_so_thanh_phep_chia_don_vi' },
  ],
  'chuyen-dong-de': [
    { prompt: 'Xe đi 90 km trong 1,5 giờ. Vận tốc?', choices: ['60 km/giờ', '45 km/giờ', '135 km/giờ'], answer: '60 km/giờ', explanation: 'v = s : t = 90 : 1,5 = 60 km/giờ.', errorTag: 'nham_cong_tru_van_toc' },
    { prompt: 'Hai xe cách nhau 180 km, đi ngược chiều với vận tốc 40 và 50 km/giờ. Sau bao lâu gặp nhau?', choices: ['2 giờ', '3 giờ 36 phút', '4 giờ'], answer: '2 giờ', explanation: 'Tổng vận tốc 90 km/giờ; 180 : 90 = 2 giờ.', errorTag: 'quen_tru_thoi_gian_di_tru' },
  ],
  'hinh-hoc-on-tap': [
    { prompt: 'Hình tròn đường kính 8 cm. Bán kính?', choices: ['4 cm', '16 cm', '25,12 cm'], answer: '4 cm', explanation: 'Bán kính = đường kính : 2.', errorTag: 'goi_ten_hinh_sai' },
    { prompt: 'Hình hộp 6 dm × 4 dm × 2 dm. Diện tích xung quanh?', choices: ['40 dm²', '80 dm²', '88 dm²'], answer: '80 dm²', explanation: 'Chu vi đáy (6 + 4) × 2 = 20 dm; Sxq = 20 × 2 = 80 dm².', errorTag: 'nham_cong_thuc_chu_vi_dien_tich' },
  ],
  'thap-phan-can-bang': [
    { prompt: 'So sánh 4,05 ... 4,5', choices: ['<', '>', '='], answer: '<', explanation: 'Viết cùng số chữ số: 4,05 và 4,50 → 05 < 50 nên 4,05 < 4,5.', errorTag: 'so_sanh_hang_phan_muoi_thoi' },
    { prompt: 'Số nào bằng 7,20?', choices: ['7,2', '7,02', '72'], answer: '7,2', explanation: 'Bỏ chữ số 0 ở tận cùng bên phải phần thập phân thì giá trị không đổi.', errorTag: 'dau_bang_nhau_tru_so_0' },
  ],
  'on-tap-toan-5': [
    { prompt: 'Tính 3,5 × 4,2.', choices: ['14,7', '14,70', '1,47'], answer: '14,7', explanation: 'Bỏ dấu phẩy: 35 × 42 = 1470; đếm 2 chữ số thập phân → 14,70 = 14,7.', errorTag: 'thieu_dau_phay_thap_phan' },
    { prompt: 'Một lớp 40 bạn, 60% thích toán. Có bao nhiêu bạn?', choices: ['24 bạn', '26 bạn', '16 bạn'], answer: '24 bạn', explanation: '40 : 100 × 60 = 24. Kiểm tra: 60% của 40 phải nhỏ hơn 40.', errorTag: 'tinh_phan_tram_cua_mot_so_sai_buoc' },
  ],
  'tu-vung-e4': [
    { prompt: 'Con voi trong tiếng Anh là từ nào?', choices: ['elephant', 'tiger', 'zebra'], answer: 'elephant', explanation: 'elephant = con voi /ˈel.ɪ.fənt/. tiger = con hổ, zebra = ngựa vằn.', errorTag: 'nham_gan_nghia' },
    { prompt: 'Từ nào chỉ "bác sĩ"?', choices: ['doctor', 'teacher', 'farmer'], answer: 'doctor', explanation: 'doctor = bác sĩ; teacher = giáo viên; farmer = nông dân.', errorTag: 'nham_gan_nghia' },
  ],
  'nghe-e4': [
    { prompt: 'Nghe: "schoolbag". Chọn tranh đúng.', choices: ['cặp sách', 'quyển sách', 'cái bàn'], answer: 'cặp sách', explanation: 'schoolbag = cặp sách (danh từ ghép school + bag).', errorTag: 'bo_lo_tu_dai' },
    { prompt: 'Nghe: "thirteen". Chọn số.', choices: ['13', '30', '3'], answer: '13', explanation: 'thirteen /ˌθɜːˈtiːn/ = 13; phân biệt với thirty /ˈθɜː.ti/ = 30 ở trọng âm.', errorTag: 'phien_am_gan_giong' },
  ],
  'ghep-tranh-tu': [
    { prompt: 'Ghép tranh "ngôi trường" với từ đúng.', choices: ['school', 'room', 'book'], answer: 'school', explanation: 'school = trường học.', errorTag: 'nham_cap_gan_chu' },
    { prompt: 'Kéo từ vào tranh "a red pencil".', choices: ['pencil', 'ruler', 'rubber'], answer: 'pencil', explanation: 'pencil = bút chì; a red pencil = một chiếc bút chì màu đỏ.', errorTag: 'hoi_tu_ngan_dai' },
  ],
  'chinh-ta': [
    { prompt: 'Cách viết đúng của "ngựa" trong tiếng Anh?', choices: ['horse', 'harse', 'hors'], answer: 'horse', explanation: 'horse /hɔːs/. Thêm "a" là lỗi phổ biến vì nghe gần âm /ɔː/.', errorTag: 'nham_v_i_y' },
    { prompt: 'Điền chữ còn thiếu: s _ o o l', choices: ['h', 'c', 'k'], answer: 'h', explanation: 'school — cụm "ch" đứng đầu, không phải âm đơn.', errorTag: 'double_consonant' },
  ],
  'xay-tu': [
    { prompt: 'Ghép các chữ cái s, c, h, o, o, l thành từ chỉ trường học.', choices: ['school', 'shcoool', 'cschool'], answer: 'school', explanation: 'Dùng đúng 6 chữ đã cho, không thêm không bớt: s-c-h-o-o-l. Có hai chữ o.', errorTag: 'sai_thu_tu_chu_cai' },
    { prompt: 'Ghép r, u, l, e, r thành đồ dùng học tập.', choices: ['ruler', 'ruerl', 'rulr'], answer: 'ruler', explanation: 'ruler = thước kẻ, 5 chữ cái, thiếu chữ e là lỗi hay gặp.', errorTag: 'thieu_chu_cai' },
  ],
  'xep-cau': [
    { prompt: 'Sắp xếp: is / This / my / mother', choices: ['This is my mother', 'is This my mother', 'This my is mother'], answer: 'This is my mother', explanation: 'Trật tự: chủ ngữ (This) + động từ to be (is) + cụm danh từ (my mother).', errorTag: 'vi_tri_tru_tu_sai' },
    { prompt: 'Chọn đáp án: There ... two cats in the room.', choices: ['are', 'is', 'am'], answer: 'are', explanation: 'two cats là số nhiều nên dùng are.', errorTag: 'thieu_to_be' },
  ],
  'trieu-tu-vung': [
    { prompt: 'Lật thẻ: nối "hospital" với tranh.', choices: ['bệnh viện', 'trường học', 'cửa hàng'], answer: 'bệnh viện', explanation: 'hospital = bệnh viện /ˈhɒs.pɪ.təl/.', errorTag: 'nho_vi_tri_khong_nho_nghia' },
    { prompt: 'Ghép cặp "strong" với nghĩa.', choices: ['mạnh mẽ', 'cao', 'nhanh'], answer: 'mạnh mẽ', explanation: 'strong = mạnh mẽ; đối nghĩa với weak.', errorTag: 'nham_hinh_anh_tuong_tu' },
  ],
  'phonics': [
    { prompt: 'Chọn từ chứa âm "sh".', choices: ['fish', 'sit', 'cup'], answer: 'fish', explanation: '"sh" trong fish /ʃ/. sit có âm "s" /s/ — hai âm dễ lẫn.', errorTag: 'mau_chu_sh' },
    { prompt: 'Từ nào có mẫu chữ "ee"?', choices: ['see', 'say', 'so'], answer: 'see', explanation: 'see /siː/ có "ee"; say có "ay".', errorTag: 'ket_thuc_ed_ung' },
  ],
  'cau-hoi': [
    { prompt: 'Sắp thành câu hỏi: this / is / What', choices: ['What is this', 'Is what this', 'This is what'], answer: 'What is this', explanation: 'Từ để hỏi What đứng đầu, sau đó là động từ to be rồi chủ ngữ.', errorTag: 'thieu_tu_hoi' },
    { prompt: 'Câu hỏi đúng cho "She is ten years old."', choices: ['How old are you?', 'Where are you?', 'Who are you?'], answer: 'How old are you?', explanation: 'Hỏi tuổi dùng How old; câu trả lời phải có số tuổi.', errorTag: 'tra_loi_dung_truc_tu_hoi' },
  ],
  'ke-chuyen': [
    { prompt: 'Sắp 3 tranh: (1) Lan ăn kem, (2) Lan mua kem, (3) Vỏ kem trên đất.', choices: ['2 – 1 – 3', '1 – 2 – 3', '3 – 2 – 1'], answer: '2 – 1 – 3', explanation: 'Trình tự hợp lý: mua trước, ăn sau, rồi mới có vỏ kem.', errorTag: 'thieu_thu_tu_menh_de' },
    { prompt: 'Chọn câu cho tranh "cậu bé đang đọc sách".', choices: ['He is reading a book', 'He plays football', 'He can swim'], answer: 'He is reading a book', explanation: 'Tranh diễn tả hành động đang xảy ra nên dùng thì hiện tại tiếp diễn.', errorTag: 'nham_dong_tu_qua_khu' },
  ],
  'nghe-phan-loai': [
    { prompt: 'Nghe "apple" → phân loại vào rổ nào?', choices: ['Fruit', 'Animal', 'School'], answer: 'Fruit', explanation: 'apple là quả táo thuộc nhóm Fruit.', errorTag: 'nhom_nghia_khong_rang_buoc' },
    { prompt: 'Nghe "ruler" → rổ đúng.', choices: ['Stationery', 'Food', 'Job'], answer: 'Stationery', explanation: 'ruler (thước kẻ) thuộc nhóm đồ dùng học tập; nhiều bạn nhầm với nhóm Food vì nghe ngắn.', errorTag: 'am_tuong_dong' },
  ],
  'doc-hieu': [
    { prompt: 'Đọc "Mai gets up at six. She has breakfast, then walks to school." Ý chính?', choices: ['Thói quen buổi sáng của Mai', 'Mai thích đi bộ', 'Trường của Mai rất xa'], answer: 'Thói quen buổi sáng của Mai', explanation: 'Ba câu đều mô tả chuỗi việc buổi sáng; chi tiết đi bộ chỉ là một phần.', errorTag: 'chi_tiet_khong_phai_y_chinh' },
    { prompt: 'Từ nào trong bài là bằng chứng cho "Mai đi bộ tới trường"?', choices: ['walks to school', 'has breakfast', 'gets up'], answer: 'walks to school', explanation: 'Bằng chứng phải là cụm gốc trong bài, không phải suy luận.', errorTag: 'suy_luan_thieu_bang_chung' },
  ],
  'nguphap-e5': [
    { prompt: 'Chọn dạng đúng: She ... to school every day.', choices: ['goes', 'go', 'going'], answer: 'goes', explanation: 'Hiện tại đơn với chủ ngữ số ít ngôi 3 thêm -es: goes.', errorTag: 'dem_khong_dong_tu_them_s' },
    { prompt: 'Chọn: Look! The boys ... football.', choices: ['are playing', 'play', 'plays'], answer: 'are playing', explanation: '"Look!" báo hiệu hành động đang diễn ra → hiện tại tiếp diễn.', errorTag: 'thi_hieu_du_lu_lien_quan' },
  ],
  'dien-tu-trong-doan-van': [
    { prompt: 'Điền: I ... my homework in the evening.', choices: ['do', 'make', 'take'], answer: 'do', explanation: 'Cụm cố định "do homework"; "make" không dùng với homework.', errorTag: 'ngữ_cảnh_dung_dong_tu_dung' },
    { prompt: 'Điền: There are ... apples in the basket.', choices: ['some', 'any', 'much'], answer: 'some', explanation: 'Câu khẳng định với danh từ đếm được số nhiều dùng some; any dùng cho câu phủ định/nghi vấn.', errorTag: 'ham_duoc_dung_lai' },
  ],
  'xay-cum-tu': [
    { prompt: 'Ghép cụm: a / of / pair / shoes', choices: ['a pair of shoes', 'a shoes of pair', 'pair a of shoes'], answer: 'a pair of shoes', explanation: 'Cụm số lượng: a pair of + danh từ số nhiều.', errorTag: 'cum_tu_thieu_danh_tu' },
    { prompt: 'Cụm nào đúng với "một cốc nước cam"?', choices: ['a glass of orange juice', 'a orange juice glass', 'an glass of juice'], answer: 'a glass of orange juice', explanation: 'Dùng a glass of cho đồ uống; không lặp mạo từ.', errorTag: 'luong_tu_tru_danh_tu' },
  ],
  'bo-ba-tri-nho': [
    { prompt: 'Ghép bộ ba: "monkey" – tranh – nghĩa.', choices: ['con khỉ', 'con voi', 'con hổ'], answer: 'con khỉ', explanation: 'monkey = con khỉ; đọc lại /ˈmʌŋ.ki/ sau khi ghép đúng.', errorTag: 'nham_gan_tranh' },
    { prompt: 'Bộ ba nào đúng?', choices: ['library – tranh giá sách – thư viện', 'library – tranh sân chơi – công viên', 'library – tranh bếp – phòng ăn'], answer: 'library – tranh giá sách – thư viện', explanation: 'Ba thẻ phải cùng chỉ một khái niệm; tranh sai là nhiễu phổ biến.', errorTag: 'nghia_cua_thu_tu_thieu' },
  ],
  'noi': [
    { prompt: 'Tình huống: bạn hỏi đường tới thư viện. Nói câu:', choices: ['How do I get to the library', 'Where are you from', 'What time is it'], answer: 'How do I get to the library', explanation: 'Khung câu hỏi đường: How do I get to + địa điểm.', errorTag: 'thieu_am_dau_cuoi' },
    { prompt: 'Nói câu theo tranh: cậu bé đang ăn táo.', choices: ['He is eating an apple', 'He eats banana', 'She is drinking milk'], answer: 'He is eating an apple', explanation: 'Đủ chủ ngữ + hiện tại tiếp diễn + đúng danh từ "an apple".', errorTag: 'ngat_giua_cau' },
  ],
  'on-tap-e5': [
    { prompt: 'Chọn từ sai chính tả.', choices: ['beautifull', 'beautiful', 'beauty'], answer: 'beautifull', explanation: 'beautiful chỉ có một chữ l; đây là lỗi hay gặp nhất khi ôn viết.', errorTag: 'double_consonant' },
    { prompt: 'Sửa câu: She don’t like milk.', choices: ['She doesn’t like milk', 'She not like milk', 'She likes not milk'], answer: 'She doesn’t like milk', explanation: 'Chủ ngữ số ít ngôi 3 dùng doesn’t.', errorTag: 'dem_khong_dong_tu_them_s' },
  ],
  'dao-kynang-e4': [
    { prompt: 'Đảo Từ vựng: chọn nghĩa của "window".', choices: ['cửa sổ', 'cánh cửa', 'mái nhà'], answer: 'cửa sổ', explanation: 'window = cửa sổ; door = cánh cửa — cặp từ dễ nhầm.', errorTag: 'nham_gan_nghia' },
    { prompt: 'Đảo Chính tả: từ nào viết đúng?', choices: ['yellow', 'yelow', 'yellou'], answer: 'yellow', explanation: 'yellow có hai chữ l và kết thúc "ow".', errorTag: 'double_consonant' },
  ],
  'boss-cong-thu': [
    { prompt: 'Giai đoạn 1: Tính 125 × 8.', choices: ['1 000', '1 0000', '960'], answer: '1 000', explanation: '125 × 8 = 1000 vì 125 × 4 = 500 rồi × 2.', errorTag: 'nhan_sai_thu_tu_thuc_hien' },
    { prompt: 'Giai đoạn 2: Diện tích hình thoi có hai đường chéo 10 cm và 6 cm.', choices: ['30 cm²', '60 cm²', '16 cm²'], answer: '30 cm²', explanation: '(10 × 6) : 2 = 30 cm²; giai đoạn này kiểm tra việc nhớ chia 2.', errorTag: 'quen-chia-2-tich-hai-duong-cheo' },
  ],
};
