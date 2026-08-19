import QRCode from 'qrcode';
import { INITIAL_IDEAS } from '@/data/ideas';
import { EVENTS_LIST } from '@/data/events';
import { ARCHIVE_PHOTOS } from '@/data/archive';
import { GABLE_SYMBOLS } from '@/data/gables';
import { EventItem, ArchivePhoto, GableSymbol, SystemUser, UserRole, UserStatus, AuditLogEntry, AuditActionType } from '@/types';

export const DEFAULT_AUDIT_LOGS: AuditLogEntry[] = [
  {
    id: "log-init-01",
    timestamp: "2026-08-19T00:00:00.000Z",
    user_id: "user-superadmin-01",
    username: "admin",
    full_name: "ผู้ดูแลระบบสูงสุด (Super Admin)",
    role: "superadmin",
    action_type: "AUTH",
    module: "system",
    module_name_th: "ระบบหลัก",
    description: "ระบบเปิดใช้งานการบันทึก Audit Logs และการควบคุมสิทธิ์ความปลอดภัย",
    details: "เริ่มต้นระบบฐานข้อมูลมรดกเต้าหมิงและศูนย์บันทึกประวัติการแก้ไข"
  }
];

export const DEFAULT_USERS: SystemUser[] = [
  {
    id: "user-superadmin-01",
    username: "admin",
    password: "takuapa2569",
    full_name: "ผู้ดูแลระบบสูงสุด (Super Admin)",
    role: "superadmin",
    status: "active",
    phone: "0813703883",
    email: "pook.kanokpon@gmail.com",
    department: "คณะกรรมการมูลนิธิโรงเรียนเต้าหมิง",
    created_at: "2026-08-01T00:00:00.000Z",
    notes: "บัญชีผู้ดูแลระบบสูงสุด มีสิทธิ์แต่งตั้งและจัดการสิทธิ์สมาชิกทุกคน"
  },
  {
    id: "user-officer-01",
    username: "officer_heritage",
    password: "daoming2026",
    full_name: "เจ้าหน้าที่มรดกวัฒนธรรม (Heritage Officer)",
    role: "officer",
    status: "active",
    phone: "081-998-1122",
    email: "heritage@daominghub.org",
    department: "ฝ่ายกิจกรรม & คลังภาพ",
    created_at: "2026-08-10T00:00:00.000Z",
    notes: "สิทธิ์จัดการกิจกรรม คลังภาพ และตรวจสอบตั๋ว"
  },
  {
    id: "user-staff-01",
    username: "staff_takuapa",
    password: "2465",
    full_name: "เจ้าหน้าที่ต้อนรับ & สแกนตั๋วหน้างาน",
    role: "staff",
    status: "active",
    phone: "076-421-305",
    email: "staff@daominghub.org",
    department: "ฝ่ายต้อนรับ & ทะเบียน",
    created_at: "2026-08-15T00:00:00.000Z",
    notes: "สิทธิ์สแกน QR Code ตั๋ว และเช็คอินผู้เข้าร่วม"
  }
];

export interface SiteCopyData {
  // HERO SECTION
  hero_award_th: string;
  hero_award_en: string;
  hero_award_zh: string;
  hero_badge_th: string;
  hero_badge_en: string;
  hero_badge_zh: string;
  hero_title_th: string;
  hero_title_en: string;
  hero_title_zh: string;
  hero_desc_th: string;
  hero_desc_en: string;
  hero_desc_zh: string;
  hero_stat_1_val: string;
  hero_stat_1_lbl_th: string;
  hero_stat_1_lbl_en: string;
  hero_stat_1_lbl_zh: string;
  hero_stat_2_val: string;
  hero_stat_2_lbl_th: string;
  hero_stat_2_lbl_en: string;
  hero_stat_2_lbl_zh: string;

  // GABLE SECTION
  gable_tag: string;
  gable_title_th: string;
  gable_title_en: string;
  gable_title_zh: string;
  gable_subtitle_th: string;
  gable_subtitle_en: string;
  gable_subtitle_zh: string;

  // TIMELINE & STORIES SECTION
  story_tag: string;
  story_title_th: string;
  story_title_en: string;
  story_title_zh: string;
  story_subtitle_th: string;
  story_subtitle_en: string;
  story_subtitle_zh: string;

  // VISION SECTION
  vision_tag: string;
  vision_title_th: string;
  vision_title_en: string;
  vision_title_zh: string;
  vision_subtitle_th: string;
  vision_subtitle_en: string;
  vision_subtitle_zh: string;

  // CONTACT & FOOTER
  contact_phone: string;
  contact_email: string;
  contact_address_th: string;
  contact_address_en: string;
  contact_hours_th: string;
  contact_hours_en: string;
}

