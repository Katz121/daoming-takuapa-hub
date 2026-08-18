'use client';

import React from 'react';
import { useApp } from '@/lib/store';

export function VisitSection() {
  const { lang, t } = useApp();
  const isEn = lang === 'en';
  const isZh = lang === 'zh';

  return (
    <section className="section section-visit" id="visit">
      <div className="container">
        <div className="section-heading text-center">
          <div className="section-tag">{t('visit_tag')}</div>
          <h2 className="section-title">
            {isZh ? "交通導覽與老城文化散步地圖" : isEn ? "Getting Here & Old Town Walking Routes" : "การเดินทาง & เส้นทางเชื่อมต่อเมืองเก่า"}
          </h2>
          <p className="section-subtitle">
            {isZh
              ? "導明學校坐落於德古巴老城核心樞紐，步行可輕鬆串聯周邊百年古廟、中葡式騎樓街屋與歷史遺跡。"
              : isEn
                ? "Dao Ming School is situated in the heart of Takua Pa Old Town, within comfortable walking distance to historic shrines and Sino-Portuguese shophouses."
                : "โรงเรียนเต้าหมิงตั้งอยู่ใจกลางย่านเมืองเก่าตะกั่วป่า สามารถเดินเชื่อมต่อไปยังจุดสำคัญทางประวัติศาสตร์ได้อย่างสะดวก"}
          </p>
        </div>

        <div className="visit-grid">
          {/* Walking Map Visual Card */}
          <div className="walking-map-card">
            <div className="map-header">
              <div className="map-title-badge">🗺️ TAKUA PA HERITAGE MAP</div>
              <h3>{isZh ? "德古巴老街文旅步行路線" : isEn ? "Takua Pa Cultural Walking Trails" : "เส้นทางเดินเท้าวัฒนธรรมเมืองเก่าตะกั่วป่า"}</h3>
            </div>

            <div className="route-nodes-list">
              <div className="route-node active-node">
                <div className="node-icon">📍</div>
                <div className="node-info">
                  <strong>{isZh ? "導明學校 (Dao Ming Hub)" : isEn ? "Dao Ming School (Dao Ming Hub)" : "โรงเรียนเต้าหมิง (Dao Ming Hub)"}</strong>
                  <span>{isZh ? "活態文化地標中心、歷史影像館與文創工藝坊" : isEn ? "Living Heritage Epicenter, Photo Museum & Craft Studio" : "จุดศูนย์กลางมรดกมีชีวิต นิทรรศการประวัติศาสตร์ และพื้นที่สร้างสรรค์"}</span>
                </div>
              </div>

              <div className="route-node">
                <div className="node-icon">⛩️</div>
                <div className="node-info">
                  <strong>{isZh ? "德古巴關帝廟 (新齋堂 / 關聖帝君)" : isEn ? "Guan Yu Shrine (Xin Cai Ting)" : "ศาลเจ้าพ่อกวนอู (ซิ่นใช่ตึ๋ง / กวนเต้กุ้น)"}</strong>
                  <span>{isZh ? "距離 650 公尺 (步行約 8 分鐘) · 逾150年閩南古廟，華人信仰中心" : isEn ? "650m away (8 min walk) · 150-year-old Hokkien ancestral shrine" : "ห่าง 650 ม. (เดิน ~8 นาที) · ศาลเจ้าจีนฮกเกี้ยนเก่าแก่อายุกว่า 150 ปี ศูนย์รวมจิตวิญญาณชุมชน"}</span>
                </div>
              </div>

              <div className="route-node">
                <div className="node-icon">🏮</div>
                <div className="node-info">
                  <strong>{isZh ? "斯里德古巴文化老街 (週日大市場徒步街)" : isEn ? "Sri Takua Pa Cultural Street (Sunday Walking Street)" : "ถนนวัฒนธรรมศรีตะกั่วป่า (ถนนคนเดินหลาดใหญ่)"}</strong>
                  <span>{isZh ? "距離 700 公尺 (步行約 9 分鐘 / 單車 2 分鐘) · 中葡風情騎樓街屋、古早味豆沙餅" : isEn ? "700m away (9 min walk) · Sino-Portuguese arcades, Sunday bazaar, Tao Sae bakeries" : "ห่าง 700 ม. (เดิน ~9 นาที / ปั่นจักรยาน 2 นาที) · ย่านตึกแถวชิโน-โปรตุกีส ตลาดวันอาทิตย์ ขนมเต้าส้อ"}</span>
                </div>
              </div>

              <div className="route-node">
                <div className="node-icon">🏛️</div>
                <div className="node-info">
                  <strong>{isZh ? "色納努查朗桑皇家寺院 & 德古巴古城牆遺址" : isEn ? "Senanuchrangsan Temple & Old City Ramparts" : "วัดเสนานุชรังสรรค์ & กำแพงเมืองเก่าตะกั่วป่า"}</strong>
                  <span>{isZh ? "距離 750 公尺 (步行約 10 分鐘) · 五世王時期皇家寺院與歷史城防壁壘" : isEn ? "750m away (10 min walk) · Royal monastery from King Rama V reign & ancient ramparts" : "ห่าง 750 ม. (เดิน ~10 นาที) · พระอารามหลวงประวัติศาสตร์สมัย ร.๕ และโบราณสถานค่ายคูเมือง"}</span>
                </div>
              </div>

              <div className="route-node">
                <div className="node-icon">🌉</div>
                <div className="node-info">
                  <strong>{isZh ? "文崇採錫挖泥船鐵橋 (Boon Soong Iron Bridge)" : isEn ? "Boon Soong Iron Dredge Bridge" : "สะพานเหล็กโคกขนุน / บุญสูง (Boon Soong Iron Bridge)"}</strong>
                  <span>{isZh ? "距離 2.9 公里 (車程約 5 分鐘 / 單車 10 分鐘) · 由舊時採錫蒸汽船鋼鐵構件改建之跨河地標鐵橋" : isEn ? "2.9km away (5 min drive / 10 min bicycle) · Iconic bridge engineered from historic tin dredger iron" : "ห่าง 2.9 กม. (ขับรถ ~5 นาที / ปั่นจักรยาน 10 นาที) · สะพานประวัติศาสตร์สร้างจากชิ้นส่วนเรือขุดแร่ดีบุกข้ามแม่น้ำ"}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Practical Info Card */}
          <div className="practical-info-card">
            <h3>{isZh ? "參訪資訊與聯絡方式" : isEn ? "Visitor Info & Contacts" : "ข้อมูลการเข้าชม & การติดต่อ"}</h3>
            <div className="info-blocks">
              <div className="info-block">
                <span className="info-icon">📍</span>
                <div>
                  <strong>{isZh ? "詳細地址" : isEn ? "Address" : "ที่ตั้ง"}</strong>
                  <p>{isZh ? "泰國攀牙府德古巴縣大市場鎮斯里德古巴路（鄰近關帝廟）郵遞區號 82110" : isEn ? "Sri Takua Pa Road, Talad Yai, Takua Pa, Phang Nga 82110 (Near Guan Yu Shrine)" : "ย่านเมืองเก่าตะกั่วป่า (ใกล้ศาลเจ้าพ่อกวนอู ซิ่นใช่ตึ๋ง) ตำบลตลาดใหญ่ อำเภอตะกั่วป่า จังหวัดพังงา 82110"}</p>
                </div>
              </div>

              <div className="info-block">
                <span className="info-icon">🕒</span>
                <div>
                  <strong>{isZh ? "開放時間" : isEn ? "Opening Hours" : "เวลาเปิดทำการ"}</strong>
                  <p>{isZh ? "週二至週日：09:00 - 18:00（市集活動日開放至 21:00 · 每週一休館）" : isEn ? "Tuesday - Sunday: 09:00 AM - 06:00 PM (Market days open till 09:00 PM · Closed Mondays)" : "วันอังคาร - วันอาทิตย์: 09:00 - 18:00 น. (วันที่มีกิจกรรม/ตลาด เปิดถึง 21:00 น. · ปิดวันจันทร์)"}</p>
                </div>
              </div>

              <div className="info-block">
                <span className="info-icon">🚗</span>
                <div>
                  <strong>{isZh ? "泊車資訊" : isEn ? "Parking" : "การจอดรถ"}</strong>
                  <p>{isZh ? "可停泊於鄰近寺廟前庭或斯里德古巴路兩側劃線車位" : isEn ? "Designated visitor parking at adjacent temple courtyard and street parking along Sri Takua Pa Road" : "มีจุดจอดรถรองรับบริเวณลานวัดใกล้เคียงและริมถนนศรีตะกั่วป่า"}</p>
                </div>
              </div>

              <div className="info-block">
                <span className="info-icon">🎫</span>
                <div>
                  <strong>{isZh ? "參觀費用" : isEn ? "General Admission" : "ค่าเข้าชมพื้นที่ทั่วไป"}</strong>
                  <p className="highlight-green">{isZh ? "免費開放自由參觀" : isEn ? "Free Admission" : "เข้าชมฟรี (Free Admission)"}</p>
                </div>
              </div>
            </div>

            <a
              href="https://maps.google.com/?q=8.833573397970662,98.36506109469767"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary btn-block"
              style={{ margin: "18px 0 14px", justifyContent: "center", gap: "8px" }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>
              <span>{isZh ? "開啟 Google Maps 衛星導航至導明學校" : isEn ? "Open Google Maps Navigation" : "เปิด Google Maps นำทางสู่โรงเรียนเต้าหมิง"}</span>
            </a>

            <div className="social-share-strip">
              <span>{isZh ? "關注我們：" : isEn ? "Follow Us:" : "ติดตามข่าวสาร:"}</span>
              <a href="#" className="social-btn">Facebook: เต้าหมิง ตะกั่วป่า</a>
              <a href="#" className="social-btn">IG: @daoming.takuapa</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
