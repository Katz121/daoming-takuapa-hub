import { EventItem } from '../types';

export const EVENTS_LIST: EventItem[] = [
  {
    id: "e1",
    category: "workshop",
    image: "/assets/event-tea.jpg",
    tag_th: "จิบชายามบ่าย & วัฒนธรรม",
    tag_en: "Heritage Afternoon Tea",
    tag_zh: "文化茶席 & 點心饗宴",
    day_th: "24",
    month_th: "ส.ค. 2569",
    day_en: "24",
    month_en: "Aug 2026",
    day_zh: "24",
    month_zh: "8月 2026",
    title_th: 'สัมผัสสุนทรีย์ "จิบชายามบ่าย & ลิ้มรสเต้าส้อโบราณเต้าหมิง"',
    title_en: "Dao Ming Heritage Afternoon Tea & Takua Pa Delicacies Pairing",
    title_zh: '導明百年風雅：「午後工夫茶席與古法豆沙餅品鑑」',
    snippet_th: "จำลองบรรยากาศสุนทรีย์ยุคทองตะกั่วป่า นั่งจิบชาจีนโบราณเกรดพรีเมียมคู่กับขนมเต้าส้อ ขนมพริก และของว่างเปอรานากันสูตรลับ ณ ระเบียงไม้รับลม พร้อมฟังเรื่องเล่าประวัติศาสตร์จากปราชญ์ท้องถิ่น",
    snippet_en: "Experience the golden-age nostalgia of Takua Pa with premium traditional Chinese tea pairings, warm homemade Tao Sae pastries, and Peranakan delicacies on the breezy wooden veranda.",
    snippet_zh: "重溫錫礦黃金時代悠然雅韻，於通透木質外廊細品嚴選茗茶，搭配現烤古法豆沙餅、胡椒餅與娘惹私房糕點，聆聽文史專家講述老街風華。",
    detailed_desc_th: "เปิดประสบการณ์สุนทรียศาสตร์แห่งการจิบชาในบริบทของโรงเรียนจีนโบราณอายุ 120 ปี ผู้เข้าร่วมจะได้สัมผัสพิธีชงชาจีนกังฟู (Gongfu Tea Ceremony) เรียนรู้เทคนิคการคุมอุณหภูมิน้ำและการดึงเอกลักษณ์ของใบชา 3 ชนิด (ชาอู่หลงสุริยัน, ชาหลงจิ่งใบไผ่สด, และชาดำกังฟูเปอรานากัน) เสิร์ฟคู่กับขนมเต้าส้ออบสดใหม่จากเตาถ่าน ขนมพริกไทยโบราณ และขนมโกสุ้ยน้ำตาลอ้อยสูตรดั้งเดิมของตระกูลคหบดีเมืองแร่ พร้อมร่วมสนทนาประวัติศาสตร์และเกร็ดชีวิตชาวฮกเกี้ยนในบรรยากาศส่วนตัว",
    detailed_desc_en: "Immerse yourself in a 120-year-old living heritage tea ritual. Learn the delicate Gongfu tea brewing techniques across 3 artisanal tea varieties (Charcoal Oolong, Fresh Bamboo Longjing, and Peranakan Black Tea). Each tea is meticulously paired with freshly baked Tao Sae pastries, heritage pepper biscuits, and artisanal Ko Sui sugar sweets, accompanied by oral history stories told by local elders.",
    detailed_desc_zh: "沉浸於百年華校特有的文人雅集氛圍。在專業茶藝師帶領下，體驗閩南工夫茶道之精髓，品鑑炭焙烏龍、鮮竹龍井與娘惹工夫紅茶等三款精選茶品，佐以老街炭火手工豆沙餅、古法胡椒餅與紅糖高水糕，聆聽老城僑商家族口述傳奇。",
    highlights_th: [
      "🫖 เวิร์กช็อปสาธิตและลงมือชงชากังฟูสไตล์ฮกเกี้ยนโบราณ",
      "🥟 เซ็ตขนมมรดก 5 ชนิด อบสดใหม่ รสชาติดั้งเดิม",
      "📖 ฟังบทกวีและประวัติศาสตร์เมืองเหมืองแร่จากปราชญ์ชุมชน",
      "🎁 รับชุดใบชาของขวัญพิเศษ 'เต้าหมิง ซิกเนเจอร์ เบลนด์' กลับบ้าน"
    ],
    highlights_en: [
      "🫖 Hands-on Hokkien Gongfu tea brewing masterclass",
      "🥟 5 handcrafted heritage pastries baked fresh on-site",
      "📖 Intimate oral history & poetry storytelling circle",
      "🎁 Complimentary 'Dao Ming Signature Tea Blend' gift tin"
    ],
    highlights_zh: [
      "🫖 閩南工夫茶席實操沖泡體驗與茶席美學",
      "🥟 現烤5款德古巴非遺名點與娘惹手工糕餅",
      "📖 德古巴文史學者親述礦鄉百年傳奇歷史",
      "🎁 獲贈精裝「導明專屬特調茶禮盒」乙份"
    ],
    schedule_th: [
      { time: "14:00 - 14:20", activity: "ลงทะเบียน & ต้อนรับด้วยน้ำชาสมุนไพรดอกสายน้ำผึ้ง" },
      { time: "14:20 - 15:10", activity: "ศาสตร์แห่งการชงชากังฟู & การจับคู่รสชาติกับขนมเมืองเก่า" },
      { time: "15:10 - 16:00", activity: "สุนทรีย์จิบชาเสวนา: 'รอยเวลาโต๊ะเบ๋งสู่เต้าหมิง' โดยครูภูมิปัญญาท้องถิ่น" },
      { time: "16:00 - 16:30", activity: "ถ่ายภาพที่ระลึก ณ ระเบียงไม้โคโลเนียล & รับชุดชาของขวัญ" }
    ],
    schedule_en: [
      { time: "02:00 - 02:20 PM", activity: "Registration & Welcome Honeysuckle Herbal Infusion" },
      { time: "02:20 - 03:10 PM", activity: "Gongfu Tea Mastery & Takua Pa Pastry Pairing" },
      { time: "03:10 - 04:00 PM", activity: "Storytelling Circle: 'From Toh Beng to Dao Ming'" },
      { time: "04:00 - 04:30 PM", activity: "Commemorative Photo at Veranda & Gift Presentation" }
    ],
    schedule_zh: [
      { time: "14:00 - 14:20", activity: "嘉賓簽到與享用金銀花迎賓清茶" },
      { time: "14:20 - 15:10", activity: "閩南工夫茶道研習與老城古法糕餅風味配對" },
      { time: "15:10 - 16:00", activity: "文史沙龍：由老校友講述「從卓明到導明」百年往事" },
      { time: "16:00 - 16:30", activity: "殖民風情外廊合影留念與領取紀念茶禮" }
    ],
    instructor_th: "อ.วิบูลย์ ตันติพัฒนกุล (ผู้เชี่ยวชาญวัฒนธรรมชา) & ป้าสมศรี (ช่างทำขนมเต้าส้อรุ่นที่ 3)",
    instructor_en: "Master Wiboon (Tea Sommelier) & Aunt Somsri (3rd-gen Tao Sae Baker)",
    instructor_zh: "威汶茶藝導師 & 頌詩阿姨（百年豆沙餅第三代傳人）",
    loc_th: "📍 โซน D: Community Lounge & Veranda",
    loc_en: "📍 Zone D: Community Lounge & Veranda",
    loc_zh: "📍 D區：百年木質連廊與社區茶座",
    time_th: "⏰ 14:00 - 16:30 น.",
    time_en: "⏰ 02:00 PM - 04:30 PM",
    time_zh: "⏰ 14:00 - 16:30",
    cap_th: "👥 รับ 16 ท่าน (เหลือ 4 ที่)",
    cap_en: "👥 16 spots (4 remaining)",
    cap_zh: "👥 限額 16 位 (尚餘 4 席)",
    price_th: "฿490 / ท่าน (เซ็ตชากา + ขนม 5 ชนิด)",
    price_en: "฿490 / pax (Full Tea Pot & 5 Delicacies Set)",
    price_zh: "฿490 / 位 (含整壺名茶 + 5款傳統茶點套裝)",
    btnType: "tea_simulator"
  },
  {
    id: "e2",
    category: "exhibition",
    image: "/assets/event-exhibition.jpg",
    tag_th: "นิทรรศการถาวร",
    tag_en: "Special Exhibition",
    tag_zh: "歷史常設特展",
    day_th: "12-31",
    month_th: "ส.ค. 2569",
    day_en: "12-31",
    month_en: "Aug 2026",
    day_zh: "12-31",
    month_zh: "8月 2026",
    title_th: 'นิทรรศการภาพถ่าย: "รอยยิ้มและสายแร่แห่งเมืองตะกั่วป่า"',
    title_en: 'Photo Exhibition: "Smiles & Tin Veins of Takua Pa"',
    title_zh: '歷史影像展：「錫脈歲月 · 德古巴百年笑顏」',
    snippet_th: "คอลเลกชันภาพถ่ายประวัติศาสตร์ของชาวเหมืองโบราณและใบหน้าของผู้คนในชุมชนศรีตะกั่วป่า บันทึกวิถีชีวิตกว่า 6 ทศวรรษ",
    snippet_en: "A historic curation of portraits of early tin miners and Sri Takua Pa residents, chronicling over six decades of community life.",
    snippet_zh: "匯聚珍貴歷史原照，展出早期華人礦工、老街街坊與百年校園師生生活光影，跨越六十餘載記憶長河。",
    detailed_desc_th: "นิทรรศการภาพถ่ายโบราณที่รวบรวมฟิล์มกระจกและภาพถ่ายหายากกว่า 100 ชิ้น ซึ่งได้รับการบูรณะด้วยเทคโนโลยีดิจิทัลความละเอียดสูง ถ่ายทอดภาพชีวิตของชาวเหมืองดีบุก คนร่อนแร่ริมแม่น้ำตะกั่วป่า ขบวนแห่พระประเพณีกินผัก และภาพครู-นักเรียนโรงเรียนเต้าหมิงในอดีต พร้อมการจัดแสดงเครื่องมือทำเหมืองโบราณจริง เช่น กระชอนร่อนแร่ ตะเกียงเจ้าพายุ และสมุดทะเบียนนักเรียนภาษาสายพินอินปี พ.ศ. 2480",
    detailed_desc_en: "A landmark photographic exhibition presenting over 100 digitally restored vintage glass-plate photographs and archival artifacts. Explore the untold human stories behind Takua Pa's world-famous tin mining boom, vibrant Vegetarian Festival parades, and classroom memories of Dao Ming School spanning from 1920 to 1980.",
    detailed_desc_zh: "極具文史價值的歷史原照特展，精選逾百幅經高解析數位修復的珍貴玻璃底片與黑白老照片。生動呈現昔日錫礦採掘工人、淘錫婦女、九皇齋節巡境盛況與早期師生課堂光景，現場更陳列採錫器具、復古馬燈與民國二十年代學籍手冊等實物展品。",
    highlights_th: [
      "📸 ฟิล์มกระจกโบราณและภาพถ่ายประวัติศาสตร์บูรณะคมชัดสูงกว่า 100 ภาพ",
      "⛏️ วัตถุโบราณและอุปกรณ์การทำเหมืองแร่ดีบุกของจริงในอดีต",
      "🎧 รองรับระบบ Audio Guide สแกนฟังเสียงบรรยายประวัติศาสตร์ผ่านมือถือ",
      "🏛️ จัดแสดงในโถงอาคารไม้ประวัติศาสตร์ที่ได้รับรางวัล ASA 2569"
    ],
    highlights_en: [
      "📸 Over 100 high-resolution restored glass-plate photographs",
      "⛏️ Authentic tin mining tools and school artifacts on display",
      "🎧 Smartphone QR Audio Guide integration across all exhibits",
      "🏛️ Housed inside the ASA Award-winning 1922 wooden schoolhouse"
    ],
    highlights_zh: [
      "📸 逾百幅高精修復之百年玻璃底片珍貴原照",
      "⛏️ 昔日錫礦採掘工具與老校舍實物文獻展出",
      "🎧 支援手機掃描語音導覽，聆聽生動文史背景",
      "🏛️ 於榮獲2026年泰國皇家建築大獎之主展廳內展出"
    ],
    schedule_th: [
      { time: "09:00 - 18:00", activity: "เปิดให้เข้าชมนิทรรศการอิสระทุกวัน (ปิดวันจันทร์)" },
      { time: "10:30 & 15:00", activity: "รอบนำชมนิทรรศการพิเศษโดยมัคคุเทศก์ท้องถิ่น (วันละ 2 รอบ รอบละ 30 นาที)" }
    ],
    schedule_en: [
      { time: "09:00 AM - 06:00 PM", activity: "Open daily for free public viewing (Closed Mondays)" },
      { time: "10:30 AM & 03:00 PM", activity: "Guided Docent Walking Tour (2 daily sessions, 30 mins each)" }
    ],
    schedule_zh: [
      { time: "09:00 - 18:00", activity: "每日開放自由參觀（每週一休館）" },
      { time: "10:30 與 15:00", activity: "在地文史志工專人定時導覽（每日兩場，每場約30分鐘）" }
    ],
    instructor_th: "ภัณฑารักษ์: มูลนิธิโรงเรียนเต้าหมิง ตะกั่วป่า ร่วมกับ ชมรมอนุรักษ์มรดกพังงา",
    instructor_en: "Curated by Dao Ming Foundation & Phang Nga Heritage Society",
    instructor_zh: "策展方：德古巴導明學校基金會 & 攀牙文史遺產保護協會",
    loc_th: "📍 โซน A: โถงอาคารไม้",
    loc_en: "📍 Zone A: Main Heritage Hall",
    loc_zh: "📍 A區：百年木構主展廳",
    time_th: "⏰ 09:00 - 18:00 น. ทุกวัน (ปิดวันจันทร์)",
    time_en: "⏰ 09:00 AM - 06:00 PM Daily (Closed Mondays)",
    time_zh: "⏰ 每日 09:00 - 18:00 (週一休館)",
    cap_th: "👥 ไม่จำกัดจำนวน (เข้าชมฟรี)",
    cap_en: "👥 Open to public (Free Admission)",
    cap_zh: "👥 免費自由參觀",
    price_th: "เข้าชมฟรี",
    price_en: "Free Admission",
    price_zh: "免費入場",
    isFree: true,
    btnType: "details"
  },
  {
    id: "e3",
    category: "market",
    image: "/assets/event-market.jpg",
    tag_th: "ตลาดสร้างสรรค์",
    tag_en: "Creative Market",
    tag_zh: "老城文創市集",
    day_th: "ส.-อา.",
    month_th: "ตลอดเดือน",
    day_en: "Sat-Sun",
    month_en: "Every Weekend",
    day_zh: "每週六日",
    month_zh: "常態舉辦",
    title_th: "เต้าหมิง ครีเอทีฟ มาร์เก็ต & ดนตรีในสวน",
    title_en: "Dao Ming Twilight Creative Market & Garden Music",
    title_zh: "導明黃昏文創市集 & 庭院草地音樂會",
    snippet_th: "ตลาดนัดงานคราฟต์ ขนมพื้นเมืองหาทานยาก ผลผลิตเกษตรอินทรีย์ และการแสดงดนตรีอะคูสติกยามเย็นใต้แสงโคมไฟโบราณ",
    snippet_en: "Handmade crafts, rare heritage sweets, organic harvest, and live acoustic music under warm vintage lanterns in the courtyard.",
    snippet_zh: "集結在地手作工藝、罕見傳統古早味點心、在地有機農產與黃昏不插電吉他民謠演出，燈火璀璨溫馨。",
    detailed_desc_th: "ตลาดนัดสร้างสรรค์ยามเย็นที่ผสานบรรยากาศเมืองเก่าเข้ากับพลังศิลปะของคนรุ่นใหม่ ณ ลานกลางแจ้งหน้าอาคารเต้าหมิง พบกับร้านค้ากว่า 30 บูธ จำหน่ายงานคราฟต์ทำมือ ผ้าบาติกมัดย้อมธรรมชาติ เครื่องประดับแร่ดีบุก ขนมโบราณตะกั่วป่าหาทานยาก (เช่น ขนมอาจาด, เต้าส้อโบราณ, โอเอ๋ว) กาแฟโรบัสต้าคั่วบดสดจากสวนพังงา พร้อมเวทีดนตรีสดอะคูสติกแจ๊สและเพลงพื้นบ้านใต้ร่มเงาต้นไม้ใหญ่",
    detailed_desc_en: "A vibrant twilight bazaar celebrating local artisans and cultural gastronomy in Dao Ming's front courtyard. Browse over 30 artisan stalls showcasing handmade natural batik, artisan tin jewelry, rare Takua Pa snacks (Achar, fresh Tao Sae, Aiyu jelly), and local single-origin Robusta coffee, soundtracked by live acoustic jazz and folk music beneath warm heritage lanterns.",
    detailed_desc_zh: "匯聚老城文藝氣息與青年創意的黃昏市集。三十餘家在地精選攤位進駐，展售天然植物染蠟染、錫藝文創飾品、即將失傳的傳統小吃（阿查點心、豆沙餅、愛玉凍）與攀牙產地精品咖啡。夜幕降臨時，復古燈籠亮起，草地吉他民謠與爵士樂不插電悠揚響起。",
    highlights_th: [
      "🏮 กว่า 30 ร้านค้างานคราฟต์ อาหารพื้นถิ่น และงานออกแบบร่วมสมัย",
      "🎸 การแสดงดนตรีสด Acoustic Jazz & Folk ยามเย็น (17:30 - 20:00 น.)",
      "🌱 โซนตลาดเกษตรอินทรีย์และสินค้าชุมชนเมืองตะกั่วป่า",
      "🎨 เวิร์กช็อปมินิคราฟต์สำหรับเด็กและครอบครัวริมสนามหญ้า"
    ],
    highlights_en: [
      "🏮 30+ curated local artisan crafts, street cuisine & design stalls",
      "🎸 Live Acoustic Jazz & Folk garden performances (05:30 - 08:00 PM)",
      "🌱 Takua Pa organic farmers' harvest & slow food pantry",
      "🎨 Family-friendly mini craft workshops on the grass lawn"
    ],
    highlights_zh: [
      "🏮 逾30家文創手作、在地道地美食與設計選品攤位",
      "🎸 黃昏草地不插電爵士民謠音樂現場（17:30 - 20:00）",
      "🌱 德古巴在地有機小農直產綠色慢食市集",
      "🎨 適合親子家庭參與的戶外微型手作體驗區"
    ],
    schedule_th: [
      { time: "16:00 - 17:30", activity: "เปิดตลาด ช้อปปิ้งงานคราฟต์ & ชิมอาหารพื้นบ้านยามเย็น" },
      { time: "17:30 - 19:00", activity: "ดนตรีอะคูสติกในสวน ช่วงที่ 1: เพลงบรรเลงร่วมสมัย" },
      { time: "19:00 - 20:30", activity: "ดนตรีในสวน ช่วงที่ 2: เพลงแจ๊สคลาสสิก & เรื่องเล่าตะกั่วป่า" },
      { time: "20:30 - 21:00", activity: "ชมแสงไฟโคมโบราณประดับอาคารเต้าหมิงยามค่ำคืน" }
    ],
    schedule_en: [
      { time: "04:00 - 05:30 PM", activity: "Market Opens: Artisan Shopping & Local Gastronomy" },
      { time: "05:30 - 07:00 PM", activity: "Garden Acoustic Session 1: Contemporary Melodies" },
      { time: "07:00 - 08:30 PM", activity: "Garden Acoustic Session 2: Nostalgic Jazz & Stories" },
      { time: "08:30 - 09:00 PM", activity: "Heritage Night Illumination & Starlight Walk" }
    ],
    schedule_zh: [
      { time: "16:00 - 17:30", activity: "市集開市：文創攤位漫步與品嚐老城道地風味" },
      { time: "17:30 - 19:00", activity: "星空音樂會上半場：青年當代吉他原聲演奏" },
      { time: "19:00 - 20:30", activity: "星空音樂會下半場：復古爵士樂與德古巴故事夜" },
      { time: "20:30 - 21:00", activity: "欣賞導明校舍復古燈籠夜景與老街散步" }
    ],
    instructor_th: "จัดโดย: เครือข่ายผู้ประกอบการสร้างสรรค์ตะกั่วป่า & วงดนตรี Takua Pa Youth Jazz",
    instructor_en: "Hosted by Takua Pa Creative Collective & Youth Jazz Ensemble",
    instructor_zh: "主辦方：德古巴文創青年聯盟 & 德古巴青年爵士樂團",
    loc_th: "📍 โซน B: ลานกลางแจ้งเต้าหมิง",
    loc_en: "📍 Zone B: Dao Ming Courtyard",
    loc_zh: "📍 B區：導明戶外文化庭院",
    time_th: "⏰ ทุกวันเสาร์ - อาทิตย์: 16:00 - 21:00 น.",
    time_en: "⏰ Every Saturday - Sunday: 04:00 PM - 09:00 PM",
    time_zh: "⏰ 每週六至週日 16:00 - 21:00",
    cap_th: "👥 ชุมชนและนักท่องเที่ยว (เข้าชมฟรี)",
    cap_en: "👥 Free Admission for all",
    cap_zh: "👥 免費入場自由漫步",
    price_th: "เข้างานฟรี",
    price_en: "Free Admission",
    price_zh: "免費入場",
    isFree: true,
    btnType: "shops"
  },
  {
    id: "e4",
    category: "talk",
    image: "/assets/event-talk.jpg",
    tag_th: "เสวนาชุมชน",
    tag_en: "Community Forum",
    tag_zh: "地方創生論壇",
    day_th: "30",
    month_th: "ส.ค. 2569",
    day_en: "30",
    month_en: "Aug 2026",
    day_zh: "30",
    month_zh: "8月 2026",
    title_th: 'เสวนา: "ชุบชีวิตเมืองเก่าด้วยพลังคนรุ่นใหม่ & เศรษฐกิจสร้างสรรค์"',
    title_en: 'Forum: "Revitalizing Old Towns with Youth & Creative Economy"',
    title_zh: '創生對話：「以青年力量與文創經濟重塑老城活力」',
    snippet_th: "พูดคุยกับสถาปนิก นักอนุรักษ์ และผู้ประกอบการรุ่นใหม่ที่กลับมาพัฒนาบ้านเกิด แลกเปลี่ยนโมเดลการขับเคลื่อนเมืองรองสู่สากล",
    snippet_en: "Conversations with architects, conservationists, and homecoming entrepreneurs discussing models for sustainable creative towns.",
    snippet_zh: "特邀建築修復名家、文史守護者與返鄉創業青年齊聚一堂，探討如何兼顧歷史保存與永續文創經濟循環。",
    detailed_desc_th: "เวทีเสวนาครั้งสำคัญที่รวมตัวบุคคลชั้นนำด้านการอนุรักษ์สถาปัตยกรรมระดับชาติ ตัวแทนสมาคมสถาปนิกสยามฯ (ASA) นักวิจัยประวัติศาสตร์ และกลุ่มคนรุ่นใหม่ที่ตัดสินใจย้ายกลับมาตั้งรกรากในตะกั่วป่า เพื่อร่วมแลกเปลี่ยนมุมมอง 'Living Heritage Model' การเปลี่ยนอาคารร้างให้กลายเป็นพื้นที่สร้างสรรค์ที่สามารถหล่อเลี้ยงชุมชนและสร้างมูลค่าทางเศรษฐกิจจริงอย่างยั่งยืน ผู้เข้าร่วมสามารถซักถามและเสนอแนวคิดในการพัฒนาเมืองเก่าร่วมกัน",
    detailed_desc_en: "A thought-provoking forum convening award-winning conservation architects from the Association of Siamese Architects (ASA), cultural researchers, and homecoming entrepreneurs. Dive deep into the 'Living Heritage Model'—transforming historic buildings into economically self-sustaining cultural nodes without compromising authentic identity.",
    detailed_desc_zh: "匯集泰國皇家建築師協會（ASA）保護專家、資深文史學者與返鄉青年創業代表的高峰對話。深度探討「活態遺產再生模式」，分享如何將沉寂的歷史建物轉型為具備自我造血能力的文創新樞紐，並提供現場提問與創想共建環節。",
    highlights_th: [
      "🎤 4 วิทยากรแถวหน้าด้านการอนุรักษ์และพัฒนาเศรษฐกิจสร้างสรรค์",
      "🏛️ ถอดบทเรียนกรณีศึกษา 'เต้าหมิง โมเดล' สู่รางวัลอนุรักษ์ระดับประเทศ",
      "☕ บริการชา กาแฟ และของว่างพื้นเมืองตลอดช่วงเสวนา",
      "🤝 ช่วง Networking แลกเปลี่ยนเครือข่ายความร่วมมือหลังจบงาน"
    ],
    highlights_en: [
      "🎤 Keynotes by 4 leading architects & creative entrepreneurs",
      "🏛️ In-depth case study on the award-winning Dao Ming Model",
      "☕ Complimentary Takua Pa artisanal coffee & tea breaks",
      "🤝 Networking & project collaboration session after the talks"
    ],
    highlights_zh: [
      "🎤 4位國家級建築保護專家與文創先鋒主題演講",
      "🏛️ 深入剖析「導明模式」如何榮獲國家級建築大獎",
      "☕ 全程享用在地產地手沖咖啡與工夫茶歇",
      "🤝 會後自由交流環節，共促跨界合作與資源對接"
    ],
    schedule_th: [
      { time: "13:30 - 14:00", activity: "ลงทะเบียน & รับเอกสารสรุปโครงการอนุรักษ์เต้าหมิง" },
      { time: "14:00 - 15:00", activity: "Session 1: ถอดรหัสสถาปัตยกรรมอั้งม่อเหลาเต้าหมิงสู่รางวัล ASA 2569" },
      { time: "15:00 - 15:15", activity: "Coffee & Tea Break ลิ้มรสกาแฟพังงาและขนมเต้าส้อ" },
      { time: "15:15 - 16:15", activity: "Session 2: เสวนาโต๊ะกลม 'เยาวชนคืนถิ่น & พลังขับเคลื่อนเมืองเก่า'" },
      { time: "16:15 - 16:30", activity: "Q&A เปิดรับคำถามและข้อเสนอแนะจากผู้ร่วมงาน" }
    ],
    schedule_en: [
      { time: "01:30 - 02:00 PM", activity: "Check-in & Heritage Project Kit Distribution" },
      { time: "02:00 - 03:00 PM", activity: "Session 1: Decoding Dao Ming's Architecture to ASA 2026 Award" },
      { time: "03:00 - 03:15 PM", activity: "Artisanal Coffee & Heritage Pastry Break" },
      { time: "03:15 - 04:15 PM", activity: "Session 2: Roundtable: 'Homecoming Youth & Old Town Economy'" },
      { time: "04:15 - 04:30 PM", activity: "Open Q&A & Audience Co-Creation Session" }
    ],
    schedule_zh: [
      { time: "13:30 - 14:00", activity: "現場簽到與領取導明建築修復文獻手冊" },
      { time: "14:00 - 15:00", activity: "第一單元：解碼導明紅毛樓建築美學與ASA大獎歷程" },
      { time: "15:00 - 15:15", activity: "老城精品手沖咖啡與古法點心茶歇" },
      { time: "15:15 - 16:15", activity: "第二單元：圓桌論壇「青年返鄉與老城文創永續循環」" },
      { time: "16:15 - 16:30", activity: "現場問答與共創提案互動" }
    ],
    instructor_th: "วิทยากร: สถาปนิกผู้ดูแลโครงการบูรณะเต้าหมิง, นายกสมาคมท่องเที่ยวพังงา, และผู้แทนชุมชน",
    instructor_en: "Speakers: Lead Conservation Architect, President of Tourism Association, and Youth Leader",
    instructor_zh: "主講嘉賓：導明修復項目首席建築師、攀牙旅遊協會會長與青年代表",
    loc_th: "📍 โซน A: โถงอาคารไม้ + Live",
    loc_en: "📍 Zone A: Main Hall + Livestream",
    loc_zh: "📍 A區：主展廳現場 + 全球線上直播",
    time_th: "⏰ 14:00 - 16:30 น.",
    time_en: "⏰ 02:00 PM - 04:30 PM",
    time_zh: "⏰ 14:00 - 16:30",
    cap_th: "👥 รับ 60 ที่นั่ง (สำรองที่นั่งล่วงหน้า)",
    cap_en: "👥 60 Reserved Seats (RSVP Required)",
    cap_zh: "👥 現場預約 60 席 (需提前登記)",
    price_th: "ฟรี (สำรองที่นั่ง)",
    price_en: "Free (RSVP Required)",
    price_zh: "免費 (需提前預約)",
    isFree: true,
    btnType: "reserve"
  }
];
