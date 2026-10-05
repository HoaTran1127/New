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

// ===== DỮ LIỆU TRÍCH TỰ ĐỘNG TỪ WORDLIST CAMBRIDGE (không sửa tay) =====

export const YLE_ST = [
  ['a', 'det'], ['a lot', 'adv + pron'], ['a lot of', 'det'], ['a.m. f alex', 'n'], ['about', 'prep'], ['add', 'v'],
  ['afternoon', 'n'], ['again', 'adv'], ['alex', 'n'], ['alice', 'n'], ['alien', 'n'], ['alphabet', 'n'],
  ['an', 'det'], ['and', 'conj'], ['angry', 'adj'], ['animal', 'n'], ['ann', 'n'], ['anna', 'n'],
  ['answer', 'n + v'], ['apartment', 'n'], ['apple', 'n'], ['arm', 'n'], ['armchair', 'n'], ['ask', 'v'],
  ['at', 'prep of place'], ['baby', 'n'], ['backpack bean', 'n'], ['badminton', 'n'], ['bag', 'n'], ['ball', 'n'],
  ['balloon', 'n'], ['banana', 'n'], ['baseball', 'n'], ['baseball cap', 'n'], ['basketball', 'n'], ['bath', 'n'],
  ['bathroom', 'n'], ['be', 'v'], ['beach', 'n'], ['bean', 'n'], ['bear', 'n'], ['beautiful', 'adj'],
  ['bed', 'n'], ['bedroom', 'n'], ['bee', 'n'], ['behind', 'prep'], ['ben', 'n'], ['between', 'prep'],
  ['big', 'adj'], ['bike', 'n'], ['bill', 'n'], ['bird', 'n'], ['birthday', 'n'], ['black', 'adj'],
  ['blue', 'adj'], ['board', 'n'], ['board game', 'n'], ['boat', 'n'], ['body', 'n'], ['book', 'n'],
  ['bookcase', 'n'], ['bookshop', 'n'], ['boots', 'n'], ['bounce', 'v'], ['box', 'n'], ['boy', 'n'],
  ['bread', 'n'], ['breakfast', 'n'], ['brother', 'n'], ['brown', 'adj'], ['burger', 'n'], ['bus', 'n'],
  ['but', 'conj'], ['bye', 'excl'], ['cake', 'n'], ['camera', 'n'], ['can', 'v'], ['candy', 'n'],
  ['car', 'n'], ['carrot', 'n'], ['cat', 'n'], ['catch', 'v'], ['chair', 'n'], ['chicken', 'n'],
  ['child', 'n'], ['children', 'n'], ['chips', 'n'], ['chocolate', 'n'], ['choose', 'v'], ['city centre tablet', 'n'],
  ['clap', 'v'], ['class', 'n'], ['classmate', 'n'], ['classroom', 'n'], ['clean', 'adj + v'], ['clock', 'n'],
  ['close', 'v'], ['closed', 'adj'], ['clothes', 'n'], ['coconut', 'n'], ['colour', 'n + v'], ['come', 'v'],
  ['complete', 'v'], ['computer', 'n'], ['cool', 'adj + excl'], ['correct', 'adj'], ['count', 'v'], ['cousin', 'n'],
  ['cow', 'n'], ['crayon', 'n'], ['crocodile', 'n'], ['cross', 'n + v'], ['cupboard', 'n'], ['dad', 'n'],
  ['dan', 'n'], ['day', 'n'], ['dear dirty', 'adj'], ['desk', 'n'], ['dining room', 'n'], ['dinner', 'n'],
  ['dirty', 'adj'], ['do', 'v'], ['dog', 'n'], ['doll', 'n'], ['don\'t worry', 'excl'], ['donkey', 'n'],
  ['door', 'n'], ['double', 'adj'], ['draw', 'v'], ['drawing', 'n'], ['dress', 'n'], ['drink', 'n + v'],
  ['drive', 'v'], ['duck', 'n'], ['ear', 'n'], ['eat', 'v'], ['egg', 'n'], ['elephant', 'n'],
  ['end', 'n'], ['english', 'adj + n'], ['enjoy', 'v'], ['eraser', 'n'], ['eva', 'n'], ['evening', 'n'],
  ['example', 'n'], ['eye', 'n'], ['face', 'n'], ['family', 'n'], ['fantastic', 'adj + excl'], ['father', 'n'],
  ['favourite', 'adj'], ['feet', 'n'], ['file n', 'n'], ['find', 'v'], ['fish', 'n'], ['fishing', 'n'],
  ['flat', 'n'], ['floor', 'n'], ['floor friend', 'n'], ['flower', 'n'], ['fly', 'v'], ['food', 'n'],
  ['foot', 'n'], ['football', 'n'], ['for', 'prep'], ['friend', 'n'], ['fries', 'n'], ['frog', 'n'],
  ['from', 'prep'], ['fruit', 'n'], ['fun', 'adj + n'], ['funny', 'adj'], ['game', 'n'], ['garden', 'n'],
  ['get', 'v'], ['giraffe', 'n'], ['girl', 'n'], ['give', 'v'], ['glasses', 'n'], ['go', 'v'],
  ['go to bed', 'v'], ['go to sleep', 'v'], ['goat', 'n'], ['good', 'adj'], ['goodbye', 'excl'], ['grace', 'n'],
  ['grandfather', 'n'], ['grandma', 'n'], ['grandmother', 'n'], ['grandpa', 'n'], ['grape', 'n'], ['gray', 'adj'],
  ['great', 'adj + excl'], ['green', 'adj'], ['grey', 'adj'], ['guitar', 'n'], ['hair', 'n'], ['hall', 'n'],
  ['hand', 'n'], ['handbag', 'n'], ['happy', 'adj'], ['hat', 'n'], ['have', 'v'], ['have got', 'v'],
  ['he', 'pron'], ['head', 'n'], ['helicopter', 'n'], ['hello', 'excl'], ['her', 'poss adj pron'], ['her poss', 'adj + pron'],
  ['here', 'adv'], ['hers', 'pron'], ['hi', 'excl'], ['him', 'pron'], ['hippo', 'n'], ['his', 'poss adj pron'],
  ['his poss', 'adj + pron'], ['hit', 'v'], ['hobby', 'n'], ['hockey', 'n'], ['hold', 'v'], ['home', 'n + adv'],
  ['hooray', 'excl'], ['horse', 'n'], ['house', 'n'], ['how', 'int'], ['how many', 'int'], ['how old', 'int'],
  ['hugo', 'n'], ['i', 'pron'], ['ice cream', 'n'], ['in', 'prep'], ['in front of', 'prep'], ['it', 'pron'],
  ['its', 'poss adj pron'], ['its poss', 'adj + pron'], ['jacket', 'n'], ['jeans', 'n'], ['jellyfish', 'n'], ['jill', 'n'],
  ['juice', 'n'], ['jump', 'v'], ['keyboard', 'n'], ['kick', 'v'], ['kid', 'n'], ['kim', 'n'],
  ['kitchen', 'n'], ['kite', 'n'], ['kiwi', 'n'], ['know', 'v'], ['lamp', 'n'], ['learn', 'v'],
  ['leg', 'n'], ['lemon', 'n'], ['lemonade', 'n'], ['lesson', 'n'], ['let\'s', 'v'], ['letter', 'n'],
  ['like', 'prep + v'], ['lime', 'n'], ['line', 'n'], ['listen', 'v'], ['live', 'v'], ['living room', 'n'],
  ['lizard', 'n'], ['long', 'adj'], ['look', 'v'], ['look at', 'v'], ['lorry', 'n'], ['lots', 'adv + pron'],
  ['lots of', 'det'], ['love', 'v'], ['lucy', 'n'], ['lunch', 'n'], ['make', 'v'], ['man', 'n'],
  ['mango', 'n'], ['many', 'det'], ['mark', 'n'], ['mat', 'n'], ['matt', 'n'], ['may', 'n'],
  ['me', 'pron'], ['me too', 'dis'], ['meat', 'n'], ['meatballs', 'n'], ['men', 'n'], ['mice', 'n'],
  ['milk', 'n'], ['mine', 'pron'], ['mirror', 'n'], ['monkey', 'n'], ['monster', 'n'], ['morning', 'n'],
  ['mother', 'n'], ['motorbike', 'n'], ['mouse', 'n'], ['mouth', 'n'], ['mum', 'n'], ['music', 'n'],
  ['my', 'poss adj'], ['my poss', 'adj'], ['n f food', 'n'], ['n f meat', 'n'], ['name', 'n'], ['new', 'adj'],
  ['next to', 'prep'], ['nice', 'adj'], ['nick', 'n'], ['night', 'n'], ['no', 'adv + det'], ['nose', 'n'],
  ['not', 'adv'], ['now', 'adv'], ['number', 'n'], ['of', 'prep'], ['oh', 'dis'], ['oh dear', 'excl'],
  ['ok', 'adj + dis'], ['old', 'adj'], ['on', 'prep of place'], ['one', 'det + pron'], ['onion', 'n'], ['open', 'adj + v'],
  ['or', 'conj'], ['orange', 'adj + n'], ['our', 'poss adj'], ['our poss', 'adj'], ['ours', 'pron'], ['page', 'n'],
  ['paint', 'n + v'], ['painting', 'n'], ['paper', 'adj + n'], ['pardon', 'int'], ['park', 'n'], ['part', 'n'],
  ['pat', 'n'], ['pea', 'n'], ['pear', 'n'], ['pen', 'n'], ['pencil', 'n'], ['people', 'n'],
  ['person', 'n'], ['pet', 'n'], ['phone', 'n + v'], ['photo', 'n'], ['piano', 'n'], ['pick up', 'v'],
  ['picture', 'n'], ['pie', 'n'], ['pineapple', 'n'], ['pink', 'adj'], ['plane', 'n'], ['play', 'v'],
  ['playground', 'n'], ['please', 'dis'], ['point', 'v'], ['polar bear', 'n'], ['poster', 'n'], ['potato', 'n'],
  ['programme painting', 'n'], ['purple', 'adj'], ['put', 'v'], ['question', 'n'], ['radio', 'n'], ['read', 'v'],
  ['really', 'adv'], ['red', 'adj'], ['rice', 'n'], ['ride', 'v'], ['right', 'n'], ['robot', 'n'],
  ['room', 'n'], ['rubber', 'n'], ['rug', 'n'], ['ruler', 'n'], ['run', 'v'], ['sad', 'adj'],
  ['sam', 'n'], ['sand', 'n'], ['sausage', 'n'], ['say', 'v'], ['scary', 'adj'], ['school', 'n'],
  ['sea', 'n'], ['see', 'v'], ['see you', 'excl'], ['she', 'pron'], ['sheep', 'n'], ['shell', 'n'],
  ['ship', 'n'], ['shirt', 'n'], ['shoe', 'n'], ['shop', 'n'], ['short', 'adj'], ['shorts', 'n'],
  ['show', 'v'], ['silly', 'adj'], ['sing', 'v'], ['sister', 'n'], ['sit', 'v'], ['skateboard', 'n'],
  ['skateboarding', 'n'], ['skirt', 'n'], ['sleep', 'v'], ['small', 'adj'], ['smile', 'n + v'], ['snake', 'n'],
  ['so', 'dis'], ['soccer', 'n'], ['sock', 'n'], ['sofa', 'n'], ['some', 'det'], ['song', 'n'],
  ['sorry', 'adj + int'], ['spell', 'v'], ['spider', 'n'], ['sport', 'n'], ['sports centre sentence', 'n'], ['stand', 'v'],
  ['start', 'v'], ['stop', 'v'], ['store', 'n'], ['story', 'n'], ['street', 'n'], ['sue', 'n'],
  ['sun', 'n'], ['sweet', 'n'], ['swim', 'n'], ['t-shirt', 'n'], ['table', 'n'], ['table tennis', 'n'],
  ['tablet', 'n'], ['tail', 'n'], ['take a photo', 'v'], ['take off them', 'pron'], ['take the', 'det'], ['talk', 'v'],
  ['teacher', 'n'], ['teddy', 'n'], ['television', 'n'], ['tell', 'v'], ['tennis', 'n'], ['tennis racket', 'n'],
  ['thank you', 'dis'], ['thanks', 'dis'], ['that', 'det + pron'], ['the', 'det'], ['their', 'poss adj'], ['their poss', 'adj'],
  ['theirs', 'pron'], ['them', 'pron'], ['then', 'dis'], ['there', 'adv'], ['these', 'det + pron'], ['they', 'pron'],
  ['thing', 'n'], ['this', 'det + pron'], ['those', 'det + pron'], ['throw', 'v'], ['tick', 'n + v'], ['tiger', 'n'],
  ['to', 'prep'], ['today', 'adv + n'], ['tom', 'n'], ['tomato', 'n'], ['too', 'adv'], ['town', 'n'],
  ['toy', 'n'], ['train', 'n'], ['tree', 'n'], ['trousers', 'n'], ['truck', 'n'], ['try', 'n + v'],
  ['tv', 'n'], ['ugly', 'adj'], ['under', 'prep'], ['understand', 'v'], ['us', 'pron'], ['very', 'adv'],
  ['walk', 'v'], ['wall', 'n'], ['want', 'v'], ['watch', 'n + v'], ['water', 'n'], ['watermelon', 'n'],
  ['wave', 'v'], ['we', 'pron'], ['wear', 'v'], ['well', 'dis'], ['well done', 'dis'], ['what', 'int'],
  ['where', 'int'], ['which', 'int'], ['white', 'adj'], ['who', 'int'], ['whose', 'int'], ['window', 'n'],
  ['with', 'prep'], ['woman', 'n'], ['women', 'n'], ['word', 'n'], ['would like', 'v'], ['wow', 'excl'],
  ['write', 'v'], ['year', 'n'], ['yellow', 'adj'], ['yes', 'adv'], ['you', 'pron'], ['young', 'adj'],
  ['your', 'poss adj'], ['your poss', 'adj'], ['yours', 'pron'], ['zebra', 'n'], ['zoo', 'n'],
]

