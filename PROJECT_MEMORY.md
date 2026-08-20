# Dao Ming Takua Pa Hub — Project Architecture & Workflow Memory

**Last Updated:** 2026-08-21  
**Repository:** `https://github.com/Katz121/daoming-takuapa-hub.git` (`master`)  
**Production URL:** [https://daoming-takuapa-hub.pages.dev](https://daoming-takuapa-hub.pages.dev)  
**Admin Portal:** [https://daoming-takuapa-hub.pages.dev/admin](https://daoming-takuapa-hub.pages.dev/admin)  
**Super Admin Master Passcodes:** `takuapa2569`, `daoming2026`, `daoming`, `2465`, `82110`, `admin1234`  

---

## 1. Project Overview & Identity
- **Name:** Dao Ming Takua Pa Living Heritage & Creative Hub (โรงเรียนเต้าหมิง ตะกั่วป่า - บริบทใหม่ในเมืองเก่า)
- **Foundation:** มูลนิธิโรงเรียนเต้าหมิง ตะกั่วป่า (Dao Ming Foundation Takua Pa)
- **Award:** รางวัลอนุรักษ์ศิลปสถาปัตยกรรม ประจำปี ๒๕๖๙ โดยสมาคมสถาปนิกสยามฯ (ASA)
- **Official Master Logo:** ตราสัญลักษณ์หน้าจั่วและอักษรประดิษฐ์ "เต้าหมิง" (ดัดแปลงจาก `d:\workFull\daoming_hub\img\logo1.jpg` โดยตัดคำว่า "awakening" ออกทั้งหมด) เส้นสายคมชัด สีแดงจีนมรดก (Heritage Crimson Red `#E11D48`) พื้นหลังโปร่งใส (Transparent PNG) และปรับขนาดใน Hero Caption เป็น 68px พร้อมขอบสีทอง
- **Admin Logo Styling:** ตราสัญลักษณ์ในหน้าต่างเข้าสู่ระบบและแถบ Header ของระบบ Admin ใช้พื้นหลังสีขาวสว่าง (`backgroundColor: '#FFFFFF'`) ตัดขอบทองนูน
- **Contact:** 
  - Phone: `0813703883`
  - Email: `pook.kanokpon@gmail.com`
  - Address: ถนนศรีตะกั่วป่า ตำบลตลาดใหญ่ อำเภอตะกั่วป่า จังหวัดพังงา 82110

---

## 2. Pop-Heritage Artwork & 120th Anniversary Series
- **Master Artwork:** `public/assets/poster-daoming-pop.png` & `.jpg` (1200x1600 px)
- **Design Philosophy:**
  - ผสานตราสัญลักษณ์เต้าหมิงเข้ากับโครงข่ายแสตมป์ไปรษณีย์โบราณเมืองตะกั่วป่า (อ้างอิงจากโปสเตอร์กั่วป่าโพ้)
  - **Symmetrical Grid Architecture:** จัดวางองค์ประกอบและบล็อกสีพื้นหลังแบบสมมาตรเรขาคณิต (Bilateral Symmetry) 2 คอลัมน์บน-ล่าง และ 3 คอลัมน์ตรงกลางโดยมีตราสัญลักษณ์เต้าหมิงขนาดใหญ่เป็น Hero Centerpiece
  - **Direct Pop Contrast (No White Boxes):** คู่สีเหลืองแดดนีออน (`#FFEE28`) และฟ้าสกายบลู (`#82E0F6`) ตัดกับลายเส้นและตราประทับสีชมพูมาเจนต้า (`#EB0073`) โดยไม่มีกล่องขาวทึบขัดสายตา
  - **Single-Character Chinese Seals:** ประทับดวงตราอักษรจีนเดี่ยวเส้นโปร่งสบายตา (`Microsoft YaHei Light`) ความหมายมงคล: `「導」` (เต้า/นำทาง), `「明」` (หมิง/แสงสว่าง), `「光」` (กวาง/ประกายแสง), `「道」` (เต๋า/หนทาง), `「高」` (เกา/ตะกั่วป่า), `「巴」` (บา/บาบ๋า)
  - **Footer Historic Banner:** `「導」` · `「明」` · `「德古巴」` · `「一二〇年」`
- **Exhibition Placements on Website:**
  1. **คลังภาพประวัติศาสตร์ & อัตลักษณ์ (`ArchiveGallery`):** หมวดใหม่ `🎨 อัตลักษณ์ & ศิลปะ` (`category: 'art'`) รองรับการเปิดดูภาพความละเอียดสูงใน Lightbox พร้อมปุ่มดาวน์โหลด HD
  2. **โซนการเดินทาง & ของที่ระลึก (`VisitSection`):** การ์ดแบนเนอร์ **"โปสการ์ดของที่ระลึก ๑๒๐ ปี เต้าหมิง"** สำหรับแจกผู้มาเยือนและโหลดเป็น Wallpaper มือถือ

---

## 3. Non-Negotiable Operating Rules

1. **Zero Data Loss Across Git Updates & Redeployments:**
   - ข้อมูลทั้งหมดที่ถูกสร้างหรือแก้ไขใน Admin จะถูกจัดเก็บใน `localStorage` ผ่าน **Master Keys (`daoming_permanent_*_master`)**
   - การ Build หรือ Git push / deploy ใหม่ **ต้องไม่เขียนทับหรือรีเซ็ตข้อมูลที่ผู้ดูแลระบบแก้ไขไว้เด็ดขาด**
   - ฟังก์ชัน `getArchivePhotos()` มีระบบ Auto-Merge สำหรับภาพเริ่มต้นใหม่ๆ เช่น โปสเตอร์ ๑๒๐ ปี เพื่อให้ผู้ใช้เดิมที่เคยเปิดเว็บแล้วได้รับข้อมูลอัปเดตทันที
   - ค่าเริ่มต้นในโค้ด (Default seeds) ทำหน้าที่เป็น Initial State เฉพาะเมื่อไม่มี Master Key ในระบบเท่านั้น

2. **Direct Client-Side Image Upload (No Git Push Needed):**
   - ทุกหน้าต่างแก้ไขรูปภาพใน Admin มีปุ่ม `[ 📁 เลือกรูปจากเครื่อง / มือถือ ]`
   - มีระบบ HTML5 Canvas Resize & JPEG Compression (`MAX_WIDTH = 1280px`, `quality = 0.82`) ช่วยแปลงรูปเป็น Data URL แบบบีบอัดพร้อมใช้งานทันที

3. **Multilingual Consistency:**
   - ทุกส่วนรองรับ 3 ภาษา: ไทย (TH), อังกฤษ (EN), จีนตัวเต็ม (ZH)

---

## 4. Permanent Master Storage Architecture (`src/lib/clientDb.ts`)

| Master Key | Purpose | Update Event Dispatched |
| :--- | :--- | :--- |
| `daoming_permanent_users_master` | Member accounts, roles, auth passwords & permissions | `daoming_users_updated` |
| `daoming_permanent_site_copy_master` | Hero texts, ASA award badge, Slogans, Vision, Contact | `daoming_site_copy_updated` |
| `daoming_permanent_gables_master` | 5 Gable symbols (Tiangong pillar, Cloud base, Triangle, Sun 12-ray, Dome capitals) | `daoming_gables_updated` |
| `daoming_permanent_timeline_master` | 4 Historical Era Milestones (1905, 1950, 1990, 2026) | `daoming_timeline_updated` |
| `daoming_permanent_archive_master` | Historic photos, captions, years & stories | `daoming_archive_updated` |
| `daoming_permanent_events_master` | Workshops, tea sessions, talk events, ticket caps | `daoming_events_updated` |
| `daoming_permanent_audit_logs_master` | Security & Admin Activity Audit Trails (Admin only) | `daoming_audit_logs_updated` |
| `daoming_permanent_bookings_master` | Ticket registrations & Space proposals | `storage` |
| `daoming_permanent_ideas_master` | Community proposals & votes | `storage` |

### Database Backup & Restore:
- **Export Full Database:** ดาวน์โหลดไฟล์ JSON ก้อนเดียวรวมทุก Master Table (รวมรายชื่อสมาชิกและสิทธิ์)
- **Import Full Database:** อัปโหลด JSON เพื่อกู้คืนหรือ Sync ข้ามเครื่อง พร้อมระบบ Merge ป้องกันการบันทึกซ้ำ

---

## 5. Admin Portal CMS Structure (`/admin`)

- **Tab 1: 👥 สมาชิก & สิทธิ์ (Users & Roles)** — จัดการสมาชิกและสิทธิ์การเข้าใช้งาน, Super Admin แต่งตั้งสิทธิ์ (Super Admin, Officer, Staff, Member), อนุมัติผู้สมัครใหม่, รีเซ็ตรหัสผ่าน และระงับบัญชี
- **Tab 2: 📜 ประวัติการแก้ไข (Audit Logs)** — บันทึกประวัติกิจกรรมและการแก้ไขของแอดมินทุกคนแบบละเอียด (Action, User, Module, Timestamp, Details) เห็นได้เฉพาะระดับ Admin
- **Tab 3: 📅 จัดการกิจกรรม (Events CMS)** — เพิ่ม/แก้ไข/ลบ เวิร์กช็อป จิบชาเปอยี่ นิทรรศการ, กำหนดจำนวนที่นั่ง, เวลา และราคา
- **Tab 4: 🖼️ คลังภาพ & เรื่องเล่า (Archive Photos CMS)** — จัดการภาพประวัติศาสตร์และอาร์ตเวิร์ก 3 ภาษา พร้อมปุ่มอัปโหลดรูป
- **Tab 5: 📝 ข้อความ & เนื้อหาเว็บ (Site Copy CMS)** — จัดการข้อความหน้าแรก, ปรัชญาหน้าจั่ว ๕ สัญลักษณ์, ประวัติศาสตร์ ๔ ยุค, วิสัยทัศน์ และข้อมูลติดต่อ
- **Tab 6: 🎫 สแกนตั๋ว & รายชื่อ (Ticket Scanner & Verification)** — สแกน QR Code หน้างาน, ค้นหารหัสตั๋ว `DM-VIP-XXXX`, ปุ่มบันทึก Check-in
- **Tab 7: 🏛️ จองพื้นที่ & อนุมัติ (Space Proposals)** — ตรวจสอบและอนุมัติการขอใช้พื้นที่จัดกิจกรรม (โถงอั้งม่อเหลา, คราฟต์สตูดิโอ, ลานวัฒนธรรม, ระเบียงไม้)
- **Tab 8: 💡 ไอเดียชุมชน (Community Ideas)** — ตรวจสอบข้อเสนอแนะจากชาวตะกั่วป่า
- **Tab 9: 📊 รายงาน & สำรองข้อมูล (Reports & Backup)** — ดาวน์โหลด CSV และระบบ Export / Import Master JSON

---

## 6. Audio & Media Systems

- **Timeline Audio Narration (`src/components/timeline/TimelineSection.tsx` & `AudioGuideModal.tsx`):**
  - บทที่ ๑-๔ เล่าประวัติศาสตร์ ๑๒๐ ปี
  - ตัวนับเวลา `0:00 / 0:38` และแถบเลื่อนเวลาตั้งค่าสีเป็นสีขาวคมชัดพิเศษ (`#FFFFFF !important`, `font-weight: 700`) เพื่อให้อ่านง่ายบนทุกพื้นหลัง
- **Background Ambient Music Player:** ถอดระบบดนตรีคลอพื้นหลังแบบลอยตัว (Floating Ambient Player) ออกเรียบร้อยแล้ว เพื่อให้หน้าจอบนโทรศัพท์มือถือโล่ง สะอาดตา และไม่เกะกะการใช้งาน

---

## 7. Build & Deployment Commands

```powershell
# 1. รันโหมด Development ในเครื่อง
npm run dev

# 2. ทดสอบ Build Static Pages (ตรวจสอบ Type & Next.js Export)
npm run build

# 3. Deploy ขึ้น Cloudflare Pages โดยตรง
npm run deploy

# 4. Commit และ Push ขึ้น GitHub
git add .
git commit -m "feat/fix: description"
git push origin master
```
