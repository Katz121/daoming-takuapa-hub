'use client';

import React, { useState, useEffect } from 'react';
import { clientDb, ClientBooking, ClientIdea } from '@/lib/clientDb';
import { EventItem } from '@/types';

type BookingRecord = ClientBooking;
type IdeaRecord = ClientIdea;

export default function AdminDashboardPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAuthChecked, setIsAuthChecked] = useState(false);
  const [passcode, setPasscode] = useState('');
  const [authError, setAuthError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const [activeTab, setActiveTab] = useState<'events' | 'tickets' | 'spaces' | 'ideas' | 'reports'>('events');
  const [events, setEvents] = useState<EventItem[]>([]);
  const [bookings, setBookings] = useState<BookingRecord[]>([]);
  const [spaceProposals, setSpaceProposals] = useState<BookingRecord[]>([]);
  const [ideas, setIdeas] = useState<IdeaRecord[]>([]);
  const [scanCode, setScanCode] = useState('');
  const [scanResult, setScanResult] = useState<any | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [feedbackMsg, setFeedbackMsg] = useState<string | null>(null);

  // Event modal form states
  const [isEventModalOpen, setIsEventModalOpen] = useState(false);
  const [editingEventId, setEditingEventId] = useState<string | null>(null);
  const [eventForm, setEventForm] = useState<Partial<EventItem>>({
    category: 'workshop',
    image: '/assets/event-tea.jpg',
    title_th: '',
    title_en: '',
    title_zh: '',
    tag_th: 'เวิร์กช็อปวัฒนธรรม',
    tag_en: 'Cultural Workshop',
    tag_zh: '文化工作坊',
    day_th: '24',
    month_th: 'ส.ค. 2569',
    day_en: '24',
    month_en: 'Aug 2026',
    time_th: '14:00 - 16:30 น.',
    time_en: '02:00 PM - 04:30 PM',
    loc_th: '📍 โซน D: Community Lounge & Veranda',
    loc_en: '📍 Zone D: Community Lounge',
    cap_th: '👥 รับ 16 ท่าน',
    cap_en: '👥 16 seats',
    price_th: '฿490 / ท่าน',
    price_en: '฿490 / pax',
    btnType: 'register',
    snippet_th: '',
    snippet_en: '',
    detailed_desc_th: '',
    detailed_desc_en: '',
    instructor_th: 'วิทยากรภูมิปัญญาท้องถิ่นเต้าหมิง',
    instructor_en: 'Heritage Master'
  });

  const showFeedback = (msg: string) => {
    setFeedbackMsg(msg);
    setTimeout(() => setFeedbackMsg(null), 4000);
  };

  const fetchAllData = () => {
    try {
      const eList = clientDb.getEvents();
      setEvents(eList);

      const bList = clientDb.getBookings('event');
      setBookings(bList);

      const sList = clientDb.getBookings('space');
      setSpaceProposals(sList);

      const iList = clientDb.getIdeas();
      setIdeas(iList);
    } catch {
      // ignore
    }
  };

  useEffect(() => {
    // Check existing session
    const savedAuth = typeof window !== 'undefined' ? sessionStorage.getItem('daoming_admin_auth') : null;
    if (savedAuth === 'true') {
      setIsAuthenticated(true);
      fetchAllData();
    }
    setIsAuthChecked(true);
  }, []);

  useEffect(() => {
    if (!isAuthenticated) return;
    const interval = setInterval(fetchAllData, 8000);
    return () => clearInterval(interval);
  }, [isAuthenticated]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanPass = passcode.trim().toLowerCase();
    const validCodes = ['daoming2026', 'daoming', '2465', '82110', 'admin1234'];

    if (validCodes.includes(cleanPass)) {
      if (typeof window !== 'undefined') {
        sessionStorage.setItem('daoming_admin_auth', 'true');
      }
      setIsAuthenticated(true);
      setAuthError('');
      fetchAllData();
    } else {
      setAuthError('รหัสผ่านไม่ถูกต้อง กรุณากรอกรหัสผ่านเจ้าหน้าที่ใหม่อีกครั้ง');
    }
  };

  const handleLogout = () => {
    if (typeof window !== 'undefined') {
      sessionStorage.removeItem('daoming_admin_auth');
    }
    setIsAuthenticated(false);
    setPasscode('');
    setAuthError('');
  };

  const handleOpenCreateEvent = () => {
    setEditingEventId(null);
    setEventForm({
      category: 'workshop',
      image: '/assets/event-tea.jpg',
      title_th: '',
      title_en: '',
      title_zh: '',
      tag_th: 'เวิร์กช็อปวัฒนธรรม',
      tag_en: 'Cultural Workshop',
      tag_zh: '文化工作坊',
      day_th: '24',
      month_th: 'ส.ค. 2569',
      day_en: '24',
      month_en: 'Aug 2026',
      time_th: '14:00 - 16:30 น.',
      time_en: '02:00 PM - 04:30 PM',
      loc_th: '📍 โซน D: Community Lounge & Veranda',
      loc_en: '📍 Zone D: Community Lounge',
      cap_th: '👥 รับ 16 ท่าน',
      cap_en: '👥 16 seats',
      price_th: '฿490 / ท่าน',
      price_en: '฿490 / pax',
      btnType: 'register',
      snippet_th: '',
      snippet_en: '',
      detailed_desc_th: '',
      detailed_desc_en: '',
      instructor_th: 'วิทยากรภูมิปัญญาท้องถิ่นเต้าหมิง',
      instructor_en: 'Heritage Master'
    });
    setIsEventModalOpen(true);
  };

  const handleOpenEditEvent = (ev: EventItem) => {
    setEditingEventId(ev.id);
    setEventForm({
      category: ev.category,
      image: ev.image,
      title_th: ev.title_th,
      title_en: ev.title_en,
      title_zh: ev.title_zh || '',
      tag_th: ev.tag_th,
      tag_en: ev.tag_en,
      tag_zh: ev.tag_zh || '',
      day_th: ev.day_th,
      month_th: ev.month_th,
      day_en: ev.day_en,
      month_en: ev.month_en,
      time_th: ev.time_th,
      time_en: ev.time_en,
      loc_th: ev.loc_th,
      loc_en: ev.loc_en,
      cap_th: ev.cap_th,
      cap_en: ev.cap_en,
      price_th: ev.price_th,
      price_en: ev.price_en,
      btnType: ev.btnType,
      snippet_th: ev.snippet_th,
      snippet_en: ev.snippet_en,
      detailed_desc_th: ev.detailed_desc_th || ev.snippet_th,
      detailed_desc_en: ev.detailed_desc_en || ev.snippet_en,
      instructor_th: ev.instructor_th || 'วิทยากรภูมิปัญญาท้องถิ่นเต้าหมิง',
      instructor_en: ev.instructor_en || 'Heritage Master'
    });
    setIsEventModalOpen(true);
  };

  const handleSaveEvent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!eventForm.title_th?.trim()) {
      alert('กรุณากรอกชื่อกิจกรรม (ภาษาไทย)');
      return;
    }

    try {
      if (editingEventId) {
        clientDb.updateEvent(editingEventId, eventForm);
        showFeedback(`แก้ไขกิจกรรม "${eventForm.title_th}" สำเร็จ`);
      } else {
        clientDb.createEvent(eventForm);
        showFeedback(`เพิ่มกิจกรรมใหม่ "${eventForm.title_th}" สำเร็จ`);
      }
      setIsEventModalOpen(false);
      fetchAllData();
    } catch (err: any) {
      showFeedback(`เกิดข้อผิดพลาด: ${err.message}`);
    }
  };

  const handleDeleteEvent = (id: string, title: string) => {
    if (confirm(`คุณต้องการลบกิจกรรม "${title}" ใช่หรือไม่?\nการลบจะมีผลกับหน้าเว็บหลักทันที`)) {
      clientDb.deleteEvent(id);
      showFeedback(`ลบกิจกรรม "${title}" เรียบร้อยแล้ว`);
      fetchAllData();
    }
  };

  const handleResetEvents = () => {
    if (confirm('คุณต้องการคืนค่ากิจกรรมเริ่มต้นทั้งหมดใช่หรือไม่? (กิจกรรมที่คุณเพิ่มเองจะถูกรีเซ็ต)')) {
      clientDb.resetEvents();
      showFeedback('คืนค่ารายการกิจกรรมและเวิร์กช็อปเริ่มต้นเรียบร้อยแล้ว');
      fetchAllData();
    }
  };

  const handleVerifyTicket = (e: React.FormEvent) => {
    e.preventDefault();
    if (!scanCode.trim()) return;

    setIsLoading(true);
    try {
      const result = clientDb.checkInTicket(scanCode.trim());
      setScanResult(result);
      fetchAllData();
    } catch (err: any) {
      setScanResult({ success: false, message: err.message });
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdateBookingStatus = (ticketCode: string, newStatus: string) => {
    try {
      const success = clientDb.updateBookingStatus(ticketCode, newStatus);
      if (success) {
        showFeedback(`ปรับสถานะคำขอ ${ticketCode} เป็น ${newStatus} สำเร็จ`);
        fetchAllData();
      }
    } catch (err: any) {
      showFeedback(`Error: ${err.message}`);
    }
  };

  const handleUpdateIdeaStatus = (ideaId: number, newStatus: string) => {
    try {
      const success = clientDb.updateIdeaStatus(ideaId, newStatus);
      if (success) {
        showFeedback(`ปรับสถานะไอเดีย #${ideaId} สำเร็จ`);
        fetchAllData();
      }
    } catch (err: any) {
      showFeedback(`Error: ${err.message}`);
    }
  };

  const handleExportCSV = () => {
    const rows = [
      ['รหัสตั๋ว', 'ชื่อผู้จอง', 'เบอร์โทร', 'อีเมล', 'กิจกรรม/พื้นที่', 'จำนวนที่นั่ง', 'สถานะ', 'Check-in'],
      ...bookings.map(b => [
        b.ticket_code,
        b.guest_name,
        b.guest_phone,
        b.guest_email || '',
        b.event_title || b.event_id,
        b.seats.toString(),
        b.status,
        b.checked_in === 1 ? 'Yes' : 'No'
      ]),
      ...spaceProposals.map(s => [
        s.ticket_code,
        s.guest_name,
        s.guest_phone,
        s.guest_email || '',
        s.event_title || s.event_id,
        s.seats.toString(),
        s.status,
        s.checked_in === 1 ? 'Yes' : 'No'
      ])
    ];

    const csvContent = "data:text/csv;charset=utf-8,\uFEFF" + rows.map(e => e.join(",")).join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `daoming_report_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showFeedback("ดาวน์โหลดรายงานสรุป CSV เรียบร้อยแล้ว");
  };

  const handleExportJSON = () => {
    const backupData = clientDb.exportFullDatabase();
    const jsonStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(backupData, null, 2));
    const link = document.createElement("a");
    link.setAttribute("href", jsonStr);
    link.setAttribute("download", `daoming_master_backup_${new Date().toISOString().slice(0, 10)}.json`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showFeedback("ดาวน์โหลดไฟล์สำรองฐานข้อมูล Master JSON เรียบร้อยแล้ว");
  };

  const handleImportJSON = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (evt) => {
      try {
        const parsed = JSON.parse(evt.target?.result as string);
        const result = clientDb.importFullDatabase(parsed);
        if (result.success) {
          showFeedback(result.message);
          fetchAllData();
        } else {
          alert('เกิดข้อผิดพลาดในการนำเข้า: ' + result.message);
        }
      } catch (err: any) {
        alert('ไฟล์ JSON ไม่ถูกต้อง: ' + err.message);
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  if (!isAuthChecked) {
    return (
      <div style={{ minHeight: '100vh', backgroundColor: '#0D1A18', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#E5A31E' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '2.5rem', marginBottom: '12px' }}>🏛️</div>
          <p style={{ fontFamily: 'monospace', fontSize: '0.9rem', color: '#FAF2DD' }}>กำลังตรวจสอบสิทธิ์...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div style={{ minHeight: '100vh', backgroundColor: '#0D1A18', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px 16px', fontFamily: 'var(--font-sans, system-ui, sans-serif)' }}>
        <div style={{ width: '100%', maxWidth: '440px', backgroundColor: '#132422', border: '1.5px solid rgba(229, 163, 30, 0.4)', borderRadius: '20px', padding: '36px 28px', boxShadow: '0 25px 60px rgba(0, 0, 0, 0.6), 0 0 30px rgba(229, 163, 30, 0.15)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px' }}>
          
          <img
            src="/assets/logo-305.jpg"
            alt="ตราสัญลักษณ์เต้าหมิง"
            style={{ width: '72px', height: '72px', borderRadius: '50%', border: '3px solid #E5A31E', boxShadow: '0 0 20px rgba(229, 163, 30, 0.3)' }}
          />

          <div style={{ textAlign: 'center' }}>
            <span style={{ fontSize: '0.72rem', fontFamily: 'monospace', fontWeight: 'bold', color: '#E5A31E', letterSpacing: '1px', textTransform: 'uppercase' }}>
              🔒 DAO MING FOUNDATION · ADMIN ACCESS
            </span>
            <h2 style={{ fontSize: '1.35rem', fontWeight: 'bold', color: '#FFFFFF', margin: '6px 0 4px 0' }}>
              ระบบจัดการหลังบ้านเต้าหมิง
            </h2>
            <p style={{ fontSize: '0.82rem', color: 'rgba(250, 242, 221, 0.7)', margin: 0, lineHeight: 1.4 }}>
              กรุณากรอกรหัสผ่านเจ้าหน้าที่เพื่อเข้าถึงข้อมูลการจองและคำขอพื้นที่
            </p>
          </div>

          {authError && (
            <div style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', backgroundColor: 'rgba(239, 68, 68, 0.15)', border: '1px solid rgba(239, 68, 68, 0.5)', color: '#FCA5A5', fontSize: '0.82rem', textAlign: 'center', fontWeight: '600' }}>
              ⚠️ {authError}
            </div>
          )}

          <form onSubmit={handleLogin} style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <label style={{ fontSize: '0.78rem', fontWeight: 'bold', color: '#E5A31E' }}>
                รหัสผ่าน / Staff Passcode
              </label>
              <div style={{ position: 'relative' }}>
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="กรอกรหัสผ่าน (เช่น daoming2026 หรือ 2465)"
                  value={passcode}
                  onChange={(e) => {
                    setPasscode(e.target.value);
                    if (authError) setAuthError('');
                  }}
                  autoFocus
                  style={{
                    width: '100%',
                    padding: '12px 42px 12px 14px',
                    borderRadius: '10px',
                    backgroundColor: 'rgba(255, 255, 255, 0.06)',
                    border: '1.5px solid rgba(229, 163, 30, 0.35)',
                    color: '#FFFFFF',
                    fontSize: '0.95rem',
                    outline: 'none',
                    transition: 'all 0.2s ease',
                    boxSizing: 'border-box'
                  }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{
                    position: 'absolute',
                    right: '12px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    fontSize: '1rem',
                    color: 'rgba(250, 242, 221, 0.6)',
                    padding: '4px'
                  }}
                  title={showPassword ? "ซ่อนรหัสผ่าน" : "แสดงรหัสผ่าน"}
                >
                  {showPassword ? "🙈" : "👁️"}
                </button>
              </div>
              <span style={{ fontSize: '0.7rem', color: 'rgba(250, 242, 221, 0.45)', marginTop: '2px' }}>
                * รหัสเริ่มต้นของมูลนิธิ: <code style={{ color: '#E5A31E' }}>daoming2026</code> หรือ <code style={{ color: '#E5A31E' }}>2465</code>
              </span>
            </div>

            <button
              type="submit"
              style={{
                width: '100%',
                padding: '12px',
                borderRadius: '10px',
                backgroundColor: '#E5A31E',
                color: '#122421',
                fontWeight: 'bold',
                fontSize: '0.95rem',
                border: 'none',
                cursor: 'pointer',
                boxShadow: '0 4px 15px rgba(229, 163, 30, 0.35)',
                transition: 'all 0.2s ease'
              }}
            >
              🔓 เข้าสู่ระบบ (Log in)
            </button>
          </form>

          <div style={{ width: '100%', borderTop: '1px solid rgba(255, 255, 255, 0.08)', paddingTop: '16px', textAlign: 'center' }}>
            <a
              href="/"
              style={{ fontSize: '0.8rem', color: 'rgba(250, 242, 221, 0.6)', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '6px' }}
            >
              ← กลับสู่หน้าหลักเว็บไซต์เต้าหมิง
            </a>
          </div>
        </div>
      </div>
    );
  }

  const checkedInCount = bookings.filter(b => b.checked_in === 1).length;
  const pendingProposalsCount = spaceProposals.filter(p => p.status === 'pending').length;

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#0D1A18', color: '#FAF2DD', fontFamily: 'var(--font-sans, system-ui, sans-serif)', padding: '24px 16px' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '24px' }}>
        
        {/* Top Header Bar */}
        <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px', paddingBottom: '20px', borderBottom: '1px solid rgba(229, 163, 30, 0.2)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <img src="/assets/logo-305.jpg" alt="Logo" style={{ width: '48px', height: '48px', borderRadius: '50%', border: '2px solid #E5A31E' }} />
            <div>
              <div style={{ fontSize: '0.72rem', fontFamily: 'monospace', fontWeight: 'bold', color: '#E5A31E', textTransform: 'uppercase', letterSpacing: '1px' }}>
                🏛️ DAO MING FOUNDATION · BACKOFFICE PORTAL
              </div>
              <h1 style={{ fontSize: '1.4rem', fontWeight: 'bold', margin: '2px 0 0 0', color: '#FFFFFF' }}>
                ระบบบริหารจัดการมูลนิธิโรงเรียนเต้าหมิง ตะกั่วป่า
              </h1>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
            <a
              href="/"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '8px 16px',
                borderRadius: '8px',
                backgroundColor: 'rgba(255, 255, 255, 0.08)',
                color: '#FAF2DD',
                fontSize: '0.8rem',
                fontWeight: '600',
                textDecoration: 'none',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                transition: 'all 0.2s ease'
              }}
            >
              ← กลับสู่หน้าเว็บหลัก
            </a>
            <button
              onClick={fetchAllData}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '8px 16px',
                borderRadius: '8px',
                backgroundColor: '#E5A31E',
                color: '#122421',
                fontSize: '0.8rem',
                fontWeight: 'bold',
                border: 'none',
                cursor: 'pointer'
              }}
            >
              🔄 รีเฟรชข้อมูล
            </button>
            <button
              onClick={handleLogout}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '8px 14px',
                borderRadius: '8px',
                backgroundColor: 'rgba(239, 68, 68, 0.15)',
                color: '#FCA5A5',
                fontSize: '0.8rem',
                fontWeight: 'bold',
                border: '1px solid rgba(239, 68, 68, 0.4)',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
              title="ออกจากระบบผู้ดูแล"
            >
              🚪 ออกจากระบบ
            </button>
          </div>
        </header>

        {/* Feedback Alert Toast */}
        {feedbackMsg && (
          <div style={{ padding: '12px 18px', borderRadius: '10px', backgroundColor: 'rgba(229, 163, 30, 0.15)', border: '1px solid #E5A31E', color: '#E5A31E', fontSize: '0.85rem', fontWeight: 'bold' }}>
            ✓ {feedbackMsg}
          </div>
        )}

        {/* Live Metric Cards Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
          <div style={{ backgroundColor: 'rgba(255, 255, 255, 0.04)', border: '1px solid rgba(229, 163, 30, 0.3)', borderRadius: '14px', padding: '18px' }}>
            <span style={{ fontSize: '0.75rem', color: 'rgba(250, 242, 221, 0.6)', display: 'block', marginBottom: '4px' }}>📅 กิจกรรม & เวิร์กช็อป</span>
            <div style={{ fontSize: '1.8rem', fontWeight: 'bold', color: '#E5A31E', fontFamily: 'monospace' }}>
              {events.length} <span style={{ fontSize: '0.85rem', fontWeight: 'normal', color: 'rgba(250, 242, 221, 0.5)' }}>รายการ</span>
            </div>
          </div>

          <div style={{ backgroundColor: 'rgba(255, 255, 255, 0.04)', border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '14px', padding: '18px' }}>
            <span style={{ fontSize: '0.75rem', color: 'rgba(250, 242, 221, 0.6)', display: 'block', marginBottom: '4px' }}>🎟️ ตั๋วกิจกรรมทั้งหมด</span>
            <div style={{ fontSize: '1.8rem', fontWeight: 'bold', color: '#FCD34D', fontFamily: 'monospace' }}>
              {bookings.length} <span style={{ fontSize: '0.85rem', fontWeight: 'normal', color: 'rgba(250, 242, 221, 0.5)' }}>รายการ</span>
            </div>
          </div>

          <div style={{ backgroundColor: 'rgba(255, 255, 255, 0.04)', border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '14px', padding: '18px' }}>
            <span style={{ fontSize: '0.75rem', color: 'rgba(250, 242, 221, 0.6)', display: 'block', marginBottom: '4px' }}>✅ Check-in หน้างานแล้ว</span>
            <div style={{ fontSize: '1.8rem', fontWeight: 'bold', color: '#34D399', fontFamily: 'monospace' }}>
              {checkedInCount} <span style={{ fontSize: '0.85rem', fontWeight: 'normal', color: 'rgba(250, 242, 221, 0.5)' }}>/ {bookings.length} ท่าน</span>
            </div>
          </div>

          <div style={{ backgroundColor: 'rgba(255, 255, 255, 0.04)', border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '14px', padding: '18px' }}>
            <span style={{ fontSize: '0.75rem', color: 'rgba(250, 242, 221, 0.6)', display: 'block', marginBottom: '4px' }}>🏛️ คำขอใช้พื้นที่</span>
            <div style={{ fontSize: '1.8rem', fontWeight: 'bold', color: '#C44D27', fontFamily: 'monospace' }}>
              {pendingProposalsCount} <span style={{ fontSize: '0.85rem', fontWeight: 'normal', color: 'rgba(250, 242, 221, 0.5)' }}>/ {spaceProposals.length} คำขอ</span>
            </div>
          </div>

          <div style={{ backgroundColor: 'rgba(255, 255, 255, 0.04)', border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '14px', padding: '18px' }}>
            <span style={{ fontSize: '0.75rem', color: 'rgba(250, 242, 221, 0.6)', display: 'block', marginBottom: '4px' }}>💡 ไอเดียจากชุมชน</span>
            <div style={{ fontSize: '1.8rem', fontWeight: 'bold', color: '#38BDF8', fontFamily: 'monospace' }}>
              {ideas.length} <span style={{ fontSize: '0.85rem', fontWeight: 'normal', color: 'rgba(250, 242, 221, 0.5)' }}>ข้อเสนอ</span>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div style={{ display: 'flex', gap: '8px', borderBottom: '1px solid rgba(255, 255, 255, 0.12)', paddingBottom: '8px', overflowX: 'auto' }}>
          <button
            style={{
              padding: '10px 18px',
              borderRadius: '10px',
              border: 'none',
              fontSize: '0.82rem',
              fontWeight: 'bold',
              cursor: 'pointer',
              whiteSpace: 'nowrap',
              backgroundColor: activeTab === 'events' ? '#E5A31E' : 'rgba(255, 255, 255, 0.06)',
              color: activeTab === 'events' ? '#122421' : '#FAF2DD',
              transition: 'all 0.2s ease'
            }}
            onClick={() => setActiveTab('events')}
          >
            📅 จัดการกิจกรรม & เวิร์กช็อป ({events.length})
          </button>
          <button
            style={{
              padding: '10px 18px',
              borderRadius: '10px',
              border: 'none',
              fontSize: '0.82rem',
              fontWeight: 'bold',
              cursor: 'pointer',
              whiteSpace: 'nowrap',
              backgroundColor: activeTab === 'tickets' ? '#E5A31E' : 'rgba(255, 255, 255, 0.06)',
              color: activeTab === 'tickets' ? '#122421' : '#FAF2DD',
              transition: 'all 0.2s ease'
            }}
            onClick={() => setActiveTab('tickets')}
          >
            🎫 สแกนตั๋ว & รายชื่อกิจกรรม ({bookings.length})
          </button>
          <button
            style={{
              padding: '10px 18px',
              borderRadius: '10px',
              border: 'none',
              fontSize: '0.82rem',
              fontWeight: 'bold',
              cursor: 'pointer',
              whiteSpace: 'nowrap',
              backgroundColor: activeTab === 'spaces' ? '#E5A31E' : 'rgba(255, 255, 255, 0.06)',
              color: activeTab === 'spaces' ? '#122421' : '#FAF2DD',
              transition: 'all 0.2s ease'
            }}
            onClick={() => setActiveTab('spaces')}
          >
            🏛️ คำขอจองพื้นที่ & อนุมัติ ({spaceProposals.length})
          </button>
          <button
            style={{
              padding: '10px 18px',
              borderRadius: '10px',
              border: 'none',
              fontSize: '0.82rem',
              fontWeight: 'bold',
              cursor: 'pointer',
              whiteSpace: 'nowrap',
              backgroundColor: activeTab === 'ideas' ? '#E5A31E' : 'rgba(255, 255, 255, 0.06)',
              color: activeTab === 'ideas' ? '#122421' : '#FAF2DD',
              transition: 'all 0.2s ease'
            }}
            onClick={() => setActiveTab('ideas')}
          >
            💡 กระดานไอเดียชุมชน ({ideas.length})
          </button>
          <button
            style={{
              padding: '10px 18px',
              borderRadius: '10px',
              border: 'none',
              fontSize: '0.82rem',
              fontWeight: 'bold',
              cursor: 'pointer',
              whiteSpace: 'nowrap',
              backgroundColor: activeTab === 'reports' ? '#E5A31E' : 'rgba(255, 255, 255, 0.06)',
              color: activeTab === 'reports' ? '#122421' : '#FAF2DD',
              transition: 'all 0.2s ease'
            }}
            onClick={() => setActiveTab('reports')}
          >
            📊 สถิติ & ส่งออกรายงาน
          </button>
        </div>

        {/* TAB 0: EVENTS & WORKSHOPS MANAGEMENT */}
        {activeTab === 'events' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '14px', backgroundColor: 'rgba(255, 255, 255, 0.03)', border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: '16px', padding: '18px 24px' }}>
              <div>
                <h2 style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#E5A31E', margin: '0 0 4px 0' }}>
                  📅 จัดการปฏิทินกิจกรรม & เวิร์กช็อป (Events Management)
                </h2>
                <p style={{ fontSize: '0.82rem', color: 'rgba(250, 242, 221, 0.7)', margin: 0 }}>
                  คุณสามารถเพิ่ม แก้ไข หรือลบกิจกรรมและเวิร์กช็อปได้โดยตรง ข้อมูลจะอัปเดตบนหน้าเว็บหลักทันทีโดยไม่ต้อง Deploy code
                </p>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
                <button
                  onClick={handleResetEvents}
                  style={{
                    padding: '9px 16px',
                    borderRadius: '8px',
                    backgroundColor: 'rgba(255, 255, 255, 0.06)',
                    border: '1px solid rgba(255, 255, 255, 0.15)',
                    color: '#FAF2DD',
                    fontSize: '0.8rem',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease'
                  }}
                  title="คืนค่ารายการกิจกรรมเริ่มต้น"
                >
                  🔄 คืนค่าเริ่มต้น
                </button>

                <button
                  onClick={handleOpenCreateEvent}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '10px 20px',
                    borderRadius: '10px',
                    backgroundColor: '#E5A31E',
                    color: '#122421',
                    fontSize: '0.85rem',
                    fontWeight: 'bold',
                    border: 'none',
                    cursor: 'pointer',
                    boxShadow: '0 4px 15px rgba(229, 163, 30, 0.35)',
                    transition: 'all 0.2s ease'
                  }}
                >
                  ➕ เพิ่มกิจกรรมใหม่
                </button>
              </div>
            </div>

            {/* Events Grid in Admin */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '16px' }}>
              {events.map(ev => {
                const categoryColor = ev.category === 'workshop'
                  ? '#FEF3C7'
                  : ev.category === 'exhibition'
                  ? '#E0E7FF'
                  : ev.category === 'market'
                  ? '#DCFCE7'
                  : '#FCE7F3';

                const categoryTextColor = ev.category === 'workshop'
                  ? '#92400E'
                  : ev.category === 'exhibition'
                  ? '#3730A3'
                  : ev.category === 'market'
                  ? '#166534'
                  : '#9D174D';

                return (
                  <div
                    key={ev.id}
                    style={{
                      backgroundColor: 'rgba(255, 255, 255, 0.04)',
                      border: '1.5px solid rgba(229, 163, 30, 0.25)',
                      borderRadius: '14px',
                      overflow: 'hidden',
                      display: 'flex',
                      flexDirection: 'column',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    {/* Header Image with Tag */}
                    <div style={{ position: 'relative', height: '140px', width: '100%', backgroundColor: '#1A2826' }}>
                      <img
                        src={ev.image}
                        alt={ev.title_th}
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      />
                      <span
                        style={{
                          position: 'absolute',
                          top: '10px',
                          right: '10px',
                          backgroundColor: categoryColor,
                          color: categoryTextColor,
                          fontSize: '0.7rem',
                          fontWeight: 'bold',
                          padding: '3px 8px',
                          borderRadius: '20px',
                          boxShadow: '0 2px 6px rgba(0, 0, 0, 0.3)'
                        }}
                      >
                        {ev.tag_th}
                      </span>
                      <span
                        style={{
                          position: 'absolute',
                          bottom: '8px',
                          left: '10px',
                          backgroundColor: 'rgba(15, 30, 28, 0.85)',
                          color: '#E5A31E',
                          fontSize: '0.72rem',
                          fontFamily: 'monospace',
                          fontWeight: 'bold',
                          padding: '3px 8px',
                          borderRadius: '6px',
                          border: '1px solid rgba(229, 163, 30, 0.4)'
                        }}
                      >
                        📅 {ev.day_th} {ev.month_th}
                      </span>
                    </div>

                    {/* Card Body */}
                    <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', flex: 1, gap: '10px' }}>
                      <h3 style={{ fontSize: '1rem', fontWeight: 'bold', color: '#FFFFFF', margin: 0, lineHeight: 1.35 }}>
                        {ev.title_th}
                      </h3>

                      <p style={{ fontSize: '0.78rem', color: 'rgba(250, 242, 221, 0.7)', margin: 0, lineHeight: 1.45, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                        {ev.snippet_th}
                      </p>

                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', fontSize: '0.72rem', color: 'rgba(250, 242, 221, 0.85)', backgroundColor: 'rgba(255, 255, 255, 0.04)', padding: '6px 10px', borderRadius: '6px' }}>
                        <span>{ev.loc_th}</span>
                        <span>·</span>
                        <span>{ev.time_th}</span>
                        <span>·</span>
                        <span style={{ color: '#34D399', fontWeight: 'bold' }}>{ev.price_th}</span>
                      </div>

                      {/* Card Footer Actions */}
                      <div style={{ marginTop: 'auto', paddingTop: '12px', borderTop: '1px solid rgba(255, 255, 255, 0.08)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{ fontSize: '0.72rem', color: 'rgba(250, 242, 221, 0.5)', fontFamily: 'monospace' }}>
                          ID: {ev.id}
                        </span>

                        <div style={{ display: 'flex', gap: '8px' }}>
                          <button
                            onClick={() => handleOpenEditEvent(ev)}
                            style={{
                              padding: '6px 12px',
                              borderRadius: '6px',
                              backgroundColor: 'rgba(229, 163, 30, 0.15)',
                              border: '1px solid rgba(229, 163, 30, 0.4)',
                              color: '#E5A31E',
                              fontSize: '0.75rem',
                              fontWeight: 'bold',
                              cursor: 'pointer',
                              transition: 'all 0.2s ease'
                            }}
                          >
                            ✏️ แก้ไข
                          </button>
                          <button
                            onClick={() => handleDeleteEvent(ev.id, ev.title_th)}
                            style={{
                              padding: '6px 12px',
                              borderRadius: '6px',
                              backgroundColor: 'rgba(239, 68, 68, 0.12)',
                              border: '1px solid rgba(239, 68, 68, 0.35)',
                              color: '#FCA5A5',
                              fontSize: '0.75rem',
                              fontWeight: 'bold',
                              cursor: 'pointer',
                              transition: 'all 0.2s ease'
                            }}
                          >
                            🗑️ ลบ
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* TAB 1: TICKETS & SCANNER */}
        {activeTab === 'tickets' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {/* Scanner Verification Box */}
            <div style={{ backgroundColor: 'rgba(229, 163, 30, 0.06)', border: '2px solid rgba(229, 163, 30, 0.35)', borderRadius: '18px', padding: '24px' }}>
              <div style={{ marginBottom: '16px' }}>
                <h2 style={{ fontSize: '1.15rem', fontWeight: 'bold', color: '#E5A31E', margin: '0 0 4px 0' }}>
                  สแกน QR Code หรือกรอกรหัสตั๋วหน้างาน (Ticket Verification)
                </h2>
                <p style={{ fontSize: '0.8rem', color: 'rgba(250, 242, 221, 0.7)', margin: 0 }}>
                  กรอกรหัส Ticket Code ที่ปรากฏบนบัตร เช่น <code style={{ color: '#E5A31E', fontFamily: 'monospace' }}>DM-E1-xxxx</code> เพื่อตรวจสอบความถูกต้องและเช็กอินทันที
                </p>
              </div>

              <form onSubmit={handleVerifyTicket} style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                <input
                  type="text"
                  placeholder="กรอกรหัสตั๋ว เช่น DM-E1-8942"
                  value={scanCode}
                  onChange={e => setScanCode(e.target.value)}
                  style={{
                    flex: '1',
                    minWidth: '240px',
                    padding: '12px 16px',
                    borderRadius: '10px',
                    backgroundColor: 'rgba(255, 255, 255, 0.06)',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    color: '#FFF',
                    fontSize: '0.9rem',
                    fontFamily: 'monospace',
                    outline: 'none'
                  }}
                />
                <button
                  type="submit"
                  disabled={isLoading}
                  style={{
                    padding: '12px 24px',
                    borderRadius: '10px',
                    backgroundColor: '#C44D27',
                    color: '#FFF',
                    fontSize: '0.82rem',
                    fontWeight: 'bold',
                    border: 'none',
                    cursor: 'pointer'
                  }}
                >
                  {isLoading ? '⏳ กำลังตรวจสอบ...' : '🔍 ตรวจสอบ & เช็กอินเข้างาน'}
                </button>
              </form>

              {/* Scan Result Box */}
              {scanResult && (
                <div
                  style={{
                    marginTop: '16px',
                    padding: '16px',
                    borderRadius: '12px',
                    backgroundColor: scanResult.success ? 'rgba(52, 211, 153, 0.15)' : 'rgba(244, 63, 94, 0.15)',
                    border: `1px solid ${scanResult.success ? '#34D399' : '#F43F5E'}`,
                    color: scanResult.success ? '#A7F3D0' : '#FECDD3'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span style={{ fontSize: '1.5rem' }}>{scanResult.success ? '✅' : '❌'}</span>
                    <div>
                      <h4 style={{ margin: '0 0 4px 0', fontSize: '0.95rem', fontWeight: 'bold' }}>
                        {scanResult.message || (scanResult.success ? 'ตั๋วถูกต้อง เช็กอินสำเร็จ!' : 'ไม่พบข้อมูลตั๋ว')}
                      </h4>
                      {scanResult.booking && (
                        <div style={{ fontSize: '0.8rem', fontFamily: 'monospace' }}>
                          <p style={{ margin: 0 }}>ผู้ถือตั๋ว: <strong>{scanResult.booking.guest_name}</strong> ({scanResult.booking.guest_phone})</p>
                          <p style={{ margin: 0 }}>เซ็ต: {scanResult.booking.tea_blend} + {scanResult.booking.pastry_type}</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Guest Roster Table */}
            <div style={{ backgroundColor: 'rgba(255, 255, 255, 0.03)', border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '18px', padding: '20px', overflow: 'hidden' }}>
              <h2 style={{ fontSize: '1.1rem', fontWeight: 'bold', color: '#FFF', margin: '0 0 16px 0' }}>
                รายชื่อผู้สำรองที่นั่งกิจกรรมทั้งหมด ({bookings.length} รายการ)
              </h2>

              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.82rem' }}>
                  <thead>
                    <tr style={{ backgroundColor: 'rgba(255, 255, 255, 0.06)', borderBottom: '1px solid rgba(255, 255, 255, 0.15)', color: 'rgba(250, 242, 221, 0.7)', textTransform: 'uppercase', fontSize: '0.72rem', fontFamily: 'monospace' }}>
                      <th style={{ padding: '12px' }}>รหัสตั๋ว</th>
                      <th style={{ padding: '12px' }}>ชื่อผู้จอง</th>
                      <th style={{ padding: '12px' }}>เบอร์โทร</th>
                      <th style={{ padding: '12px' }}>กิจกรรม</th>
                      <th style={{ padding: '12px' }}>ชา & ขนม</th>
                      <th style={{ padding: '12px' }}>สถานะ Check-in</th>
                    </tr>
                  </thead>
                  <tbody>
                    {bookings.length === 0 ? (
                      <tr>
                        <td colSpan={6} style={{ padding: '24px', textAlign: 'center', color: 'rgba(250, 242, 221, 0.4)' }}>
                          ยังไม่มีรายการจองกิจกรรมในระบบ
                        </td>
                      </tr>
                    ) : (
                      bookings.map(b => (
                        <tr key={b.id} style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.05)' }}>
                          <td style={{ padding: '12px', fontFamily: 'monospace', fontWeight: 'bold', color: '#E5A31E' }}>{b.ticket_code}</td>
                          <td style={{ padding: '12px', fontWeight: '600', color: '#FFF' }}>{b.guest_name}</td>
                          <td style={{ padding: '12px', fontFamily: 'monospace', color: 'rgba(250, 242, 221, 0.8)' }}>{b.guest_phone}</td>
                          <td style={{ padding: '12px', color: 'rgba(250, 242, 221, 0.9)' }}>{b.event_title || b.event_id}</td>
                          <td style={{ padding: '12px', color: 'rgba(250, 242, 221, 0.6)' }}>{b.tea_blend ? `${b.tea_blend} + ${b.pastry_type}` : '-'}</td>
                          <td style={{ padding: '12px' }}>
                            <span
                              style={{
                                padding: '4px 10px',
                                borderRadius: '999px',
                                fontSize: '0.72rem',
                                fontWeight: 'bold',
                                fontFamily: 'monospace',
                                backgroundColor: b.checked_in === 1 ? 'rgba(52, 211, 153, 0.2)' : 'rgba(245, 158, 11, 0.2)',
                                color: b.checked_in === 1 ? '#34D399' : '#FBBF24',
                                border: `1px solid ${b.checked_in === 1 ? 'rgba(52, 211, 153, 0.4)' : 'rgba(245, 158, 11, 0.4)'}`
                              }}
                            >
                              {b.checked_in === 1 ? '✓ CHECKED-IN' : '⏳ PENDING'}
                            </span>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: SPACE PROPOSALS & APPROVALS */}
        {activeTab === 'spaces' && (
          <div style={{ backgroundColor: 'rgba(255, 255, 255, 0.03)', border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '18px', padding: '20px', overflow: 'hidden' }}>
            <h2 style={{ fontSize: '1.1rem', fontWeight: 'bold', color: '#FFF', margin: '0 0 16px 0' }}>
              คำขอจองใช้พื้นที่จัดกิจกรรม / แสดงงาน ({spaceProposals.length} คำขอ)
            </h2>

            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.82rem' }}>
                <thead>
                  <tr style={{ backgroundColor: 'rgba(255, 255, 255, 0.06)', borderBottom: '1px solid rgba(255, 255, 255, 0.15)', color: 'rgba(250, 242, 221, 0.7)', textTransform: 'uppercase', fontSize: '0.72rem', fontFamily: 'monospace' }}>
                    <th style={{ padding: '12px' }}>รหัสคำขอ</th>
                    <th style={{ padding: '12px' }}>ผู้ติดต่อ / องค์กร</th>
                    <th style={{ padding: '12px' }}>เบอร์โทร & อีเมล</th>
                    <th style={{ padding: '12px' }}>โซนพื้นที่</th>
                    <th style={{ padding: '12px' }}>รายละเอียดกิจกรรม</th>
                    <th style={{ padding: '12px' }}>สถานะ</th>
                    <th style={{ padding: '12px', textAlign: 'center' }}>จัดการคำขอ</th>
                  </tr>
                </thead>
                <tbody>
                  {spaceProposals.length === 0 ? (
                    <tr>
                      <td colSpan={7} style={{ padding: '24px', textAlign: 'center', color: 'rgba(250, 242, 221, 0.4)' }}>
                        ยังไม่มีคำขอใช้พื้นที่เข้ามาในระบบ
                      </td>
                    </tr>
                  ) : (
                    spaceProposals.map(p => (
                      <tr key={p.id} style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.05)' }}>
                        <td style={{ padding: '12px', fontFamily: 'monospace', fontWeight: 'bold', color: '#E5A31E' }}>{p.ticket_code}</td>
                        <td style={{ padding: '12px', fontWeight: '600', color: '#FFF' }}>{p.guest_name}</td>
                        <td style={{ padding: '12px', fontFamily: 'monospace', color: 'rgba(250, 242, 221, 0.8)' }}>
                          {p.guest_phone}
                          {p.guest_email && <div style={{ fontSize: '0.72rem', color: 'rgba(250, 242, 221, 0.4)' }}>{p.guest_email}</div>}
                        </td>
                        <td style={{ padding: '12px', color: '#FFF' }}>{p.event_title || p.event_id}</td>
                        <td style={{ padding: '12px', color: 'rgba(250, 242, 221, 0.7)', maxWidth: '240px' }}>{p.tea_blend || 'ไม่มีรายละเอียดระบุ'}</td>
                        <td style={{ padding: '12px' }}>
                          <span
                            style={{
                              padding: '4px 10px',
                              borderRadius: '999px',
                              fontSize: '0.72rem',
                              fontWeight: 'bold',
                              fontFamily: 'monospace',
                              backgroundColor: p.status === 'approved' ? 'rgba(52, 211, 153, 0.2)' : p.status === 'rejected' ? 'rgba(244, 63, 94, 0.2)' : 'rgba(245, 158, 11, 0.2)',
                              color: p.status === 'approved' ? '#34D399' : p.status === 'rejected' ? '#F43F5E' : '#FBBF24'
                            }}
                          >
                            {p.status === 'approved' ? '✓ APPROVED' : p.status === 'rejected' ? '✕ REJECTED' : '⏳ PENDING'}
                          </span>
                        </td>
                        <td style={{ padding: '12px', textAlign: 'center', whiteSpace: 'nowrap' }}>
                          {p.status !== 'approved' && (
                            <button
                              onClick={() => handleUpdateBookingStatus(p.ticket_code, 'approved')}
                              style={{
                                padding: '4px 10px',
                                marginRight: '6px',
                                borderRadius: '6px',
                                backgroundColor: '#059669',
                                color: '#FFF',
                                fontSize: '0.72rem',
                                fontWeight: 'bold',
                                border: 'none',
                                cursor: 'pointer'
                              }}
                            >
                              ✓ อนุมัติ
                            </button>
                          )}
                          {p.status !== 'rejected' && (
                            <button
                              onClick={() => handleUpdateBookingStatus(p.ticket_code, 'rejected')}
                              style={{
                                padding: '4px 10px',
                                borderRadius: '6px',
                                backgroundColor: 'rgba(244, 63, 94, 0.4)',
                                color: '#FECDD3',
                                fontSize: '0.72rem',
                                fontWeight: 'bold',
                                border: 'none',
                                cursor: 'pointer'
                              }}
                            >
                              ✕ ปฏิเสธ
                            </button>
                          )}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 3: IDEA MODERATION */}
        {activeTab === 'ideas' && (
          <div style={{ backgroundColor: 'rgba(255, 255, 255, 0.03)', border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '18px', padding: '20px' }}>
            <h2 style={{ fontSize: '1.1rem', fontWeight: 'bold', color: '#FFF', margin: '0 0 16px 0' }}>
              จัดการกระดานไอเดีย & การมีส่วนร่วมของชุมชน ({ideas.length} ไอเดีย)
            </h2>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '16px' }}>
              {ideas.map(idea => (
                <div key={idea.id} style={{ backgroundColor: 'rgba(255, 255, 255, 0.04)', border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '14px', padding: '16px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '0.72rem', fontWeight: 'bold', color: '#E5A31E', backgroundColor: 'rgba(229, 163, 30, 0.15)', padding: '2px 8px', borderRadius: '999px' }}>
                      {idea.category_th}
                    </span>
                    <span style={{ fontSize: '0.78rem', color: '#F43F5E', fontWeight: 'bold', fontFamily: 'monospace' }}>❤️ {idea.votes} โหวต</span>
                  </div>

                  <h3 style={{ fontSize: '0.95rem', fontWeight: 'bold', color: '#FFF', margin: 0 }}>{idea.title_th || (idea as any).title}</h3>
                  <p style={{ fontSize: '0.8rem', color: 'rgba(250, 242, 221, 0.7)', margin: 0, lineHeight: '1.4' }}>{idea.desc_th || (idea as any).desc}</p>
                  
                  <div style={{ fontSize: '0.72rem', color: 'rgba(250, 242, 221, 0.5)', fontFamily: 'monospace' }}>
                    เสนอโดย: <strong>{idea.author_th || (idea as any).author || 'ชาวตะกั่วป่า'}</strong>
                  </div>

                  <div style={{ paddingTop: '10px', borderTop: '1px solid rgba(255, 255, 255, 0.08)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '0.72rem', fontFamily: 'monospace', color: 'rgba(250, 242, 221, 0.6)' }}>
                      สถานะ: <strong>{idea.status}</strong>
                    </span>
                    <div style={{ display: 'flex', gap: '4px' }}>
                      <button
                        onClick={() => handleUpdateIdeaStatus(idea.id, 'reviewing')}
                        style={{
                          padding: '3px 8px',
                          borderRadius: '4px',
                          fontSize: '0.68rem',
                          fontFamily: 'monospace',
                          border: 'none',
                          cursor: 'pointer',
                          backgroundColor: idea.status === 'reviewing' ? '#F59E0B' : 'rgba(255, 255, 255, 0.1)',
                          color: idea.status === 'reviewing' ? '#000' : '#FFF'
                        }}
                      >
                        พิจารณา
                      </button>
                      <button
                        onClick={() => handleUpdateIdeaStatus(idea.id, 'in_action')}
                        style={{
                          padding: '3px 8px',
                          borderRadius: '4px',
                          fontSize: '0.68rem',
                          fontFamily: 'monospace',
                          border: 'none',
                          cursor: 'pointer',
                          backgroundColor: idea.status === 'in_action' ? '#10B981' : 'rgba(255, 255, 255, 0.1)',
                          color: idea.status === 'in_action' ? '#000' : '#FFF'
                        }}
                      >
                        นำไปจัดจริง
                      </button>
                      <button
                        onClick={() => handleUpdateIdeaStatus(idea.id, 'completed')}
                        style={{
                          padding: '3px 8px',
                          borderRadius: '4px',
                          fontSize: '0.68rem',
                          fontFamily: 'monospace',
                          border: 'none',
                          cursor: 'pointer',
                          backgroundColor: idea.status === 'completed' ? '#0EA5E9' : 'rgba(255, 255, 255, 0.1)',
                          color: idea.status === 'completed' ? '#000' : '#FFF'
                        }}
                      >
                        เสร็จสิ้น
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: REPORTS & ANALYTICS */}
        {activeTab === 'reports' && (
          <div style={{ backgroundColor: 'rgba(255, 255, 255, 0.03)', border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '18px', padding: '24px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div>
              <h2 style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#FFF', margin: '0 0 4px 0' }}>
                สรุปรายงานและสถิติสำหรับคณะกรรมการมูลนิธิฯ
              </h2>
              <p style={{ fontSize: '0.8rem', color: 'rgba(250, 242, 221, 0.7)', margin: 0 }}>
                ดาวน์โหลดข้อมูลผู้เข้าร่วมงานทั้งหมดในรูปแบบ CSV เพื่อนำไปสรุปการประชุมและวิเคราะห์การใช้งานพื้นที่
              </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
              <div style={{ padding: '18px', borderRadius: '14px', backgroundColor: 'rgba(255, 255, 255, 0.04)', border: '1px solid rgba(255, 255, 255, 0.1)' }}>
                <span style={{ fontSize: '0.75rem', color: '#E5A31E', fontWeight: 'bold', display: 'block', marginBottom: '6px' }}>อัตราการ Check-in หน้างาน</span>
                <div style={{ fontSize: '1.8rem', fontWeight: 'bold' }}>
                  {bookings.length > 0 ? Math.round((checkedInCount / bookings.length) * 100) : 0}%
                </div>
                <span style={{ fontSize: '0.72rem', color: 'rgba(250, 242, 221, 0.5)' }}>จากยอดผู้สำรองที่นั่งทั้งหมด</span>
              </div>

              <div style={{ padding: '18px', borderRadius: '14px', backgroundColor: 'rgba(255, 255, 255, 0.04)', border: '1px solid rgba(255, 255, 255, 0.1)' }}>
                <span style={{ fontSize: '0.75rem', color: '#34D399', fontWeight: 'bold', display: 'block', marginBottom: '6px' }}>การมีส่วนร่วมของชุมชน</span>
                <div style={{ fontSize: '1.8rem', fontWeight: 'bold' }}>
                  {ideas.reduce((sum, i) => sum + i.votes, 0)} <span style={{ fontSize: '0.9rem', fontWeight: 'normal' }}>โหวต</span>
                </div>
                <span style={{ fontSize: '0.72rem', color: 'rgba(250, 242, 221, 0.5)' }}>ยอดกดถูกใจไอเดียทั้งหมด</span>
              </div>

              <div style={{ padding: '18px', borderRadius: '14px', backgroundColor: 'rgba(255, 255, 255, 0.04)', border: '1px solid rgba(255, 255, 255, 0.1)' }}>
                <span style={{ fontSize: '0.75rem', color: '#38BDF8', fontWeight: 'bold', display: 'block', marginBottom: '6px' }}>ความสนใจพื้นที่</span>
                <div style={{ fontSize: '1.8rem', fontWeight: 'bold' }}>{spaceProposals.length} <span style={{ fontSize: '0.9rem', fontWeight: 'normal' }}>โครงการ</span></div>
                <span style={{ fontSize: '0.72rem', color: 'rgba(250, 242, 221, 0.5)' }}>ข้อเสนอจัดงานและนิทรรศการ</span>
              </div>
            </div>

            {/* CSV Export Bar */}
            <div style={{ paddingTop: '16px', borderTop: '1px solid rgba(255, 255, 255, 0.1)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
              <div>
                <strong style={{ display: 'block', fontSize: '0.9rem', color: '#FFF' }}>ส่งออกข้อมูลสรุปเป็นไฟล์ Excel / CSV</strong>
                <span style={{ fontSize: '0.75rem', color: 'rgba(250, 242, 221, 0.6)' }}>รวมข้อมูลรหัสตั๋ว, ผู้ติดต่อ, โซนพื้นที่, และสถานะทั้งหมด</span>
              </div>
              <button
                onClick={handleExportCSV}
                style={{
                  padding: '12px 24px',
                  borderRadius: '10px',
                  backgroundColor: '#E5A31E',
                  color: '#122421',
                  fontSize: '0.82rem',
                  fontWeight: 'bold',
                  border: 'none',
                  cursor: 'pointer'
                }}
              >
                📥 ดาวน์โหลดไฟล์สรุปรายงาน (.CSV)
              </button>
            </div>

            {/* Permanent Master Database Backup & Restore Bar */}
            <div style={{ paddingTop: '16px', borderTop: '1.5px dashed rgba(229, 163, 30, 0.3)', display: 'flex', flexDirection: 'column', gap: '12px', backgroundColor: 'rgba(229, 163, 30, 0.05)', padding: '16px', borderRadius: '12px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
                <div>
                  <strong style={{ display: 'block', fontSize: '0.92rem', color: '#E5A31E' }}>💾 สำรอง & กู้คืนฐานข้อมูล Master (ป้องกันข้อมูลสูญหายเวลา Deploy)</strong>
                  <span style={{ fontSize: '0.76rem', color: 'rgba(250, 242, 221, 0.75)' }}>
                    สำรองข้อมูลไอเดียชุมชน ตั๋วจอง และกิจกรรมทั้งหมดเป็นไฟล์ JSON หรือกู้คืนกลับมาได้ทันที 100%
                  </span>
                </div>

                <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', alignItems: 'center' }}>
                  <button
                    onClick={handleExportJSON}
                    style={{
                      padding: '10px 18px',
                      borderRadius: '8px',
                      backgroundColor: 'rgba(229, 163, 30, 0.2)',
                      border: '1px solid #E5A31E',
                      color: '#E5A31E',
                      fontSize: '0.8rem',
                      fontWeight: 'bold',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    💾 สำรองไฟล์ฐานข้อมูล (.JSON)
                  </button>

                  <label
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px',
                      padding: '10px 18px',
                      borderRadius: '8px',
                      backgroundColor: '#34D399',
                      color: '#0F1E1C',
                      fontSize: '0.8rem',
                      fontWeight: 'bold',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    📥 นำเข้า & กู้คืน (.JSON)
                    <input
                      type="file"
                      accept=".json"
                      onChange={handleImportJSON}
                      style={{ display: 'none' }}
                    />
                  </label>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* EVENT CREATE / EDIT MODAL */}
        {isEventModalOpen && (
          <div style={{ position: 'fixed', inset: 0, zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px' }}>
            <div
              style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(0, 0, 0, 0.85)', backdropFilter: 'blur(8px)' }}
              onClick={() => setIsEventModalOpen(false)}
            ></div>

            <div
              style={{
                position: 'relative',
                width: '100%',
                maxWidth: '680px',
                maxHeight: '90vh',
                overflowY: 'auto',
                backgroundColor: '#132422',
                border: '1.5px solid rgba(229, 163, 30, 0.45)',
                borderRadius: '20px',
                padding: '28px',
                boxShadow: '0 25px 60px rgba(0, 0, 0, 0.7), 0 0 30px rgba(229, 163, 30, 0.15)',
                zIndex: 10,
                color: '#FAF2DD'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', borderBottom: '1px solid rgba(255, 255, 255, 0.1)', paddingBottom: '14px' }}>
                <div>
                  <span style={{ fontSize: '0.72rem', fontFamily: 'monospace', fontWeight: 'bold', color: '#E5A31E', textTransform: 'uppercase' }}>
                    {editingEventId ? `✏️ EDIT EVENT #${editingEventId}` : '➕ CREATE NEW EVENT'}
                  </span>
                  <h2 style={{ fontSize: '1.3rem', fontWeight: 'bold', color: '#FFF', margin: '4px 0 0 0' }}>
                    {editingEventId ? 'แก้ไขข้อมูลกิจกรรม / เวิร์กช็อป' : 'เพิ่มกิจกรรม / เวิร์กช็อปใหม่'}
                  </h2>
                </div>
                <button
                  onClick={() => setIsEventModalOpen(false)}
                  style={{ background: 'none', border: 'none', color: '#FAF2DD', fontSize: '1.5rem', cursor: 'pointer', padding: '4px 8px' }}
                >
                  &times;
                </button>
              </div>

              <form onSubmit={handleSaveEvent} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {/* Category & Action Type Row */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 'bold', color: '#E5A31E', marginBottom: '6px' }}>
                      หมวดหมู่กิจกรรม (Category) *
                    </label>
                    <select
                      value={eventForm.category}
                      onChange={e => setEventForm({ ...eventForm, category: e.target.value as any })}
                      style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', backgroundColor: 'rgba(255, 255, 255, 0.06)', border: '1px solid rgba(255, 255, 255, 0.2)', color: '#FFF', fontSize: '0.85rem', outline: 'none' }}
                    >
                      <option value="workshop" style={{ backgroundColor: '#132422' }}>เวิร์กช็อป (Workshop)</option>
                      <option value="exhibition" style={{ backgroundColor: '#132422' }}>นิทรรศการ (Exhibition)</option>
                      <option value="market" style={{ backgroundColor: '#132422' }}>ตลาด & ดนตรี (Market & Music)</option>
                      <option value="talk" style={{ backgroundColor: '#132422' }}>เสวนา & ทอล์ก (Talk & Seminar)</option>
                    </select>
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 'bold', color: '#E5A31E', marginBottom: '6px' }}>
                      ประเภทปุ่มแอ็กชัน (Button Action)
                    </label>
                    <select
                      value={eventForm.btnType}
                      onChange={e => setEventForm({ ...eventForm, btnType: e.target.value as any })}
                      style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', backgroundColor: 'rgba(255, 255, 255, 0.06)', border: '1px solid rgba(255, 255, 255, 0.2)', color: '#FFF', fontSize: '0.85rem', outline: 'none' }}
                    >
                      <option value="register" style={{ backgroundColor: '#132422' }}>ลงทะเบียน (Register)</option>
                      <option value="tea_simulator" style={{ backgroundColor: '#132422' }}>🍵 สำรองจิบชา (Tea Tasting Simulator)</option>
                      <option value="reserve" style={{ backgroundColor: '#132422' }}>🎟️ จองที่นั่งล่วงหน้า (Reserve Seat)</option>
                      <option value="details" style={{ backgroundColor: '#132422' }}>🏛️ ดูผังนิทรรศการ (View Hall)</option>
                      <option value="shops" style={{ backgroundColor: '#132422' }}>📍 ดูพิกัดตลาด (View Map)</option>
                    </select>
                  </div>
                </div>

                {/* Title TH */}
                <div>
                  <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 'bold', color: '#E5A31E', marginBottom: '6px' }}>
                    ชื่อกิจกรรม (ภาษาไทย) *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="เช่น เวิร์กช็อปทำขนมเต้าส้อโบราณเต้าหมิง"
                    value={eventForm.title_th || ''}
                    onChange={e => setEventForm({ ...eventForm, title_th: e.target.value })}
                    style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', backgroundColor: 'rgba(255, 255, 255, 0.06)', border: '1px solid rgba(255, 255, 255, 0.2)', color: '#FFF', fontSize: '0.9rem', outline: 'none', boxSizing: 'border-box' }}
                  />
                </div>

                {/* Title EN & Tag */}
                <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '14px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 'bold', color: '#E5A31E', marginBottom: '6px' }}>
                      ชื่อกิจกรรมภาษาอังกฤษ (Title EN)
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Traditional Tao Sae Pastry Workshop"
                      value={eventForm.title_en || ''}
                      onChange={e => setEventForm({ ...eventForm, title_en: e.target.value })}
                      style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', backgroundColor: 'rgba(255, 255, 255, 0.06)', border: '1px solid rgba(255, 255, 255, 0.2)', color: '#FFF', fontSize: '0.85rem', outline: 'none', boxSizing: 'border-box' }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 'bold', color: '#E5A31E', marginBottom: '6px' }}>
                      ป้ายแท็ก (Tag TH)
                    </label>
                    <input
                      type="text"
                      placeholder="เช่น วัฒนธรรมอาหาร & คราฟต์"
                      value={eventForm.tag_th || ''}
                      onChange={e => setEventForm({ ...eventForm, tag_th: e.target.value })}
                      style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', backgroundColor: 'rgba(255, 255, 255, 0.06)', border: '1px solid rgba(255, 255, 255, 0.2)', color: '#FFF', fontSize: '0.85rem', outline: 'none', boxSizing: 'border-box' }}
                    />
                  </div>
                </div>

                {/* Date & Time Row */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1.2fr', gap: '12px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 'bold', color: '#E5A31E', marginBottom: '6px' }}>
                      วันที่ (Day)
                    </label>
                    <input
                      type="text"
                      placeholder="เช่น 24 หรือ 12-31"
                      value={eventForm.day_th || ''}
                      onChange={e => setEventForm({ ...eventForm, day_th: e.target.value, day_en: e.target.value })}
                      style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', backgroundColor: 'rgba(255, 255, 255, 0.06)', border: '1px solid rgba(255, 255, 255, 0.2)', color: '#FFF', fontSize: '0.85rem', outline: 'none', boxSizing: 'border-box' }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 'bold', color: '#E5A31E', marginBottom: '6px' }}>
                      เดือน (Month)
                    </label>
                    <input
                      type="text"
                      placeholder="เช่น ส.ค. 2569"
                      value={eventForm.month_th || ''}
                      onChange={e => setEventForm({ ...eventForm, month_th: e.target.value })}
                      style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', backgroundColor: 'rgba(255, 255, 255, 0.06)', border: '1px solid rgba(255, 255, 255, 0.2)', color: '#FFF', fontSize: '0.85rem', outline: 'none', boxSizing: 'border-box' }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 'bold', color: '#E5A31E', marginBottom: '6px' }}>
                      เวลาจัดงาน (Time)
                    </label>
                    <input
                      type="text"
                      placeholder="เช่น 14:00 - 16:30 น."
                      value={eventForm.time_th || ''}
                      onChange={e => setEventForm({ ...eventForm, time_th: e.target.value })}
                      style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', backgroundColor: 'rgba(255, 255, 255, 0.06)', border: '1px solid rgba(255, 255, 255, 0.2)', color: '#FFF', fontSize: '0.85rem', outline: 'none', boxSizing: 'border-box' }}
                    />
                  </div>
                </div>

                {/* Location, Capacity, Price */}
                <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.9fr 0.9fr', gap: '12px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 'bold', color: '#E5A31E', marginBottom: '6px' }}>
                      สถานที่จัดงาน (Location)
                    </label>
                    <input
                      type="text"
                      placeholder="เช่น 📍 โซน D: Veranda"
                      value={eventForm.loc_th || ''}
                      onChange={e => setEventForm({ ...eventForm, loc_th: e.target.value })}
                      style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', backgroundColor: 'rgba(255, 255, 255, 0.06)', border: '1px solid rgba(255, 255, 255, 0.2)', color: '#FFF', fontSize: '0.85rem', outline: 'none', boxSizing: 'border-box' }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 'bold', color: '#E5A31E', marginBottom: '6px' }}>
                      จำนวนที่นั่ง (Capacity)
                    </label>
                    <input
                      type="text"
                      placeholder="เช่น 👥 รับ 16 ท่าน"
                      value={eventForm.cap_th || ''}
                      onChange={e => setEventForm({ ...eventForm, cap_th: e.target.value })}
                      style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', backgroundColor: 'rgba(255, 255, 255, 0.06)', border: '1px solid rgba(255, 255, 255, 0.2)', color: '#FFF', fontSize: '0.85rem', outline: 'none', boxSizing: 'border-box' }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 'bold', color: '#E5A31E', marginBottom: '6px' }}>
                      ราคา / ค่าเข้าร่วม (Price)
                    </label>
                    <input
                      type="text"
                      placeholder="เช่น ฿490 / ท่าน หรือ ฟรี"
                      value={eventForm.price_th || ''}
                      onChange={e => setEventForm({ ...eventForm, price_th: e.target.value })}
                      style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', backgroundColor: 'rgba(255, 255, 255, 0.06)', border: '1px solid rgba(255, 255, 255, 0.2)', color: '#FFF', fontSize: '0.85rem', outline: 'none', boxSizing: 'border-box' }}
                    />
                  </div>
                </div>

                {/* Image Path with Presets */}
                <div>
                  <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 'bold', color: '#E5A31E', marginBottom: '6px' }}>
                    รูปภาพหน้าปกกิจกรรม (Image URL / Path)
                  </label>
                  <input
                    type="text"
                    placeholder="เช่น /assets/event-tea.jpg หรือ URL รูปภาพ"
                    value={eventForm.image || ''}
                    onChange={e => setEventForm({ ...eventForm, image: e.target.value })}
                    style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', backgroundColor: 'rgba(255, 255, 255, 0.06)', border: '1px solid rgba(255, 255, 255, 0.2)', color: '#FFF', fontSize: '0.85rem', outline: 'none', boxSizing: 'border-box', marginBottom: '6px' }}
                  />
                  <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                    <span style={{ fontSize: '0.7rem', color: 'rgba(250, 242, 221, 0.5)', alignSelf: 'center' }}>เลือกรูปภาพแนะนำ:</span>
                    {[
                      { label: '🍵 จิบชา', path: '/assets/event-tea.jpg' },
                      { label: '🏛️ นิทรรศการ', path: '/assets/event-exhibition.jpg' },
                      { label: '🎨 งานคราฟต์', path: '/assets/event-craft.jpg' },
                      { label: '🚶 นำชมเมือง', path: '/assets/event-walk.jpg' },
                      { label: '🎶 ดนตรีสด', path: '/assets/event-music.jpg' }
                    ].map(preset => (
                      <button
                        key={preset.path}
                        type="button"
                        onClick={() => setEventForm({ ...eventForm, image: preset.path })}
                        style={{
                          padding: '3px 8px',
                          fontSize: '0.7rem',
                          borderRadius: '4px',
                          backgroundColor: eventForm.image === preset.path ? '#E5A31E' : 'rgba(255, 255, 255, 0.08)',
                          color: eventForm.image === preset.path ? '#122421' : '#FAF2DD',
                          border: 'none',
                          cursor: 'pointer'
                        }}
                      >
                        {preset.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Snippet */}
                <div>
                  <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 'bold', color: '#E5A31E', marginBottom: '6px' }}>
                    คำอธิบายสั้น (Snippet บนการ์ด)
                  </label>
                  <textarea
                    rows={2}
                    placeholder="คำอธิบายสรุป 2-3 บรรทัด สำหรับแสดงบนการ์ดกิจกรรม..."
                    value={eventForm.snippet_th || ''}
                    onChange={e => setEventForm({ ...eventForm, snippet_th: e.target.value })}
                    style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', backgroundColor: 'rgba(255, 255, 255, 0.06)', border: '1px solid rgba(255, 255, 255, 0.2)', color: '#FFF', fontSize: '0.85rem', outline: 'none', boxSizing: 'border-box', resize: 'vertical' }}
                  />
                </div>

                {/* Detailed Description */}
                <div>
                  <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 'bold', color: '#E5A31E', marginBottom: '6px' }}>
                    รายละเอียดกิจกรรมเชิงลึก (สำหรับหน้าต่างป๊อปอัป)
                  </label>
                  <textarea
                    rows={4}
                    placeholder="บอกเล่ารายละเอียด รูปแบบการจัดงาน สิ่งที่ผู้เข้าร่วมจะได้รับ..."
                    value={eventForm.detailed_desc_th || ''}
                    onChange={e => setEventForm({ ...eventForm, detailed_desc_th: e.target.value })}
                    style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', backgroundColor: 'rgba(255, 255, 255, 0.06)', border: '1px solid rgba(255, 255, 255, 0.2)', color: '#FFF', fontSize: '0.85rem', outline: 'none', boxSizing: 'border-box', resize: 'vertical' }}
                  />
                </div>

                {/* Instructor / Master */}
                <div>
                  <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 'bold', color: '#E5A31E', marginBottom: '6px' }}>
                    วิทยากร / ผู้เชี่ยวชาญ (Instructor)
                  </label>
                  <input
                    type="text"
                    placeholder="เช่น อ.วิบูลย์ ตันติพัฒนกุล & ป้าสมศรี ช่างทำขนมเต้าส้อ"
                    value={eventForm.instructor_th || ''}
                    onChange={e => setEventForm({ ...eventForm, instructor_th: e.target.value })}
                    style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', backgroundColor: 'rgba(255, 255, 255, 0.06)', border: '1px solid rgba(255, 255, 255, 0.2)', color: '#FFF', fontSize: '0.85rem', outline: 'none', boxSizing: 'border-box' }}
                  />
                </div>

                {/* Form Buttons */}
                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', paddingTop: '16px', borderTop: '1px solid rgba(255, 255, 255, 0.1)' }}>
                  <button
                    type="button"
                    onClick={() => setIsEventModalOpen(false)}
                    style={{ padding: '10px 20px', borderRadius: '8px', backgroundColor: 'rgba(255, 255, 255, 0.08)', border: '1px solid rgba(255, 255, 255, 0.15)', color: '#FAF2DD', fontSize: '0.85rem', cursor: 'pointer' }}
                  >
                    ยกเลิก
                  </button>

                  <button
                    type="submit"
                    style={{ padding: '10px 24px', borderRadius: '8px', backgroundColor: '#E5A31E', color: '#122421', fontSize: '0.85rem', fontWeight: 'bold', border: 'none', cursor: 'pointer', boxShadow: '0 4px 15px rgba(229, 163, 30, 0.35)' }}
                  >
                    💾 บันทึกกิจกรรม (Save)
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
