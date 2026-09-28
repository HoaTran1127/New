/**
 * topics-lop5.js
 * Ngân hàng bài tập Toán Lớp 5
 * Bám sát chương trình GDPT Tiểu học:
 * - Số thập phân (cộng, trừ, nhân nhẩm với 0.1, 10, nhân với số tự nhiên)
 * - Phép tính phân số nâng cao (cộng khác mẫu, nhân chia phân số)
 * - Tỉ số phần trăm (tính giá trị phần trăm của một số)
 * - Toán chuyển động đều (Vận tốc, Quãng đường, Thời gian: s = v * t)
 * - Công thức diện tích & chu vi hình phẳng (tam giác, hình tròn)
 */

const Lop5Topics = [
  {
    id: 'lop5_so_thap_phan',
    grade: 5,
    title: 'Lớp 5: Tính Nhẩm Số Thập Phân',
    badge: 'LỚP 5',
    badgeColor: '#10B981',
    description: 'Cộng trừ nhân nhẩm số thập phân, nhân chia với 10, 100, 0.1, 0.01',
    generate() {
      const mode = Math.floor(Math.random() * 3);
      const isCorrect = Math.random() < 0.60;
      let left = '', right = '', ans = 0, displayed = 0, exp = '';

      if (mode === 0) {
        // Nhân số thập phân đẹp: 0.5 x 6 = 3, 0.25 x 4 = 1, 0.2 x 5 = 1...
        const presets = [
          { a: '0.5', b: 6, ans: 3, fake: 30, note: '0.5 là một nửa: 0.5 × 6 = 3' },
          { a: '0.5', b: 8, ans: 4, fake: 40, note: '0.5 × 8 = 4' },
          { a: '0.25', b: 4, ans: 1, fake: 10, note: '0.25 × 4 = 1.0 (nhớ lùi 2 chữ số thập phân)' },
          { a: '0.25', b: 8, ans: 2, fake: 20, note: '0.25 × 8 = 2.0' },
          { a: '0.2', b: 5, ans: 1, fake: 10, note: '0.2 × 5 = 1' },
          { a: '1.5', b: 2, ans: 3, fake: 30, note: '1.5 × 2 = 3' },
          { a: '2.5', b: 4, ans: 10, fake: 100, note: '2.5 × 4 = 10' },
          { a: '0.75', b: 4, ans: 3, fake: 30, note: '0.75 × 4 = 3' }
        ];
        const item = presets[Math.floor(Math.random() * presets.length)];
        left = `${item.a} × ${item.b}`;
        if (isCorrect) {
          right = `= ${item.ans}`;
          exp = `${item.a} × ${item.b} = ${item.ans} (${item.note})`;
        } else {
          right = `= ${item.fake}`;
          exp = `Nhầm dấu phẩy: ${item.a} × ${item.b} = ${item.ans} (không phải ${item.fake})`;
        }
      } else if (mode === 1) {
        // Cộng trừ số thập phân đơn giản
        const aInt = Math.floor(Math.random() * 4) + 1; // 1 -> 4
        const aDec = Math.floor(Math.random() * 8) + 1; // .1 -> .8
        const bDec = 10 - aDec; // bù tròn số
        const a = (aInt + aDec / 10).toFixed(1);
        const b = (Math.floor(Math.random() * 3) + 1 + bDec / 10).toFixed(1);
        const sum = (parseFloat(a) + parseFloat(b)).toFixed(1);

        left = `${a} + ${b}`;
        if (isCorrect) {
          right = `= ${sum}`;
          exp = `${a} + ${b} = ${sum}`;
        } else {
          const fakeSum = (parseFloat(sum) + 0.1).toFixed(1);
          right = `= ${fakeSum}`;
          exp = `Cộng sai nhớ: ${a} + ${b} = ${sum} (không phải ${fakeSum})`;
        }
      } else {
        // Nhân nhẩm với 0.1 hoặc 10
        const n = Math.floor(Math.random() * 80) + 15;
        const isDiv = Math.random() < 0.5;
        if (isDiv) {
          left = `${n} : 10`;
          const trueAns = (n / 10).toFixed(1);
          if (isCorrect) {
            right = `= ${trueAns}`;
            exp = `Chia cho 10 dịch dấu phẩy sang trái 1 chữ số: = ${trueAns}`;
          } else {
            right = `= ${n * 10}`;
            exp = `Chia cho 10 số phải nhỏ đi: = ${trueAns} (không phải ${n * 10})`;
          }
        } else {
          left = `${n} × 0.1`;
          const trueAns = (n * 0.1).toFixed(1);
          if (isCorrect) {
            right = `= ${trueAns}`;
            exp = `Nhân với 0.1 tương đương chia cho 10: = ${trueAns}`;
          } else {
            right = `= ${n * 10}`;
            exp = `Nhân với 0.1 số phải nhỏ đi: = ${trueAns} (không phải ${n * 10})`;
          }
        }
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
    id: 'lop5_ti_so_phan_tram',
    grade: 5,
    title: 'Lớp 5: Tỉ Số Phần Trăm (%)',
    badge: 'LỚP 5',
    badgeColor: '#F59E0B',
    description: 'Tính nhẩm 10%, 20%, 25%, 50% của một số tự nhiên',
    generate() {
      const presets = [
        { percent: '50%', base: 200, ans: 100, fake: 150, tip: '50% là một nửa: 200 : 2 = 100' },
        { percent: '50%', base: 80, ans: 40, fake: 30, tip: '50% của 80 là 80 : 2 = 40' },
        { percent: '25%', base: 100, ans: 25, fake: 50, tip: '25% của 100 là 25' },
        { percent: '25%', base: 400, ans: 100, fake: 200, tip: '25% là 1/4: 400 : 4 = 100' },
        { percent: '10%', base: 350, ans: 35, fake: 350, tip: '10% là 1/10: 350 : 10 = 35' },
        { percent: '10%', base: 70, ans: 7, fake: 14, tip: '10% của 70 là 7' },
        { percent: '20%', base: 50, ans: 10, fake: 20, tip: '20% là 1/5: 50 : 5 = 10' },
        { percent: '20%', base: 200, ans: 40, fake: 20, tip: '20% của 200 là 40' },
        { percent: '75%', base: 100, ans: 75, fake: 25, tip: '75% của 100 là 75' },
        { percent: '100%', base: 88, ans: 88, fake: 100, tip: '100% của 88 chính là 88' }
      ];

      const item = presets[Math.floor(Math.random() * presets.length)];
      const isCorrect = Math.random() < 0.60;
      const left = `${item.percent} của ${item.base}`;
      const right = isCorrect ? `= ${item.ans}` : `= ${item.fake}`;
      const exp = isCorrect 
        ? `${left} = ${item.ans} (${item.tip})`
        : `${left} = ${item.ans} (không phải ${item.fake})`;

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
    id: 'lop5_toan_chuyen_dong',
    grade: 5,
    title: 'Lớp 5: Toán Chuyển Động (s = v × t)',
    badge: 'LỚP 5',
    badgeColor: '#EF4444',
    description: 'Tính Quãng đường (s), Vận tốc (v), Thời gian (t)',
    generate() {
      const mode = Math.floor(Math.random() * 3);
      const isCorrect = Math.random() < 0.60;
      let left = '', right = '', exp = '';

      if (mode === 0) {
        // Tính Quãng đường: s = v * t
        const v = (Math.floor(Math.random() * 5) + 3) * 10; // 30, 40, 50, 60, 70 km/h
        const t = Math.floor(Math.random() * 3) + 2; // 2, 3, 4 giờ
        const s = v * t;

        left = `v = ${v}km/h, t = ${t}h`;
        if (isCorrect) {
          right = `→ s = ${s}km`;
          exp = `Quãng đường: s = v × t = ${v} × ${t} = ${s}km`;
        } else {
          const fakeS = s + (Math.random() < 0.5 ? 20 : -20);
          right = `→ s = ${fakeS}km`;
          exp = `Công thức: s = v × t = ${v} × ${t} = ${s}km (không phải ${fakeS}km)`;
        }
      } else if (mode === 1) {
        // Tính Thời gian: t = s : v
        const v = (Math.floor(Math.random() * 4) + 3) * 10; // 30, 40, 50, 60 km/h
        const t = Math.floor(Math.random() * 3) + 2; // 2, 3, 4 giờ
        const s = v * t;

        left = `s = ${s}km, v = ${v}km/h`;
        if (isCorrect) {
          right = `→ t = ${t}h`;
          exp = `Thời gian: t = s : v = ${s} : ${v} = ${t}h`;
        } else {
          const fakeT = t + 1;
          right = `→ t = ${fakeT}h`;
          exp = `Công thức: t = s : v = ${s} : ${v} = ${t}h (không phải ${fakeT}h)`;
        }
      } else {
        // Tính Vận tốc: v = s : t
        const v = (Math.floor(Math.random() * 4) + 4) * 10; // 40, 50, 60, 70 km/h
        const t = Math.floor(Math.random() * 2) + 2; // 2, 3 giờ
        const s = v * t;

        left = `s = ${s}km, t = ${t}h`;
        if (isCorrect) {
          right = `→ v = ${v}km/h`;
          exp = `Vận tốc: v = s : t = ${s} : ${t} = ${v}km/h`;
        } else {
          const fakeV = v - 10;
          right = `→ v = ${fakeV}km/h`;
          exp = `Công thức: v = s : t = ${s} : ${t} = ${v}km/h (không phải ${fakeV}km/h)`;
        }
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
    id: 'lop5_hinh_hoc',
    grade: 5,
    title: 'Lớp 5: Diện Tích & Chu Vi Hình',
    badge: 'LỚP 5',
    badgeColor: '#6366F1',
    description: 'Diện tích tam giác, hình thang, chu vi hình tròn',
    generate() {
      const mode = Math.floor(Math.random() * 2);
      const isCorrect = Math.random() < 0.60;
      let left = '', right = '', exp = '';

      if (mode === 0) {
        // Diện tích tam giác: S = (a * h) / 2
        const a = (Math.floor(Math.random() * 5) + 3) * 2; // số chẵn: 6, 8, 10, 12, 14
        const h = Math.floor(Math.random() * 5) + 3; // 3, 4, 5, 6, 7
        const s = (a * h) / 2;

        left = `Tam giác đáy ${a}cm, cao ${h}cm`;
        if (isCorrect) {
          right = `→ S = ${s}cm²`;
          exp = `S tam giác = (đáy × cao) : 2 = (${a} × ${h}) : 2 = ${s}cm²`;
        } else {
          // Bẫy quên chia 2
          right = `→ S = ${a * h}cm²`;
          exp = `Quên chia cho 2! S tam giác = (${a} × ${h}) : 2 = ${s}cm² (không phải ${a * h}cm²)`;
        }
      } else {
        // Chu vi hình tròn: C = d * 3.14
        const presets = [
          { d: 10, ans: '31.4 cm', fake: '3.14 cm', exp: 'C = 10 × 3.14 = 31.4 cm' },
          { d: 2, ans: '6.28 cm', fake: '3.14 cm', exp: 'C = 2 × 3.14 = 6.28 cm' },
          { d: 100, ans: '314 cm', fake: '31.4 cm', exp: 'C = 100 × 3.14 = 314 cm' },
          { d: 20, ans: '62.8 cm', fake: '6.28 cm', exp: 'C = 20 × 3.14 = 62.8 cm' }
        ];
        const item = presets[Math.floor(Math.random() * presets.length)];
        left = `Hình tròn đường kính ${item.d}cm`;
        if (isCorrect) {
          right = `→ C = ${item.ans}`;
          exp = `Chu vi hình tròn C = d × 3.14 = ${item.exp}`;
        } else {
          right = `→ C = ${item.fake}`;
          exp = `Tính nhầm dấu phẩy: C = d × 3.14 = ${item.exp} (không phải ${item.fake})`;
        }
      }

      return {
        isCorrect,
        leftPart: left,
        rightPart: right,
        text: `${left} ${right}`,
        explanation: exp
      };
    }
  }
];

if (typeof window !== 'undefined') {
  window.Lop5Topics = Lop5Topics;
}
