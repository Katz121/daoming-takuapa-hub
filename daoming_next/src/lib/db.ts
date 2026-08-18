import Database from 'better-sqlite3';
import path from 'path';
import fs from 'fs';
import QRCode from 'qrcode';

const dataDir = path.join(process.cwd(), 'data');
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

const dbPath = path.join(dataDir, 'daoming.db');
const db = new Database(dbPath);

// Enable WAL mode for high concurrency
db.pragma('journal_mode = WAL');
db.pragma('foreign_keys = ON');

// Initialize database schema
db.exec(`
  CREATE TABLE IF NOT EXISTS events (
    id TEXT PRIMARY KEY,
    title_th TEXT NOT NULL,
    title_en TEXT NOT NULL,
    category TEXT NOT NULL,
    date_label TEXT NOT NULL,
    capacity INTEGER NOT NULL,
    remaining_seats INTEGER NOT NULL,
    price_thb INTEGER NOT NULL DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS bookings (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    ticket_code TEXT UNIQUE NOT NULL,
    event_id TEXT NOT NULL,
    guest_name TEXT NOT NULL,
    guest_phone TEXT NOT NULL,
    guest_email TEXT,
    seats INTEGER NOT NULL DEFAULT 1,
    tea_blend TEXT,
    pastry_type TEXT,
    qr_data_url TEXT,
    checked_in INTEGER NOT NULL DEFAULT 0,
    checked_in_at DATETIME,
    status TEXT NOT NULL DEFAULT 'confirmed', -- confirmed, pending, approved, rejected, cancelled
    admin_notes TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY(event_id) REFERENCES events(id)
  );

  CREATE TABLE IF NOT EXISTS community_ideas (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    desc TEXT NOT NULL,
    author TEXT NOT NULL,
    category_th TEXT NOT NULL,
    category_en TEXT NOT NULL,
    votes INTEGER NOT NULL DEFAULT 0,
    status TEXT NOT NULL DEFAULT 'submitted', -- submitted, reviewing, in_action, completed
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS idea_votes (
    idea_id INTEGER NOT NULL,
    voter_key TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (idea_id, voter_key),
    FOREIGN KEY(idea_id) REFERENCES community_ideas(id) ON DELETE CASCADE
  );
`);

// Seed initial events if empty
const eventCount = db.prepare('SELECT COUNT(*) as cnt FROM events').get() as { cnt: number };
if (eventCount.cnt === 0) {
  const insertEvent = db.prepare(`
    INSERT INTO events (id, title_th, title_en, category, date_label, capacity, remaining_seats, price_thb)
    VALUES (@id, @title_th, @title_en, @category, @date_label, @capacity, @remaining_seats, @price_thb)
  `);

  const initialEvents = [
    {
      id: 'e1',
      title_th: 'สุนทรีย์จิบชายามบ่าย & ลิ้มรสเต้าส้อเต้าหมิง',
      title_en: 'Heritage Afternoon Tea & Tao Sae Tasting',
      category: 'workshop',
      date_label: 'ทุกวันเสาร์-อาทิตย์',
      capacity: 32,
      remaining_seats: 12,
      price_thb: 490
    },
    {
      id: 'e2',
      title_th: 'นิทรรศการภาพถ่ายโบราณ: 120 ปี ความทรงจำเมืองเหมืองแร่',
      title_en: '120 Years of Tin Mining Memory Photo Exhibition',
      category: 'exhibition',
      date_label: '1 พ.ค. - 30 มิ.ย. 2569',
      capacity: 200,
      remaining_seats: 180,
      price_thb: 0
    },
    {
      id: 'e3',
      title_th: 'ตลาดนัดเต้าหมิง ครีเอทีฟ มาร์เก็ต & ดนตรีในสวน',
      title_en: 'Dao Ming Twilight Creative Market & Music',
      category: 'market',
      date_label: 'เสาร์แรกของเดือน',
      capacity: 300,
      remaining_seats: 250,
      price_thb: 0
    },
    {
      id: 'e4',
      title_th: 'เสวนาเมือง: จากมรดกอั้งม่อเหลาสู่การฟื้นฟูเมืองเก่าอย่างยั่งยืน',
      title_en: 'Town Talk: From Ang Mor Lao Heritage to Sustainable Urban Renewal',
      category: 'talk',
      date_label: '15 พฤษภาคม 2569',
      capacity: 60,
      remaining_seats: 18,
      price_thb: 0
    },
    {
      id: 'hall',
      title_th: 'โถงอาคารไม้ประวัติศาสตร์ (Zone A)',
      title_en: 'Main Heritage Hall (Zone A)',
      category: 'space',
      date_label: 'เปิดให้จองใช้งาน',
      capacity: 120,
      remaining_seats: 120,
      price_thb: 0
    },
    {
      id: 'courtyard',
      title_th: 'ลานกลางแจ้งเต้าหมิง (Zone B)',
      title_en: 'Dao Ming Courtyard (Zone B)',
      category: 'space',
      date_label: 'เปิดให้จองใช้งาน',
      capacity: 250,
      remaining_seats: 250,
      price_thb: 0
    },
    {
      id: 'studio',
      title_th: 'สตูดิโอเวิร์กช็อป (Zone C)',
      title_en: 'Craft Studio (Zone C)',
      category: 'space',
      date_label: 'เปิดให้จองใช้งาน',
      capacity: 35,
      remaining_seats: 35,
      price_thb: 0
    },
    {
      id: 'cafe',
      title_th: 'คาเฟ่ & พื้นที่นั่งทำงาน (Zone D)',
      title_en: 'Community Cafe & Lounge (Zone D)',
      category: 'space',
      date_label: 'เปิดให้จองใช้งาน',
      capacity: 45,
      remaining_seats: 45,
      price_thb: 0
    },
    {
      id: 'all',
      title_th: 'เหมารวมทั้งพื้นที่ (All Zones)',
      title_en: 'All Zones Entire Facility',
      category: 'space',
      date_label: 'เปิดให้จองใช้งาน',
      capacity: 400,
      remaining_seats: 400,
      price_thb: 0
    }
  ];

  for (const ev of initialEvents) {
    insertEvent.run(ev);
  }
}

