'use client';

import React, { useState, useEffect } from 'react';
import { useApp } from '@/lib/store';
import { clientDb, DEFAULT_SITE_COPY, SiteCopyData } from '@/lib/clientDb';

export function HeroSection() {
  const { lang } = useApp();
  const [copy, setCopy] = useState<SiteCopyData>(DEFAULT_SITE_COPY);

  useEffect(() => {
    const loadCopy = () => {
      setCopy(clientDb.getSiteCopy());
    };
    loadCopy();
    window.addEventListener('daoming_site_copy_updated', loadCopy);
    window.addEventListener('storage', loadCopy);
    return () => {
      window.removeEventListener('daoming_site_copy_updated', loadCopy);
      window.removeEventListener('storage', loadCopy);
    };
  }, []);

  const isEn = lang === 'en';
  const isZh = lang === 'zh';

  return (
    <section className="hero-section" id="hero">
      <div className="hero-backdrop-pattern"></div>

      <div className="hero-container">
        <div className="hero-content">
          {/* Award Ribbon Banner */}
          <div className="hero-award-ribbon">
            <span className="award-star">🏆</span>
            <span>
              {isZh
                ? (copy.hero_award_zh || DEFAULT_SITE_COPY.hero_award_zh)
                : isEn 
                  ? (copy.hero_award_en || DEFAULT_SITE_COPY.hero_award_en) 
                  : (copy.hero_award_th || DEFAULT_SITE_COPY.hero_award_th)}
            </span>
          </div>

          <div className="hero-badge">
            <span className="badge-dot"></span>
            <span>
              {isZh
                ? (copy.hero_badge_zh || DEFAULT_SITE_COPY.hero_badge_zh)
                : isEn 
                  ? (copy.hero_badge_en || DEFAULT_SITE_COPY.hero_badge_en) 
                  : (copy.hero_badge_th || DEFAULT_SITE_COPY.hero_badge_th)}
            </span>
          </div>

          <h1 className="hero-title">
            {isZh 
              ? (copy.hero_title_zh || DEFAULT_SITE_COPY.hero_title_zh) 
              : isEn 
                ? (copy.hero_title_en || DEFAULT_SITE_COPY.hero_title_en) 
                : (copy.hero_title_th || DEFAULT_SITE_COPY.hero_title_th)}
          </h1>

          <p className="hero-description">
            {isZh 
              ? (copy.hero_desc_zh || DEFAULT_SITE_COPY.hero_desc_zh) 
              : isEn 
                ? (copy.hero_desc_en || DEFAULT_SITE_COPY.hero_desc_en) 
                : (copy.hero_desc_th || DEFAULT_SITE_COPY.hero_desc_th)}
          </p>

          <div className="hero-cta-group">
            <a href="#vision" className="btn btn-primary">
              <span>{isZh ? "探索活化願景與空間" : isEn ? "Explore Vision & Spaces" : "สำรวจวิสัยทัศน์ & พื้นที่"}</span>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </a>
            <a href="#story" className="btn btn-secondary">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
              <span>{isZh ? "閱讀120年歷史篇章" : isEn ? "Read 120-Year Milestones" : "อ่านประวัติ 100 ปี"}</span>
            </a>
          </div>

          {/* Quick Stat Strip */}
          <div className="hero-stats-grid">
            <div className="stat-card">
              <span className="stat-number">{copy.hero_stat_1_val || "120+"}</span>
              <span className="stat-label">
                {isZh ? (copy.hero_stat_1_lbl_zh || DEFAULT_SITE_COPY.hero_stat_1_lbl_zh) : isEn ? (copy.hero_stat_1_lbl_en || DEFAULT_SITE_COPY.hero_stat_1_lbl_en) : (copy.hero_stat_1_lbl_th || DEFAULT_SITE_COPY.hero_stat_1_lbl_th)}
              </span>
            </div>
            <div className="stat-card">
              <span className="stat-number">{copy.hero_stat_2_val || "1922"}</span>
              <span className="stat-label">
                {isZh ? (copy.hero_stat_2_lbl_zh || DEFAULT_SITE_COPY.hero_stat_2_lbl_zh) : isEn ? (copy.hero_stat_2_lbl_en || DEFAULT_SITE_COPY.hero_stat_2_lbl_en) : (copy.hero_stat_2_lbl_th || DEFAULT_SITE_COPY.hero_stat_2_lbl_th)}
              </span>
            </div>
          </div>
        </div>

        {/* Hero Visual Column */}
        <div className="hero-visual">
          {/* Main Photo Card */}
          <div className="heritage-card-preview">
            <div className="visual-photo-wrapper">
              <img
                src="/img/building-community.jpg"
                alt="อาคารโรงเรียนเต้าหมิงและชุมชนเยาวชนตะกั่วป่า"
                className="hero-real-building-img"
              />

              <div className="visual-badge-overlay">
                <span className="tag-status">🏆 ASA 2026</span>
                <span className="tag-location">📍 {isZh ? "德古巴老街" : isEn ? "Takua Pa Old Town" : "ย่านเมืองเก่าศรีตะกั่วป่า"}</span>
              </div>
            </div>

            <div className="visual-caption">
              <div className="caption-logo-mini">
                <img src="/assets/logo.jpg" alt="ตราสัญลักษณ์เต้าหมิง" />
              </div>
              <div>
                <p className="caption-title">
                  {isZh ? '「導明（Dao Ming）——引領光明、傳承智慧之道」' : isEn ? '"Dao Ming means The Path of Enlightenment & Wisdom"' : '"เต้าหมิง แปลว่า หนทางแห่งแสงสว่างและปัญญา"'}
                </p>
                <span className="caption-sub">
                  {isZh ? "中西合璧公共紅毛樓建築，融合殖民柱廊與道家山牆哲學" : isEn ? "Public Ang Mor Lao architecture combining Classical Colonial and Chinese cosmology" : "อาคารอั้งม่อเหลาสาธารณะ ผสานคลาสสิกโคโลเนียลและปรัชญาจีน"}
                </span>
              </div>
            </div>
          </div>

          {/* Architectural Watermark Floating in the Open Right Space (Clean & Zero Crowding on Text) */}
          <div className="hero-right-space-watermark" aria-hidden="true">
            <img
              src="/assets/line-305.webp"
              alt=""
              className="watermark-artwork-img"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
