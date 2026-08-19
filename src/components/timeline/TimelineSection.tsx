'use client';

import React, { useState } from 'react';
import { useApp } from '@/lib/store';

const TIMELINE_DATA = {
  "1905": {
    badge_th: "พ.ศ. ๒๔๔๘ - ๒๔๖๕",
    badge_en: "1905 - 1922",
    badge_zh: "1905 - 1922年",
    title_th: 'กำเนิด "โต๊ะเบ๋ง" สู่การก่อสร้างอาคารเต้าหมิงโดยช่างผาว',
    title_en: 'Origins of "Toh Beng" to Dao Ming Schoolhouse Construction by Master Pao',
    title_zh: '從「卓明（โต๊ะเบ๋ง）」創立至「包師傅（ช่างผาว）」掌墨興築校舍',
    desc_th: "เริ่มก่อตั้งอย่างไม่เป็นทางการในปี 2448 ในชื่อโต๊ะเบ๋ง ก่อนเปลี่ยนเป็นเต้าหมิง และจดทะเบียนโรงเรียนราษฎร์ในปี 2463 อาคารหลังปัจจุบันสร้างขึ้นในปี 2465 โดยนายผาว ช่างฝีมือชาวจีนฮกเกี้ยน จากเงินบริจาคของคหบดีเหมืองแร่ตะกั่วป่า ระนอง และภูเก็ต เดิมมุงหลังคากระเบื้องกาบกล้วยและเชิงชายไม้ฉลุ",
    desc_en: "Founded informally in 1905 as Toh Beng, registered as a private academy in 1920. The current schoolhouse was built in 1922 by Hokkien master builder Pao through community donations from tin magnates in Takua Pa, Ranong, and Phuket.",
    desc_zh: "1905年以閩南語「卓明」之名非正式創校，1920年正式更名為「導明」並註冊為私立學校。現存巍峨校舍於1922年由福建名匠「包師傅（นายผาว）」主持建造，資金源自德古巴、拉廊及普吉三地華人錫礦商賈鼎力集資，初建時鋪設芭蕉瓦屋頂並配有精美木雕花邊。",
    photo: "/img/exhibit-zone1-school.jpg",
    caption_th: '"ภาพประวัติศาสตร์: นักเรียนและครูถ่ายภาพร่วมกันหน้าอาคารเต้าหมิง ยุคหลังคากระเบื้องกาบกล้วยดั้งเดิม"',
    caption_en: '"Historic Portrait: First generation students and scholars before the original banana-tile roof architecture"',
    caption_zh: '「歷史珍影：首屆師生齊聚於芭蕉瓦原貌校舍前合影」',
    chips_th: ["🏛️ ช่างผาว ฮกเกี้ยน", "📚 จดทะเบียนราษฎร์ 2463", "🤝 ลงขันเหมืองแร่ 3 เมือง"],
    chips_en: ["🏛️ Master Builder Pao", "📚 Registered Academy 1920", "🤝 3-City Tin Merchant Donors"],
    chips_zh: ["🏛️ 閩南名匠包師傅", "📚 1920年註冊立案", "🤝 三府華商集資興學"]
  },
  "1950": {
    badge_th: "พ.ศ. ๒๔๘๐ - ๒๕๑๐",
    badge_en: "1937 - 1967",
    badge_zh: "1937 - 1967年",
    title_th: "ยุคทองแห่งการศึกษา & กิจกรรมชุมชนตะกั่วป่า",
    title_en: "The Golden Era: Vibrant Education, Sports & Diplomacy",
    title_zh: "教育黃金時代 · 熱血籃球盛會與隆重接待中國總領事",
    desc_th: "เป็นศูนย์กลางการศึกษาภาษาจีน มีนักเรียนหลายร้อยคน มีการจัดกิจกรรมกีฬาบาสเกตบอลเชื่อมความสัมพันธ์ชุมชน และได้รับเกียรติเป็นสถานที่ต้อนรับบุคคลสำคัญ เช่น กงสุลใหญ่สาธารณรัฐจีนประจำสงขลา ในปี พ.ศ. ๒๔๙๓",
    desc_en: "Pioneered Chinese language and ethics education with hundreds of students, famous basketball tournament leagues, and hosted the Consul-General of the Republic of China in 1950.",
    desc_zh: "作為全府華文教育核心，育才數百人，並建有老城最具人氣之紅土籃球場，舉辦盛大社區聯賽。1950年更榮膺全城最高禮遇，於校舍前廊隆重接待中華民國駐宋卡總領事，銘刻歷史外交高光時刻。",
    photo: "/img/exhibit-zone2-consul.jpg",
    caption_th: '"ภาพประวัติศาสตร์: พิธีต้อนรับกงสุลใหญ่ ณ มุขหน้าอาคารเต้าหมิง พ.ศ. ๒๔๙๓"',
    caption_en: '"Historic Portrait: Reception ceremony for the Chinese Consul-General at Dao Ming in 1950"',
    caption_zh: '「歷史珍影：1950年於導明學校前廊盛大接待中國總領事」',
    chips_th: ["🏀 ทีมบาสเกตบอลชุมชน", "📜 ต้อนรับกงสุลจีน 2493", "🌱 ผลิตบุคลากรคุณภาพ"],
    chips_en: ["🏀 Community Basketball", "📜 Chinese Consul Visit 1950", "🌱 Thousands of Alumni"],
    chips_zh: ["🏀 導明熱血籃球隊", "📜 1950年接待總領事", "🌱 培育千百傑出校友"]
  },
  "1990": {
    badge_th: "พ.ศ. ๒๕๓๓ - ๒๕๔๗",
    badge_en: "1990 - 2004",
    badge_zh: "1990 - 2004年",
    title_th: "การจัดตั้งมูลนิธิโรงเรียนเต้าหมิง & การส่งมอบกรรมสิทธิ์",
    title_en: "Establishment of Dao Ming Foundation & Ownership Handover",
    title_zh: "成立導明學校基金會 · 地契全數無償移交為公共財產",
    desc_th: "ปี 2533 จดทะเบียนจัดตั้ง 'มูลนิธิโรงเรียนเต้าหมิง ตะกั่วป่า' โดยมีคุณอนันต์ สวาทยานนท์ เป็นประธานคนแรก และในปี 2542 ทายาทผู้ถือครองที่ดิน สค.1 ทั้ง 3 ท่าน ได้ทำสัญญาประนีประนอมยอมความ ส่งมอบกรรมสิทธิ์ที่ดินและอาคารให้แก่มูลนิธิฯ อย่างถูกต้องตามกฎหมาย",
    desc_en: "In 1990, the Dao Ming Foundation was officially incorporated. In 1999, the three trustee families officially transferred 100% legal ownership of the land and schoolhouse to the foundation for public benefit.",
    desc_zh: "1990年依法註冊成立「德古巴導明學校基金會」，由阿南·沙瓦塔亞農先生出任首屆主席。1999年，原代持地契之三大家族後人秉持先賢奉獻精神，簽署和解協議，將地皮與整座校舍之100%合法產權無償移交基金會，成為德古巴永久公共遺產。",
    photo: "/img/building-community.jpg",
    caption_th: '"ภาพถ่ายอาคารเต้าหมิงคู่กับต้นจามจุรีใหญ่ใจกลางย่านเมืองเก่า"',
    caption_en: '"Dao Ming schoolhouse standing gracefully alongside the ancient rain trees of Takua Pa"',
    caption_zh: '「校舍與大雨樹：百年老校與老城老樹相伴相生之靜謐畫面」',
    chips_th: ["⚖️ ส่งมอบกรรมสิทธิ์ 100%", "🏛️ ก่อตั้งมูลนิธิฯ 2533", "🌿 อนุรักษ์มรดกชุมชน"],
    chips_en: ["⚖️ 100% Land Handover", "🏛️ Foundation Est. 1990", "🌿 Heritage Preservation"],
    chips_zh: ["⚖️ 100%產權無償移交", "🏛️ 1990年成立基金會", "🌿 守護公眾文化資產"]
  },
  "2026": {
    badge_th: "พ.ศ. ๒๕๖๙ (ปัจจุบัน)",
    badge_en: "2026 (Present Day)",
    badge_zh: "2026年 (當代新生)",
    title_th: "บริบทใหม่ในเมืองตะกั่วป่า & รางวัลอนุรักษ์สถาปัตยกรรม ASA ๒๕๖๙",
    title_en: "A New Context in Takua Pa & ASA Conservation Award 2026",
    title_zh: "老城新生語境 · 榮獲2026年泰國暹羅建築師協會國家保護大獎",
    desc_th: "ได้รับ 'รางวัลอนุรักษ์ศิลปสถาปัตยกรรม ประจำปี ๒๕๖๙' จากสมาคมสถาปนิกสยามฯ มุ่งพัฒนาพื้นที่ชั้นล่างเป็น Creative Living Space, ศูนย์เรียนรู้มรดกชุมชน, คราฟต์สตูดิโอ และคาเฟ่ โดยชั้นบนยังคงเป็นพื้นที่ปฏิบัติธรรมอันสงบเงียบ",
    desc_en: "Awarded the National Architectural Conservation Award 2026 by ASA. Ground floors transformed into a living creative space, craft studios, and community cafe, with top floors preserved as a peaceful meditation sanctuary.",
    desc_zh: "榮膺泰國暹羅建築師協會（ASA）「2026年度傑出建築保護大獎」。底層精心規劃為文創新空間、口述歷史展覽館、手作工坊與社區茶飲咖啡館；二樓則保留為清幽靜謐的禪修與交流聖所。",
    photo: "/img/building-current.jpg",
    caption_th: '"อาคารเต้าหมิงหลังการอนุรักษ์ ได้รับรางวัลอนุรักษ์ศิลปสถาปัตยกรรม ประจำปี ๒๕๖๙"',
    caption_en: '"Revitalized Dao Ming Schoolhouse, recipient of the ASA Conservation Award 2026"',
    caption_zh: '「活化後的導明學校：榮獲2026年國家級建築保護殊榮」',
    chips_th: ["🏆 รางวัลอนุรักษ์ ASA 2569", "🎨 Creative Living Space", "☕ คาเฟ่ & ชุมชน"],
    chips_en: ["🏆 ASA Conservation Award", "🎨 Creative Living Space", "☕ Community Cafe"],
    chips_zh: ["🏆 榮獲ASA國家保護獎", "🎨 活態文創生活空間", "☕ 在地茶飲與社區對話"]
  }
};

