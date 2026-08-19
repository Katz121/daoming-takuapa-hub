'use client';

import React, { useState, useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { useApp } from '@/lib/store';

interface SoundscapeTrack {
  id: string;
  icon: string;
  title_th: string;
  title_en: string;
  title_zh: string;
  src: string;
}

const TRACKS: SoundscapeTrack[] = [
  {
    id: 'breeze',
    icon: '🍃',
    title_th: 'ลมพัดระเบียงไม้ & ระฆังลม',
    title_en: 'Veranda Breeze & Chimes',
    title_zh: '百年木廊微風與風鈴',
    src: '/audio/ambient_breeze_chimes.mp3'
  },
  {
    id: 'tea',
    icon: '🫖',
    title_th: 'เสียงชงชา & กู่เจิงโบราณ',
    title_en: 'Heritage Tea & Soft Guzheng',
    title_zh: '茶席清韻與古箏微音',
    src: '/audio/ambient_tea_guzheng.mp3'
  },
  {
    id: 'rain',
    icon: '🌧️',
    title_th: 'ฝนพรำหลังคากระเบื้องเก่า',
    title_en: 'Rain on Heritage Roof Tiles',
    title_zh: '老瓦簷下細雨微鳴',
    src: '/audio/ambient_oldtown_rain.mp3'
  }
];

export function AmbientSoundscape() {
  const pathname = usePathname();
  const { lang, isAudioGuideOpen, showToast } = useApp();
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [activeTrackIndex, setActiveTrackIndex] = useState<number>(0);
  const [volume, setVolume] = useState<number>(0.25);
  const [isOpenPanel, setIsOpenPanel] = useState<boolean>(false);
  const [isMinimized, setIsMinimized] = useState<boolean>(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const wasPlayingBeforeGuideRef = useRef<boolean>(false);

  const isEn = lang === 'en';
  const isZh = lang === 'zh';
  const track = TRACKS[activeTrackIndex];

  // Hide on admin portal
  const isAdmin = pathname && pathname.startsWith('/admin');

  // Initialize and load track
  useEffect(() => {
    if (typeof window === 'undefined' || isAdmin) return;

    if (!audioRef.current) {
      audioRef.current = new Audio(track.src);
      audioRef.current.loop = true;
    } else {
      const prevPlaying = isPlaying;
      audioRef.current.src = track.src;
      audioRef.current.loop = true;
      audioRef.current.load();
      if (prevPlaying) {
        audioRef.current.play().catch(() => setIsPlaying(false));
      }
    }
  }, [activeTrackIndex, isAdmin]);

  // Handle Volume Change
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  // Handle Play/Pause
  useEffect(() => {
    if (!audioRef.current || isAdmin) return;
    if (isPlaying) {
      audioRef.current.volume = volume;
      audioRef.current.play().catch(() => setIsPlaying(false));
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying, isAdmin]);

  // Auto Pause when Oral History Audio Guide modal is open, resume when closed
  useEffect(() => {
    if (isAudioGuideOpen) {
      if (isPlaying) {
        wasPlayingBeforeGuideRef.current = true;
        setIsPlaying(false);
      }
    } else {
      if (wasPlayingBeforeGuideRef.current) {
        wasPlayingBeforeGuideRef.current = false;
        setIsPlaying(true);
      }
    }
  }, [isAudioGuideOpen]);

  if (isAdmin) return null;

  const togglePlay = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    const nextState = !isPlaying;
    setIsPlaying(nextState);
    const title = isZh ? track.title_zh : isEn ? track.title_en : track.title_th;
    if (nextState) {
      showToast(
        isZh
          ? `🎵 開啟老城環境音景：「${title}」`
          : isEn
            ? `🎵 Ambient Soundscape on: "${title}"`
            : `🎵 เปิดเสียงบรรยากาศเมืองเก่า: "${title}"`
      );
    }
  };

  const handleSelectTrack = (idx: number) => {
    setActiveTrackIndex(idx);
    setIsPlaying(true);
    const newTrack = TRACKS[idx];
    const title = isZh ? newTrack.title_zh : isEn ? newTrack.title_en : newTrack.title_th;
    showToast(
      isZh
        ? `🎵 切換音景：「${title}」`
        : isEn
          ? `🎵 Switched Soundscape: "${title}"`
          : `🎵 เปลี่ยนเสียงบรรยากาศ: "${title}"`
    );
  };

  return (
    <div className="ambient-soundscape-container">
      {/* Minimized Floating Disc Badge (Compact Mobile Mode) */}
      {isMinimized ? (
        <button
          className={`ambient-minimized-badge ${isPlaying ? 'playing' : ''}`}
          onClick={() => setIsMinimized(false)}
          title={isZh ? "展開老城音景播放器" : isEn ? "Expand Soundscape Player" : "แตะเพื่อเปิดแถบเสียงบรรยากาศ"}
          aria-label="Expand Soundscape"
        >
          <span className="minimized-icon">{isPlaying ? "🔊" : "🎵"}</span>
          {isPlaying && (
            <div className="minimized-mini-bars">
              <span></span>
              <span></span>
              <span></span>
            </div>
          )}
        </button>
      ) : (
        /* Expanded Floating Pill Controller */
        <div className={`ambient-floating-pill ${isPlaying ? 'playing' : ''}`}>
          <button
            className="ambient-play-toggle-btn"
            onClick={togglePlay}
            title={isPlaying ? (isZh ? "暫停環境音" : isEn ? "Pause Ambience" : "หยุดเสียงบรรยากาศ") : (isZh ? "開啟環境音" : isEn ? "Play Ambience" : "เปิดเสียงบรรยากาศ")}
            aria-label="Toggle Ambient Sound"
          >
            <span className="ambient-icon">{isPlaying ? "🔊" : "🔈"}</span>
            <div className={`ambient-bars ${isPlaying ? 'animated' : ''}`}>
              <span></span>
              <span></span>
              <span></span>
            </div>
          </button>

          <button
            className="ambient-label-btn"
            onClick={() => setIsOpenPanel(!isOpenPanel)}
            title={isZh ? "設定空間音景" : isEn ? "Soundscape Settings" : "ปรับแต่งเสียงบรรยากาศ"}
          >
            <span className="ambient-track-name">
              {isZh ? track.title_zh : isEn ? track.title_en : track.title_th}
            </span>
            <span className="ambient-gear-icon">{isOpenPanel ? "✕" : "⚙️"}</span>
          </button>

          {/* Minimize / Hide Button */}
          <button
            className="ambient-minimize-btn"
            onClick={(e) => {
              e.stopPropagation();
              setIsMinimized(true);
              setIsOpenPanel(false);
            }}
            title={isZh ? "縮小隱藏 (Minimize)" : isEn ? "Minimize Player" : "ซ่อนแถบเสียงบรรยากาศ"}
            aria-label="Minimize Player"
          >
            <span>&minus;</span>
          </button>
        </div>
      )}

      {/* Expanded Sound Settings Card */}
      {isOpenPanel && !isMinimized && (
        <div className="ambient-settings-card">
          <div className="ambient-card-header">
            <div className="ambient-header-left">
              <span className="pulsing-dot"></span>
              <strong>{isZh ? "老城空間音景" : isEn ? "HERITAGE SOUNDSCAPE" : "เสียงบรรยากาศเมืองเก่า"}</strong>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <button
                className="ambient-card-minimize"
                onClick={() => {
                  setIsMinimized(true);
                  setIsOpenPanel(false);
                }}
                title="ซ่อนตัวเล่นเสียง (Minimize)"
              >
                &minus;
              </button>
              <button className="ambient-card-close" onClick={() => setIsOpenPanel(false)}>&times;</button>
            </div>
          </div>

          <p className="ambient-card-desc">
            {isZh
              ? "沉浸式聆聽百年校舍的自然微風與茶席風雅，陪伴您的閱讀與探索時光。"
              : isEn
                ? "Immerse in peaceful veranda breezes, tea ceremonies, and rain sounds of Dao Ming."
                : "ดื่มด่ำกับเสียงบรรยากาศลมพัดระเบียงไม้โบราณและสายฝนเมืองเก่า เติมเต็มการอ่านและสำรวจพื้นที่"}
          </p>

          {/* Track Selector List */}
          <div className="ambient-track-list">
            {TRACKS.map((t, idx) => (
              <button
                key={t.id}
                className={`ambient-track-item ${idx === activeTrackIndex ? 'active' : ''}`}
                onClick={() => handleSelectTrack(idx)}
              >
                <span className="track-icon">{t.icon}</span>
                <span className="track-title">{isZh ? t.title_zh : isEn ? t.title_en : t.title_th}</span>
                {idx === activeTrackIndex && isPlaying && <span className="track-eq">🎵</span>}
              </button>
            ))}
          </div>

          {/* Volume Control */}
          <div className="ambient-volume-row">
            <span className="vol-icon">🔉</span>
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={volume}
              onChange={(e) => setVolume(parseFloat(e.target.value))}
              className="ambient-vol-slider"
              aria-label="Volume Slider"
            />
            <span className="vol-val">{Math.round(volume * 100)}%</span>
          </div>

          {/* Main Action Bar */}
          <div className="ambient-card-footer">
            <button className={`btn btn-block ${isPlaying ? 'btn-outline-sm' : 'btn-primary-sm'}`} onClick={togglePlay}>
              <span>{isPlaying ? (isZh ? "⏸ 暫停播放" : isEn ? "⏸ Pause Ambience" : "⏸ หยุดเสียงชั่วคราว") : (isZh ? "▶ 開始播放音景" : isEn ? "▶ Play Soundscape" : "▶ เปิดเสียงบรรยากาศ")}</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
