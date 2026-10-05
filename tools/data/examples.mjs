// Hai câu mẫu cho mỗi cụm kiến thức: Gemini bám theo khuôn này để sinh cả ngân hàng dữ liệu.
// Khuôn: { prompt, choices, answer, explanation, errorTag, dang }.
// dang = "nhin" (nhìn–chỉ–chọn, không tính) hoặc "tinh" (ĐÚNG MỘT phép tính một bước); chuẩn của vòng "nhẹ đầu".
// validate.mjs chặn nếu đề dài quá 16 từ hoặc mục "tinh" mang hai dấu phép tính — đổi ở đây rồi chạy node tools/build.mjs.
// Game Tiếng Anh dùng EXAMPLES_YLE, key "BAND:cluster" (ST|MV|FY) — mọi từ tiếng Anh trong câu mẫu phải thuộc band đó.

export const EXAMPLES = {
  'hang-so': [
    { prompt: "Số nào có chữ số 7 ở hàng chục nghìn?", choices: ["748 560","174 560","480 756"], answer: "748 560", explanation: "Ở 748 560 chữ số 7 đứng hàng chục nghìn vì đếm từ phải sang: 0-đơn vị, 6-chục, 5-trăm, 8-nghìn, 4-chục nghìn, 7-trăm nghìn. Số còn lại 174 560 có 7 ở hàng nghìn.", errorTag: "doc_nham_hang", dang: "nhin" },
    { prompt: "Số gồm 3 trăm nghìn, 5 chục nghìn, 2 trăm, 4 chục, 1 đơn vị là?", choices: ["350 241","352 241","305 241"], answer: "350 241", explanation: "Hàng nghìn bằng 0 nên vẫn phải viết chữ số 0 ở vị trí đó: 3-5-0 / 2-4-1.", errorTag: "thieu_hang_trong", dang: "nhin" },
  ],
  'so-sanh-sap-xep': [
    { prompt: "Sắp xếp tăng dần: 65 412 · 65 142 · 6 541 · 654 120", answer: "6 541 < 65 142 < 65 412 < 654 120", explanation: "Số ít chữ số hơn thì nhỏ hơn. Hai số 5 chữ số có cùng 65 nghìn thì so hàng nghìn: 1 < 4.", errorTag: "so_sanh_khong_cung_hang", dang: "nhin" },
    { prompt: "Chọn dấu đúng: 1 299 999 ... 1 300 001", choices: [">","<","="], answer: "<", explanation: "So từ trái sang: hàng triệu và trăm nghìn bằng nhau (1, 3), hàng chục nghìn 9 < 0? Không — 1 299 999 có trăm nghìn là 2, còn 1 300 001 có trăm nghìn là 3, nên số trước bé hơn.", errorTag: "dau_lon_hon_be_hon", dang: "nhin" },
  ],
  'lam-tron': [
    { prompt: "Làm tròn 28 653 đến hàng nghìn.", choices: ["28 000","29 000","28 700"], answer: "29 000", explanation: "Chữ số hàng trăm là 6 (>= 5) nên hàng nghìn tăng 28 lên 29, các chữ số sau thành 0.", errorTag: "quen_lam_tron_khi_bang_5", dang: "nhin" },
    { prompt: "Số nào trên tia số được làm tròn thành 40 000?", choices: ["34 500","39 480","45 200"], answer: "39 480", explanation: "Vùng làm tròn về 40 000 là từ 35 000 đến 44 999; 34 500 về 30 000, 45 200 về 50 000.", errorTag: "doc_sai_vach_tia_so", dang: "nhin" },
  ],
  'chan-le': [
    { prompt: "Số 487 là số chẵn hay số lẻ?", choices: ["Chẵn","Lẻ"], answer: "Lẻ", explanation: "Chỉ cần nhìn chữ số tận cùng: 7 là số lẻ nên 487 lẻ. Các chữ số phía trước không ảnh hưởng.", errorTag: "xet_hang_chuc_thay_vi_don_vi", dang: "nhin" },
    { prompt: "Tổng 245 + 348 là chẵn hay lẻ?", choices: ["Chẵn","Lẻ"], answer: "Lẻ", explanation: "Chẵn + lẻ = lẻ. 245 lẻ, 348 chẵn nên tổng lẻ; thử lại: 593.", errorTag: "xet_hang_chuc_thay_vi_don_vi", dang: "tinh" },
  ],
  'khoi-luong': [
    { prompt: "3 tấn 5 tạ = ... kg", choices: ["3 500 kg","350 kg","30 500 kg"], answer: "3 500 kg", explanation: "1 tấn = 1000 kg nên 3 tấn = 3000 kg; 1 tạ = 100 kg nên 5 tạ = 500 kg. Cộng lại 3500 kg.", errorTag: "doi_don_vi_thieu_so_0", dang: "tinh" },
    { prompt: "So sánh: 2 tạ 60 kg ... 260 kg", choices: [">","<","="], answer: "=", explanation: "Đổi về cùng đơn vị trước khi so sánh: 2 tạ = 200 kg, cộng 60 kg = 260 kg.", errorTag: "so_sanh_chua_doi_don_vi", dang: "tinh" },
  ],
  'dien-tich-don-vi': [
    { prompt: "Hình chữ nhật 7 cm × 4 cm có diện tích bao nhiêu?", choices: ["28 cm²","22 cm²","28 cm"], answer: "28 cm²", explanation: "7 × 4 = 28 ô vuông 1 cm². 22 cm là chu vi (7+4)×2 — đừng nhầm hai đại lượng.", errorTag: "nham_chu_vi_thanh_dien_tich", dang: "tinh" },
    { prompt: "Đếm lưới: hình tô phủ 14 ô vuông 1 cm² và 4 nửa ô. Diện tích?", choices: ["16 cm²","18 cm²","14 cm²"], answer: "16 cm²", explanation: "4 nửa ô ghép thành 2 ô nguyên; 14 + 2 = 16 cm².", errorTag: "dem_o_chuong_lac", dang: "nhin" },
  ],
  'thoi-gian': [
    { prompt: "Kim ngắn chỉ giữa số 8 và 9, kim dài chỉ số 6. Là mấy giờ?", choices: ["8 giờ 30 phút","6 giờ 40 phút","8 giờ 6 phút"], answer: "8 giờ 30 phút", explanation: "Kim dài chỉ số 6 nghĩa là 30 phút (mỗi số = 5 phút), không phải 6 phút.", errorTag: "kim_ngan_kim_dai_nguoc", dang: "nhin" },
    { prompt: "Phim bắt đầu 19 giờ 45, chiếu suốt 1 giờ 25 phút. Kết thúc lúc nào?", choices: ["21 giờ 10 phút","20 giờ 10 phút","20 giờ 30 phút"], answer: "21 giờ 10 phút", explanation: "45 + 25 = 70 phút = 1 giờ 10 phút; 19 + 1 + 1 = 21 giờ.", errorTag: "nham_1gio_100_phut", dang: "tinh" },
  ],
  'goc': [
    { prompt: "Góc có số đo 125° là góc gì?", choices: ["Góc tù","Góc nhọn","Góc bẹt"], answer: "Góc tù", explanation: "Góc nhọn < 90°, vuông = 90°, tù trong khoảng 90°–180°, bẹt = 180°.", errorTag: "nham_goc_tu_goc_nhon", dang: "nhin" },
    { prompt: "Cạnh góc qua vạch 40, cạnh kia qua vạch 0 bên trong. Số đo?", choices: ["40°","140°","50°"], answer: "40°", explanation: "Đọc theo thang đo trùng với cạnh đi qua 0; đọc thang ngược sẽ ra 140°.", errorTag: "doc_o_vach_ngoai", dang: "nhin" },
  ],
  'vuong-goc-song-song': [
    { prompt: "Hai đường không cắt nhau dù kéo dài về hai phía thì quan hệ là?", choices: ["Song song","Vuông góc","Cắt nhau"], answer: "Song song", explanation: "Song song là không bao giờ cắt nhau; vuông góc là cắt nhau tạo góc 90°.", errorTag: "keo_dai_nghi_la_song_song", dang: "nhin" },
    { prompt: "Đường thẳng qua O trên d, cắt d tạo góc 90° gọi là gì?", choices: ["Đường vuông góc với d","Đường song song với d","Đường chéo"], answer: "Đường vuông góc với d", explanation: "Vì đi qua O và cắt d tại góc vuông nên d’ được gọi là đường vuông góc với d.", errorTag: "qua_tam_dinh_khi_ke", dang: "nhin" },
  ],
  'cong-tru': [
    { prompt: "Tính 50 003 − 27 846.", choices: ["22 157","23 157","22 257"], answer: "22 157", explanation: "Ở hàng nghìn phải mượn 1 của hàng chục nghìn rồi mới trừ; 10 − 3 = 7, 9 − 4 = 5, 9 − 8 = 1, 4 − 7 không được nên mượn 5 = 10 → 14 − 7 = 7? Kiểm tra lại theo cột dọc, kết quả 22 157.", errorTag: "thieu_muon", dang: "tinh" },
    { prompt: "Tính 12 000 − 4 000.", choices: ["8 000","11 000","6 000"], answer: "8 000", explanation: "Engine đã dựng sẵn bước trong ngoặc (2 350 + 1 650 = 4 000), em chỉ việc trừ: 12 000 − 4 000 = 8 000. Bỏ quên bước trước là lỗi hay gặp.", errorTag: "tinh_sai_thu_tu_co_ngoac", dang: "tinh" },
  ],
  'nhan': [
    { prompt: "Tính nhẩm 24 × 11.", choices: ["264","246","242"], answer: "264", explanation: "24 × 11 = 2 (2+4) 4 = 264: viết tổng hai chữ số vào giữa.", errorTag: "nham_11_sai_quy_tac", dang: "tinh" },
    { prompt: "Tính 305 × 20.", choices: ["6 100","610","6 010"], answer: "6 100", explanation: "305 × 2 = 610, nhân tiếp với 10 → thêm một chữ số 0 ở tận cùng: 6100.", errorTag: "quen_them_chu_so_0", dang: "tinh" },
  ],
  'chia': [
    { prompt: "850 : 4 được thương và số dư là?", choices: ["212 dư 2","213","212 dư 6"], answer: "212 dư 2", explanation: "8 : 4 = 2; 5 : 4 = 1 dư 1; 10 : 4 = 2 dư 2. Số dư bao giờ cũng nhỏ hơn số chia nên \"dư 6\" vô lý.", errorTag: "bo_qua_so_du", dang: "tinh" },
    { prompt: "Chia đều 47 quyển vở cho 5 bạn. Mỗi bạn mấy quyển, còn mấy quyển?", choices: ["9 quyển, dư 2","10 quyển","7 quyển, dư 12"], answer: "9 quyển, dư 2", explanation: "47 : 5 = 9 dư 2. Không thể chia 10 vì 10 × 5 = 50 > 47; dư 12 vô lý vì 12 > 5.", errorTag: "thuong_sai_uoc_luong", dang: "tinh" },
  ],
  'tat-ca': [
    { prompt: "25 × (4 + 6) viết theo tính chất phân phối là?", choices: ["25 × 4 + 25 × 6","25 × 4 + 6","(25 + 4) × 6"], answer: "25 × 4 + 25 × 6", explanation: "Tính chất phân phối của phép nhân đối với phép cộng: nhân 25 với từng số hạng rồi cộng lại = 100 + 150 = 250.", errorTag: "doi_tinh_chat_nham", dang: "nhin" },
    { prompt: "360 : (9 × 4) viết lại thành biểu thức nào?", choices: ["360 : 9 : 4","360 : 9 × 4","360 × 4 : 9"], answer: "360 : 9 : 4", explanation: "Chia một số cho một tích: 360 : (9 × 4) = 360 : 9 : 4. Đổi dấu : thành × ở bước sau là lỗi hay gặp.", errorTag: "chon_bieu_thuc_tuong_dung_sai", dang: "nhin" },
  ],
  'bai-toan-nhieu-buoc': [
    { prompt: "Một cái bút 9 000 đồng. Mua 8 cái bút hết bao nhiêu tiền?", choices: ["72 000 đồng","56 000 đồng","80 000 đồng"], answer: "72 000 đồng", explanation: "Engine đã dựng sẵn bước rút về đơn vị (45 000 : 5 = 9 000 đồng), em chỉ nhân: 9 000 × 8 = 72 000 đồng.", errorTag: "chon_sai_phep_tinh", dang: "tinh" },
    { prompt: "Tổng 96 chia thành 8 phần bằng nhau. Một phần bằng bao nhiêu?", choices: ["12","96","8"], answer: "12", explanation: "Sơ đồ đoạn thẳng engine đã chia sẵn 8 phần (3 + 5), em chỉ việc 96 : 8 = 12. Lấy luôn 96 hoặc đếm sai số phần là hai lỗi hay gặp.", errorTag: "chon_sai_phep_tinh", dang: "tinh" },
  ],
  'bang-so-lieu': [
    { prompt: "Bảng số cây của 4 lớp: 32, 28, 41, 35. Trung bình cộng?", choices: ["34 cây","35 cây","36 cây"], answer: "34 cây", explanation: "(32 + 28 + 41 + 35) : 4 = 136 : 4 = 34.", errorTag: "tinh_trung_binh_cong_sai", dang: "tinh" },
    { prompt: "Dãy số liệu 15, 8, 15, 22, 8 có bao nhiêu giá trị khác nhau?", choices: ["3","5","2"], answer: "3", explanation: "Giá trị khác nhau là 8, 15, 22 — đếm theo giá trị distinct, không đếm số ô.", errorTag: "dem_trung_gia_tri", dang: "nhin" },
  ],
  'bieu-do-cot': [
    { prompt: "1 ô = 5 quyển. Cột 4A cao 6 ô. 4A có bao nhiêu quyển?", choices: ["30","6","35"], answer: "30", explanation: "Phải nhân theo chú giải tỉ lệ: 6 × 5 = 30 quyển.", errorTag: "dem_o_sai_ty_le", dang: "tinh" },
    { prompt: "Tháng 4 = 90, tháng 5 = 60. Tháng 4 nhiều hơn bao nhiêu?", choices: ["30","150","20"], answer: "30", explanation: "So sánh hai cột bằng cách trừ chiều cao: 90 − 60 = 30.", errorTag: "so_sanh_chieu_cao_khong_cung_goc", dang: "tinh" },
  ],
  'bieu-do-tranh': [
    { prompt: "1 hình = 4 quả. Hàng Lan có 3 hình. Lan có mấy quả?", choices: ["12","3","7"], answer: "12", explanation: "Đọc chú giải trước: 3 × 4 = 12 quả.", errorTag: "quen_nhan_cua_1_hinh", dang: "tinh" },
    { prompt: "1 hình = 4 que. Hàng Nam có 2 hình rưỡi. Nam có mấy que?", choices: ["10","8","12"], answer: "10", explanation: "Trên nền AR hình rưỡi được vẽ rõ một nửa: 2 hình = 8 que, nửa hình = 2 que, tổng 10 que.", errorTag: "chia_le_chinh_xac", dang: "nhin" },
  ],
  'xac-suat': [
    { prompt: "Hộp có 5 bóng đỏ và 3 bóng xanh. Chắc chắn rút được màu nào?", choices: ["Rút được bóng đỏ hoặc xanh","Rút được bóng đỏ","Rút được bóng vàng"], answer: "Rút được bóng đỏ hoặc xanh", explanation: "Trong hộp chỉ có đỏ và xanh nên rút thế nào cũng được một trong hai màu: chắc chắn. Còn màu vàng là không thể.", errorTag: "nham_co_the_kha_chac", dang: "nhin" },
    { prompt: "Hộp 2 đỏ, 8 xanh: rút 1 bóng màu nào có khả năng cao hơn?", choices: ["Xanh","Đỏ","Bằng nhau"], answer: "Xanh", explanation: "So số kết quả thuận lợi: 8 > 2 nên khả năng rút bóng xanh cao hơn.", errorTag: "dem_khong_het_mau", dang: "nhin" },
  ],
  'phan-so-dau': [
    { prompt: "Hình chia 8 phần bằng nhau, tô màu 3 phần. Phân số phần tô?", choices: ["3/8","8/3","3/5"], answer: "3/8", explanation: "Mẫu số là tổng số phần bằng nhau (8), tử số là số phần được lấy (3).", errorTag: "tu_so_mau_so_dao_nguoc", dang: "nhin" },
    { prompt: "Phân số nào lớn hơn 1?", choices: ["7/5","5/7","6/6"], answer: "7/5", explanation: "Lớn hơn 1 khi tử số lớn hơn mẫu số; 6/6 bằng 1, 5/7 bé hơn 1.", errorTag: "so_sanh_theo_so_phan_tu_thoi", dang: "nhin" },
  ],
  'phan-so-bang-nhau': [
    { prompt: "Rút gọn 18/24 được phân số tối giản?", choices: ["3/4","9/12","6/8"], answer: "3/4", explanation: "Chia cả tử và mẫu cho ƯCLN(18, 24) = 6 → 3/4. 9/12 và 6/8 vẫn rút gọn tiếp được nên chưa tối giản.", errorTag: "rut_gon_chua_het", dang: "tinh" },
    { prompt: "Phân số nào bằng 2/5?", choices: ["4/10","2/10","5/2"], answer: "4/10", explanation: "Nhân cả tử và mẫu của 2/5 với 2 được 4/10. 2/10 rút gọn thành 1/5, còn 5/2 là phân số đảo ngược.", errorTag: "nhan_chia_tu_ma_khong_cung_so", dang: "nhin" },
  ],
  'quy-dong-mau': [
    { prompt: "Quy đồng mẫu số 1/4 và 2/6 (MSCNN = 12). Kết quả?", choices: ["3/12 và 4/12","2/8 và 4/12","3/12 và 2/12"], answer: "3/12 và 4/12", explanation: "12 : 4 = 3 → 1/4 = 3/12; 12 : 6 = 2 → 2/6 = 4/12. Nhân cả tử lẫn mẫu cùng một số.", errorTag: "doi_mau_quen_doi_tu", dang: "tinh" },
    { prompt: "Mẫu số chung nhỏ nhất của 1/6 và 1/8 là?", choices: ["24","48","14"], answer: "24", explanation: "MSCNN là BCNN(6, 8) = 24. Dùng 48 vẫn quy đồng được nhưng chưa gọn nhất.", errorTag: "chon_mau_chung_khong_nho_nhat", dang: "nhin" },
  ],
  'cong-tru-phan-so': [
    { prompt: "Tính 3/7 + 2/7.", choices: ["5/7","5/14","6/14"], answer: "5/7", explanation: "Cộng hai phân số cùng mẫu: cộng tử, giữ nguyên mẫu → 5/7. Không được cộng mẫu.", errorTag: "cong_tu_voi_mau", dang: "tinh" },
    { prompt: "Hiệu 5/6 − 1/3 bằng phân số nào?", choices: ["1/2","4/3","3/2"], answer: "1/2", explanation: "Quy đồng 1/3 = 2/6, rồi 5/6 − 2/6 = 3/6 = 1/2. Quên rút gọn là lỗi hay gặp.", errorTag: "ket_qua_khong_rut_gon", dang: "tinh" },
  ],
  'phan-so-cua-mot-so': [
    { prompt: "Tìm 2/5 của 30 kg gạo.", choices: ["12 kg","75 kg","6 kg"], answer: "12 kg", explanation: "30 : 5 × 2 = 12 kg. Chia theo mẫu số trước rồi nhân theo tử số.", errorTag: "chia_thieu_bang_so_phan_chia", dang: "tinh" },
    { prompt: "Lớp có 28 bạn, 3/4 số bạn thích bơi. Có bao nhiêu bạn thích bơi?", choices: ["21 bạn","37 bạn","7 bạn"], answer: "21 bạn", explanation: "28 : 4 = 7, 7 × 3 = 21 bạn.", errorTag: "do_dai_cac_phan_bang_nhau", dang: "tinh" },
  ],
  'ti-so-tong-hieu': [
    { prompt: "Tổng hai số 45, tỉ số 4/5. Hai số là?", choices: ["20 và 25","15 và 30","18 và 27"], answer: "20 và 25", explanation: "Tổng số phần 4 + 5 = 9; một phần 45 : 9 = 5; số bé 20, số lớn 25.", errorTag: "thieu_buoc_tinh_tong_so_phan", dang: "nhin" },
    { prompt: "Hiệu hai số 12, tỉ số 2/5. Số lớn?", choices: ["20","32","8"], answer: "20", explanation: "Hiệu số phần 5 − 2 = 3; một phần 12 : 3 = 4; số lớn 4 × 5 = 20.", errorTag: "nham_ti_so_thanh_hieu_so", dang: "nhin" },
  ],
  'ti-le-ban-do': [
    { prompt: "Tỉ lệ 1 : 10 000. 4 cm trên bản đồ bằng mấy mét?", choices: ["400 m","40 m","4 000 m"], answer: "400 m", explanation: "4 cm × 10 000 = 40 000 cm = 400 m. Phải đổi cm ra m ở bước cuối.", errorTag: "doi_don_vi_cm_km", dang: "tinh" },
    { prompt: "Tỉ lệ 1 : 100 000. 6 km thật vẽ thành bao nhiêu cm?", choices: ["6 cm","60 cm","0,6 cm"], answer: "6 cm", explanation: "6 km = 600 000 cm; 600 000 : 100 000 = 6 cm.", errorTag: "nham_chieu_dai_thuc_te", dang: "tinh" },
  ],
  'hinh-binh-hanh': [
    { prompt: "Hình bình hành có đáy 8 cm, chiều cao 5 cm. Diện tích?", choices: ["40 cm²","26 cm²","13 cm²"], answer: "40 cm²", explanation: "S = đáy × chiều cao = 8 × 5 = 40 cm². Chiều cao là khoảng cách vuông góc giữa hai đáy, không phải cạnh bên.", errorTag: "dung_canh_ben_lam_chieu_cao", dang: "tinh" },
    { prompt: "Hình bình hành đáy 12 cm, cạnh bên 7 cm. Chu vi?", choices: ["38 cm","84 cm","19 cm"], answer: "38 cm", explanation: "P = (12 + 7) × 2 = 38 cm.", errorTag: "nham_chu_vi_voi_dien_tich", dang: "nhin" },
  ],
  'hinh-thoi': [
    { prompt: "Hình thoi có hai đường chéo 6 cm và 8 cm. Diện tích?", choices: ["24 cm²","48 cm²","14 cm²"], answer: "24 cm²", explanation: "S = (6 × 8) : 2 = 24 cm². Quên chia 2 là lỗi phổ biến.", errorTag: "quen_chia_2_tich_hai_duong_cheo", dang: "nhin" },
    { prompt: "Hình thoi có cạnh 5 cm. Chu vi?", choices: ["20 cm","25 cm","10 cm"], answer: "20 cm", explanation: "Bốn cạnh bằng nhau nên P = 5 × 4 = 20 cm.", errorTag: "quen_chia_2_tich_hai_duong_cheo", dang: "tinh" },
  ],
  'on-tap-toan-4': [
    { prompt: "Số gồm 4 triệu, 0 trăm nghìn, 7 nghìn, 5 chục?", choices: ["4 007 050","4 070 050","4 700 500"], answer: "4 007 050", explanation: "Viết đủ cả ba lớp, hàng nào thiếu thì ghi 0.", errorTag: "doc_de_thieu_dieu_kien", dang: "nhin" },
    { prompt: "25 × 9 × 4 nên nhóm cặp nào để tính nhanh?", choices: ["25 × 4","9 × 4","25 × 9"], answer: "25 × 4", explanation: "Nhóm 25 × 4 = 100 rồi nhân 9, dựa vào tính chất giao hoán; chọn 25 × 9 vẫn đúng nhưng phải tính nhẩm dài hơn.", errorTag: "tron_loai_phep_tinh", dang: "nhin" },
  ],
  'thap-phan-khai-niem': [
    { prompt: "Số 3,05 đọc là?", choices: ["ba phẩy không năm","ba phẩy năm","ba mươi lăm phần nghìn"], answer: "ba phẩy không năm", explanation: "Đọc từng chữ số sau dấu phẩy; số 0 ở hàng phần mười phải được đọc.", errorTag: "doc_phan_thap_phan_tram", dang: "nhin" },
    { prompt: "Phân số 7/100 viết thành số thập phân?", choices: ["0,07","0,7","7,0"], answer: "0,07", explanation: "Mẫu 100 → hai chữ số sau dấu phẩy.", errorTag: "gia_tri_tuong_ung_hang_thap_phan", dang: "nhin" },
  ],
  'chuyen-dong-f-d-p': [
    { prompt: "Phân số nào bằng 0,25?", choices: ["1/4","2/5","1/2"], answer: "1/4", explanation: "1 : 4 = 0,25 và 25%. Ba cách viết cùng một giá trị.", errorTag: "nham_ty_le_10_100_1000", dang: "nhin" },
    { prompt: "3/5 viết dưới dạng phần trăm?", choices: ["60%","30%","35%"], answer: "60%", explanation: "3 : 5 = 0,6; 0,6 × 100 = 60%.", errorTag: "thieu_dau_phay_thap_phan", dang: "nhin" },
  ],
  'phan-tram': [
    { prompt: "Tính 15% của 240 kg.", choices: ["36 kg","34 kg","150 kg"], answer: "36 kg", explanation: "240 : 100 × 15 = 36 kg.", errorTag: "tinh_phan_tram_cua_mot_so_sai_buoc", dang: "tinh" },
    { prompt: "Áo 500 000 đồng giảm 20%. Tính số tiền được giảm.", choices: ["400 000 đồng","100 000 đồng","480 000 đồng"], answer: "100 000 đồng", explanation: "20% của 500 000 = 100 000 đồng được giảm; 400 000 đồng là tiền phải trả — nhầm hai đại lượng này là lỗi hay gặp.", errorTag: "tru_giam_gia_nham_cong_tru", dang: "tinh" },
  ],
  'the-tich': [
    { prompt: "Đáy có 5 × 4 khối. 3 lớp thì có bao nhiêu khối?", choices: ["60","23","12"], answer: "60", explanation: "Đáy 5 × 4 = 20 khối, 3 lớp → 20 × 3 = 60 khối, tức thể tích 60 cm³. Cộng thay vì nhân ra 23 và 12 là hai lỗi hay gặp.", errorTag: "nham_the_tich_voi_dien_tich_mat", dang: "tinh" },
    { prompt: "Kho 12 × 5 × 4 cm chứa bao nhiêu khối 1 cm³?", choices: ["240","60","120"], answer: "240", explanation: "Mỗi lớp 12 × 5 = 60 khối, có 4 lớp → 240 khối = thể tích 240 cm³.", errorTag: "dem_lap_phuong_thieu_lo", dang: "nhin" },
  ],
  'ti-so-dau-bep': [
    { prompt: "Công thức cho 2 người: 300 g gạo. Nấu cho 6 người cần bao nhiêu gạo?", choices: ["900 g","600 g","1 800 g"], answer: "900 g", explanation: "Gấp 3 lần (6 : 2 = 3), nên 300 × 3 = 900 g. Nhân cả hệ số cho mọi nguyên liệu.", errorTag: "gap_doi_khong_gap_den_4", dang: "tinh" },
    { prompt: "Lúa : nước = 1 : 2. Nấu 150 g lúa cần bao nhiêu nước?", choices: ["300 ml","150 ml","75 ml"], answer: "300 ml", explanation: "Nước gấp đôi lúa: 150 × 2 = 300 ml.", errorTag: "nham_ti_so_thanh_phep_chia_don_vi", dang: "nhin" },
  ],
  'chuyen-dong-de': [
    { prompt: "Xe đi 90 km trong 1,5 giờ. Vận tốc?", choices: ["60 km/giờ","45 km/giờ","135 km/giờ"], answer: "60 km/giờ", explanation: "v = s : t = 90 : 1,5 = 60 km/giờ.", errorTag: "nham_cong_tru_van_toc", dang: "tinh" },
    { prompt: "Hai xe cách 180 km, mỗi giờ gần thêm 90 km. Mấy giờ thì gặp?", choices: ["2 giờ","3 giờ 36 phút","4 giờ"], answer: "2 giờ", explanation: "Engine đã dựng sẵn tổng vận tốc 90 km/giờ, em chỉ việc 180 : 90 = 2 giờ.", errorTag: "quen_tru_thoi_gian_di_tru", dang: "nhin" },
  ],
  'hinh-hoc-on-tap': [
    { prompt: "Hình tròn đường kính 8 cm. Bán kính?", choices: ["4 cm","16 cm","25,12 cm"], answer: "4 cm", explanation: "Bán kính = đường kính : 2.", errorTag: "goi_ten_hinh_sai", dang: "tinh" },
    { prompt: "Hình hộp 6 dm × 4 dm × 2 dm. Diện tích xung quanh?", choices: ["40 dm²","80 dm²","88 dm²"], answer: "80 dm²", explanation: "Chu vi đáy (6 + 4) × 2 = 20 dm; Sxq = 20 × 2 = 80 dm².", errorTag: "nham_cong_thuc_chu_vi_dien_tich", dang: "nhin" },
  ],
  'thap-phan-can-bang': [
    { prompt: "So sánh 4,05 ... 4,5", choices: ["<",">","="], answer: "<", explanation: "Viết cùng số chữ số: 4,05 và 4,50 → 05 < 50 nên 4,05 < 4,5.", errorTag: "so_sanh_hang_phan_muoi_thoi", dang: "nhin" },
    { prompt: "Số nào bằng 7,20?", choices: ["7,2","7,02","72"], answer: "7,2", explanation: "Bỏ chữ số 0 ở tận cùng bên phải phần thập phân thì giá trị không đổi.", errorTag: "dau_bang_nhau_tru_so_0", dang: "nhin" },
  ],
  'on-tap-toan-5': [
    { prompt: "Tính 3,5 × 4,2.", choices: ["14,7","14,70","1,47"], answer: "14,7", explanation: "Bỏ dấu phẩy: 35 × 42 = 1470; đếm 2 chữ số thập phân → 14,70 = 14,7.", errorTag: "chon_sai_chi_luoc_giai", dang: "tinh" },
    { prompt: "Một lớp 40 bạn, 60% thích toán. Có bao nhiêu bạn?", choices: ["24 bạn","26 bạn","16 bạn"], answer: "24 bạn", explanation: "40 : 100 × 60 = 24. Kiểm tra: 60% của 40 phải nhỏ hơn 40.", errorTag: "quen_thu_thi_giua_chung", dang: "tinh" },
  ],
  'boss-cong-thu': [
    { prompt: "Giai đoạn 1: Tính 125 × 8.", choices: ["1 000","1 0000","960"], answer: "1 000", explanation: "125 × 8 = 1000 vì 125 × 4 = 500 rồi × 2.", errorTag: "quen_chi_luoc", dang: "tinh" },
    { prompt: "Giai đoạn 2: Diện tích hình thoi có hai đường chéo 10 cm và 6 cm.", choices: ["30 cm²","60 cm²","16 cm²"], answer: "30 cm²", explanation: "(10 × 6) : 2 = 30 cm²; giai đoạn này kiểm tra việc nhớ chia 2.", errorTag: "quen_chi_luoc", dang: "nhin" },
  ],
};