export const YLE_MV = [
  ['above', 'prep'], ['address', 'n'], ['afraid', 'adj'], ['after', 'prep'], ['age', 'n'], ['all', 'adj + adv + det + pron'],
  ['all right', 'adj + adv'], ['along', 'prep'], ['always', 'adv'], ['another', 'det + pron'], ['any', 'det + pron'], ['app', 'n'],
  ['around', 'prep'], ['asleep', 'adj'], ['aunt', 'n'], ['awake', 'adj'], ['back', 'adj + adv + n'], ['bad', 'adj'],
  ['badly', 'adv'], ['balcony', 'n'], ['band', 'n'], ['basement', 'n'], ['bat', 'n'], ['be called', 'v'],
  ['beard', 'n'], ['because', 'conj'], ['before', 'prep'], ['below', 'prep'], ['best', 'adj + adv'], ['better', 'adj + adv'],
  ['blanket', 'n'], ['blond', 'adj'], ['boring', 'adj'], ['both', 'det + pron'], ['bottle', 'n'], ['bottom', 'adj + n'],
  ['bowl', 'n'], ['brave', 'adj'], ['break', 'n'], ['brilliant', 'adj + excl'], ['bring', 'v'], ['build', 'v'],
  ['building', 'n'], ['bus station', 'n'], ['bus stop', 'n'], ['busy', 'adj'], ['buy', 'v'], ['by', 'prep'],
  ['cage', 'n'], ['call', 'v'], ['car park', 'n'], ['careful', 'adj'], ['carefully', 'adv'], ['carry', 'v'],
  ['cd', 'n'], ['centre', 'n'], ['change', 'v'], ['charlie', 'n'], ['cheese', 'n'], ['cinema', 'n'],
  ['circle', 'n'], ['circus', 'n'], ['city', 'n'], ['city centre', 'n'], ['clare', 'n'], ['clever', 'adj'],
  ['climb', 'v'], ['cloud', 'n'], ['cloudy', 'adj'], ['clown', 'n'], ['coat', 'n'], ['coffee', 'n'],
  ['cold', 'adj + n'], ['come on', 'excl'], ['comic', 'n'], ['comic book', 'n'], ['cook', 'n + v'], ['cough', 'n'],
  ['country', 'n'], ['countryside', 'n'], ['cry', 'v'], ['cup', 'n'], ['curly', 'adj'], ['daisy', 'n'],
  ['dance', 'n + v'], ['dangerous', 'adj'], ['daughter', 'n'], ['dentist', 'n'], ['difference', 'n'], ['different', 'adj'],
  ['difficult', 'adj'], ['doctor', 'n'], ['dolphin', 'n'], ['down', 'adv + prep'], ['downstairs', 'adv + n'], ['dream', 'n + v'],
  ['dress up', 'v'], ['driver', 'n'], ['drop', 'v'], ['dry', 'adj + v'], ['dvd', 'n'], ['e-book', 'n'],
  ['earache', 'n'], ['easy', 'adj'], ['elevator', 'n'], ['email', 'n + v'], ['every', 'det'], ['everyone', 'pron'],
  ['everything', 'pron'], ['exciting', 'adj'], ['excuse me', 'dis'], ['fair', 'adj'], ['fall', 'v'], ['famous', 'adj'],
  ['farm', 'n'], ['farmer', 'n'], ['fat', 'adj'], ['feed', 'v'], ['field', 'n'], ['film', 'n + v'],
  ['film star', 'n'], ['fine', 'adj + excl'], ['first', 'adj + adv'], ['fix', 'v'], ['forest', 'n'], ['fred', 'n'],
  ['friday', 'n'], ['frightened', 'adj'], ['funfair', 'n'], ['get dressed', 'v'], ['get off', 'v'], ['get on', 'v'],
  ['get undressed', 'v'], ['get up', 'v'], ['glass', 'adj'], ['go shopping', 'v'], ['goal', 'n'], ['granddaughter', 'n'],
  ['grandparent', 'n'], ['grandson', 'n'], ['grass', 'n'], ['ground', 'n'], ['grow', 'v'], ['grown-up', 'n'],
  ['have to', 'v'], ['headache', 'n'], ['helmet', 'n'], ['help', 'v'], ['hide', 'v'], ['holiday', 'n'],
  ['homework', 'n'], ['hop', 'v'], ['hospital', 'n'], ['hot', 'adj'], ['how much', 'adv + int'], ['how often', 'adv + int'],
  ['huge', 'adj'], ['hundred', 'n'], ['hungry', 'adj'], ['hurt', 'v'], ['ice', 'n'], ['ice skates', 'n'],
  ['ice skating', 'n'], ['idea', 'n'], ['ill', 'adj'], ['inside', 'adv + n + prep'], ['internet', 'n'], ['into', 'prep'],
  ['invite', 'v'], ['island', 'n'], ['jack', 'n'], ['jane', 'n'], ['jim', 'n'], ['julia', 'n'],
  ['jungle', 'n'], ['kangaroo', 'n'], ['kind', 'n'], ['kitten', 'n'], ['lake', 'n'], ['laptop', 'n'],
  ['last', 'adj + adv'], ['laugh', 'n + v'], ['leaf', 'n'], ['leaves', 'n'], ['library', 'n'], ['lift', 'n'],
  ['lily', 'n'], ['lion', 'n'], ['little', 'adj'], ['look for', 'v'], ['lose', 'v'], ['loud', 'adj'],
  ['loudly', 'adv'], ['machine', 'n'], ['map', 'n'], ['market', 'n'], ['mary', 'n'], ['matter', 'n'],
  ['mean', 'v'], ['message', 'n'], ['milkshake', 'n'], ['mistake', 'n'], ['model', 'n'], ['monday', 'n'],
  ['moon', 'n'], ['more', 'adv + det + pron'], ['most', 'adv + det + pron'], ['mountain', 'n'], ['moustache', 'n'], ['move', 'v'],
  ['movie', 'n'], ['must', 'v'], ['naughty', 'adj'], ['near', 'adv + prep'], ['neck', 'n'], ['need', 'v'],
  ['net', 'n'], ['never', 'adv'], ['noise', 'n'], ['noodles', 'n'], ['nothing', 'pron'], ['nurse', 'n'],
  ['o\'clock', 'adv'], ['off', 'adv + prep'], ['often', 'adv'], ['only', 'adv'], ['opposite', 'prep'], ['out', 'adv'],
  ['out of', 'prep'], ['outside', 'adv + n + prep'], ['p.m. f peter', 'n'], ['pair', 'n'], ['pancake', 'n'], ['panda', 'n'],
  ['parent', 'n'], ['parrot', 'n'], ['party', 'n'], ['pasta', 'n'], ['paul', 'n'], ['penguin', 'n'],
  ['peter', 'n'], ['picnic', 'n'], ['pirate', 'n'], ['place', 'n'], ['plant', 'n + v'], ['plate', 'n'],
  ['player', 'n'], ['pool', 'n'], ['pop star', 'n'], ['practice', 'n'], ['practise', 'v'], ['present', 'n'],
  ['pretty', 'adj'], ['puppy', 'n'], ['put on', 'v'], ['quick', 'adj'], ['quickly', 'adv'], ['quiet', 'adj'],
  ['quietly', 'adv'], ['rabbit', 'n'], ['rain', 'n + v'], ['rainbow', 'n'], ['river', 'n'], ['road', 'n'],
  ['rock', 'n'], ['roller skates', 'n'], ['roller skating', 'n'], ['roof', 'n'], ['round', 'adj + adv + prep'], ['safe', 'adj'],
  ['sail', 'n + v'], ['salad', 'n'], ['sally', 'n'], ['sandwich', 'n'], ['saturday', 'n'], ['sauce', 'n'],
  ['scarf', 'n'], ['score', 'n'], ['seat', 'n'], ['second', 'adj + adv'], ['send', 'v'], ['shall', 'v'],
  ['shape', 'n'], ['shark', 'n'], ['shopping', 'n'], ['shopping centre', 'n'], ['shoulder', 'n'], ['shout', 'v'],
  ['shower', 'n'], ['sick', 'adj'], ['skate', 'n + v'], ['skip', 'v'], ['sky', 'n'], ['slow', 'adj'],
  ['slowly', 'adv'], ['snail', 'n'], ['snow', 'n + v'], ['someone', 'pron'], ['something', 'pron'], ['sometimes', 'adv'],
  ['son', 'n'], ['soup', 'n'], ['sports centre', 'n'], ['square', 'adj + n'], ['stair', 'n'], ['star', 'n'],
  ['station', 'n'], ['stomach', 'n'], ['stomach-ache', 'n'], ['straight', 'adj'], ['strong', 'adj'], ['sunday', 'n'],
  ['sunny', 'adj'], ['supermarket', 'n'], ['surprised', 'adj'], ['sweater', 'n'], ['swimming pool', 'n'], ['swimsuit', 'n'],
  ['take', 'v'], ['take off', 'v'], ['tall', 'adj'], ['tea', 'n'], ['teach', 'v'], ['teeth', 'n'],
  ['temperature', 'n'], ['terrible', 'adj'], ['text', 'n + v'], ['than', 'conj + prep'], ['thin', 'adj'], ['think', 'v'],
  ['third', 'adj + adv'], ['thirsty', 'adj'], ['thursday', 'n'], ['ticket', 'n'], ['tired', 'adj'], ['tooth', 'n'],
  ['toothache', 'n'], ['toothbrush', 'n'], ['toothpaste', 'n'], ['top', 'adj + n'], ['towel', 'n'], ['town centre', 'n'],
  ['town centre comic', 'n'], ['tractor', 'n'], ['travel', 'v'], ['treasure', 'n'], ['trip', 'n'], ['tuesday', 'n'],
  ['uncle', 'n'], ['up', 'adv + prep'], ['upstairs', 'adv + n'], ['vegetable', 'n'], ['vicky', 'n'], ['video', 'n + v'],
  ['village', 'n'], ['wait', 'v'], ['wake', 'v'], ['wash', 'n + v'], ['waterfall', 'n'], ['weak', 'adj'],
  ['weather', 'n'], ['website', 'n'], ['wednesday', 'n'], ['week', 'n'], ['weekend', 'n'], ['wet', 'adj'],
  ['whale', 'n'], ['when', 'adv + conj + int'], ['why', 'int'], ['wind', 'n'], ['windy', 'adj'], ['work', 'n + v'],
  ['world', 'n'], ['worse', 'adj + adv'], ['worst', 'adj + adv'], ['would', 'v'], ['wrong', 'adj'], ['yesterday', 'adv + n'],
  ['zoe', 'n'],
]

