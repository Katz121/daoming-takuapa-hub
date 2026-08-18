'use client';

import QRCode from 'qrcode';

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
  title: string;
  desc: string;
  author: string;
  category_th: string;
  category_en: string;
  category_zh?: string;
  votes: number;
  status: string;
  created_at: string;
}

const STORAGE_KEYS = {
  BOOKINGS: 'daoming_bookings_store_v1',
  IDEAS: 'daoming_ideas_store_v1',
  SEATS: 'daoming_seats_store_v1',
};

const DEFAULT_IDEAS: ClientIdea[] = [
  {
    id: 1,
    category_th: "🍲 อาหาร & วัฒนธรรมพื้นถิ่น",
    category_en: "🍲 Local Food & Culture",
    category_zh: "🍲 在地飲食與傳統文化",
    title: "คลาสสอนทำขนมเต้าส้อ & ขนมพริกโบราณ สูตรดั้งเดิม",
    desc: "อยากให้เชิญคุณป้าคุณยายในย่านเมืองเก่ามาถ่ายทอดสูตรทำแป้งขนมเต้าส้อไส้เค็ม-หวาน และเปิดให้ชิมสดๆ ร้อนๆ จากเตา",
    author: "นุ่น (ชาวตะกั่วป่า)",
    votes: 48,
    status: 'in_action',
    created_at: "2026-08-14 10:00:00"
  },
  {
    id: 2,
    category_th: "🎭 การแสดง & ดนตรี",
    category_en: "🎭 Performance & Music",
    category_zh: "🎭 藝文演出與星空音樂",
    title: "เทศกาลฉายหนังกลางแปลงสารคดีเหมืองแร่ & ดนตรีแจ๊สในสวน",
    desc: "จัดฉายหนังสารคดีประวัติศาสตร์เมืองแร่ใต้แสงจันทร์ พร้อมชวนวงดนตรีอะคูสติกคนรุ่นใหม่มาร่วมบรรเลงวันเสาร์สิ้นเดือน",
    author: "บาส สถาปนิกชุมชน",
    votes: 35,
    status: 'reviewing',
    created_at: "2026-08-12 18:30:00"
  },
  {
    id: 3,
    category_th: "📚 ประวัติศาสตร์ & การศึกษา",
    category_en: "📚 History & Education",
    category_zh: "📚 歷史溯源與青年走讀",
    title: "ทัวร์เดินเท้า 'ตามรอยโรงเรียนจีนและอั้งม่อเหลา' โดยมัคคุเทศก์น้อย",
    desc: "ฝึกเด็กๆ ในตะกั่วป่าเป็นนักเล่าเรื่อง พาเดินชมอาคารเต้าหมิง ศาลเจ้ากวนอู และบ้านขุนนิพัทธ์ฯ สัมผัสประวัติศาสตร์มีชีวิต",
    author: "ครูวิชัย ศิษย์เก่าเต้าหมิง",
    votes: 62,
    status: 'in_action',
    created_at: "2026-08-10 09:15:00"
  }
];

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
  getBookings(category?: 'event' | 'space'): ClientBooking[] {
    if (typeof window === 'undefined') return DEFAULT_BOOKINGS;
    try {
      const raw = localStorage.getItem(STORAGE_KEYS.BOOKINGS);
      let list: ClientBooking[] = raw ? JSON.parse(raw) : DEFAULT_BOOKINGS;
      if (!raw) {
        localStorage.setItem(STORAGE_KEYS.BOOKINGS, JSON.stringify(DEFAULT_BOOKINGS));
      }
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
    localStorage.setItem(STORAGE_KEYS.BOOKINGS, JSON.stringify(updated));
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
    localStorage.setItem(STORAGE_KEYS.BOOKINGS, JSON.stringify(list));
    return { success: true, data: item };
  },

  updateBookingStatus(id: string, status: string, adminNotes?: string): boolean {
    const list = this.getBookings();
    const idx = list.findIndex(b => b.id === id || b.ticket_code === id);
    if (idx === -1) return false;
    list[idx].status = status;
    if (adminNotes !== undefined) list[idx].admin_notes = adminNotes;
    localStorage.setItem(STORAGE_KEYS.BOOKINGS, JSON.stringify(list));
    return true;
  },

  getIdeas(): ClientIdea[] {
    if (typeof window === 'undefined') return DEFAULT_IDEAS;
    try {
      const raw = localStorage.getItem(STORAGE_KEYS.IDEAS);
      if (!raw) {
        localStorage.setItem(STORAGE_KEYS.IDEAS, JSON.stringify(DEFAULT_IDEAS));
        return DEFAULT_IDEAS;
      }
      return JSON.parse(raw);
    } catch {
      return DEFAULT_IDEAS;
    }
  },

  addIdea(idea: { title: string; desc: string; author: string; category_th: string; category_en: string }): ClientIdea {
    const list = this.getIdeas();
    const newId = list.length > 0 ? Math.max(...list.map(i => i.id)) + 1 : 1;
    const newIdea: ClientIdea = {
      id: newId,
      ...idea,
      votes: 1,
      status: 'submitted',
      created_at: new Date().toISOString().replace('T', ' ').substring(0, 19)
    };
    const updated = [newIdea, ...list];
    localStorage.setItem(STORAGE_KEYS.IDEAS, JSON.stringify(updated));
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

    localStorage.setItem(STORAGE_KEYS.IDEAS, JSON.stringify(list));
    return { votes: list[idx].votes, hasVoted: !alreadyVoted };
  },

  updateIdeaStatus(id: number, status: string): boolean {
    const list = this.getIdeas();
    const idx = list.findIndex(i => i.id === id);
    if (idx === -1) return false;
    list[idx].status = status;
    localStorage.setItem(STORAGE_KEYS.IDEAS, JSON.stringify(list));
    return true;
  }
};
