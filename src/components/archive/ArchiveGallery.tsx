'use client';

import React, { useState, useEffect } from 'react';
import { useApp } from '@/lib/store';
import { clientDb } from '@/lib/clientDb';
import { ArchivePhoto } from '@/types';

const PAGE_SIZE = 6;
const THAI_DIGITS = ['๑', '๒', '๓', '๔', '๕', '๖', '๗', '๘', '๙', '๑๐', '๑๑', '๑๒', '๑๓', '๑๔', '๑๕', '๑๖', '๑๗', '๑๘', '๑๙', '๒๐'];

export function ArchiveGallery() {
  const { lang, t, openLightbox } = useApp();
  const [allPhotos, setAllPhotos] = useState<ArchivePhoto[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const loadPhotos = () => {
      setAllPhotos(clientDb.getArchivePhotos());
    };
    loadPhotos();
    window.addEventListener('daoming_archive_updated', loadPhotos);
    window.addEventListener('storage', loadPhotos);
    return () => {
      window.removeEventListener('daoming_archive_updated', loadPhotos);
      window.removeEventListener('storage', loadPhotos);
    };
  }, []);

  const isEn = lang === 'en';
  const isZh = lang === 'zh';

  const filteredPhotos = selectedCategory === 'all'
    ? allPhotos
    : allPhotos.filter(p => p.category === selectedCategory);

  const totalItems = filteredPhotos.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / PAGE_SIZE));
  const safePage = Math.min(Math.max(1, currentPage), totalPages);

  const startIdx = (safePage - 1) * PAGE_SIZE;
  const endIdx = Math.min(startIdx + PAGE_SIZE, totalItems);
  // On mobile show all archive photos in the horizontal swipe carousel; on desktop paginate 6 per page
  const displayPhotos = isMobile ? allPhotos : filteredPhotos.slice(startIdx, endIdx);

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    setCurrentPage(1);
  };

  const handlePageChange = (delta: number) => {
    const newPage = safePage + delta;
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
      const section = document.getElementById('archive');
      if (section) section.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  };

  const toDigit = (num: number) => {
    if (isEn || isZh) return num.toString();
    return THAI_DIGITS[num - 1] || num.toString();
  };

  return (
    <section className="section section-archive" id="archive">
      <div className="container">
        <div className="section-heading text-center">
          <div className="section-tag">{t('archive_tag')}</div>
          <h2 className="section-title">{t('archive_title')}</h2>
          <p className="section-subtitle">{t('archive_subtitle')}</p>
        </div>

        {/* Category Filter Bar */}
        <div className="archive-filter-bar" id="archiveFilterBar">
          <button
            className={`filter-btn ${selectedCategory === 'all' ? 'active' : ''}`}
            onClick={() => handleCategoryChange('all')}
          >
            {t('arch_cat_all')}
          </button>
          <button
            className={`filter-btn ${selectedCategory === 'diplomacy' ? 'active' : ''}`}
            onClick={() => handleCategoryChange('diplomacy')}
          >
            {t('arch_cat_diplomacy')}
          </button>
          <button
            className={`filter-btn ${selectedCategory === 'school' ? 'active' : ''}`}
            onClick={() => handleCategoryChange('school')}
          >
            {t('arch_cat_school')}
          </button>
          <button
            className={`filter-btn ${selectedCategory === 'sports' ? 'active' : ''}`}
            onClick={() => handleCategoryChange('sports')}
          >
            {t('arch_cat_sports')}
          </button>
          <button
            className={`filter-btn ${selectedCategory === 'community' ? 'active' : ''}`}
            onClick={() => handleCategoryChange('community')}
          >
            {t('arch_cat_community')}
          </button>
        </div>

        {/* Mobile Swipe Hint */}
        <div className="archive-mobile-swipe-hint">
          <span>👉 {isZh ? "左右滑動瀏覽歷史影像 (點擊可放大)" : isEn ? "Swipe horizontally to explore photos (Tap to expand)" : "ปัดซ้าย-ขวาเพื่อเลื่อนดูภาพประวัติศาสตร์ (แตะเพื่อดูภาพขยาย)"} 👈</span>
        </div>

        {/* Gallery Carousel / Grid */}
        <div className="archive-gallery-grid" id="archiveGalleryGrid">
          {displayPhotos.map(item => (
            <div
              key={item.id}
              className="archive-card"
              data-category={item.category}
              onClick={() => openLightbox(item.id)}
            >
              <div className="archive-img-box">
                <img src={item.src} alt={isZh ? item.title_zh : isEn ? item.title_en : item.title_th} loading="lazy" />
                <span className="archive-era-tag">{isZh ? item.tag_zh : isEn ? item.tag_en : item.tag_th}</span>
                <div className="archive-zoom-icon">🔍</div>
              </div>
              <div className="archive-card-caption">
                <h4>{isZh ? item.title_zh : isEn ? item.title_en : item.title_th}</h4>
                <p>{isZh ? item.caption_zh : isEn ? item.caption_en : item.caption_th}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Desktop Pagination Controls */}
        {!isMobile && (
          <>
            <div className="archive-pagination-bar" id="archivePaginationBar">
              <button
                className="page-nav-btn page-prev-btn"
                disabled={safePage <= 1}
                onClick={() => handlePageChange(-1)}
                aria-label={isZh ? "上一頁" : isEn ? "Previous" : "หน้าก่อนหน้า"}
              >
                <span>←</span> <span>{t('page_prev')}</span>
              </button>

              <div className="page-numbers-group" id="archivePageNumbers">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
                  <button
                    key={p}
                    className={`page-num-btn ${p === safePage ? 'active' : ''}`}
                    onClick={() => setCurrentPage(p)}
                  >
                    {toDigit(p)}
                  </button>
                ))}
              </div>

              <button
                className="page-nav-btn page-next-btn"
                disabled={safePage >= totalPages}
                onClick={() => handlePageChange(1)}
                aria-label={isZh ? "下一頁" : isEn ? "Next" : "หน้าถัดไป"}
              >
                <span>{t('page_next')}</span> <span>→</span>
              </button>
            </div>

            <div className="archive-page-status-pill" id="archivePageStatus">
              <span>
                {isZh
                  ? `顯示第 ${totalItems === 0 ? 0 : startIdx + 1} - ${endIdx} 張照片，共 ${totalItems} 張 (第 ${safePage} / ${totalPages} 頁)`
                  : isEn
                    ? `Showing photos ${totalItems === 0 ? 0 : startIdx + 1} - ${endIdx} of ${totalItems} (Page ${safePage} / ${totalPages})`
                    : `แสดงภาพ ${totalItems === 0 ? '๐' : toDigit(startIdx + 1)} - ${toDigit(endIdx)} จาก ${toDigit(totalItems)} ภาพ (หน้า ${toDigit(safePage)} / ${toDigit(totalPages)})`}
              </span>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
