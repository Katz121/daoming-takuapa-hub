'use client';

import React, { useState } from 'react';
import { usePathname } from 'next/navigation';
import { useApp } from '@/lib/store';

export function Header() {
  const pathname = usePathname();
  const { lang, setLang, t } = useApp();
  const [isDrawerOpen, setDrawerOpen] = useState(false);

  // Hide landing header on admin portal
  if (pathname && pathname.startsWith('/admin')) {
    return null;
  }

  return (
    <>
      <header className="site-header" id="siteHeader">
        <div className="header-container">
          <a href="#hero" className="brand-logo">
            <img src="/assets/logo-305.jpg" alt="โลโก้โรงเรียนเต้าหมิง" className="brand-logo-img" />
            <div className="brand-text">
              <span className="brand-title">{t('brand_title')}</span>
              <span className="brand-sub">{t('brand_sub')}</span>
            </div>
          </a>

          {/* Desktop Nav */}
          <nav className="main-nav" id="mainNav">
            <a href="#story" className="nav-link">{t('nav_story')}</a>
            <a href="#gable" className="nav-link">{t('nav_gable')}</a>
            <a href="#archive" className="nav-link">{t('nav_archive')}</a>
            <a href="#vision" className="nav-link">{t('nav_vision')}</a>
            <a href="#spaces" className="nav-link">{t('nav_spaces')}</a>
            <a href="#events" className="nav-link">{t('nav_events')}</a>
            <a href="#ideas" className="nav-link">{t('nav_ideas')}</a>
            <a href="#visit" className="nav-link">{t('nav_visit')}</a>
          </nav>

          {/* Action Area */}
          <div className="header-actions">
            <button
              className="btn btn-outline-sm"
              id="langToggleBtn"
              title="สลับภาษา / Switch Language / 切换语言"
              onClick={() => {
                const nextLang = lang === 'th' ? 'en' : lang === 'en' ? 'zh' : 'th';
                setLang(nextLang);
              }}
            >
              <span className={`lang-code ${lang === 'th' ? 'active-lang' : ''}`}>TH</span> / <span className={`lang-code ${lang === 'en' ? 'active-lang' : ''}`}>EN</span> / <span className={`lang-code ${lang === 'zh' ? 'active-lang' : ''}`}>中文</span>
            </button>
            <a href="#booking" className="btn btn-primary-sm" id="openBookingHeaderBtn">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
              <span>{t('btn_book_space')}</span>
            </a>
            <button
              className={`mobile-toggle ${isDrawerOpen ? 'active' : ''}`}
              id="mobileMenuToggle"
              aria-label="เปิดเมนู"
              onClick={() => setDrawerOpen(!isDrawerOpen)}
            >
              <span></span><span></span><span></span>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      <div
        className={`drawer-backdrop ${isDrawerOpen ? 'open' : ''}`}
        id="drawerBackdrop"
        onClick={() => setDrawerOpen(false)}
      />
      <div className={`mobile-drawer ${isDrawerOpen ? 'open' : ''}`} id="mobileDrawer">
        <div className="drawer-header">
          <div className="brand-logo">
            <img src="/assets/logo-305.jpg" alt="โลโก้โรงเรียนเต้าหมิง" className="brand-logo-img" />
            <div className="brand-text">
              <span className="brand-title">{t('brand_title')}</span>
              <span className="brand-sub">DAO MING CREATIVE HUB</span>
            </div>
          </div>
          <button className="close-drawer-btn" id="closeDrawerBtn" onClick={() => setDrawerOpen(false)}>&times;</button>
        </div>
        <nav className="mobile-nav-links">
          <a href="#story" className="m-link" onClick={() => setDrawerOpen(false)}>๑. ประวัติศาสตร์ & สถาปัตยกรรม</a>
          <a href="#gable" className="m-link" onClick={() => setDrawerOpen(false)}>๒. ปรัชญาหน้าจั่วจำลองจักรวาล</a>
          <a href="#archive" className="m-link" onClick={() => setDrawerOpen(false)}>๓. คลังภาพเก่า (Living Archive)</a>
          <a href="#vision" className="m-link" onClick={() => setDrawerOpen(false)}>๔. วิสัยทัศน์พื้นที่สร้างสรรค์</a>
          <a href="#spaces" className="m-link" onClick={() => setDrawerOpen(false)}>๕. แผนผัง & โซนพื้นที่</a>
          <a href="#events" className="m-link" onClick={() => setDrawerOpen(false)}>๖. ปฏิทินกิจกรรม</a>
          <a href="#ideas" className="m-link" onClick={() => setDrawerOpen(false)}>๗. ร่วมออกไอเดีย (Idea Wall)</a>
          <a href="#booking" className="m-link" onClick={() => setDrawerOpen(false)}>๘. ขอใช้พื้นที่จัดงาน</a>
          <a href="#visit" className="m-link" onClick={() => setDrawerOpen(false)}>๙. การเดินทาง & แผนที่</a>
        </nav>
        <div className="drawer-footer">
          <a href="#booking" className="btn btn-primary btn-block" onClick={() => setDrawerOpen(false)}>ขอใช้พื้นที่จัดกิจกรรม</a>
        </div>
      </div>
    </>
  );
}
