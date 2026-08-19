'use client';

import React, { useState, useEffect } from 'react';
import { useApp } from '@/lib/store';
import { GABLE_SYMBOLS } from '@/data/gables';

const GABLE_SEALS: Record<string, string> = {
  tiangong: '天',
  cloud: '雲',
  triangle: '角',
  sun12: '日',
  circles: '柱'
};

export function GableExplorer() {
  const { lang, t } = useApp();
  const [activeSymbolId, setActiveSymbolId] = useState<string>('tiangong');
  const [isOverview, setIsOverview] = useState<boolean>(false);
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [animKey, setAnimKey] = useState<number>(0);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isEn = lang === 'en';
  const isZh = lang === 'zh';
  const currentIndex = GABLE_SYMBOLS.findIndex(s => s.id === activeSymbolId);
  const safeIndex = currentIndex >= 0 ? currentIndex : 0;
  const symbol = GABLE_SYMBOLS[safeIndex];

  const handleSelectSymbol = (id: string) => {
    setActiveSymbolId(id);
    setIsOverview(false);
    setAnimKey(prev => prev + 1);
  };

  const handleNavigateStep = (delta: number) => {
    const nextIdx = safeIndex + delta;
    if (nextIdx >= 0 && nextIdx < GABLE_SYMBOLS.length) {
      handleSelectSymbol(GABLE_SYMBOLS[nextIdx].id);
    }
  };

  const getZoomStyle = () => {
    if (isOverview) {
      return {
        transform: 'scale(1)',
        transformOrigin: 'center center'
      };
    }

    if (isMobile) {
      const { top, left, scale } = symbol.mobile;
      return {
        transform: `scale(${scale})`,
        transformOrigin: `${left}% ${top}%`
      };
    } else {
      const { originX, originY, scale } = symbol.desktop;
      return {
        transform: `scale(${scale})`,
        transformOrigin: `${originX}% ${originY}%`
      };
    }
  };

  const getFocusRingStyle = () => {
    if (isOverview) return { display: 'none' };

    if (isMobile) {
      const { top, left, size } = symbol.mobile;
      return {
        display: 'block',
        top: `${top}%`,
        left: `${left}%`,
        width: `${size}px`,
        height: `${size}px`,
        transform: 'translate(-50%, -50%)'
      };
    } else {
      const { originX, originY } = symbol.desktop;
      return {
        display: 'block',
        top: `${originY}%`,
        left: `${originX}%`,
        width: '70px',
        height: '70px',
        transform: 'translate(-50%, -50%)'
      };
    }
  };

  const currentScaleLabel = isOverview ? '1.0x' : `${isMobile ? symbol.mobile.scale : symbol.desktop.scale}x`;
  const currentNumStr = `0${safeIndex + 1}`;

  return (
    <section className="section section-gable" id="gable">
      <div className="container">
        <div className="section-heading text-center">
          <div className="section-tag">{t('gable_tag')}</div>
          <h2 className="section-title">{t('gable_title')}</h2>
          <p className="section-subtitle">{t('gable_subtitle')}</p>
        </div>

        <div className="gable-explorer-layout">
          {/* Interactive Architecture Zoom Viewport */}
          <div className="gable-visual-pane">
            <div className="gable-zoom-viewport" id="gableZoomViewport">
              <div className="zoom-status-bar">
                <span className="zoom-live-badge">
                  <span className="pulsing-dot"></span>
                  <span>
                    {isOverview 
                      ? (isZh ? "全景模式：全棟建築概貌" : isEn ? "Overview: Full Building" : "มุมมอง: ภาพรวมทั้งอาคาร") 
                      : (isZh ? `聚焦：${symbol.name_zh || symbol.name_en}` : isEn ? `Focus: ${symbol.name_en}` : `โฟกัส: ${symbol.short_desc_th}`)}
                  </span>
                </span>
                <span className="zoom-scale-badge">{currentScaleLabel}</span>
              </div>

              <div className="gable-zoom-stage" id="gableZoomStage">
                <img
                  src="/img/อาคารกับชุมชน.jpg"
                  alt="อาคารโรงเรียนเต้าหมิงและการซูมส่องจุดสัญลักษณ์"
                  id="gableZoomImg"
                  className="gable-interactive-img"
                  style={getZoomStyle()}
                />
                <div className="gable-focus-ring" id="gableFocusRing" style={getFocusRingStyle()} />

                {/* 5 Hotspot Pins */}
                {GABLE_SYMBOLS.map((s, idx) => (
                  <button
                    key={s.id}
                    className={`zoom-hotspot-pin pin-${idx + 1} ${activeSymbolId === s.id && !isOverview ? 'active' : ''}`}
                    onClick={() => handleSelectSymbol(s.id)}
                    aria-label={isZh ? s.name_zh : isEn ? s.name_en : s.name_th}
                  />
                ))}
              </div>

              {/* Viewport Controls */}
              <div className="zoom-viewport-controls">
                <button
                  className="btn-zoom-ctrl"
                  id="btnResetGableZoom"
                  onClick={() => setIsOverview(!isOverview)}
                  title="ดูภาพรวมทั้งอาคาร"
                >
                  <span>🔍</span>
                  <span>{isOverview ? (isZh ? "放大探索象徵符號" : isEn ? "Zoom into Symbol" : "ซูมส่องจุดสัญลักษณ์") : t('btn_zoom_overview')}</span>
                </button>
                <div className="zoom-hint-pill">{t('zoom_hint_pill')}</div>
              </div>
            </div>
          </div>

          {/* Gable Symbol Details */}
          <div className="gable-details-pane">
            <div key={animKey} className="gable-symbol-card gable-animate-fade" id="gableSymbolCard">
              <div className="gable-card-watermark">{currentNumStr}</div>
              
              <div className="gable-card-top-row">
                <div className="gable-symbol-badge" id="gableBadge">
                  <span className="gable-seal-mini">{isZh ? (GABLE_SEALS[symbol.id] || '道') : `#${safeIndex + 1}`}</span>
                  <span>{isZh ? symbol.badge_zh : isEn ? symbol.badge_en : symbol.badge_th}</span>
                </div>
              </div>

              <h3 id="gableTitle">{isZh ? symbol.name_zh : isEn ? symbol.name_en : symbol.name_th}</h3>
              <p id="gableDesc" className="gable-desc-text">
                {isZh ? symbol.desc_zh : isEn ? symbol.desc_en : symbol.desc_th}
              </p>
              
              <div className="gable-meaning-box">
                <strong>{t('gable_meaning_lbl')}</strong>
                <span>{isZh ? symbol.meaning_zh : isEn ? symbol.meaning_en : symbol.meaning_th}</span>
              </div>
            </div>

            {/* 5 Smooth Modern Selector Cards */}
            <div className="gable-selector-list">
              {GABLE_SYMBOLS.map((s, idx) => {
                const isActive = activeSymbolId === s.id && !isOverview;
                return (
                  <button
                    key={s.id}
                    className={`gable-item-btn ${isActive ? 'active' : ''}`}
                    onClick={() => handleSelectSymbol(s.id)}
                  >
                    <div className="gable-item-left">
                      <span className="gable-item-num">{idx + 1}</span>
                      <div className="gable-item-title-group">
                        <h4>{isZh ? s.name_zh : isEn ? s.name_en : s.name_th}</h4>
                        <span>{isZh ? s.short_desc_zh : isEn ? s.short_desc_en : s.short_desc_th}</span>
                      </div>
                    </div>
                    <span className="gable-item-arrow">→</span>
                  </button>
                );
              })}
            </div>

            {/* Step Navigation Bar */}
            <div className="gable-step-nav">
              <button
                className="gable-step-btn"
                disabled={safeIndex <= 0}
                onClick={() => handleNavigateStep(-1)}
              >
                <span>←</span>
                <span>{isZh ? "上一符號" : isEn ? "Previous Point" : "จุดก่อนหน้า"}</span>
              </button>

              <div className="gable-dots-group">
                {GABLE_SYMBOLS.map((s, idx) => (
                  <button
                    key={s.id}
                    className={`gable-dot ${idx === safeIndex && !isOverview ? 'active' : ''}`}
                    onClick={() => handleSelectSymbol(s.id)}
                    aria-label={`Point ${idx + 1}`}
                  />
                ))}
              </div>

              <button
                className="gable-step-btn"
                disabled={safeIndex >= GABLE_SYMBOLS.length - 1}
                onClick={() => handleNavigateStep(1)}
              >
                <span>{isZh ? "下一符號" : isEn ? "Next Point" : "จุดถัดไป"}</span>
                <span>→</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
