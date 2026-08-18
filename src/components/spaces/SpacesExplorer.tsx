'use client';

import React from 'react';
import { useApp } from '@/lib/store';

interface ZoneDetail {
  indicator: string;
  badge_th: string;
  badge_en: string;
  badge_zh: string;
  title_th: string;
  title_en: string;
  title_zh: string;
  sub_th: string;
  sub_en: string;
  sub_zh: string;
  desc_th: string;
  desc_en: string;
  desc_zh: string;
  area: string;
  cap_th: string;
  cap_en: string;
  cap_zh: string;
  equip_th: string;
  equip_en: string;
  equip_zh: string;
  vent_th: string;
  vent_en: string;
  vent_zh: string;
}

const ZONES_DATA: Record<string, ZoneDetail> = {
  hall: {
    indicator: "A",
    badge_th: "ZONE A · ชั้น 1 โถงหลัก",
    badge_en: "ZONE A · 1st Fl. Main Hall",
    badge_zh: "A區 · 一樓主展廳",
    title_th: "โถงอาคารไม้ประวัติศาสตร์ (Main Heritage Hall)",
    title_en: "Main Heritage Hall",
    title_zh: "百年木質主展廳 (Main Heritage Hall)",
    sub_th: "ชั้นล่าง · ความจุ 80 - 120 คน · เหมาะกับงานนิทรรศการ เสวนา และพิธีการ",
    sub_en: "Ground Fl. · 80 - 120 capacity · Ideal for exhibits, talks & ceremonies",
    sub_zh: "一樓 · 容納 80 - 120 人 · 適宜特展、文化講座與典禮儀式",
    desc_th: "โถงไม้อเนกประสงค์ขนาดใหญ่ที่โปร่งโล่งด้วยหน้าต่างบานเกล็ดไม้โบราณรอบทิศทาง แสงธรรมชาติส่องกระทบพื้นไม้ขัดเงา บรรยากาศเงียบสงบและมีมนต์ขลัง เหมาะเป็นพิเศษสำหรับนิทรรศการศิลปะ งานเสวนา การเปิดตัวหนังสือ หรือคอนเสิร์ตอะคูสติก",
    desc_en: "Spacious historic timber hall with vintage louvered windows on all sides. Natural light floods polished wooden floorboards, creating an atmosphere of tranquility ideal for art exhibitions, forums, book launches, or acoustic concerts.",
    desc_zh: "寬敞通透的百年木構展廳，四周設有傳統百葉木窗，自然光影灑落於溫潤木地板上，氛圍靜謐莊重，極適宜藝術展覽、新書發布會、學術論壇與不插電音樂會。",
    area: "180 ตร.ม.",
    cap_th: "80 - 120 ที่นั่ง",
    cap_en: "80 - 120 seats",
    cap_zh: "80 - 120 席",
    equip_th: "ไฟส่องภาพ, ปลั๊กไฟ, ลำโพงบลูทูธ",
    equip_en: "Gallery lighting, Power outlets, Audio soundbar",
    equip_zh: "展覽專用軌道射燈、多組電源插座、藍牙音響系統",
    vent_th: "ลมธรรมชาติ + พัดลมโบราณ",
    vent_en: "Cross-breeze + Vintage ceiling fans",
    vent_zh: "自然穿堂風 + 復古吊扇"
  },
  courtyard: {
    indicator: "B",
    badge_th: "ZONE B · ลานกลางแจ้ง",
    badge_en: "ZONE B · Outdoor Courtyard",
    badge_zh: "B區 · 戶外文化廣場",
    title_th: "ลานกลางแจ้งเต้าหมิง (Dao Ming Courtyard)",
    title_en: "Dao Ming Courtyard",
    title_zh: "導明戶外文化庭院 (Dao Ming Courtyard)",
    sub_th: "ความจุ 150 - 250 คน · เหมาะกับตลาดคราฟต์ หนังกลางแปลง คอนเสิร์ต",
    sub_en: "150 - 250 capacity · Ideal for craft markets, open-air cinema, concerts",
    sub_zh: "容納 150 - 250 人 · 適宜文創市集、星空電影院與戶外音樂會",
    desc_th: "ลานกว้างด้านหน้าและด้านข้างอาคาร ปูด้วยอิฐโบราณและสนามหญ้า มีร่มเงาจากต้นไม้ใหญ่ บรรยากาศยามเย็นลมพัดสบาย เหมาะสำหรับจัดตลาดนัดสร้างสรรค์ โรงฉายหนังกลางแปลงใต้แสงดาว หรือเวทีเสวนาเมือง",
    desc_en: "Expansive front and side courtyard paved with historic terracotta bricks and lawns shaded by mature trees. Perfect for weekend craft bazaars, open-air cinema, and community festival stages.",
    desc_zh: "校舍前側與兩翼的開闊庭院，鋪設古法紅磚與綠意草坪，大樹成蔭，黃昏微風習習，是舉辦週末市集、露天電影與社區文化慶典的絕佳場所。",
    area: "350 ตร.ม.",
    cap_th: "150 - 250 คน",
    cap_en: "150 - 250 guests",
    cap_zh: "150 - 250 人",
    equip_th: "เต็นท์ผ้าใบ, ไฟประดับสวน, จุดต่อไฟสนาม",
    equip_en: "Vintage canvas tents, Festive string lights, Power outlets",
    equip_zh: "復古帆布攤位帳篷、戶外暖光氛圍串燈、戶外防水電源",
    vent_th: "โล่งแจ้ง ลมพัดผ่านตลอดวัน",
    vent_en: "Open-air with natural breeze",
    vent_zh: "戶外開闊全日自然通風"
  },
  studio: {
    indicator: "C",
    badge_th: "ZONE C · ชั้น 1 ปีกซ้าย",
    badge_en: "ZONE C · 1st Fl. Left Wing",
    badge_zh: "C區 · 一樓左翼工作坊",
    title_th: "สตูดิโอเวิร์กช็อป & ห้องเรียนคราฟต์ (Craft Studios)",
    title_en: "Craft Studios & Creative Workshops",
    title_zh: "文創工藝手作坊 (Craft Studios)",
    sub_th: "ความจุ 20 - 35 คน · พร้อมอุปกรณ์ศิลปะ โต๊ะทำงานกลุ่ม และจอโปรเจกเตอร์",
    sub_en: "20 - 35 capacity · Equipped with art tables, sinks & projector",
    sub_zh: "容納 20 - 35 人 · 配備工藝長桌、專用水槽與高清投影設備",
    desc_th: "ห้องปฏิบัติการงานคราฟต์ที่ออกแบบให้เหมาะกับการลงมือทำ มีโต๊ะไม้ตัวยาว อ่างล้างมือสำหรับงานศิลปะ และอุปกรณ์สำหรับเวิร์กช็อปผ้าบาติก การทำอาหาร-ขนมพื้นเมือง หรืองานปั้นเซรามิก",
    desc_en: "Hands-on maker studio equipped with long wooden workbenches, washing stations, and tools for natural dye batik, local culinary classes, and pottery workshops.",
    desc_zh: "專為手作體驗打造的創客工坊，備有實木大板桌、手作專用水槽，適合天然蠟染、傳統豆沙餅烘焙及陶藝彩繪教學。",
    area: "65 ตร.ม.",
    cap_th: "20 - 35 ที่นั่ง",
    cap_en: "20 - 35 workshop seats",
    cap_zh: "20 - 35 體驗席",
    equip_th: "โต๊ะทำงานกลุ่ม, อ่างล้างน้ำ, จอฉายโปรเจกเตอร์",
    equip_en: "Long wooden tables, Wash basins, Projector screen",
    equip_zh: "實木工作長桌、洗滌浸染槽、高清投影幕",
    vent_th: "หน้าต่างบานเปิด 2 ด้าน + พัดลมดูดอากาศ",
    vent_en: "Dual-sided windows + Exhaust ventilation",
    vent_zh: "雙側採光對流窗 + 靜音排氣系統"
  },
  cafe: {
    indicator: "D",
    badge_th: "ZONE D · ชั้น 1 ปีกขวา",
    badge_en: "ZONE D · 1st Fl. Right Wing",
    badge_zh: "D區 · 一樓右翼茶座",
    title_th: "คาเฟ่ชุมชน & มุมอ่านหนังสือ (Cafe & Reading Nook)",
    title_en: "Community Cafe & Reading Nook",
    title_zh: "社區茶座與閱讀共創角 (Cafe & Reading Nook)",
    sub_th: "ความจุ 30 - 45 คน · มุมพักผ่อน กาแฟ ขนมพื้นถิ่น และพื้นที่นั่งทำงาน",
    sub_en: "30 - 45 capacity · Relaxed coffee, local snacks & co-working space",
    sub_zh: "容納 30 - 45 人 · 在地咖啡茶飲、傳統茶點與共享辦公空間",
    desc_th: "พื้นที่กึ่งเปิดโล่งที่เชื่อมต่อกับระเบียง เสิร์ฟกาแฟคั่วพิเศษจากพังงา ชาจีนโบราณ และขนมเต้าส้อสูตรดั้งเดิม มีโต๊ะทำงานพร้อมปลั๊กไฟและ Wi-Fi ความเร็วสูง เหมาะสำหรับนั่งทำงาน อ่านหนังสือ หรือพบปะพูดคุย",
    desc_en: "Semi-open space adjoining the veranda, serving Phang Nga artisanal coffee, traditional Chinese tea, and warm Tao Sae pastries. Fitted with high-speed Wi-Fi and power outlets for co-working.",
    desc_zh: "與外廊相連的半開放式空間，供應攀牙產地精品咖啡、工夫名茶與現烤傳統豆沙餅。配有充電插座與高速無線網絡，兼具休憩與遠端辦公功能。",
    area: "75 ตร.ม.",
    cap_th: "30 - 45 ที่นั่ง",
    cap_en: "30 - 45 seats",
    cap_zh: "30 - 45 席",
    equip_th: "High-Speed Wi-Fi, ปลั๊กไฟทุกโต๊ะ, เคาน์เตอร์บาร์",
    equip_en: "High-Speed Wi-Fi, Power sockets at tables, Coffee bar",
    equip_zh: "全區高速Wi-Fi、各桌充電插孔、專業茶飲水吧",
    vent_th: "ลมธรรมชาติ + พัดลมเพดานวินเทจ",
    vent_en: "Natural breeze + Vintage ceiling fans",
    vent_zh: "自然對流風 + 復古吊扇"
  },
  veranda: {
    indicator: "E",
    badge_th: "ZONE E · มุขหน้า & ระเบียง",
    badge_en: "ZONE E · Porch & Veranda",
    badge_zh: "E區 · 雙層前廊與景觀露台",
    title_th: "ระเบียงมุขยื่น 2 ชั้น & สวนหย่อม (Double Porch & Veranda)",
    title_en: "Double Porch & Garden Veranda",
    title_zh: "雙層紅毛樓前廊與景觀露台 (Double Porch & Veranda)",
    sub_th: "ความจุ 25 - 40 คน · นิทรรศการกลางแจ้ง มุมถ่ายรูป และพักผ่อน",
    sub_en: "25 - 40 capacity · Outdoor exhibit, photography & scenic nook",
    sub_zh: "容納 25 - 40 人 · 戶外影像微展、攝影打卡與觀景小憩",
    desc_th: "มุขยื่น 2 ชั้นอันเป็นเอกลักษณ์ทางสถาปัตยกรรมอั้งม่อเหลา หัวเสากรีกโบราณ และระเบียงไม้รับลม มองเห็นทัศนียภาพถนนศรีตะกั่วป่า เหมาะสำหรับจัดนิทรรศการภาพถ่ายขนาดย่อม หรือมุมจิบชายามบ่าย",
    desc_en: "Distinctive two-story projecting porch showcasing Greek order capitals and breezy balustrades overlooking Sri Takua Pa road. Ideal for photo spots and afternoon tea tastings.",
    desc_zh: "中西合璧雙層門廊建築標誌，希臘古典柱頭與木質雕花欄杆，可俯瞰德古巴老街街景，適宜微型攝影展、漢服打卡與午後茶席體驗。",
    area: "50 ตร.ม.",
    cap_th: "25 - 40 คน",
    cap_en: "25 - 40 guests",
    cap_zh: "25 - 40 人",
    equip_th: "ม้านั่งไม้ยาว, ราวนิทรรศการภาพ, ไฟส่องอาคาร",
    equip_en: "Long wooden benches, Picture hanging rails, Facade lights",
    equip_zh: "實木觀景長凳、專業掛畫導軌、建築夜間景觀燈",
    vent_th: "โล่งแจ้ง รับลมระเบียง 3 ทิศทาง",
    vent_en: "Open-air 3-way veranda breeze",
    vent_zh: "三向開闊通透海陸風對流"
  }
};

