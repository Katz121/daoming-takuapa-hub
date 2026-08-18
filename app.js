/**
 * DAO MING CREATIVE HERITAGE HUB — INTERACTION & BILINGUAL ENGINE
 * Takua Pa, Phang Nga
 * Authentic Historical Data based on Dao Ming Factsheet & Archives
 */

// Current State
let currentLang = localStorage.getItem('daoming_lang') || 'th';
let currentSelectedZoneKey = "hall";
let currentSelectedYearKey = "1905";
let currentSelectedGableKey = "tiangong";
let currentEventFilter = "all";

/* ==========================================================================
   TRANSLATION DICTIONARIES (TH / EN)
   ========================================================================== */
const translations = {
  th: {
    // Header & Navigation
    brand_title: "โรงเรียนเต้าหมิง",
    brand_sub: "DAO MING · TAKUA PA HUB",
    nav_story: "ประวัติศาสตร์",
    nav_gable: "ปรัชญาหน้าจั่ว",
    nav_archive: "คลังภาพเก่า",
    nav_vision: "วิสัยทัศน์",
    nav_spaces: "ผังพื้นที่",
    nav_events: "กิจกรรม",
    nav_ideas: "ไอเดีย",
    nav_visit: "การเดินทาง",
    btn_book_space: "ขอใช้พื้นที่",
    btn_book_space_full: "ขอใช้พื้นที่จัดกิจกรรม",

    // Mobile Drawer
    m_nav_story: "๑. ประวัติศาสตร์ & สถาปัตยกรรม",
    m_nav_gable: "๒. ปรัชญาหน้าจั่วจำลองจักรวาล",
    m_nav_archive: "๓. คลังภาพเก่า (Living Archive)",
    m_nav_vision: "๔. วิสัยทัศน์พื้นที่สร้างสรรค์",
    m_nav_spaces: "๕. แผนผัง & โซนพื้นที่",
    m_nav_events: "๖. ปฏิทินกิจกรรม",
    m_nav_ideas: "๗. ร่วมออกไอเดีย (Idea Wall)",
    m_nav_booking: "๘. ขอใช้พื้นที่จัดงาน",
    m_nav_visit: "๙. การเดินทาง & แผนที่",

    // Hero Section
    hero_award_text: "รางวัลอนุรักษ์ศิลปสถาปัตยกรรม ประจำปี 2569 · สมาคมสถาปนิกสยาม ในพระบรมราชูปถัมภ์ (ASA)",
    hero_badge: "โรงเรียนจีนแห่งแรกและแห่งเดียวของ จ.พังงา · ก่อตั้ง พ.ศ. 2448 / อาคาร พ.ศ. 2465",
    hero_title: 'คืนชีวิตให้ <span class="highlight-wood">เส้นทางแห่งแสงสว่าง</span><br>เติมพลังสร้างสรรค์สู่ <span class="highlight-terracotta">อนาคต</span>',
    hero_desc: 'จาก <strong>"โต๊ะเบ๋ง" สู่ "เต้าหมิง" (導明)</strong> โรงเรียนจีนแห่งแรกของจังหวัดพังงาที่สร้างขึ้นโดยการลงขันของคหบดีเหมืองแร่และช่างผาวในปี 2465 สู่การเป็น <strong>มรดกที่มีชีวิต (Living Heritage)</strong> ภายใต้มูลนิธิโรงเรียนเต้าหมิง ตะกั่วป่า เพื่อการเรียนรู้ วัฒนธรรม และพื้นที่สร้างสรรค์ของทุกคน',
    hero_btn_vision: "สำรวจวิสัยทัศน์ & พื้นที่",
    hero_btn_story: "อ่านประวัติ 120 ปี",
    hero_stat_1: "ปี นับแต่เริ่มก่อตั้ง พ.ศ. 2448 (โต๊ะเบ๋ง)",
    hero_stat_2: "ปีสร้างอาคารอั้งม่อเหลา โดยนายผาว",
    tag_status: "🏆 สมาคมสถาปนิกสยามฯ 2569",
    tag_location: "📍 ย่านเมืองเก่าศรีตะกั่วป่า",
    caption_title: '"เต้าหมิง (導明) แปลว่า หนทางแห่งแสงสว่างและปัญญา"',
    caption_sub: "อาคารอั้งม่อเหลาสาธารณะ ผสานคลาสสิกโคโลเนียลและปรัชญาจีน",

    // Story Section
    story_tag: "AUTHENTIC HISTORY & FOUNDATION",
    story_title: 'ประวัติศาสตร์ความเป็นมา "โรงเรียนเต้าหมิง"',
    story_subtitle: "จากโรงเรียนจีนแห่งแรกของจังหวัดพังงา สู่มรดกทางสถาปัตยกรรมและจิตวิญญาณแห่งความสามัคคีของชุมชน",
    narrative_1_title: "๑. กำเนิด 'โต๊ะเบ๋ง' สู่ 'เต้าหมิง' (พ.ศ. ๒๔๔๘ - ๒๔๖๓)",
    narrative_1_desc: "ก่อตั้งอย่างไม่เป็นทางการในปี 2448 เดิมใช้ชื่อสำเนียงฮกเกี้ยนว่า <strong>“โต๊ะเบ๋ง”</strong> ก่อนเปลี่ยนเป็น <strong>“เต้าหมิง” (導明)</strong> สำเนียงจีนกลาง และจดทะเบียนเป็นโรงเรียนราษฎร์ในปี 2463 คำว่า <em>เต้า</em> หมายถึง ทาง/ชี้นำ, <em>หมิง</em> หมายถึง แสงสว่าง/ความเข้าใจ รวมกันคือ <strong>'เส้นทางสู่แสงสว่างแห่งปัญญา'</strong>",
    narrative_2_title: "๒. สถาปัตยกรรมอั้งม่อเหลา & ช่างผาว (พ.ศ. ๒๔๖๕)",
    narrative_2_desc: "อาคารหลังปัจจุบัน (หลังที่ 2) สร้างเมื่อปี 2465 โดย <strong>'นายผาว'</strong> ช่างฝีมือชาวจีนฮกเกี้ยน ทุนทรัพย์จากการลงขันของพ่อค้าเหมืองแร่ในตะกั่วป่า ระนอง และภูเก็ต อาคารเป็นรูปแบบอั้งม่อเหลาประยุกต์โคโลเนียล ใช้คอนกรีตเสริมเหล็กยุคแรก ผนังก่ออิฐ มุขยื่น 2 ชั้น ระเบียงรอบ และประดับหัวเสาแบบกรีก",
    narrative_3_title: "๓. โครงสร้างที่ดิน & มูลนิธิเพื่อสาธารณะ",
    narrative_3_desc: "ที่ดินเกิดจากการร่วมซื้อของชาวจีนหลายครอบครัว ถือครอง สค.1 ในนามคนไทย 3 คน เพื่อเป็น <strong>'มรดกของลูกหลานตะกั่วป่า'</strong> ในปี 2533 ได้จัดตั้ง <strong>'มูลนิธิโรงเรียนเต้าหมิง ตะกั่วป่า'</strong> และในปี 2542 ทายาททั้ง 3 ท่านได้ส่งมอบกรรมสิทธิ์ที่ดินและอาคารให้แก่มูลนิธิฯ อย่างสมบูรณ์ 100%",
    tl_header_title: "ลำดับกาลเวลา ๑๒๐ ปี เต้าหมิง (Chronological Milestones)",
    tl_header_subtitle: "คลิกเลือกยุคสมัยเพื่อศึกษาประวัติศาสตร์และหลักฐานที่บันทึกไว้",
    tl_btn_1_year: "2448 - 2465",
    tl_btn_1_label: "โต๊ะเบ๋งสู่เต้าหมิง & ช่างผาว",
    tl_btn_2_year: "2480 - 2510",
    tl_btn_2_label: "ศูนย์กลางชุมชน & รับรองกงสุล",
    tl_btn_3_year: "2533 - 2547",
    tl_btn_3_label: "จัดตั้งมูลนิธิฯ & บูรณะอาคาร",
    tl_btn_4_year: "ปัจจุบัน & รางวัล ASA",
    tl_btn_4_label: "บริบทใหม่ & มรดกที่มีชีวิต",
    tl_step_prev: "ยุคก่อนหน้า",
    tl_step_next: "ยุคถัดไป",

    // Gable Section
    gable_tag: "COSMIC FACADE PHILOSOPHY",
    gable_title: 'ถอดรหัสปรัชญาหน้าจั่ว: "ภาพจำลองจักรวาล ฟ้า-ดิน-คน"',
    gable_subtitle: "หน้าจั่วอาคารเต้าหมิงได้รับการออกแบบอย่างลึกซึ้งตามคติเต๋าและปรัชญาจีนโบราณ สื่อถึงพลังงาน ปัญญา และการศึกษา",
    gable_hint: "✦ เลือกคลิกศึกษาความหมายเชิงสัญลักษณ์ทั้ง ๕ ได้จากรายการด้านข้าง",
    gable_meaning_lbl: "ความหมายต่อการศึกษา:",
    gable_logo_badge: "อัตลักษณ์สถาปัตยกรรมเต้าหมิง",
    gable_logo_desc: "ตราสัญลักษณ์จำลองรูปทรงหน้าจั่วและปรัชญาจักรวาล ๓ ภพ 'ฟ้า - ดิน - คน'",
    btn_zoom_overview: "ดูภาพรวมทั้งอาคาร (Overview)",
    zoom_hint_pill: "✦ คลิกเลือก ๕ หัวข้อด้านขวาเพื่อซูมส่องจุดสัญลักษณ์",

    // Archive Section
    archive_tag: "HISTORICAL PHOTO ARCHIVE",
    archive_title: "คลังภาพประวัติศาสตร์โรงเรียนเต้าหมิง",
    archive_subtitle: "ภาพถ่ายจริงจากความทรงจำของชาวตะกั่วป่า ศิษย์เก่า และทายาทผู้ก่อตั้งโรงเรียน",

    // Vision Section
    vision_tag: "REVITALIZATION & LIVING HERITAGE",
    vision_title: 'โครงการ: "เต้าหมิง - บริบทใหม่ในเมืองตะกั่วป่า"',
    vision_subtitle: "การฟื้นฟูมรดกที่มีชีวิต ผสานการอนุรักษ์เชิงกายภาพ คุณค่าทางวัฒนธรรม การท่องเที่ยวเชิงนิเวศ และการมีส่วนร่วมของชุมชน",
    pillar_1_title: "พิพิธภัณฑ์มีชีวิต & บันทึกเมือง (Living Archive)",
    pillar_1_desc: "จัดแสดงนิทรรศการประวัติศาสตร์ยุคทองดีบุก ภาพถ่ายโบราณ เครื่องใช้ในอดีต บันทึกประวัติศาสตร์คำบอกเล่า (Oral History) ของคนเฒ่าคนแก่ และเปิดชั้นล่างให้อาคารเป็นพื้นที่เรียนรู้มีชีวิต",
    p1_f1: "นิทรรศการประวัติศาสตร์เหมืองแร่ & ครอบครัวชาวจีน",
    p1_f2: "ศูนย์ข้อมูลและห้องสมุดประวัติศาสตร์เมืองเก่า",
    p1_f3: "ชั้นบน: สถานปฏิบัติธรรมอันสงบเงียบ",
    pillar_2_badge: "ยอดนิยม",
    pillar_2_title: "สตูดิโอคราฟต์ & เวิร์กช็อปศิลปะ (Creative Studio)",
    pillar_2_desc: "ห้องเรียนสร้างสรรค์ที่ชวนคนทุกวัยมาลงมือทำ เปลี่ยนภูมิปัญญาท้องถิ่นให้เป็นผลิตภัณฑ์ร่วมสมัย สอนโดยช่างฝีมือ ปราชญ์ชาวบ้าน และศิลปินรุ่นใหม่",
    p2_f1: "เวิร์กช็อปพิมพ์ลายผ้าบาติกเมืองเก่า",
    p2_f2: "คลาสทำขนมเต้าส้อ & อาหารเปอรานากันโบราณ",
    p2_f3: "การปั้นเซรามิก & วาดภาพสีน้ำสถาปัตยกรรม",
    pillar_3_title: "คาเฟ่ชุมชน & Co-Working Space (Community Lounge)",
    pillar_3_desc: "พื้นที่นั่งทำงาน นัดพบปะ และคุยโปรเจกต์ใหม่ๆ สำหรับคนทำงานอิสระ คนในท้องถิ่น และนักท่องเที่ยว พร้อมเสิร์ฟเครื่องดื่มจากเมล็ดกาแฟท้องถิ่นพังงาและขนมพื้นเมือง",
    p3_f1: "โซนเงียบสำหรับอ่านหนังสือและทำงาน (High-Speed Wi-Fi)",
    p3_f2: "โต๊ะสนทนาแลกเปลี่ยนไอเดีย (Community Table)",
    p3_f3: "จำหน่ายของฝากคราฟต์ฝีมือชุมชน",
    pillar_4_title: "ลานกิจกรรม & ตลาดสร้างสรรค์ (Courtyard & Market)",
    pillar_4_desc: "ลานกว้างหน้าอาคารที่พร้อมแปลงร่างเป็นเวทีเปิดสำหรับแสดงดนตรี ฉายหนังกลางแปลง ละครเวทีชุมชน เสวนาเมือง และตลาดนัดงานคราฟต์ยามเย็น",
    p4_f1: "ตลาดนัดเต้าหมิง ครีเอทีฟ มาร์เก็ต สุดสัปดาห์",
    p4_f2: "โรงฉายภาพยนตร์กลางแปลงใต้แสงดาว",
    p4_f3: "เวทีเสวนาเมืองและศิลปะร่วมสมัย",
    pillar_action_explore_a: "ดูแผนผังโซน A (โถงอาคาร) →",
    pillar_action_explore_b: "ดูแผนผังโซน C (สตูดิโอคราฟต์) →",
    pillar_action_explore_c: "ดูแผนผังโซน D (คาเฟ่ชุมชน) →",
    pillar_action_explore_d: "ดูแผนผังโซน B (ลานกลางแจ้ง) →",
    p1_motif: "ลายพระอาทิตย์ ๑๒ รัศมี",
    p2_motif: "ลายฉลุผ้าบาติก & คราฟต์",
    p3_motif: "ลายบานหน้าต่างอั้งม่อเหลา",
    p4_motif: "ลายคลื่นน้ำแม่น้ำเมืองแร่",

    // Spaces Section
    spaces_tag: "SPACES & FACILITIES",
    spaces_title: "สำรวจแผนผังและโซนการใช้งาน",
    spaces_subtitle: "เลือกโซนที่ต้องการดูเพื่อศึกษารายละเอียด ความจุ และความเหมาะสมในการจัดกิจกรรม",
    zone_list_a_title: "โถงอาคารไม้ประวัติศาสตร์ (Main Heritage Hall)",
    zone_list_a_sub: "ชั้นล่าง · ความจุ 80 - 120 คน · เหมาะกับงานนิทรรศการ เสวนา และพิธีการ",
    zone_list_b_title: "ลานกลางแจ้งเต้าหมิง (Dao Ming Courtyard)",
    zone_list_b_sub: "ความจุ 150 - 250 คน · เหมาะกับตลาดคราฟต์ หนังกลางแปลง คอนเสิร์ต",
    zone_list_c_title: "สตูดิโอเวิร์กช็อป & ห้องเรียนคราฟต์ (Craft Studios)",
    zone_list_c_sub: "ความจุ 20 - 35 คน · พร้อมอุปกรณ์ศิลปะ โต๊ะทำงานกลุ่ม และจอโปรเจกเตอร์",
    zone_list_d_title: "คาเฟ่ชุมชน & มุมอ่านหนังสือ (Cafe & Reading Nook)",
    zone_list_d_sub: "ความจุ 30 - 45 คน · มุมพักผ่อน กาแฟ ขนมพื้นถิ่น และพื้นที่นั่งทำงาน",
    zone_list_e_title: "ระเบียงมุขยื่น 2 ชั้น & สวนหย่อม (Double Porch & Veranda)",
    zone_list_e_sub: "ความจุ 25 - 40 คน · นิทรรศการกลางแจ้ง มุมถ่ายรูป และพักผ่อน",
    spec_area_label: "📐 ขนาดพื้นที่",
    spec_cap_label: "👥 ความจุคน",
    spec_equip_label: "💡 อุปกรณ์พร้อมใช้",
    spec_vent_label: "🌿 การระบายอากาศ",
    btn_book_zone: "ขอจองใช้พื้นที่โซนนี้",
    btn_view_360: "ดูภาพจำลอง 360°",

    // Events Section
    events_tag: "CALENDAR & WORKSHOPS",
    events_title: "ปฏิทินกิจกรรม & เวิร์กช็อปสร้างสรรค์",
    events_subtitle: "ร่วมสัมผัสประสบการณ์สร้างสรรค์ ค้นหาแรงบันดาลใจ และเชื่อมต่อกับผู้คน",
    filter_all: "ทั้งหมด (All)",
    filter_workshop: "เวิร์กช็อป (Workshops)",
    filter_exhibition: "นิทรรศการ (Exhibitions)",
    filter_market: "ตลาด & ดนตรี (Markets)",
    filter_talk: "เสวนา (Talks)",
    btn_register: "ลงทะเบียน",
    btn_details: "ดูรายละเอียด",
    btn_reserve_seat: "สำรองที่นั่ง",
    btn_view_shops: "ดูร้านค้า",

    // Ideas Section
    ideas_tag: "COMMUNITY CO-CREATION",
    ideas_title: 'ร่วมออกแบบ "เต้าหมิงในฝันของคุณ"',
    ideas_subtitle: "คุณอยากให้โรงเรียนเต้าหมิงจัดกิจกรรมอะไร? มีพื้นที่แบบไหน? ส่งไอเดียของคุณเข้ามาได้เลย ไอเดียที่ได้รับความสนใจจะถูกนำไปพัฒนาจริง!",
    idea_form_heading: "เสนอไอเดียกิจกรรม",
    idea_form_sub: "ร่วมเป็นส่วนหนึ่งในการขับเคลื่อนเต้าหมิง",
    idea_label_category: "ประเภทกิจกรรม / ไอเดีย",
    opt_cat_art: "🎨 ศิลปะ & งานคราฟต์",
    opt_cat_edu: "📚 การศึกษา & ประวัติศาสตร์",
    opt_cat_food: "🍲 อาหาร & วัฒนธรรมพื้นถิ่น",
    opt_cat_show: "🎭 การแสดง & ดนตรี",
    opt_cat_env: "🌱 สิ่งแวดล้อม & ชุมชน",
    opt_cat_other: "✨ อื่นๆ",
    idea_label_title: "หัวข้อไอเดียสั้นๆ",
    idea_label_desc: "รายละเอียดกิจกรรม / สิ่งที่อยากเห็น",
    idea_label_author: "ชื่อของคุณ หรือ นามปากกา",
    btn_submit_idea: "ส่งไอเดียขึ้นกระดาน",
    ideas_wall_heading: "กระดานไอเดียจากชุมชน",
    ideas_sort_note: "🔥 กด ❤️ เพื่อโหวตไอเดียที่คุณชอบ",
    proposed_by: "เสนอโดย:",

    // Booking Section
    booking_tag: "SPACE PROPOSAL",
    booking_title: "ขอใช้พื้นที่จัดกิจกรรม / แสดงงาน",
    booking_desc: "ไม่ว่าคุณจะเป็นศิลปิน, สมาคมชุมชน, ครูอาจารย์, นักศึกษา หรือกลุ่มคนที่มีไอเดียสร้างสรรค์ โรงเรียนเต้าหมิงยินดีต้อนรับทุกข้อเสนอโครงการที่ช่วยสร้างประโยชน์และคุณค่าให้เมืองตะกั่วป่า",
    perk_1_title: "สนับสนุนพื้นที่กิจกรรมเชิงชุมชนและวัฒนธรรม",
    perk_1_desc: "มีอัตราพิเศษและพื้นที่สนับสนุนฟรีสำหรับโครงการเพื่อการศึกษาและชุมชน",
    perk_2_title: "สิ่งอำนวยความสะดวกครบครัน",
    perk_2_desc: "ระบบไฟ เครื่องเสียงพื้นฐาน โต๊ะเก้าอี้ไม้ และทีมงานประสานงานในพื้นที่",
    perk_3_title: "ช่วยประชาสัมพันธ์ผ่านช่องทางสื่อ",
    perk_3_desc: "โปรโมตผ่านเครือข่ายเมืองเก่าตะกั่วป่าและสื่อออนไลน์",
    contact_direct_label: "📞 ติดต่อด่วน / สอบถามคิวงาน:",
    booking_form_title: "แบบฟอร์มขอใช้พื้นที่",
    booking_form_sub: "กรอกข้อมูลเบื้องต้น ทีมงานจะติดต่อกลับภายใน 24 ชม.",
    lbl_book_name: "ชื่อผู้ติดต่อ / องค์กร *",
    lbl_book_phone: "เบอร์โทรศัพท์ *",
    lbl_book_email: "อีเมล",
    lbl_book_zone: "เลือกโซนที่ต้องการใช้งาน *",
    opt_zone_a: "โถงอาคารไม้ประวัติศาสตร์ (Zone A)",
    opt_zone_b: "ลานกลางแจ้งเต้าหมิง (Zone B)",
    opt_zone_c: "สตูดิโอเวิร์กช็อป (Zone C)",
    opt_zone_d: "คาเฟ่ & พื้นที่นั่งทำงาน (Zone D)",
    opt_zone_all: "เหมารวมทั้งพื้นที่ (All Zones)",
    lbl_book_date: "วันที่ต้องการจัดงาน *",
    lbl_book_att: "จำนวนผู้เข้าร่วมโดยประมาณ *",
    opt_att_1: "1 - 20 คน",
    opt_att_2: "21 - 50 คน",
    opt_att_3: "51 - 100 คน",
    opt_att_4: "มากกว่า 100 คน",
    lbl_book_desc: "ชื่อกิจกรรม & วัตถุประสงค์สั้นๆ *",
    btn_submit_booking: "ส่งคำขอจองพื้นที่",

    // Visit Section
    visit_tag: "LOCATION & WALKING ROUTE",
    visit_title: "การเดินทาง & เส้นทางเชื่อมต่อเมืองเก่า",
    visit_subtitle: "โรงเรียนเต้าหมิงตั้งอยู่ใจกลางย่านเมืองเก่าตะกั่วป่า สามารถเดินเชื่อมต่อไปยังจุดสำคัญทางประวัติศาสตร์ได้อย่างสะดวก",
    map_badge: "🗺️ แผนที่วัฒนธรรมตะกั่วป่า",
    map_title: "เส้นทางเดินเท้าวัฒนธรรมเมืองเก่าตะกั่วป่า",
    node_1_title: "โรงเรียนเต้าหมิง (Dao Ming Hub)",
    node_1_desc: "จุดศูนย์กลางมรดกมีชีวิต นิทรรศการประวัติศาสตร์ และพื้นที่สร้างสรรค์",
    node_2_title: "ศาลเจ้าพ่อกวนอู (ซิ่นใช่ตึ๋ง / กวนเต้กุ้น)",
    node_2_desc: "ห่าง 650 ม. (เดิน ~8 นาที) · ศาลเจ้าจีนฮกเกี้ยนเก่าแก่อายุกว่า 150 ปี ศูนย์รวมจิตวิญญาณชุมชน",
    node_3_title: "ถนนวัฒนธรรมศรีตะกั่วป่า (ถนนคนเดินหลาดใหญ่)",
    node_3_desc: "ห่าง 700 ม. (เดิน ~9 นาที / ปั่นจักรยาน 2 นาที) · ย่านตึกแถวชิโน-โปรตุกีส ตลาดวันอาทิตย์ ขนมเต้าส้อ",
    node_4_title: "วัดเสนานุชรังสรรค์ & กำแพงเมืองเก่าตะกั่วป่า",
    node_4_desc: "ห่าง 750 ม. (เดิน ~10 นาที) · พระอารามหลวงประวัติศาสตร์สมัย ร.๕ และโบราณสถานค่ายคูเมือง",
    node_5_title: "สะพานเหล็กโคกขนุน / บุญสูง (Boon Soong Iron Bridge)",
    node_5_desc: "ห่าง 2.9 กม. (ขับรถ ~5 นาที / ปั่นจักรยาน 10 นาที) · สะพานประวัติศาสตร์สร้างจากชิ้นส่วนเรือขุดแร่ดีบุกข้ามแม่น้ำ",
    practical_title: "ข้อมูลการเข้าชม & การติดต่อ",
    info_address_lbl: "ที่ตั้ง",
    info_address_val: "ย่านเมืองเก่าตะกั่วป่า (ใกล้ศาลเจ้าพ่อกวนอู ซิ่นใช่ตึ๋ง) ตำบลตลาดใหญ่ อำเภอตะกั่วป่า จังหวัดพังงา 82110",
    info_hours_lbl: "เวลาเปิดทำการ",
    info_hours_val: "วันอังคาร - วันอาทิตย์: 09:00 - 18:00 น.<br>(วันที่มีกิจกรรม/ตลาด เปิดถึง 21:00 น. · ปิดวันจันทร์)",
    info_parking_lbl: "การจอดรถ",
    info_parking_val: "มีจุดจอดรถรองรับบริเวณลานวัดใกล้เคียงและริมถนนศรีตะกั่วป่า",
    info_admission_lbl: "ค่าเข้าชมพื้นที่ทั่วไป",
    info_admission_val: "เข้าชมฟรี (Free Admission)",
    btn_open_gmaps: "เปิด Google Maps นำทางสู่โรงเรียนเต้าหมิง",
    social_follow_lbl: "ติดตามข่าวสาร:",
    dock_maps: "นำทาง",
    dock_events: "กิจกรรม",
    dock_ideas: "ไอเดีย",
    dock_book: "ใช้พื้นที่",
    dock_top: "บนสุด",

    // Footer
    footer_tagline: '"สืบสานรากเหง้าเมืองเหมืองแร่ เติมพลังความคิดสร้างสรรค์สู่อนาคตอย่างยั่งยืน"',
    footer_col1_title: "เมนูด่วน",
    f_story: "ประวัติ 120 ปี",
    f_vision: "วิสัยทัศน์บริบทใหม่",
    f_spaces: "แผนผังพื้นที่",
    f_events: "ปฏิทินกิจกรรม",
    footer_col2_title: "การมีส่วนร่วม",
    f_ideas: "ส่งไอเดียกิจกรรม",
    f_booking: "ขอใช้พื้นที่จัดงาน",
    f_visit: "เส้นทางท่องเที่ยว",
    footer_col3_title: "เครือข่ายเมืองเก่า",
    f_net0: "มูลนิธิโรงเรียนเต้าหมิง ตะกั่วป่า",
    f_net1: "ชุมชนตลาดใหญ่ ตะกั่วป่า",
    f_net2: "เทศบาลเมืองตะกั่วป่า",
    f_net3: "สมาคมสถาปนิกสยามฯ (ASA)",
    footer_copyright: "© 2026 มูลนิธิโรงเรียนเต้าหมิง ตะกั่วป่า (Dao Ming Foundation). สงวนลิขสิทธิ์ทุกประการ",
    footer_credit: "รางวัลอนุรักษ์ศิลปสถาปัตยกรรม ประจำปี 2569 สมาคมสถาปนิกสยาม ในพระบรมราชูปถัมภ์",

    // Placeholders
    ph_idea_title: "เช่น คลาสสอนทำขนมเต้าส้อสูตรคุณยาย",
    ph_idea_desc: "อธิบายเพิ่มเติม เช่น อยากให้จัดวันเสาร์ ชวนคุณป้าในตลาดมาสอน...",
    ph_idea_author: "เช่น คนตะกั่วป่ารุ่นใหม่ / นุ่น",
    ph_book_name: "เช่น ชมรมศิลปะพังงา / สมชาย",
    ph_book_phone: "08X-XXX-XXXX",
    ph_book_email: "name@example.com",
    ph_book_desc: "อธิบายรูปแบบงาน เช่น จัดนิทรรศการภาพถ่าย 3 วัน, จัดเวิร์กช็อปสอนเยาวชน..."
  },

  en: {
    // Header & Navigation
    brand_title: "Dao Ming School",
    brand_sub: "DAO MING · TAKUA PA HUB",
    nav_story: "History",
    nav_gable: "Pediment",
    nav_archive: "Archive",
    nav_vision: "Vision",
    nav_spaces: "Spaces",
    nav_events: "Events",
    nav_ideas: "Idea Wall",
    nav_visit: "Visit",
    btn_book_space: "Book Space",
    btn_book_space_full: "Propose Event / Book Space",

    // Mobile Drawer
    m_nav_story: "1. History & Architecture",
    m_nav_gable: "2. Cosmic Gable Philosophy",
    m_nav_archive: "3. Historic Living Archive",
    m_nav_vision: "4. Creative Space Vision",
    m_nav_spaces: "5. Spatial Floor Plan & Zones",
    m_nav_events: "6. Events & Workshops",
    m_nav_ideas: "7. Community Idea Wall",
    m_nav_booking: "8. Reserve Space",
    m_nav_visit: "9. Location & Walking Map",

    // Hero Section
    hero_award_text: "Winner: Architectural Conservation Award 2026 · Association of Siamese Architects (ASA)",
    hero_badge: "1st & Only Chinese School in Phang Nga · Est. 1905 / Building 1922",
    hero_title: 'Revitalize <span class="highlight-wood">The Path of Light</span><br>Empower <span class="highlight-terracotta">Creativity</span>',
    hero_desc: 'From <strong>"Toh Beng" to "Dao Ming" (導明)</strong> — the first Chinese school in Phang Nga Province, crowdfunded by tin mine proprietors and master craftsman Phao in 1922, now rejuvenated into a <strong>Living Heritage</strong> governed by the Dao Ming School Foundation for education, culture, and creative community engagement.',
    hero_btn_vision: "Explore Vision & Spaces",
    hero_btn_story: "Read 120-Year History",
    hero_stat_1: "Years since 1905 Founding (Toh Beng)",
    hero_stat_2: "Year Ang Mor Lao Built by Master Phao",
    tag_status: "🏆 ASA Conservation Award 2026",
    tag_location: "📍 Sri Takua Pa Old Town District",
    caption_title: '"Dao Ming (導明) signifies The Path to Enlightenment & Wisdom."',
    caption_sub: "Historic Ang Mor Lao civic landmark blending colonial forms with Chinese cosmic philosophy",

    // Story Section
    story_tag: "AUTHENTIC HISTORY & FOUNDATION",
    story_title: 'The History & Foundation of "Dao Ming School"',
    story_subtitle: "From Phang Nga's pioneering Chinese school to an award-winning architectural monument of communal unity",
    narrative_1_title: "1. From 'Toh Beng' to 'Dao Ming' (1905 - 1920)",
    narrative_1_desc: "Informally established in 1905 under the Hokkien name <strong>“Toh Beng”</strong> before adopting Mandarin <strong>“Dao Ming” (導明)</strong> and registering as a private school in 1920. <em>Dao (導)</em> means Path or Guidance, while <em>Ming (明)</em> means Light or Enlightenment — together conveying <strong>'The Path to Wisdom and Knowledge'</strong>.",
    narrative_2_title: "2. Ang Mor Lao Architecture & Master Phao (1922)",
    narrative_2_desc: "The present 2nd schoolhouse was constructed in 1922 by Hokkien master builder <strong>'Master Phao'</strong> with donations from tin mine proprietors in Takua Pa, Ranong, and Phuket. Adapted from Straits 'Ang Mor Lao' colonial civic mansions, featuring early reinforced concrete, masonry brick, double verandas, and Greek classical pilasters.",
    narrative_3_title: "3. Communal Land Trust & Foundation (1990 - 1999)",
    narrative_3_desc: "Originally purchased by multiple Chinese families and held in trust under 3 Thai custodians as <strong>'A Heritage for Takua Pa Children'</strong>. In 1990, the <strong>'Dao Ming Takua Pa Foundation'</strong> was established, and in 1999, all heirs formally deeded 100% of the land and building to the Foundation in perpetuity.",
    tl_header_title: "120-Year Chronological Milestones",
    tl_header_subtitle: "Click each era to discover recorded historic evidence and evolution",
    tl_btn_1_year: "1905 - 1922",
    tl_btn_1_label: "Toh Beng to Dao Ming & Master Phao",
    tl_btn_2_year: "1937 - 1967",
    tl_btn_2_label: "Community Hub & Consul Reception",
    tl_btn_3_year: "1990 - 2004",
    tl_btn_3_label: "Foundation Trust & Roof Restoration",
    tl_btn_4_year: "Present & ASA Award",
    tl_btn_4_label: "New Context & Living Heritage",
    tl_step_prev: "Previous Era",
    tl_step_next: "Next Era",

    // Gable Section
    gable_tag: "COSMIC FACADE PHILOSOPHY",
    gable_title: 'Decoding the Facade: "Microcosm of Heaven, Earth & Human"',
    gable_subtitle: "The front pediment was masterfully designed following Taoist and ancient Chinese cosmology, symbolizing celestial energy, moral wisdom, and education.",
    gable_hint: "✦ Select any of the 5 cosmic symbols to explore its architectural meaning",
    gable_meaning_lbl: "Significance to Education:",
    gable_logo_badge: "Dao Ming Architectural Identity",
    gable_logo_desc: "Emblem evoking the historic gable facade and 3 cosmic realms: Heaven, Earth & Human",
    btn_zoom_overview: "Full Building Overview (Reset)",
    zoom_hint_pill: "✦ Select any of the 5 symbols on the right to zoom in",

    // Archive Section
    archive_tag: "HISTORICAL PHOTO ARCHIVE",
    archive_title: "Historic Photo Archive of Dao Ming School",
    archive_subtitle: "Authentic photographs from the collective memories of Takua Pa families, alumni, and founders",

    // Vision Section
    vision_tag: "REVITALIZATION & LIVING HERITAGE",
    vision_title: 'Project: "Dao Ming - A New Context in Takua Pa"',
    vision_subtitle: "Revitalizing a living heritage through physical preservation, cultural interpretation, eco-cultural tourism, and deep community participation",
    pillar_1_title: "Living Archive & Museum (Oral History)",
    pillar_1_desc: "Rotating historical exhibits of the tin golden age, antique photography, ancestral tools, recorded oral histories of town elders, and active ground-floor cultural programming.",
    p1_f1: "Tin Mining Era & Chinese Diaspora History",
    p1_f2: "Old Town Information & Heritage Library",
    p1_f3: "Upper Floor: Tranquil Meditation Sanctuary",
    pillar_2_badge: "POPULAR",
    pillar_2_title: "Creative Studio & Craft Workshops",
    pillar_2_desc: "A hands-on learning lab where local master craftsmen and modern designers collaborate to turn traditional wisdom into contemporary crafts and delicacies.",
    p2_f1: "Old Town Natural Dye Batik Printing Workshops",
    p2_f2: "Traditional Tao Sae Pastry & Peranakan Cooking",
    p2_f3: "Local Clay Ceramics & Architectural Watercolors",
    pillar_3_title: "Community Lounge & Co-Working Cafe",
    pillar_3_desc: "A relaxed space for digital nomads, locals, and visitors to collaborate and converse, serving single-origin Phang Nga roast coffees and local snacks.",
    p3_f1: "Quiet Reading & Working Nook (High-Speed Wi-Fi)",
    p3_f2: "Community Idea Exchange Table",
    p3_f3: "Authentic Local Handcrafted Souvenir Shop",
    pillar_4_title: "Courtyard & Creative Weekend Market",
    pillar_4_desc: "An open-air stone yard transformed into a lively community stage for acoustic music, open-air cinema, forum talks, and twilight artisan markets.",
    p4_f1: "Dao Ming Creative Weekend Market",
    p4_f2: "Starlight Heritage Cinema Nights",
    p4_f3: "City Dialogue & Contemporary Art Forum",
    pillar_action_explore_a: "Explore Zone A (Main Hall) →",
    pillar_action_explore_b: "Explore Zone C (Craft Studio) →",
    pillar_action_explore_c: "Explore Zone D (Community Cafe) →",
    pillar_action_explore_d: "Explore Zone B (Courtyard) →",
    p1_motif: "12-Ray Solar Stucco Motif",
    p2_motif: "Peranakan Batik Craft Motif",
    p3_motif: "Ang Mor Lao Fretwork Lattice",
    p4_motif: "Mining River Waves Motif",

    // Spaces Section
    spaces_tag: "SPACES & FACILITIES",
    spaces_title: "Explore Spatial Floor Plan & Zones",
    spaces_subtitle: "Select a zone to view capacity, specifications, and ideal event configurations",
    zone_list_a_title: "Main Heritage Hall (Zone A)",
    zone_list_a_sub: "Ground Floor · Capacity: 80 - 120 pax · Ideal for exhibitions, talks, and ceremonies",
    zone_list_b_title: "Dao Ming Courtyard (Zone B)",
    zone_list_b_sub: "Capacity: 150 - 250 pax · Ideal for markets, open-air cinema, concerts",
    zone_list_c_title: "Craft Studios & Workshops (Zone C)",
    zone_list_c_sub: "Capacity: 20 - 35 pax · Equipped with craft tables, projector, and wash sinks",
    zone_list_d_title: "Community Cafe & Reading Nook (Zone D)",
    zone_list_d_sub: "Capacity: 30 - 45 pax · Cozy seating, coffee bar, and co-working desks",
    zone_list_e_title: "Double Porch & Veranda (Zone E)",
    zone_list_e_sub: "Capacity: 25 - 40 pax · Outdoor exhibits, photo scenic spot, relaxation",
    spec_area_label: "📐 Total Area",
    spec_cap_label: "👥 Capacity",
    spec_equip_label: "💡 Amenities",
    spec_vent_label: "🌿 Ventilation",
    btn_book_zone: "Reserve This Zone",
    btn_view_360: "View 360° Preview",

    // Events Section
    events_tag: "CALENDAR & WORKSHOPS",
    events_title: "Activity Calendar & Creative Workshops",
    events_subtitle: "Experience hands-on creative crafts, discover inspiration, and connect with people",
    filter_all: "All Events",
    filter_workshop: "Workshops",
    filter_exhibition: "Exhibitions",
    filter_market: "Markets & Music",
    filter_talk: "Talks & Forums",
    btn_register: "Register",
    btn_details: "Details",
    btn_reserve_seat: "Reserve Seat",
    btn_view_shops: "View Vendors",

    // Ideas Section
    ideas_tag: "COMMUNITY CO-CREATION",
    ideas_title: 'Co-Design "Your Dream Dao Ming"',
    ideas_subtitle: "What activities or spaces would you love to see here? Submit your ideas! High-voted community proposals will be brought to life.",
    idea_form_heading: "Submit a Proposal / Idea",
    idea_form_sub: "Be part of shaping Dao Ming Hub",
    idea_label_category: "Activity Category",
    opt_cat_art: "🎨 Arts & Craft",
    opt_cat_edu: "📚 Education & History",
    opt_cat_food: "🍲 Local Food & Culture",
    opt_cat_show: "🎭 Performance & Music",
    opt_cat_env: "🌱 Environment & Community",
    opt_cat_other: "✨ Others",
    idea_label_title: "Idea Title",
    idea_label_desc: "Description & Details",
    idea_label_author: "Your Name / Handle",
    btn_submit_idea: "Post Idea to Board",
    ideas_wall_heading: "Community Ideas Board",
    ideas_sort_note: "🔥 Tap ❤️ to upvote your favorite ideas",
    proposed_by: "Proposed by:",

    // Booking Section
    booking_tag: "SPACE PROPOSAL",
    booking_title: "Space Proposal & Event Booking",
    booking_desc: "Whether you are an artist, community leader, teacher, student group, or creative entrepreneur — Dao Ming School welcomes all project proposals that enrich Takua Pa.",
    perk_1_title: "Special Support for Community & Cultural Projects",
    perk_1_desc: "Discounted rates and fully sponsored access for educational and community initiatives.",
    perk_2_title: "Comprehensive Event Facilities",
    perk_2_desc: "Lighting, sound setup, authentic wooden furniture, and on-site support crew.",
    perk_3_title: "Publicity & Media Amplification",
    perk_3_desc: "Featured across Old Town networks and digital creative channels.",
    contact_direct_label: "📞 Direct Hotline & Inquiries:",
    booking_form_title: "Space Proposal Form",
    booking_form_sub: "Fill in the details; our team will get back to you within 24 hours.",
    lbl_book_name: "Contact Name / Organization *",
    lbl_book_phone: "Phone Number *",
    lbl_book_email: "Email",
    lbl_book_zone: "Desired Zone *",
    opt_zone_a: "Main Heritage Hall (Zone A)",
    opt_zone_b: "Dao Ming Courtyard (Zone B)",
    opt_zone_c: "Craft Workshop Studio (Zone C)",
    opt_zone_d: "Cafe & Co-Working Lounge (Zone D)",
    opt_zone_all: "Entire Building & Grounds (All Zones)",
    lbl_book_date: "Proposed Event Date *",
    lbl_book_att: "Estimated Number of Guests *",
    opt_att_1: "1 - 20 pax",
    opt_att_2: "21 - 50 pax",
    opt_att_3: "51 - 100 pax",
    opt_att_4: "100+ pax",
    lbl_book_desc: "Event Concept & Objectives *",
    btn_submit_booking: "Submit Space Request",

    // Visit Section
    visit_tag: "LOCATION & WALKING ROUTE",
    visit_title: "Visit & Old Town Heritage Walking Map",
    visit_subtitle: "Dao Ming School sits in the historic heart of Takua Pa, seamlessly connected on foot to famous heritage landmarks.",
    map_badge: "🗺️ TAKUA PA HERITAGE MAP",
    map_title: "Takua Pa Old Town Cultural Walking Trail",
    node_1_title: "Dao Ming School (Dao Ming Hub)",
    node_1_desc: "Epicenter of living heritage, historic exhibitions, and creative studios",
    node_2_title: "Guan Yu Shrine (Sin Chai Tueng)",
    node_2_desc: "650m away (~8 min walk) · 150-year-old sacred Hokkien ancestral shrine",
    node_3_title: "Sri Takua Pa Cultural Street (Walking Street)",
    node_3_desc: "700m away (~9 min walk / 2 min bike) · Sino-Portuguese shophouses & Sunday street market",
    node_4_title: "Wat Senanuchrangsan & Ancient City Moat",
    node_4_desc: "750m away (~10 min walk) · Historic royal monastery built in King Rama V's reign",
    node_5_title: "Boon Soong Iron Bridge (Khok Khanun)",
    node_5_desc: "2.9km away (~5 min drive / 10 min bike) · Historic bridge constructed from tin dredge steel",
    practical_title: "Visiting Information & Inquiries",
    info_address_lbl: "Address",
    info_address_val: "Takua Pa Old Town (near Guan Yu Shrine), Talat Yai, Takua Pa, Phang Nga 82110",
    info_hours_lbl: "Opening Hours",
    info_hours_val: "Tuesday - Sunday: 09:00 - 18:00<br>(Until 21:00 on Market & Event days · Closed on Mondays)",
    info_parking_lbl: "Parking",
    info_parking_val: "Designated parking available at neighboring temple grounds and along Sri Takua Pa Rd.",
    info_admission_lbl: "General Admission",
    info_admission_val: "Free Admission",
    btn_open_gmaps: "Open in Google Maps Navigation",
    social_follow_lbl: "Follow Updates:",
    dock_maps: "Maps",
    dock_events: "Events",
    dock_ideas: "Ideas",
    dock_book: "Spaces",
    dock_top: "Top",

    // Footer
    footer_tagline: '"Preserving tin mining heritage roots while empowering a sustainable creative future."',
    footer_col1_title: "Quick Links",
    f_story: "120-Year History",
    f_vision: "New Context Vision",
    f_spaces: "Spatial Floor Plan",
    f_events: "Activity Calendar",
    footer_col2_title: "Participate",
    f_ideas: "Submit an Idea",
    f_booking: "Book Event Space",
    f_visit: "Walking Tour",
    footer_col3_title: "Old Town Network",
    f_net0: "Dao Ming Takua Pa Foundation",
    f_net1: "Talat Yai Takua Pa Community",
    f_net2: "Takua Pa Town Municipality",
    f_net3: "Association of Siamese Architects (ASA)",
    footer_copyright: "© 2026 Dao Ming Takua Pa Foundation. All rights reserved.",
    footer_credit: "Winner: Architectural Conservation Award 2026 by Association of Siamese Architects (ASA)",

    // Placeholders
    ph_idea_title: "e.g. Grandma’s Traditional Tao Sae Baking Masterclass",
    ph_idea_desc: "Describe what you'd love to see: e.g. Saturday afternoon workshop...",
    ph_idea_author: "e.g. Young Takua Pa Resident / Noon",
    ph_book_name: "e.g. Phang Nga Art Collective / John Doe",
    ph_book_phone: "08X-XXX-XXXX",
    ph_book_email: "name@example.com",
    ph_book_desc: "Describe your event: e.g. 3-day photography exhibition, youth workshop..."
  }
};

