'use client';

import React, { useState, useEffect } from 'react';
import { clientDb, ClientBooking, ClientIdea } from '@/lib/clientDb';

type BookingRecord = ClientBooking;
type IdeaRecord = ClientIdea;

export default function AdminDashboardPage() {
  const [activeTab, setActiveTab] = useState<'tickets' | 'spaces' | 'ideas' | 'reports'>('tickets');
  const [bookings, setBookings] = useState<BookingRecord[]>([]);
  const [spaceProposals, setSpaceProposals] = useState<BookingRecord[]>([]);
  const [ideas, setIdeas] = useState<IdeaRecord[]>([]);
  const [scanCode, setScanCode] = useState('');
  const [scanResult, setScanResult] = useState<any | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [feedbackMsg, setFeedbackMsg] = useState<string | null>(null);

  const showFeedback = (msg: string) => {
    setFeedbackMsg(msg);
    setTimeout(() => setFeedbackMsg(null), 4000);
  };

  const fetchAllData = () => {
    try {
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
    fetchAllData();
    const interval = setInterval(fetchAllData, 8000);
    return () => clearInterval(interval);
  }, []);

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

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
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
          </div>
        </header>

        {/* Feedback Alert Toast */}
        {feedbackMsg && (
          <div style={{ padding: '12px 18px', borderRadius: '10px', backgroundColor: 'rgba(229, 163, 30, 0.15)', border: '1px solid #E5A31E', color: '#E5A31E', fontSize: '0.85rem', fontWeight: 'bold' }}>
            ✓ {feedbackMsg}
          </div>
        )}

        {/* Live Metric Cards Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
          <div style={{ backgroundColor: 'rgba(255, 255, 255, 0.04)', border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '14px', padding: '18px' }}>
            <span style={{ fontSize: '0.75rem', color: 'rgba(250, 242, 221, 0.6)', display: 'block', marginBottom: '4px' }}>🎟️ ตั๋วกิจกรรมทั้งหมด</span>
            <div style={{ fontSize: '1.8rem', fontWeight: 'bold', color: '#E5A31E', fontFamily: 'monospace' }}>
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
            <span style={{ fontSize: '0.75rem', color: 'rgba(250, 242, 221, 0.6)', display: 'block', marginBottom: '4px' }}>🏛️ คำขอใช้พื้นที่ (รออนุมัติ)</span>
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

                  <h3 style={{ fontSize: '0.95rem', fontWeight: 'bold', color: '#FFF', margin: 0 }}>{idea.title}</h3>
                  <p style={{ fontSize: '0.8rem', color: 'rgba(250, 242, 221, 0.7)', margin: 0, lineHeight: '1.4' }}>{idea.desc}</p>
                  
                  <div style={{ fontSize: '0.72rem', color: 'rgba(250, 242, 221, 0.5)', fontFamily: 'monospace' }}>
                    เสนอโดย: <strong>{idea.author}</strong>
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

            <div style={{ paddingTop: '16px', borderTop: '1px solid rgba(255, 255, 255, 0.1)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
              <div>
                <strong style={{ display: 'block', fontSize: '0.9rem', color: '#FFF' }}>ส่งออกข้อมูลเป็นไฟล์ Excel / CSV</strong>
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
          </div>
        )}

      </div>
    </div>
  );
}