const YEARS = ["1905", "1950", "1990", "2026"] as const;

const AUDIO_CHAPTERS: Record<string, {
  src: string;
  title_th: string;
  title_en: string;
  title_zh: string;
  transcript_th: string;
  transcript_en: string;
  transcript_zh: string;
}> = {
  "1905": {
    src: "/audio/chapter_1.mp3",
    title_th: 'บทที่ ๑: กำเนิด "โต๊ะเบ๋ง" สู่การลงขันสร้างอาคารโดยช่างผาว (พ.ศ. ๒๔๔๘ - ๒๔๖๕)',
    title_en: 'Chapter 1: Origins of Toh Beng & Master Pao (1905 - 1922)',
    title_zh: '第一章：卓明創校 · 華商集資與包師傅築造紅毛樓 (1905 - 1922)',
    transcript_th: 'ย้อนกลับไปเมื่อร้อยยี่สิบปีก่อน ในยุคที่ตะกั่วป่ายังเป็นเมืองเหมืองแร่ดีบุกอันรุ่งเรืองระดับโลก ท่ามกลางสายน้ำและเรือสำเภา พ่อค้าชาวจีนฮกเกี้ยนได้ร่วมแรงร่วมใจกันลงขัน ก่อตั้งโรงเรียนสอนภาษาจีนแห่งแรกขึ้นในนาม "โต๊ะเบ๋ง" จนกระทั่งปี ๒๔๖๕ นายผาว ช่างฝีมือเอกชาวจีน ได้รังสรรค์อาคารอั้งม่อเหลาหลังนี้ขึ้น ผสานปรัชญาหน้าจั่วจำลองจักรวาล ฟ้า ดิน คน สลักเสาเทียนกงเพื่อดึงพลังบริสุทธิ์จากฟากฟ้า ส่งต่อปัญญาและแสงสว่างอันเป็นนิรันดร์สู่ลูกหลานเมืองตะกั่วป่า',
    transcript_en: 'Over a century ago, Takua Pa was a thriving world-class tin mining capital. Hokkien merchants pooled resources to establish the first Chinese school named "Toh Beng". In 1922, master builder Pao constructed this Ang Mor Lao schoolhouse, embedding Taoist cosmic symbols on the pediment to channel celestial wisdom to future generations.',
    transcript_zh: '溯源一百二十年前，當德古巴仍是名揚四海的錫礦重鎮，在川流不息的商船泊岸處，福建華商先賢同心集資，創設全府首間華文學校「卓明」。至1922年，閩南名匠包師傅掌墨興築這座中西合璧紅毛樓，融合「天地人」三才宇宙觀，立天公柱接引天心浩氣，將永恆的智慧之光世世代代傳承給後代子孫。'
  },
  "1950": {
    src: "/audio/chapter_2.mp3",
    title_th: 'บทที่ ๒: ยุคทองแห่งการศึกษา บาสเกตบอล และการต้อนรับกงสุลจีน (พ.ศ. ๒๔๘๐ - ๒๕๑๐)',
    title_en: 'Chapter 2: The Golden Era, Basketball & Chinese Consul (1937 - 1967)',
    title_zh: '第二章：教育黃金時代 · 熱血籃球與隆重接待中國總領事 (1937 - 1967)',
    transcript_th: 'ยุคทองแห่งการศึกษาและความเกรียงไกร เสียงท่องตำราภาษาจีนและภาษาไทยดังก้องไปทั่วโถงไม้ เต้าหมิงกลายเป็นหัวใจของชุมชนอย่างแท้จริง ที่นี่มีสนามบาสเกตบอลดินที่คึกคักที่สุดในพังงา สร้างนักกีฬาและหล่อหลอมความสามัคคีให้คนรุ่นหลัง และในหน้าประวัติศาสตร์ปี ๒๔๙๓ อาคารแห่งนี้ได้รับเกียรติยศสูงสุด ในการจัดพิธีต้อนรับกงสุลใหญ่สาธารณรัฐจีน จารึกบทบาทศูนย์กลางการทูตและสังคมอันน่าเกรงขามของเมืองเก่า',
    transcript_en: 'The golden age of vibrant education and communal pride. Dao Ming was the heart of the district, featuring Takua Pa’s most popular basketball tournaments and proudly hosting the grand reception of the Chinese Consul-General in 1950.',
    transcript_zh: '一段弦歌不輟、人才輩出的黃金歲月。瑯瑯讀書聲迴盪於木構大廳，導明學校成為凝聚僑社情感的核心。這裡有全府最具活力的紅土籃球場，鍛鍊青年體魄、凝聚社區向心力；1950年，更於前廊隆重接待中華民國駐宋卡總領事，銘刻老城作為政治、外交與文化重鎮的莊嚴篇章。'
  },
  "1990": {
    src: "/audio/chapter_3.mp3",
    title_th: 'บทที่ ๓: จัดตั้งมูลนิธิฯ & การส่งมอบกรรมสิทธิ์ที่ดินเพื่อสาธารณะ (พ.ศ. ๒๕๓๓ - ๒๕๔๗)',
    title_en: 'Chapter 3: Establishment of Dao Ming Foundation & Ownership Handover (1990 - 2004)',
    title_zh: '第三章：成立基金會 · 產權全數無償移交公眾永續傳承 (1990 - 2004)',
    transcript_th: 'มรดกแห่งความเสียสละเพื่อสาธารณประโยชน์ แม้กาลเวลาจะเปลี่ยนผ่าน แต่สายใยแห่งความผูกพันของชุมชนมิเคยจางหาย ในปี ๒๕๓๓ ได้มีการจัดตั้งมูลนิธิโรงเรียนเต้าหมิง ตะกั่วป่า และด้วยจิตวิญญาณอันสูงส่ง ทายาทผู้ถือครองกรรมสิทธิ์ที่ดินทั้ง ๓ ท่าน ได้พร้อมใจกันส่งมอบที่ดินและตัวอาคารทั้งหมด ๑๐๐% ให้เป็นสมบัติส่วนรวมของชุมชนตลอดไป โดยมิคิดมูลค่า เพื่อให้เต้าหมิงเป็นมรดกมีชีวิตของทุกคน',
    transcript_en: 'A testament to altruism. In 1990, the Dao Ming Foundation was established. The 3 trustee families unconditionally transferred 100% legal title of land and schoolhouse to the foundation without compensation, gifting this perpetual heritage to the community.',
    transcript_zh: '一份無私奉獻於公共福祉的崇高遺產。歲月流轉，老城對導明的鄉情永不褪色。1990年正式成立「德古巴導明學校基金會」，原代持地契之三大家族後人深明大義，簽署和解協議，將地皮與整座校舍之100%產權全額無償移交基金會，永為德古巴社區共享之活態遺產。'
  },
  "2026": {
    src: "/audio/chapter_4.mp3",
    title_th: 'บทที่ ๔: บริบทใหม่ในเมืองตะกั่วป่า & รางวัลอนุรักษ์ศิลปสถาปัตยกรรม ๒๕๖๙',
    title_en: 'Chapter 4: Living Heritage Context & ASA Architectural Award 2026',
    title_zh: '第四章：老城新生語境 · 榮獲2026年度泰國國家建築保護大獎',
    transcript_th: 'จากประวัติศาสตร์อันทรงคุณค่า สู่บริบทใหม่แห่งอนาคต วันนี้ โรงเรียนเต้าหมิงได้รับการยกย่องสูงสุด ด้วยรางวัลอนุรักษ์ศิลปสถาปัตยกรรมดีเด่น ประจำปี ๒๕๖๙ จากสมาคมสถาปนิกสยาม ในพระบรมราชูปถัมภ์ ชุบชีวิตอาคารไม้ร้อยปี สู่เต้าหมิง ครีเอทีฟ ฮับ พื้นที่แห่งการเรียนรู้ ชา กาแฟ นิทรรศการ และตลาดสร้างสรรค์ ที่ซึ่งรากเหง้าในอดีต ผสานเข้ากับพลังของคนรุ่นใหม่อย่างงดงามและยั่งยืน',
    transcript_en: 'Honored with the Prestigious Architectural Conservation Award 2026 by ASA, Dao Ming opens its next chapter as a living creative hub, connecting heritage roots with future vibrancy.',
    transcript_zh: '從厚重的歷史篇章，邁向生機盎然的嶄新未來。今日，導明學校榮獲泰國暹羅皇家建築師協會（ASA）「2026年度傑出建築保護大獎」最高榮譽。重煥百年木構建築，蛻變為融合文化展覽、工夫茶席、工藝手作與文創市集的「導明文創樞紐」，讓百年文脈與青年世代的創新能量在此完美交融。'
  }
};

