'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '@/lib/store';
import { soundEngine } from '@/lib/audio';

interface TourZone {
  id: string;
  name_th: string;
  name_en: string;
  image: string;
  subtitle_th: string;
  subtitle_en: string;
  beacons: {
    x: number; // percentage
    y: number;
    title_th: string;
    title_en: string;
    desc_th: string;
    desc_en: string;
  }[];
}

const TOUR_ZONES: TourZone[] = [
  {
    id: 'hall',
    name_th: 'โถงอาคารไม้ประวัติศาสตร์ (Zone A)',
    name_en: 'Main Heritage Timber Hall (Zone A)',
    image: '/img/exhibit-zone1-school.jpg',
    subtitle_th: 'ชั้นล่าง · ไม้เนื้อแข็งขัดเงา บานเกล็ดรับลม ๔ ทิศทาง',
    subtitle_en: 'Ground Floor · Polished timber flooring & 4-way cross-ventilation',
    beacons: [
      {
        x: 28,
        y: 42,
        title_th: 'เสาไม้หลุมพีและโครงสร้างคอนกรีตยุคแรก',
        title_en: 'Ironwood Pillars & Early Reinforced Concrete',
        desc_th: 'เสาไม้และคานรับน้ำหนักอายุ ๑๐๔ ปี ก่อสร้างโดยช่างผาว ผสานเทคนิคเข้าไม้แบบฮกเกี้ยน',
        desc_en: '104-year-old loadbearing timber pillars built by Master Pao using traditional joinery.'
      },
      {
        x: 68,
        y: 35,
        title_th: 'บานเกล็ดไม้ระบายลมโบราณ (Sino Louver)',
        title_en: 'Traditional Sino Louver Ventilation',
        desc_th: 'หน้าต่างบานเกล็ดไม้สองชั้นที่เปิดรับลมธรรมชาติจากแม่น้ำตะกั่วป่า ทำให้อาคารเย็นสบายตลอดวัน',
        desc_en: 'Double wooden louvers channeling river breezes, keeping the hall naturally cool.'
      },
      {
        x: 50,
        y: 65,
        title_th: 'โต๊ะสนทนาและโถงนิทรรศการมีชีวิต',
        title_en: 'Community Sharing Table & Living Hall',
        desc_th: 'พื้นที่จัดแสดงภาพถ่ายประวัติศาสตร์และโต๊ะเสวนาระหว่างลูกหลานชุมชน',
        desc_en: 'Interactive space hosting historic photography exhibitions and civic discussions.'
      }
    ]
  },
  {
    id: 'veranda',
    name_th: 'ระเบียงมุขยื่น ๒ ชั้น & ลานหน้า (Zone E & B)',
    name_en: 'Double Porch & Courtyard Veranda',
    image: '/img/building-community.jpg',
    subtitle_th: 'มุขหน้าสถาปัตยกรรมอั้งม่อเหลา หัวเสากรีกโบราณ',
    subtitle_en: 'Front portico with classical capitals overlooking historic road',
    beacons: [
      {
        x: 50,
        y: 20,
        title_th: 'หน้าจั่วจำลองจักรวาล ฟ้า-ดิน-คน',
        title_en: 'Cosmic Gable Facade',
        desc_th: 'หน้าจั่วประดับปูนปั้นเสาเทียนกงและลายเมฆมงคลตามคติเต๋า',
        desc_en: 'Pediment stucco featuring Tiangong celestial pillar and auspicious cloud scrolls.'
      },
      {
        x: 35,
        y: 48,
        title_th: 'หัวเสาแบบกรีก (Classical Orders)',
        title_en: 'Classical Ionic Capitals',
        desc_th: 'การผสมผสานศิลปะสากลเข้ากับอาคารจีนสาธารณะแห่งแรกของพังงา',
        desc_en: 'Western neoclassical architectural order combined with Chinese public building traditions.'
      },
      {
        x: 65,
        y: 72,
        title_th: 'ลานอิฐโบราณและสนามหญ้ากิจกรรม',
        title_en: 'Heritage Brick Courtyard',
        desc_th: 'ลานกว้างสำหรับจัดตลาดนัดครีเอทีฟและฉายภาพยนตร์กลางแปลงยามค่ำคืน',
        desc_en: 'Spacious open courtyard for weekend artisan markets and moonlight cinema.'
      }
    ]
  }
];