export const DEFAULT_SITE_COPY: SiteCopyData = {
  // HERO SECTION
  hero_award_th: "รางวัลอนุรักษ์ศิลปสถาปัตยกรรม ประจำปี ๒๕๖๙ · สมาคมสถาปนิกสยามฯ (ASA)",
  hero_award_en: "Architectural Conservation Award 2026 · The Association of Siamese Architects (ASA)",
  hero_award_zh: "泰國暹羅皇家建築師協會 (ASA) 2026年度傑出建築保護大獎",

  hero_badge_th: "โรงเรียนจีนแห่งแรกและแห่งเดียวของ จ.พังงา · ก่อตั้ง พ.ศ. ๒๔๔๘ / อาคาร พ.ศ. ๒๔๖๕",
  hero_badge_en: "First & Only Chinese School in Phang Nga · Founded 1905 / Building 1922",
  hero_badge_zh: "攀牙府首所也是唯一百年華校 · 1905年創辦 / 1922年建校舍",

  hero_title_th: "คืนชีวิตให้ เส้นทางแห่งแสงสว่าง เติมพลังสร้างสรรค์สู่อนาคต",
  hero_title_en: "Revitalizing a Century-Old Path of Light · Empowering a Creative Future",
  hero_title_zh: "重煥百年 明德指引之路 · 賦能老城文創 永續未來",

  hero_desc_th: "จาก \"โต๊ะเบ๋ง\" สู่ \"เต้าหมิง\" โรงเรียนจีนแห่งแรกของจังหวัดพังงาที่สร้างขึ้นโดยการลงขันของคหบดีเหมืองแร่และช่างผาวในปี 2465 สู่การเป็น มรดกที่มีชีวิต (Living Heritage) ภายใต้มูลนิธิโรงเรียนเต้าหมิง ตะกั่วป่า เพื่อการเรียนรู้ วัฒนธรรม และพื้นที่สร้างสรรค์ของทุกคน",
  hero_desc_en: "From \"Toh Beng\" to \"Dao Ming\", the premier Chinese academy in Phang Nga founded by tin mining merchants and Master Pao in 1922, thoughtfully transformed into a Living Heritage cultural & creative hub for all generations.",
  hero_desc_zh: "從「卓明（โต๊ะเบ๋ง）」到「導明（導明學校）」——這所於1922年由華人礦商集資、閩南名匠包師傅親手築造的攀牙府開山華校，如今在基金會守護下全面活化，蛻變為凝聚跨世代情感與文創能量的「活態文化遺產（Living Heritage）」。",

  hero_stat_1_val: "120+",
  hero_stat_1_lbl_th: "ปี นับแต่เริ่มก่อตั้ง พ.ศ. 2448 (โต๊ะเบ๋ง)",
  hero_stat_1_lbl_en: "Years of Legacy since 1905 (Toh Beng)",
  hero_stat_1_lbl_zh: "年歷史厚度 (自1905年創辦)",

  hero_stat_2_val: "1922",
  hero_stat_2_lbl_th: "ปีสร้างอาคารอั้งม่อเหลา โดยนายผาว",
  hero_stat_2_lbl_en: "Year Schoolhouse Built by Master Pao",
  hero_stat_2_lbl_zh: "年包師傅掌墨興建紅毛樓校舍",

  // GABLE SECTION
  gable_tag: "COSMIC FACADE PHILOSOPHY",
  gable_title_th: "ถอดรหัสปรัชญาหน้าจั่ว: \"ภาพจำลองจักรวาล ฟ้า-ดิน-คน\"",
  gable_title_en: "Decoding the Cosmic Facade: \"Universe, Heaven, Earth & Humanity\"",
  gable_title_zh: "解碼山牆哲學：「宇宙、天地人三才圖象」",

  gable_subtitle_th: "หน้าจั่วอาคารเต้าหมิงได้รับการออกแบบอย่างลึกซึ้งตามคติเต๋าและปรัชญาจีนโบราณ สื่อถึงพลังงาน ปัญญา และการศึกษา",
  gable_subtitle_en: "The Dao Ming pediment embodies deep Taoist cosmology and Chinese philosophy, channeling cosmic wisdom and perpetual education.",
  gable_subtitle_zh: "導明學校山牆深度融匯道家宇宙觀與中華傳統哲學，象徵接引天心靈氣、生生不息啟迪後進。",

  // TIMELINE & STORIES SECTION
  story_tag: "TIMELINE & HERITAGE",
  story_title_th: "ลำดับกาลเวลา ๑๒๐ ปี เต้าหมิง (Chronological Milestones)",
  story_title_en: "120-Year Milestones: The Journey of Dao Ming",
  story_title_zh: "導明學校120年歷史篇章 (Chronological Milestones)",

  story_subtitle_th: "จากโรงเรียนจีนแห่งแรกของพังงาสู่รางวัลอนุรักษ์สถาปัตยกรรมระดับชาติ พ.ศ. ๒๕๖๙",
  story_subtitle_en: "From the first Chinese academy in Phang Nga to the National Architectural Conservation Award 2026.",
  story_subtitle_zh: "從攀牙府首座華校到榮獲2026年國家級建築保護殊榮的世紀歷程。",

  // VISION SECTION
  vision_tag: "REVITALIZATION & LIVING HERITAGE",
  vision_title_th: "โครงการ: \"เต้าหมิง - บริบทใหม่ในเมืองตะกั่วป่า\"",
  vision_title_en: "Project: \"Dao Ming - A Living Heritage in Takua Pa\"",
  vision_title_zh: "活化願景：「導明 · 老城新生新語境」",

  vision_subtitle_th: "การฟื้นฟูมรดกที่มีชีวิต ผสานการอนุรักษ์เชิงกายภาพ คุณค่าทางวัฒนธรรม การท่องเที่ยวเชิงนิเวศ และการมีส่วนร่วมของชุมชน",
  vision_subtitle_en: "Living heritage revitalisation integrating architectural conservation, cultural identity, eco-tourism, and community engagement.",
  vision_subtitle_zh: "融合建築本體修復、文化認同復興、生態慢遊與跨世代社群參與的活態遺產典範。",

  // CONTACT & FOOTER
  contact_phone: "0813703883",
  contact_email: "pook.kanokpon@gmail.com",
  contact_address_th: "ถนนศรีตะกั่วป่า ตำบลตลาดใหญ่ อำเภอตะกั่วป่า จังหวัดพังงา 82110",
  contact_address_en: "Sri Takua Pa Road, Talad Yai, Takua Pa District, Phang Nga 82110, Thailand",
  contact_hours_th: "เปิดทำการทุกวัน 09:00 - 17:30 น. (โซนคาเฟ่ & นิทรรศการ)",
  contact_hours_en: "Daily 09:00 AM - 05:30 PM (Cafe & Living Museum)"
};

