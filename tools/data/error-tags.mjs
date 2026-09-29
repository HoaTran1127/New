// Mô tả tiếng Việt cho những errorTag DÙNG CHUNG giữa các cụm (nhan_sai_thu_tu_thuc_hien,
// thieu_hang_trong, double_consonant…). ERROR_NOTES bên cạnh chỉ phủ ba nhãn của chính cụm đó,
// nên câu mẫu mang nhãn ngoài danh sách từng bị dán nhầm nhãn đầu tiên của cụm.
// Giá trị KHÔNG được chứa "; " vì dấu đó là ký tự phân cách của ERROR_NOTES.
import { cluster } from './clusters.mjs';
export const ERROR_TAGS = {
  doc_nham_hang: 'xác định nhầm hàng của chữ số khi đọc giá trị',
  tinh_chat_chan_le_nham: 'suy luận sai tính chất chẵn lẻ của tổng',
  san_nhau_don_vi_tru_khi_so_sanh: 'so sánh hai đại lượng khi chưa đổi về cùng đơn vị',
  nham_1gio_60_phut: 'coi 1 giờ bằng 100 phút khi cộng thời gian',
  'tinh_trai_thu_tu_khong_co ngoặc': 'tính từ trái sang phải khi biểu thức có ngoặc',
  thieu_buoc_tinh_tong_so_phan: 'bỏ bước tính tổng số phần bằng nhau',
  tinh_trung_binh_cong_sai: 'cộng thiếu giá trị hoặc chia nhầm số cột khi tính trung bình cộng',
  tu_so_mau_so_dao_nguoc: 'đảo tử số và mẫu số khi viết phân số',
  'dung-canh-ben-lam-chenh-cao': 'lấy cạnh bên làm chiều cao của hình bình hành',
  'doi-deu-dai-hai-chenh': 'coi hai đường chéo của hình thoi bằng nhau',
  thieu_hang_trong: 'viết thiếu hàng ở giữa khi đọc số',
  nhan_sai_thu_tu_thuc_hien: 'đổi chỗ các thừa số rồi nhân nhầm tích',
  them_so_0_ben_phai_sai_gia_tri: 'thêm chữ số 0 vào bên phải làm đổi giá trị',
  thieu_dau_phay_thap_phan: 'bỏ dấu phẩy thập phân rồi quên đếm chữ số sau dấu phẩy',
  tinh_phan_tram_cua_mot_so_sai_buoc: 'tính phần trăm của một số sai thứ tự nhân và chia',
  thieu_chu_cai: 'viết thiếu chữ cái trong từ',
  mau_chu_sh: 'nhầm phụ âm đôi sh với âm s',
  double_consonant: 'đôi hoặc đơn nhầm số lần chữ cái đôi trong từ',
  dem_khong_dong_tu_them_s: 'dùng dạng động từ không thêm s cho chủ ngữ số ít',
  nham_gan_nghia: 'chọn từ có nghĩa gần giống nhưng sai nghĩa',
  'quen-chia-2-tich-hai-duong-cheo': 'quên chia 2 khi lấy tích hai đường chéo',
};

export const ERROR_TAG_KEYS = Object.keys(ERROR_TAGS);

// Danh sách nhãn lỗi MỘT GIÁO ÁN phải khai báo cho LESSON_DATA: ba nhãn của cụm, cộng mọi nhãn
// mà hai câu mẫu thật sự dùng. Thiếu bước cộng này là tự mâu thuẫn: prompt bắt errorTag "thuộc
// đúng danh sách đã khai báo" nhưng chính mục mẫu lại mang nhãn ngoài danh sách, nên
// verifyQuestionBank() loại hai mục bắt buộc ngay lúc nạp.
export const danhSachNhanLoi = (clusterKey, rows) => {
  const tags = cluster(clusterKey).tags;
  return [...tags, ...[...new Set(rows.map((r) => r.errorTag).filter((t) => !tags.includes(t)))]];
};

// Nhãn tiếng Việt của một lỗi: ưu tiên mô tả theo vị trí trong danh sách lỗi của cụm, nếu câu
// mẫu dùng nhãn của cụm khác thì tra bảng ERROR_TAGS. Không còn đường rơi về notes[0].
export const noteChoLoi = (clusterKey, notes, tag) => {
  const i = cluster(clusterKey).tags.indexOf(tag);
  if (i >= 0) return notes[i];
  const v = ERROR_TAGS[tag];
  if (!v) throw new Error(`errorTag "${tag}" của cụm ${clusterKey} chưa có mô tả tiếng Việt trong tools/data/error-tags.mjs.`);
  return v;
};