export function SpacesExplorer() {
  const { lang, t, selectedZone, setSelectedZone, showToast, setVirtualTourOpen } = useApp();
  const isEn = lang === 'en';
  const isZh = lang === 'zh';

  const zoneKey = ZONES_DATA[selectedZone] ? selectedZone : 'hall';
  const zone = ZONES_DATA[zoneKey];

  const handleBooking = () => {
    showToast(
      isZh
        ? `已收到關於「${zone.title_zh}」的預約申請！基金會團隊將儘速與您聯繫確認。`
        : isEn
          ? `Booking request for "${zone.title_en}" received! Our foundation team will contact you.`
          : `บันทึกคำขอใช้พื้นที่ "${zone.title_th}" สำเร็จ! เจ้าหน้าที่มูลนิธิจะติดต่อกลับเพื่อประสานงาน`
    );
  };

  return (
    <section className="section section-spaces" id="spaces">
      <div className="container">
        <div className="section-heading text-center">
          <div className="section-tag">{t('spaces_tag')}</div>
          <h2 className="section-title">{t('spaces_title')}</h2>
          <p className="section-subtitle">{t('spaces_subtitle')}</p>
        </div>

        <div className="space-explorer-layout">
          {/* Zone Selector List */}
          <div className="zone-list" id="zoneList">
            {Object.entries(ZONES_DATA).map(([key, z]) => (
              <div
                key={key}
                className={`zone-item ${zoneKey === key ? 'active' : ''}`}
                onClick={() => setSelectedZone(key)}
              >
                <div className="zone-indicator">{z.indicator}</div>
                <div className="zone-info">
                  <h4>{isZh ? z.title_zh : isEn ? z.title_en : z.title_th}</h4>
                  <span>{isZh ? z.sub_zh : isEn ? z.sub_en : z.sub_th}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Zone Detailed Card Display */}
          <div className="zone-preview-card" id="zonePreviewCard">
            <div className="zone-preview-header">
              <div className="zone-tag-badge" id="zoneBadge">
                {isZh ? zone.badge_zh : isEn ? zone.badge_en : zone.badge_th}
              </div>
              <h3 id="zoneTitle">{isZh ? zone.title_zh : isEn ? zone.title_en : zone.title_th}</h3>
              <p id="zoneDesc">{isZh ? zone.desc_zh : isEn ? zone.desc_en : zone.desc_th}</p>
            </div>

            <div className="zone-specs-grid">
              <div className="spec-item">
                <span className="spec-label">📐 {isZh ? "使用面積" : isEn ? "Area Size" : "ขนาดพื้นที่"}</span>
                <strong id="zoneArea">{zone.area}</strong>
              </div>
              <div className="spec-item">
                <span className="spec-label">👥 {isZh ? "容納人數" : isEn ? "Capacity" : "ความจุคน"}</span>
                <strong id="zoneCap">{isZh ? zone.cap_zh : isEn ? zone.cap_en : zone.cap_th}</strong>
              </div>
              <div className="spec-item">
                <span className="spec-label">💡 {isZh ? "現成設備" : isEn ? "Facilities" : "อุปกรณ์พร้อมใช้"}</span>
                <strong id="zoneEquip">{isZh ? zone.equip_zh : isEn ? zone.equip_en : zone.equip_th}</strong>
              </div>
              <div className="spec-item">
                <span className="spec-label">🌿 {isZh ? "通風條件" : isEn ? "Airflow" : "การระบายอากาศ"}</span>
                <strong id="zoneVent">{isZh ? zone.vent_zh : isEn ? zone.vent_en : zone.vent_th}</strong>
              </div>
            </div>

            <div className="zone-action-bar">
              <button className="btn btn-primary" onClick={handleBooking}>
                <span>{isZh ? "預約使用此區域" : isEn ? "Book this Zone" : "ขอจองใช้พื้นที่โซนนี้"}</span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </button>
              <button
                className="btn btn-secondary-sm"
                id="btn360Preview"
                onClick={() => setVirtualTourOpen(true)}
              >
                <span>🌐 {isZh ? "查看 360° 全景導覽" : isEn ? "Explore 360° View" : "ดูภาพจำลอง 360°"}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
