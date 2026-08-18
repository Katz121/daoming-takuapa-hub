'use client';

import React, { useState } from 'react';
import { useApp } from '@/lib/store';

const TIMELINE_DATA = {
  "1905": {
    badge_th: "พ.ศ. ๒๔๔๘ - ๒๔๖๕",
    badge_en: "1905 - 1922",
    badge_zh: "1905 - 1922年",
    title_th: 'กำเนิด "โต๊ะเบ๋ง" สู่การก่อสร้างอาคารเต้าหมิงโดยช่างผาว',
    title_en: 'Origins of "Toh Beng" to Dao Ming Schoolhouse Construction by Master Pao',
    title_zh: '從「卓明（โต๊ะเบ๋ง）」創立至「包師傅（ช่างผาว）」掌墨興築校舍',
    desc_th: "เริ่มก่อตั้งอย่างไม่เป็นทางการในปี 2448 ในชื่อโต๊ะเบ๋ง ก่อนเปลี่ยนเป็นเต้าหมิง (導明) และจดทะเบียนโรงเรียนราษฎร์ในปี 2463 อาคารหลังปัจจุบันสร้างขึ้นในปี 2465 โดยนายผาว ช่างฝีมือชาวจีนฮกเกี้ยน จากเงินบริจาคของคหบดีเหมืองแร่ตะกั่วป่า ระนอง และภูเก็ต เดิมมุงหลังคากระเบื้องกาบกล้วยและเชิงชายไม้ฉลุ",
    desc_en: "Founded informally in 1905 as Toh Beng, registered as a private academy in 1920. The current schoolhouse was built in 1922 by Hokkien master builder Pao through community donations from tin magnates in Takua Pa, Ranong, and Phuket.",
    desc_zh: "1905年以閩南語「卓明」之名非正式創校，1920年正式更名為「導明」並註冊為私立學校。現存巍峨校舍於1922年由福建名匠「包師傅（นายผาว）」主持建造，資金源自德古巴、拉廊及普吉三地華人錫礦商賈鼎力集資，初建時鋪設芭蕉瓦屋頂並配有精美木雕花邊。",
    photo: "/img/นิทรรศการ3-โซน 1-โรงเรียนเต้าหมิง.jpg",
    caption_th: '"ภาพประวัติศาสตร์: นักเรียนและครูถ่ายภาพร่วมกันหน้าอาคารเต้าหมิง ยุคหลังคากระเบื้องกาบกล้วยดั้งเดิม"',
    caption_en: '"Historic Portrait: First generation students and scholars before the original banana-tile roof architecture"',
    caption_zh: '「歷史珍影：首屆師生齊聚於芭蕉瓦原貌校舍前合影」',
    chips_th: ["🏛️ ช่างผาว ฮกเกี้ยน", "📚 จดทะเบียนราษฎร์ 2463", "🤝 ลงขันเหมืองแร่ 3 เมือง"],
    chips_en: ["🏛️ Master Builder Pao", "📚 Registered Academy 1920", "🤝 3-City Tin Merchant Donors"],
    chips_zh: ["🏛️ 閩南名匠包師傅", "📚 1920年註冊立案", "🤝 三府華商集資興學"]
  },
  "1950": {
    badge_th: "พ.ศ. ๒๔๘๐ - ๒๕๑๐",
    badge_en: "1937 - 1967",
    badge_zh: "1937 - 1967年",
    title_th: "ยุคทองแห่งการศึกษา & กิจกรรมชุมชนตะกั่วป่า",
    title_en: "The Golden Era: Vibrant Education, Sports & Diplomacy",
    title_zh: "教育黃金時代 · 熱血籃球盛會與隆重接待中國總領事",
    desc_th: "เป็นศูนย์กลางการศึกษาภาษาจีน มีนักเรียนหลายร้อยคน มีการจัดกิจกรรมกีฬาบาสเกตบอลเชื่อมความสัมพันธ์ชุมชน และได้รับเกียรติเป็นสถานที่ต้อนรับบุคคลสำคัญ เช่น กงสุลใหญ่สาธารณรัฐจีนประจำสงขลา ในปี พ.ศ. ๒๔๙๓",
    desc_en: "Pioneered Chinese language and ethics education with hundreds of students, famous basketball tournament leagues, and hosted the Consul-General of the Republic of China in 1950.",
    desc_zh: "作為全府華文教育核心，育才數百人，並建有老城最具人氣之紅土籃球場，舉辦盛大社區聯賽。1950年更榮膺全城最高禮遇，於校舍前廊隆重接待中華民國駐宋卡總領事，銘刻歷史外交高光時刻。",
    photo: "/img/นิทรรศการ3-โซน2-รับรองกงสุลจีน.jpg",
    caption_th: '"ภาพประวัติศาสตร์: พิธีต้อนรับกงสุลใหญ่ ณ มุขหน้าอาคารเต้าหมิง พ.ศ. ๒๔๙๓"',
    caption_en: '"Historic Portrait: Reception ceremony for the Chinese Consul-General at Dao Ming in 1950"',
    caption_zh: '「歷史珍影：1950年於導明學校前廊盛大接待中國總領事」',
    chips_th: ["🏀 ทีมบาสเกตบอลชุมชน", "📜 ต้อนรับกงสุลจีน 2493", "🌱 ผลิตบุคลากรคุณภาพ"],
    chips_en: ["🏀 Community Basketball", "📜 Chinese Consul Visit 1950", "🌱 Thousands of Alumni"],
    chips_zh: ["🏀 導明熱血籃球隊", "📜 1950年接待總領事", "🌱 培育千百傑出校友"]
  },
  "1990": {
    badge_th: "พ.ศ. ๒๕๓๓ - ๒๕๔๗",
    badge_en: "1990 - 2004",
    badge_zh: "1990 - 2004年",
    title_th: "การจัดตั้งมูลนิธิโรงเรียนเต้าหมิง & การส่งมอบกรรมสิทธิ์",
    title_en: "Establishment of Dao Ming Foundation & Ownership Handover",
    title_zh: "成立導明學校基金會 · 地契全數無償移交為公共財產",
    desc_th: "ปี 2533 จดทะเบียนจัดตั้ง 'มูลนิธิโรงเรียนเต้าหมิง ตะกั่วป่า' โดยมีคุณอนันต์ สวาทยานนท์ เป็นประธานคนแรก และในปี 2542 ทายาทผู้ถือครองที่ดิน สค.1 ทั้ง 3 ท่าน ได้ทำสัญญาประนีประนอมยอมความ ส่งมอบกรรมสิทธิ์ที่ดินและอาคารให้แก่มูลนิธิฯ อย่างถูกต้องตามกฎหมาย",
    desc_en: "In 1990, the Dao Ming Foundation was officially incorporated. In 1999, the three trustee families officially transferred 100% legal ownership of the land and schoolhouse to the foundation for public benefit.",
    desc_zh: "1990年依法註冊成立「德古巴導明學校基金會」，由阿南·沙瓦塔亞農先生出任首屆主席。1999年，原代持地契之三大家族後人秉持先賢奉獻精神，簽署和解協議，將地皮與整座校舍之100%合法產權無償移交基金會，成為德古巴永久公共遺產。",
    photo: "/img/อาคารกับชุมชน.jpg",
    caption_th: '"ภาพถ่ายอาคารเต้าหมิงคู่กับต้นจามจุรีใหญ่ใจกลางย่านเมืองเก่า"',
    caption_en: '"Dao Ming schoolhouse standing gracefully alongside the ancient rain trees of Takua Pa"',
    caption_zh: '「校舍與大雨樹：百年老校與老城老樹相伴相生之靜謐畫面」',
    chips_th: ["⚖️ ส่งมอบกรรมสิทธิ์ 100%", "🏛️ ก่อตั้งมูลนิธิฯ 2533", "🌿 อนุรักษ์มรดกชุมชน"],
    chips_en: ["⚖️ 100% Land Handover", "🏛️ Foundation Est. 1990", "🌿 Heritage Preservation"],
    chips_zh: ["⚖️ 100%產權無償移交", "🏛️ 1990年成立基金會", "🌿 守護公眾文化資產"]
  },
  "2026": {
    badge_th: "พ.ศ. ๒๕๖๙ (ปัจจุบัน)",
    badge_en: "2026 (Present Day)",
    badge_zh: "2026年 (當代新生)",
    title_th: "บริบทใหม่ในเมืองตะกั่วป่า & รางวัลอนุรักษ์สถาปัตยกรรม ASA ๒๕๖๙",
    title_en: "A New Context in Takua Pa & ASA Conservation Award 2026",
    title_zh: "老城新生語境 · 榮獲2026年泰國暹羅建築師協會國家保護大獎",
    desc_th: "ได้รับ 'รางวัลอนุรักษ์ศิลปสถาปัตยกรรม ประจำปี ๒๕๖๙' จากสมาคมสถาปนิกสยามฯ มุ่งพัฒนาพื้นที่ชั้นล่างเป็น Creative Living Space, ศูนย์เรียนรู้มรดกชุมชน, คราฟต์สตูดิโอ และคาเฟ่ โดยชั้นบนยังคงเป็นพื้นที่ปฏิบัติธรรมอันสงบเงียบ",
    desc_en: "Awarded the National Architectural Conservation Award 2026 by ASA. Ground floors transformed into a living creative space, craft studios, and community cafe, with top floors preserved as a peaceful meditation sanctuary.",
    desc_zh: "榮膺泰國暹羅建築師協會（ASA）「2026年度傑出建築保護大獎」。底層精心規劃為文創新空間、口述歷史展覽館、手作工坊與社區茶飲咖啡館；二樓則保留為清幽靜謐的禪修與交流聖所。",
    photo: "/img/อาคารปัจจุบัน.jpg",
    caption_th: '"อาคารเต้าหมิงหลังการอนุรักษ์ ได้รับรางวัลอนุรักษ์ศิลปสถาปัตยกรรม ประจำปี ๒๕๖๙"',
    caption_en: '"Revitalized Dao Ming Schoolhouse, recipient of the ASA Conservation Award 2026"',
    caption_zh: '「活化後的導明學校：榮獲2026年國家級建築保護殊榮」',
    chips_th: ["🏆 รางวัลอนุรักษ์ ASA 2569", "🎨 Creative Living Space", "☕ คาเฟ่ & ชุมชน"],
    chips_en: ["🏆 ASA Conservation Award", "🎨 Creative Living Space", "☕ Community Cafe"],
    chips_zh: ["🏆 榮獲ASA國家保護獎", "🎨 活態文創生活空間", "☕ 在地茶飲與社區對話"]
  }
};