export function TimelineSection() {
  const { lang, setAudioGuideOpen } = useApp();
  const [activeYear, setActiveYear] = useState<(typeof YEARS)[number]>("1905");
  const [isNarrating, setIsNarrating] = useState<boolean>(false);
  const [narrateTime, setNarrateTime] = useState<number>(0);
  const [narrateDuration, setNarrateDuration] = useState<number>(45);
  const [showTranscript, setShowTranscript] = useState<boolean>(false);

  const audioRef = React.useRef<HTMLAudioElement | null>(null);

  const isEn = lang === 'en';
  const isZh = lang === 'zh';
  const data = TIMELINE_DATA[activeYear];
  const audioTrack = AUDIO_CHAPTERS[activeYear];
  const activeIndex = YEARS.indexOf(activeYear);

  // Sync and initialize audio on era change
  React.useEffect(() => {
    if (typeof window === 'undefined') return;

    if (!audioRef.current) {
      audioRef.current = new Audio(audioTrack.src);
    } else {
      const prevPlaying = isNarrating;
      audioRef.current.src = audioTrack.src;
      audioRef.current.load();
      if (prevPlaying) {
        audioRef.current.play().catch(() => setIsNarrating(false));
      }
    }

    const audio = audioRef.current;

    const handleLoaded = () => {
      if (audio.duration && !isNaN(audio.duration)) {
        setNarrateDuration(audio.duration);
      }
    };

    const handleTimeUpdate = () => {
      setNarrateTime(audio.currentTime);
    };

    const handleEnded = () => {
      setIsNarrating(false);
      setNarrateTime(0);
    };

    audio.addEventListener('loadedmetadata', handleLoaded);
    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('loadedmetadata', handleLoaded);
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('ended', handleEnded);
    };
  }, [activeYear]);

  // Handle Play/Pause
  const togglePlayNarration = () => {
    if (!audioRef.current) return;
    if (isNarrating) {
      audioRef.current.pause();
      setIsNarrating(false);
    } else {
      audioRef.current.play().then(() => {
        setIsNarrating(true);
      }).catch(() => {
        setIsNarrating(false);
      });
    }
  };

  const handleSeekNarration = (e: React.ChangeEvent<HTMLInputElement>) => {
    const targetTime = parseFloat(e.target.value);
    setNarrateTime(targetTime);
    if (audioRef.current) {
      audioRef.current.currentTime = targetTime;
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <section className="section section-story" id="story">
      <div className="container">
        <div className="section-heading text-center">
          <div className="section-tag">AUTHENTIC HISTORY & FOUNDATION</div>
          <h2 className="section-title">
            {isZh ? "導明學校百年歷史淵源" : isEn ? "Authentic History of Dao Ming School" : 'ประวัติศาสตร์ความเป็นมา "โรงเรียนเต้าหมิง"'}
          </h2>
          <p className="section-subtitle">
            {isZh
              ? "從攀牙府開山華文學校，到今日老城活態文化地標與榮獲國家建築保護大獎之百年殿堂"
              : isEn 
                ? "From Phang Nga's pioneering Chinese academy to living architectural heritage and civic symbol of Takua Pa"
                : "จากโรงเรียนจีนแห่งแรกของจังหวัดพังงา สู่มรดกทางสถาปัตยกรรมและจิตวิญญาณแห่งความสามัคคีของชุมชน"}
          </p>
        </div>

        {/* 3 Core Narrative Fact Cards */}
        <div className="story-narrative-grid">
          <div className="narrative-card">
            <div className="card-icon-box">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>
            </div>
            <h3>
              {isZh ? "一、從「卓明」到「導明」(1905-1920)" : isEn ? "1. Origins of Toh Beng to Dao Ming (1905-1920)" : "๑. กำเนิด \"โต๊ะเบ๋ง\" สู่ \"เต้าหมิง\" (พ.ศ. ๒๔๔๘ - ๒๔๖๓)"}
            </h3>
            <p>
              {isZh ? (
                <>1905年以閩南語<strong>「卓明（โต๊ะเบ๋ง）」</strong>之名創設，1920年正式更名為<strong>「導明（Dao Ming）」</strong>並註冊立案。<em>「導」</em>意為引領開拓，<em>「明」</em>意為光輝明哲，合之象徵<strong>「導引光明、啟迪智慧之路」</strong>。</>
              ) : isEn ? (
                <>Founded informally in 1905 as <strong>“Toh Beng”</strong> in Hokkien dialect, before transitioning to Mandarin <strong>“Dao Ming” (導明)</strong> and registered in 1920. <em>Dao</em> means path/guidance, <em>Ming</em> means bright illumination, symbolizing <strong>"The Path to Illuminating Wisdom"</strong>.</>
              ) : (
                <>ก่อตั้งอย่างไม่เป็นทางการในปี 2448 เดิมใช้ชื่อสำเนียงฮกเกี้ยนว่า <strong>“โต๊ะเบ๋ง”</strong> ก่อนเปลี่ยนเป็น <strong>“เต้าหมิง”</strong> สำเนียงจีนกลาง และจดทะเบียนเป็นโรงเรียนราษฎร์ในปี 2463 คำว่า <em>เต้า</em> หมายถึง ทาง/ชี้นำ, <em>หมิง</em> หมายถึง แสงสว่าง/ความเข้าใจ รวมกันคือ <strong>"เส้นทางสู่แสงสว่างแห่งปัญญา"</strong></>
              )}
            </p>
          </div>

          <div className="narrative-card">
            <div className="card-icon-box">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
            </div>
            <h3>
              {isZh ? "二、紅毛樓建築與包師傅 (1922)" : isEn ? "2. Ang Mor Lao Architecture & Master Pao (1922)" : "๒. สถาปัตยกรรมอั้งม่อเหลา & ช่างผาว (พ.ศ. ๒๔๖๕)"}
            </h3>
            <p>
              {isZh ? (
                <>現存校舍建於1922年，由閩南名匠<strong>包師傅（ช่างผาว）</strong>精心構築，由德古巴、拉廊、普吉礦商共同籌資。建築採中西合璧「紅毛樓（Ang Mor Lao）」殖民樣式，運用早期鋼筋混凝土、雙層外廊及希臘柱頭，宏偉端莊。</>
              ) : isEn ? (
                <>Constructed in 1922 by Hokkien master builder <strong>Master Pao</strong>, funded through collective donations from tin miners across Takua Pa, Ranong, and Phuket. Features Sino-Colonial Ang Mor Lao architecture with early reinforced concrete, Greek order capitals, and perimeter verandas.</>
              ) : (
                <>อาคารหลังปัจจุบัน (หลังที่ 2) สร้างเมื่อปี 2465 โดย <strong>"นายผาว"</strong> ช่างฝีมือชาวจีนฮกเกี้ยน ทุนทรัพย์จากการลงขันของพ่อค้าเหมืองแร่ในตะกั่วป่า ระนอง และภูเก็ต อาคารเป็นรูปแบบอั้งม่อเหลาประยุกต์โคโลเนียล ใช้คอนกรีตเสริมเหล็กยุคแรก ผนังก่ออิฐ มุขยื่น 2 ชั้น ระเบียงรอบ และประดับหัวเสาแบบกรีก</>
              )}
            </p>
          </div>

          <div className="narrative-card">
            <div className="card-icon-box">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
            </div>
            <h3>
              {isZh ? "三、公共信託與基金會全額產權移交" : isEn ? "3. Public Trust & 100% Foundation Handover" : "๓. โครงสร้างที่ดิน & มูลนิธิเพื่อสาธารณะ"}
            </h3>
            <p>
              {isZh ? (
                <>地皮由早期多個華商家族合資購得並信託託管。1990年成立<strong>「導明學校基金會」</strong>，1999年三大家族後人正式簽署協議，將地皮與校舍100%產權全額無償移交基金會，永續回饋德古巴社區。</>
              ) : isEn ? (
                <>The land was collectively purchased by Chinese mining families held in trust. In 1990, the <strong>Dao Ming Foundation</strong> was founded, and in 1999 the 3 trustee families officially transferred 100% full legal title of land and schoolhouse to the foundation for permanent public benefit.</>
              ) : (
                <>ที่ดินเกิดจากการร่วมซื้อของชาวจีนหลายครอบครัว ถือครอง สค.1 ในนามคนไทย 3 คน เพื่อเป็น <strong>"มรดกของลูกหลานตะกั่วป่า"</strong> ในปี 2533 ได้จัดตั้ง <strong>"มูลนิธิโรงเรียนเต้าหมิง ตะกั่วป่า"</strong> และในปี 2542 ทายาททั้ง 3 ท่านได้ส่งมอบกรรมสิทธิ์ที่ดินและอาคารให้แก่มูลนิธิฯ อย่างสมบูรณ์ 100%</>
              )}
            </p>
          </div>
        </div>

        {/* Interactive History Timeline */}
        <div className="timeline-container">
          <div className="timeline-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
            <div>
              <h3>{isZh ? "導明學校120年編年史 (120-Year Milestones)" : isEn ? "120-Year Chronological Milestones" : "ลำดับกาลเวลา ๑๒๐ ปี เต้าหมิง (Chronological Milestones)"}</h3>
              <p>{isZh ? "點選各個時期，探索歷史文獻與珍貴原照" : isEn ? "Click through each era to study historical milestones and photographic evidence" : "คลิกเลือกยุคสมัยเพื่อศึกษาประวัติศาสตร์และหลักฐานที่บันทึกไว้"}</p>
            </div>
            <button
              className="btn btn-outline-sm"
              onClick={() => setAudioGuideOpen(true)}
              style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}
            >
              <span>🎧</span>
              <span>{isZh ? "收聽歷史口述原音導覽 (Audio Guide)" : isEn ? "Listen to Oral History Guide" : "ฟังเสียงบันทึกคำบอกเล่า (Audio Guide)"}</span>
            </button>
          </div>

          <div className="timeline-nav" id="timelineNav">
            <button className={`timeline-btn ${activeYear === '1905' ? 'active' : ''}`} onClick={() => setActiveYear('1905')}>
              <span className="tl-year">1905 - 1922</span>
              <span className="tl-label">{isZh ? "卓明創校 & 包師傅" : isEn ? "Toh Beng & Master Pao" : "โต๊ะเบ๋งสู่เต้าหมิง & ช่างผาว"}</span>
            </button>
            <button className={`timeline-btn ${activeYear === '1950' ? 'active' : ''}`} onClick={() => setActiveYear('1950')}>
              <span className="tl-year">1937 - 1967</span>
              <span className="tl-label">{isZh ? "教育黃金期 & 接待總領事" : isEn ? "Community Hub & Diplomacy" : "ศูนย์กลางชุมชน & รับรองกงสุล"}</span>
            </button>
            <button className={`timeline-btn ${activeYear === '1990' ? 'active' : ''}`} onClick={() => setActiveYear('1990')}>
              <span className="tl-year">1990 - 2004</span>
              <span className="tl-label">{isZh ? "成立基金會 & 產權移交" : isEn ? "Foundation & Conservation" : "จัดตั้งมูลนิธิฯ & บูรณะอาคาร"}</span>
            </button>
            <button className={`timeline-btn ${activeYear === '2026' ? 'active' : ''}`} onClick={() => setActiveYear('2026')}>
              <span className="tl-year">{isZh ? "當代 & ASA大獎" : isEn ? "Present & ASA" : "ปัจจุบัน & รางวัล ASA"}</span>
              <span className="tl-label">{isZh ? "老城新生語境" : isEn ? "Living Heritage Context" : "บริบทใหม่ & มรดกที่มีชีวิต"}</span>
            </button>
          </div>

          <div className="timeline-content-box" id="timelineContent">
            <div className="tl-detail-grid">
              <div className="tl-text">
                <span className="tl-badge-year" id="tlBadgeYear">{isZh ? data.badge_zh : isEn ? data.badge_en : data.badge_th}</span>
                <h4 id="tlTitle">{isZh ? data.title_zh : isEn ? data.title_en : data.title_th}</h4>
                <p id="tlDesc">{isZh ? data.desc_zh : isEn ? data.desc_en : data.desc_th}</p>
                <div className="tl-meta-chips" id="tlChips">
                  {(isZh ? data.chips_zh : isEn ? data.chips_en : data.chips_th).map((c, i) => (
                    <span key={i} className="chip">{c}</span>
                  ))}
                </div>

                {/* Inline Oral History Narration Audio Player Card */}
                <div className={`inline-narration-card ${isNarrating ? 'playing' : ''}`}>
                  <div className="narration-player-header">
                    <div className="narration-title-group">
                      <span className="narration-badge">
                        <span className="narration-live-dot"></span>
                        🎧 {isZh ? "歷史口述原音" : isEn ? "ORAL HISTORY AUDIO" : "เสียงบรรยายประวัติศาสตร์"}
                      </span>
                      <span className="narration-track-name">
                        {isZh ? audioTrack.title_zh : isEn ? audioTrack.title_en : audioTrack.title_th}
                      </span>
                    </div>

                    <button
                      className="narration-transcript-toggle"
                      onClick={() => setShowTranscript(!showTranscript)}
                      title="ดูบทบรรยาย"
                    >
                      {showTranscript ? (isZh ? "收起文字" : isEn ? "Hide Text" : "ซ่อนบทบรรยาย") : (isZh ? "📜 查閱全文" : isEn ? "📜 View Transcript" : "📜 อ่านบทบรรยาย")}
                    </button>
                  </div>

                  <div className="narration-controls-row">
                    <button
                      className="narration-play-btn"
                      onClick={togglePlayNarration}
                      aria-label="Play Narration Audio"
                      title={isNarrating ? "หยุดชั่วคราว" : "กดฟังเสียงบรรยาย"}
                    >
                      <span className="play-icon">{isNarrating ? "⏸" : "▶"}</span>
                      <span className="play-label">
                        {isNarrating
                          ? (isZh ? "暫停收聽" : isEn ? "Pause Audio" : "หยุดชั่วคราว")
                          : (isZh ? "點擊收聽原音" : isEn ? "Play Narration" : "กดฟังเสียงบรรยาย")}
                      </span>
                    </button>

                    <div className="narration-progress-group">
                      <input
                        type="range"
                        min="0"
                        max={narrateDuration || 100}
                        step="0.1"
                        value={narrateTime}
                        onChange={handleSeekNarration}
                        className="narration-progress-slider"
                      />
                      <div className="narration-time-display">
                        <span>{formatTime(narrateTime)}</span>
                        <span>/</span>
                        <span>{formatTime(narrateDuration)}</span>
                      </div>
                    </div>
                  </div>

                  {showTranscript && (
                    <div className="narration-transcript-box">
                      <p>
                        {isZh ? audioTrack.transcript_zh : isEn ? audioTrack.transcript_en : audioTrack.transcript_th}
                      </p>
                    </div>
                  )}
                </div>
              </div>
              <div className="tl-photo-card">
                <div className="photo-real-card">
                  <img src={data.photo} alt={isZh ? data.title_zh : isEn ? data.title_en : data.title_th} className="timeline-illustration-img" id="tlPhotoImg" />
                  <div className="photo-caption-inner" id="tlPhotoCaption">
                    {isZh ? data.caption_zh : isEn ? data.caption_en : data.caption_th}
                  </div>
                </div>
              </div>
            </div>

            {/* Step Nav Bar */}
            <div className="tl-step-nav-bar">
              <button
                className="tl-step-btn tl-step-prev"
                disabled={activeIndex === 0}
                onClick={() => setActiveYear(YEARS[Math.max(0, activeIndex - 1)])}
              >
                <span className="tl-step-arrow">←</span>
                <span className="tl-step-text">{isZh ? "上一時期" : isEn ? "Previous Era" : "ยุคก่อนหน้า"}</span>
              </button>

              <div className="tl-step-dots">
                {YEARS.map(y => (
                  <button
                    key={y}
                    className={`tl-dot ${activeYear === y ? 'active' : ''}`}
                    onClick={() => setActiveYear(y)}
                    aria-label={`Year ${y}`}
                  />
                ))}
              </div>

              <button
                className="tl-step-btn tl-step-next"
                disabled={activeIndex === YEARS.length - 1}
                onClick={() => setActiveYear(YEARS[Math.min(YEARS.length - 1, activeIndex + 1)])}
              >
                <span className="tl-step-text">{isZh ? "下一時期" : isEn ? "Next Era" : "ยุคถัดไป"}</span>
                <span className="tl-step-arrow">→</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
