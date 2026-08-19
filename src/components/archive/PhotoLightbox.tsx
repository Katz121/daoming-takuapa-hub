'use client';

import React, { useEffect, useState, useRef } from 'react';
import { useApp } from '@/lib/store';
import { clientDb } from '@/lib/clientDb';
import { ArchivePhoto } from '@/types';

const THAI_DIGITS = ['๑', '๒', '๓', '๔', '๕', '๖', '๗', '๘', '๙', '๑๐', '๑๑', '๑๒', '๑๓', '๑๔', '๑๕', '๑๖', '๑๗', '๑๘', '๑๙', '๒๐'];

export function PhotoLightbox() {
  const { lang, lightboxPhotoIndex, closeLightbox, openLightbox } = useApp();
  const [allPhotos, setAllPhotos] = useState<ArchivePhoto[]>([]);
  const [touchStart, setTouchStart] = useState<number | null>(null);

  useEffect(() => {
    setAllPhotos(clientDb.getArchivePhotos());
  }, [lightboxPhotoIndex]);

  const isEn = lang === 'en';
  const isZh = lang === 'zh';

  useEffect(() => {
    if (lightboxPhotoIndex === null) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        navigate(-1);
      } else if (e.key === 'ArrowRight') {
        navigate(1);
      } else if (e.key === 'Escape') {
        closeLightbox();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxPhotoIndex, allPhotos]);

  if (lightboxPhotoIndex === null) return null;

  const photo = allPhotos[lightboxPhotoIndex] || allPhotos.find(p => p.id === lightboxPhotoIndex);
  if (!photo) return null;

  const navigate = (direction: number) => {
    const nextIdx = lightboxPhotoIndex + direction;
    if (nextIdx >= 0 && nextIdx < allPhotos.length) {
      openLightbox(nextIdx);
    }
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStart === null) return;
    const touchEnd = e.changedTouches[0].clientX;
    const diff = touchStart - touchEnd;

    if (diff > 50) {
      // Swiped Left -> Next Photo
      navigate(1);
    } else if (diff < -50) {
      // Swiped Right -> Prev Photo
      navigate(-1);
    }
    setTouchStart(null);
  };

  const toDigit = (num: number) => {
    if (isEn) return num.toString();
    return THAI_DIGITS[num - 1] || num.toString();
  };

  // Safe URI encoding for filenames with spaces or Thai glyphs
  const safeSrc = encodeURI(photo.src);

  return (
    <div
      className="lightbox-modal open"
      id="photoLightboxModal"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '16px',
        backgroundColor: 'rgba(14, 28, 26, 0.95)',
        backdropFilter: 'blur(8px)',
        WebkitBackdropFilter: 'blur(8px)'
      }}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <div
        className="lightbox-backdrop"
        onClick={closeLightbox}
        style={{ position: 'absolute', inset: 0, cursor: 'pointer' }}
      ></div>

      <div
        className="lightbox-content"
        style={{
          position: 'relative',
          zIndex: 10,
          maxWidth: '960px',
          width: '100%',
          backgroundColor: '#0F201D',
          border: '1px solid rgba(229, 163, 30, 0.3)',
          borderRadius: '16px',
          overflow: 'hidden',
          boxShadow: '0 25px 60px rgba(0, 0, 0, 0.75)',
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        {/* Close Button */}
        <button
          className="lightbox-close-btn"
          onClick={closeLightbox}
          aria-label="ปิดภาพ"
          style={{
            position: 'absolute',
            top: '12px',
            right: '16px',
            background: 'rgba(0, 0, 0, 0.6)',
            border: '1px solid rgba(255, 255, 255, 0.25)',
            color: '#FFF',
            fontSize: '1.6rem',
            width: '38px',
            height: '38px',
            borderRadius: '50%',
            cursor: 'pointer',
            zIndex: 20,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            lineHeight: 1
          }}
        >
          &times;
        </button>

        {/* Counter Badge */}
        <span
          className="lightbox-counter-badge"
          style={{
            position: 'absolute',
            top: '14px',
            left: '16px',
            background: 'rgba(0, 0, 0, 0.65)',
            border: '1px solid rgba(229, 163, 30, 0.5)',
            color: '#E5A31E',
            fontFamily: 'monospace',
            fontSize: '0.82rem',
            fontWeight: 'bold',
            padding: '4px 12px',
            borderRadius: '999px',
            zIndex: 20
          }}
        >
          {toDigit(lightboxPhotoIndex + 1)} / {toDigit(allPhotos.length)}
        </span>

        {/* Prev Navigation Button */}
        <button
          className="lightbox-nav-btn lightbox-prev-btn"
          onClick={() => navigate(-1)}
          disabled={lightboxPhotoIndex === 0}
          aria-label="ภาพก่อนหน้า"
          style={{
            position: 'absolute',
            top: '45%',
            left: '12px',
            transform: 'translateY(-50%)',
            width: '46px',
            height: '46px',
            background: 'rgba(18, 36, 33, 0.85)',
            border: '1.5px solid rgba(255, 255, 255, 0.3)',
            color: '#FFFFFF',
            fontSize: '1.8rem',
            borderRadius: '50%',
            cursor: lightboxPhotoIndex === 0 ? 'not-allowed' : 'pointer',
            opacity: lightboxPhotoIndex === 0 ? 0.25 : 1,
            zIndex: 20,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          &#10094;
        </button>

        {/* Next Navigation Button */}
        <button
          className="lightbox-nav-btn lightbox-next-btn"
          onClick={() => navigate(1)}
          disabled={lightboxPhotoIndex === allPhotos.length - 1}
          aria-label="ภาพถัดไป"
          style={{
            position: 'absolute',
            top: '45%',
            right: '12px',
            transform: 'translateY(-50%)',
            width: '46px',
            height: '46px',
            background: 'rgba(18, 36, 33, 0.85)',
            border: '1.5px solid rgba(255, 255, 255, 0.3)',
            color: '#FFFFFF',
            fontSize: '1.8rem',
            borderRadius: '50%',
            cursor: lightboxPhotoIndex === allPhotos.length - 1 ? 'not-allowed' : 'pointer',
            opacity: lightboxPhotoIndex === allPhotos.length - 1 ? 0.25 : 1,
            zIndex: 20,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          &#10095;
        </button>

        {/* Media & Caption Display */}
        <div className="lightbox-media-wrapper" style={{ width: '100%', position: 'relative' }}>
          <div
            style={{
              width: '100%',
              maxHeight: 'min(65vh, 65dvh)',
              minHeight: '200px',
              backgroundColor: '#071210',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              overflow: 'hidden'
            }}
          >
            <img
              src={safeSrc}
              alt={isEn ? photo.title_en : photo.title_th}
              className="lightbox-img"
              style={{
                maxHeight: 'min(65vh, 65dvh)',
                maxWidth: '100%',
                objectFit: 'contain',
                display: 'block'
              }}
            />
          </div>

          <div
            className="lightbox-caption"
            style={{
              padding: '14px 18px',
              color: '#FAF2DD',
              maxHeight: 'min(25vh, 25dvh)',
              overflowY: 'auto',
              WebkitOverflowScrolling: 'touch',
              backgroundColor: '#112421',
              borderTop: '1px solid rgba(255, 255, 255, 0.1)',
              textAlign: 'left'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
              <span
                style={{
                  fontSize: '0.75rem',
                  fontFamily: 'monospace',
                  fontWeight: 'bold',
                  color: '#C44D27',
                  background: 'rgba(196, 77, 39, 0.12)',
                  padding: '2px 8px',
                  borderRadius: '4px'
                }}
              >
                {isZh ? photo.tag_zh : isEn ? photo.tag_en : photo.tag_th}
              </span>
              <h4 style={{ color: '#E5A31E', margin: 0, fontSize: '1.05rem', fontWeight: 'bold' }}>
                {isZh ? photo.title_zh : isEn ? photo.title_en : photo.title_th}
              </h4>
            </div>
            <p style={{ margin: 0, fontSize: '0.88rem', color: 'rgba(250, 242, 221, 0.8)', lineHeight: '1.5' }}>
              {isZh ? photo.caption_zh : isEn ? photo.caption_en : photo.caption_th}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