const YEARS = ["1905", "1950", "1990", "2026"] as const;

export function TimelineSection() {
  const { lang, setAudioGuideOpen } = useApp();
  const [activeYear, setActiveYear] = useState<(typeof YEARS)[number]>("1905");

  const isEn = lang === 'en';
  const isZh = lang === 'zh';
  const data = TIMELINE_DATA[activeYear];
  const activeIndex = YEARS.indexOf(activeYear);

  return (
    <section className="section section-story" id="story">
      <div className="container">
        <div className="section-heading text-center">
          <div className="section-tag">AUTHENTIC HISTORY & FOUNDATION</div>
          <h2 className="section-title">
            {isZh ? "導明學校百年歷史淵源" : isEn ? "Authentic History of Dao Ming School" : 'ประวัติศาสตร์ความเป็นมา "โรงเรียนเต้าหมิง"'}
          </h2>
          <p className="section-subtitle">
            {isZh
              ? "從攀牙府開山華文學校，到今日老城活態文化地標與榮獲國家建築保護大獎之百年殿堂"
              : isEn 
                ? "From Phang Nga's pioneering Chinese academy to living architectural heritage and civic symbol of Takua Pa"
                : "จากโรงเรียนจีนแห่งแรกของจังหวัดพังงา สู่มรดกทางสถาปัตยกรรมและจิตวิญญาณแห่งความสามัคคีของชุมชน"}
          </p>
        </div>

        {/* 3 Core Narrative Fact Cards */}
        <div className="story-narrative-grid">
          <div className="narrative-card">
            <div className="card-icon-box">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>
            </div>
            <h3>
              {isZh ? "一、從「卓明」到「導明」(1905-1920)" : isEn ? "1. Origins of Toh Beng to Dao Ming (1905-1920)" : "๑. กำเนิด \"โต๊ะเบ๋ง\" สู่ \"เต้าหมิง\" (พ.ศ. ๒๔๔๘ - ๒๔๖๓)"}
            </h3>
            <p>
              {isZh ? (
                <>1905年以閩南語<strong>「卓明（โต๊ะเบ๋ง）」</strong>之名創設，1920年正式更名為<strong>「導明（Dao Ming）」</strong>並註冊立案。<em>「導」</em>意為引領開拓，<em>「明」</em>意為光輝明哲，合之象徵<strong>「導引光明、啟迪智慧之路」</strong>。</>
              ) : isEn ? (
                <>Founded informally in 1905 as <strong>“Toh Beng”</strong> in Hokkien dialect, before transitioning to Mandarin <strong>“Dao Ming” (導明)</strong> and registered in 1920. <em>Dao</em> means path/guidance, <em>Ming</em> means bright illumination, symbolizing <strong>"The Path to Illuminating Wisdom"</strong>.</>
              ) : (
                <>ก่อตั้งอย่างไม่เป็นทางการในปี 2448 เดิมใช้ชื่อสำเนียงฮกเกี้ยนว่า <strong>“โต๊ะเบ๋ง”</strong> ก่อนเปลี่ยนเป็น <strong>“เต้าหมิง” (導明)</strong> สำเนียงจีนกลาง และจดทะเบียนเป็นโรงเรียนราษฎร์ในปี 2463 คำว่า <em>เต้า</em> หมายถึง ทาง/ชี้นำ, <em>หมิง</em> หมายถึง แสงสว่าง/ความเข้าใจ รวมกันคือ <strong>"เส้นทางสู่แสงสว่างแห่งปัญญา"</strong></>
              )}
            </p>
          </div>

          <div className="narrative-card">
            <div className="card-icon-box">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
            </div>
            <h3>
              {isZh ? "二、紅毛樓建築與包師傅 (1922)" : isEn ? "2. Ang Mor Lao Architecture & Master Pao (1922)" : "๒. สถาปัตยกรรมอั้งม่อเหลา & ช่างผาว (พ.ศ. ๒๔๖๕)"}
            </h3>
            <p>
              {isZh ? (
                <>現存校舍建於1922年，由閩南名匠<strong>包師傅（ช่างผาว）</strong>精心構築，由德古巴、拉廊、普吉礦商共同籌資。建築採中西合璧「紅毛樓（Ang Mor Lao）」殖民樣式，運用早期鋼筋混凝土、雙層外廊及希臘柱頭，宏偉端莊。</>
              ) : isEn ? (
                <>Constructed in 1922 by Hokkien master builder <strong>Master Pao</strong>, funded through collective donations from tin miners across Takua Pa, Ranong, and Phuket. Features Sino-Colonial Ang Mor Lao architecture with early reinforced concrete, Greek order capitals, and perimeter verandas.</>
              ) : (
                <>อาคารหลังปัจจุบัน (หลังที่ 2) สร้างเมื่อปี 2465 โดย <strong>"นายผาว"</strong> ช่างฝีมือชาวจีนฮกเกี้ยน ทุนทรัพย์จากการลงขันของพ่อค้าเหมืองแร่ในตะกั่วป่า ระนอง และภูเก็ต อาคารเป็นรูปแบบอั้งม่อเหลาประยุกต์โคโลเนียล ใช้คอนกรีตเสริมเหล็กยุคแรก ผนังก่ออิฐ มุขยื่น 2 ชั้น ระเบียงรอบ และประดับหัวเสาแบบกรีก</>
              )}
            </p>
          </div>

          <div className="narrative-card">
            <div className="card-icon-box">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
            </div>
            <h3>
              {isZh ? "三、公共信託與基金會全額產權移交" : isEn ? "3. Public Trust & 100% Foundation Handover" : "๓. โครงสร้างที่ดิน & มูลนิธิเพื่อสาธารณะ"}
            </h3>
            <p>
              {isZh ? (
                <>地皮由早期多個華商家族合資購得並信託託管。1990年成立<strong>「導明學校基金會」</strong>，1999年三大家族後人正式簽署協議，將地皮與校舍100%產權全額無償移交基金會，永續回饋德古巴社區。</>
              ) : isEn ? (
                <>The land was collectively purchased by Chinese mining families held in trust. In 1990, the <strong>Dao Ming Foundation</strong> was founded, and in 1999 the 3 trustee families officially transferred 100% full legal title of land and schoolhouse to the foundation for permanent public benefit.</>
              ) : (
                <>ที่ดินเกิดจากการร่วมซื้อของชาวจีนหลายครอบครัว ถือครอง สค.1 ในนามคนไทย 3 คน เพื่อเป็น <strong>"มรดกของลูกหลานตะกั่วป่า"</strong> ในปี 2533 ได้จัดตั้ง <strong>"มูลนิธิโรงเรียนเต้าหมิง ตะกั่วป่า"</strong> และในปี 2542 ทายาททั้ง 3 ท่านได้ส่งมอบกรรมสิทธิ์ที่ดินและอาคารให้แก่มูลนิธิฯ อย่างสมบูรณ์ 100%</>
              )}
            </p>
          </div>
        </div>

        {/* Interactive History Timeline */}
        <div className="timeline-container">
          <div className="timeline-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
            <div>
              <h3>{isZh ? "導明學校120年編年史 (120-Year Milestones)" : isEn ? "120-Year Chronological Milestones" : "ลำดับกาลเวลา ๑๒๐ ปี เต้าหมิง (Chronological Milestones)"}</h3>
              <p>{isZh ? "點選各個時期，探索歷史文獻與珍貴原照" : isEn ? "Click through each era to study historical milestones and photographic evidence" : "คลิกเลือกยุคสมัยเพื่อศึกษาประวัติศาสตร์และหลักฐานที่บันทึกไว้"}</p>
            </div>
            <button
              className="btn btn-outline-sm"
              onClick={() => setAudioGuideOpen(true)}
              style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}
            >
              <span>🎧</span>
              <span>{isZh ? "收聽歷史口述原音導覽 (Audio Guide)" : isEn ? "Listen to Oral History Guide" : "ฟังเสียงบันทึกคำบอกเล่า (Audio Guide)"}</span>
            </button>
          </div>

          <div className="timeline-nav" id="timelineNav">
            <button className={`timeline-btn ${activeYear === '1905' ? 'active' : ''}`} onClick={() => setActiveYear('1905')}>
              <span className="tl-year">1905 - 1922</span>
              <span className="tl-label">{isZh ? "卓明創校 & 包師傅" : isEn ? "Toh Beng & Master Pao" : "โต๊ะเบ๋งสู่เต้าหมิง & ช่างผาว"}</span>
            </button>
            <button className={`timeline-btn ${activeYear === '1950' ? 'active' : ''}`} onClick={() => setActiveYear('1950')}>
              <span className="tl-year">1937 - 1967</span>
              <span className="tl-label">{isZh ? "教育黃金期 & 接待總領事" : isEn ? "Community Hub & Diplomacy" : "ศูนย์กลางชุมชน & รับรองกงสุล"}</span>
            </button>
            <button className={`timeline-btn ${activeYear === '1990' ? 'active' : ''}`} onClick={() => setActiveYear('1990')}>
              <span className="tl-year">1990 - 2004</span>
              <span className="tl-label">{isZh ? "成立基金會 & 產權移交" : isEn ? "Foundation & Conservation" : "จัดตั้งมูลนิธิฯ & บูรณะอาคาร"}</span>
            </button>
            <button className={`timeline-btn ${activeYear === '2026' ? 'active' : ''}`} onClick={() => setActiveYear('2026')}>
              <span className="tl-year">{isZh ? "當代 & ASA大獎" : isEn ? "Present & ASA" : "ปัจจุบัน & รางวัล ASA"}</span>
              <span className="tl-label">{isZh ? "老城新生語境" : isEn ? "Living Heritage Context" : "บริบทใหม่ & มรดกที่มีชีวิต"}</span>
            </button>
          </div>

          <div className="timeline-content-box" id="timelineContent">
            <div className="tl-detail-grid">
              <div className="tl-text">
                <span className="tl-badge-year" id="tlBadgeYear">{isZh ? data.badge_zh : isEn ? data.badge_en : data.badge_th}</span>
                <h4 id="tlTitle">{isZh ? data.title_zh : isEn ? data.title_en : data.title_th}</h4>
                <p id="tlDesc">{isZh ? data.desc_zh : isEn ? data.desc_en : data.desc_th}</p>
                <div className="tl-meta-chips" id="tlChips">
                  {(isZh ? data.chips_zh : isEn ? data.chips_en : data.chips_th).map((c, i) => (
                    <span key={i} className="chip">{c}</span>
                  ))}
                </div>
              </div>
              <div className="tl-photo-card">
                <div className="photo-real-card">
                  <img src={data.photo} alt={isZh ? data.title_zh : isEn ? data.title_en : data.title_th} className="timeline-illustration-img" id="tlPhotoImg" />
                  <div className="photo-caption-inner" id="tlPhotoCaption">
                    {isZh ? data.caption_zh : isEn ? data.caption_en : data.caption_th}
                  </div>
                </div>
              </div>
            </div>

            {/* Step Nav Bar */}
            <div className="tl-step-nav-bar">
              <button
                className="tl-step-btn tl-step-prev"
                disabled={activeIndex === 0}
                onClick={() => setActiveYear(YEARS[Math.max(0, activeIndex - 1)])}
              >
                <span className="tl-step-arrow">←</span>
                <span className="tl-step-text">{isZh ? "上一時期" : isEn ? "Previous Era" : "ยุคก่อนหน้า"}</span>
              </button>

              <div className="tl-step-dots">
                {YEARS.map(y => (
                  <button
                    key={y}
                    className={`tl-dot ${activeYear === y ? 'active' : ''}`}
                    onClick={() => setActiveYear(y)}
                    aria-label={`Year ${y}`}
                  />
                ))}
              </div>

              <button
                className="tl-step-btn tl-step-next"
                disabled={activeIndex === YEARS.length - 1}
                onClick={() => setActiveYear(YEARS[Math.min(YEARS.length - 1, activeIndex + 1)])}
              >
                <span className="tl-step-text">{isZh ? "下一時期" : isEn ? "Next Era" : "ยุคถัดไป"}</span>
                <span className="tl-step-arrow">→</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