// Seed initial ideas if empty
const ideaCount = db.prepare('SELECT COUNT(*) as cnt FROM community_ideas').get() as { cnt: number };
if (ideaCount.cnt === 0) {
  const insertIdea = db.prepare(`
    INSERT INTO community_ideas (title, desc, author, category_th, category_en, votes, status)
    VALUES (@title, @desc, @author, @category_th, @category_en, @votes, @status)
  `);

  const initialIdeas = [
    {
      title: "เวิร์กช็อปมัดย้อมสีธรรมชาติจากเปลือกต้นมังคุด",
      desc: "อยากให้มีคลาสสอนย้อมผ้าด้วยพืชพรรณท้องถิ่นตะกั่วป่า ทั้งเปลือกมังคุดและใบหูกวาง นำมาพิมพ์ลายร่วมสมัย",
      author: "ชมรมเยาวชนรักษ์เมืองเก่า",
      category_th: "🎨 ศิลปะ & งานคราฟต์",
      category_en: "🎨 Art & Crafts",
      votes: 14,
      status: "reviewing"
    },
    {
      title: "ฉายภาพยนตร์สารคดีประวัติศาสตร์เหมืองแร่ใต้แสงดาว",
      desc: "จัดฉายหนังกลางแปลงเกี่ยวกับประวัติศาสตร์เรือขุดแร่และเรื่องเล่าคนสู้ชีวิตในอดีต พร้อมเสวนาแลกเปลี่ยน",
      author: "กลุ่มคนรุ่นใหม่พังงา",
      category_th: "🎭 การแสดง & ดนตรี",
      category_en: "🎭 Performance & Music",
      votes: 21,
      status: "in_action"
    },
    {
      title: "คลาสทำขนมอังกู๊โก้ยสูตรโบราณสำหรับเด็กและครอบครัว",
      desc: "ชวนคุณย่าคุณยายในชุมชนมาสอนลูกหลานปั้นขนมเต่าแดงมงคล เพื่อสืบทอดสูตรขนมเปอรานากันไม่ให้สูญหาย",
      author: "ครอบครัวสวาทยานนท์",
      category_th: "🍲 อาหาร & วัฒนธรรม",
      category_en: "🍲 Local Cuisine",
      votes: 18,
      status: "submitted"
    }
  ];

  for (const idea of initialIdeas) {
    insertIdea.run(idea);
  }
}

export function getLiveEvents() {
  return db.prepare('SELECT * FROM events ORDER BY id ASC').all();
}

export function getAllBookings() {
  return db.prepare(`
    SELECT b.*, e.title_th as event_title_th, e.title_en as event_title_en, (b.seats * e.price_thb) as total_amount
    FROM bookings b
    LEFT JOIN events e ON b.event_id = e.id
    ORDER BY b.id DESC
  `).all();
}

export function getCommunityIdeas() {
  return db.prepare('SELECT * FROM community_ideas ORDER BY votes DESC, id DESC').all();
}

export function createCommunityIdea(params: {
  title: string;
  desc: string;
  author: string;
  category_th: string;
  category_en: string;
}) {
  const { title, desc, author, category_th, category_en } = params;
  const result = db.prepare(`
    INSERT INTO community_ideas (title, desc, author, category_th, category_en, votes, status)
    VALUES (?, ?, ?, ?, ?, 0, 'submitted')
  `).run(title, desc, author, category_th, category_en);

  return db.prepare('SELECT * FROM community_ideas WHERE id = ?').get(result.lastInsertRowid);
}