export const YLE_FY = [
  ['a few', 'det'], ['a little', 'adv + det'], ['across', 'prep'], ['act', 'v'], ['actor', 'n'], ['actually', 'adv'],
  ['adj f december', 'n'], ['adventure', 'n'], ['ago', 'adv'], ['agree', 'v'], ['air', 'n'], ['airport', 'n'],
  ['alone', 'adj'], ['already', 'adv'], ['also', 'adv'], ['amazing', 'adj + excl'], ['ambulance', 'n'], ['anyone', 'pron'],
  ['anything', 'pron'], ['anywhere', 'adv'], ['appear', 'v'], ['april', 'n'], ['arrive', 'v'], ['art', 'n'],
  ['artist', 'n'], ['as', 'adv'], ['as ... as', 'adv'], ['astronaut', 'n'], ['at the moment', 'adv'], ['august', 'n'],
  ['autumn', 'n'], ['away', 'adv'], ['backpack', 'n'], ['bandage', 'n'], ['bank', 'n'], ['beetle', 'n'],
  ['begin', 'v'], ['believe', 'v'], ['belt', 'n'], ['betty', 'n'], ['bicycle', 'n'], ['bin', 'n'],
  ['biscuit', 'n'], ['bit', 'n'], ['bored', 'adj'], ['borrow', 'v'], ['bracelet', 'n'], ['bridge', 'n'],
  ['broken', 'adj'], ['brush', 'n + v'], ['burn', 'v'], ['business', 'n'], ['businessman', 'n'], ['butter', 'n'],
  ['butterfly', 'n'], ['by myself', 'adv'], ['by yourself', 'adv'], ['calendar', 'n'], ['camel', 'n'], ['camp', 'v'],
  ['card', 'n'], ['cartoon', 'n'], ['castle', 'n'], ['cave', 'n'], ['century', 'n'], ['cereal', 'n'],
  ['channel', 'n'], ['chat', 'v'], ['cheap', 'adj'], ['chemist', 'n'], ['chess', 'n'], ['chopsticks', 'n'],
  ['club', 'n'], ['collect', 'v'], ['college', 'n'], ['comb', 'n + v'], ['competition', 'n'], ['concert', 'n'],
  ['conversation', 'n'], ['cooker', 'n'], ['cookie', 'n'], ['corner', 'n'], ['costume', 'n'], ['could', 'v'],
  ['creature', 'n'], ['crown', 'n'], ['cushion', 'n'], ['cut', 'v'], ['cycle', 'v'], ['dark', 'adj'],
  ['date', 'n'], ['david', 'n'], ['dear', 'adj'], ['december', 'n'], ['decide', 'v'], ['deep', 'adj'],
  ['delicious', 'adj'], ['desert', 'n'], ['design', 'n + v'], ['designer', 'n'], ['diary', 'n'], ['dictionary', 'n'],
  ['dinosaur', 'n'], ['disappear', 'v'], ['drum', 'n'], ['during', 'prep'], ['each', 'det + pron'], ['eagle', 'n'],
  ['early', 'adj + adv'], ['earth', 'n'], ['east', 'n'], ['elbow', 'n'], ['else', 'adv'], ['emma', 'n'],
  ['empty', 'adj'], ['engine', 'n'], ['engineer', 'n'], ['enormous', 'adj'], ['enough', 'adj + pron'], ['enter', 'v'],
  ['entrance', 'n'], ['envelope', 'n'], ['environment', 'n'], ['ever', 'adv'], ['everywhere', 'adv'], ['excellent', 'adj + excl'],
  ['excited', 'adj'], ['exit', 'n'], ['expensive', 'adj'], ['explain', 'v'], ['explore', 'v'], ['extinct', 'adj'],
  ['factory', 'n'], ['fall over', 'v'], ['far', 'adj + adv'], ['fast', 'adj + adv'], ['february', 'n'], ['feel', 'v'],
  ['festival', 'n'], ['fetch', 'v'], ['find out', 'v'], ['finger', 'n'], ['finish', 'v'], ['fire', 'n'],
  ['fire engine', 'n'], ['fire engine follow', 'v'], ['fire fighter', 'n'], ['fire station', 'n'], ['flag', 'n'], ['flashlight', 'n'],
  ['flour', 'n'], ['fog', 'n'], ['foggy', 'adj'], ['follow', 'v'], ['forget', 'v'], ['fork', 'n'],
  ['frank', 'n'], ['fridge', 'n'], ['friendly', 'adj'], ['frightening', 'adj'], ['front', 'adj + n'], ['full', 'adj'],
  ['fur', 'n'], ['furry', 'adj'], ['future', 'n'], ['gate', 'n'], ['geography', 'n'], ['george', 'n'],
  ['get to', 'v'], ['glove', 'n'], ['glue', 'n + v'], ['go away', 'excl'], ['go out', 'v'], ['gold', 'adj + n'],
  ['golf', 'n'], ['group', 'n'], ['guess', 'n + v'], ['gym', 'n'], ['half', 'adj + n'], ['happen', 'v'],
  ['hard', 'adj + adv'], ['harry', 'n'], ['hate', 'v'], ['hear', 'v'], ['heavy', 'adj'], ['helen', 'n'],
  ['high', 'adj'], ['hill', 'n'], ['history', 'n'], ['hole', 'n'], ['holly', 'n'], ['honey', 'n'],
  ['hope', 'v'], ['horrible', 'adj'], ['hotel', 'n'], ['hour', 'n'], ['how long', 'adv + int'], ['hurry', 'v'],
  ['husband', 'n'], ['if', 'conj'], ['if you want', 'excl'], ['important', 'adj'], ['improve', 'v'], ['in a minute', 'excl'],
  ['information', 'n'], ['insect', 'n'], ['instead', 'adv'], ['instrument', 'n'], ['interested', 'adj'], ['interesting', 'adj'],
  ['invent', 'v'], ['invitation', 'n'], ['jam', 'n'], ['january', 'n'], ['job', 'n'], ['join', 'v'],
  ['journalist', 'n'], ['journey', 'n'], ['july', 'n'], ['june', 'n'], ['just', 'adv'], ['katy', 'n'],
  ['keep', 'v'], ['key', 'n'], ['kilometre', 'n'], ['king', 'n'], ['knee', 'n'], ['knife', 'n'],
  ['land', 'v'], ['language', 'n'], ['large', 'adj'], ['late', 'adj + adv'], ['later', 'adv'], ['lazy', 'adj'],
  ['leave', 'v'], ['left', 'adj n'], ['let', 'v'], ['lie', 'v'], ['light', 'adj + n'], ['london', 'n'],
  ['look after', 'v'], ['look like', 'v'], ['lovely', 'adj'], ['low', 'adj'], ['lucky', 'adj'], ['magazine', 'n'],
  ['make sure', 'v'], ['manager', 'n'], ['march', 'n'], ['married', 'adj'], ['match', 'n'], ['maths', 'n'],
  ['meal', 'n'], ['mechanic', 'n'], ['medicine', 'n'], ['meet', 'v'], ['meeting', 'n'], ['member', 'n'],
  ['metal', 'adj + n'], ['michael', 'n'], ['midday', 'n'], ['middle', 'n + adj'], ['midnight', 'n'], ['might', 'v'],
  ['million', 'n'], ['mind', 'v'], ['minute', 'n'], ['missing', 'adj'], ['mix', 'v'], ['money', 'n'],
  ['month', 'n'], ['motorway', 'n'], ['much', 'adv + det + pron'], ['museum', 'n'], ['n m friendly', 'adj'], ['necklace', 'n'],
  ['nest', 'n'], ['news', 'n'], ['newspaper', 'n'], ['next', 'adj + adv'], ['no problem', 'excl'], ['no-one', 'pron'],
  ['noisy', 'adj'], ['north', 'n'], ['november', 'n'], ['nowhere', 'adv'], ['ocean', 'n'], ['october', 'n'],
  ['octopus', 'n'], ['of course', 'adv'], ['office', 'n'], ['oliver', 'n'], ['olives', 'n'], ['once', 'adv'],
  ['online', 'adj'], ['other', 'det + pron'], ['oven', 'n'], ['over', 'adv + prep'], ['p.m. pajamas', 'n'], ['pajamas', 'n'],
  ['passenger', 'n'], ['past', 'n + prep'], ['path', 'n'], ['pepper', 'n'], ['perhaps', 'adv'], ['photographer', 'n'],
  ['piece', 'n'], ['pilot', 'n'], ['pizza', 'n'], ['planet', 'n'], ['plastic', 'adj + n'], ['platform', 'n'],
  ['pleased', 'adj'], ['pocket', 'n'], ['police officer', 'n'], ['police station', 'n'], ['pond', 'n'], ['poor', 'adj'],
  ['pop music', 'n'], ['popular', 'adj'], ['post', 'v'], ['post office', 'n'], ['postcard', 'n'], ['prefer', 'v'],
  ['prepare', 'v'], ['prize', 'n'], ['problem', 'n'], ['programme', 'n'], ['project', 'n'], ['pull', 'v'],
  ['push', 'v'], ['puzzle', 'n'], ['pyjamas', 'n'], ['pyramid', 'n'], ['quarter', 'n'], ['queen', 'n'],
  ['quite', 'adv'], ['quiz', 'n'], ['race', 'n + v'], ['racing', 'adj'], ['railway', 'n'], ['ready', 'adj'],
  ['remember', 'v'], ['repair', 'v'], ['repeat', 'v'], ['restaurant', 'n'], ['rich', 'adj'], ['richard', 'n'],
  ['ring', 'n'], ['robert', 'n'], ['rock music', 'n'], ['rocket', 'n'], ['rucksack', 'n'], ['salt', 'n'],
  ['same', 'adj'], ['sarah', 'n'], ['save', 'v'], ['science', 'n'], ['scissors', 'n'], ['screen', 'n'],
  ['search', 'n + v'], ['secret', 'n'], ['sell', 'v'], ['september', 'n'], ['several', 'adj'], ['shampoo', 'n'],
  ['shelf', 'n'], ['shopping centre so', 'adv + conj'], ['should', 'v'], ['silver', 'adj + n'], ['since', 'prep'], ['singer', 'n'],
  ['ski', 'n + v'], ['skyscraper', 'n'], ['sledge', 'n + v'], ['smell', 'n + v'], ['snack', 'n'], ['snowball', 'n'],
  ['snowboard', 'n'], ['snowboarding', 'n'], ['snowman', 'n'], ['soap', 'n'], ['soft', 'adj'], ['somewhere', 'adv'],
  ['soon', 'adv'], ['sophia', 'n'], ['sore', 'adj'], ['sound', 'n + v'], ['south', 'n'], ['space', 'n'],
  ['spaceship', 'n'], ['speak', 'v'], ['special', 'adj'], ['spend', 'v'], ['spoon', 'n'], ['spot', 'n'],
  ['spotted', 'adj'], ['spring', 'n'], ['stadium', 'n'], ['stage', 'n'], ['stamp', 'n'], ['stay', 'v'],
  ['step', 'n'], ['still', 'adv'], ['stone', 'n'], ['storm', 'n'], ['straight on', 'adv'], ['strange', 'adj'],
  ['strawberry', 'n'], ['stream', 'n'], ['stripe', 'n'], ['striped', 'adj'], ['student', 'n'], ['study', 'v'],
  ['subject', 'n'], ['such', 'det'], ['suddenly', 'adv'], ['sugar', 'n'], ['suitcase', 'n'], ['summer', 'n'],
  ['sunglasses', 'n'], ['sure', 'adj'], ['surname', 'n'], ['surprise', 'n'], ['swan', 'n'], ['swing', 'n + v'],
  ['taste', 'n + v'], ['taxi', 'n'], ['team', 'n'], ['telephone', 'n'], ['tent', 'n'], ['thank', 'v'],
  ['theatre', 'n'], ['thousand', 'n'], ['through', 'prep'], ['tidy', 'adj + v'], ['time', 'n'], ['timetable', 'n'],
  ['toe', 'n'], ['together', 'adv'], ['tomorrow', 'adv + n'], ['tonight', 'adv + n'], ['torch', 'n'], ['tortoise', 'n'],
  ['touch', 'v'], ['tour', 'n'], ['traffic', 'n'], ['trainers', 'n'], ['tune', 'n'], ['turn', 'v'],
  ['turn off', 'v'], ['turn on', 'v'], ['twice', 'adv'], ['tyre', 'n'], ['umbrella', 'n'], ['unfriendly', 'adj'],
  ['unhappy', 'adj'], ['uniform', 'n'], ['university', 'n'], ['unkind', 'adj'], ['untidy', 'adj'], ['until', 'prep'],
  ['unusual', 'adj'], ['use', 'v'], ['usually', 'adv'], ['view', 'n'], ['violin', 'n'], ['visit', 'v'],
  ['volleyball', 'n'], ['waiter', 'n'], ['warm', 'adj'], ['way', 'n'], ['west', 'n'], ['wheel', 'n'],
  ['while', 'conj'], ['whisper', 'v'], ['whistle', 'v'], ['wife', 'n'], ['wifi', 'n'], ['wild', 'adj'],
  ['will', 'v'], ['william', 'n'], ['win', 'v'], ['wing', 'n'], ['winner', 'n'], ['winter', 'n'],
  ['wish', 'n + v'], ['without', 'prep'], ['wonderful', 'adj'], ['wood', 'n'], ['wool', 'n'], ['worried', 'adj'],
  ['x-ray', 'n'], ['yet', 'adv'], ['yoghurt', 'n'], ['you\'re welcome', 'excl'], ['zero', 'n'],
]

