'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import { useApp } from '@/lib/store';

export function Footer() {
  const pathname = usePathname();
  const { lang, t } = useApp();
  const isEn = lang === 'en';
  const isZh = lang === 'zh';

  // Hide footer on admin portal
  if (pathname && pathname.startsWith('/admin')) {
    return null;
  }

  return (
    <footer className="site-footer">
      <div className="container footer-content">
        <div className="footer-brand">
          <div className="brand-logo">
            <img src="/assets/logo-305.jpg" alt="โลโก้โรงเรียนเต้าหมิง" className="brand-logo-img" />
            <div className="brand-text">
              <span className="brand-title">{t('brand_title')}</span>
              <span className="brand-sub">{t('brand_sub')}</span>
            </div>
          </div>
          <p className="footer-tagline">
            {isZh
              ? '「傳承錫礦文脈之根 · 賦能青年共創未來」'
              : isEn 
                ? '"Sustaining tin mining heritage roots, empowering creative futures sustainably"' 
                : '"สืบสานรากเหง้าเมืองเหมืองแร่ เติมพลังความคิดสร้างสรรค์สู่อนาคตอย่างยั่งยืน"'}
          </p>
        </div>

        <div className="footer-links-group">
          <div className="footer-col">
            <h4>{isZh ? "導航目錄" : isEn ? "Quick Menu" : "เมนูด่วน"}</h4>
            <a href="#story">{isZh ? "120年編年史" : isEn ? "120-Year Milestones" : "ประวัติ 120 ปี"}</a>
            <a href="#gable">{t('nav_gable')}</a>
            <a href="#archive">{t('nav_archive')}</a>
            <a href="#vision">{isZh ? "新生願景" : isEn ? "New Context Vision" : "วิสัยทัศน์บริบทใหม่"}</a>
            <a href="#spaces">{isZh ? "空間分區" : isEn ? "Floorplan & Spaces" : "แผนผังพื้นที่"}</a>
          </div>
          <div className="footer-col">
            <h4>{isZh ? "社區參與" : isEn ? "Participation" : "การมีส่วนร่วม"}</h4>
            <a href="#ideas">{isZh ? "提交共創點子" : isEn ? "Submit Ideas" : "ส่งไอเดียกิจกรรม"}</a>
            <a href="#booking">{isZh ? "申請使用場地" : isEn ? "Book Space" : "ขอใช้พื้นที่จัดงาน"}</a>
            <a href="#events">{isZh ? "藝文活動日曆" : isEn ? "Event Calendar" : "ปฏิทินกิจกรรม"}</a>
            <a href="#visit">{isZh ? "交通與地圖" : isEn ? "Travel & Map" : "การเดินทาง & แผนที่"}</a>
          </div>
          <div className="footer-col">
            <h4>{isZh ? "聯繫基金會" : isEn ? "Contact Foundation" : "ติดต่อมูลนิธิฯ"}</h4>
            <p><strong>{isZh ? "德古巴導明學校基金會" : isEn ? "Dao Ming School Foundation" : "มูลนิธิโรงเรียนเต้าหมิง ตะกั่วป่า"}</strong></p>
            <p>{isZh ? "泰國攀牙府德古巴縣大市場鎮斯里德古巴路 82110" : isEn ? "Sri Takua Pa Road, Talad Yai, Takua Pa, Phang Nga 82110" : "ถนนศรีตะกั่วป่า ตำบลตลาดใหญ่ อำเภอตะกั่วป่า จังหวัดพังงา ๘๒๑๑๐"}</p>
            <p><a href="tel:0813703883" style={{ color: 'inherit', textDecoration: 'none' }}>{isZh ? "☎️ 電話: 081-370-3883" : isEn ? "☎️ Tel: 081-370-3883" : "☎️ โทร: 081-370-3883"}</a></p>
            <p><a href="mailto:pook.kanokpon@gmail.com" style={{ color: 'inherit', textDecoration: 'none' }}>{isZh ? "✉️ 電子郵箱: pook.kanokpon@gmail.com" : isEn ? "✉️ Email: pook.kanokpon@gmail.com" : "✉️ อีเมล: pook.kanokpon@gmail.com"}</a></p>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="container">
          <p>
            {isZh
              ? "© 2569 / 2026 德古巴導明學校基金會 (Dao Ming School Foundation) · 版權所有"
              : isEn
                ? "© 2569 / 2026 Dao Ming School Foundation · All Rights Reserved"
                : "© 2569 / 2026 มูลนิธิโรงเรียนเต้าหมิง ตะกั่วป่า (Dao Ming School Foundation) · สงวนลิขสิทธิ์"}
          </p>
        </div>
      </div>
    </footer>
  );
}
