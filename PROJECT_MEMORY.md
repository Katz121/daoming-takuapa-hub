# Dao Ming Takua Pa Hub — Project Architecture & Workflow Memory

**Last Updated:** 2026-08-19  
**Repository:** `https://github.com/Katz121/daoming-takuapa-hub.git` (`master`)  
**Production URL:** [https://daoming-takuapa-hub.pages.dev](https://daoming-takuapa-hub.pages.dev)  
**Admin Portal:** [https://daoming-takuapa-hub.pages.dev/admin](https://daoming-takuapa-hub.pages.dev/admin)  
**Authorized Passcodes:** `daoming2026`, `daoming`, `2465`, `82110`, `admin1234`  

---

## 1. Project Overview & Identity
- **Name:** Dao Ming Takua Pa Living Heritage & Creative Hub (โรงเรียนเต้าหมิง ตะกั่วป่า - บริบทใหม่ในเมืองเก่า)
- **Foundation:** มูลนิธิโรงเรียนเต้าหมิง ตะกั่วป่า (Dao Ming Foundation Takua Pa)
- **Award:** รางวัลอนุรักษ์ศิลปสถาปัตยกรรม ประจำปี ๒๕๖๙ โดยสมาคมสถาปนิกสยามฯ (ASA)
- **Logo Branding:** ตราสัญลักษณ์หน้าจั่วและอักษรประดิษฐ์ "เต้าหมิง" (ดัดแปลงจาก `d:\Takuapa\images\logo-305.jpg`) ถอดพื้นหลังสีส้มออกเป็นโปร่งใส (Transparent PNG) และเส้นสายตัวอักษรเป็นสีแดงจีนมรดก (Heritage Crimson Red `#E11D48` / `#DC2626`) ให้ความคมชัดบนทุกพื้นหลัง
- **Contact:** 
  - Phone: `0813703883`
  - Email: `pook.kanokpon@gmail.com`
  - Address: ถนนศรีตะกั่วป่า ตำบลตลาดใหญ่ อำเภอตะกั่วป่า จังหวัดพังงา 82110

---

## 2. Non-Negotiable Operating Rules

1. **Zero Data Loss Across Git Updates & Redeployments:**
   - ข้อมูลทั้งหมดที่ถูกสร้างหรือแก้ไขใน Admin (กิจกรรม, คลังภาพ, ข้อความหน้าเว็บ, ปรัชญาหน้าจั่ว, ประวัติศาสตร์ ๔ ยุค, ตั๋ว, คำขอใช้พื้นที่, ไอเดียชุมชน) จะถูกจัดเก็บใน `localStorage` ผ่าน **Master Keys (`daoming_permanent_*_master`)**
   - การ Build หรือ Git push / deploy ใหม่ **ต้องไม่เขียนทับหรือรีเซ็ตข้อมูลที่ผู้ดูแลระบบแก้ไขไว้เด็ดขาด**
   - ค่าเริ่มต้นในโค้ด (Default seeds) จะทำหน้าที่เป็น Initial State เฉพาะเมื่อไม่มี Master Key ในระบบเท่านั้น

2. **Direct Client-Side Image Upload (No Git Push Needed):**
   - ทุกหน้าต่างแก้ไขรูปภาพใน Admin มีปุ่ม `[ 📁 เลือกรูปจากเครื่อง / มือถือ ]`
   - มีระบบ HTML5 Canvas Resize & JPEG Compression (`MAX_WIDTH = 1280px`, `quality = 0.82`) ช่วยแปลงรูปเป็น Data URL แบบบีบอัดพร้อมใช้งานทันที

3. **Multilingual Consistency:**
   - ทุกส่วนรองรับ 3 ภาษา: ไทย (TH), อังกฤษ (EN), จีนตัวเต็ม (ZH)
   - ฟอนต์ภาษาไทยใช้มาตรฐานระบบที่อ่านง่ายและจัดวางความสมดุลของวรรณยุกต์

---

## 3. Permanent Master Storage Architecture (`src/lib/clientDb.ts`)

| Master Key | Purpose | Update Event Dispatched |
| :--- | :--- | :--- |
| `daoming_permanent_users_master` | Member accounts, roles, auth passwords & permissions | `daoming_users_updated` |
| `daoming_permanent_site_copy_master` | Hero texts, ASA award badge, Slogans, Vision, Contact | `daoming_site_copy_updated` |
| `daoming_permanent_gables_master` | 5 Gable symbols (Tiangong pillar, Cloud base, Triangle, Sun 12-ray, Dome capitals) | `daoming_gables_updated` |
| `daoming_permanent_timeline_master` | 4 Historical Era Milestones (1905, 1950, 1990, 2026) | `daoming_timeline_updated` |
| `daoming_permanent_archive_master` | Historic photos, captions, years & stories | `daoming_archive_updated` |
| `daoming_permanent_events_master` | Workshops, tea sessions, talk events, ticket caps | `daoming_events_updated` |
| `daoming_permanent_bookings_master` | Ticket registrations & Space proposals | `storage` |
| `daoming_permanent_ideas_master` | Community proposals & votes | `storage` |

### Database Backup & Restore:
- **Export Full Database:** ดาวน์โหลดไฟล์ JSON ก้อนเดียวรวมทุก Master Table (รวมรายชื่อสมาชิกและสิทธิ์)
- **Import Full Database:** อัปโหลด JSON เพื่อกู้คืนหรือ Sync ข้ามเครื่อง พร้อมระบบ Merge ป้องกันการบันทึกซ้ำ

---

## 4. Admin Portal CMS Structure (`/admin`)

- **Tab 1: 👥 สมาชิก & สิทธิ์ (Users & Roles)** — จัดการสมาชิกและสิทธิ์การเข้าใช้งาน, Super Admin (`admin/takuapa2569`) แต่งตั้งสิทธิ์ (Super Admin, Officer, Staff, Member), อนุมัติผู้สมัครใหม่, รีเซ็ตรหัสผ่าน และระงับบัญชี
- **Tab 2: 📅 จัดการกิจกรรม (Events CMS)** — เพิ่ม/แก้ไข/ลบ เวิร์กช็อป จิบชาเปอยี่ นิทรรศการ, กำหนดจำนวนที่นั่ง, เวลา และราคา
- **Tab 3: 🖼️ คลังภาพ & เรื่องเล่า (Archive Photos CMS)** — จัดการภาพประวัติศาสตร์ 3 ภาษา พร้อมปุ่มอัปโหลดรูป
- **Tab 4: 📝 ข้อความ & เนื้อหาเว็บ (Site Copy CMS)** — จัดการข้อความหน้าแรก, ปรัชญาหน้าจั่ว ๕ สัญลักษณ์, ประวัติศาสตร์ ๔ ยุค, วิสัยทัศน์ และข้อมูลติดต่อ
- **Tab 5: 🎫 สแกนตั๋ว & รายชื่อ (Ticket Scanner & Verification)** — สแกน QR Code หน้างาน, ค้นหารหัสตั๋ว `DM-VIP-XXXX`, ปุ่มบันทึก Check-in
- **Tab 6: 🏛️ จองพื้นที่ & อนุมัติ (Space Proposals)** — ตรวจสอบและอนุมัติการขอใช้พื้นที่จัดกิจกรรม (โถงอั้งม่อเหลา, คราฟต์สตูดิโอ, ลานวัฒนธรรม, ระเบียงไม้)
- **Tab 7: 💡 ไอเดียชุมชน (Community Ideas)** — ตรวจสอบข้อเสนอแนะจากชาวตะกั่วป่า
- **Tab 8: 📊 รายงาน & สำรองข้อมูล (Reports & Backup)** — ดาวน์โหลด CSV และระบบ Export / Import Master JSON

---

## 5. Audio & Media Systems

- **Background Ambient Music Player (`src/components/audio/BackgroundMusicPlayer.tsx`):**
  - เพลงคลอพื้นหลังแบบจีนประยุกต์ / กู่เจิง
  - ซ่อนแถบเครื่องมือแบบย่อเสมอเมื่อไม่ได้กดขยาย (Sticky Minimized Pill)
  - รองรับการปรับระดับเสียง และบันทึกสถานะการเปิด/ปิด
- **120-Year Oral History Audio Chapters (`src/components/timeline/TimelineSection.tsx`):**
  - บทที่ ๑: กำเนิด "โต๊ะเบ๋ง" สู่การลงขันสร้างอาคารโดยช่างผาว (1905-1922)
  - บทที่ ๒: ยุคทองแห่งการศึกษา บาสเกตบอล และการต้อนรับกงสุลจีน (1937-1967)
  - บทที่ ๓: จัดตั้งมูลนิธิฯ & การส่งมอบกรรมสิทธิ์ที่ดินเพื่อสาธารณะ (1990-2004)
  - บทที่ ๔: บริบทใหม่ในเมืองตะกั่วป่า & รางวัลอนุรักษ์ศิลปสถาปัตยกรรม ๒๕๖๙ (2026)
  - แถบเลื่อนเวลา (Scrubber) พร้อมตัวนับเวลานาที:วินาทีแบบเรียลไทม์

---

## 6. Build & Deployment Commands

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