export function toggleIdeaVote(ideaId: number, voterKey: string) {
  const transaction = db.transaction(() => {
    const existing = db.prepare('SELECT * FROM idea_votes WHERE idea_id = ? AND voter_key = ?').get(ideaId, voterKey);

    if (existing) {
      db.prepare('DELETE FROM idea_votes WHERE idea_id = ? AND voter_key = ?').run(ideaId, voterKey);
      db.prepare('UPDATE community_ideas SET votes = MAX(0, votes - 1) WHERE id = ?').run(ideaId);
      const updated = db.prepare('SELECT * FROM community_ideas WHERE id = ?').get(ideaId) as any;
      return { hasVoted: false, votes: updated.votes };
    } else {
      db.prepare('INSERT INTO idea_votes (idea_id, voter_key) VALUES (?, ?)').run(ideaId, voterKey);
      db.prepare('UPDATE community_ideas SET votes = votes + 1 WHERE id = ?').run(ideaId);
      const updated = db.prepare('SELECT * FROM community_ideas WHERE id = ?').get(ideaId) as any;
      return { hasVoted: true, votes: updated.votes };
    }
  });

  return transaction();
}

/**
 * ACID Concurrency Seat-Locking Transaction
 */
export async function createBookingWithSeatLock(params: {
  eventId: string;
  guestName: string;
  guestPhone: string;
  guestEmail?: string;
  seats: number;
  teaBlend?: string;
  pastryType?: string;
  status?: string;
}) {
  const { eventId, guestName, guestPhone, guestEmail, seats, teaBlend, pastryType, status } = params;

  // Generate unique ticket code
  const randomSuffix = Math.floor(1000 + Math.random() * 9000);
  const ticketCode = `DM-${eventId.toUpperCase()}-${randomSuffix}`;

  // Generate QR Code Data URL
  const qrData = JSON.stringify({
    ticketCode,
    eventId,
    guestName,
    guestPhone,
    seats,
    issuedAt: new Date().toISOString()
  });

  const qrDataUrl = await QRCode.toDataURL(qrData, {
    errorCorrectionLevel: 'H',
    margin: 2,
    color: {
      dark: '#122421',
      light: '#FAF7EE'
    },
    width: 320
  });

  const bookingStatus = status || (eventId.startsWith('e') ? 'confirmed' : 'pending');

  const executeTransaction = db.transaction(() => {
    const event = db.prepare('SELECT * FROM events WHERE id = ?').get(eventId) as any;

    if (!event) {
      throw new Error(`Event not found: ${eventId}`);
    }

    if (event.remaining_seats < seats && eventId.startsWith('e')) {
      throw new Error(`ที่นั่งเต็มแล้ว! ที่นั่งคงเหลือเพียง ${event.remaining_seats} ที่`);
    }

    // Decrement remaining seats atomically
    if (eventId.startsWith('e')) {
      db.prepare('UPDATE events SET remaining_seats = remaining_seats - ? WHERE id = ?').run(seats, eventId);
    }

    // Insert booking
    const result = db.prepare(`
      INSERT INTO bookings (
        ticket_code, event_id, guest_name, guest_phone, guest_email, seats, tea_blend, pastry_type, qr_data_url, status
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).run(
      ticketCode, eventId, guestName, guestPhone, guestEmail || null, seats, teaBlend || null, pastryType || null, qrDataUrl, bookingStatus
    );

    return {
      id: result.lastInsertRowid,
      ticketCode,
      eventId,
      eventTitle: event.title_th,
      guestName,
      guestPhone,
      guestEmail,
      seats,
      teaBlend,
      pastryType,
      qrDataUrl,
      status: bookingStatus,
      priceThb: event.price_thb * seats,
      createdAt: new Date().toISOString()
    };
  });

  return executeTransaction();
}

/**
 * Check-in Ticket at Reception Scanner
 */
export function verifyAndCheckInTicket(ticketCode: string) {
  const checkTransaction = db.transaction(() => {
    const booking = db.prepare(`
      SELECT b.*, e.title_th as event_title, e.date_label
      FROM bookings b
      LEFT JOIN events e ON b.event_id = e.id
      WHERE b.ticket_code = ?
    `).get(ticketCode) as any;

    if (!booking) {
      return { success: false, error: 'ไม่พบรหัสตั๋วในระบบ (Invalid Ticket Code)' };
    }

    if (booking.checked_in === 1) {
      return {
        success: false,
        alreadyCheckedIn: true,
        checkedInAt: booking.checked_in_at,
        booking
      };
    }

    const now = new Date().toISOString();
    db.prepare('UPDATE bookings SET checked_in = 1, checked_in_at = ? WHERE id = ?').run(now, booking.id);

    return {
      success: true,
      booking: {
        ...booking,
        checked_in: 1,
        checked_in_at: now
      }
    };
  });

  return checkTransaction();
}

/**
 * Update Booking Status (for Space Proposals & Admin)
 */
export function updateBookingStatus(ticketCode: string, status: string, adminNotes?: string) {
  const res = db.prepare(`
    UPDATE bookings
    SET status = ?, admin_notes = COALESCE(?, admin_notes)
    WHERE ticket_code = ?
  `).run(status, adminNotes || null, ticketCode);

  return res.changes > 0;
}

/**
 * Update Community Idea Status
 */
export function updateIdeaStatus(ideaId: number, status: string) {
  const res = db.prepare('UPDATE community_ideas SET status = ? WHERE id = ?').run(status, ideaId);
  return res.changes > 0;
}

export { db };
