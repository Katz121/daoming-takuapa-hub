'use client';

import React from 'react';
import { useApp } from '@/lib/store';
import { EventItem } from '@/types';

interface EventDetailModalProps {
  event: EventItem | null;
  onClose: () => void;
  onAction: (ev: EventItem) => void;
}

export function EventDetailModal({ event, onClose, onAction }: EventDetailModalProps) {
  const { lang } = useApp();

  if (!event) return null;

  const isEn = lang === 'en';
  const isZh = lang === 'zh';

  const title = isZh ? event.title_zh : isEn ? event.title_en : event.title_th;
  const tag = isZh ? event.tag_zh : isEn ? event.tag_en : event.tag_th;
  const day = isZh ? event.day_zh : isEn ? event.day_en : event.day_th;
  const month = isZh ? event.month_zh : isEn ? event.month_en : event.month_th;
  const loc = isZh ? event.loc_zh : isEn ? event.loc_en : event.loc_th;
  const time = isZh ? event.time_zh : isEn ? event.time_en : event.time_th;
  const cap = isZh ? event.cap_zh : isEn ? event.cap_en : event.cap_th;
  const price = isZh ? event.price_zh : isEn ? event.price_en : event.price_th;
  const detailedDesc = isZh ? (event.detailed_desc_zh || event.snippet_zh) : isEn ? (event.detailed_desc_en || event.snippet_en) : (event.detailed_desc_th || event.snippet_th);
  const highlights = isZh ? event.highlights_zh : isEn ? event.highlights_en : event.highlights_th;
  const schedule = isZh ? event.schedule_zh : isEn ? event.schedule_en : event.schedule_th;
  const instructor = isZh ? event.instructor_zh : isEn ? event.instructor_en : event.instructor_th;

  let actionBtnText = isZh ? "立即報名參與" : isEn ? "Register for Event" : "ลงทะเบียนร่วมกิจกรรม";
  if (event.btnType === 'tea_simulator') {
    actionBtnText = isZh ? "🍵 體驗茶席並預約座席" : isEn ? "🍵 Try Tea Simulator & RSVP" : "🍵 จำลองจิบชา & สำรองที่นั่ง";
  } else if (event.btnType === 'reserve') {
    actionBtnText = isZh ? "🎟️ 立即預約席位" : isEn ? "🎟️ Reserve Your Seat" : "🎟️ สำรองที่นั่งล่วงหน้า";
  } else if (event.btnType === 'shops') {
    actionBtnText = isZh ? "📍 查看交通地圖" : isEn ? "📍 Get Map Directions" : "📍 ดูแผนที่การเดินทาง";
  } else if (event.btnType === 'details') {
    actionBtnText = isZh ? "🏛️ สำรวจโซน A (โถงอาคาร)" : isEn ? "🏛️ Explore Heritage Hall" : "🏛️ สำรวจโซน A (โถงอาคาร)";
  }

  const tagClass = event.category === 'workshop'
    ? 'workshop-tag'
    : event.category === 'exhibition'
    ? 'exh-tag'
    : event.category === 'market'
    ? 'market-tag'
    : 'talk-tag';

  return (
    <div className="event-detail-modal open" id="eventDetailModal">
      <div className="event-modal-backdrop" onClick={onClose}></div>

      <div className="event-modal-dialog">
        {/* Header Hero Image */}
        <div className="event-modal-hero">
          <img src={event.image} alt={title} className="event-modal-hero-img" />
          <div className="event-modal-hero-overlay"></div>
          <button className="event-modal-close-btn" onClick={onClose} aria-label="Close">&times;</button>
          
          <div className="event-modal-badges-row">
            <span className={`event-header-tag ${tagClass}`}>{tag}</span>
            <div className="event-modal-date-pill">
              <strong>{day}</strong> <span>{month}</span>
            </div>
          </div>
        </div>

        {/* Modal Content Body */}
        <div className="event-modal-content-body">
          <h2 className="event-modal-title">{title}</h2>

          {/* Quick Meta Grid */}
          <div className="event-modal-meta-grid">
            <div className="meta-box">
              <span className="meta-icon">📍</span>
              <div>
                <strong>{isZh ? "活動地點" : isEn ? "Location" : "สถานที่จัดงาน"}</strong>
                <p>{loc}</p>
              </div>
            </div>
            <div className="meta-box">
              <span className="meta-icon">⏰</span>
              <div>
                <strong>{isZh ? "活動時間" : isEn ? "Time & Date" : "วันและเวลา"}</strong>
                <p>{time}</p>
              </div>
            </div>
            <div className="meta-box">
              <span className="meta-icon">👥</span>
              <div>
                <strong>{isZh ? "名額限制" : isEn ? "Capacity" : "จำนวนที่นั่ง"}</strong>
                <p>{cap}</p>
              </div>
            </div>
            <div className="meta-box">
              <span className="meta-icon">🎟️</span>
              <div>
                <strong>{isZh ? "費用說明" : isEn ? "Fee" : "ค่าธรรมเนียม"}</strong>
                <p className="price-highlight">{price}</p>
              </div>
            </div>
          </div>

          {/* Detailed Overview */}
          <div className="event-modal-section">
            <h3 className="section-subhead">
              <span>📖</span> {isZh ? "活動深度介紹" : isEn ? "Event Overview & Description" : "รายละเอียดและความเป็นมา"}
            </h3>
            <p className="event-full-desc">{detailedDesc}</p>
          </div>

          {/* Key Highlights */}
          {highlights && highlights.length > 0 && (
            <div className="event-modal-section">
              <h3 className="section-subhead">
                <span>✨</span> {isZh ? "活動亮點與收穫" : isEn ? "Key Highlights & Benefits" : "ไฮไลท์และสิ่งที่คุณจะได้รับ"}
              </h3>
              <ul className="event-highlights-list">
                {highlights.map((hl, idx) => (
                  <li key={idx}>
                    <span className="hl-bullet">✓</span>
                    <span>{hl}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Schedule / Agenda */}
          {schedule && schedule.length > 0 && (
            <div className="event-modal-section">
              <h3 className="section-subhead">
                <span>⏱️</span> {isZh ? "詳細活動時程" : isEn ? "Activity Schedule & Agenda" : "กำหนดการและหัวข้อกิจกรรม"}
              </h3>
              <div className="event-schedule-timeline">
                {schedule.map((item, idx) => (
                  <div key={idx} className="schedule-item">
                    <div className="schedule-time">{item.time}</div>
                    <div className="schedule-dot"></div>
                    <div className="schedule-activity">{item.activity}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Instructor / Speaker Info */}
          {instructor && (
            <div className="event-modal-instructor-box">
              <span className="inst-icon">👤</span>
              <div>
                <strong>{isZh ? "主講導師 / 策展團隊：" : isEn ? "Instructor / Curatorial Team:" : "วิทยากร / คณะผู้จัดงาน:"}</strong>
                <p>{instructor}</p>
              </div>
            </div>
          )}

          {/* Modal Action Footer */}
          <div className="event-modal-footer">
            <button className="btn btn-secondary-sm" onClick={onClose}>
              {isZh ? "返回活動列表" : isEn ? "Back to Events" : "ย้อนกลับ"}
            </button>
            <button
              className="btn btn-primary"
              onClick={() => {
                onClose();
                onAction(event);
              }}
            >
              <span>{actionBtnText}</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