export const DEFAULT_TIMELINE_DATA: Record<string, any> = {
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

export interface ClientBooking {
  id: string;
  ticket_code: string;
  event_id: string;
  event_title: string;
  event_title_en?: string;
  event_category?: string;
  guest_name: string;
  guest_phone: string;
  guest_email?: string;
  seats: number;
  tea_blend?: string;
  pastry_type?: string;
  status: string;
  checked_in: number;
  checked_in_at: string | null;
  admin_notes?: string;
  created_at: string;
  qr_data_url?: string;
}

export interface ClientIdea {
  id: number;
  title_th: string;
  title_en: string;
  title_zh?: string;
  desc_th: string;
  desc_en: string;
  desc_zh?: string;
  author_th: string;
  author_en?: string;
  author_zh?: string;
  date_th?: string;
  date_en?: string;
  date_zh?: string;
  category_th: string;
  category_en: string;
  category_zh?: string;
  votes: number;
  status?: string;
  hasVoted?: boolean;
  created_at?: string;
}

// =========================================================================
// PERMANENT STORAGE ENGINE (Survives Git Pushes & Builds)
// =========================================================================
const MASTER_KEYS = {
  BOOKINGS: 'daoming_permanent_bookings_master',
  IDEAS: 'daoming_permanent_ideas_master',
  SEATS: 'daoming_permanent_seats_master',
  EVENTS: 'daoming_permanent_events_master',
  ARCHIVE: 'daoming_permanent_archive_master',
  SITE_COPY: 'daoming_permanent_site_copy_master',
  GABLES: 'daoming_permanent_gables_master',
  TIMELINE: 'daoming_permanent_timeline_master',
  USERS: 'daoming_permanent_users_master',
  AUDIT_LOGS: 'daoming_permanent_audit_logs_master',
};

const LEGACY_KEYS = {
  BOOKINGS: ['daoming_bookings_store_v2', 'daoming_bookings_store', 'daoming_bookings'],
  IDEAS: ['daoming_ideas_store_v2', 'daoming_ideas_store', 'daoming_ideas'],
  EVENTS: ['daoming_events_store_v2', 'daoming_events_store', 'daoming_events'],
};

const DEFAULT_BOOKINGS: ClientBooking[] = [
  {
    id: "1",
    ticket_code: "DM-VIP-8801",
    event_id: "tea_afternoon",
    event_title: "🍵 ชวนจิบชาเปอยี่ & สนทนามรดกเต้าหมิง",
    event_title_en: "Heritage Tea Tasting & Storytelling Circle",
    event_category: "workshop",
    guest_name: "คุณวิเชียร ตันติวิท (ศิษย์เก่ารุ่น 24)",
    guest_phone: "081-445-9988",
    guest_email: "wichian.t@gmail.com",
    seats: 2,
    tea_blend: "ชากวนอิมโบราณคั่วถ่าน (Guan Yin Charcoal)",
    pastry_type: "ขนมเต้าส้อไส้เค็มไข่เค็ม",
    status: "confirmed",
    checked_in: 1,
    checked_in_at: "2026-08-18 14:15:00",
    admin_notes: "แขกพิเศษของมูลนิธิฯ จัดเตรียมชาชุดพิเศษ",
    created_at: "2026-08-15 11:20:00"
  },
  {
    id: "2",
    ticket_code: "DM-TEA-9421",
    event_id: "tea_afternoon",
    event_title: "🍵 ชวนจิบชาเปอยี่ & สนทนามรดกเต้าหมิง",
    event_title_en: "Heritage Tea Tasting & Storytelling Circle",
    event_category: "workshop",
    guest_name: "ดร.สุภาพร วณิชการพานิช",
    guest_phone: "089-771-3322",
    guest_email: "supaporn.v@chula.ac.th",
    seats: 1,
    tea_blend: "ชาผู่เอ๋อร์สุก ๑๐ ปี (10-Year Aged Pu-erh)",
    pastry_type: "ขนมพริกไทยโบราณ",
    status: "confirmed",
    checked_in: 0,
    checked_in_at: null,
    admin_notes: "นักวิจัยด้านสถาปัตยกรรมมรดก",
    created_at: "2026-08-16 09:45:00"
  },
  {
    id: "3",
    ticket_code: "DM-SPACE-4401",
    event_id: "hall",
    event_title: "โถงอาคารไม้ประวัติศาสตร์ (Heritage Hall)",
    event_title_en: "Heritage Hall (Zone A)",
    event_category: "space",
    guest_name: "กลุ่มศิลปิน Young Phang Nga Art Network",
    guest_phone: "082-334-1199",
    guest_email: "youngart@phangnga.org",
    seats: 45,
    tea_blend: "จัดแสดงนิทรรศการภาพถ่ายฟิล์ม 'แสงและเงาเมืองแร่ 2026'",
    pastry_type: "-",
    status: "pending",
    checked_in: 0,
    checked_in_at: null,
    admin_notes: "ขอใช้วันที่ 1-3 พ.ย. 2569 รอเข้าประชุมกรรมการ",
    created_at: "2026-08-17 16:30:00"
  }
];

export const clientDb = {
  // =========================================================================
  // BOOKINGS & SPACE PROPOSALS
  // =========================================================================
  getBookings(category?: 'event' | 'space'): ClientBooking[] {
    if (typeof window === 'undefined') return DEFAULT_BOOKINGS;
    try {
      let raw = localStorage.getItem(MASTER_KEYS.BOOKINGS);

      // Auto-migrate from any legacy key if master is empty
      if (!raw) {
        for (const legacyKey of LEGACY_KEYS.BOOKINGS) {
          const legacyRaw = localStorage.getItem(legacyKey);
          if (legacyRaw) {
            raw = legacyRaw;
            break;
          }
        }
      }

      let list: ClientBooking[] = DEFAULT_BOOKINGS;
      if (raw) {
        try {
          const parsed = JSON.parse(raw);
          if (Array.isArray(parsed) && parsed.length > 0) {
            // Merge defaults if not present
            const existingCodes = new Set(parsed.map(b => b.ticket_code));
            const merged = [...parsed];
            for (const def of DEFAULT_BOOKINGS) {
              if (!existingCodes.has(def.ticket_code)) {
                merged.push(def);
              }
            }
            list = merged;
          }
        } catch {}
      }

      // Always save back to master key
      localStorage.setItem(MASTER_KEYS.BOOKINGS, JSON.stringify(list));

      if (category === 'space') {
        return list.filter(b => b.event_category === 'space' || ['hall', 'courtyard', 'studio', 'cafe', 'all'].includes(b.event_id));
      }
      if (category === 'event') {
        return list.filter(b => b.event_category !== 'space' && !['hall', 'courtyard', 'studio', 'cafe', 'all'].includes(b.event_id));
      }
      return list;
    } catch {
      return DEFAULT_BOOKINGS;
    }
  },

  async createBooking(booking: Omit<ClientBooking, 'id' | 'ticket_code' | 'created_at' | 'checked_in' | 'checked_in_at' | 'status'>): Promise<ClientBooking> {
    const list = this.getBookings();
    const id = `${Date.now()}_${Math.random().toString(36).substring(2, 6)}`;
    const randomHex = Math.random().toString(36).substring(2, 6).toUpperCase();
    const isSpace = ['hall', 'courtyard', 'studio', 'cafe', 'all'].includes(booking.event_id);
    const prefix = isSpace ? 'DM-SPACE' : 'DM-TEA';
    const ticket_code = `${prefix}-${Date.now().toString().slice(-4)}${randomHex}`;

    let qr_data_url = '';
    try {
      qr_data_url = await QRCode.toDataURL(ticket_code, {
        width: 250,
        margin: 1,
        color: { dark: '#122421', light: '#FAF2DD' }
      });
    } catch {}

    const newRec: ClientBooking = {
      ...booking,
      id,
      ticket_code,
      event_category: isSpace ? 'space' : 'workshop',
      status: isSpace ? 'pending' : 'confirmed',
      checked_in: 0,
      checked_in_at: null,
      created_at: new Date().toISOString().replace('T', ' ').substring(0, 19),
      qr_data_url
    };

    const updated = [newRec, ...list];
    localStorage.setItem(MASTER_KEYS.BOOKINGS, JSON.stringify(updated));
    return newRec;
  },

  verifyTicket(ticketCode: string): { success: boolean; data?: ClientBooking; message?: string } {
    const list = this.getBookings();
    const item = list.find(b => b.ticket_code.trim().toUpperCase() === ticketCode.trim().toUpperCase());
    if (!item) {
      return { success: false, message: 'Ticket code not found in registry' };
    }
    return { success: true, data: item };
  },

  checkInTicket(ticketCode: string, adminNotes?: string): { success: boolean; data?: ClientBooking; message?: string } {
    const list = this.getBookings();
    const idx = list.findIndex(b => b.ticket_code.trim().toUpperCase() === ticketCode.trim().toUpperCase());
    if (idx === -1) {
      return { success: false, message: 'Ticket not found' };
    }
    const item = list[idx];
    if (item.checked_in === 1) {
      return { success: false, message: `Ticket ${ticketCode} was already checked in at ${item.checked_in_at}` };
    }
    item.checked_in = 1;
    item.checked_in_at = new Date().toISOString().replace('T', ' ').substring(0, 19);
    if (adminNotes) item.admin_notes = adminNotes;
    list[idx] = item;
    localStorage.setItem(MASTER_KEYS.BOOKINGS, JSON.stringify(list));
    return { success: true, data: item };
  },

  updateBookingStatus(id: string, status: string, adminNotes?: string): boolean {
    const list = this.getBookings();
    const idx = list.findIndex(b => b.id === id || b.ticket_code === id);
    if (idx === -1) return false;
    list[idx].status = status;
    if (adminNotes !== undefined) list[idx].admin_notes = adminNotes;
    localStorage.setItem(MASTER_KEYS.BOOKINGS, JSON.stringify(list));
    return true;
  },

  // =========================================================================
  // COMMUNITY IDEAS CO-CREATION
  // =========================================================================
  getIdeas(): ClientIdea[] {
    if (typeof window === 'undefined') return INITIAL_IDEAS as any;
    try {
      let raw = localStorage.getItem(MASTER_KEYS.IDEAS);

      // Auto-migrate from any legacy key if master is empty
      if (!raw) {
        for (const legacyKey of LEGACY_KEYS.IDEAS) {
          const legacyRaw = localStorage.getItem(legacyKey);
          if (legacyRaw) {
            raw = legacyRaw;
            break;
          }
        }
      }

      let list: ClientIdea[] = INITIAL_IDEAS as any;
      if (raw) {
        try {
          const parsed = JSON.parse(raw);
          if (Array.isArray(parsed) && parsed.length > 0) {
            // Keep user-submitted ideas and merge with initial ideas
            const initialTitles = new Set(INITIAL_IDEAS.map(i => i.title_th));
            const userSubmissions = parsed.filter(p => !initialTitles.has(p.title_th) || p.id > 6);
            
            // Build unified list
            const merged = [...userSubmissions];
            for (const init of INITIAL_IDEAS) {
              const match = parsed.find(p => p.id === init.id || p.title_th === init.title_th);
              merged.push(match || (init as any));
            }
            // Remove duplicates by id
            const seen = new Set();
            list = merged.filter(item => {
              const k = item.id || item.title_th;
              if (seen.has(k)) return false;
              seen.add(k);
              return true;
            });
          }
        } catch {}
      }

      const formatted = list.map((item: any) => ({
        ...item,
        title_th: item.title_th || item.title || '',
        title_en: item.title_en || item.title || '',
        title_zh: item.title_zh || item.title || '',
        desc_th: item.desc_th || item.desc || '',
        desc_en: item.desc_en || item.desc || '',
        desc_zh: item.desc_zh || item.desc || '',
        author_th: item.author_th || item.author || '',
        author_en: item.author_en || item.author || '',
        author_zh: item.author_zh || item.author || '',
        date_th: item.date_th || item.created_at || 'ล่าสุด',
        date_en: item.date_en || 'Recent',
        date_zh: item.date_zh || '近期',
        category_th: item.category_th || '💡 ทั่วไป',
        category_en: item.category_en || '💡 General',
        category_zh: item.category_zh || '💡 通用'
      }));

      // Always save back to master key
      localStorage.setItem(MASTER_KEYS.IDEAS, JSON.stringify(formatted));
      return formatted;
    } catch {
      return INITIAL_IDEAS as any;
    }
  },

  addIdea(idea: {
    title: string;
    desc: string;
    author: string;
    category_th: string;
    category_en: string;
    category_zh?: string;
  }): ClientIdea {
    const list = this.getIdeas();
    const newId = list.length > 0 ? Math.max(...list.map(i => i.id)) + 1 : 1;
    const newIdea: ClientIdea = {
      id: newId,
      title_th: idea.title,
      title_en: idea.title,
      title_zh: idea.title,
      desc_th: idea.desc,
      desc_en: idea.desc,
      desc_zh: idea.desc,
      author_th: idea.author,
      author_en: idea.author,
      author_zh: idea.author,
      date_th: 'ล่าสุด',
      date_en: 'Recent',
      date_zh: '剛剛',
      category_th: idea.category_th,
      category_en: idea.category_en,
      category_zh: idea.category_zh,
      votes: 1,
      hasVoted: false,
      status: 'submitted',
      created_at: new Date().toISOString().replace('T', ' ').substring(0, 19)
    };
    const updated = [newIdea, ...list];
    localStorage.setItem(MASTER_KEYS.IDEAS, JSON.stringify(updated));
    return newIdea;
  },

  voteIdea(id: number, voterKey: string): { votes: number; hasVoted: boolean } {
    const list = this.getIdeas();
    const votedKey = `voted_idea_${id}_${voterKey}`;
    const alreadyVoted = localStorage.getItem(votedKey) === 'true';

    const idx = list.findIndex(i => i.id === id);
    if (idx === -1) return { votes: 0, hasVoted: false };

    if (alreadyVoted) {
      list[idx].votes = Math.max(0, list[idx].votes - 1);
      localStorage.removeItem(votedKey);
    } else {
      list[idx].votes += 1;
      localStorage.setItem(votedKey, 'true');
    }

    localStorage.setItem(MASTER_KEYS.IDEAS, JSON.stringify(list));
    return { votes: list[idx].votes, hasVoted: !alreadyVoted };
  },

  updateIdeaStatus(id: number, status: string): boolean {
    const list = this.getIdeas();
    const idx = list.findIndex(i => i.id === id);
    if (idx === -1) return false;
    list[idx].status = status;
    localStorage.setItem(MASTER_KEYS.IDEAS, JSON.stringify(list));
    return true;
  },

  // =========================================================================
  // EVENTS & WORKSHOPS MANAGEMENT
  // =========================================================================
  getEvents(category?: string): EventItem[] {
    if (typeof window === 'undefined') return EVENTS_LIST;
    try {
      let raw = localStorage.getItem(MASTER_KEYS.EVENTS);

      // Auto-migrate from any legacy key if master is empty
      if (!raw) {
        for (const legacyKey of LEGACY_KEYS.EVENTS) {
          const legacyRaw = localStorage.getItem(legacyKey);
          if (legacyRaw) {
            raw = legacyRaw;
            break;
          }
        }
      }

      let list: EventItem[] = EVENTS_LIST;
      if (raw) {
        try {
          const parsed = JSON.parse(raw);
          if (Array.isArray(parsed) && parsed.length > 0) {
            list = parsed;
          }
        } catch {}
      }

      localStorage.setItem(MASTER_KEYS.EVENTS, JSON.stringify(list));

      if (category && category !== 'all') {
        return list.filter(e => e.category === category);
      }
      return list;
    } catch {
      return EVENTS_LIST;
    }
  },

  getEventById(id: string): EventItem | undefined {
    return this.getEvents().find(e => e.id === id);
  },

  createEvent(eventData: Partial<EventItem>): EventItem {
    const list = this.getEvents();
    const newId = `e_${Date.now()}`;
    const newEvent: EventItem = {
      id: newId,
      category: (eventData.category as any) || 'workshop',
      image: eventData.image || '/assets/event-tea.jpg',
      tag_th: eventData.tag_th || 'กิจกรรมใหม่',
      tag_en: eventData.tag_en || 'New Event',
      tag_zh: eventData.tag_zh || '新活動',
      day_th: eventData.day_th || 'เร็วๆ นี้',
      month_th: eventData.month_th || '๒๕๖๙',
      day_en: eventData.day_en || 'Upcoming',
      month_en: eventData.month_en || '2026',
      day_zh: eventData.day_zh || '即將舉行',
      month_zh: eventData.month_zh || '2026',
      title_th: eventData.title_th || 'กิจกรรมสร้างสรรค์เต้าหมิง',
      title_en: eventData.title_en || 'Dao Ming Creative Event',
      title_zh: eventData.title_zh || '導明文創活動',
      snippet_th: eventData.snippet_th || '',
      snippet_en: eventData.snippet_en || '',
      snippet_zh: eventData.snippet_zh || '',
      detailed_desc_th: eventData.detailed_desc_th || eventData.snippet_th || '',
      detailed_desc_en: eventData.detailed_desc_en || eventData.snippet_en || '',
      detailed_desc_zh: eventData.detailed_desc_zh || eventData.snippet_zh || '',
      loc_th: eventData.loc_th || '📍 อาคารโรงเรียนเต้าหมิง ตะกั่วป่า',
      loc_en: eventData.loc_en || '📍 Dao Ming Heritage Schoolhouse',
      loc_zh: eventData.loc_zh || '📍 德古巴導明學校舊址',
      time_th: eventData.time_th || '⏰ 13:30 - 16:30 น.',
      time_en: eventData.time_en || '⏰ 01:30 PM - 04:30 PM',
      time_zh: eventData.time_zh || '⏰ 13:30 - 16:30',
      cap_th: eventData.cap_th || '👥 รับ 20 ท่าน',
      cap_en: eventData.cap_en || '👥 20 participants',
      cap_zh: eventData.cap_zh || '👥 限額 20 位',
      price_th: eventData.price_th || 'ฟรี (ไม่มีค่าใช้จ่าย)',
      price_en: eventData.price_en || 'Free Admission',
      price_zh: eventData.price_zh || '免費入場',
      btnType: eventData.btnType || 'register',
      highlights_th: eventData.highlights_th || ['ร่วมเรียนรู้วัฒนธรรมและประวัติศาสตร์ท้องถิ่น'],
      highlights_en: eventData.highlights_en || ['Experience local culture and living heritage'],
      highlights_zh: eventData.highlights_zh || ['體驗在地文化與活態遺產'],
      schedule_th: eventData.schedule_th || [{ time: "13:30 - 14:00", activity: "ลงทะเบียน & ต้อนรับ" }],
      schedule_en: eventData.schedule_en || [{ time: "01:30 - 02:00 PM", activity: "Registration & Welcome" }],
      schedule_zh: eventData.schedule_zh || [{ time: "13:30 - 14:00", activity: "簽到與迎賓" }],
      instructor_th: eventData.instructor_th || 'วิทยากรภูมิปัญญาท้องถิ่นเต้าหมิง',
      instructor_en: eventData.instructor_en || 'Local Heritage Scholar',
      instructor_zh: eventData.instructor_zh || '在地文史導師'
    };

    const updated = [newEvent, ...list];
    localStorage.setItem(MASTER_KEYS.EVENTS, JSON.stringify(updated));
    return newEvent;
  },

  updateEvent(id: string, updatedFields: Partial<EventItem>): boolean {
    const list = this.getEvents();
    const idx = list.findIndex(e => e.id === id);
    if (idx === -1) return false;
    list[idx] = { ...list[idx], ...updatedFields };
    localStorage.setItem(MASTER_KEYS.EVENTS, JSON.stringify(list));
    return true;
  },

  deleteEvent(id: string): boolean {
    const list = this.getEvents();
    const filtered = list.filter(e => e.id !== id);
    if (filtered.length === list.length) return false;
    localStorage.setItem(MASTER_KEYS.EVENTS, JSON.stringify(filtered));
    return true;
  },

  resetEvents(): EventItem[] {
    localStorage.setItem(MASTER_KEYS.EVENTS, JSON.stringify(EVENTS_LIST));
    return EVENTS_LIST;
  },

  // =========================================================================
  // ARCHIVE PHOTOS & HISTORIC STORIES REPOSITORY
  // =========================================================================
  getArchivePhotos(): ArchivePhoto[] {
    if (typeof window === 'undefined') return ARCHIVE_PHOTOS;
    try {
      const stored = localStorage.getItem(MASTER_KEYS.ARCHIVE);
      if (!stored) {
        localStorage.setItem(MASTER_KEYS.ARCHIVE, JSON.stringify(ARCHIVE_PHOTOS));
        return ARCHIVE_PHOTOS;
      }
      const parsed = JSON.parse(stored);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
      return ARCHIVE_PHOTOS;
    } catch {
      return ARCHIVE_PHOTOS;
    }
  },

  createArchivePhoto(photoData: Partial<ArchivePhoto>): ArchivePhoto {
    const list = this.getArchivePhotos();
    const nextId = list.length > 0 ? Math.max(...list.map(p => typeof p.id === 'number' ? p.id : 0)) + 1 : 0;

    const newPhoto: ArchivePhoto = {
      id: nextId,
      category: photoData.category || 'community',
      src: photoData.src || '/img/building-community.jpg',
      tag_th: photoData.tag_th || 'ภาพประวัติศาสตร์',
      tag_en: photoData.tag_en || 'Historic Archive',
      tag_zh: photoData.tag_zh || '歷史檔案',
      title_th: photoData.title_th || 'ภาพประวัติศาสตร์เต้าหมิง',
      title_en: photoData.title_en || 'Historic Dao Ming Photo',
      title_zh: photoData.title_zh || '導明學校歷史影像',
      caption_th: photoData.caption_th || '',
      caption_en: photoData.caption_en || '',
      caption_zh: photoData.caption_zh || '',
    };

    const updated = [newPhoto, ...list];
    localStorage.setItem(MASTER_KEYS.ARCHIVE, JSON.stringify(updated));
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('daoming_archive_updated'));
    }
    return newPhoto;
  },

  updateArchivePhoto(id: number, updatedFields: Partial<ArchivePhoto>): boolean {
    const list = this.getArchivePhotos();
    const idx = list.findIndex(p => p.id === id);
    if (idx === -1) return false;
    list[idx] = { ...list[idx], ...updatedFields };
    localStorage.setItem(MASTER_KEYS.ARCHIVE, JSON.stringify(list));
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('daoming_archive_updated'));
    }
    return true;
  },

  deleteArchivePhoto(id: number): boolean {
    const list = this.getArchivePhotos();
    const filtered = list.filter(p => p.id !== id);
    if (filtered.length === list.length) return false;
    localStorage.setItem(MASTER_KEYS.ARCHIVE, JSON.stringify(filtered));
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('daoming_archive_updated'));
    }
    return true;
  },

  resetArchivePhotos(): ArchivePhoto[] {
    localStorage.setItem(MASTER_KEYS.ARCHIVE, JSON.stringify(ARCHIVE_PHOTOS));
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('daoming_archive_updated'));
    }
    return ARCHIVE_PHOTOS;
  },

  // =========================================================================
  // SITE COPY & GLOBAL CONTENT CMS
  // =========================================================================
  getSiteCopy(): SiteCopyData {
    if (typeof window === 'undefined') return DEFAULT_SITE_COPY;
    try {
      const stored = localStorage.getItem(MASTER_KEYS.SITE_COPY);
      if (!stored) {
        localStorage.setItem(MASTER_KEYS.SITE_COPY, JSON.stringify(DEFAULT_SITE_COPY));
        return DEFAULT_SITE_COPY;
      }
      const parsed = JSON.parse(stored);
      if (parsed && typeof parsed === 'object') {
        return { ...DEFAULT_SITE_COPY, ...parsed };
      }
      return DEFAULT_SITE_COPY;
    } catch {
      return DEFAULT_SITE_COPY;
    }
  },

  updateSiteCopy(updatedFields: Partial<SiteCopyData>): SiteCopyData {
    const current = this.getSiteCopy();
    const merged = { ...current, ...updatedFields };
    localStorage.setItem(MASTER_KEYS.SITE_COPY, JSON.stringify(merged));
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('daoming_site_copy_updated'));
    }
    return merged;
  },

  resetSiteCopy(): SiteCopyData {
    localStorage.setItem(MASTER_KEYS.SITE_COPY, JSON.stringify(DEFAULT_SITE_COPY));
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('daoming_site_copy_updated'));
    }
    return DEFAULT_SITE_COPY;
  },

  // =========================================================================
  // GABLE EXPLORER SYMBOLS CMS
  // =========================================================================
  getGableSymbols(): GableSymbol[] {
    if (typeof window === 'undefined') return GABLE_SYMBOLS;
    try {
      const stored = localStorage.getItem(MASTER_KEYS.GABLES);
      if (!stored) {
        localStorage.setItem(MASTER_KEYS.GABLES, JSON.stringify(GABLE_SYMBOLS));
        return GABLE_SYMBOLS;
      }
      const parsed = JSON.parse(stored);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
      return GABLE_SYMBOLS;
    } catch {
      return GABLE_SYMBOLS;
    }
  },

  updateGableSymbol(id: string, updatedFields: Partial<GableSymbol>): boolean {
    const list = this.getGableSymbols();
    const idx = list.findIndex(s => s.id === id);
    if (idx === -1) return false;
    list[idx] = { ...list[idx], ...updatedFields };
    localStorage.setItem(MASTER_KEYS.GABLES, JSON.stringify(list));
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('daoming_gables_updated'));
    }
    return true;
  },

  resetGableSymbols(): GableSymbol[] {
    localStorage.setItem(MASTER_KEYS.GABLES, JSON.stringify(GABLE_SYMBOLS));
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('daoming_gables_updated'));
    }
    return GABLE_SYMBOLS;
  },

  // =========================================================================
  // TIMELINE 120-YEAR MILESTONES CMS
  // =========================================================================
  getTimelineData(): Record<string, any> {
    if (typeof window === 'undefined') return DEFAULT_TIMELINE_DATA;
    try {
      const stored = localStorage.getItem(MASTER_KEYS.TIMELINE);
      if (!stored) {
        localStorage.setItem(MASTER_KEYS.TIMELINE, JSON.stringify(DEFAULT_TIMELINE_DATA));
        return DEFAULT_TIMELINE_DATA;
      }
      const parsed = JSON.parse(stored);
      if (parsed && typeof parsed === 'object') {
        return { ...DEFAULT_TIMELINE_DATA, ...parsed };
      }
      return DEFAULT_TIMELINE_DATA;
    } catch {
      return DEFAULT_TIMELINE_DATA;
    }
  },

  updateTimelineEra(year: string, updatedFields: Partial<any>): boolean {
    const data = this.getTimelineData();
    if (!data[year]) return false;
    data[year] = { ...data[year], ...updatedFields };
    localStorage.setItem(MASTER_KEYS.TIMELINE, JSON.stringify(data));
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('daoming_timeline_updated'));
    }
    return true;
  },

  resetTimelineData(): Record<string, any> {
    localStorage.setItem(MASTER_KEYS.TIMELINE, JSON.stringify(DEFAULT_TIMELINE_DATA));
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('daoming_timeline_updated'));
    }
    return DEFAULT_TIMELINE_DATA;
  },

  // =========================================================================
  // USER & MEMBER MANAGEMENT (Survives Git Pushes & Builds)
  // =========================================================================
  getUsers(): SystemUser[] {
    if (typeof window === 'undefined') return DEFAULT_USERS;
    try {
      const stored = localStorage.getItem(MASTER_KEYS.USERS);
      if (!stored) {
        localStorage.setItem(MASTER_KEYS.USERS, JSON.stringify(DEFAULT_USERS));
        return DEFAULT_USERS;
      }
      const parsed = JSON.parse(stored);
      if (Array.isArray(parsed) && parsed.length > 0) {
        // Ensure superadmin always exists
        const hasAdmin = parsed.some(u => u.username === 'admin');
        if (!hasAdmin) {
          const merged = [DEFAULT_USERS[0], ...parsed];
          localStorage.setItem(MASTER_KEYS.USERS, JSON.stringify(merged));
          return merged;
        }
        return parsed;
      }
      return DEFAULT_USERS;
    } catch {
      return DEFAULT_USERS;
    }
  },

  getUserById(id: string): SystemUser | null {
    const users = this.getUsers();
    return users.find(u => u.id === id) || null;
  },

  getUserByUsername(username: string): SystemUser | null {
    const users = this.getUsers();
    const clean = username.trim().toLowerCase();
    return users.find(u => u.username.toLowerCase() === clean) || null;
  },

  authenticate(username: string, pass: string): { success: boolean; user?: SystemUser; message: string } {
    const cleanUser = username.trim().toLowerCase();
    const cleanPass = pass.trim();

    if (!cleanUser || !cleanPass) {
      return { success: false, message: 'กรุณากรอกชื่อผู้ใช้และรหัสผ่าน' };
    }

    const users = this.getUsers();
    const found = users.find(u => u.username.toLowerCase() === cleanUser);

    if (!found) {
      return { success: false, message: 'ไม่พบชื่อผู้ใช้นี้ในระบบ' };
    }

    if (found.password !== cleanPass) {
      return { success: false, message: 'รหัสผ่านไม่ถูกต้อง กรุณาลองใหม่อีกครั้ง' };
    }

    if (found.status === 'pending') {
      return { success: false, message: 'บัญชีนี้อยู่ระหว่างรอการอนุมัติสิทธิ์จากผู้ดูแลระบบสูงสุด' };
    }

    if (found.status === 'suspended') {
      return { success: false, message: 'บัญชีนี้ถูกระงับการใช้งานชั่วคราว กรุณาติดต่อผู้ดูแลระบบ' };
    }

    // Update last login
    this.updateUser(found.id, { last_login: new Date().toISOString() });

    return {
      success: true,
      user: { ...found, last_login: new Date().toISOString() },
      message: `ยินดีต้อนรับคุณ ${found.full_name || found.username}`
    };
  },

  createUser(userData: {
    username: string;
    password: string;
    full_name: string;
    role?: UserRole;
    status?: UserStatus;
    phone?: string;
    email?: string;
    department?: string;
    notes?: string;
  }): { success: boolean; user?: SystemUser; message: string } {
    const cleanUser = userData.username.trim().toLowerCase();
    if (!cleanUser || cleanUser.length < 3) {
      return { success: false, message: 'ชื่อผู้ใช้ต้องมีความยาวอย่างน้อย 3 ตัวอักษร' };
    }

    if (!userData.password || userData.password.length < 4) {
      return { success: false, message: 'รหัสผ่านต้องมีความยาวอย่างน้อย 4 ตัวอักษร' };
    }

    const users = this.getUsers();
    if (users.some(u => u.username.toLowerCase() === cleanUser)) {
      return { success: false, message: `ชื่อผู้ใช้ "${cleanUser}" มีอยู่ในระบบแล้ว` };
    }

    const newUser: SystemUser = {
      id: `user-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      username: cleanUser,
      password: userData.password,
      full_name: userData.full_name || cleanUser,
      role: userData.role || 'member',
      status: userData.status || 'pending',
      phone: userData.phone || '',
      email: userData.email || '',
      department: userData.department || 'สมาชิกทั่วไป',
      created_at: new Date().toISOString(),
      last_login: null,
      notes: userData.notes || ''
    };

    const updated = [newUser, ...users];
    localStorage.setItem(MASTER_KEYS.USERS, JSON.stringify(updated));
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('daoming_users_updated'));
    }

    return {
      success: true,
      user: newUser,
      message: userData.status === 'active' 
        ? `เพิ่มสมาชิก "${newUser.full_name}" สำเร็จ` 
        : 'ลงทะเบียนสมาชิกสำเร็จ อยู่ระหว่างรอ Super Admin อนุมัติสิทธิ์'
    };
  },

  updateUser(id: string, updatedFields: Partial<SystemUser>): { success: boolean; message: string } {
    const users = this.getUsers();
    const idx = users.findIndex(u => u.id === id);
    if (idx === -1) return { success: false, message: 'ไม่พบผู้ใช้ในระบบ' };

    // Prevent demoting primary superadmin username
    if (users[idx].username === 'admin' && updatedFields.role && updatedFields.role !== 'superadmin') {
      return { success: false, message: 'ไม่อนุญาตให้ลดสิทธิ์บัญชีผู้ดูแลหลัก (admin)' };
    }

    if (users[idx].username === 'admin' && updatedFields.status && updatedFields.status !== 'active') {
      return { success: false, message: 'ไม่อนุญาตให้ระงับบัญชีผู้ดูแลหลัก (admin)' };
    }

    users[idx] = { ...users[idx], ...updatedFields };
    localStorage.setItem(MASTER_KEYS.USERS, JSON.stringify(users));
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('daoming_users_updated'));
    }
    return { success: true, message: 'บันทึกการแก้ไขข้อมูลผู้ใช้สำเร็จ' };
  },

  deleteUser(id: string): { success: boolean; message: string } {
    const users = this.getUsers();
    const target = users.find(u => u.id === id);
    if (!target) return { success: false, message: 'ไม่พบผู้ใช้ที่ต้องการลบ' };

    if (target.username === 'admin') {
      return { success: false, message: 'ไม่อนุญาตให้ลบบัญชีผู้ดูแลหลัก (admin)' };
    }

    const filtered = users.filter(u => u.id !== id);
    localStorage.setItem(MASTER_KEYS.USERS, JSON.stringify(filtered));
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('daoming_users_updated'));
    }
    return { success: true, message: `ลบสมาชิก "${target.full_name}" เรียบร้อยแล้ว` };
  },

  resetUsers(): SystemUser[] {
    localStorage.setItem(MASTER_KEYS.USERS, JSON.stringify(DEFAULT_USERS));
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('daoming_users_updated'));
    }
    return DEFAULT_USERS;
  },

  // =========================================================================
  // AUDIT LOGS (ADMIN ONLY ACTIVITY HISTORY)
  // =========================================================================
  getAuditLogs(): AuditLogEntry[] {
    if (typeof window === 'undefined') return DEFAULT_AUDIT_LOGS;
    try {
      const stored = localStorage.getItem(MASTER_KEYS.AUDIT_LOGS);
      if (!stored) {
        localStorage.setItem(MASTER_KEYS.AUDIT_LOGS, JSON.stringify(DEFAULT_AUDIT_LOGS));
        return DEFAULT_AUDIT_LOGS;
      }
      const parsed = JSON.parse(stored);
      return Array.isArray(parsed) ? parsed : DEFAULT_AUDIT_LOGS;
    } catch {
      return DEFAULT_AUDIT_LOGS;
    }
  },

  addAuditLog(entry: {
    user_id?: string;
    username?: string;
    full_name?: string;
    role?: UserRole;
    action_type: AuditActionType;
    module: 'site_copy' | 'gables' | 'timeline' | 'archive' | 'events' | 'users' | 'bookings' | 'ideas' | 'system';
    module_name_th: string;
    description: string;
    details?: string;
  }): AuditLogEntry {
    const logs = this.getAuditLogs();
    const newLog: AuditLogEntry = {
      id: `log_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      timestamp: new Date().toISOString(),
      user_id: entry.user_id || 'system',
      username: entry.username || 'admin',
      full_name: entry.full_name || 'ผู้ดูแลระบบ',
      role: entry.role || 'superadmin',
      action_type: entry.action_type,
      module: entry.module,
      module_name_th: entry.module_name_th,
      description: entry.description,
      details: entry.details || ''
    };

    // Keep latest 1000 logs
    const updated = [newLog, ...logs].slice(0, 1000);
    if (typeof window !== 'undefined') {
      localStorage.setItem(MASTER_KEYS.AUDIT_LOGS, JSON.stringify(updated));
      window.dispatchEvent(new CustomEvent('daoming_audit_logs_updated'));
    }
    return newLog;
  },

  clearAuditLogs(): { success: boolean; message: string } {
    if (typeof window !== 'undefined') {
      localStorage.setItem(MASTER_KEYS.AUDIT_LOGS, JSON.stringify([]));
      window.dispatchEvent(new CustomEvent('daoming_audit_logs_updated'));
    }
    return { success: true, message: 'ล้างประวัติการแก้ไขทั้งหมดเรียบร้อยแล้ว' };
  },

  // =========================================================================
  // DATABASE BACKUP & RESTORE UTILITIES
  // =========================================================================
  exportFullDatabase() {
    return {
      version: "2.4",
      exported_at: new Date().toISOString(),
      organization: "Dao Ming Foundation Takua Pa",
      users: this.getUsers(),
      bookings: this.getBookings(),
      ideas: this.getIdeas(),
      events: this.getEvents(),
      archive: this.getArchivePhotos(),
      site_copy: this.getSiteCopy(),
      gables: this.getGableSymbols(),
      timeline: this.getTimelineData(),
      audit_logs: this.getAuditLogs()
    };
  },

  importFullDatabase(jsonData: any): { success: boolean; message: string; count: { users?: number; bookings: number; ideas: number; events: number; archive?: number; site_copy?: boolean; audit_logs?: number } } {
    try {
      if (!jsonData || typeof jsonData !== 'object') {
        return { success: false, message: 'Invalid JSON format', count: { bookings: 0, ideas: 0, events: 0, archive: 0 } };
      }

      let uCount = 0;
      let bCount = 0;
      let iCount = 0;
      let eCount = 0;
      let aCount = 0;
      let lCount = 0;
      let copyImported = false;

      if (Array.isArray(jsonData.users)) {
        const current = this.getUsers();
        const existingUsernames = new Set(current.map(u => u.username.toLowerCase()));
        const toAdd = jsonData.users.filter((u: SystemUser) => u && u.username && !existingUsernames.has(u.username.toLowerCase()));
        const merged = [...toAdd, ...current];
        localStorage.setItem(MASTER_KEYS.USERS, JSON.stringify(merged));
        uCount = toAdd.length;
      }

      if (Array.isArray(jsonData.bookings)) {
        const current = this.getBookings();
        const existingCodes = new Set(current.map(b => b.ticket_code));
        const toAdd = jsonData.bookings.filter((b: ClientBooking) => b && b.ticket_code && !existingCodes.has(b.ticket_code));
        const merged = [...toAdd, ...current];
        localStorage.setItem(MASTER_KEYS.BOOKINGS, JSON.stringify(merged));
        bCount = toAdd.length;
      }

      if (Array.isArray(jsonData.ideas)) {
        const current = this.getIdeas();
        const existingIds = new Set(current.map(i => i.id));
        const toAdd = jsonData.ideas.filter((i: ClientIdea) => i && i.id && !existingIds.has(i.id));
        const merged = [...toAdd, ...current];
        localStorage.setItem(MASTER_KEYS.IDEAS, JSON.stringify(merged));
        iCount = toAdd.length;
      }

      if (Array.isArray(jsonData.events)) {
        const current = this.getEvents();
        const existingIds = new Set(current.map(e => e.id));
        const toAdd = jsonData.events.filter((e: EventItem) => e && e.id && !existingIds.has(e.id));
        const merged = [...toAdd, ...current];
        localStorage.setItem(MASTER_KEYS.EVENTS, JSON.stringify(merged));
        eCount = toAdd.length;
      }

      if (Array.isArray(jsonData.archive)) {
        const current = this.getArchivePhotos();
        const existingIds = new Set(current.map(a => a.id));
        const toAdd = jsonData.archive.filter((a: ArchivePhoto) => a && typeof a.id === 'number' && !existingIds.has(a.id));
        const merged = [...toAdd, ...current];
        localStorage.setItem(MASTER_KEYS.ARCHIVE, JSON.stringify(merged));
        aCount = toAdd.length;
      }

      if (jsonData.site_copy && typeof jsonData.site_copy === 'object') {
        this.updateSiteCopy(jsonData.site_copy);
        copyImported = true;
      }

      if (Array.isArray(jsonData.gables)) {
        localStorage.setItem(MASTER_KEYS.GABLES, JSON.stringify(jsonData.gables));
      }

      if (jsonData.timeline && typeof jsonData.timeline === 'object') {
        localStorage.setItem(MASTER_KEYS.TIMELINE, JSON.stringify(jsonData.timeline));
      }

      if (Array.isArray(jsonData.audit_logs)) {
        const current = this.getAuditLogs();
        const existingIds = new Set(current.map(l => l.id));
        const toAdd = jsonData.audit_logs.filter((l: AuditLogEntry) => l && l.id && !existingIds.has(l.id));
        const merged = [...toAdd, ...current].slice(0, 1000);
        localStorage.setItem(MASTER_KEYS.AUDIT_LOGS, JSON.stringify(merged));
        lCount = toAdd.length;
      }

      if (typeof window !== 'undefined') {
        window.dispatchEvent(new CustomEvent('daoming_users_updated'));
        window.dispatchEvent(new CustomEvent('daoming_archive_updated'));
        window.dispatchEvent(new CustomEvent('daoming_site_copy_updated'));
        window.dispatchEvent(new CustomEvent('daoming_gables_updated'));
        window.dispatchEvent(new CustomEvent('daoming_timeline_updated'));
        window.dispatchEvent(new CustomEvent('daoming_audit_logs_updated'));
      }

      return {
        success: true,
        message: `ผสานข้อมูลสำเร็จ: นำเข้าสมาชิก ${uCount} ท่าน, ตั๋ว/คำขอ ${bCount} รายการ, ไอเดีย ${iCount} ข้อเสนอ, กิจกรรม ${eCount} รายการ, คลังภาพ ${aCount} ภาพ, ประวัติ ${lCount} รายการ${copyImported ? ', ข้อความเว็บไซต์' : ''}`,
        count: { users: uCount, bookings: bCount, ideas: iCount, events: eCount, archive: aCount, site_copy: copyImported, audit_logs: lCount }
      };
    } catch (err: any) {
      return { success: false, message: err.message, count: { bookings: 0, ideas: 0, events: 0, archive: 0 } };
    }
  }
};
