'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '@/lib/store';

interface AudioTrack {
  id: string;
  era_th: string;
  era_en: string;
  era_zh: string;
  title_th: string;
  title_en: string;
  title_zh: string;
  audioSrc: string;
  transcript_th: string;
  transcript_en: string;
  transcript_zh: string;
}

const AUDIO_TRACKS: AudioTrack[] = [
  {
    id: '1905',
    era_th: 'พ.ศ. ๒๔๔๘ - ๒๔๖๕',
    era_en: '1905 - 1922',
    era_zh: '1905 - 1922年',
    title_th: 'กำเนิด "โต๊ะเบ๋ง" สู่การลงขันสร้างอาคารโดยช่างผาว',
    title_en: 'From Toh Beng to Building Construction by Master Pao',
    title_zh: '卓明創校 · 華商集資與包師傅築造紅毛樓',
    audioSrc: '/audio/chapter_1.mp3',
    transcript_th: 'ย้อนกลับไปเมื่อร้อยยี่สิบปีก่อน ในยุคที่ตะกั่วป่ายังเป็นเมืองเหมืองแร่ดีบุกอันรุ่งเรืองระดับโลก ท่ามกลางสายน้ำและเรือสำเภา พ่อค้าชาวจีนฮกเกี้ยนได้ร่วมแรงร่วมใจกันลงขัน ก่อตั้งโรงเรียนสอนภาษาจีนแห่งแรกขึ้นในนาม "โต๊ะเบ๋ง" จนกระทั่งปี ๒๔๖๕ นายผาว ช่างฝีมือเอกชาวจีน ได้รังสรรค์อาคารอั้งม่อเหลาหลังนี้ขึ้น ผสานปรัชญาหน้าจั่วจำลองจักรวาล ฟ้า ดิน คน สลักเสาเทียนกงเพื่อดึงพลังบริสุทธิ์จากฟากฟ้า ส่งต่อปัญญาและแสงสว่างอันเป็นนิรันดร์สู่ลูกหลานเมืองตะกั่วป่า',
    transcript_en: 'Over a century ago, Takua Pa was a thriving world-class tin mining capital. Hokkien merchants pooled resources to establish the first Chinese school named "Toh Beng". In 1922, master builder Pao constructed this Ang Mor Lao schoolhouse, embedding Taoist cosmic symbols on the pediment to channel celestial wisdom to future generations.',
    transcript_zh: '溯源一百二十年前，當德古巴仍是名揚四海的錫礦重鎮，在川流不息的商船泊岸處，福建華商先賢同心集資，創設全府首間華文學校「卓明」。至1922年，閩南名匠包師傅掌墨興築這座中西合璧紅毛樓，融合「天地人」三才宇宙觀，立天公柱接引天心浩氣，將永恆的智慧之光世世代代傳承給後代子孫。'
  },
  {
    id: '1950',
    era_th: 'พ.ศ. ๒๔๘๐ - ๒๕๑๐',
    era_en: '1937 - 1967',
    era_zh: '1937 - 1967年',
    title_th: 'ยุคทองแห่งการศึกษา บาสเกตบอล และการต้อนรับกงสุลจีน',
    title_en: 'The Golden Era: Basketball Tournaments & Diplomatic Reception',
    title_zh: '教育黃金時代 · 熱血籃球與隆重接待中國總領事',
    audioSrc: '/audio/chapter_2.mp3',
    transcript_th: 'ยุคทองแห่งการศึกษาและความเกรียงไกร เสียงท่องตำราภาษาจีนและภาษาไทยดังก้องไปทั่วโถงไม้ เต้าหมิงกลายเป็นหัวใจของชุมชนอย่างแท้จริง ที่นี่มีสนามบาสเกตบอลดินที่คึกคักที่สุดในพังงา สร้างนักกีฬาและหล่อหลอมความสามัคคีให้คนรุ่นหลัง และในหน้าประวัติศาสตร์ปี ๒๔๙๓ อาคารแห่งนี้ได้รับเกียรติยศสูงสุด ในการจัดพิธีต้อนรับกงสุลใหญ่สาธารณรัฐจีน จารึกบทบาทศูนย์กลางการทูตและสังคมอันน่าเกรงขามของเมืองเก่า',
    transcript_en: 'The golden age of vibrant education and communal pride. Dao Ming was the heart of the district, featuring Takua Pa’s most popular basketball tournaments and proudly hosting the grand reception of the Chinese Consul-General in 1950.',
    transcript_zh: '一段弦歌不輟、人才輩出的黃金歲月。瑯瑯讀書聲迴盪於木構大廳，導明學校成為凝聚僑社情感的核心。這裡有全府最具活力的紅土籃球場，鍛鍊青年體魄、凝聚社區向心力；1950年，更於前廊隆重接待中華民國駐宋卡總領事，銘刻老城作為政治、外交與文化重鎮的莊嚴篇章。'
  },
  {
    id: '1990',
    era_th: 'พ.ศ. ๒๕๓๓ - ๒๕๔๗',
    era_en: '1990 - 2004',
    era_zh: '1990 - 2004年',
    title_th: 'จัดตั้งมูลนิธิฯ & การส่งมอบกรรมสิทธิ์ที่ดินเพื่อสาธารณะ',
    title_en: 'Establishment of Dao Ming Foundation & Ownership Handover',
    title_zh: '成立基金會 · 產權全數無償移交公眾永續傳承',
    audioSrc: '/audio/chapter_3.mp3',
    transcript_th: 'มรดกแห่งความเสียสละเพื่อสาธารณประโยชน์ แม้กาลเวลาจะเปลี่ยนผ่าน แต่สายใยแห่งความผูกพันของชุมชนมิเคยจางหาย ในปี ๒๕๓๓ ได้มีการจัดตั้งมูลนิธิโรงเรียนเต้าหมิง ตะกั่วป่า และด้วยจิตวิญญาณอันสูงส่ง ทายาทผู้ถือครองกรรมสิทธิ์ที่ดินทั้ง ๓ ท่าน ได้พร้อมใจกันส่งมอบที่ดินและตัวอาคารทั้งหมด ๑๐๐% ให้เป็นสมบัติส่วนรวมของชุมชนตลอดไป โดยมิคิดมูลค่า เพื่อให้เต้าหมิงเป็นมรดกมีชีวิตของทุกคน',
    transcript_en: 'A testament to altruism. In 1990, the Dao Ming Foundation was established. The 3 trustee families unconditionally transferred 100% legal title of land and schoolhouse to the foundation without compensation, gifting this perpetual heritage to the community.',
    transcript_zh: '一份無私奉獻於公共福祉的崇高遺產。歲月流轉，老城對導明的鄉情永不褪色。1990年正式成立「德古巴導明學校基金會」，原代持地契之三大家族後人深明大義，簽署和解協議，將地皮與整座校舍之100%產權全額無償移交基金會，永為德古巴社區共享之活態遺產。'
  },
  {
    id: '2026',
    era_th: 'ปัจจุบัน & รางวัล ASA',
    era_en: '2026 Present & ASA Award',
    era_zh: '2026年當代 & ASA大獎',
    title_th: 'บริบทใหม่ในเมืองตะกั่วป่า & รางวัลอนุรักษ์ศิลปสถาปัตยกรรม ๒๕๖๙',
    title_en: 'New Living Context & National Architectural Conservation Award',
    title_zh: '老城新生語境 · 榮獲2026年度泰國國家建築保護大獎',
    audioSrc: '/audio/chapter_4.mp3',
    transcript_th: 'จากประวัติศาสตร์อันทรงคุณค่า สู่บริบทใหม่แห่งอนาคต วันนี้ โรงเรียนเต้าหมิงได้รับการยกย่องสูงสุด ด้วยรางวัลอนุรักษ์ศิลปสถาปัตยกรรมดีเด่น ประจำปี ๒๕๖๙ จากสมาคมสถาปนิกสยาม ในพระบรมราชูปถัมภ์ ชุบชีวิตอาคารไม้ร้อยปี สู่เต้าหมิง ครีเอทีฟ ฮับ พื้นที่แห่งการเรียนรู้ ชา กาแฟ นิทรรศการ และตลาดสร้างสรรค์ ที่ซึ่งรากเหง้าในอดีต ผสานเข้ากับพลังของคนรุ่นใหม่อย่างงดงามและยั่งยืน',
    transcript_en: 'Honored with the Prestigious Architectural Conservation Award 2026 by ASA (The Association of Siamese Architects), Dao Ming opens its next chapter as a living creative hub, connecting heritage roots with future vibrancy.',
    transcript_zh: '從厚重的歷史篇章，邁向生機盎然的嶄新未來。今日，導明學校榮獲泰國暹羅皇家建築師協會（ASA）「2026年度傑出建築保護大獎」最高榮譽。重煥百年木構建築，蛻變為融合文化展覽、工夫茶席、工藝手作與文創市集的「導明文創樞紐」，讓百年文脈與青年世代的創新能量在此完美交融。'
  }
];