/* ==========================================================================
   COSMIC GABLE ARCHITECTURAL SYMBOLS DATA
   ========================================================================== */
const gableData = {
  th: {
    "tiangong": {
      badge: "สัญลักษณ์ที่ ๑ · ยอดเสาหน้าจั่ว (เสาสวรรค์)",
      title: "เสาเทียนกง (Tiangong Pillar)",
      desc: "เสายอดบนสุดของหน้าจั่ว เปรียบเสมือน 'เสาสวรรค์' จุดที่ฟ้าส่งพลังงานบริสุทธิ์จากเบื้องบนลงมาสู่โลก เป็นสัญลักษณ์ของการเชื่อมโยงระหว่างจักรวาลกับมนุษย์",
      meaning: "แสงสว่างแห่งปัญญาและความรู้ชั้นสูงที่หลั่งไหลลงมาสู่ผู้เรียน"
    },
    "cloud": {
      badge: "สัญลักษณ์ที่ ๒ · ฐานเสายอดจั่ว",
      title: "ลวดลายฐานเสา ลายเมฆ (Cloud Motif Base)",
      desc: "ลวดลายปูนปั้นรูปเมฆมงคลที่ฐานเสายอดจั่ว ทำหน้าที่ประคองพลังงานที่ได้รับจากฟากฟ้า แล้วค่อยๆ แผ่กระจายความร่มเย็นและสมดุลลงสู่ฐานอาคาร",
      meaning: "การหล่อเลี้ยงจิตใจ สมาธิ และความสงบร่มเย็นในการศึกษาหาความรู้"
    },
    "triangle": {
      badge: "สัญลักษณ์ที่ ๓ · กรอบโครงสร้างจั่ว",
      title: "สามเหลี่ยมเชื่อมฟ้า-ดิน (Cosmic Triangle)",
      desc: "โครงสร้างทรงสามเหลี่ยมของหน้าจั่ว ทำหน้าที่เป็นจุดเชื่อมประสานระหว่างฟ้า (จักรวาล) และดิน (โลกมนุษย์) รองรับพลังงานจากดวงอาทิตย์",
      meaning: "ความมั่นคงแข็งแกร่งของรากฐานการศึกษา และการเชื่อมต่อผู้คนในชุมชน"
    },
    "sun12": {
      badge: "สัญลักษณ์ที่ ๔ · กึ่งกลางจั่ว",
      title: "พระอาทิตย์ ๑๒ รัศมี (12-Ray Sun)",
      desc: "ดวงอาทิตย์เปล่งรัศมี 12 แฉก สื่อถึงวัฏจักรแห่งกาลเวลา 12 เดือน 12 นักษัตร ความสว่างไสว สมดุลจักรวาล และคุณธรรมแห่งฟ้า",
      meaning: "ความสว่างไสวแห่งปัญญาที่ส่องสว่างตลอดกาลเวลาไม่มีวันดับสูญ"
    },
    "circles": {
      badge: "สัญลักษณ์ที่ ๕ · สัญลักษณ์โดมหัวเสาปีกข้าง",
      title: "สัญลักษณ์โดมหัวเสา (Pilaster Spherical Finial)",
      desc: "ลวดลายปูนปั้นทรงกลมประดับบนยอดเสาปีกข้างทั้งสองฝั่ง สื่อถึงความสมบูรณ์ ดุลยภาพของธาตุ และการโอบอุ้มปกป้องคุ้มครองสถานที่ศึกษา",
      meaning: "ความหนักแน่น มั่นคง และการพัฒนาผู้เรียนให้สมบูรณ์พร้อมรอบด้าน"
    }
  },
  en: {
    "tiangong": {
      badge: "Symbol 1 · Pinnacle Spire (Celestial Pillar)",
      title: "Tiangong Pillar (Celestial Sky Pillar)",
      desc: "The uppermost vertical spire at the pediment apex represents the Celestial Pillar — the sacred focal point where cosmic heaven channels spiritual energy down to earth.",
      meaning: "The divine illumination of higher wisdom streaming into students' minds."
    },
    "cloud": {
      badge: "Symbol 2 · Spire Base",
      title: "Auspicious Cloud Motif (Spire Base)",
      desc: "The ornate stucco cloud motif at the base of the pinnacle spire cradles the celestial energy from heaven, softly dispersing equilibrium and harmony across the structure.",
      meaning: "Cultivating mental clarity, mindfulness, and serenity in academic pursuit."
    },
    "triangle": {
      badge: "Symbol 3 · Pediment Frame",
      title: "Cosmic Triangle Pediment",
      desc: "The geometric triangular pediment serves as the divine junction linking Heaven and Earth, cradling solar energy into the terrestrial realm.",
      meaning: "Unyielding educational foundation uniting community and generations."
    },
    "sun12": {
      badge: "Symbol 4 · Central Pediment",
      title: "12-Ray Solar Emblem (Cycle of Time)",
      desc: "The 12-ray radiating sun symbolizes the perpetual cycle of the 12 zodiacs and 12 months, universal equilibrium, cosmic virtue, and eternal enlightenment.",
      meaning: "Enduring wisdom illuminating lives across generations without fading."
    },
    "circles": {
      badge: "Symbol 5 · Pilaster Finial",
      title: "Spherical Pilaster Finial Cap",
      desc: "The rounded stucco finials crowning the flanking pilasters represent cosmic wholeness, elemental balance, and the enduring guardianship of the house of learning.",
      meaning: "Holistic student development cultivating resilience, intellect, and virtue."
    }
  }
};

