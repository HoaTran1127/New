// Thư viện cụm kiến thức: mỗi cụm quy định lỗi học sinh thường mắc (errorTag),
// nội dung câu hỏi bắt buộc và cách giải thích trực quan.
// errorTag: game gan nhan loi vao cau sai, tong ket theo nhom loi (hoc theo co che thu vien loi).
// Cach nay giup man tong ket khong chi bao cao dung/sai ma chi ra kNang nao can luyen.

const C = {
  'hang-so': {
    tags: ['thieu_hang_trong', 'doi_chou_hai_hang', 'doc_nham_hang'],
    noi_dung: 'số tự nhiên đến 100000 và 1000000; giá trị theo hàng; viết dưới dạng tổng các hàng; số có chữ số 0 ở hàng trung gian',
    giai_thich: 'phóng to chữ số đang xét trên bảng lớp số (hàng đơn vị → hàng triệu) và tô màu hàng được hỏi',
  },
  'so-sanh-sap-xep': {
    tags: ['so_sanh_khong_cung_hang', 'dau_lon_hon_be_hon', 'sap_xep_nguoc_chieu'],
    noi_dung: 'so sánh hai số nhiều chữ số; sắp xếp 4 số theo thứ tự từ bé đến lớn và ngược lại; số lớn nhất có n chữ số',
    giai_thich: 'xếp các số thẳng hàng theo cột hàng đơn vị rồi so sánh từ trái sang phải',
  },
  'lam-tron': {
    tags: ['quen_lam_tron_khi_bang_5', 'lam_tron_sai_hang', 'doc_sai_vach_tia_so'],
    noi_dung: 'làm tròn đến hàng chục, trăm, nghìn, chục nghìn, trăm nghìn; ước lượng tổng hiệu bằng cách làm tròn trước',
    giai_thich: 'vẽ tia số với hai mốc tròn liền kề và đánh dấu số cần làm tròn ở giữa',
  },
  'chan-le': {
    tags: ['xet_hang_chuc_thay_vi_don_vi', 'nham_so_ket_thuc_bang_0'],
    noi_dung: 'nhận biết số chẵn số lẻ qua chữ số tận cùng; dãy số chẵn liên tiếp; tổng hiệu tính chẵn lẻ',
    giai_thich: 'bật đèn LED hai màu sáng ở chữ số tận cùng để học sinh thấy chỉ hàng đơn vị quyết định',
  },
  'khoi-luong': {
    tags: ['doi_don_vi_thieu_so_0', 'nham_1_tan_100_kg', 'so_sanh_chua_doi_don_vi'],
    noi_dung: 'tấn, tạ, kg, g; đổi đơn vị; so sánh khối lượng; tính tổng khối lượng nhiều vật',
    giai_thich: 'vẽ cân hai đĩa và chuỗi nhân chia 10 giữa các đơn vị',
  },
  'dien-tich-don-vi': {
    tags: ['dem_o_chuong_lac', 'nham_chu_vi_thanh_dien_tich', 'thieu_don_vi_vuong'],
    noi_dung: 'cm², dm², m²; đếm ô vuông để tính diện tích; diện tích hình chữ nhật, vuông',
    giai_thich: 'tô màu từng ô vuông 1cm² rồi mới chuyển sang công thức dài × rộng',
  },
  'thoi-gian': {
    tags: ['kim_ngan_kim_dai_nguoc', 'nham_1gio_100_phut', 'theu_ngay_tuan'],
    noi_dung: 'đọc giờ trên đồng hồ; phút và giây; thế kỉ; khoảng thời gian giữa hai mốc; đổi ngày giờ',
    giai_thich: 'quay đồng hồ thật theo tiến trình và hiện bảng 1 giờ = 60 phút, 1 phút = 60 giây',
  },
  'goc': {
    tags: ['dinh_goc_sai_dinh', 'doc_o_vach_ngoai', 'nham_goc_tu_goc_nhon'],
    noi_dung: 'góc nhọn, vuông, tù, bẹt; đỉnh, cạnh; đo góc bằng thước nửa tròn; góc ở đỉnh chung',
    giai_thich: 'vẽ tia quay từ cạnh ban đầu, giữ nguyên đỉnh, tô phần quạt đang mở',
  },
  'vuong-goc-song-song': {
    tags: ['keo_dai_nghi_la_song_song', 'qua_tam_dinh_khi_ke', 'nham_vuong_goc_voi_thang'],
    noi_dung: 'hai đường thẳng vuông góc, song song; kẻ đường vuông góc; nhận diện trong thực tế',
    giai_thich: 'kéo dài hai đường thành dải sáng để thấy chúng cắt nhau hay không cắt nhau',
  },
  'cong-tru': {
    tags: ['thieu_muon', 'thieu_quan', 'tinh_sai_thu_tu_co_ngoac'],
    noi_dung: 'cộng trừ số có đến 6 chữ số; thành phần và giá trị biểu thức; tính giá trị biểu thức có ngoặc',
    giai_thich: 'hiện lại từng cột tính dọc, nháy sáng cột đang nhớ/đang mượn',
  },
  'nhan': {
    tags: ['sai_hang_chuc_khi_nhan', 'quen_them_chu_so_0', 'nham_11_sai_quy_tac'],
    noi_dung: 'bảng cửu chương 2–9; nhân số có 2–3 chữ số với số có 1 chữ số; nhân nhẩm với 11; nhân với 10 100 1000',
    giai_thich: 'tách phép nhân thành từng phần theo hàng rồi cộng lại (decomposition)',
  },
  'chia': {
    tags: ['thuong_sai_uoc_luong', 'bo_qua_so_du', 'so_du_lon_hon_so_chia'],
    noi_dung: 'chia số có 2–3 chữ số cho 1–2 chữ số; số chia hết cho 2 3 5 9; chia nhẩm; chia hết và còn dư',
    giai_thich: 'chia đồ vật thành các nhóm bằng nhau trên băng chuyền và hiện phần còn dư',
  },
  'tat-ca': {
    tags: ['nhan_sai_thu_tu_thuc_hien', 'doi_tinh_chat_nham', 'chon_bieu_thuc_tuong_dung_sai'],
    noi_dung: 'tính chất giao hoán kết hợp; biểu thức có ngoặc; giá trị của biểu thức chữ; hai phép tính tương đương',
    giai_thich: 'cân hai đĩa: mỗi vế là một đĩa, cân bằng khi giá trị bằng nhau',
  },
  'bai-toan-nhieu-buoc': {
    tags: ['chon_sai_phep_tinh', 'dieu_kien_trung_gian_thieu', 'don_vi_bai_toan_sai'],
    noi_dung: 'bài toán rút về đơn vị; bài toán tìm hai số khi biết tổng và tỉ; tổng hiệu; các bước giải',
    giai_thich: 'sơ đồ đoạn thẳng cho từng bước và đánh dấu bước đang làm trên bản đồ tuyến',
  },
  'bang-so-lieu': {
    tags: ['doc_nham_cot', 'dem_trung_gia_tri', 'tinh_trung_binh_cong_sai'],
    noi_dung: 'dãy số liệu; bảng thống kê; số trung bình cộng; tìm lớn nhất nhỏ nhất trong bảng',
    giai_thich: 'tô sáng ô bảng đang được hỏi kèm tên cột tên hàng',
  },
  'bieu-do-cot': {
    tags: ['dem_o_sai_ty_le', 'so_sanh_chieu_cao_khong_cung_goc', 'thieu_don_vi_truc'],
    noi_dung: 'đọc biểu đồ cột; biểu đồ cột đôi; tạo cột theo số liệu; câu hỏi so sánh trên biểu đồ',
    giai_thich: 'kẻ đường ngang từ đỉnh cột tới trục số để đọc đúng giá trị',
  },
  'bieu-do-tranh': {
    tags: ['quen_nhan_cua_1_hinh', 'chia_le_chinh_xac', 'dem_hinh_thieu'],
    noi_dung: 'biểu đồ tranh; mỗi hình đại diện mấy đơn vị; đọc và xử lí số liệu trên biểu đồ tranh',
    giai_thich: 'phóng to chú giải "1 hình = 5 cái" rồi mới đếm',
  },
  'xac-suat': {
    tags: ['nham_co_the_kha_chac', 'bo_qua_kha_nang_bang_nhau', 'dem_khong_het_mau'],
    noi_dung: 'chắc chắn, có thể, không thể; khả năng xảy ra của sự kiện rút bóng, quay thẻ, tung đồng xu',
    giai_thich: 'đếm số kết quả thuận lợi trên tổng số kết quả và hiện tỉ lệ đó',
  },
  'phan-so-dau': {
    tags: ['tu_so_mau_so_dao_nguoc', 'so_sanh_theo_so_phan_tu_thoi', 'bieu_dien_o_khong_bang_nhau'],
    noi_dung: 'khái niệm phân số; tử số mẫu số; phân số lớn hơn 1 bé hơn 1 bằng 1; đọc viết phân số; biểu diễn trên hình',
    giai_thich: 'cắt hình thành các phần bằng nhau và tô đúng số phần tử số',
  },
  'phan-so-bang-nhau': {
    tags: ['nhan_chia_tu_ma_khong_cung_so', 'rut_gon_chua_het', 'nham_phan_so_bang_nhau_voi_gan_bang'],
    noi_dung: 'rút gọn phân số; phân số bằng nhau; hai cách biểu diễn của cùng một giá trị',
    giai_thich: 'thanh phân số trượt: hai thanh bằng nhau khi tô trùng chiều dài',
  },
  'quy-dong-mau': {
    tags: ['doi_mau_quen_doi_tu', 'chon_mau_chung_khong_nho_nhat', 'giu_nguyen_phan_so_le'],
    noi_dung: 'quy đồng mẫu số hai phân số; mẫu số chung; so sánh phân số khác mẫu',
    giai_thich: 'nhân cả tử và mẫu cùng một số, hiện mũi tên liên kết hai phân số',
  },
  'cong-tru-phan-so': {
    tags: ['cong_tu_voi_mau', 'ket_qua_khong_rut_gon', 'hung_so_tach_roi_sai'],
    noi_dung: 'cộng trừ hai phân số cùng mẫu số; hỗn số; phần nguyên phần phân số',
    giai_thich: 'ghép thanh phân số trên cùng trục để thấy chỉ cộng phần bằng nhau',
  },
  'phan-so-cua-mot-so': {
    tags: ['chia_thieu_bang_so_phan_chia', 'nham_phep_nhan_phep_chia', 'do_dai_cac_phan_bang_nhau'],
    noi_dung: 'tìm phân số của một số; chia một hình thành số phần bằng nhau rồi lấy mấy phần',
    giai_thich: 'chia kho báu thành đúng số phần rồi tô số phần lấy đi',
  },
  'ti-so-tong-hieu': {
    tags: ['thieu_buoc_tinh_tong_so_phan', 'nham_ti_so_thanh_hieu_so', 'tra_loi_thieu_don_vi'],
    noi_dung: 'tỉ số; bài toán tìm hai số khi biết tổng và tỉ số; hiệu và tỉ số',
    giai_thich: 'sơ đồ đoạn thẳng chia đúng số phần bằng nhau của tỉ số',
  },
  'ti-le-ban-do': {
    tags: ['nham_chieu_dai_thuc_te', 'doi_don_vi_cm_km', 'do_dai_on_giay_sai'],
    noi_dung: 'tỉ lệ bản đồ; độ dài thật trên bản đồ; đọc phương hướng và khoảng cách',
    giai_thich: 'thước kẻ ảo đo trên bản đồ rồi hiện phép tính đổi ra độ dài thật',
  },
  'hinh-binh-hanh': {
    tags: ['dung_canh_ben_lam_chieu_cao', 'nham_chu_vi_voi_dien_tich', 'khong_doi_don_vi_hai_dai_luong'],
    noi_dung: 'đặc điểm hình bình hành; diện tích đáy × chiều cao; chu vi',
    giai_thich: 'cắt một phần hình bình hành và ghép lại thành chữ nhật để thấy công thức',
  },
  'hinh-thoi': {
    tags: ['nham_duong_cheo_thanh_canh', 'quen_chia_2_tich_hai_duong_cheo', 'sai_don_vi_dien_tich'],
    noi_dung: 'đặc điểm hình thoi; hai đường chéo vuông góc; diện tích tích hai đường chéo chia 2',
    giai_thich: 'nối hai đường chéo rồi tô 4 tam giác ghép thành hình chữ nhật',
  },
  'on-tap-toan-4': {
    tags: ['tron_loai_phep_tinh', 'quen_rut_gon_ket_qua', 'doc_de_thieu_dieu_kien'],
    noi_dung: 'ôn tổng hợp số tự nhiên, bốn phép tính, phân số, hình học và đo lường lớp 4',
    giai_thich: 'gọi lại kiến thức lớp 4 tương ứng với từng cửa ải',
  },
  'thap-phan-khai-niem': {
    tags: ['gia_tri_tuong_ung_hang_thap_phan', 'doc_phan_thap_phan_tram', 'them_so_0_ben_phai_sai_gia_tri'],
    noi_dung: 'khái niệm số thập phân; hàng phần mười phần trăm phần nghìn; đọc viết số thập phân; so sánh; làm tròn',
    giai_thich: 'kéo vạch phần thập phân trên lưới 100 ô cạnh hình vuông đơn vị',
  },
  'chuyen-dong-f-d-p': {
    tags: ['nham_ty_le_10_100_1000', 'thieu_dau_phay_thap_phan', 'doi_phan_so_thap_phan_sai'],
    noi_dung: 'chuyển đổi phân số thập phân – số thập phân – phần trăm; so sánh ba dạng; xếp cặp bằng giá trị',
    giai_thich: 'thanh băng ba ô: phân số, số thập phân, phần trăm cùng độ dài khi bằng nhau',
  },
  'phan-tram': {
    tags: ['nham_100_phan_tram_bang_1', 'tinh_phan_tram_cua_mot_so_sai_buoc', 'tru_giam_gia_nham_cong_tru'],
    noi_dung: 'tỉ số phần trăm; đọc viết phần trăm; tính phần trăm của một số; bài toán mua bán giảm giá lãi suất đơn giản',
    giai_thich: 'lưới 100 ô tô màu đúng số ô tương ứng với tỉ lệ phần trăm',
  },
  'the-tich': {
    tags: ['dem_lap_phuong_thieu_lo', 'nham_the_tich_voi_dien_tich_mat', 'doi_don_vi_thieu_lap_phuong'],
    noi_dung: 'xăng-ti-mét khối, mét khối; thể tích hình hộp chữ nhật và lập phương; đếm khối lập phương 1cm³',
    giai_thich: 'xếp khối lập phương theo từng lớp rồi nhân số lớp',
  },
  'ti-so-dau-bep': {
    tags: ['nham_ti_so_thanh_phep_chia_don_vi', 'gap_doi_khong_gap_den_4', 'don_vi_nguyen_lieu_lech'],
    noi_dung: 'tỉ số nguyên liệu trong công thức nấu ăn; gấp hoặc giảm khẩu phần; bài toán liên quan đến rút về đơn vị',
    giai_thich: 'cái nồi hiện tỉ lệ nguyên liệu: tăng số bát thì các nguyên liệu khác tăng cùng hệ số',
  },
  'chuyen-dong-de': {
    tags: ['doi_phut_ra_gio_sai', 'nham_cong_tru_van_toc', 'quen_tru_thoi_gian_di_tru'],
    noi_dung: 'quãng đường vận tốc thời gian; đơn vị đo thời gian; hai chuyển động ngược chiều cùng khởi hành',
    giai_thich: 'đường chạy có hai vạch chuyển động lại gần nhau và điểm gặp ghi sẵn tổng vận tốc',
  },
  'hinh-hoc-on-tap': {
    tags: ['nham_cong_thuc_chu_vi_dien_tich', 'thieu_buoc_doi_deu_don_vi', 'goi_ten_hinh_sai'],
    noi_dung: 'chu vi diện tích các hình đã học; hình tròn tâm bán kính đường kính; thể tích hình hộp',
    giai_thich: 'bảng so sánh công thức ba hình cạnh nhau để chọn đúng công thức',
  },
  'thap-phan-can-bang': {
    tags: ['so_sanh_hang_phan_muoi_thoi', 'them_so_0_xoay_cac_dau', 'dau_bang_nhau_tru_so_0'],
    noi_dung: 'so sánh và sắp thứ tự số thập phân; hai số thập phân bằng nhau; cân bằng hai vế thập phân',
    giai_thich: 'đặt thẳng cột theo dấu phẩy rồi so sánh từng hàng',
  },
  'on-tap-toan-5': {
    tags: ['chon_sai_chi_luoc_giai', 'quen_thu_thi_giua_chung', 'ket_luan_sai_don_vi'],
    noi_dung: 'ôn tổng hợp số thập phân, phân số, phần trăm, hình học, đo lường và bài toán chuyển động lớp 5',
    giai_thich: 'chọn chiến lược (rút về đơn vị, tỉ số, sơ đồ đoạn thẳng) rồi mới tính',
  },
  'tu-vung': {
    tags: ['nham_gan_nghia', 'chinh_ta_sai_nguyen_am', 'thieu_s_danh_tu_so_nhieu'],
    noi_dung: 'từ vựng Tiếng Anh: Animals, School, Family, Jobs, Colours, Hobbies; nghĩa tiếng Việt tương ứng',
    giai_thich: 'dịch nghĩa + phiên âm + ví dụ minh hoạ + lặp lại bằng speechSynthesis khi đúng',
  },
  'nghe': {
    tags: ['am_cuoi_s_ed_t', 'phien_am_gan_giong', 'bo_lo_tu_dai'],
    noi_dung: 'nghe và chọn từ tranh tương ứng; nghe và chọn số hoặc màu; khoảng 10-15 từ mỗi chủ đề',
    giai_thich: 'highlight âm nghe được, cho bấm phát lại tối đa 3 lần rồi hiện transcript',
  },
  'ghep-tranh-tu': {
    tags: ['nham_cap_gan_chu', 'hoi_tu_ngan_dai'],
    noi_dung: 'nối tranh với từ; kéo thả từ vào chỗ trống theo tranh; nhận diện từ qua hình',
    giai_thich: 'nghĩa tiếng Việt bật lên khi ghép đúng và giữ tranh sáng đến cuối vòng',
  },
  'chinh-ta': {
    tags: ['thieu_chu_cai', 'nham_v_i_y', 'double_consonant'],
    noi_dung: 'điền chữ cái còn thiếu; sửa lỗi chính tả; chọn cách viết đúng của từ lớp 4-5',
    giai_thich: 'đánh đỏ vị trí sai và hiện từ đúng kèm phiên âm',
  },
  'xay-tu': {
    tags: ['sai_thu_tu_chu_cai', 'thieu_chu_cai_cuoi', 'dem_sau_chu_cai_thieu'],
    noi_dung: 'bảng chữ cái bị xáo trộn: ghép thành từ đúng; mỗi từ có nghĩa gợi ý',
    giai_thich: 'kéo từng chữ vào ô trống, hiện nghĩa và đọc lại từ ghép đúng',
  },
  'xep-cau': {
    tags: ['thieu_to_be', 'vi_tri_tru_tu_sai', 'quyen_hien_tai_dong_tu'],
    noi_dung: 'sắp xếp các từ đã cho thành câu có nghĩa; điền động từ to be a/an the',
    giai_thich: 'dán nhãn S-V-O dưới câu ghép đúng và đọc to câu',
  },
  'trieu-tu-vung': {
    tags: ['nho_vi_tri_khong_nho_nghia', 'nham_hinh_anh_tuong_tu'],
    noi_dung: 'lật thẻ ghép cặp từ với tranh/nghĩa; bộ 8-12 cặp mỗi chủ đề',
    giai_thich: 'cặp đúng giữ mở và đọc to; cặp sai đóng lại ở lượt sau để tái hiện',
  },
  'phonics': {
    tags: ['mau_chu_gh', 'am_dau_th_c', 'ket_thuc_ed_ung'],
    noi_dung: 'âm và mẫu chữ thường gặp: sh ch th ph gh ea ee oo ai ay; chọn từ chứa âm mục tiêu',
    giai_thich: 'phát lại âm và gạch chân đúng chữ cái tạo âm trong từ',
  },
  'cau-hoi': {
    tags: ['thieu_tu_hoi', 'sai_trat_tu_dao_ngu', 'tra_loi_dung_truc_tu_hoi'],
    noi_dung: 'What is this How much Where is Who are you How old và câu trả lời mẫu',
    giai_thich: 'đặt từ để hỏi lên đầu câu và highlight động từ theo sau',
  },
  'ke-chuyen': {
    tags: ['thieu_thu_tu_menh_de', 'thieu_dau_cham', 'nham_dong_tu_qua_khu'],
    noi_dung: 'sắp xếp 3-5 tranh theo trình tự; chọn câu phù hợp với từng tranh',
    giai_thich: 'đọc toàn bộ câu chuyện sau khi xếp đúng để ôn ngữ cảnh',
  },
  'nghe-phan-loai': {
    tags: ['nhom_nghia_khong_rang_buoc', 'phat_lai_nhieu_lan', 'am_tuong_dong'],
    noi_dung: 'nghe rồi phân loại từ vào 3 nhóm chủ đề; nghe và chọn từ sai khác',
    giai_thich: 'giữ từ trong rổ đúng và cho chọn lại rổ khi phân loại sai',
  },
  'doc-hieu': {
    tags: ['chi_tiet_khong_phai_y_chinh', 'suy_luan_thieu_bang_chung', 'doan_sai_trat_tu'],
    noi_dung: 'đoạn văn 60-90 từ lớp 5: ý chính, chi tiết, trình tự, suy luận đơn giản; tìm bằng chứng gạch chân',
    giai_thich: 'hiện câu trong bài chứa bằng chứng và highlight đoạn được chọn',
  },
  'nguphap': {
    tags: ['thi_hieu_du_lu_lien_quan', 'dem_khong_dong_tu_them_s', 'gioi_tu_in_on_at'],
    noi_dung: 'hiện tại đơn hiện tại tiếp diễn quá khứ; danh từ đếm được không đếm được; lượng từ some any',
    giai_thich: 'sửa trực tiếp vị trí sai trong câu và giải thích bằng tiếng Việt',
  },
  'dien-tu-trong-doan-van': {
    tags: ['chon_dong_tu_theo_nghia_viet', 'nghia_cua_gan_nghia', 'ham_duoc_dung_lai'],
    noi_dung: 'đoạn văn có 5-8 chỗ trống chọn từ trong ngân hàng từ; dựa vào ngữ cảnh suy ra từ',
    giai_thich: 'đọc lại cả đoạn sau khi điền đủ và highlight câu chứa từ vừa điền',
  },
  'xay-cum-tu': {
    tags: ['cum_tu_thieu_danh_tu', 'luong_tu_tru_danh_tu', 'mau_dich_gian_hieu'],
    noi_dung: 'ghép từ thành cụm a pair of a glass of how many và đặt câu với cụm',
    giai_thich: 'hiện bản dịch tiếng Việt của cụm sau khi ghép đúng',
  },
  'bo-ba-tri-nho': {
    tags: ['ba_kho_hon_hai', 'nham_gan_tranh', 'nghia_cua_thu_tu_thieu'],
    noi_dung: 'ghép bộ ba từ tranh nghĩa tiếng Việt; 8 bộ mỗi lượt',
    giai_thich: 'sau lượt chơi mở bảng tổng hợp các bộ ba đã ghép đúng',
  },
  'noi': {
    tags: ['thieu_am_dau_cuoi', 'ngat_giua_cau', 'trung_lap_phat_am'],
    noi_dung: 'nói câu ngắn theo tình huống qua Web Speech recognition; khung câu cho sẵn',
    giai_thich: 'hiện transcript nhận được, gạch chân từ thiếu và cho thử lại 3 lần',
  },
  'on-tap': {
    tags: ['nham_ke_nang_can_hoc', 'thieu_thoi_gian_lam_bai_dai', 'bo_qua_chua_bai'],
    noi_dung: 'ôn tổng hợp nghe đọc viết nói ngữ pháp từ vựng tiếng Anh',
    giai_thich: 'báo cáo kỹ năng mạnh yếu và gợi ý đảo luyện lại',
  },
  'dao-kynang': {
    tags: ['xen_ke_ky_nang_gay_nhieu_loi', 'khong_dat_chuan_do_nang', 'bo_dao_thu'],
    noi_dung: 'bản đồ 5 đảo: từ vựng, nghe, chính tả, câu, phát âm; mỗi đảo 3 câu',
    giai_thich: 'sau mỗi đảo hiện huy hiệu và danh sách từ cần luyện lại',
  },
  'boss-cong-thu': {
    tags: ['muc_kho_cao_gay_sot', 'quen_chi_luoc', 'thieu_thoi_gian_suy_nghi'],
    noi_dung: 'trận boss tổng hợp: 3 giai đoạn tăng độ khó với kiến thức đã học trong chương',
    giai_thich: 'sau mỗi giai đoạn cho chọn 1 gợi ý miễn phí rồi mới tái hiện câu sai',
  },
};

const normalize = (k) => k.replace(/[^a-z0-9]/g, '');
const BY_KEY = {};
for (const k of Object.keys(C)) BY_KEY[normalize(k)] = { ...C[k], name: k };

export function cluster(key) {
  const hit = BY_KEY[normalize(key)];
  if (!hit) throw new Error('Khong tim thay cum kien thuc: ' + key);
  return hit;
}
export const CLUSTER_KEYS = Object.keys(C);
