/**
 * src/data/index.js
 * Quản lý & đăng ký trung tâm các chủ đề Toán học (Topic Registry)
 * Cung cấp API cắm/rút (Pluggable) cực kỳ linh hoạt để người dùng tự do thêm bớt chủ đề
 */

const TopicRegistry = {
  topics: [],

  init() {
    this.topics = [];

    // Nạp các chủ đề mặc định nếu đã import script
    if (typeof CuuChuongTopics !== 'undefined') {
      this.topics.push(...CuuChuongTopics);
    }
    if (typeof Lop4Topics !== 'undefined') {
      this.topics.push(...Lop4Topics);
    }
    if (typeof Lop5Topics !== 'undefined') {
      this.topics.push(...Lop5Topics);
    }
  },

  /**
   * Đăng ký một chủ đề mới vào hệ thống
   * @param {Object} topic - { id, grade, title, badge, description, generate: fn }
   */
  registerTopic(topic) {
    if (!topic.id || typeof topic.generate !== 'function') {
      console.error("Chủ đề không hợp lệ, thiếu id hoặc hàm generate():", topic);
      return false;
    }
    // Tránh trùng ID
    this.topics = this.topics.filter(t => t.id !== topic.id);
    this.topics.push(topic);
    console.log(`[TopicRegistry] Đã đăng ký thành công chủ đề: "${topic.title}" (${topic.id})`);
    return true;
  },

  getAllTopics() {
    if (this.topics.length === 0) this.init();
    return this.topics;
  },

  getTopicsByGrade(grade) {
    if (this.topics.length === 0) this.init();
    if (grade === 'all') return this.topics;
    return this.topics.filter(t => t.grade === grade || t.grade === 'all');
  },

  getTopicById(id) {
    if (this.topics.length === 0) this.init();
    return this.topics.find(t => t.id === id) || this.topics[0];
  },

  /**
   * Sinh một câu hỏi từ topic chỉ định hoặc ngẫu nhiên
   */
  generateEquation(topicId = null) {
    if (this.topics.length === 0) this.init();
    let topic = null;
    if (topicId) {
      topic = this.getTopicById(topicId);
    }
    if (!topic) {
      topic = this.topics[Math.floor(Math.random() * this.topics.length)];
    }

    try {
      const eq = topic.generate();
      return {
        ...eq,
        topicId: topic.id,
        topicTitle: topic.title,
        badge: topic.badge,
        badgeColor: topic.badgeColor
      };
    } catch (err) {
      console.error(`Lỗi khi sinh câu hỏi từ topic ${topic.id}:`, err);
      // Fallback an toàn
      return {
        isCorrect: true,
        leftPart: "2 × 3",
        rightPart: "= 6",
        text: "2 × 3 = 6",
        explanation: "2 × 3 = 6"
      };
    }
  }
};

if (typeof window !== 'undefined') {
  window.TopicRegistry = TopicRegistry;
  // Khởi tạo luôn
  TopicRegistry.init();
}
