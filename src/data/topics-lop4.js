/**
 * topics-lop4.js
 * Ngân hàng bài tập Toán Lớp 4
 * Bám sát chương trình GDPT Tiểu học:
 * - Nhân nhẩm (nhân 11, nhân 10/100/1000, số có 2 chữ số với 1 chữ số)
 * - Phân số cơ bản (rút gọn, phân số bằng nhau, cộng trừ cùng mẫu)
 * - Đổi đơn vị đo đại lượng (khối lượng, diện tích, thời gian)
 * - Dấu hiệu chia hết cho 2, 3, 5, 9
 */

const Lop4Topics = [
  {
    id: 'lop4_nhan_nham',
    grade: 4,
    title: 'Lớp 4: Nhân Chia Nhẩm Nhanh',
    badge: 'LỚP 4',
    badgeColor: '#3B82F6',
    description: 'Nhân với 11, nhân chia với 10, 100, 1000 và số tròn chục',
    generate() {
      const mode = Math.floor(Math.random() * 3);
      const isCorrect = Math.random() < 0.60;
      let left = '', right = '', ans = 0, displayed = 0, exp = '';

      if (mode === 0) {
        // Nhân nhẩm với 11 (2 chữ số tổng < 10 hoặc >= 10)
        const tens = Math.floor(Math.random() * 6) + 1; // 1 -> 6
        const units = Math.floor(Math.random() * 6) + 1; // 1 -> 6
        const num = tens * 10 + units;
        ans = num * 11;
        left = `${num} × 11`;

        if (isCorrect) {
          displayed = ans;
          exp = `${num} × 11 = ${ans} (Mẹo: ${tens} + ${units} = ${tens + units} chen vào giữa)`;
        } else {
          // Bẫy nhầm: nhân đôi số
          displayed = ans + (Math.random() < 0.5 ? 10 : -10);
          exp = `${num} × 11 = ${ans} (không phải ${displayed})`;
        }
      } else if (mode === 1) {
        // Nhân với số tròn chục hoặc tròn trăm
        const a = (Math.floor(Math.random() * 8) + 2) * 10; // 20, 30... 90
        const b = Math.floor(Math.random() * 7) + 3; // 3 -> 9
        ans = a * b;
        left = `${a} × ${b}`;

        if (isCorrect) {
          displayed = ans;
          exp = `${a} × ${b} = ${ans}`;
        } else {
          displayed = ans + (Math.random() < 0.5 ? 100 : -10);
          exp = `${a} × ${b} = ${ans} (không phải ${displayed})`;
        }
      } else {
        // Chia số tròn chục/trăm
        const b = Math.floor(Math.random() * 6) + 2; // 2 -> 7
        const q = (Math.floor(Math.random() * 8) + 2) * 10; // 20 -> 90
        const a = b * q;
        ans = q;
        left = `${a} : ${b}`;

        if (isCorrect) {
          displayed = ans;
          exp = `${a} : ${b} = ${ans}`;
        } else {
          displayed = ans + (Math.random() < 0.5 ? 10 : -5);
          exp = `${a} : ${b} = ${ans} (không phải ${displayed})`;
        }
      }

      return {
        isCorrect,
        leftPart: left,
        rightPart: `= ${displayed}`,
        text: `${left} = ${displayed}`,
        explanation: exp
      };
    }
  },

  {
    id: 'lop4_phan_so_co_ban',
    grade: 4,
    title: 'Lớp 4: Phân Số Cơ Bản',
    badge: 'LỚP 4',
    badgeColor: '#8B5CF6',
    description: 'Rút gọn phân số, phân số bằng nhau và cộng trừ cùng mẫu',
    generate() {
      const mode = Math.floor(Math.random() * 2);
      const isCorrect = Math.random() < 0.60;
      let left = '', right = '', exp = '';

      if (mode === 0) {
        // Cộng trừ phân số cùng mẫu số
        const den = Math.floor(Math.random() * 6) + 4; // mẫu: 4 -> 9
        const num1 = Math.floor(Math.random() * (den - 2)) + 1;
        const num2 = Math.floor(Math.random() * (den - num1)) + 1;
        const sumNum = num1 + num2;

        left = `${num1}/${den} + ${num2}/${den}`;

        if (isCorrect) {
          right = `= ${sumNum}/${den}`;
          exp = `${num1}/${den} + ${num2}/${den} = ${sumNum}/${den} (giữ nguyên mẫu số)`;
        } else {
          // Bẫy kinh điển của học sinh: cộng cả tử lẫn mẫu!
          const trapChoice = Math.random();
          if (trapChoice < 0.6) {
            right = `= ${sumNum}/${den * 2}`;
            exp = `Cộng phân số cùng mẫu thì giữ nguyên mẫu: = ${sumNum}/${den} (không phải ${sumNum}/${den * 2})`;
          } else {
            right = `= ${sumNum + 1}/${den}`;
            exp = `Tính nhầm tử: ${num1} + ${num2} = ${sumNum}`;
          }
        }
      } else {
        // Phân số bằng nhau / Rút gọn
        const pairs = [
          { a: '2/4', b: '1/2', correct: true },
          { a: '4/6', b: '2/3', correct: true },
          { a: '6/8', b: '3/4', correct: true },
          { a: '5/10', b: '1/2', correct: true },
          { a: '3/9', b: '1/3', correct: true },
          { a: '8/12', b: '2/3', correct: true },
          { a: '4/8', b: '1/4', correct: false, note: '4/8 rút gọn phải là 1/2' },
          { a: '3/6', b: '1/3', correct: false, note: '3/6 rút gọn phải là 1/2' },
          { a: '2/8', b: '1/2', correct: false, note: '2/8 rút gọn phải là 1/4' },
          { a: '6/10', b: '2/5', correct: false, note: '6/10 rút gọn phải là 3/5' }
        ];

        // Lọc cặp tương ứng với isCorrect mong muốn
        const candidatePool = pairs.filter(p => p.correct === isCorrect);
        const chosen = candidatePool[Math.floor(Math.random() * candidatePool.length)];

        left = chosen.a;
        right = `= ${chosen.b}`;
        exp = chosen.correct 
          ? `Rút gọn chính xác: ${chosen.a} = ${chosen.b}` 
          : (chosen.note || `Rút gọn sai: ${chosen.a} ≠ ${chosen.b}`);
      }

      return {
        isCorrect,
        leftPart: left,
        rightPart: right,
        text: `${left} ${right}`,
        explanation: exp
      };
    }
  },

  {
    id: 'lop4_don_vi_do',
    grade: 4,
    title: 'Lớp 4: Đổi Đơn Vị Đo Lường',
    badge: 'LỚP 4',
    badgeColor: '#F59E0B',
    description: 'Đổi đơn vị khối lượng (tấn, tạ, yến, kg) và diện tích (m², dm², cm²)',
    generate() {
      const units = [
        { q: '1 tấn', ans: '1000 kg', fake: '100 kg', exp: '1 tấn = 1000 kg' },
        { q: '3 tấn', ans: '3000 kg', fake: '300 kg', exp: '3 tấn = 3000 kg' },
        { q: '1 tạ', ans: '100 kg', fake: '10 kg', exp: '1 tạ = 100 kg' },
        { q: '5 tạ', ans: '500 kg', fake: '50 kg', exp: '5 tạ = 500 kg' },
        { q: '1 yến', ans: '10 kg', fake: '100 kg', exp: '1 yến = 10 kg' },
        { q: '4 yến', ans: '40 kg', fake: '400 kg', exp: '4 yến = 40 kg' },
        { q: '1 m²', ans: '100 dm²', fake: '10 dm²', exp: '1 m² = 100 dm² (đơn vị diện tích gấp 100 lần)' },
        { q: '2 m²', ans: '200 dm²', fake: '20 dm²', exp: '2 m² = 200 dm²' },
        { q: '1 dm²', ans: '100 cm²', fake: '10 cm²', exp: '1 dm² = 100 cm²' },
        { q: '1 thế kỷ', ans: '100 năm', fake: '1000 năm', exp: '1 thế kỷ = 100 năm' }
      ];

      const item = units[Math.floor(Math.random() * units.length)];
      const isCorrect = Math.random() < 0.60;
      const right = isCorrect ? `= ${item.ans}` : `= ${item.fake}`;
      const exp = isCorrect ? item.exp : `${item.q} phải bằng ${item.ans} (không phải ${item.fake})`;

      return {
        isCorrect,
        leftPart: item.q,
        rightPart: right,
        text: `${item.q} ${right}`,
        explanation: exp
      };
    }
  },

  {
    id: 'lop4_chia_het',
    grade: 4,
    title: 'Lớp 4: Dấu Hiệu Chia Hết',
    badge: 'LỚP 4',
    badgeColor: '#EC4899',
    description: 'Nhận biết các số chia hết cho 2, 3, 5, 9',
    generate() {
      const isCorrect = Math.random() < 0.60;
      const divisorChoices = [2, 5, 9, 3];
      const div = divisorChoices[Math.floor(Math.random() * divisorChoices.length)];

      let num = 0;
      let exp = '';

      if (div === 2) {
        // Chia hết cho 2 tận cùng 0,2,4,6,8
        if (isCorrect) {
          num = Math.floor(Math.random() * 400 + 100) * 2;
          exp = `Đúng: ${num} có chữ số tận cùng chẵn nên chia hết cho 2`;
        } else {
          num = Math.floor(Math.random() * 400 + 100) * 2 + 1;
          exp = `Sai: ${num} là số lẻ nên KHÔNG chia hết cho 2`;
        }
      } else if (div === 5) {
        // Tận cùng 0 hoặc 5
        if (isCorrect) {
          num = Math.floor(Math.random() * 150 + 20) * 5;
          exp = `Đúng: ${num} có tận cùng là 0 hoặc 5 nên chia hết cho 5`;
        } else {
          num = Math.floor(Math.random() * 150 + 20) * 5 + (Math.random() < 0.5 ? 2 : 3);
          exp = `Sai: ${num} không tận cùng bằng 0 hoặc 5 nên không chia hết cho 5`;
        }
      } else {
        // Chia hết cho 9 hoặc 3 (tổng các chữ số)
        const mult = div === 9 ? 9 : 3;
        if (isCorrect) {
          num = (Math.floor(Math.random() * 90) + 12) * mult;
          const digitsSum = String(num).split('').reduce((acc, c) => acc + parseInt(c), 0);
          exp = `Đúng: Tổng chữ số của ${num} là ${digitsSum}, chia hết cho ${mult}`;
        } else {
          num = (Math.floor(Math.random() * 90) + 12) * mult + (Math.random() < 0.5 ? 1 : 2);
          const digitsSum = String(num).split('').reduce((acc, c) => acc + parseInt(c), 0);
          exp = `Sai: Tổng chữ số của ${num} là ${digitsSum}, không chia hết cho ${mult}`;
        }
      }

      return {
        isCorrect,
        leftPart: `Số ${num}`,
        rightPart: `chia hết cho ${div}`,
        text: `Số ${num} chia hết cho ${div}`,
        explanation: exp
      };
    }
  }
];

if (typeof window !== 'undefined') {
  window.Lop4Topics = Lop4Topics;
}