/* ==========================================================================
   DYNAMIC HISTORICAL TIMELINE (AUTHENTIC FACTS)
   ========================================================================== */
const timelineData = {
  th: {
    "1905": {
      badge: "พ.ศ. ๒๔๔๘ - ๒๔๖๕",
      title: "กำเนิด 'โต๊ะเบ๋ง' สู่ 'เต้าหมิง' & การสร้างอาคารโดยช่างผาว",
      desc: "เริ่มก่อตั้งอย่างไม่เป็นทางการในปี 2448 ในชื่อ 'โต๊ะเบ๋ง' (สำเนียงฮกเกี้ยน) ก่อนเปลี่ยนเป็น 'เต้าหมิง' (導明) และจดทะเบียนเป็นโรงเรียนราษฎร์ในปี 2463 อาคารหลังปัจจุบัน (หลังที่ 2) สร้างขึ้นในปี 2465 โดยนายผาว ช่างฝีมือชาวจีนฮกเกี้ยน ด้วยเงินบริจาคของคหบดีเหมืองแร่ในตะกั่วป่า ระนอง และภูเก็ต มุงหลังคากระเบื้องกาบกล้วยและเชิงชายไม้ฉลุ",
      chips: ["🏛️ ช่างผาว ฮกเกี้ยน", "📚 จดทะเบียนราษฎร์ 2463", "🤝 ลงขันเหมืองแร่ 3 เมือง", "✨ อั้งม่อเหลาโคโลเนียล"],
      caption: '"ภาพประวัติศาสตร์: นักเรียนและครูถ่ายภาพร่วมกันหน้าอาคารเต้าหมิง ยุคหลังคากระเบื้องกาบกล้วยดั้งเดิม"',
      img: "img/นิทรรศการ3-โซน 1-โรงเรียนเต้าหมิง.jpg"
    },
    "1950": {
      badge: "พ.ศ. ๒๔๘๐ - ๒๕๑๐",
      title: "ศูนย์กลางชุมชนจีน-ไทย & พิธีต้อนรับกงสุลใหญ่สาธารณรัฐจีน",
      desc: "โรงเรียนเต้าหมิงเจริญรุ่งเรืองถึงขีดสุด เป็นหัวใจของสังคม มีนักเรียนหลายร้อยคน จัดตั้งทีมบาสเกตบอลชุมชน มีการเปลี่ยนหลังคาเป็นแผ่นสังกะสีเรือขุดแร่นำเข้า และอาคารแห่งนี้ได้รับเกียรติเป็นสถานที่จัดพิธีต้อนรับกงสุลใหญ่จากสาธารณรัฐจีนประจำสงขลา สะท้อนบทบาทสำคัญทางการทูตและวัฒนธรรม",
      chips: ["🏮 ต้อนรับกงสุลใหญ่สาธารณรัฐจีน", "🏀 ทีมบาสเกตบอลเต้าหมิง", "📜 ศูนย์กลางสังคมจีน-ไทย"],
      caption: '"พิธีต้อนรับกงสุลใหญ่สาธารณรัฐจีนประจำสงขลา ณ มุขหน้าอาคารโรงเรียนเต้าหมิง"',
      img: "img/นิทรรศการ3-โซน2-รับรองกงสุลจีน.jpg"
    },
    "1990": {
      badge: "พ.ศ. ๒๕๓๓ - ๒๕๔๗",
      title: "จัดตั้งมูลนิธิเพื่อสาธารณะ & การบูรณะหลังคาอาคาร",
      desc: "ปี 2533 กรรมการจัดตั้ง 'มูลนิธิโรงเรียนเต้าหมิง ตะกั่วป่า' เพื่อดูแลอาคาร และในปี 2542 ทายาทเจ้าของที่ดิน 3 ท่านได้ส่งมอบกรรมสิทธิ์ที่ดินและอาคารให้มูลนิธิฯ 100% แม้โรงเรียนจะยุติการสอนในปี 2541 แต่ในปี 2547 ได้มีการบูรณะเปลี่ยนหลังคาเป็นกระเบื้องลอนลดภาระโครงสร้าง พร้อมทาสีเหลืองทองทั้งหลังเพื่อรักษาอาคารไว้ให้ลูกหลาน",
      chips: ["🤝 มูลนิธิโรงเรียนเต้าหมิง 2533", "📜 โอนกรรมสิทธิ์สมบูรณ์ 2542", "🎨 บูรณะสีเหลืองทอง 2547"],
      caption: '"อาคารเรียนและระเบียงไม้ได้รับการสงวนรักษาอย่างสมบูรณ์โดยมูลนิธิฯ"',
      img: "assets/house-305.webp"
    },
    "2026": {
      badge: "ปัจจุบัน & รางวัลสถาปัตยกรรมดีเด่น",
      title: "บริบทใหม่ในเมืองตะกั่วป่า & รางวัลอนุรักษ์ศิลปสถาปัตยกรรม ๒๕๖๙",
      desc: "โครงการ 'เต้าหมิง - บริบทใหม่ในเมืองตะกั่วป่า' มุ่งฟื้นฟูมรดกให้มีชีวิต โดยชั้นบนใช้เป็นสถานปฏิบัติธรรม ส่วนชั้นล่างเปิดเป็นพื้นที่จัดกิจกรรมวัฒนธรรม เวิร์กช็อป และการเรียนรู้ อาคารได้รับรางวัลอนุรักษ์ศิลปสถาปัตยกรรม ประจำปี 2569 ประเภท ก. งานอนุรักษ์มรดกทางสถาปัตยกรรมและชุมชน โดยสมาคมสถาปนิกสยาม ในพระบรมราชูปถัมภ์ (ASA)",
      chips: ["🏆 รางวัลอนุรักษ์สมาคมสถาปนิกสยามฯ 2569", "🧘 สถานปฏิบัติธรรมชั้นบน", "🎨 Creative Hub ชั้นล่าง"],
      caption: '"อาคารโรงเรียนเต้าหมิงในปัจจุบัน ได้รับการอนุรักษ์สงวนรักษาอย่างสมบูรณ์ และได้รับรางวัลอนุรักษ์ศิลปสถาปัตยกรรม ๒๕๖๙ (ASA)"',
      img: "img/อาคารปัจจุบัน.jpg"
    }
  },
  en: {
    "1905": {
      badge: "1905 - 1922",
      title: "From 'Toh Beng' to 'Dao Ming' & Master Phao's Construction",
      desc: "Informally founded in 1905 under the Hokkien name 'Toh Beng', renamed 'Dao Ming' (導明) in Mandarin and registered as a private school in 1920. The current building was constructed in 1922 by Hokkien master builder Master Phao, crowdfunded by tin mine proprietors across Takua Pa, Ranong, and Phuket, originally with banana tile roofing.",
      chips: ["🏛️ Master Phao (Hokkien)", "📚 Private School Reg. 1920", "🤝 3-City Mine Crowdfunding", "✨ Ang Mor Lao Style"],
      caption: '"Historic photo: Students and faculty assembled before Dao Ming School with original banana tile roof."',
      img: "img/นิทรรศการ3-โซน 1-โรงเรียนเต้าหมิง.jpg"
    },
    "1950": {
      badge: "1937 - 1967",
      title: "Heart of Thai-Chinese Society & Diplomatic Consul Reception",
      desc: "Dao Ming flourished as the civic epicenter of Takua Pa, educating hundreds of students, nurturing championship basketball teams, and replacing the roof with imported tin dredge sheets. The building was honored to host the official reception for the Consul General of the Republic of China (Songkhla).",
      chips: ["🏮 Republic of China Consul Reception", "🏀 Dao Ming Basketball Guild", "📜 Center of Cultural Life"],
      caption: '"Diplomatic reception welcoming the Consul General of the Republic of China in front of the porch."',
      img: "img/นิทรรศการ3-โซน2-รับรองกงสุลจีน.jpg"
    },
    "1990": {
      badge: "1990 - 2004",
      title: "Foundation Establishment & Roof Restoration",
      desc: "In 1990, the 'Dao Ming Takua Pa Foundation' was established, and in 1999, all 3 landholder heirs deeded full title to the Foundation in perpetuity. Although classes concluded in 1998, a major restoration in 2004 installed lightweight curved tiles and repainted the heritage yellow facade.",
      chips: ["🤝 Dao Ming Foundation 1990", "📜 Full Title Deed Transfer 1999", "🎨 Golden Ochre Restoration 2004"],
      caption: '"Carefully preserved timber verandas and masonry under the Dao Ming Foundation stewardship."',
      img: "assets/house-305.webp"
    },
    "2026": {
      badge: "Present & National Architecture Award",
      title: "New Context in Takua Pa & ASA Conservation Award 2026",
      desc: "The 'Dao Ming - New Context' revitalization transforms the landmark into a living heritage: the upper level serves as a serene meditation sanctuary, while the ground level activates cultural workshops, exhibitions, and creative gatherings. Winner of the 2026 Architectural Conservation Award by the Association of Siamese Architects (ASA).",
      chips: ["🏆 ASA Conservation Award 2026", "🧘 Upper Meditation Sanctuary", "🎨 Lower Creative Hub"],
      caption: '"The present Dao Ming school building: authentic conservation recognized by the 2026 ASA Architectural Conservation Award."',
      img: "img/อาคารปัจจุบัน.jpg"
    }
  }
};