export function VirtualTourModal() {
  const { lang, isVirtualTourOpen, setVirtualTourOpen, showToast } = useApp();
  const [activeZoneId, setActiveZoneId] = useState<string>('hall');
  const [panX, setPanX] = useState<number>(0);
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [activeBeacon, setActiveBeacon] = useState<TourZone['beacons'][0] | null>(null);
  const [isAudioPlaying, setIsAudioPlaying] = useState<boolean>(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef<boolean>(false);
  const startX = useRef<number>(0);

  if (!isVirtualTourOpen) return null;

  const isEn = lang === 'en';
  const currentZone = TOUR_ZONES.find(z => z.id === activeZoneId) || TOUR_ZONES[0];

  const handleMouseDown = (e: React.MouseEvent) => {
    isDragging.current = true;
    startX.current = e.clientX - panX;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current) return;
    const newPan = e.clientX - startX.current;
    // Bound pan between -120 and 120
    setPanX(Math.max(-140, Math.min(140, newPan)));
  };

  const handleMouseUp = () => {
    isDragging.current = false;
  };

  useEffect(() => {
    return () => {
      soundEngine.stopAmbientAtmosphere();
    };
  }, []);

  const toggleAtmosphereAudio = () => {
    const nextState = !isAudioPlaying;
    setIsAudioPlaying(nextState);
    if (nextState) {
      soundEngine.startAmbientAtmosphere();
      showToast(isEn ? "🍃 Playing ambient courtyard soundscape..." : "🍃 เปิดเสียงบรรยากาศจำลองลมพัด & ระฆังลมกู่เจิง");
    } else {
      soundEngine.stopAmbientAtmosphere();
      showToast(isEn ? "Soundscape muted." : "ปิดเสียงบรรยากาศจำลองเรียบร้อย");
    }
  };

  return (
    <div className="virtual-tour-modal open" id="virtualTourModal">
      <div className="tour-backdrop" onClick={() => setVirtualTourOpen(false)}></div>
      
      <div className="tour-dialog">
        {/* Header Bar */}
        <div className="tour-header-bar">
          <div className="tour-title-group">
            <span className="tour-live-tag">
              <span className="pulsing-dot"></span>
              <span>360° SPATIAL EXPLORER</span>
            </span>
            <h3>{isEn ? currentZone.name_en : currentZone.name_th}</h3>
            <p>{isEn ? currentZone.subtitle_en : currentZone.subtitle_th}</p>
          </div>

          <div className="tour-header-actions">
            <button
              className={`tour-sound-btn ${isAudioPlaying ? 'active' : ''}`}
              onClick={toggleAtmosphereAudio}
              title="เสียงบรรยากาศเมืองเก่า"
            >
              <span>{isAudioPlaying ? "🔊" : "🔈"}</span>
              <span>{isAudioPlaying ? (isEn ? "Atmosphere ON" : "เสียงบรรยากาศ: เปิด") : (isEn ? "Atmosphere OFF" : "เสียงบรรยากาศ: ปิด")}</span>
            </button>
            <button
              className="tour-close-btn"
              onClick={() => setVirtualTourOpen(false)}
              aria-label="ปิดทัวร์ 360°"
            >
              &times;
            </button>
          </div>
        </div>

        {/* Room Switcher Tabs */}
        <div className="tour-tabs-bar">
          {TOUR_ZONES.map(z => (
            <button
              key={z.id}
              className={`tour-tab-btn ${z.id === activeZoneId ? 'active' : ''}`}
              onClick={() => {
                setActiveZoneId(z.id);
                setActiveBeacon(null);
                setPanX(0);
              }}
            >
              <span>{isEn ? z.name_en : z.name_th}</span>
            </button>
          ))}
        </div>

        {/* Viewport Canvas Area */}
        <div
          className="tour-viewport-stage"
          ref={containerRef}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          style={{ cursor: isDragging.current ? 'grabbing' : 'grab' }}
        >
          <div
            className="tour-pan-wrapper"
            style={{
              transform: `translateX(${panX}px) scale(${zoomLevel})`,
              transition: isDragging.current ? 'none' : 'transform 0.3s ease-out'
            }}
          >
            <img
              src={currentZone.image}
              alt={isEn ? currentZone.name_en : currentZone.name_th}
              className="tour-pano-img"
              draggable={false}
            />

            {/* Interactive Beacons */}
            {currentZone.beacons.map((b, idx) => (
              <button
                key={idx}
                className="tour-beacon-pin"
                style={{ top: `${b.y}%`, left: `${b.x}%` }}
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveBeacon(b);
                }}
                aria-label={isEn ? b.title_en : b.title_th}
              >
                <span className="beacon-pulse"></span>
                <span className="beacon-dot">✦</span>
              </button>
            ))}
          </div>

          {/* Beacon Information Popover */}
          {activeBeacon && (
            <div className="tour-beacon-card">
              <button className="beacon-close" onClick={() => setActiveBeacon(null)}>&times;</button>
              <span className="beacon-tag">🏛️ จุดสถาปัตยกรรมสำคัญ</span>
              <h4>{isEn ? activeBeacon.title_en : activeBeacon.title_th}</h4>
              <p>{isEn ? activeBeacon.desc_en : activeBeacon.desc_th}</p>
            </div>
          )}

          {/* Viewport Controls Overlay */}
          <div className="tour-viewport-ctrls">
            <div className="tour-pan-hint">
              <span>↔️ {isEn ? "Drag left/right to pan 360°" : "ลากเมาส์ / ปัดซ้ายขวาเพื่อหมุนมุมมอง"}</span>
            </div>
            <div className="tour-zoom-btns">
              <button onClick={() => setZoomLevel(prev => Math.min(1.4, prev + 0.15))} title="ซูมเข้า">+</button>
              <button onClick={() => setZoomLevel(prev => Math.max(0.85, prev - 0.15))} title="ซูมออก">−</button>
              <button onClick={() => { setZoomLevel(1); setPanX(0); }} title="รีเซ็ต">⟲</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