export function AudioGuideModal() {
  const { lang, isAudioGuideOpen, setAudioGuideOpen, showToast } = useApp();
  const [activeTrackIndex, setActiveTrackIndex] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(30);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const isEn = lang === 'en';
  const isZh = lang === 'zh';
  const track = AUDIO_TRACKS[activeTrackIndex];

  // Initialize and load audio track
  useEffect(() => {
    if (typeof window === 'undefined') return;

    if (!audioRef.current) {
      audioRef.current = new Audio(track.audioSrc);
    } else {
      audioRef.current.src = track.audioSrc;
      audioRef.current.load();
    }

    const audio = audioRef.current;

    const handleLoadedMetadata = () => {
      if (audio.duration && !isNaN(audio.duration)) {
        setDuration(Math.round(audio.duration));
      }
    };

    const handleTimeUpdate = () => {
      setCurrentTime(Math.round(audio.currentTime));
    };

    const handleEnded = () => {
      setIsPlaying(false);
      setCurrentTime(0);
    };

    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('ended', handleEnded);

    if (isPlaying) {
      audio.play().catch(() => setIsPlaying(false));
    }

    return () => {
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('ended', handleEnded);
    };
  }, [activeTrackIndex]);

  // Handle Play/Pause
  useEffect(() => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.play().catch(() => setIsPlaying(false));
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying]);

  // Clean up on modal close
  useEffect(() => {
    if (!isAudioGuideOpen && audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
      setCurrentTime(0);
    }
  }, [isAudioGuideOpen]);

  if (!isAudioGuideOpen) return null;

  const togglePlay = () => {
    const nextState = !isPlaying;
    setIsPlaying(nextState);
    if (nextState) {
      const trackTitle = isZh ? track.title_zh : isEn ? track.title_en : track.title_th;
      showToast(isZh ? `🎧 正在播放：「${trackTitle}」` : isEn ? `🎧 Playing: "${trackTitle}"` : `🎧 กำลังเล่นเสียงบรรยาย: "${trackTitle}"`);
    }
  };

  const handleSelectTrack = (idx: number) => {
    setActiveTrackIndex(idx);
    setCurrentTime(0);
    setIsPlaying(true);
  };

  const handleSeek = (newTime: number) => {
    if (audioRef.current) {
      audioRef.current.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };

  const handleClose = () => {
    if (audioRef.current) {
      audioRef.current.pause();
    }
    setIsPlaying(false);
    setAudioGuideOpen(false);
  };

  const formatTime = (sec: number) => {
    const m = Math.floor(sec / 60);
    const s = Math.floor(sec % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const progressPct = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <div className="audio-guide-modal open" id="audioGuideModal">
      <div className="audio-backdrop" onClick={handleClose}></div>

      <div className="audio-dialog">
        {/* Header */}
        <div className="audio-header">
          <div className="audio-title-badge">
            <span className="pulsing-dot"></span>
            <span>{isZh ? "百年口述歷史原音導覽" : "ORAL HISTORY AUDIO GUIDE"}</span>
          </div>
          <button className="audio-close-btn" onClick={handleClose} aria-label="關閉">&times;</button>
        </div>

        {/* Track Info Card */}
        <div className="audio-player-card">
          <div className="audio-era-pill">{isZh ? track.era_zh : isEn ? track.era_en : track.era_th}</div>
          <h3 className="audio-track-title">{isZh ? track.title_zh : isEn ? track.title_en : track.title_th}</h3>

          {/* Dynamic Waveform Visualizer */}
          <div className={`audio-waveform ${isPlaying ? 'playing' : ''}`}>
            {Array.from({ length: 24 }).map((_, i) => (
              <span key={i} style={{ animationDelay: `${(i % 6) * 0.15}s` }}></span>
            ))}
          </div>

          {/* Progress Scrubber */}
          <div className="audio-progress-wrap">
            <div className="audio-time-label">{formatTime(currentTime)}</div>
            <div
              className="audio-track-line"
              onClick={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                const clickX = e.clientX - rect.left;
                const newPct = clickX / rect.width;
                handleSeek(newPct * duration);
              }}
            >
              <div className="audio-track-fill" style={{ width: `${progressPct}%` }}></div>
            </div>
            <div className="audio-time-label">{formatTime(duration)}</div>
          </div>

          {/* Player Controls */}
          <div className="audio-controls-row">
            <button
              className="audio-ctrl-btn"
              onClick={() => handleSeek(Math.max(0, currentTime - 10))}
              title="倒退 10 秒"
            >
              ↺ 10s
            </button>
            <button className="audio-play-main-btn" onClick={togglePlay} aria-label={isPlaying ? "暫停" : "播放"}>
              {isPlaying ? "⏸" : "▶"}
            </button>
            <button
              className="audio-ctrl-btn"
              onClick={() => handleSeek(Math.min(duration, currentTime + 10))}
              title="快進 10 秒"
            >
              10s ↻
            </button>
          </div>
        </div>

        {/* Spoken Transcript Box */}
        <div className="audio-transcript-box">
          <strong>📜 {isZh ? "歷史口述文本：" : isEn ? "Narrative Transcript:" : "บทบรรยายคำบอกเล่า:"}</strong>
          <p>{isZh ? track.transcript_zh : isEn ? track.transcript_en : track.transcript_th}</p>
        </div>

        {/* Era Selector List */}
        <div className="audio-tracklist">
          <h4>{isZh ? "選擇歷史時期：" : isEn ? "Select Historic Chapter:" : "เลือกบทประวัติศาสตร์ ๑๒๐ ปี:"}</h4>
          <div className="audio-track-buttons">
            {AUDIO_TRACKS.map((t, idx) => (
              <button
                key={t.id}
                className={`audio-chapter-btn ${idx === activeTrackIndex ? 'active' : ''}`}
                onClick={() => handleSelectTrack(idx)}
              >
                <span className="chapter-num">{idx + 1}</span>
                <div className="chapter-info">
                  <strong>{isZh ? t.title_zh : isEn ? t.title_en : t.title_th}</strong>
                  <span>{isZh ? t.era_zh : isEn ? t.era_en : t.era_th}</span>
                </div>
                <span className="chapter-play-icon">{idx === activeTrackIndex && isPlaying ? "🔊" : "▶"}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