const zonesData = {
  th: {
    "hall": {
      badge: "ZONE A · ชั้น 1 โถงหลัก",
      title: "โถงอาคารไม้ประวัติศาสตร์ (Main Heritage Hall)",
      desc: "โถงไม้อเนกประสงค์ชั้นล่างที่โปร่งโล่งด้วยหน้าต่างบานเกล็ดไม้โบราณรอบทิศทาง แสงธรรมชาติส่องกระทบพื้นไม้ขัดเงา บรรยากาศเงียบสงบและมีมนต์ขลัง เหมาะเป็นพิเศษสำหรับนิทรรศการศิลปะ งานเสวนา การเปิดตัวหนังสือ หรือคอนเสิร์ตอะคูสติก",
      area: "180 ตร.ม.",
      cap: "80 - 120 ที่นั่ง",
      equip: "ไฟส่องภาพ, ปลั๊กไฟ, ลำโพงบลูทูธ",
      vent: "ลมธรรมชาติ + พัดลมโบราณ"
    },
    "courtyard": {
      badge: "ZONE B · ลานกลางแจ้งหน้าอาคาร",
      title: "ลานกลางแจ้งเต้าหมิง (Dao Ming Courtyard)",
      desc: "ลานหินกว้างขวางหน้าฉากอาคารอั้งม่อเหลา รายล้อมด้วยต้นไม้ร่มรื่น เหมาะสำหรับจัดตลาดนัดสร้างสรรค์สุดสัปดาห์ โรงฉายภาพยนตร์กลางแปลง เวทีการแสดงดนตรีสด หรือกิจกรรมเปิดตัวผลิตภัณฑ์ชุมชน",
      area: "350 ตร.ม.",
      cap: "150 - 250 คน",
      equip: "เต็นท์ผ้าใบ, ไฟราวงานวัด, จุดต่อไฟสนาม",
      vent: "ลานโล่งแจ้งรับลมธรรมชาติ"
    },
    "studio": {
      badge: "ZONE C · ปีกอาคารทิศตะวันออก",
      title: "สตูดิโอเวิร์กช็อป & ห้องเรียนคราฟต์ (Craft Studios)",
      desc: "ห้องปฏิบัติการงานคราฟต์และงานฝีมือ พร้อมโต๊ะทำงานไม้ตัวยาว อ่างล้างอุปกรณ์ และพื้นที่จัดเก็บงานศิลปะ เหมาะสำหรับเวิร์กช็อปย้อมผ้าบาติก คลาสสอนทำอาหารเปอรานากัน งานปั้นเซรามิก หรือคอร์สอบรมเยาวชน",
      area: "75 ตร.ม.",
      cap: "20 - 35 คน",
      equip: "โต๊ะคราฟต์ยาว, อ่างล้างน้ำ, จอฉายโปรเจกเตอร์",
      vent: "เครื่องปรับอากาศ + หน้าต่างระบายอากาศ"
    },
    "cafe": {
      badge: "ZONE D · อาคารด้านหน้าฝั่งตะวันตก",
      title: "คาเฟ่ชุมชน & มุมอ่านหนังสือ (Cafe & Reading Nook)",
      desc: "พื้นที่ผ่อนคลายที่เสิร์ฟเครื่องดื่มกาแฟท้องถิ่นพังงาและขนมเต้าส้อโบราณ มีโต๊ะไม้ขนาดใหญ่สำหรับ Co-working พร้อมชั้นหนังสือประวัติศาสตร์เมืองเก่าและงานวิจัยท้องถิ่นให้อ่านค้นคว้าฟรี",
      area: "60 ตร.ม.",
      cap: "30 - 45 คน",
      equip: "Wi-Fi ความเร็วสูง, ปลั๊กไฟทุกโต๊ะ, เคาน์เตอร์บาร์",
      vent: "เครื่องปรับอากาศ"
    },
    "veranda": {
      badge: "ZONE E · ระเบียงมุขยื่น 2 ชั้น & สวน",
      title: "ระเบียงมุขยื่น 2 ชั้น & สวนหย่อม (Double Porch & Veranda)",
      desc: "ทางเดินเฉลียงไม้โบราณและมุขยื่น 2 ชั้นอันเป็นเอกลักษณ์ของช่างผาว ชมวิวสถาปัตยกรรมหัวเสากรีกและลายฉลุ เป็นมุมถ่ายภาพยอดนิยมสำหรับนักท่องเที่ยว",
      area: "90 ตร.ม.",
      cap: "25 - 40 คน",
      equip: "ม้านั่งไม้ยาว, ไฟส่องสวน",
      vent: "ลมธรรมชาติ"
    }
  },
  en: {
    "hall": {
      badge: "ZONE A · 1st Floor Main Hall",
      title: "Main Heritage Hall (Ground Floor Gallery)",
      desc: "A magnificent historic hall enveloped by traditional wooden louvers. Natural southern sunlight illuminates the polished timber floorboards, creating an inspiring ambience for art exhibitions, book launches, forum talks, and acoustic chamber performances.",
      area: "180 sq.m.",
      cap: "80 - 120 seats",
      equip: "Gallery spotlights, AC power tracks, Bluetooth sound system",
      vent: "Cross-breeze ventilation + Vintage ceiling fans"
    },
    "courtyard": {
      badge: "ZONE B · Open-Air Heritage Plaza",
      title: "Dao Ming Courtyard (Open Stone Yard)",
      desc: "An expansive stone-paved plaza set against the Ang Mor Lao facade and lush trees. Perfectly suited for weekend artisan markets, starlight open-air cinema screenings, music concerts, and community celebrations.",
      area: "350 sq.m.",
      cap: "150 - 250 pax",
      equip: "Market canopies, festoon fairy lights, heavy-duty electrical outlets",
      vent: "Open-air fresh tropical breeze"
    },
    "studio": {
      badge: "ZONE C · East Wing Studio",
      title: "Artisan Craft Studio & Workshop Labs",
      desc: "A hands-on creative workshop suite featuring solid wood communal worktables, washing basins, and material storage. Tailored for natural dye batik, Peranakan culinary classes, local clay pottery, and youth design labs.",
      area: "75 sq.m.",
      cap: "20 - 35 pax",
      equip: "Communal wooden craft tables, sink station, HD projector",
      vent: "Air-conditioned + Natural air windows"
    },
    "cafe": {
      badge: "ZONE D · West Pavilion Lounge",
      title: "Community Lounge & Heritage Reading Nook",
      desc: "A welcoming lounge serving Phang Nga single-origin roasts and traditional Tao Sae pastries. Fitted with spacious co-working tables and a rich collection of local history books and oral archive tablets.",
      area: "60 sq.m.",
      cap: "30 - 45 pax",
      equip: "High-speed Wi-Fi, desk charging ports, espresso bar",
      vent: "Air-conditioned"
    },
    "veranda": {
      badge: "ZONE E · 2-Story Front Porch & Veranda",
      title: "Double Porch Arcade & Garden",
      desc: "A tranquil 2-story colonial covered porch designed by Master Phao. Features Greek classical pilasters, geometric transoms, and shaded tropical flora.",
      area: "90 sq.m.",
      cap: "25 - 40 pax",
      equip: "Long timber benches, garden landscape lights",
      vent: "Natural open-air breeze"
    }
  }
};