// Hai câu mẫu cho từng (band, cụm) của mạch Tiếng Anh. Từ vựng và cấu trúc phải nằm trong
// band Cambridge YLE tương ứng (tools/data/yle.mjs): validate.mjs chặn nếu một từ tiếng Anh
// trong đề thuộc band cao hơn band của game. errorTag vẫn lấy từ cụm kiến thức.
export const EXAMPLES_YLE = {
  'ST:tu-vung': [
    { prompt: "Nghĩa của \"window\" là gì?", choices: ["cửa sổ","cánh cửa","mái nhà"], answer: "cửa sổ", explanation: "window = cửa sổ; door mới là cánh cửa — hai từ cùng chỉ bộ phận ngôi nhà nên rất dễ chọn nhầm.", errorTag: "nham_gan_nghia", dang: "nhin" },
    { prompt: "Chọn đáp án đúng: I have two ...", choices: ["books","book","box"], answer: "books", explanation: "Danh từ đếm được số nhiều thêm s: two books. 'box' là cái hộp, khác nghĩa và cũng thiếu s.", errorTag: "thieu_s_danh_tu_so_nhieu", dang: "nhin" },
  ],
  'ST:nghe': [
    { prompt: "Nghe: \"ship\". Chọn tranh đúng.", choices: ["con tàu","con cừu","con dê"], answer: "con tàu", explanation: "ship /ʃɪp/ = con tàu; sheep /ʃiːp/ = con cừu — hai từ khác nhau ở độ dài nguyên âm.", errorTag: "phien_am_gan_giong", dang: "nhin" },
    { prompt: "Nghe: \"cats\". Điều gì đúng?", choices: ["nhiều con mèo","một con mèo","mèo đang ngủ"], answer: "nhiều con mèo", explanation: "Âm cuối /s/ của cats báo danh từ số nhiều: nhiều con mèo.", errorTag: "am_cuoi_s_ed_t", dang: "nhin" },
  ],
  'ST:ghep-tranh-tu': [
    { prompt: "Tranh vẽ một cái thước. Ghép từ nào?", choices: ["ruler","rubber","crayon"], answer: "ruler", explanation: "ruler = thước kẻ; rubber = tẩy. Hai từ cùng bắt đầu bằng 'ru' nên phải đọc hết từ.", errorTag: "nham_cap_gan_chu", dang: "nhin" },
    { prompt: "Tranh một con voi. Chọn từ nào?", choices: ["elephant","ant","bee"], answer: "elephant", explanation: "elephant = con voi; ant = con kiến, bee = con ong. Đừng chọn từ ngắn nhất chỉ vì quen mặt chữ.", errorTag: "hoi_tu_ngan_dai", dang: "nhin" },
  ],
  'ST:chinh-ta': [
    { prompt: "Từ nào viết đúng nghĩa \"màu xanh lá\"?", choices: ["green","gren","grean"], answer: "green", explanation: "green có hai chữ e liền nhau; 'gren' thiếu một chữ e.", errorTag: "thieu_chu_cai", dang: "nhin" },
    { prompt: "Chọn cách viết đúng của \"quả táo\".", choices: ["apple","aple","aplle"], answer: "apple", explanation: "apple nhân đôi chữ p nhưng chỉ có một chữ l.", errorTag: "double_consonant", dang: "nhin" },
  ],
  'ST:xep-cau': [
    { prompt: "Xếp thành câu đúng: is / This / a / pencil", answer: "This is a pencil.", explanation: "Câu khẳng định cần động từ to be ngay sau chủ ngữ: This is a pencil.", errorTag: "thieu_to_be", dang: "nhin" },
    { prompt: "Xếp thành câu đúng: a / has / bag / She", answer: "She has a bag.", explanation: "Chủ ngữ đứng đầu, động từ giữa, cụm danh từ cuối: She has a bag.", errorTag: "vi_tri_tru_tu_sai", dang: "nhin" },
  ],
  'ST:trieu-tu-vung': [
    { prompt: "Lật thẻ tranh con chó. Thẻ từ nào ghép đúng?", choices: ["dog","cat","cow"], answer: "dog", explanation: "dog = con chó; cow = con bò, cat = con mèo. Ghép theo nghĩa của tranh, không theo vị trí đã nhớ.", errorTag: "nho_vi_tri_khong_nho_nghia", dang: "nhin" },
    { prompt: "Tranh vẽ con cừu. Ghép từ nào?", choices: ["sheep","ship","fish"], answer: "sheep", explanation: "sheep = con cừu; ship = con tàu — hai từ gần giống nhau, nhìn tranh để phân biệt.", errorTag: "nham_hinh_anh_tuong_tu", dang: "nhin" },
  ],
  'ST:phonics': [
    { prompt: "Vuốt từ có âm đầu /ð/.", choices: ["these","zebra","sun"], answer: "these", explanation: "these bắt đầu bằng 'th' hữu thanh /ð/; zebra là /z/, sun là /s/.", errorTag: "am_dau_th_c", dang: "nhin" },
    { prompt: "Vuốt từ kết thúc bằng âm /ŋ/.", choices: ["sing","ship","cat"], answer: "sing", explanation: "sing kết thúc bằng 'ng' /ŋ/; ship kết thúc /p/, cat kết thúc /t/.", errorTag: "ket_thuc_ed_ung", dang: "nhin" },
  ],
  'ST:nghe-phan-loai': [
    { prompt: "Nghe \"bear\". Thả thẻ vào rổ nào?", choices: ["Động vật","Thức ăn","Quần áo"], answer: "Động vật", explanation: "bear = con gấu thuộc Động vật; 'pear' (quả lê) mới thuộc Thức ăn — hai từ đọc gần giống.", errorTag: "am_tuong_dong", dang: "nhin" },
    { prompt: "Nghe hai lần: \"classroom\". Từ này thuộc rổ nào?", choices: ["Trường học","Gia đình","Thời tiết"], answer: "Trường học", explanation: "classroom = lớp học, thuộc Trường học. Nghe lần hai để kiểm tra âm cuối /uːm/.", errorTag: "phat_lai_nhieu_lan", dang: "nhin" },
  ],
  'ST:dao-kynang': [
    { prompt: "Bến Từ vựng: chọn nghĩa của \"apple\".", choices: ["quả táo","quả cam","quả chuối"], answer: "quả táo", explanation: "apple = quả táo; orange = quả cam, banana = quả chuối.", errorTag: "bo_dao_thu", dang: "nhin" },
    { prompt: "Bến Nghe: đảo kế tiếp mở khi đủ 3/3 câu đúng, em mới sai 1 câu. Làm gì?", choices: ["nghe lại và sửa câu còn sai","chuyển ngay sang đảo khác","bỏ luôn đảo này"], answer: "nghe lại và sửa câu còn sai", explanation: "Chuẩn mở đảo là 3/3 câu đúng, nên sửa câu còn sai thay vì bỏ dở.", errorTag: "khong_dat_chuan_do_nang", dang: "nhin" },
  ],
  'MV:tu-vung': [
    { prompt: "Từ nào chỉ \"hiệu sách\"?", choices: ["bookshop","library","station"], answer: "bookshop", explanation: "bookshop = nơi bán sách; library = thư viện để mượn sách — cả hai đều liên quan sách nên dễ nhầm.", errorTag: "nham_gan_nghia", dang: "nhin" },
    { prompt: "Từ nào viết đúng: \"thứ Bảy\"?", choices: ["Saturday","Saterday","Sabtuday"], answer: "Saturday", explanation: "Saturday đánh vần S-a-t-u-r-d-a-y; 'Saterday' sai nguyên âm ở giữa.", errorTag: "chinh_ta_sai_nguyen_am", dang: "nhin" },
  ],
  'MV:nghe': [
    { prompt: "Nghe: \"yesterday\". Chọn nghĩa đúng.", choices: ["hôm qua","hôm nay","ngày mai"], answer: "hôm qua", explanation: "yesterday = hôm qua. Từ ba âm tiết nên phải nghe trọn từ, không bắt mỗi âm đầu.", errorTag: "bo_lo_tu_dai", dang: "nhin" },
    { prompt: "Nghe: \"thin\". Từ nào vừa nghe?", choices: ["gầy","dày","con cừu"], answer: "gầy", explanation: "thin /θɪn/ = gầy; thick /θɪk/ = dày — khác nhau ở âm cuối.", errorTag: "phien_am_gan_giong", dang: "nhin" },
  ],
  'MV:chinh-ta': [
    { prompt: "Từ nào viết đúng: \"thành phố\"?", choices: ["city","sity","citys"], answer: "city", explanation: "city bắt đầu bằng 'c' và kết thúc bằng 'ty' với y, không phải 'sity'.", errorTag: "nham_v_i_y", dang: "nhin" },
    { prompt: "Chọn cách viết đúng của \"giáo viên\".", choices: ["teacher","techer","teatcher"], answer: "teacher", explanation: "teacher = teach + er; 'techer' thiếu chữ a sau 'te'.", errorTag: "thieu_chu_cai", dang: "nhin" },
  ],
  'MV:xay-tu': [
    { prompt: "Xếp chữ cái \"a i n t u o n m\" thành từ chỉ núi.", answer: "mountain", explanation: "Đánh vần từng chữ rồi ghép: m-o-u-n-t-a-i-n.", errorTag: "sai_thu_tu_chu_cai", dang: "nhin" },
    { prompt: "Từ \"holiday\" ở câu \"We go to the beach in the ...\" cần thêm chữ cái nào?", answer: "s", explanation: "Nhiều ngày nghỉ trong kì nên dùng số nhiều holidays: thiếu s là lỗi chữ cái cuối.", errorTag: "thieu_chu_cai_cuoi", dang: "nhin" },
  ],
  'MV:nguphap': [
    { prompt: "Chọn dạng đúng: Yesterday we ... to the zoo.", choices: ["went","go","goes"], answer: "went", explanation: "Có \"Yesterday\" làm dấu hiệu thì nên động từ phải ở quá khứ đơn: went.", errorTag: "thi_hieu_du_lu_lien_quan", dang: "nhin" },
    { prompt: "Chọn dạng đúng: My sister ... swimming every day.", choices: ["likes","like","liking"], answer: "likes", explanation: "Chủ ngữ số ít \"My sister\" ở hiện tại đơn thì động từ thêm s: likes.", errorTag: "dem_khong_dong_tu_them_s", dang: "nhin" },
  ],
  'MV:cau-hoi': [
    { prompt: "Xếp thành câu hỏi: you / do / What / like", answer: "What do you like?", explanation: "Câu hỏi phải bắt đầu bằng từ để hỏi What rồi mới đến trợ động từ do.", errorTag: "thieu_tu_hoi", dang: "nhin" },
    { prompt: "Chọn từ còn thiếu: Where ... you live?", choices: ["do","does","is"], answer: "do", explanation: "Với chủ ngữ \"you\" cần trợ động từ \"do\": Where do you live?", errorTag: "sai_trat_tu_dao_ngu", dang: "nhin" },
  ],
  'MV:bo-ba-tri-nho': [
    { prompt: "Đã lật \"beard\" và tranh người đàn ông có râu. Thẻ nghĩa tiếng Việt thứ ba là?", choices: ["râu","tóc","mũi"], answer: "râu", explanation: "Bộ ba phải cùng một khái niệm: từ beard – tranh – nghĩa \"râu\".", errorTag: "ba_kho_hon_hai", dang: "nhin" },
    { prompt: "Tìm thẻ nghĩa tiếng Việt của \"shoulder\".", choices: ["vai","gáy","ngực"], answer: "vai", explanation: "shoulder = vai; neck mới là cổ/gáy — hai tranh gần nhau trên cơ thể nên dễ ghép nhầm.", errorTag: "nham_gan_tranh", dang: "nhin" },
  ],
  'MV:on-tap': [
    { prompt: "Còn 2 phút, em chưa chắc câu 10. Cách làm nào đúng?", choices: ["đoán theo nghĩa rồi làm tiếp, quay lại sau","bỏ trắng cả câu 10 và 11","dồn hết thời gian cho câu 10"], answer: "đoán theo nghĩa rồi làm tiếp, quay lại sau", explanation: "Không bỏ trống câu; làm nốt phần chắc tay rồi hãy quay lại câu khó.", errorTag: "bo_qua_chua_bai", dang: "nhin" },
    { prompt: "Tổng kết: sai 4 câu Ngữ pháp, đúng 5 câu Từ vựng. Em cần luyện gì?", choices: ["Ngữ pháp","Từ vựng","Phát âm"], answer: "Ngữ pháp", explanation: "Nhóm sai nhiều nhất là Ngữ pháp, đó là phần cần luyện thêm, không phải nhóm có ít câu hơn.", errorTag: "nham_ke_nang_can_hoc", dang: "nhin" },
  ],
  'FY:nghe': [
    { prompt: "Nghe: \"I've already finished my homework\". Chọn nghĩa đúng.", choices: ["Tớ làm xong bài tập rồi","Tớ sẽ làm bài tập","Tớ đang làm bài tập"], answer: "Tớ làm xong bài tập rồi", explanation: "\"already\" với hiện tại hoàn thành nói hành động đã kết thúc.", errorTag: "bo_lo_tu_dai", dang: "nhin" },
    { prompt: "Nghe: \"They visited the museum\". Điều gì đúng?", choices: ["đã thăm (quá khứ)","thường thăm (hiện tại)","sẽ thăm (tương lai)"], answer: "đã thăm (quá khứ)", explanation: "Âm cuối /ɪd/ của visited báo quá khứ đơn; nuốt âm này là nghe thành hiện tại.", errorTag: "am_cuoi_s_ed_t", dang: "nhin" },
  ],
  'FY:nguphap': [
    { prompt: "Chọn giới từ đúng: The cat is ... the table and the chair.", choices: ["between","in","of"], answer: "between", explanation: "\"between ... and ...\" chỉ vị trí ở giữa hai vật; 'in' chỉ ở trong một vật.", errorTag: "gioi_tu_in_on_at", dang: "nhin" },
    { prompt: "Chọn dạng đúng: If it rains, we ... at home.", choices: ["will stay","stayed","stay already"], answer: "will stay", explanation: "Câu điều kiện loại 1: mệnh đề if ở hiện tại đơn, mệnh đề chính dùng will + động từ nguyên thể.", errorTag: "thi_hieu_du_lu_lien_quan", dang: "nhin" },
  ],
  'FY:dien-tu-trong-doan-van': [
    { prompt: "Điền từ: We had a ... of fish and chips.", choices: ["meal","food","water"], answer: "meal", explanation: "Cụm \"a meal of\" đi với một suất ăn; 'food' là danh từ không đếm được nên không dùng với mạo từ a.", errorTag: "nghia_cua_gan_nghia", dang: "nhin" },
    { prompt: "Điền từ: My brother ... basketball every Sunday.", choices: ["plays","makes","does"], answer: "plays", explanation: "Thể thao đi với play: play basketball. Dịch word-by-word từ \"chơi/làm\" tiếng Việt là lỗi hay gặp.", errorTag: "chon_dong_tu_theo_nghia_viet", dang: "nhin" },
  ],
  'FY:xay-cum-tu': [
    { prompt: "Ghép lượng từ đúng với \"water\".", choices: ["a little","a few","many"], answer: "a little", explanation: "Danh từ không đếm được dùng a little; a few và many đứng trước danh từ đếm được số nhiều.", errorTag: "luong_tu_tru_danh_tu", dang: "nhin" },
    { prompt: "Cụm từ nào hoàn chỉnh?", choices: ["a big blue bag","a big blue","big blue"], answer: "a big blue bag", explanation: "Cụm danh từ cần danh từ chính: a big blue bag; hai đáp án còn lại thiếu bag.", errorTag: "cum_tu_thieu_danh_tu", dang: "nhin" },
  ],
  'FY:noi': [
    { prompt: "Câu cần nói: \"I usually get up at seven\". Âm nào dễ bị nuốt nhất?", choices: ["âm cuối của seven","âm đầu của I","âm của at"], answer: "âm cuối của seven", explanation: "seven có phụ âm cuối /n/ dễ bị nuốt khi nói nhanh; âm đầu và at đều rõ, ngắn.", errorTag: "thieu_am_dau_cuoi", dang: "nhin" },
    { prompt: "Chọn cách ngắt hơi đúng khi nói \"My favourite sport is swimming\".", choices: ["My favourite sport / is swimming","My / favourite sport is swimming","My favourite / sport is swimming"], answer: "My favourite sport / is swimming", explanation: "Ngắt sau cụm chủ ngữ, không cắt đôi cụm \"favourite sport\".", errorTag: "ngat_giua_cau", dang: "nhin" },
  ],
  'FY:doc-hieu': [
    { prompt: "Đoạn văn kể một ngày của bạn nhỏ ở trang trại. Câu nào là ý chính?", choices: ["Bạn nhỏ cùng bố mẹ làm việc đồng áng cả ngày","Bạn nhỏ cho gà ăn lúc bảy giờ","Trang trại có mười con bò"], answer: "Bạn nhỏ cùng bố mẹ làm việc đồng áng cả ngày", explanation: "Ý chính khái quát toàn đoạn; hai câu kia chỉ là chi tiết cụ thể.", errorTag: "chi_tiet_khong_phai_y_chinh", dang: "nhin" },
    { prompt: "Bài viết \"Mum took an umbrella\". Suy luận nào hợp lí nhất?", choices: ["Trời có thể đang mưa","Mum thích màu xanh","Gia đình sẽ đi biển"], answer: "Trời có thể đang mưa", explanation: "Umbrella là bằng chứng duy nhất trong bài; các đáp án khác không có chi tiết nào nâng đỡ.", errorTag: "suy_luan_thieu_bang_chung", dang: "nhin" },
  ],
  'FY:ke-chuyen': [
    { prompt: "Chuỗi tranh kể việc bạn nhỏ đã làm tuần trước. Câu nào đúng?", choices: ["She visited her grandparents.","She visits her grandparents.","She will visit her grandparents."], answer: "She visited her grandparents.", explanation: "Tranh kể việc đã xảy ra nên động từ chia quá khứ đơn.", errorTag: "nham_dong_tu_qua_khu", dang: "nhin" },
    { prompt: "Câu chuyện: \"First we picked leaves then we made a kite\". Cần sửa gì?", choices: ["tách thành hai câu và thêm dấu chấm","viết hoa chữ First","đổi picked thành pick"], answer: "tách thành hai câu và thêm dấu chấm", explanation: "Mỗi mệnh đề trọn nghĩa là một câu; thiếu dấu chấm khiến chuyện thành một chuỗi dài.", errorTag: "thieu_dau_cham", dang: "nhin" },
  ],
  'FY:on-tap': [
    { prompt: "Trạm Đọc có 4 câu, em đã dành 2 phút cho câu 1. Cách chia thời gian nào đúng?", choices: ["khoảng 30 giây mỗi câu rồi quay lại câu khó","dồn hết thời gian cho câu 1","làm ba câu sau thật nhanh"], answer: "khoảng 30 giây mỗi câu rồi quay lại câu khó", explanation: "Bài dài cần chia đều thời gian, không dồn một câu rồi bỏ các câu còn lại.", errorTag: "thieu_thoi_gian_lam_bai_dai", dang: "nhin" },
    { prompt: "Sáu trạm: Nghe sai 3/4 câu, Đọc sai 1/4 câu. Em cần luyện gì nhất?", choices: ["Nghe","Đọc","Viết"], answer: "Nghe", explanation: "So sánh theo tỉ lệ: 3/4 cao hơn 1/4, nên Nghe là phần cần luyện.", errorTag: "nham_ke_nang_can_hoc", dang: "nhin" },
  ],
};
