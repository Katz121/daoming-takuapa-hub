import QRCode from 'qrcode';
import { INITIAL_IDEAS } from '@/data/ideas';
import { EVENTS_LIST } from '@/data/events';
import { EventItem } from '@/types';

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
  // DATABASE BACKUP & RESTORE UTILITIES
  // =========================================================================
  exportFullDatabase() {
    return {
      version: "2.0",
      exported_at: new Date().toISOString(),
      organization: "Dao Ming Foundation Takua Pa",
      bookings: this.getBookings(),
      ideas: this.getIdeas(),
      events: this.getEvents()
    };
  },

  importFullDatabase(jsonData: any): { success: boolean; message: string; count: { bookings: number; ideas: number; events: number } } {
    try {
      if (!jsonData || typeof jsonData !== 'object') {
        return { success: false, message: 'Invalid JSON format', count: { bookings: 0, ideas: 0, events: 0 } };
      }

      let bCount = 0;
      let iCount = 0;
      let eCount = 0;

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

      return {
        success: true,
        message: `ผสานข้อมูลสำเร็จ: นำเข้าตั๋ว/คำขอ ${bCount} รายการ, ไอเดีย ${iCount} ข้อเสนอ, กิจกรรม ${eCount} รายการ`,
        count: { bookings: bCount, ideas: iCount, events: eCount }
      };
    } catch (err: any) {
      return { success: false, message: err.message, count: { bookings: 0, ideas: 0, events: 0 } };
    }
  }
};
