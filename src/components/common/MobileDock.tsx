'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import { useApp } from '@/lib/store';

export function MobileDock() {
  const pathname = usePathname();
  const { t } = useApp();

  // Hide mobile dock on admin portal
  if (pathname && pathname.startsWith('/admin')) {
    return null;
  }

  return (
    <nav
      className="mobile-action-dock"
      aria-label="Mobile Quick Action Dock"
    >
      <a
        href="https://maps.google.com/?q=8.833573397970662,98.36506109469767"
        target="_blank"
        rel="noopener noreferrer"
        className="dock-btn"
        id="dockMapBtn"
        title="เปิดแผนที่ Google Maps"
      >
        <span className="dock-icon">📍</span>
        <span className="dock-label">{t('dock_maps')}</span>
      </a>

      <a
        href="#events"
        className="dock-btn"
        id="dockEventsBtn"
        title="ปฏิทินกิจกรรม"
      >
        <span className="dock-icon">📅</span>
        <span className="dock-label">{t('dock_events')}</span>
      </a>

      <a
        href="#ideas"
        className="dock-btn"
        id="dockIdeasBtn"
        title="ร่วมออกไอเดีย"
      >
        <span className="dock-icon">💬</span>
        <span className="dock-label">{t('dock_ideas')}</span>
      </a>

      <a
        href="#booking"
        className="dock-btn dock-btn-highlight"
        id="dockBookBtn"
        title="ขอใช้พื้นที่"
      >
        <span className="dock-icon">🏛️</span>
        <span className="dock-label">{t('dock_book')}</span>
      </a>
    </nav>
  );
}
