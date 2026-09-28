/**
 * topics-cuuchuong.js
 * Ngân hàng bài tập Bảng Cửu Chương (Lớp 2, 3, 4 ôn tập)
 * Sinh tự động phép nhân, chia từ 2 đến 9 kèm bẫy thông minh
 */

const CuuChuongTopics = [
  {
    id: 'cuu_chuong_nhan',
    grade: 'all',
    title: 'Bảng Nhân 2 đến 9',
    badge: 'CƠ BẢN',
    badgeColor: '#10B981',
    description: 'Rèn luyện phản xạ tính nhẩm các bảng nhân cửu chương 2 - 9',
    generate() {
      const a = Math.floor(Math.random() * 8) + 2; // 2 -> 9
      const b = Math.floor(Math.random() * 9) + 2; // 2 -> 10
      const correctAns = a * b;
      const isCorrect = Math.random() < 0.60;

      let displayedAns = correctAns;
      let explanation = `${a} × ${b} = ${correctAns}`;

      if (!isCorrect) {
        // Tạo bẫy: nhầm số liền kề hoặc nhầm hàng đơn vị
        const traps = [-a, a, -2, 2, -1, 1, 10, -10];
        const offset = traps[Math.floor(Math.random() * traps.length)];
        displayedAns = correctAns + offset;
        if (displayedAns <= 0 || displayedAns === correctAns) {
          displayedAns = correctAns + 2;
        }
        explanation = `${a} × ${b} = ${correctAns} (không phải ${displayedAns})`;
      }

      return {
        isCorrect,
        leftPart: `${a} × ${b}`,
        rightPart: `= ${displayedAns}`,
        text: `${a} × ${b} = ${displayedAns}`,
        explanation
      };
    }
  },
  {
    id: 'cuu_chuong_chia',
    grade: 'all',
    title: 'Bảng Chia 2 đến 9',
    badge: 'CƠ BẢN',
    badgeColor: '#06B6D4',
    description: 'Phản xạ chia nhẩm trong phạm vi bảng cửu chương',
    generate() {
      const divisor = Math.floor(Math.random() * 8) + 2; // 2 -> 9
      const quotient = Math.floor(Math.random() * 9) + 2; // 2 -> 10
      const dividend = divisor * quotient;
      const isCorrect = Math.random() < 0.60;

      let displayedQuotient = quotient;
      let explanation = `${dividend} : ${divisor} = ${quotient}`;

      if (!isCorrect) {
        const offset = (Math.random() < 0.5 ? 1 : -1) * (Math.floor(Math.random() * 2) + 1);
        displayedQuotient = quotient + offset;
        if (displayedQuotient <= 0 || displayedQuotient === quotient) {
          displayedQuotient = quotient + 2;
        }
        explanation = `${dividend} : ${divisor} = ${quotient} (không phải ${displayedQuotient})`;
      }

      return {
        isCorrect,
        leftPart: `${dividend} : ${divisor}`,
        rightPart: `= ${displayedQuotient}`,
        text: `${dividend} : ${divisor} = ${displayedQuotient}`,
        explanation
      };
    }
  }
];

if (typeof window !== 'undefined') {
  window.CuuChuongTopics = CuuChuongTopics;
}
