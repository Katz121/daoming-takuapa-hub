'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '@/lib/store';
import { INITIAL_IDEAS } from '@/data/ideas';
import { CommunityIdea } from '@/types';

export function IdeasSection() {
  const { lang, t, showToast } = useApp();
  const [ideas, setIdeas] = useState<CommunityIdea[]>(INITIAL_IDEAS);
  const [category, setCategory] = useState('art');
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [author, setAuthor] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const streamRef = useRef<HTMLDivElement>(null);

  const isEn = lang === 'en';
  const isZh = lang === 'zh';

  useEffect(() => {
    const fetchIdeas = async () => {
      try {
        const res = await fetch('/api/ideas');
        const json = await res.json();
        if (json.success && Array.isArray(json.data)) {
          setIdeas(json.data);
        }
      } catch {
        // Fallback
      }
    };
    fetchIdeas();
  }, []);

  const handleVote = async (id: number) => {
    let voterKey = localStorage.getItem('daoming_voter_key');
    if (!voterKey) {
      voterKey = `voter_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
      localStorage.setItem('daoming_voter_key', voterKey);
    }

    try {
      const res = await fetch('/api/ideas/vote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ideaId: id, voterKey })
      });
      const json = await res.json();

      if (json.success && json.data) {
        setIdeas(prev =>
          prev.map(item => {
            if (item.id === id) {
              return {
                ...item,
                votes: json.data.votes,
                hasVoted: json.data.hasVoted
              };
            }
            return item;
          })
        );

        showToast(
          json.data.hasVoted
            ? (isZh ? "❤️ 投票成功！感謝您參與導明文創共創。" : isEn ? "❤️ Vote recorded! Thank you for co-creating." : "❤️ บันทึกการโหวตสำเร็จ! ขอบคุณที่ร่วมสนับสนุนไอเดียนี้")
            : (isZh ? "已取消投票。" : isEn ? "Vote removed." : "ยกเลิกการโหวตเรียบร้อย")
        );
      }
    } catch {
      showToast("Error voting. Please try again.");
    }
  };

  const handleScroll = (direction: number) => {
    if (!streamRef.current) return;
    const isMobile = window.innerWidth <= 768;
    if (isMobile) {
      const scrollAmount = streamRef.current.clientWidth * 0.85 * direction;
      streamRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    } else {
      const scrollAmount = 220 * direction;
      streamRef.current.scrollBy({ top: scrollAmount, behavior: 'smooth' });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const categoryMap: Record<string, { th: string; en: string; zh: string }> = {
      art: { th: "🎨 ศิลปะ & งานคราฟต์", en: "🎨 Art & Crafts", zh: "🎨 藝術與手作工藝" },
      edu: { th: "📚 การศึกษา & ประวัติศาสตร์", en: "📚 Education & History", zh: "📚 歷史文獻與走讀" },
      food: { th: "🍲 อาหาร & วัฒนธรรมพื้นถิ่น", en: "🍲 Local Cuisine", zh: "🍲 在地美食與糕餅" },
      show: { th: "🎭 การแสดง & ดนตรี", en: "🎭 Music & Performance", zh: "🎭 傳統戲曲與音樂" },
      env: { th: "🌱 สิ่งแวดล้อม & ชุมชน", en: "🌱 Community & Nature", zh: "🌱 生態永續與社區" },
      other: { th: "✨ อื่นๆ", en: "✨ Other", zh: "✨ 其他創想" }
    };

    const catObj = categoryMap[category] || categoryMap.art;

    try {
      const res = await fetch('/api/ideas', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title,
          desc,
          author: author || (isZh ? "社區居民 / 訪客" : isEn ? "Community Member" : "ชาวตะกั่วป่า"),
          category_th: catObj.th,
          category_en: catObj.en
        })
      });

      const json = await res.json();
      if (json.success && json.data) {
        setIdeas(prev => [json.data, ...prev]);
        setTitle('');
        setDesc('');
        setAuthor('');
        showToast(isZh ? "🎉 構想已成功提交至共創板！感謝您的參與。" : isEn ? "🎉 Idea submitted! Thank you for co-creating." : "🎉 ส่งไอเดียสำเร็จแล้ว! ขอบคุณที่ร่วมสร้างสรรค์เต้าหมิง");
      }
    } catch (err: any) {
      showToast(`Error: ${err.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="section section-ideas" id="ideas">
      <div className="container">
        <div className="section-heading text-center">
          <div className="section-tag">{t('ideas_tag')}</div>
          <h2 className="section-title">
            {isZh ? '共同勾勒「您心目中的理想導明」' : isEn ? 'Co-Designing "Your Dream Dao Ming"' : 'ร่วมออกแบบ "เต้าหมิงในฝันของคุณ"'}
          </h2>
          <p className="section-subtitle">
            {isZh
              ? "您期待在導明學校體驗什麼樣的活動與空間？歡迎提交您的精彩構想，受歡迎的點子將由基金會推動落地！"
              : isEn
                ? "What activities would you love to see at Dao Ming? Propose your ideas and vote on popular submissions!"
                : "คุณอยากให้โรงเรียนเต้าหมิงจัดกิจกรรมอะไร? มีพื้นที่แบบไหน? ส่งไอเดียของคุณเข้ามาได้เลย ไอเดียที่ได้รับความสนใจจะถูกนำไปพัฒนาจริง!"}
          </p>
        </div>

        <div className="ideas-layout-grid">
          {/* Submission Form Card */}
          <div className="idea-form-card">
            <div className="form-header">
              <span className="form-icon">💡</span>
              <div>
                <h3>{isZh ? "提出您的活動構想" : isEn ? "Propose an Idea" : "เสนอไอเดียกิจกรรม"}</h3>
                <p>{isZh ? "成為推動導明文創新生的共創者" : isEn ? "Be a part of shaping Dao Ming Hub" : "ร่วมเป็นส่วนหนึ่งในการขับเคลื่อนเต้าหมิง"}</p>
              </div>
            </div>

            <form onSubmit={handleSubmit} id="ideaSubmissionForm">
              <div className="form-group">
                <label htmlFor="ideaCategory">{isZh ? "構想類別" : isEn ? "Category" : "ประเภทกิจกรรม / ไอเดีย"}</label>
                <select id="ideaCategory" value={category} onChange={e => setCategory(e.target.value)} required>
                  <option value="art">🎨 {isZh ? "藝術與手作工藝" : isEn ? "Art & Crafts" : "ศิลปะ & งานคราฟต์"}</option>
                  <option value="edu">📚 {isZh ? "歷史文獻與走讀" : isEn ? "History & Edu" : "การศึกษา & ประวัติศาสตร์"}</option>
                  <option value="food">🍲 {isZh ? "在地美食與糕餅" : isEn ? "Local Food" : "อาหาร & วัฒนธรรมพื้นถิ่น"}</option>
                  <option value="show">🎭 {isZh ? "傳統戲曲與音樂" : isEn ? "Performance & Music" : "การแสดง & ดนตรี"}</option>
                  <option value="env">🌱 {isZh ? "生態永續與社區" : isEn ? "Eco & Community" : "สิ่งแวดล้อม & ชุมชน"}</option>
                  <option value="other">✨ {isZh ? "其他創想" : isEn ? "Other" : "อื่นๆ"}</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="ideaTitle">{isZh ? "構想主題" : isEn ? "Idea Title" : "หัวข้อไอเดียสั้นๆ"}</label>
                <input
                  type="text"
                  id="ideaTitle"
                  placeholder={isZh ? "例如：祖傳古法豆沙餅手作烘焙課" : isEn ? "e.g., Grandma's Tao Sae Baking Class" : "เช่น คลาสสอนทำขนมเต้าส้อสูตรคุณยาย"}
                  value={title}
                  onChange={e => setTitle(e.target.value)}
                  required
                  maxLength={80}
                />
              </div>

              <div className="form-group">
                <label htmlFor="ideaDesc">{isZh ? "詳細說明 / 期待場景" : isEn ? "Description" : "รายละเอียดกิจกรรม / สิ่งที่อยากเห็น"}</label>
                <textarea
                  id="ideaDesc"
                  rows={3}
                  placeholder={isZh ? "簡要描述您的想法，例如：希望每週六下午舉辦..." : isEn ? "Tell us more about your idea..." : "อธิบายเพิ่มเติม เช่น อยากให้จัดวันเสาร์ ชวนคุณป้าในตลาดมาสอน..."}
                  value={desc}
                  onChange={e => setDesc(e.target.value)}
                  required
                  maxLength={300}
                />
              </div>

              <div className="form-group">
                <label htmlFor="ideaAuthor">{isZh ? "您的姓名或筆名" : isEn ? "Your Name or Pen Name" : "ชื่อของคุณ หรือ นามปากกา"}</label>
                <input
                  type="text"
                  id="ideaAuthor"
                  placeholder={isZh ? "例如：德古巴青年 / 小暖" : isEn ? "e.g., Takua Pa Youth / Noon" : "เช่น คนตะกั่วป่ารุ่นใหม่ / นุ่น"}
                  value={author}
                  onChange={e => setAuthor(e.target.value)}
                  required
                  maxLength={50}
                />
              </div>

              <button type="submit" className="btn btn-primary btn-block" disabled={isSubmitting}>
                <span>{isSubmitting ? (isZh ? "正在提交中..." : isEn ? "Submitting..." : "กำลังส่งข้อมูล...") : (isZh ? "發布構想至共創板" : isEn ? "Submit Idea to Board" : "ส่งไอเดียขึ้นกระดาน")}</span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"/></svg>
              </button>
            </form>
          </div>

          {/* Ideas Showcase Wall */}
          <div className="ideas-wall">
            <div className="ideas-wall-header">
              <h3>
                <span>{isZh ? "社區共創靈感瀑布" : isEn ? "Community Idea Stream" : "กระดานไอเดียจากชุมชน"}</span> ({ideas.length})
              </h3>
              <div className="ideas-header-right">
                <span className="ideas-sort-note">
                  {isZh ? "🔥 點擊 ❤️ 支持喜愛的點子" : isEn ? "🔥 Click ❤️ to vote" : "🔥 กด ❤️ เพื่อโหวตไอเดีย"}
                </span>
                <button
                  type="button"
                  className="ideas-nav-btn"
                  onClick={() => handleScroll(-1)}
                  aria-label="เลื่อนก่อนหน้า"
                  title="เลื่อนก่อนหน้า"
                >
                  ←
                </button>
                <button
                  type="button"
                  className="ideas-nav-btn"
                  onClick={() => handleScroll(1)}
                  aria-label="เลื่อนถัดไป"
                  title="เลื่อนถัดไป"
                >
                  →
                </button>
              </div>
            </div>

            <div className="ideas-card-stream" id="ideasCardStream" ref={streamRef}>
              {ideas.map(item => (
                <div key={item.id} className="user-idea-card">
                  <div className="idea-card-top">
                    <span className="idea-category-tag">{isZh ? (item.category_zh || item.category_en) : isEn ? item.category_en : item.category_th}</span>
                    <button
                      type="button"
                      className={`idea-heart-btn ${item.hasVoted ? 'voted' : ''}`}
                      onClick={() => handleVote(item.id)}
                      aria-label="Vote idea"
                    >
                      <span>❤️</span>
                      <strong className="vote-count">{item.votes}</strong>
                    </button>
                  </div>
                  <h4>{isZh ? (item.title_zh || item.title_en) : isEn ? item.title_en : item.title_th}</h4>
                  <p>{isZh ? (item.desc_zh || item.desc_en) : isEn ? item.desc_en : item.desc_th}</p>
                  <div className="idea-card-author">
                    <span>{isZh ? "發起人：" : isEn ? "Proposed by" : "เสนอโดย"} <strong>{isZh ? (item.author_zh || item.author_th) : item.author_th}</strong></span>
                    <span>{isZh ? (item.date_zh || item.date_th) : (item.date_th || 'ล่าสุด')}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
