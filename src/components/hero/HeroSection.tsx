'use client';

import React from 'react';
import { useApp } from '@/lib/store';

export function HeroSection() {
  const { lang } = useApp();
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
                ? "泰國暹羅皇家建築師協會 (ASA) 2026年度傑出建築保護大獎"
                : isEn 
                  ? "Architectural Conservation Award 2026 · The Association of Siamese Architects under Royal Patronage (ASA)" 
                  : "รางวัลอนุรักษ์ศิลปสถาปัตยกรรม ประจำปี 2569 · สมาคมสถาปนิกสยาม ในพระบรมราชูปถัมภ์ (ASA)"}
            </span>
          </div>

          <div className="hero-badge">
            <span className="badge-dot"></span>
            <span>
              {isZh
                ? "攀牙府首所也是唯一百年華校 · 1905年創辦 / 1922年建校舍"
                : isEn 
                  ? "First & Only Chinese School in Phang Nga · Founded 1905 / Building 1922" 
                  : "โรงเรียนจีนแห่งแรกและแห่งเดียวของ จ.พังงา · ก่อตั้ง พ.ศ. 2448 / อาคาร พ.ศ. 2465"}
            </span>
          </div>

          <h1 className="hero-title">
            {isZh ? (
              <>重煥百年 <span className="highlight-wood">明德指引之路</span><br />賦能老城文創 <span className="highlight-terracotta">永續未來</span></>
            ) : isEn ? (
              <>Revitalizing <span className="highlight-wood">The Path of Light</span><br />Empowering Creative <span className="highlight-terracotta">Future</span></>
            ) : (
              <>คืนชีวิตให้ <span className="highlight-wood">เส้นทางแห่งแสงสว่าง</span><br />เติมพลังสร้างสรรค์สู่ <span className="highlight-terracotta">อนาคต</span></>
            )}
          </h1>

          <p className="hero-description">
            {isZh ? (
              <>從<strong>「卓明（โต๊ะเบ๋ง）」到「導明（導明學校）」</strong>——這所於1922年由華人礦商集資、閩南名匠包師傅親手築造的攀牙府開山華校，如今在基金會守護下全面活化，蛻變為凝聚跨世代情感與文創能量的<strong>「活態文化遺產（Living Heritage）」</strong>。</>
            ) : isEn ? (
              <>From <strong>"Toh Beng" to "Dao Ming" (導明)</strong>, the premier Chinese academy in Phang Nga founded by tin mining merchants and Master Pao in 1922, thoughtfully transformed into a <strong>Living Heritage</strong> cultural & creative hub for all generations.</>
            ) : (
              <>จาก <strong>"โต๊ะเบ๋ง" สู่ "เต้าหมิง"</strong> โรงเรียนจีนแห่งแรกของจังหวัดพังงาที่สร้างขึ้นโดยการลงขันของคหบดีเหมืองแร่และช่างผาวในปี 2465 สู่การเป็น <strong>มรดกที่มีชีวิต (Living Heritage)</strong> ภายใต้มูลนิธิโรงเรียนเต้าหมิง ตะกั่วป่า เพื่อการเรียนรู้ วัฒนธรรม และพื้นที่สร้างสรรค์ของทุกคน</>
            )}
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
              <span className="stat-number">120+</span>
              <span className="stat-label">
                {isZh ? "年歷史厚度 (自1905年創辦)" : isEn ? "Years of Legacy since 1905 (Toh Beng)" : "ปี นับแต่เริ่มก่อตั้ง พ.ศ. 2448 (โต๊ะเบ๋ง)"}
              </span>
            </div>
            <div className="stat-card">
              <span className="stat-number">1922</span>
              <span className="stat-label">
                {isZh ? "年包師傅掌墨興建紅毛樓校舍" : isEn ? "Year Schoolhouse Built by Master Pao" : "ปีสร้างอาคารอั้งม่อเหลา โดยนายผาว"}
              </span>
            </div>
          </div>
        </div>

        {/* Hero Visual Card */}
        <div className="hero-visual">
          <div className="heritage-card-preview">
            <div className="visual-photo-wrapper">
              <img src="/img/อาคารกับชุมชน.jpg" alt="อาคารโรงเรียนเต้าหมิงและชุมชนเยาวชนตะกั่วป่า" className="hero-real-building-img" />
              <div className="visual-badge-overlay">
                <span className="tag-status">🏆 ASA 2026</span>
                <span className="tag-location">📍 {isZh ? "德古巴老街" : isEn ? "Takua Pa Old Town" : "ย่านเมืองเก่าศรีตะกั่วป่า"}</span>
              </div>
            </div>
            <div className="visual-caption">
              <div className="caption-logo-mini">
                <img src="/assets/logo-305.jpg" alt="ตราสัญลักษณ์เต้าหมิง" />
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
        </div>
      </div>
    </section>
  );
}
