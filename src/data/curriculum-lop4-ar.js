/**
 * curriculum-lop4-ar.js
 * Registry 35 AR worlds cho Toán lớp 4.
 * Đây là metadata curriculum-first: game engine không phụ thuộc vào từng SGK riêng lẻ.
 */
const Lop4ARWorlds = [
  ['L4-01','Number Dash','Số đến 100 000','NUMBER_VALUE','POINT'],
  ['L4-02','Million Mountain','Số đến hàng triệu; đọc, viết, so sánh','PLACE_VALUE','SWIPE'],
  ['L4-03','Rounding Hoops','Làm tròn số','ROUNDING','PUNCH'],
  ['L4-04','Even/Odd Dance','Số chẵn, số lẻ','PARITY','STEP'],
  ['L4-05','Weight Factory','Yến, tạ, tấn và chuyển đổi khối lượng','MASS_UNIT','GRAB'],
  ['L4-06','Area Builder','dm², m², mm² và diện tích','AREA','TWO_HAND_STRETCH'],
  ['L4-07','Time Machine','Giây, thế kỷ và mốc thời gian','TIME','JUMP'],
  ['L4-08','Angle Hero','Góc nhọn, vuông, tù, bẹt','ANGLE_CLASSIFICATION','ANGLE_POSE'],
  ['L4-09','Laser Architect','Hai đường thẳng vuông góc/song song','LINES','TWO_HAND_STRETCH'],
  ['L4-10','Math Boxing','Biểu thức và thứ tự thực hiện','EXPRESSIONS','PUNCH'],
  ['L4-11','Multiplication Rocket','Nhân số tự nhiên','MULTIPLICATION','PUNCH'],
  ['L4-12','Division Conveyor','Chia số tự nhiên, thương và số dư','DIVISION','SWIPE'],
  ['L4-13','Balance Lab','Tính chất giao hoán, kết hợp, phân phối','OPERATIONS_PROPERTIES','TWO_HAND_STRETCH'],
  ['L4-14','Delivery Route','Bài toán nhiều bước','WORD_PROBLEMS','STEP'],
  ['L4-15','Data Catch','Dãy số liệu và đọc dữ liệu','DATA_TABLE','GRAB'],
  ['L4-16','Bar Builder','Biểu đồ cột','BAR_CHART','TWO_HAND_STRETCH'],
  ['L4-17','Picture Market','Biểu đồ tranh','PICTOGRAPH','POINT'],
  ['L4-18','Chance Lab','Mô tả khả năng xảy ra','PROBABILITY','LEFT_RIGHT_RAISE'],
  ['L4-19','Fraction Pizza','Khái niệm phân số','FRACTION_MEANING','GRAB'],
  ['L4-20','Fraction Mirror','Phân số bằng nhau','EQUIVALENT_FRACTION','TWO_HAND_STRETCH'],
  ['L4-21','Fraction Ninja','Rút gọn phân số','SIMPLIFY_FRACTION','SWIPE'],
  ['L4-22','Common-Denominator Factory','Quy đồng mẫu số','COMMON_DENOMINATOR','GRAB'],
  ['L4-23','Fraction Race','So sánh phân số','COMPARE_FRACTION','STEP'],
  ['L4-24','Fraction Fusion','Cộng phân số cùng mẫu','FRACTION_ADD_SAME','PUNCH'],
  ['L4-25','Fraction Reactor','Trừ phân số cùng mẫu','FRACTION_SUB_SAME','PUNCH'],
  ['L4-26','Treasure Split','Phân số của một số','FRACTION_OF_NUMBER','GRAB'],
  ['L4-27','Ratio Rescue','Bài toán tổng-tỉ / hiệu-tỉ','RATIO_PROBLEMS','TWO_HAND_STRETCH'],
  ['L4-28','Map Explorer','Bản đồ và tỉ lệ bản đồ','MAP_SCALE','STEP'],
  ['L4-29','Parallelogram Pull','Hình bình hành và diện tích','PARALLELOGRAM_AREA','TWO_HAND_STRETCH'],
  ['L4-30','Diamond Builder','Hình thoi và diện tích','RHOMBUS_AREA','TWO_HAND_STRETCH'],
  ['L4-31','Mixed Sprint','Ôn tập số học tổng hợp','MIXED_NUMBER_REVIEW','RUN'],
  ['L4-32','Geometry Arena','Ôn tập hình học - đo lường','MIXED_GEOMETRY_REVIEW','ANGLE_POSE'],
  ['L4-33','Fraction Arena','Ôn tập phân số','MIXED_FRACTION_REVIEW','SWIPE'],
  ['L4-34','Data Arena','Ôn tập dữ liệu - xác suất','MIXED_DATA_REVIEW','LEFT_RIGHT_RAISE'],
  ['L4-35','Grand Math Arena','Ôn tập cuối năm Toán 4','YEAR_END_REVIEW','FULL_BODY']
].map(([id,title,description,skillId,movement]) => ({
  id, title, grade: 4, subject: 'math',
  description, skillId, movement,
  cameraFirst: true,
  fallback: ['upper-body','hand-only'],
  roundSeconds: 60,
  learningFeedback: true,
  localOnlyVision: true
}));

const Lop4ARCurriculum = {
  version: '1.0.0',
  grade: 4,
  totalWorlds: Lop4ARWorlds.length,
  worlds: Lop4ARWorlds,
  getById(id) { return this.worlds.find(w => w.id === id) || null; },
  getBySkill(skillId) { return this.worlds.filter(w => w.skillId === skillId); },
  validate() {
    const errors = [];
    const ids = new Set();
    for (const w of this.worlds) {
      if (ids.has(w.id)) errors.push('Duplicate world id: ' + w.id);
      ids.add(w.id);
      for (const key of ['title','description','skillId','movement']) {
        if (!w[key]) errors.push(w.id + ' missing ' + key);
      }
    }
    if (this.totalWorlds !== 35) errors.push('Expected 35 worlds, got ' + this.totalWorlds);
    return { ok: errors.length === 0, errors };
  }
};

if (typeof window !== 'undefined') {
  window.Lop4ARWorlds = Lop4ARWorlds;
  window.Lop4ARCurriculum = Lop4ARCurriculum;
}
