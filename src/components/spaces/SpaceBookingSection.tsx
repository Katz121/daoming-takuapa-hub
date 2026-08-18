'use client';

import React, { useState } from 'react';
import { useApp } from '@/lib/store';
import { clientDb } from '@/lib/clientDb';

export function SpaceBookingSection() {
  const { lang, t, showToast } = useApp();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [zone, setZone] = useState('hall');
  const [date, setDate] = useState('');
  const [attendees, setAttendees] = useState('21 - 50');
  const [desc, setDesc] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isEn = lang === 'en';
  const isZh = lang === 'zh';

  const zoneNameMap: Record<string, { th: string; en: string; zh: string }> = {
    hall: { th: 'โถงอาคารไม้ประวัติศาสตร์ (Zone A)', en: 'Heritage Hall (Zone A)', zh: '百年木質主展廳 (A區)' },
    courtyard: { th: 'ลานกลางแจ้งเต้าหมิง (Zone B)', en: 'Dao Ming Courtyard (Zone B)', zh: '導明戶外文化廣場 (B區)' },
    studio: { th: 'สตูดิโอเวิร์กช็อป (Zone C)', en: 'Craft Studio (Zone C)', zh: '文創手作工坊 (C區)' },
    cafe: { th: 'คาเฟ่ & พื้นที่นั่งทำงาน (Zone D)', en: 'Community Cafe & Lounge (Zone D)', zh: '社區茶座與交流空間 (D區)' },
    all: { th: 'เหมารวมทั้งพื้นที่ (All Zones)', en: 'All Zones Entire Facility', zh: '全區場地整合包場 (All Zones)' }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const selectedZoneInfo = zoneNameMap[zone] || zoneNameMap.hall;
      await clientDb.createBooking({
        event_id: zone,
        event_title: selectedZoneInfo.th,
        event_title_en: selectedZoneInfo.en,
        guest_name: name,
        guest_phone: phone,
        guest_email: email,
        seats: parseInt(attendees) || 20,
        tea_blend: `[วันที่: ${date}] ${desc}`,
        pastry_type: `จำนวนผู้เข้าร่วม: ${attendees}`
      });

      showToast(
        isZh
          ? `已成功為 ${name} 提交場地申請！導明基金會團隊將在24小時內與您聯絡。`
          : isEn
            ? `Proposal submitted for ${name}! Our foundation team will contact you within 24 hours.`
            : `ส่งคำขอจองพื้นที่สำเร็จสำหรับ ${name}! ทีมงานมูลนิธิเต้าหมิงจะติดต่อกลับภายใน 24 ชม.`
      );
      setName('');
      setPhone('');
      setEmail('');
      setDate('');
      setDesc('');
    } catch (err: any) {
      showToast(`Error: ${err.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="section section-booking" id="booking">
      <div className="container">
        <div className="booking-wrapper">
          <div className="booking-info-pane">
            <div className="section-tag">SPACE PROPOSAL</div>
            <h2 className="booking-title">
              {isZh ? "活動場地預約 / 展覽合作申請" : isEn ? "Space Proposal & Event Booking" : "ขอใช้พื้นที่จัดกิจกรรม / แสดงงาน"}
            </h2>
            <p className="booking-desc">
              {isZh
                ? "無論您是藝術家、文史社團、教育工作者、學生團隊或文創業者，導明學校熱忱歡迎各類賦予老城活力與文化價值的精彩企劃。"
                : isEn
                  ? "Whether you are an artist, community club, educator, student, or creative entrepreneur, Dao Ming School warmly welcomes all proposals that enrich Takua Pa."
                  : "ไม่ว่าคุณจะเป็นศิลปิน, สมาคมชุมชน, ครูอาจารย์, นักศึกษา หรือกลุ่มคนที่มีไอเดียสร้างสรรค์ โรงเรียนเต้าหมิงยินดีต้อนรับทุกข้อเสนอโครงการที่ช่วยสร้างประโยชน์และคุณค่าให้เมืองตะกั่วป่า"}
            </p>

            <div className="booking-perks-list">
              <div className="perk-item">
                <span className="perk-icon">✓</span>
                <div>
                  <strong>{isZh ? "社區與文化公益活動專案支持" : isEn ? "Community & Cultural Event Support" : "สนับสนุนพื้นที่กิจกรรมเชิงชุมชนและวัฒนธรรม"}</strong>
                  <p>{isZh ? "針對文教、地方歷史與社區公益專案，提供優惠場租或免費場地支持" : isEn ? "Special subsidized rates and complimentary spaces for public educational and cultural initiatives" : "มีอัตราพิเศษและพื้นที่สนับสนุนฟรีสำหรับโครงการเพื่อการศึกษาและชุมชน"}</p>
                </div>
              </div>
              <div className="perk-item">
                <span className="perk-icon">✓</span>
                <div>
                  <strong>{isZh ? "完善設施設備與在地協作" : isEn ? "Full Facilities & Amenities" : "สิ่งอำนวยความสะดวกครบครัน"}</strong>
                  <p>{isZh ? "提供基礎燈光、音響、復古實木桌椅，並有在地專屬團隊協助現場協調" : isEn ? "Lighting, sound systems, vintage timber seating, and local on-site coordination" : "ระบบไฟ เครื่องเสียงพื้นฐาน โต๊ะเก้าอี้ไม้ และทีมงานประสานงานในพื้นที่"}</p>
                </div>
              </div>
              <div className="perk-item">
                <span className="perk-icon">✓</span>
                <div>
                  <strong>{isZh ? "老城文化網絡宣傳推廣" : isEn ? "Media & Network Promotion" : "ช่วยประชาสัมพันธ์ผ่านช่องทางสื่อ"}</strong>
                  <p>{isZh ? "透過德古巴老街文旅網絡與官方數位社群平台協助活動推廣" : isEn ? "Promotion across Takua Pa Old Town cultural network and online media channels" : "โปรโมตผ่านเครือข่ายเมืองเก่าตะกั่วป่าและสื่อออนไลน์"}</p>
                </div>
              </div>
            </div>

            <div className="contact-direct-box">
              <span>{isZh ? "📞 即時聯絡 / 檔期諮詢：" : isEn ? "📞 Direct Contact / Inquiries:" : "📞 ติดต่อด่วน / สอบถามคิวงาน:"}</span>
              <strong>076-471-XXX / contact@daoming-takuapa.org</strong>
            </div>
          </div>

          <div className="booking-form-pane">
            <form onSubmit={handleSubmit} id="spaceBookingForm">
              <h3>{isZh ? "場地使用申請表" : isEn ? "Space Reservation Form" : "แบบฟอร์มขอใช้พื้นที่"}</h3>
              <p className="form-sub">{isZh ? "填寫基本活動資訊，團隊將於24小時內與您接洽。" : isEn ? "Fill out initial details, our team will get in touch within 24 hours." : "กรอกข้อมูลเบื้องต้น ทีมงานจะติดต่อกลับภายใน 24 ชม."}</p>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="bookName">{isZh ? "聯絡人姓名 / 組織機構 *" : isEn ? "Contact Name / Organization *" : "ชื่อผู้ติดต่อ / องค์กร *"}</label>
                  <input
                    type="text"
                    id="bookName"
                    placeholder={isZh ? "例如：攀牙藝術協會 / 陳明志" : isEn ? "e.g., Phang Nga Arts Club / Somchai" : "เช่น ชมรมศิลปะพังงา / สมชาย"}
                    value={name}
                    onChange={e => setName(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="bookPhone">{isZh ? "聯絡電話 *" : isEn ? "Phone Number *" : "เบอร์โทรศัพท์ *"}</label>
                  <input
                    type="tel"
                    id="bookPhone"
                    placeholder="08X-XXX-XXXX"
                    value={phone}
                    onChange={e => setPhone(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="bookEmail">{isZh ? "電子郵箱" : isEn ? "Email Address" : "อีเมล"}</label>
                  <input
                    type="email"
                    id="bookEmail"
                    placeholder="name@example.com"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="bookZone">{isZh ? "選擇預約區域 *" : isEn ? "Select Zone *" : "เลือกโซนที่ต้องการใช้งาน *"}</label>
                  <select id="bookZone" value={zone} onChange={e => setZone(e.target.value)} required>
                    <option value="hall">{isZh ? "百年木質主展廳 (A區)" : isEn ? "Heritage Hall (Zone A)" : "โถงอาคารไม้ประวัติศาสตร์ (Zone A)"}</option>
                    <option value="courtyard">{isZh ? "導明戶外文化廣場 (B區)" : isEn ? "Dao Ming Courtyard (Zone B)" : "ลานกลางแจ้งเต้าหมิง (Zone B)"}</option>
                    <option value="studio">{isZh ? "文創手作工坊 (C區)" : isEn ? "Craft Studio (Zone C)" : "สตูดิโอเวิร์กช็อป (Zone C)"}</option>
                    <option value="cafe">{isZh ? "社區茶座與交流空間 (D區)" : isEn ? "Community Cafe & Lounge (Zone D)" : "คาเฟ่ & พื้นที่นั่งทำงาน (Zone D)"}</option>
                    <option value="all">{isZh ? "全區場地整合包場 (All Zones)" : isEn ? "All Zones Entire Facility" : "เหมารวมทั้งพื้นที่ (All Zones)"}</option>
                  </select>
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="bookDate">{isZh ? "預期活動日期 *" : isEn ? "Desired Date *" : "วันที่ต้องการจัดงาน *"}</label>
                  <input
                    type="date"
                    id="bookDate"
                    value={date}
                    onChange={e => setDate(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="bookAttendees">{isZh ? "預估參與人數 *" : isEn ? "Estimated Attendees *" : "จำนวนผู้เข้าร่วมโดยประมาณ *"}</label>
                  <select id="bookAttendees" value={attendees} onChange={e => setAttendees(e.target.value)} required>
                    <option value="1 - 20">1 - 20 {isZh ? "人" : isEn ? "pax" : "คน"}</option>
                    <option value="21 - 50">21 - 50 {isZh ? "人" : isEn ? "pax" : "คน"}</option>
                    <option value="51 - 100">51 - 100 {isZh ? "人" : isEn ? "pax" : "คน"}</option>
                    <option value="100+">{isZh ? "100 人以上" : isEn ? "100+ pax" : "มากกว่า 100 คน"}</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="bookEventName">{isZh ? "活動名稱與概要說明 *" : isEn ? "Event Summary & Purpose *" : "ชื่อกิจกรรม & วัตถุประสงค์สั้นๆ *"}</label>
                <textarea
                  id="bookEventName"
                  rows={3}
                  placeholder={isZh ? "例如：舉辦為期3天的攝影作品展、青年社區工藝教學..." : isEn ? "e.g., 3-day Photography Exhibition, Youth Workshop..." : "อธิบายรูปแบบงาน เช่น จัดนิทรรศการภาพถ่าย 3 วัน, จัดเวิร์กช็อปสอนเยาวชน..."}
                  value={desc}
                  onChange={e => setDesc(e.target.value)}
                  required
                />
              </div>

              <button type="submit" className="btn btn-primary btn-block" disabled={isSubmitting}>
                <span>{isSubmitting ? (isZh ? "正在提交中..." : isEn ? "Submitting..." : "กำลังส่งข้อมูล...") : (isZh ? "提交場地申請" : isEn ? "Submit Space Request" : "ส่งคำขอจองพื้นที่")}</span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