const eventsList = [
  {
    id: "e1",
    category: "workshop",
    image: "assets/event-batik.jpg",
    tag_th: "เวิร์กช็อปงานฝีมือ",
    tag_en: "Artisan Workshop",
    day_th: "24",
    month_th: "ส.ค. 2569",
    day_en: "24",
    month_en: "Aug 2026",
    title_th: "เวิร์กช็อปพิมพ์ลายผ้าบาติกธรรมชาติ ด้วยแม่พิมพ์ไม้โบราณ",
    title_en: "Natural Dye Batik Workshop with Antique Wooden Blocks",
    snippet_th: "เรียนรู้ศาสตร์การย้อมผ้าด้วยสีธรรมชาติจากใบไม้ในป่าชายเลนและเปลือกผลไม้ท้องถิ่น ออกแบบลวดลายชิโนโปรตุกีสลงบนผืนผ้าคอตตอนแท้",
    snippet_en: "Learn the art of eco-dyeing using mangrove leaves and local plant extracts, block-printing Sino-Portuguese motifs on pure cotton.",
    loc_th: "📍 โซน C: Craft Studio",
    loc_en: "📍 Zone C: Craft Studio",
    time_th: "⏰ 13:30 - 16:30 น.",
    time_en: "⏰ 1:30 PM - 4:30 PM",
    cap_th: "👥 รับ 15 ท่าน (เหลือ 4 ที่)",
    cap_en: "👥 15 spots (4 remaining)",
    price_th: "฿650 / ท่าน (รวมอุปกรณ์)",
    price_en: "฿650 / pax (All materials included)",
    btnType: "register"
  },
  {
    id: "e2",
    category: "exhibition",
    image: "assets/event-exhibition.jpg",
    tag_th: "นิทรรศการถาวร",
    tag_en: "Special Exhibition",
    day_th: "12-31",
    month_th: "ส.ค. 2569",
    day_en: "12-31",
    month_en: "Aug 2026",
    title_th: 'นิทรรศการภาพถ่าย: "รอยยิ้มและสายแร่แห่งเมืองตะกั่วป่า"',
    title_en: 'Photo Exhibition: "Smiles & Tin Veins of Takua Pa"',
    snippet_th: "คอลเลกชันภาพถ่ายประวัติศาสตร์ของชาวเหมืองโบราณและใบหน้าของผู้คนในชุมชนศรีตะกั่วป่า บันทึกวิถีชีวิตกว่า 6 ทศวรรษ",
    snippet_en: "A historic curation of portraits of early tin miners and Sri Takua Pa residents, chronicling over six decades of community life.",
    loc_th: "📍 โซน A: โถงอาคารไม้",
    loc_en: "📍 Zone A: Main Heritage Hall",
    time_th: "⏰ 09:00 - 18:00 น. ทุกวัน",
    time_en: "⏰ 09:00 AM - 06:00 PM Daily",
    cap_th: "👥 ไม่จำกัดจำนวน",
    cap_en: "👥 Open to public",
    price_th: "เข้าชมฟรี",
    price_en: "Free Admission",
    isFree: true,
    btnType: "details"
  },
  {
    id: "e3",
    category: "market",
    image: "assets/event-market.jpg",
    tag_th: "ตลาดสร้างสรรค์",
    tag_en: "Creative Market",
    day_th: "ส.-อา.",
    month_th: "ตลอดเดือน",
    day_en: "Sat-Sun",
    month_en: "Every Weekend",
    title_th: "เต้าหมิง ครีเอทีฟ มาร์เก็ต & ดนตรีในสวน",
    title_en: "Dao Ming Twilight Creative Market & Garden Music",
    snippet_th: "ตลาดนัดงานคราฟต์ ขนมพื้นเมืองหาทานยาก ผลผลิตเกษตรอินทรีย์ และการแสดงดนตรีอะคูสติกยามเย็นใต้แสงโคมไฟโบราณ",
    snippet_en: "Handmade crafts, rare heritage sweets, organic harvest, and live acoustic music under warm vintage lanterns in the courtyard.",
    loc_th: "📍 โซน B: ลานกลางแจ้งเต้าหมิง",
    loc_en: "📍 Zone B: Dao Ming Courtyard",
    time_th: "⏰ 16:00 - 21:00 น.",
    time_en: "⏰ 04:00 PM - 09:00 PM",
    cap_th: "👥 ชุมชนและนักท่องเที่ยว",
    cap_en: "👥 Everyone welcome",
    price_th: "เข้างานฟรี",
    price_en: "Free Admission",
    isFree: true,
    btnType: "shops"
  },
  {
    id: "e4",
    category: "talk",
    image: "assets/event-talk.jpg",
    tag_th: "เสวนาชุมชน",
    tag_en: "Community Forum",
    day_th: "30",
    month_th: "ส.ค. 2569",
    day_en: "30",
    month_en: "Aug 2026",
    title_th: 'เสวนา: "ชุบชีวิตเมืองเก่าด้วยพลังคนรุ่นใหม่ & เศรษฐกิจสร้างสรรค์"',
    title_en: 'Forum: "Revitalizing Old Towns with Youth & Creative Economy"',
    snippet_th: "พูดคุยกับสถาปนิก นักอนุรักษ์ และผู้ประกอบการรุ่นใหม่ที่กลับมาพัฒนาบ้านเกิด แลกเปลี่ยนโมเดลการขับเคลื่อนเมืองรองสู่สากล",
    snippet_en: "Conversations with architects, conservationists, and homecoming entrepreneurs discussing models for sustainable creative towns.",
    loc_th: "📍 โซน A: โถงอาคารไม้ + Live",
    loc_en: "📍 Zone A: Main Hall + Livestream",
    time_th: "⏰ 14:00 - 16:30 น.",
    time_en: "⏰ 02:00 PM - 04:30 PM",
    cap_th: "👥 รับ 60 ที่นั่ง",
    cap_en: "👥 60 Reserved Seats",
    price_th: "ฟรี (สำรองที่นั่ง)",
    price_en: "Free (RSVP Required)",
    isFree: true,
    btnType: "reserve"
  }
];

