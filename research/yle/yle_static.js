// Danh mục từ vựng và cấu trúc Tiếng Anh theo band Cambridge YLE (wordlist chính thức 2025).
// Nguồn: Cambridge "Pre A1 Starters, A1 Movers, A2 Flyers wordlists" (2025) — trích bằng research/yle/, xem research/yle/README.md.
// Band là tích luỹ: Movers ⊇ Starters, Flyers ⊇ Movers. Đừng gõ tay danh sách từ — chạy lại script trích.

export const YLE_BANDS = {
  ST: {
    ma: 'ST', ten: 'Pre A1 Starters', cefr: 'Pre-A1', tukhoa: 'Starters',
    moTa: 'từ nền tảng: danh từ số ít/số nhiều, this/that, There is/are, can, like + V-ing, hiện tại đơn, tính từ sở hữu.',
  },
  MV: {
    ma: 'MV', ten: 'A1 Movers', cefr: 'A1', tukhoa: 'Movers',
    moTa: 'Starters + quá khứ đơn, so sánh hơn/nhất, will, must/have to, giới từ nơi chốn, đếm được/không đếm được, hiện tại tiếp diễn.',
  },
  FY: {
    ma: 'FY', ten: 'A2 Flyers', cefr: 'A2', tukhoa: 'Flyers',
    moTa: 'Movers + hiện tại hoàn thành, bị động, mệnh đề quan hệ, câu điều kiện 1–2, should/might, danh động từ, tường thuật.',
  },
}

const ORDER = ['ST', 'MV', 'FY']

// Cấu trúc ngữ pháp dạy theo band, bám descriptors Cambridge YLE và mạch SGK lớp 4–5.
export const YLE_STRUCTURE = {
  ST: [
    ['Hiện tại đơn với like / love / hate', 'I like swimming. / She likes cats.'],
    ['can chỉ năng lực', 'I can ride a bike. / Can you swim?'],
    ['There is / There are', 'There is a book on the desk. / There are two chairs.'],
    ['this / that, these / those', "What's this? — It's a pen."],
    ['Danh từ số ít – số nhiều', 'one cat – three cats / one box – two boxes'],
    ['Tính từ sở hữu', 'my, your, his, her, our, their + bag'],
    ['Câu hỏi What / Where / Who / How many', 'Where is the dog? — It’s under the table.'],
    ['a / an và giới từ in / on / under', 'an apple, a ball, in the box, under the chair'],
  ],
  MV: [
    ['Quá khứ đơn (có quy tắc + bất quy tắc)', 'I visited my grandma. / We went to the zoo yesterday.'],
    ['So sánh hơn và so sánh nhất', 'A whale is bigger than a dolphin. / He is the fastest runner.'],
    ['will cho dự đoán và tương lai', 'It will rain tomorrow. / I’ll be ten next year.'],
    ['must / have to / can’t (nghiêm cấm, buộc)', 'You must be quiet in class. / You can’t run in the corridor.'],
    ['Đếm được – không đếm được, some / any', 'some water, any eggs, a few apples, a little milk'],
    ['Giới từ nơi chốn – phương hướng', 'next to, between, behind, in front of, opposite'],
    ['Hiện tại tiếp diễn đối chiếu hiện tại đơn', 'Look! He is swimming. / He usually swims at weekends.'],
    ['because / but / and nối câu', 'I like summer because I can go swimming.'],
  ],
  FY: [
    ['Hiện tại hoàn thành với already / yet / just / ever', "I've already finished my homework. / Have you ever seen a whale?"],
    ['Câu bị động', 'The kite was made by my brother. / English is spoken here.'],
    ['Mệnh đề quan hệ who / which / where', 'The girl who is singing is my sister.'],
    ['Câu điều kiện loại 1 và loại 2', "If it rains, we'll stay at home. / If I were a bird, I'd fly."],
    ['should / shouldn’t, might / could', 'You should drink more water. / It might snow tonight.'],
    ['Danh động từ và động từ nguyên thể', 'enjoy camping, decide to stay, learn to swim, stop smoking'],
    ['Câu hỏi đuôi, liên từ when / while / so that', "It's hot, isn't it? / While Mum was cooking, I did my homework."],
    ['Tường thuật (reported speech)', 'He said (that) he was tired. / She asked me where I lived.'],
  ],
}

// Từ ngoài wordlist Cambridge nhưng có trong SGK / đời sống Việt Nam, được phép dùng theo band.
// Wordlist chỉ ghi số dưới dạng ghi chú ("Starters: 1–20, Movers: 1–100, Flyers: 101–1.000 và
// số thứ tự 21st–31st") nên các từ số được liệt kê thủ công ở đây.
export const YLE_EXTRA = {
  ST: ['pho', 'spring roll', 'ao dai', 'ant',
    'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten',
    'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen',
    'eighteen', 'nineteen', 'twenty', 'first', 'second', 'third'],
  MV: ['nephew', 'niece', 'grandparent', 'relative', 'chopstick', 'sticky rice', 'pick',
    'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety', 'hundred'],
  FY: ['festival', 'lantern', 'incense', 'ancestors', 'ethnic', 'thousand'],
}

