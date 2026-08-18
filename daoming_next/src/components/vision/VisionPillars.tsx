'use client';

import React from 'react';
import { useApp } from '@/lib/store';

export function VisionPillars() {
  const { lang, t, setSelectedZone } = useApp();
  const isEn = lang === 'en';
  const isZh = lang === 'zh';

  const selectZoneAndScroll = (zoneKey: string) => {
    setSelectedZone(zoneKey);
    const target = document.getElementById('spaces');
    if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <section className="section section-vision" id="vision">
      <div className="container">
        <div className="section-heading text-center">
          <div className="section-tag">{t('vision_tag')}</div>
          <h2 className="section-title">{t('vision_title')}</h2>
          <p className="section-subtitle">{t('vision_subtitle')}</p>
        </div>

        <div className="pillars-grid">
          {/* Pillar 1 */}
          <div className="pillar-card pillar-card-ochre" onClick={() => selectZoneAndScroll('hall')}>
            <div className="pillar-top-stripe"></div>
            {/* Authentic Motif: 12-Ray Sunburst & Cloud Stucco */}
            <svg className="pillar-bg-pattern" viewBox="0 0 120 120" aria-hidden="true">
              <circle cx="60" cy="60" r="24" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="4 2"/>
              <circle cx="60" cy="60" r="14" fill="currentColor" fillOpacity="0.12" stroke="currentColor" strokeWidth="2"/>
              <g stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <line x1="60" y1="24" x2="60" y2="32"/><line x1="60" y1="88" x2="60" y2="96"/>
                <line x1="24" y1="60" x2="32" y2="60"/><line x1="88" y1="60" x2="96" y2="60"/>
                <line x1="34" y1="34" x2="40" y2="40"/><line x1="80" y1="80" x2="86" y2="86"/>
                <line x1="34" y1="86" x2="40" y2="80"/><line x1="80" y1="40" x2="86" y2="34"/>
                <line x1="46" y1="27" x2="50" y2="35"/><line x1="70" y1="85" x2="74" y2="93"/>
                <line x1="27" y1="46" x2="35" y2="50"/><line x1="85" y1="70" x2="93" y2="74"/>
              </g>
              <path d="M30,102 Q45,90 60,102 T90,102" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>

            <div className="pillar-card-header">
              <div className="pillar-icon-box">🏛️</div>
              <div className="pillar-index-badge">
                <span className="pillar-number">01</span>
                <span className="pillar-zone-tag">ZONE A</span>
              </div>
            </div>
            <div className="pillar-subhead-row">
              <span className="pillar-seal">歷史</span>
              <span className="pillar-motif-tag">{isZh ? "十二光芒太陽紋" : isEn ? "12-Ray Solar Motif" : "ลายพระอาทิตย์ ๑๒ รัศมี"}</span>
            </div>
            <h3 className="pillar-title">
              {isZh ? "活態影像館與老城檔案 (Living Archive)" : isEn ? "Living Museum & Town Archive (Living Archive)" : "พิพิธภัณฑ์มีชีวิต & บันทึกเมือง (Living Archive)"}
            </h3>
            <p className="pillar-desc">
              {isZh
                ? "展示錫礦黃金時代文物、珍貴歷史照片與創校家族口述歷史檔案，串聯老城百年集體記憶"
                : isEn 
                  ? "Exhibiting tin mining golden era artifacts, historic photography, and oral histories of founding families"
                  : "จัดแสดงนิทรรศการยุคทองดีบุก ภาพถ่ายโบราณ เครื่องใช้ในอดีต และบันทึกประวัติศาสตร์คำบอกเล่า (Oral History) ของคนเฒ่าคนแก่"}
            </p>
            <div className="pillar-features-wrap">
              <span className="pillar-chip">✦ {isZh ? "錫礦歷史展與早期華人家族文獻" : isEn ? "Mining history & Chinese family archives" : "นิทรรศการประวัติศาสตร์เหมืองแร่ & ครอบครัวชาวจีน"}</span>
              <span className="pillar-chip">✦ {isZh ? "老城文史資訊中心與圖書典藏" : isEn ? "Information center & Old town heritage library" : "ศูนย์ข้อมูลและห้องสมุดประวัติศาสตร์เมืองเก่า"}</span>
              <span className="pillar-chip">✦ {isZh ? "二樓：靜謐清幽的禪修與交流空間" : isEn ? "Upper floor: Peaceful meditation sanctuary" : "ชั้นบน: สถานปฏิบัติธรรมอันสงบเงียบ"}</span>
            </div>
            <div className="pillar-card-action">
              <span className="pillar-action-link">{isZh ? "查看 A區 (主展廳) 平面 →" : isEn ? "Explore Zone A (Heritage Hall) →" : "ดูแผนผังโซน A (โถงอาคาร) →"}</span>
            </div>
          </div>

          {/* Pillar 2 */}
          <div className="pillar-card pillar-card-terracotta highlight-card" onClick={() => selectZoneAndScroll('studio')}>
            <div className="pillar-top-stripe"></div>
            {/* Authentic Motif: Peranakan Batik Floral & Craft Mandala */}
            <svg className="pillar-bg-pattern" viewBox="0 0 120 120" aria-hidden="true">
              <circle cx="60" cy="60" r="42" fill="none" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3 3"/>
              <path d="M60,24 C70,42 70,50 60,60 C50,50 50,42 60,24 Z" fill="currentColor" fillOpacity="0.12" stroke="currentColor" strokeWidth="2"/>
              <path d="M60,96 C70,78 70,70 60,60 C50,70 50,78 60,96 Z" fill="currentColor" fillOpacity="0.12" stroke="currentColor" strokeWidth="2"/>
              <path d="M24,60 C42,70 50,70 60,60 C50,50 42,50 24,60 Z" fill="currentColor" fillOpacity="0.12" stroke="currentColor" strokeWidth="2"/>
              <path d="M96,60 C78,70 70,70 60,60 C70,50 78,50 96,60 Z" fill="currentColor" fillOpacity="0.12" stroke="currentColor" strokeWidth="2"/>
              <circle cx="60" cy="60" r="10" fill="none" stroke="currentColor" strokeWidth="2"/>
            </svg>

            <div className="pillar-badge">POPULAR</div>
            <div className="pillar-card-header">
              <div className="pillar-icon-box">🎨</div>
              <div className="pillar-index-badge">
                <span className="pillar-number">02</span>
                <span className="pillar-zone-tag">ZONE C</span>
              </div>
            </div>
            <div className="pillar-subhead-row">
              <span className="pillar-seal">創藝</span>
              <span className="pillar-motif-tag">{isZh ? "峇峇娘惹蠟染紋樣" : isEn ? "Batik Stencil Motif" : "ลายฉลุผ้าบาติก & คราฟต์"}</span>
            </div>
            <h3 className="pillar-title">
              {isZh ? "文創工坊與藝術大師課 (Creative Studio)" : isEn ? "Craft Studio & Art Masterclasses (Creative Studio)" : "สตูดิโอคราฟต์ & เวิร์กช็อปศิลปะ (Creative Studio)"}
            </h3>
            <p className="pillar-desc">
              {isZh
                ? "鼓勵全年齡層動手體驗的創客課堂，由在地藝師與青年藝術家帶領，將傳統智慧轉化為當代文創設計"
                : isEn 
                  ? "Creative makerspace inviting people of all ages to transform local crafts into contemporary designs"
                  : "ห้องเรียนสร้างสรรค์ชวนคนทุกวัยลงมือทำ เปลี่ยนภูมิปัญญาท้องถิ่นเป็นผลิตภัณฑ์ร่วมสมัย สอนโดยช่างฝีมือและศิลปินรุ่นใหม่"}
            </p>
            <div className="pillar-features-wrap">
              <span className="pillar-chip">✦ {isZh ? "老城天然植物染蠟染印花工坊" : isEn ? "Old town natural batik printing" : "เวิร์กช็อปพิมพ์ลายผ้าบาติกเมืองเก่า"}</span>
              <span className="pillar-chip">✦ {isZh ? "古法豆沙餅與娘惹糕點烘焙班" : isEn ? "Tao Sae pastry & Peranakan cuisine" : "คลาสทำขนมเต้าส้อ & อาหารเปอรานากัน"}</span>
              <span className="pillar-chip">✦ {isZh ? "陶藝拉坯塑形與老城水彩寫生" : isEn ? "Ceramic pottery & watercolor painting" : "การปั้นเซรามิก & วาดภาพสีน้ำสถาปัตยกรรม"}</span>
            </div>
            <div className="pillar-card-action">
              <span className="pillar-action-link">{isZh ? "查看 C區 (手作坊) 平面 →" : isEn ? "Explore Zone C (Craft Studio) →" : "ดูแผนผังโซน C (สตูดิโอคราฟต์) →"}</span>
            </div>
          </div>

          {/* Pillar 3 */}
          <div className="pillar-card pillar-card-wood" onClick={() => selectZoneAndScroll('cafe')}>
            <div className="pillar-top-stripe"></div>
            {/* Authentic Motif: Sino Wooden Window Geometry */}
            <svg className="pillar-bg-pattern" viewBox="0 0 120 120" aria-hidden="true">
              <rect x="22" y="22" width="76" height="76" rx="6" fill="none" stroke="currentColor" strokeWidth="2"/>
              <path d="M34,34 H86 V86 H34 Z" fill="none" stroke="currentColor" strokeWidth="1.5" strokeDasharray="4 2"/>
              <path d="M46,46 H74 V74 H46 Z" fill="currentColor" fillOpacity="0.09" stroke="currentColor" strokeWidth="2"/>
              <line x1="22" y1="60" x2="46" y2="60" stroke="currentColor" strokeWidth="2"/>
              <line x1="74" y1="60" x2="98" y2="60" stroke="currentColor" strokeWidth="2"/>
              <line x1="60" y1="22" x2="60" y2="46" stroke="currentColor" strokeWidth="2"/>
              <line x1="60" y1="74" x2="60" y2="98" stroke="currentColor" strokeWidth="2"/>
            </svg>

            <div className="pillar-card-header">
              <div className="pillar-icon-box">☕</div>
              <div className="pillar-index-badge">
                <span className="pillar-number">03</span>
                <span className="pillar-zone-tag">ZONE D</span>
              </div>
            </div>
            <div className="pillar-subhead-row">
              <span className="pillar-seal">聚場</span>
              <span className="pillar-motif-tag">{isZh ? "紅毛樓古典百葉木窗幾何" : isEn ? "Ang Mor Lao Window Motif" : "ลายบานหน้าต่างอั้งม่อเหลา"}</span>
            </div>
            <h3 className="pillar-title">
              {isZh ? "社區茶座與共享辦公空間 (Community Lounge)" : isEn ? "Community Cafe & Co-Working Lounge (Community Lounge)" : "คาเฟ่ชุมชน & Co-Working Space (Community Lounge)"}
            </h3>
            <p className="pillar-desc">
              {isZh
                ? "靜謐舒適的辦公與社交場所，供應攀牙產地精品咖啡、工夫名茶與在地風味點心"
                : isEn 
                  ? "Relaxed space to work and meet, serving Phang Nga roast coffee, Chinese tea pairings, and local sweets"
                  : "พื้นที่นั่งทำงาน นัดพบปะ และคุยโปรเจกต์ เสิร์ฟเครื่องดื่มจากเมล็ดกาแฟท้องถิ่นพังงา ขนมพื้นเมือง และงานคราฟต์ชุมชน"}
            </p>
            <div className="pillar-features-wrap">
              <span className="pillar-chip">✦ {isZh ? "沉浸式閱讀與遠端工作區 (高速Wi-Fi)" : isEn ? "Quiet reading & laptop working area (Wi-Fi)" : "โซนเงียบสำหรับอ่านหนังสือและทำงาน (Wi-Fi)"}</span>
              <span className="pillar-chip">✦ {isZh ? "跨界交流大長桌與工夫茶席吧" : isEn ? "Community sharing table & tea bar" : "โต๊ะสนทนาแลกเปลี่ยนไอเดีย (Community Table)"}</span>
              <span className="pillar-chip">✦ {isZh ? "在地手作工藝伴手禮展示展銷" : isEn ? "Local artisan souvenir showcase" : "จำหน่ายของฝากคราฟต์ฝีมือชุมชน"}</span>
            </div>
            <div className="pillar-card-action">
              <span className="pillar-action-link">{isZh ? "查看 D區 (社區茶座) 平面 →" : isEn ? "Explore Zone D (Community Lounge) →" : "ดูแผนผังโซน D (คาเฟ่ชุมชน) →"}</span>
            </div>
          </div>

          {/* Pillar 4 */}
          <div className="pillar-card pillar-card-celadon" onClick={() => selectZoneAndScroll('courtyard')}>
            <div className="pillar-top-stripe"></div>
            {/* Authentic Motif: Takua Pa River Waves & Tin Starfire */}
            <svg className="pillar-bg-pattern" viewBox="0 0 120 120" aria-hidden="true">
              <path d="M18,36 Q38,20 58,36 T98,36" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
              <path d="M18,58 Q38,42 58,58 T98,58" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
              <path d="M18,80 Q38,64 58,80 T98,80" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
              <path d="M78,16 L81,24 L89,27 L81,30 L78,38 L75,30 L67,27 L75,24 Z" fill="currentColor" fillOpacity="0.25" stroke="currentColor" strokeWidth="1.5"/>
            </svg>

            <div className="pillar-card-header">
              <div className="pillar-icon-box">🎪</div>
              <div className="pillar-index-badge">
                <span className="pillar-number">04</span>
                <span className="pillar-zone-tag">ZONE B</span>
              </div>
            </div>
            <div className="pillar-subhead-row">
              <span className="pillar-seal">市集</span>
              <span className="pillar-motif-tag">{isZh ? "德古巴礦河波紋" : isEn ? "River Wave Motif" : "ลายคลื่นน้ำแม่น้ำเมืองแร่"}</span>
            </div>
            <h3 className="pillar-title">
              {isZh ? "戶外廣場與黃昏文創市集 (Courtyard & Market)" : isEn ? "Courtyard & Twilight Market (Courtyard & Market)" : "ลานกิจกรรม & ตลาดสร้างสรรค์ (Courtyard & Market)"}
            </h3>
            <p className="pillar-desc">
              {isZh
                ? "校舍前開闊廣場，蛻變為開放式舞台，舉辦草地音樂會、露天星空電影院、社區話劇及週末文創市集"
                : isEn 
                  ? "Open-air plaza hosting acoustic concerts, open-air cinema, community theater, and weekend night markets"
                  : "ลานกว้างหน้าอาคารที่แปลงร่างเป็นเวทีเปิด แสดงดนตรี ฉายหนังกลางแปลง ละครเวทีชุมชน เสวนาเมือง และตลาดนัดยามเย็น"}
            </p>
            <div className="pillar-features-wrap">
              <span className="pillar-chip">✦ {isZh ? "導明週末黃昏文創市集" : isEn ? "Dao Ming Creative Weekend Market" : "ตลาดนัดเต้าหมิง ครีเอทีฟ มาร์เก็ต สุดสัปดาห์"}</span>
              <span className="pillar-chip">✦ {isZh ? "古樹星空下的露天經典電影放映" : isEn ? "Moonlit open-air cinema nights" : "โรงฉายภาพยนตร์กลางแปลงใต้แสงดาว"}</span>
              <span className="pillar-chip">✦ {isZh ? "老城地方創生論壇與不插電舞台" : isEn ? "Town talk forums & acoustic stages" : "เวทีเสวนาเมืองและศิลปะร่วมสมัย"}</span>
            </div>
            <div className="pillar-card-action">
              <span className="pillar-action-link">{isZh ? "查看 B區 (戶外廣場) 平面 →" : isEn ? "Explore Zone B (Courtyard) →" : "ดูแผนผังโซน B (ลานกลางแจ้ง) →"}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