const initialCommunityIdeas = [
  {
    id: 1,
    category_th: "🍲 อาหาร & วัฒนธรรมพื้นถิ่น",
    category_en: "🍲 Local Food & Culture",
    title_th: "คลาสสอนทำขนมเต้าส้อ & ขนมพริกโบราณ สูตรดั้งเดิม",
    title_en: "Authentic Tao Sae & Ancient Pepper Biscuit Baking Class",
    desc_th: "อยากให้เชิญคุณป้าคุณยายในย่านเมืองเก่ามาถ่ายทอดสูตรทำแป้งขนมเต้าส้อไส้เค็ม-หวาน และเปิดให้ชิมสดๆ ร้อนๆ จากเตา",
    desc_en: "Invite neighborhood grandmothers to teach the genuine recipe for flaky sweet & savory Tao Sae pastries fresh from the oven.",
    author_th: "นุ่น (ชาวตะกั่วป่า)",
    author_en: "Noon (Local Resident)",
    date_th: "14 ส.ค. 2569",
    date_en: "14 Aug 2026",
    votes: 48,
    hasVoted: false
  },
  {
    id: 2,
    category_th: "🎭 การแสดง & ดนตรี",
    category_en: "🎭 Performance & Music",
    title_th: "เทศกาลฉายหนังกลางแปลงสารคดีเหมืองแร่ & ดนตรีแจ๊สในสวน",
    title_en: "Tin Mining Documentary Open-Air Cinema & Courtyard Jazz",
    desc_th: "จัดฉายหนังสารคดีประวัติศาสตร์เมืองแร่ใต้แสงจันทร์ พร้อมชวนวงดนตรีอะคูสติกคนรุ่นใหม่มาร่วมบรรเลงวันเสาร์สิ้นเดือน",
    desc_en: "Screen historic mining documentaries under moonlight accompanied by young local acoustic jazz musicians on month-end Saturdays.",
    author_th: "บาส สถาปนิกชุมชน",
    author_en: "Bas (Community Architect)",
    date_th: "12 ส.ค. 2569",
    date_en: "12 Aug 2026",
    votes: 41,
    hasVoted: false
  },
  {
    id: 3,
    category_th: "🎨 ศิลปะ & งานคราฟต์",
    category_en: "🎨 Arts & Craft",
    title_th: "ห้องเรียนปั้นดินท้องถิ่น & วาดภาพสีน้ำอาคารชิโนโปรตุกีส",
    title_en: "Local Clay Pottery & Sino-Portuguese Watercolor Studio",
    desc_th: "เปิดสตูดิโอให้เด็กๆ และนักท่องเที่ยวได้มานั่งสเก็ตช์ภาพบ้านเรือนเก่าและบานหน้าต่างไม้เต้าหมิง นำไปทำโปสการ์ดของตัวเอง",
    desc_en: "Open studio for kids and travelers to sketch heritage houses and antique wooden louvers into custom postcards.",
    author_th: "Studio KuaPa",
    author_en: "Studio KuaPa",
    date_th: "10 ส.ค. 2569",
    date_en: "10 Aug 2026",
    votes: 36,
    hasVoted: false
  },
  {
    id: 4,
    category_th: "📚 การศึกษา & ประวัติศาสตร์",
    category_en: "📚 Education & History",
    title_th: "โครงการ Living Archive: อาสาสมัครบันทึกความทรงจำคนเฒ่าคนแก่",
    title_en: "Living Archive: Youth Oral History Recording Project",
    desc_th: "ชวนเยาวชนตะกั่วป่าถือกล้องและเครื่องอัดเสียง สัมภาษณ์เรื่องเล่าชาวเหมืองดีบุกและวิถีชีวิตดั้งเดิม แล้วนำมาแสดงในเว็บและนิทรรศการ",
    desc_en: "Equip local youth with cameras and voice recorders to interview tin mine elders, preserving oral histories in living exhibits.",
    author_th: "กลุ่มเยาวชนตะกั่วป่า",
    author_en: "Takua Pa Youth Collective",
    date_th: "8 ส.ค. 2569",
    date_en: "8 Aug 2026",
    votes: 39,
    hasVoted: false
  }
];

/* ==========================================================================
   APP INITIALIZATION
   ========================================================================== */
document.addEventListener('DOMContentLoaded', () => {
  initLanguageToggle();
  applyLanguage(currentLang);
  initTimeline();
  initGableExplorer();
  initSpaceExplorer();
  initEventFilter();
  initIdeaBoard();
  initBookingForm();
  initMobileDrawer();
  initScrollSpy();

  const btn360 = document.getElementById('btn360Preview');
  if (btn360) {
    btn360.addEventListener('click', () => {
      showToast(currentLang === 'th' ? 'กำลังเปิดโมเดล 3D จำลองพื้นที่ (เร็วๆ นี้)' : 'Launching 360° Virtual Model (Coming Soon)');
    });
  }
});

/* ==========================================================================
   LANGUAGE TOGGLE & FULL SYSTEM TRANSLATION
   ========================================================================== */
function initLanguageToggle() {
  const langBtn = document.getElementById('langToggleBtn');
  if (!langBtn) return;

  langBtn.addEventListener('click', () => {
    currentLang = currentLang === 'th' ? 'en' : 'th';
    localStorage.setItem('daoming_lang', currentLang);
    applyLanguage(currentLang);
    
    showToast(currentLang === 'th' ? 'สลับเป็นภาษาไทยเรียบร้อยแล้ว' : 'Switched to English interface');
  });
}