const TIER_WORDS = { ST: YLE_ST, MV: YLE_MV, FY: YLE_FY }

// Từ theo chủ đề, tách sẵn theo band (band = từ xuất hiện lần đầu ở level đó).
export const YLE_TOPICS = {
  'dong-vat': {
    ST: ['animal', 'bee', 'bird', 'cat', 'chicken', 'cow', 'crocodile', 'dog', 'duck',
      'elephant', 'fish', 'fly', 'frog', 'giraffe', 'goat', 'horse', 'lizard', 'monkey',
      'mouse', 'pet', 'polar bear', 'sheep', 'snake', 'spider', 'tail', 'tiger', 'zebra'],
    MV: ['dolphin', 'kangaroo', 'lion', 'panda', 'parrot', 'penguin', 'rabbit', 'shark',
      'snail', 'whale'],
    FY: ['butterfly', 'camel', 'fur', 'insect', 'nest', 'swan', 'wing'],
  },
  'truong-hoc': {
    ST: ['English', 'bag', 'book', 'bookcase', 'chair', 'classroom', 'computer', 'crayon',
      'cupboard', 'desk', 'lesson', 'music', 'paint', 'pen', 'pencil', 'picture', 'playground',
      'rubber', 'ruler', 'school', 'tablet', 'teacher'],
    MV: ['homework', 'library', 'seat'],
    FY: ['backpack', 'bin', 'dictionary', 'glue', 'history', 'maths', 'project', 'rucksack',
      'science', 'scissors', 'student'],
  },
  'gia-dinh': {
    ST: ['baby', 'boy', 'brother', 'child', 'children', 'cousin', 'dad', 'family', 'father',
      'friend', 'girl', 'grandfather', 'grandma', 'grandmother', 'grandpa', 'man', 'mother',
      'mum', 'name', 'people', 'sister', 'woman'],
    MV: ['aunt', 'daughter', 'son', 'uncle'],
    FY: [],
  },
  'nghe-nghiep': {
    ST: ['shop', 'teacher', 'woman'],
    MV: ['cook', 'dentist', 'doctor', 'driver', 'farmer', 'hospital', 'nurse', 'work'],
    FY: ['actor', 'artist', 'business', 'engineer', 'factory', 'fire fighter', 'job',
      'manager', 'office', 'pilot', 'police officer', 'singer', 'waiter'],
  },
  'mau-sac': {
    ST: ['black', 'blue', 'brown', 'colour', 'green', 'grey', 'orange', 'pink', 'purple',
      'red', 'white', 'yellow'],
    MV: [],
    FY: ['dark', 'light', 'spot', 'spotted', 'stripe', 'striped'],
  },
  'so-thich': {
    ST: ['badminton', 'baseball', 'basketball', 'board game', 'drawing', 'enjoy', 'favourite',
      'fishing', 'football', 'game', 'hobby', 'like', 'love', 'run', 'skateboarding', 'sport',
      'swim', 'tennis'],
    MV: ['cinema', 'dance'],
    FY: ['card', 'chess', 'concert', 'volleyball'],
  },
  'an-uong': {
    ST: ['apple', 'banana', 'bean', 'bread', 'breakfast', 'burger', 'cake', 'carrot',
      'chicken', 'chips', 'chocolate', 'coconut', 'dinner', 'drink', 'egg', 'fish', 'food',
      'grape', 'ice cream', 'juice', 'lemon', 'lunch', 'mango', 'meat', 'milk', 'onion',
      'orange', 'pear', 'potato', 'rice', 'sweet', 'tomato', 'water'],
    MV: ['cheese', 'coffee', 'noodles', 'salad', 'sandwich', 'sauce', 'soup', 'tea',
      'vegetable'],
    FY: ['biscuit', 'butter', 'honey', 'jam', 'meal', 'pepper', 'salt', 'sugar', 'yoghurt'],
  },
  'co-the': {
    ST: ['arm', 'body', 'ear', 'eye', 'face', 'feet', 'foot', 'hair', 'hand', 'head', 'leg',
      'long', 'mouth', 'nose', 'short', 'smile'],
    MV: ['back', 'beard', 'blond', 'curly', 'fair', 'fat', 'moustache', 'neck', 'shoulder',
      'stomach', 'strong', 'teeth', 'thin', 'tooth'],
    FY: ['elbow', 'finger', 'knee', 'toe'],
  },
  'quan-ao': {
    ST: ['T-shirt', 'boots', 'clothes', 'dress', 'glasses', 'hat', 'jacket', 'jeans', 'shirt',
      'shoe', 'skirt', 'sock', 'trousers'],
    MV: ['coat', 'scarf', 'sweater', 'swimsuit'],
    FY: ['belt', 'bracelet', 'costume', 'glove', 'necklace', 'pocket', 'pyjamas', 'ring',
      'sunglasses', 'trainers', 'uniform'],
  },
  'thoi-tiet': {
    ST: ['cool', 'sun'],
    MV: ['cloud', 'cold', 'dry', 'hot', 'ice', 'rain', 'snow', 'sunny', 'temperature',
      'weather', 'wet', 'wind'],
    FY: ['autumn', 'fog', 'spring', 'storm', 'summer', 'umbrella', 'warm', 'winter'],
  },
  'dia-diem': {
    ST: ['bathroom', 'beach', 'bedroom', 'dining room', 'door', 'flat', 'floor', 'garden',
      'house', 'kitchen', 'living room', 'park', 'sea', 'shop', 'street', 'town', 'wall',
      'window', 'zoo'],
    MV: ['building', 'cinema', 'city', 'country', 'farm', 'forest', 'island', 'lake', 'lift',
      'market', 'mountain', 'place', 'river', 'road', 'roof', 'shopping centre',
      'sports centre', 'square', 'station', 'supermarket', 'village'],
    FY: ['airport', 'hotel', 'museum', 'ocean', 'office', 'restaurant'],
  },
  'giao-thong': {
    ST: ['bike', 'boat', 'bus', 'car', 'drive', 'fly', 'lorry', 'motorbike', 'plane', 'ride',
      'ship', 'train'],
    MV: ['sail', 'ticket'],
    FY: ['bicycle', 'jam', 'journey', 'taxi', 'traffic'],
  },
  'thoi-gian': {
    ST: ['May', 'afternoon', 'birthday', 'day', 'evening', 'morning', 'night', 'now', 'today',
      'year'],
    MV: ['Friday', 'Monday', 'Saturday', 'Sunday', 'Thursday', 'Tuesday', 'Wednesday',
      'always', 'holiday', 'never', 'o\'clock', 'often', 'second', 'sometimes', 'week',
      'weekend', 'yesterday'],
    FY: ['April', 'August', 'December', 'February', 'January', 'July', 'June', 'March',
      'November', 'October', 'September', 'date', 'early', 'hour', 'late', 'minute', 'month',
      'time', 'tomorrow', 'usually'],
  },
  'dong-tac': {
    ST: ['answer', 'ask', 'catch', 'close', 'come', 'draw', 'drink', 'drive', 'eat', 'find',
      'fly', 'go', 'hold', 'jump', 'kick', 'learn', 'listen', 'look', 'open', 'paint', 'play',
      'point', 'read', 'ride', 'run', 'say', 'sing', 'sit', 'sleep', 'stand', 'swim', 'talk',
      'tell', 'throw', 'walk', 'watch', 'wear', 'write'],
    MV: ['carry', 'climb', 'dance', 'get up', 'help', 'lose', 'practise', 'put on', 'take off',
      'teach', 'wash'],
    FY: ['pull', 'push', 'speak', 'study', 'touch', 'turn off', 'turn on', 'win'],
  },
  'mo-ta': {
    ST: ['angry', 'beautiful', 'big', 'clean', 'dirty', 'funny', 'good', 'happy', 'long',
      'new', 'nice', 'old', 'sad', 'short', 'small', 'ugly', 'young'],
    MV: ['afraid', 'bad', 'clever', 'cold', 'dangerous', 'different', 'difficult', 'easy',
      'hot', 'hungry', 'kind', 'little', 'loud', 'near', 'quiet', 'slow', 'tall', 'thirsty',
      'tired'],
    FY: ['delicious', 'empty', 'far', 'fast', 'friendly', 'full', 'high', 'interesting',
      'large', 'lovely', 'low', 'same', 'tidy', 'untidy', 'warm', 'wonderful'],
  },
}

// Tên tiếng Việt của 15 chủ đề, dùng cho dòng "Dải từ" trong prompt.
export const YLE_TOPIC_VI = {
  'dong-vat': 'động vật',
  'truong-hoc': 'trường học',
  'gia-dinh': 'gia đình',
  'nghe-nghiep': 'nghề nghiệp',
  'mau-sac': 'màu sắc',
  'so-thich': 'sở thích',
  'an-uong': 'ăn uống',
  'co-the': 'cơ thể',
  'quan-ao': 'quần áo',
  'thoi-tiet': 'thời tiết',
  'dia-diem': 'địa điểm',
  'giao-thong': 'giao thông',
  'thoi-gian': 'thời gian',
  'dong-tac': 'hoạt động',
  'mo-ta': 'mô tả',
}

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