// ===== TRA CỨU =====

const DICT = {}
for (const band of ORDER) {
  for (const [w] of TIER_WORDS[band]) if (!(w in DICT)) DICT[w] = band
  for (const w of YLE_EXTRA[band]) if (!(w in DICT)) DICT[w] = band
}

const norm = (word) =>
  String(word).toLowerCase().replace(/\u2019/g, "'").replace(/\(.*?\)/g, '').replace(/\s+/g, ' ').trim()

// Động từ bất quy tắc + thể của be: wordlist Cambridge chỉ ghi từ nguyên thể.
const IRREGULAR = {
  am: 'be', is: 'be', are: 'be', was: 'be', were: 'be', been: 'be',
  bought: 'buy', brought: 'bring', built: 'build', caught: 'catch', chose: 'choose',
  came: 'come', did: 'do', drew: 'draw', drank: 'drink', drove: 'drive', ate: 'eat',
  fell: 'fall', felt: 'feel', flew: 'fly', forgot: 'forget', got: 'get', gave: 'give',
  has: 'have', does: 'do', goes: 'go', says: 'say', takes: 'take',
  went: 'go', had: 'have', heard: 'hear', held: 'hold', kept: 'keep', knew: 'know',
  left: 'leave', lost: 'lose', made: 'make', met: 'meet', put: 'put', read: 'read',
  ran: 'run', said: 'say', saw: 'see', sold: 'sell', sent: 'send', sang: 'sing',
  sat: 'sit', slept: 'sleep', spoke: 'speak', stood: 'stand', swam: 'swim', took: 'take',
  taught: 'teach', told: 'tell', thought: 'think', threw: 'throw', understood: 'understand',
  worn: 'wear', wore: 'wear', woke: 'wake', won: 'win', wrote: 'write',
}

// Bỏ hậu tố số nhiều / thì / so sánh rồi tra từ gốc (SGK dùng nhiều biến thể của từ trong wordlist).
function stems(w) {
  const out = []
  const add = (x) => { if (x && x.length > 2) out.push(x) }
  if (IRREGULAR[w]) out.push(IRREGULAR[w])
  if (/n't$/.test(w)) out.push(w.replace(/n't$/, ''))
  if (/'(ve|ll|re|m|d|t)$/.test(w)) out.push(w.replace(/'\w+$/, ''))
  add(w.replace(/ies$/, 'y'))
  add(w.replace(/(ches|shes|xes|zes|ses)$/, ''))
  add(w.replace(/s$/, ''))
  add(w.replace(/([^aeiou])\1(ing|ed)$/, '$1'))
  add(w.replace(/([^aeiou])\1(er|est)$/, '$1'))
  add(w.replace(/ing$/, ''))
  add(w.replace(/ing$/, 'e'))
  add(w.replace(/ed$/, ''))
  add(w.replace(/ed$/, 'e'))
  add(w.replace(/er$/, ''))
  add(w.replace(/est$/, ''))
  add(w.replace(/.'s$/, ''))
  add(w.replace(/'s$/, ''))
  return out.filter(Boolean)
}

// Band nhỏ nhất mà từ này được phép xuất hiện; null = không có trong wordlist Cambridge.
export function levelOf(word) {
  const w = norm(word)
  if (!w) return null
  if (DICT[w]) return DICT[w]
  if (w.includes(' ')) {
    const head = w.split(' ').pop()
    for (const s of [head, ...stems(head)]) if (DICT[s]) return DICT[s]
  }
  for (const s of stems(w)) if (DICT[s]) return DICT[s]
  return null
}

export function bandOfId(id) {
  const m = String(id).match(/^(ST|MV|FY)-/)
  return m ? m[1] : null
}

// Tập từ tích luỹ tới band (mọi từ có level <= band).
export function wordsFor(band) {
  const upto = ORDER.indexOf(band)
  const set = new Set()
  for (const w in DICT) if (ORDER.indexOf(DICT[w]) <= upto) set.add(w)
  return set
}

export function tierWords(band) {
  return TIER_WORDS[band]
}

// Từ của một chủ đề, tích luỹ tới band.
export function topicWords(topic, band) {
  const t = YLE_TOPICS[topic]
  if (!t) throw new Error('Không có chủ đề YLE: ' + topic)
  const upto = ORDER.indexOf(band)
  const out = []
  for (const b of ORDER) if (ORDER.indexOf(b) <= upto) out.push(...t[b])
  return [...new Set(out)]
}

export const YLE_TOPIC_KEYS = Object.keys(YLE_TOPICS)

export function bandMeta(band) {
  return YLE_BANDS[band]
}

export function structureFor(band) {
  return YLE_STRUCTURE[band]
}