function applyLanguage(lang) {
  const dict = translations[lang] || translations.th;
  document.documentElement.lang = lang;

  // 1. Update Lang Toggle Badge
  const thSpan = document.getElementById('thLangSpan');
  const enSpan = document.getElementById('enLangSpan');
  if (thSpan && enSpan) {
    if (lang === 'th') {
      thSpan.classList.add('active-lang');
      enSpan.classList.remove('active-lang');
    } else {
      thSpan.classList.remove('active-lang');
      enSpan.classList.add('active-lang');
    }
  }

  // 2. Translate all [data-i18n] elements
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (dict[key]) {
      el.innerHTML = dict[key];
    }
  });

  // 3. Translate Placeholders
  const phMap = {
    'ideaTitle': dict.ph_idea_title,
    'ideaDesc': dict.ph_idea_desc,
    'ideaAuthor': dict.ph_idea_author,
    'bookName': dict.ph_book_name,
    'bookPhone': dict.ph_book_phone,
    'bookEmail': dict.ph_book_email,
    'bookEventName': dict.ph_book_desc
  };

  for (const [id, placeholderText] of Object.entries(phMap)) {
    const input = document.getElementById(id);
    if (input && placeholderText) {
      input.setAttribute('placeholder', placeholderText);
    }
  }

  // 4. Re-render dynamic sections
  updateTimelineDisplay();
  updateGableDisplay();
  updateZoneDisplay();
  renderEvents();
  renderIdeas();
}

/* ==========================================================================
   HISTORICAL TIMELINE — STEP NAVIGATION & TOUCH SWIPE
   ========================================================================== */
const timelineYears = ["1905", "1950", "1990", "2026"];

function selectTimelineYear(yearKey) {
  if (!timelineYears.includes(yearKey)) return;
  currentSelectedYearKey = yearKey;

  const buttons = document.querySelectorAll('.timeline-btn');
  buttons.forEach(b => {
    if (b.getAttribute('data-year') === yearKey) {
      b.classList.add('active');
    } else {
      b.classList.remove('active');
    }
  });

  const dots = document.querySelectorAll('.tl-dot');
  dots.forEach(d => {
    if (d.getAttribute('data-year') === yearKey) {
      d.classList.add('active');
    } else {
      d.classList.remove('active');
    }
  });

  const prevBtn = document.getElementById('tlPrevBtn');
  const nextBtn = document.getElementById('tlNextBtn');
  const currentIndex = timelineYears.indexOf(yearKey);

  if (prevBtn) {
    prevBtn.disabled = currentIndex === 0;
  }
  if (nextBtn) {
    nextBtn.disabled = currentIndex === timelineYears.length - 1;
  }

  updateTimelineDisplay();
}

function initTimeline() {
  const buttons = document.querySelectorAll('.timeline-btn');
  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      selectTimelineYear(btn.getAttribute('data-year'));
    });
  });

  const prevBtn = document.getElementById('tlPrevBtn');
  const nextBtn = document.getElementById('tlNextBtn');

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      const currentIndex = timelineYears.indexOf(currentSelectedYearKey);
      if (currentIndex > 0) {
        selectTimelineYear(timelineYears[currentIndex - 1]);
      }
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      const currentIndex = timelineYears.indexOf(currentSelectedYearKey);
      if (currentIndex < timelineYears.length - 1) {
        selectTimelineYear(timelineYears[currentIndex + 1]);
      }
    });
  }

  const dots = document.querySelectorAll('.tl-dot');
  dots.forEach(dot => {
    dot.addEventListener('click', () => {
      selectTimelineYear(dot.getAttribute('data-year'));
    });
  });

  // Mobile Touch Swipe Support
  const contentBox = document.getElementById('timelineContent');
  if (contentBox) {
    let startX = 0;
    let endX = 0;

    contentBox.addEventListener('touchstart', (e) => {
      startX = e.changedTouches[0].screenX;
    }, { passive: true });

    contentBox.addEventListener('touchend', (e) => {
      endX = e.changedTouches[0].screenX;
      const diffX = endX - startX;

      if (Math.abs(diffX) > 45) {
        const currentIndex = timelineYears.indexOf(currentSelectedYearKey);
        if (diffX < 0 && currentIndex < timelineYears.length - 1) {
          // Swipe Left -> Next Era
          selectTimelineYear(timelineYears[currentIndex + 1]);
        } else if (diffX > 0 && currentIndex > 0) {
          // Swipe Right -> Prev Era
          selectTimelineYear(timelineYears[currentIndex - 1]);
        }
      }
    }, { passive: true });
  }

  // Initial state setup
  selectTimelineYear(currentSelectedYearKey || "1905");
}

function updateTimelineDisplay() {
  const badgeEl = document.getElementById('tlBadgeYear');
  const titleEl = document.getElementById('tlTitle');
  const descEl = document.getElementById('tlDesc');
  const chipsEl = document.getElementById('tlChips');
  const captionEl = document.getElementById('tlPhotoCaption');
  const imgEl = document.getElementById('tlPhotoImg');

  const langSet = timelineData[currentLang] || timelineData.th;
  const data = langSet[currentSelectedYearKey] || langSet["1905"];

  if (data && badgeEl && titleEl && descEl && chipsEl && captionEl) {
    badgeEl.textContent = data.badge;
    titleEl.textContent = data.title;
    descEl.textContent = data.desc;
    captionEl.textContent = data.caption;
    if (imgEl && data.img) imgEl.src = data.img;
    chipsEl.innerHTML = data.chips.map(chip => `<span class="chip">${chip}</span>`).join('');
  }
}

/* ==========================================================================
   COSMIC GABLE ARCHITECTURAL CAMERA COORDINATES & ZOOM
   ========================================================================== */
const gableCoordinates = {
  "tiangong": {
    name_th: "โฟกัส: ๑. เสาเทียนกง (ยอดจั่วรับพลังฟ้า)",
    name_en: "Focus: 1. Tiangong Pillar (Apex)",
    origin: "49.3% 10.2%",
    scale: 4.2,
    reticleTop: "10.2%",
    reticleLeft: "49.3%",
    scaleLabel: "4.2x"
  },
  "cloud": {
    name_th: "โฟกัส: ๒. ลายเมฆฐานเสา (ฐานยอดจั่ว)",
    name_en: "Focus: 2. Cloud Motif (Base)",
    origin: "49.3% 14.5%",
    scale: 3.8,
    reticleTop: "14.5%",
    reticleLeft: "49.3%",
    scaleLabel: "3.8x"
  },
  "triangle": {
    name_th: "โฟกัส: ๓. สามเหลี่ยมเชื่อมฟ้า-ดิน (โครงสร้างจั่ว)",
    name_en: "Focus: 3. Cosmic Triangle Frame",
    origin: "43.8% 18.5%",
    scale: 3.2,
    reticleTop: "18.5%",
    reticleLeft: "43.8%",
    scaleLabel: "3.2x"
  },
  "sun12": {
    name_th: "โฟกัส: ๔. พระอาทิตย์ ๑๒ รัศมี (กึ่งกลางจั่ว)",
    name_en: "Focus: 4. 12-Ray Solar Center",
    origin: "49.3% 18.3%",
    scale: 3.8,
    reticleTop: "18.3%",
    reticleLeft: "49.3%",
    scaleLabel: "3.8x"
  },
  "circles": {
    name_th: "โฟกัส: ๕. สัญลักษณ์โดมหัวเสาปีกข้าง",
    name_en: "Focus: 5. Spherical Pilaster Finial",
    origin: "37.4% 20.2%",
    scale: 3.6,
    reticleTop: "20.2%",
    reticleLeft: "37.4%",
    scaleLabel: "3.6x"
  },
  "overview": {
    name_th: "ภาพรวมทั้งอาคาร (Overview)",
    name_en: "Full Building Overview",
    origin: "50% 50%",
    scale: 1,
    reticleTop: "50%",
    reticleLeft: "50%",
    scaleLabel: "1.0x"
  }
};

/* ==========================================================================
   COSMIC GABLE EXPLORER WITH INTERACTIVE ZOOM CAMERA
   ========================================================================== */
function initGableExplorer() {
  const itemBtns = document.querySelectorAll('.gable-item-btn');
  const hotspotPins = document.querySelectorAll('.zoom-hotspot-pin');
  const resetBtn = document.getElementById('btnResetGableZoom');

  function selectGable(key) {
    currentSelectedGableKey = key;

    // Update list buttons
    itemBtns.forEach(btn => {
      if (btn.getAttribute('data-gable') === key) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });

    // Update hotspot pins
    hotspotPins.forEach(pin => {
      if (pin.getAttribute('data-gable') === key) {
        pin.classList.add('active');
      } else {
        pin.classList.remove('active');
      }
    });

    updateGableDisplay();
  }

  // Bind side list buttons
  itemBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      selectGable(btn.getAttribute('data-gable'));
    });
  });

  // Bind hotspot pins directly on photo
  hotspotPins.forEach(pin => {
    pin.addEventListener('click', (e) => {
      e.stopPropagation();
      selectGable(pin.getAttribute('data-gable'));
    });
  });

  // Bind Reset / Overview button
  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      selectGable('overview');
    });
  }

  // Initial display: focus on Tiangong Spire
  selectGable('tiangong');
}

function updateGableDisplay() {
  const badgeEl = document.getElementById('gableBadge');
  const titleEl = document.getElementById('gableTitle');
  const descEl = document.getElementById('gableDesc');
  const meaningEl = document.getElementById('gableMeaning');
  const imgEl = document.getElementById('gableZoomImg');
  const reticleEl = document.getElementById('gableFocusRing');
  const statusTextEl = document.getElementById('zoomStatusText');
  const scaleBadgeEl = document.getElementById('zoomScaleLabel');

  const langSet = gableData[currentLang] || gableData.th;
  const isOverview = currentSelectedGableKey === 'overview';
  const dataKey = isOverview ? 'tiangong' : currentSelectedGableKey;
  const data = langSet[dataKey] || langSet["tiangong"];
  const coord = gableCoordinates[currentSelectedGableKey] || gableCoordinates["tiangong"];

  if (data && badgeEl && titleEl && descEl && meaningEl) {
    if (isOverview) {
      badgeEl.textContent = currentLang === 'en' ? "Full Facade Overview" : "ภาพรวมสถาปัตยกรรมทั้งหลัง";
      titleEl.textContent = currentLang === 'en' ? "Dao Ming Schoolhouse & Front Porch" : "อาคารโรงเรียนเต้าหมิง & มุขหน้าสถาปัตยกรรม";
      descEl.textContent = currentLang === 'en' 
        ? "Constructed in 1922 by Hokkien master builder Master Phao, featuring colonial Ang Mor Lao verandas and classical pilasters embodying Chinese cosmology."
        : "อาคาร ๒ ชั้นสร้างขึ้นในปี ๒๔๖๕ โดยนายผาว ช่างฝีมือชาวจีนฮกเกี้ยน ผสานสถาปัตยกรรมโคโลเนียลอั้งม่อเหลาและปรัชญาจักรวาลจีนโบราณ";
      meaningEl.textContent = currentLang === 'en'
        ? "Tap any numbered pin (1 to 6) or button on the right to zoom into specific cosmic symbols."
        : "คลิกเลือกหมายเลข ๑ - ๖ บนตัวอาคาร หรือเลือกรายการด้านขวาเพื่อซูมส่องจุดสัญลักษณ์";
    } else {
      badgeEl.textContent = data.badge;
      titleEl.textContent = data.title;
      descEl.textContent = data.desc;
      meaningEl.textContent = data.meaning;
    }
  }

  // Apply Camera Smooth Zoom on Photo
  if (imgEl && coord) {
    imgEl.style.transformOrigin = coord.origin;
    imgEl.style.transform = `scale(${coord.scale})`;
  }

  // Update Reticle / Ring Position
  if (reticleEl && coord) {
    if (isOverview) {
      reticleEl.classList.remove('active');
    } else {
      reticleEl.style.top = coord.reticleTop;
      reticleEl.style.left = coord.reticleLeft;
      reticleEl.classList.add('active');
    }
  }

  // Update Status Text & Scale Badge
  if (statusTextEl && coord) {
    statusTextEl.textContent = currentLang === 'en' ? coord.name_en : coord.name_th;
  }
  if (scaleBadgeEl && coord) {
    scaleBadgeEl.textContent = coord.scaleLabel;
  }
}

/* ==========================================================================
   PHOTO ARCHIVE LIGHTBOX MODAL
   ========================================================================== */
