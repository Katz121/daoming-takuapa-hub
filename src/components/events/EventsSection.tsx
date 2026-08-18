'use client';

import React, { useState } from 'react';
import { useApp } from '@/lib/store';
import { EVENTS_LIST } from '@/data/events';

export function EventsSection() {
  const { lang, t, setTeaModalOpen, showToast } = useApp();
  const [filter, setFilter] = useState<string>('all');

  const isEn = lang === 'en';
  const isZh = lang === 'zh';

  const filteredEvents = filter === 'all'
    ? EVENTS_LIST
    : EVENTS_LIST.filter(ev => ev.category === filter);

  const handleAction = (ev: (typeof EVENTS_LIST)[0]) => {
    if (ev.btnType === 'tea_simulator') {
      setTeaModalOpen(true);
    } else {
      showToast(
        isZh
          ? `已成功為您登記參與「${ev.title_zh || ev.title_en}」！`
          : isEn
            ? `Interest noted for "${ev.title_en}". Registration details confirmed!`
            : `ลงทะเบียนสำเร็จสำหรับกิจกรรม "${ev.title_th}"`
      );
    }
  };

  return (
    <section className="section section-events" id="events">
      <div className="container">
        <div className="section-heading text-center">
          <div className="section-tag">{t('events_tag')}</div>
          <h2 className="section-title">{t('events_title')}</h2>
          <p className="section-subtitle">{t('events_subtitle')}</p>
        </div>

        {/* Filter Buttons */}
        <div className="event-filter-bar">
          <button className={`filter-btn ${filter === 'all' ? 'active' : ''}`} onClick={() => setFilter('all')}>
            {isZh ? "全部 (All)" : isEn ? "All" : "ทั้งหมด (All)"}
          </button>
          <button className={`filter-btn ${filter === 'workshop' ? 'active' : ''}`} onClick={() => setFilter('workshop')}>
            {isZh ? "工作坊 (Workshops)" : isEn ? "Workshops" : "เวิร์กช็อป (Workshops)"}
          </button>
          <button className={`filter-btn ${filter === 'exhibition' ? 'active' : ''}`} onClick={() => setFilter('exhibition')}>
            {isZh ? "歷史特展 (Exhibitions)" : isEn ? "Exhibitions" : "นิทรรศการ (Exhibitions)"}
          </button>
          <button className={`filter-btn ${filter === 'market' ? 'active' : ''}`} onClick={() => setFilter('market')}>
            {isZh ? "市集音樂 (Markets)" : isEn ? "Markets" : "ตลาด & ดนตรี (Markets)"}
          </button>
          <button className={`filter-btn ${filter === 'talk' ? 'active' : ''}`} onClick={() => setFilter('talk')}>
            {isZh ? "專題講座 (Talks)" : isEn ? "Talks" : "เสวนา (Talks)"}
          </button>
        </div>

        {/* Events Grid */}
        <div className="events-grid" id="eventsGrid">
          {filteredEvents.map(ev => {
            const title = isZh ? ev.title_zh : isEn ? ev.title_en : ev.title_th;
            const snippet = isZh ? ev.snippet_zh : isEn ? ev.snippet_en : ev.snippet_th;
            const tag = isZh ? ev.tag_zh : isEn ? ev.tag_en : ev.tag_th;
            const day = isZh ? ev.day_zh : isEn ? ev.day_en : ev.day_th;
            const month = isZh ? ev.month_zh : isEn ? ev.month_en : ev.month_th;
            const loc = isZh ? ev.loc_zh : isEn ? ev.loc_en : ev.loc_th;
            const time = isZh ? ev.time_zh : isEn ? ev.time_en : ev.time_th;
            const cap = isZh ? ev.cap_zh : isEn ? ev.cap_en : ev.cap_th;
            const price = isZh ? ev.price_zh : isEn ? ev.price_en : ev.price_th;

            let btnLabel = isZh ? "立即登記參加" : isEn ? "Register" : "ลงทะเบียนร่วมกิจกรรม";
            if (ev.btnType === 'tea_simulator') btnLabel = isZh ? "🍵 體驗茶席與預約" : isEn ? "🍵 Tea Simulator & RSVP" : "🍵 จำลองจิบชา & สำรองที่นั่ง";
            else if (ev.btnType === 'details') btnLabel = isZh ? "特展詳細資訊" : isEn ? "Details" : "รายละเอียดนิทรรศการ";
            else if (ev.btnType === 'shops') btnLabel = isZh ? "查看攤位與樂團" : isEn ? "View Shops" : "ดูร้านค้าและตารางดนตรี";
            else if (ev.btnType === 'reserve') btnLabel = isZh ? "預約講座座席" : isEn ? "Reserve Seat" : "สำรองที่นั่งล่วงหน้า";

            const tagClass = ev.category === 'workshop'
              ? 'workshop-tag'
              : ev.category === 'exhibition'
              ? 'exh-tag'
              : ev.category === 'market'
              ? 'market-tag'
              : 'talk-tag';

            return (
              <div key={ev.id} className="event-card" data-category={ev.category}>
                <div className="event-card-img-wrap">
                  <img src={ev.image} alt={title} loading="lazy" />
                  <div className={`event-header-tag ${tagClass}`}>{tag}</div>
                </div>
                <div className="event-card-body">
                  <div className="event-date-box">
                    <span className="ev-day">{day}</span>
                    <span className="ev-month">{month}</span>
                  </div>
                  <h3 className="event-title">{title}</h3>
                  <p className="event-snippet">{snippet}</p>
                  <div className="event-meta-info">
                    <span>{loc}</span>
                    <span>{time}</span>
                    <span>{cap}</span>
                  </div>
                  <div className="event-card-footer">
                    <span className={`event-price ${ev.isFree ? 'highlight-free' : ''}`}>{price}</span>
                    <button className="btn btn-outline-sm" onClick={() => handleAction(ev)}>
                      {btnLabel}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