function openPhotoLightbox(imgSrc, caption) {
  const modal = document.getElementById('photoLightbox');
  const img = document.getElementById('lightboxImg');
  const cap = document.getElementById('lightboxCaption');

  if (modal && img && cap) {
    img.src = imgSrc;
    cap.textContent = caption;
    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
}
window.openPhotoLightbox = openPhotoLightbox;

function closePhotoLightbox() {
  const modal = document.getElementById('photoLightbox');
  if (modal) {
    modal.classList.remove('open');
    document.body.style.overflow = '';
  }
}
window.closePhotoLightbox = closePhotoLightbox;

/* ==========================================================================
   SPACE & ZONE EXPLORER
   ========================================================================== */
function initSpaceExplorer() {
  const zoneItems = document.querySelectorAll('.zone-item');

  zoneItems.forEach(item => {
    item.addEventListener('click', () => {
      zoneItems.forEach(i => i.classList.remove('active'));
      item.classList.add('active');

      currentSelectedZoneKey = item.getAttribute('data-zone');
      updateZoneDisplay();
    });
  });
}

function selectZoneAndScroll(zoneKey) {
  const zoneItems = document.querySelectorAll('.zone-item');
  zoneItems.forEach(item => {
    if (item.getAttribute('data-zone') === zoneKey) {
      item.classList.add('active');
    } else {
      item.classList.remove('active');
    }
  });

  currentSelectedZoneKey = zoneKey;
  updateZoneDisplay();

  const spacesSection = document.getElementById('spaces');
  if (spacesSection) {
    spacesSection.scrollIntoView({ behavior: 'smooth' });
  }
}
window.selectZoneAndScroll = selectZoneAndScroll;

function updateZoneDisplay() {
  const badgeEl = document.getElementById('zoneBadge');
  const titleEl = document.getElementById('zoneTitle');
  const descEl = document.getElementById('zoneDesc');
  const areaEl = document.getElementById('zoneArea');
  const capEl = document.getElementById('zoneCap');
  const equipEl = document.getElementById('zoneEquip');
  const ventEl = document.getElementById('zoneVent');

  const langSet = zonesData[currentLang] || zonesData.th;
  const data = langSet[currentSelectedZoneKey] || langSet["hall"];

  if (data && badgeEl && titleEl && descEl && areaEl && capEl && equipEl && ventEl) {
    badgeEl.textContent = data.badge;
    titleEl.textContent = data.title;
    descEl.textContent = data.desc;
    areaEl.textContent = data.area;
    capEl.textContent = data.cap;
    equipEl.textContent = data.equip;
    ventEl.textContent = data.vent;
  }
}

function openBookingWithZone() {
  const bookingSection = document.getElementById('booking');
  const zoneSelect = document.getElementById('bookZone');
  
  if (currentSelectedZoneKey && zoneSelect) {
    zoneSelect.value = currentSelectedZoneKey;
  }

  if (bookingSection) {
    bookingSection.scrollIntoView({ behavior: 'smooth' });
  }
}
window.openBookingWithZone = openBookingWithZone;

/* ==========================================================================
   EVENTS & WORKSHOPS FILTER & RENDER
   ========================================================================== */
function initEventFilter() {
  const filterBtns = document.querySelectorAll('.filter-btn');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      currentEventFilter = btn.getAttribute('data-filter');
      renderEvents();
    });
  });
}

function renderEvents() {
  const grid = document.getElementById('eventsGrid');
  if (!grid) return;

  const dict = translations[currentLang] || translations.th;
  const filtered = eventsList.filter(e => currentEventFilter === 'all' || e.category === currentEventFilter);

  grid.innerHTML = filtered.map(ev => {
    const isEn = currentLang === 'en';
    const tag = isEn ? ev.tag_en : ev.tag_th;
    const day = isEn ? ev.day_en : ev.day_th;
    const month = isEn ? ev.month_en : ev.month_th;
    const title = isEn ? ev.title_en : ev.title_th;
    const snippet = isEn ? ev.snippet_en : ev.snippet_th;
    const loc = isEn ? ev.loc_en : ev.loc_th;
    const time = isEn ? ev.time_en : ev.time_th;
    const cap = isEn ? ev.cap_en : ev.cap_th;
    const price = isEn ? ev.price_en : ev.price_th;

    let btnLabel = dict.btn_register;
    if (ev.btnType === 'details') btnLabel = dict.btn_details;
    if (ev.btnType === 'shops') btnLabel = dict.btn_view_shops;
    if (ev.btnType === 'reserve') btnLabel = dict.btn_reserve_seat;

    const tagClass = `${ev.category === 'workshop' ? 'workshop-tag' : ev.category === 'exhibition' ? 'exh-tag' : ev.category === 'market' ? 'market-tag' : 'talk-tag'}`;

    return `
      <div class="event-card" data-category="${ev.category}">
        <div class="event-card-img-wrap">
          <img src="${ev.image}" alt="${title}" loading="lazy">
          <div class="event-header-tag ${tagClass}">${tag}</div>
        </div>
        <div class="event-card-body">
          <div class="event-date-box">
            <span class="ev-day">${day}</span>
            <span class="ev-month">${month}</span>
          </div>
          <h3 class="event-title">${title}</h3>
          <p class="event-snippet">${snippet}</p>
          <div class="event-meta-info">
            <span>${loc}</span>
            <span>${time}</span>
            <span>${cap}</span>
          </div>
          <div class="event-card-footer">
            <span class="event-price ${ev.isFree ? 'highlight-free' : ''}">${price}</span>
            <button class="btn btn-outline-sm" onclick="handleEventRegister('${escapeHtml(title)}')">${btnLabel}</button>
          </div>
        </div>
      </div>
    `;
  }).join('');
}

function handleEventRegister(eventName) {
  const isEn = currentLang === 'en';
  const promptMsg = isEn 
    ? `You are registering for: "${eventName}"\nPlease enter your name and phone number to reserve your spot:` 
    : `คุณกำลังจะลงทะเบียนเข้าร่วม: "${eventName}"\n\nกรุณากรอกชื่อและเบอร์โทรศัพท์เพื่อสำรองสิทธิ์:`;

  const userInput = prompt(promptMsg, "");
  if (userInput && userInput.trim()) {
    showToast(isEn 
      ? `Registration for "${eventName}" confirmed! Our team will contact you shortly.` 
      : `ลงทะเบียน "${eventName}" เรียบร้อยแล้ว! ทีมงานจะติดต่อกลับครับ`
    );
  }
}
window.handleEventRegister = handleEventRegister;

/* ==========================================================================
   CO-CREATION IDEA BOARD (LOCALSTORAGE + BILINGUAL)
   ========================================================================== */
function initIdeaBoard() {
  const form = document.getElementById('ideaSubmissionForm');
  
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const catSelect = document.getElementById('ideaCategory');
      const catText = catSelect.options[catSelect.selectedIndex].text;
      const title = document.getElementById('ideaTitle').value.trim();
      const desc = document.getElementById('ideaDesc').value.trim();
      const author = document.getElementById('ideaAuthor').value.trim();

      if (!title || !desc || !author) return;

      const newIdea = {
        id: Date.now(),
        category_th: catText,
        category_en: catText,
        title_th: title,
        title_en: title,
        desc_th: desc,
        desc_en: desc,
        author_th: author,
        author_en: author,
        date_th: "เพิ่งโพสต์เมื่อครู่",
        date_en: "Just now",
        votes: 1,
        hasVoted: true
      };

      let stored = getStoredIdeas();
      stored.unshift(newIdea);
      saveStoredIdeas(stored);
      renderIdeas();
      form.reset();

      showToast(currentLang === 'th' ? "ส่งไอเดียของคุณขึ้นกระดานเรียบร้อยแล้ว!" : "Your idea has been posted to the board!");
    });
  }

  // Global vote function
  window.toggleVoteIdea = function(ideaId) {
    let ideas = getStoredIdeas();
    const target = ideas.find(i => i.id === ideaId);
    if (!target) return;

    if (target.hasVoted) {
      target.votes -= 1;
      target.hasVoted = false;
    } else {
      target.votes += 1;
      target.hasVoted = true;
    }

    saveStoredIdeas(ideas);
    renderIdeas();
  };
}

function getStoredIdeas() {
  const raw = localStorage.getItem('daoming_ideas_v2');
  if (raw) {
    try {
      return JSON.parse(raw);
    } catch (e) {
      return initialCommunityIdeas;
    }
  }
  return initialCommunityIdeas;
}

function saveStoredIdeas(ideas) {
  localStorage.setItem('daoming_ideas_v2', JSON.stringify(ideas));
}

function renderIdeas() {
  const streamEl = document.getElementById('ideasCardStream');
  const countEl = document.getElementById('ideaCount');
  if (!streamEl) return;

  const isEn = currentLang === 'en';
  const dict = translations[currentLang] || translations.th;
  let ideas = getStoredIdeas();

  ideas.sort((a, b) => b.votes - a.votes);

  if (countEl) countEl.textContent = ideas.length;

  streamEl.innerHTML = ideas.map(idea => {
    const category = isEn ? (idea.category_en || idea.category_th) : idea.category_th;
    const title = isEn ? (idea.title_en || idea.title_th) : idea.title_th;
    const desc = isEn ? (idea.desc_en || idea.desc_th) : idea.desc_th;
    const author = isEn ? (idea.author_en || idea.author_th) : idea.author_th;
    const date = isEn ? (idea.date_en || idea.date_th) : idea.date_th;

    return `
      <div class="user-idea-card" data-id="${idea.id}">
        <div class="idea-card-top">
          <span class="idea-category-tag">${category}</span>
          <button class="idea-heart-btn ${idea.hasVoted ? 'voted' : ''}" onclick="toggleVoteIdea(${idea.id})" aria-label="Upvote">
            <span>❤️</span>
            <strong class="vote-count">${idea.votes}</strong>
          </button>
        </div>
        <h4>${escapeHtml(title)}</h4>
        <p>${escapeHtml(desc)}</p>
        <div class="idea-card-author">
          <span>${dict.proposed_by} <strong>${escapeHtml(author)}</strong></span>
          <span>${date}</span>
        </div>
      </div>
    `;
  }).join('');
}

/* ==========================================================================
   SPACE BOOKING FORM
   ========================================================================== */
function initBookingForm() {
  const form = document.getElementById('spaceBookingForm');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('bookName').value;
    const phone = document.getElementById('bookPhone').value;
    const zoneSelect = document.getElementById('bookZone');
    const zoneText = zoneSelect.options[zoneSelect.selectedIndex].text;

    const isEn = currentLang === 'en';
    const msg = isEn
      ? `Thank you ${name}! Your request for "${zoneText}" has been received. Our coordinator will contact you at ${phone}.`
      : `ขอบคุณครับคุณ ${name} ได้รับคำขอใช้พื้นที่ "${zoneText}" แล้ว ทีมงานจะติดต่อกลับทางเบอร์ ${phone} ครับ`;

    showToast(msg);
    form.reset();
  });
}

/* ==========================================================================
   MOBILE DRAWER NAVIGATION
   ========================================================================== */
function initMobileDrawer() {
  const toggleBtn = document.getElementById('mobileMenuToggle');
  const closeBtn = document.getElementById('closeDrawerBtn');
  const backdrop = document.getElementById('drawerBackdrop');
  const drawer = document.getElementById('mobileDrawer');
  const navLinks = document.querySelectorAll('.m-link');
  const mobileBookingBtn = document.getElementById('mobileBookingBtn');

  function openDrawer() {
    if (drawer) drawer.classList.add('open');
    if (backdrop) backdrop.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeDrawer() {
    if (drawer) drawer.classList.remove('open');
    if (backdrop) backdrop.classList.remove('open');
    document.body.style.overflow = '';
  }

  if (toggleBtn) toggleBtn.addEventListener('click', openDrawer);
  if (closeBtn) closeBtn.addEventListener('click', closeDrawer);
  if (backdrop) backdrop.addEventListener('click', closeDrawer);

  navLinks.forEach(link => {
    link.addEventListener('click', closeDrawer);
  });

  if (mobileBookingBtn) {
    mobileBookingBtn.addEventListener('click', () => {
      closeDrawer();
      const booking = document.getElementById('booking');
      if (booking) booking.scrollIntoView({ behavior: 'smooth' });
    });
  }
}

/* ==========================================================================
   UTILITY HELPERS
   ========================================================================== */
function showToast(message) {
  const toast = document.getElementById('toastNotification');
  const msgEl = document.getElementById('toastMessage');
  if (!toast || !msgEl) return;

  msgEl.textContent = message;
  toast.classList.add('show');

  setTimeout(() => {
    toast.classList.remove('show');
  }, 4500);
}

function escapeHtml(string) {
  return String(string).replace(/[&<>"']/g, function (s) {
    return {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#39;'
    }[s];
  });
}

/* ==========================================================================
   SCROLL-SPY & MOBILE DOCK DYNAMICS
   ========================================================================== */
function initScrollSpy() {
  const sections = document.querySelectorAll('section[id], header[id]');
  const navLinks = document.querySelectorAll('.nav-link');
  const mLinks = document.querySelectorAll('.m-link');
  const dock = document.getElementById('mobileActionDock');
  let lastScrollY = window.scrollY;

  // 1. Intersection Observer for active nav highlighting
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        
        navLinks.forEach(link => {
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active-nav');
          } else {
            link.classList.remove('active-nav');
          }
        });

        mLinks.forEach(link => {
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active-nav');
          } else {
            link.classList.remove('active-nav');
          }
        });
      }
    });
  }, {
    rootMargin: '-15% 0px -65% 0px',
    threshold: 0
  });

  sections.forEach(sec => observer.observe(sec));

  // 2. Mobile Dock auto-hide on fast scroll down, reveal on scroll up
  window.addEventListener('scroll', () => {
    const currentScrollY = window.scrollY;
    if (dock) {
      if (currentScrollY > 200 && currentScrollY > lastScrollY + 10) {
        dock.style.transform = 'translate(-50%, 100px)';
        dock.style.opacity = '0';
      } else if (currentScrollY < lastScrollY - 5 || currentScrollY <= 200) {
        dock.style.transform = 'translate(-50%, 0)';
        dock.style.opacity = '1';
      }
    }
    lastScrollY = currentScrollY;
  }, { passive: true });

  // 3. Global ESC key listener
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closePhotoLightbox();
      const drawer = document.getElementById('mobileDrawer');
      const backdrop = document.getElementById('drawerBackdrop');
      if (drawer && drawer.classList.contains('open')) {
        drawer.classList.remove('open');
        if (backdrop) backdrop.classList.remove('open');
        document.body.style.overflow = '';
      }
    }
  });
}
