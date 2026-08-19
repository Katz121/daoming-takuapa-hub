'use client';

import React, { useState, useEffect } from 'react';
import { clientDb, ClientBooking, ClientIdea, SiteCopyData, DEFAULT_SITE_COPY, DEFAULT_TIMELINE_DATA } from '@/lib/clientDb';
import { EventItem, ArchivePhoto, GableSymbol, SystemUser, UserRole, UserStatus } from '@/types';

type BookingRecord = ClientBooking;
type IdeaRecord = ClientIdea;

export default function AdminDashboardPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAuthChecked, setIsAuthChecked] = useState(false);
  const [currentUser, setCurrentUser] = useState<SystemUser | null>(null);

  // Login & Register form states
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
  const [usernameInput, setUsernameInput] = useState('admin');
  const [passwordInput, setPasswordInput] = useState('takuapa2569');
  const [authError, setAuthError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const [registerForm, setRegisterForm] = useState({
    username: '',
    password: '',
    confirmPassword: '',
    full_name: '',
    phone: '',
    email: '',
    department: 'สมาชิกทั่วไป / อาสาสมัคร',
    notes: ''
  });

  const [activeTab, setActiveTab] = useState<'events' | 'archive' | 'site_copy' | 'tickets' | 'spaces' | 'ideas' | 'users' | 'reports'>('events');
  const [events, setEvents] = useState<EventItem[]>([]);
  const [archivePhotos, setArchivePhotos] = useState<ArchivePhoto[]>([]);
  const [siteCopy, setSiteCopy] = useState<SiteCopyData>(DEFAULT_SITE_COPY);
  const [gables, setGables] = useState<GableSymbol[]>([]);
  const [timelineData, setTimelineData] = useState<Record<string, any>>(DEFAULT_TIMELINE_DATA);
  const [bookings, setBookings] = useState<BookingRecord[]>([]);
  const [spaceProposals, setSpaceProposals] = useState<BookingRecord[]>([]);
  const [ideas, setIdeas] = useState<IdeaRecord[]>([]);
  const [usersList, setUsersList] = useState<SystemUser[]>([]);
  const [scanCode, setScanCode] = useState('');
  const [scanResult, setScanResult] = useState<any | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [feedbackMsg, setFeedbackMsg] = useState<string | null>(null);

  // Users Tab states & Modals
  const [userSearch, setUserSearch] = useState('');
  const [userRoleFilter, setUserRoleFilter] = useState('all');
  const [userStatusFilter, setUserStatusFilter] = useState('all');

  const [isUserModalOpen, setIsUserModalOpen] = useState(false);
  const [editingUserId, setEditingUserId] = useState<string | null>(null);
  const [userForm, setUserForm] = useState<Partial<SystemUser>>({
    username: '',
    password: '',
    full_name: '',
    role: 'member',
    status: 'active',
    phone: '',
    email: '',
    department: 'ฝ่ายสถานที่ & นิทรรศการ',
    notes: ''
  });

  const [isRoleModalOpen, setIsRoleModalOpen] = useState(false);
  const [roleTargetUser, setRoleTargetUser] = useState<SystemUser | null>(null);
  const [newSelectedRole, setNewSelectedRole] = useState<UserRole>('officer');

  const [isPasswordResetModalOpen, setIsPasswordResetModalOpen] = useState(false);
  const [passwordTargetUser, setPasswordTargetUser] = useState<SystemUser | null>(null);
  const [newPasswordInput, setNewPasswordInput] = useState('');

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

  // Archive photo modal form states
  const [isArchiveModalOpen, setIsArchiveModalOpen] = useState(false);
  const [editingPhotoId, setEditingPhotoId] = useState<number | null>(null);
  const [archiveForm, setArchiveForm] = useState<Partial<ArchivePhoto>>({
    category: 'diplomacy',
    src: '/img/building-community.jpg',
    tag_th: 'พ.ศ. ๒๔๙๓',
    tag_en: '1950 Era',
    tag_zh: '1950年',
    title_th: '',
    title_en: '',
    title_zh: '',
    caption_th: '',
    caption_en: '',
    caption_zh: ''
  });

  // Gable symbol modal states
  const [isGableModalOpen, setIsGableModalOpen] = useState(false);
  const [editingGableId, setEditingGableId] = useState<string | null>(null);
  const [gableForm, setGableForm] = useState<Partial<GableSymbol>>({});

  // Timeline era modal states
  const [isTimelineModalOpen, setIsTimelineModalOpen] = useState(false);
  const [editingTimelineYear, setEditingTimelineYear] = useState<string | null>(null);
  const [timelineForm, setTimelineForm] = useState<Partial<any>>({});

  const showFeedback = (msg: string) => {
    setFeedbackMsg(msg);
    setTimeout(() => setFeedbackMsg(null), 4000);
  };

  const fetchAllData = () => {
    try {
      const uList = clientDb.getUsers();
      setUsersList(uList);

      const eList = clientDb.getEvents();
      setEvents(eList);

      const aList = clientDb.getArchivePhotos();
      setArchivePhotos(aList);

      const copyData = clientDb.getSiteCopy();
      setSiteCopy(copyData);

      const gList = clientDb.getGableSymbols();
      setGables(gList);

      const tData = clientDb.getTimelineData();
      setTimelineData(tData);

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
    const savedUserJson = typeof window !== 'undefined' ? sessionStorage.getItem('daoming_current_user') : null;
    if (savedUserJson) {
      try {
        const parsed = JSON.parse(savedUserJson);
        const freshUser = clientDb.getUserById(parsed.id) || clientDb.getUserByUsername(parsed.username);
        if (freshUser && freshUser.status === 'active') {
          setCurrentUser(freshUser);
          setIsAuthenticated(true);
          fetchAllData();
        } else {
          sessionStorage.removeItem('daoming_current_user');
          sessionStorage.removeItem('daoming_admin_auth');
        }
      } catch {
        // ignore
      }
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
    setAuthError('');
    const res = clientDb.authenticate(usernameInput, passwordInput);

    if (res.success && res.user) {
      if (typeof window !== 'undefined') {
        sessionStorage.setItem('daoming_admin_auth', 'true');
        sessionStorage.setItem('daoming_current_user', JSON.stringify(res.user));
      }
      setCurrentUser(res.user);
      setIsAuthenticated(true);
      showFeedback(`ยินดีต้อนรับ ${res.user.full_name} (${res.user.role.toUpperCase()})`);
      fetchAllData();
    } else {
      setAuthError(res.message);
    }
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');

    if (registerForm.password !== registerForm.confirmPassword) {
      setAuthError('รหัสผ่านและการยืนยันรหัสผ่านไม่ตรงกัน');
      return;
    }

    const res = clientDb.createUser({
      username: registerForm.username,
      password: registerForm.password,
      full_name: registerForm.full_name,
      phone: registerForm.phone,
      email: registerForm.email,
      department: registerForm.department,
      notes: registerForm.notes,
      role: 'member',
      status: 'pending'
    });

    if (res.success) {
      showFeedback('🎉 ลงทะเบียนสมาชิกสำเร็จ! กรุณารอ Super Admin อนุมัติสิทธิ์');
      setAuthMode('login');
      setUsernameInput(registerForm.username);
      setPasswordInput(registerForm.password);
      setRegisterForm({
        username: '',
        password: '',
        confirmPassword: '',
        full_name: '',
        phone: '',
        email: '',
        department: 'สมาชิกทั่วไป / อาสาสมัคร',
        notes: ''
      });
    } else {
      setAuthError(res.message);
    }
  };

  const handleLogout = () => {
    if (typeof window !== 'undefined') {
      sessionStorage.removeItem('daoming_admin_auth');
      sessionStorage.removeItem('daoming_current_user');
    }
    setIsAuthenticated(false);
    setCurrentUser(null);
    setAuthError('');
  };

  // User Management Actions
  const handleOpenAddUser = () => {
    setEditingUserId(null);
    setUserForm({
      username: '',
      password: '',
      full_name: '',
      role: 'member',
      status: 'active',
      phone: '',
      email: '',
      department: 'ฝ่ายสถานที่ & กิจกรรม',
      notes: ''
    });
    setIsUserModalOpen(true);
  };

  const handleOpenEditUser = (user: SystemUser) => {
    setEditingUserId(user.id);
    setUserForm({
      username: user.username,
      password: user.password,
      full_name: user.full_name,
      role: user.role,
      status: user.status,
      phone: user.phone || '',
      email: user.email || '',
      department: user.department || '',
      notes: user.notes || ''
    });
    setIsUserModalOpen(true);
  };

  const handleSaveUser = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingUserId) {
      const res = clientDb.updateUser(editingUserId, userForm);
      if (res.success) {
        showFeedback(res.message);
        setIsUserModalOpen(false);
        fetchAllData();
      } else {
        alert(res.message);
      }
    } else {
      if (!userForm.username || !userForm.password || !userForm.full_name) {
        alert('กรุณากรอกชื่อผู้ใช้ รหัสผ่าน และชื่อ-นามสกุลให้ครบถ้วน');
        return;
      }
      const res = clientDb.createUser(userForm as any);
      if (res.success) {
        showFeedback(res.message);
        setIsUserModalOpen(false);
        fetchAllData();
      } else {
        alert(res.message);
      }
    }
  };

  const handleApproveUser = (user: SystemUser) => {
    const res = clientDb.updateUser(user.id, { status: 'active' });
    if (res.success) {
      showFeedback(`✅ อนุมัติสิทธิ์เข้าใช้งานให้คุณ "${user.full_name}" เรียบร้อยแล้ว`);
      fetchAllData();
    }
  };

  const handleToggleSuspendUser = (user: SystemUser) => {
    const newStatus: UserStatus = user.status === 'suspended' ? 'active' : 'suspended';
    const res = clientDb.updateUser(user.id, { status: newStatus });
    if (res.success) {
      showFeedback(`ปรับสถานะคุณ "${user.full_name}" เป็น ${newStatus === 'active' ? 'ใช้งานได้' : 'ระงับชั่วคราว'}`);
      fetchAllData();
    } else {
      alert(res.message);
    }
  };

  const handleOpenRoleModal = (user: SystemUser) => {
    setRoleTargetUser(user);
    setNewSelectedRole(user.role);
    setIsRoleModalOpen(true);
  };

  const handleSaveRole = () => {
    if (!roleTargetUser) return;
    const res = clientDb.updateUser(roleTargetUser.id, { role: newSelectedRole });
    if (res.success) {
      showFeedback(`👑 แต่งตั้งสิทธิ์คุณ "${roleTargetUser.full_name}" เป็น [${newSelectedRole.toUpperCase()}] สำเร็จ`);
      setIsRoleModalOpen(false);
      fetchAllData();
    } else {
      alert(res.message);
    }
  };

  const handleOpenPasswordReset = (user: SystemUser) => {
    setPasswordTargetUser(user);
    setNewPasswordInput('');
    setIsPasswordResetModalOpen(true);
  };

  const handleSavePasswordReset = () => {
    if (!passwordTargetUser || !newPasswordInput) {
      alert('กรุณากรอกรหัสผ่านใหม่');
      return;
    }
    const res = clientDb.updateUser(passwordTargetUser.id, { password: newPasswordInput });
    if (res.success) {
      showFeedback(`🔑 เปลี่ยนรหัสผ่านให้คุณ "${passwordTargetUser.full_name}" สำเร็จ`);
      setIsPasswordResetModalOpen(false);
      fetchAllData();
    } else {
      alert(res.message);
    }
  };

  const handleDeleteUser = (user: SystemUser) => {
    if (confirm(`คุณแน่ใจหรือไม่ว่าต้องการลบสมาชิก "${user.full_name}" (@${user.username}) ออกจากระบบ?`)) {
      const res = clientDb.deleteUser(user.id);
      if (res.success) {
        showFeedback(res.message);
        fetchAllData();
      } else {
        alert(res.message);
      }
    }
  };

  const handleResetUsers = () => {
    if (confirm('คุณแน่ใจหรือไม่ว่าต้องการรีเซ็ตรายชื่อผู้ใช้งานทั้งหมดเป็นค่าเริ่มต้น (admin / takuapa2569)? ข้อมูลสมาชิกที่เพิ่มเองจะถูกล้าง')) {
      clientDb.resetUsers();
      showFeedback('🔄 รีเซ็ตรายชื่อผู้ใช้งานเป็นค่าเริ่มต้นเรียบร้อย');
      fetchAllData();
    }
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

  // Archive Photo Handlers
  const handleOpenCreateArchivePhoto = () => {
    setEditingPhotoId(null);
    setArchiveForm({
      category: 'diplomacy',
      src: '/img/building-community.jpg',
      tag_th: 'พ.ศ. ๒๔๙๓',
      tag_en: '1950 Era',
      tag_zh: '1950年',
      title_th: '',
      title_en: '',
      title_zh: '',
      caption_th: '',
      caption_en: '',
      caption_zh: ''
    });
    setIsArchiveModalOpen(true);
  };

  const handleOpenEditArchivePhoto = (photo: ArchivePhoto) => {
    setEditingPhotoId(photo.id);
    setArchiveForm({
      category: photo.category,
      src: photo.src,
      tag_th: photo.tag_th,
      tag_en: photo.tag_en,
      tag_zh: photo.tag_zh,
      title_th: photo.title_th,
      title_en: photo.title_en,
      title_zh: photo.title_zh,
      caption_th: photo.caption_th,
      caption_en: photo.caption_en,
      caption_zh: photo.caption_zh
    });
    setIsArchiveModalOpen(true);
  };

  const handleSaveArchivePhoto = (e: React.FormEvent) => {
    e.preventDefault();
    if (!archiveForm.title_th?.trim()) {
      alert('กรุณากรอกชื่อภาพประวัติศาสตร์ (ภาษาไทย)');
      return;
    }
    if (!archiveForm.src?.trim()) {
      alert('กรุณาระบุ URL หรือ Path ของรูปภาพ');
      return;
    }

    try {
      if (editingPhotoId !== null) {
        clientDb.updateArchivePhoto(editingPhotoId, archiveForm);
        showFeedback(`แก้ไขภาพประวัติศาสตร์ "${archiveForm.title_th}" สำเร็จ`);
      } else {
        clientDb.createArchivePhoto(archiveForm);
        showFeedback(`เพิ่มภาพประวัติศาสตร์ใหม่ "${archiveForm.title_th}" สำเร็จ`);
      }
      setIsArchiveModalOpen(false);
      fetchAllData();
    } catch (err: any) {
      showFeedback(`เกิดข้อผิดพลาด: ${err.message}`);
    }
  };

  const handleDeleteArchivePhoto = (id: number, title: string) => {
    if (confirm(`คุณต้องการลบภาพประวัติศาสตร์ "${title}" ใช่หรือไม่?\nการลบจะมีผลกับหน้าคลังภาพในเว็บทันที`)) {
      clientDb.deleteArchivePhoto(id);
      showFeedback(`ลบภาพ "${title}" เรียบร้อยแล้ว`);
      fetchAllData();
    }
  };

  const handleResetArchivePhotos = () => {
    if (confirm('คุณต้องการคืนค่าคลังภาพประวัติศาสตร์เริ่มต้นทั้งหมดใช่หรือไม่? (ภาพที่คุณเพิ่มเองจะถูกรีเซ็ตกลับเป็น ๑๓ ภาพดั้งเดิม)')) {
      clientDb.resetArchivePhotos();
      showFeedback('คืนค่ารายการภาพประวัติศาสตร์เริ่มต้นเรียบร้อยแล้ว');
      fetchAllData();
    }
  };

  const handleFileImageUpload = (file: File, onDone: (dataUrl: string) => void) => {
    if (!file || !file.type.startsWith('image/')) {
      alert('กรุณาเลือกไฟล์รูปภาพที่ถูกต้อง (PNG, JPG, JPEG, WebP)');
      return;
    }
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const MAX_WIDTH = 1280;
        const MAX_HEIGHT = 1280;
        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > MAX_WIDTH) {
            height = Math.round((height * MAX_WIDTH) / width);
            width = MAX_WIDTH;
          }
        } else {
          if (height > MAX_HEIGHT) {
            width = Math.round((width * MAX_HEIGHT) / height);
            height = MAX_HEIGHT;
          }
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(img, 0, 0, width, height);
          const compressedDataUrl = canvas.toDataURL('image/jpeg', 0.82);
          onDone(compressedDataUrl);
          showFeedback('✓ โหลดและประมวลผลรูปภาพพร้อมใช้งานแล้ว (ไม่ต้องพุช git)');
        }
      };
      img.src = e.target?.result as string;
    };
    reader.readAsDataURL(file);
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

  const handleSaveSiteCopy = (e: React.FormEvent) => {
    e.preventDefault();
    clientDb.updateSiteCopy(siteCopy);
    showFeedback("✓ บันทึกข้อความและเนื้อหาเว็บไซต์สำเร็จ (อัปเดตแบบ Realtime ทันที)");
  };

  const handleResetSiteCopy = () => {
    if (confirm("คุณต้องการคืนค่าข้อความเริ่มต้นของระบบทั้งหมดใช่หรือไม่?")) {
      const reset = clientDb.resetSiteCopy();
      setSiteCopy(reset);
      showFeedback("✓ คืนค่าข้อความและเนื้อหาเริ่มต้นเรียบร้อยแล้ว");
    }
  };

  const handleOpenEditGable = (symbol: GableSymbol) => {
    setEditingGableId(symbol.id);
    setGableForm({ ...symbol });
    setIsGableModalOpen(true);
  };

  const handleSaveGable = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingGableId) return;
    clientDb.updateGableSymbol(editingGableId, gableForm);
    setIsGableModalOpen(false);
    fetchAllData();
    showFeedback(`✓ บันทึกข้อมูลสัญลักษณ์ ${gableForm.name_th || editingGableId} สำเร็จ`);
  };

  const handleResetGables = () => {
    if (confirm("คุณต้องการคืนค่าสัญลักษณ์หน้าจั่วทั้ง ๕ สัญลักษณ์เริ่มต้นใช่หรือไม่?")) {
      const reset = clientDb.resetGableSymbols();
      setGables(reset);
      showFeedback("✓ คืนค่าสัญลักษณ์หน้าจั่วเริ่มต้นเรียบร้อยแล้ว");
    }
  };

  const handleOpenEditTimeline = (year: string) => {
    setEditingTimelineYear(year);
    const data = timelineData[year] || DEFAULT_TIMELINE_DATA[year];
    setTimelineForm({ ...data });
    setIsTimelineModalOpen(true);
  };

  const handleSaveTimeline = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingTimelineYear) return;
    clientDb.updateTimelineEra(editingTimelineYear, timelineForm);
    setIsTimelineModalOpen(false);
    fetchAllData();
    showFeedback(`✓ บันทึกข้อมูลยุคสมัย ${timelineForm.badge_th || editingTimelineYear} สำเร็จ`);
  };

  const handleResetTimeline = () => {
    if (confirm("คุณต้องการคืนค่าประวัติศาสตร์ ๔ ยุคเริ่มต้นใช่หรือไม่?")) {
      const reset = clientDb.resetTimelineData();
      setTimelineData(reset);
      showFeedback("✓ คืนค่าประวัติศาสตร์เริ่มต้นเรียบร้อยแล้ว");
    }
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
        <div style={{ width: '100%', maxWidth: '460px', backgroundColor: '#132422', border: '1.5px solid rgba(229, 163, 30, 0.4)', borderRadius: '22px', padding: '32px 28px', boxShadow: '0 25px 60px rgba(0, 0, 0, 0.6), 0 0 30px rgba(229, 163, 30, 0.15)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '18px' }}>
          
          <img
            src="/assets/logo.jpg"
            alt="ตราสัญลักษณ์เต้าหมิง"
            style={{ width: '72px', height: '72px', borderRadius: '50%', border: '3px solid #E5A31E', boxShadow: '0 0 20px rgba(229, 163, 30, 0.3)' }}
          />

          <div style={{ textAlign: 'center' }}>
            <span style={{ fontSize: '0.72rem', fontFamily: 'monospace', fontWeight: 'bold', color: '#E5A31E', letterSpacing: '1px', textTransform: 'uppercase' }}>
              🏛️ DAO MING FOUNDATION · MEMBER & BACKOFFICE
            </span>
            <h2 style={{ fontSize: '1.35rem', fontWeight: 'bold', color: '#FFFFFF', margin: '4px 0 2px 0' }}>
              ระบบสมาชิกและจัดการหลังบ้าน
            </h2>
            <p style={{ fontSize: '0.8rem', color: 'rgba(250, 242, 221, 0.7)', margin: 0, lineHeight: 1.4 }}>
              โรงเรียนเต้าหมิง ตะกั่วป่า (มูลนิธิโรงเรียนเต้าหมิง)
            </p>
          </div>

          {/* Mode Switcher */}
          <div style={{ display: 'flex', width: '100%', backgroundColor: 'rgba(0, 0, 0, 0.35)', borderRadius: '12px', padding: '4px' }}>
            <button
              type="button"
              onClick={() => { setAuthMode('login'); setAuthError(''); }}
              style={{
                flex: 1,
                padding: '9px',
                borderRadius: '9px',
                border: 'none',
                backgroundColor: authMode === 'login' ? '#E5A31E' : 'transparent',
                color: authMode === 'login' ? '#122421' : '#FAF2DD',
                fontWeight: 'bold',
                fontSize: '0.82rem',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
            >
              🔑 เข้าสู่ระบบ (Log in)
            </button>
            <button
              type="button"
              onClick={() => { setAuthMode('register'); setAuthError(''); }}
              style={{
                flex: 1,
                padding: '9px',
                borderRadius: '9px',
                border: 'none',
                backgroundColor: authMode === 'register' ? '#E5A31E' : 'transparent',
                color: authMode === 'register' ? '#122421' : '#FAF2DD',
                fontWeight: 'bold',
                fontSize: '0.82rem',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
            >
              📝 สมัครสมาชิก (Register)
            </button>
          </div>

          {authError && (
            <div style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', backgroundColor: 'rgba(239, 68, 68, 0.15)', border: '1px solid rgba(239, 68, 68, 0.5)', color: '#FCA5A5', fontSize: '0.82rem', textAlign: 'center', fontWeight: '600' }}>
              ⚠️ {authError}
            </div>
          )}

          {feedbackMsg && (
            <div style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', backgroundColor: 'rgba(52, 211, 153, 0.15)', border: '1px solid #34D399', color: '#6EE7B7', fontSize: '0.82rem', textAlign: 'center', fontWeight: '600' }}>
              {feedbackMsg}
            </div>
          )}

          {/* ========================================================= */}
          {/* LOGIN FORM */}
          {/* ========================================================= */}
          {authMode === 'login' && (
            <form onSubmit={handleLogin} style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                <label style={{ fontSize: '0.78rem', fontWeight: 'bold', color: '#E5A31E' }}>
                  ชื่อผู้ใช้ (Username) *
                </label>
                <input
                  type="text"
                  required
                  placeholder="เช่น admin, officer_heritage"
                  value={usernameInput}
                  onChange={(e) => { setUsernameInput(e.target.value); if (authError) setAuthError(''); }}
                  style={{
                    width: '100%',
                    padding: '11px 14px',
                    borderRadius: '10px',
                    backgroundColor: 'rgba(255, 255, 255, 0.06)',
                    border: '1.5px solid rgba(229, 163, 30, 0.35)',
                    color: '#FFFFFF',
                    fontSize: '0.9rem',
                    outline: 'none',
                    boxSizing: 'border-box'
                  }}
                />
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                <label style={{ fontSize: '0.78rem', fontWeight: 'bold', color: '#E5A31E' }}>
                  รหัสผ่าน (Password) *
                </label>
                <div style={{ position: 'relative' }}>
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    placeholder="กรอกรหัสผ่าน"
                    value={passwordInput}
                    onChange={(e) => { setPasswordInput(e.target.value); if (authError) setAuthError(''); }}
                    style={{
                      width: '100%',
                      padding: '11px 42px 11px 14px',
                      borderRadius: '10px',
                      backgroundColor: 'rgba(255, 255, 255, 0.06)',
                      border: '1.5px solid rgba(229, 163, 30, 0.35)',
                      color: '#FFFFFF',
                      fontSize: '0.9rem',
                      outline: 'none',
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
                  >
                    {showPassword ? "🙈" : "👁️"}
                  </button>
                </div>
              </div>

              {/* Super Admin Fast Login Helper Pill */}
              <div style={{ backgroundColor: 'rgba(229, 163, 30, 0.08)', border: '1px dashed rgba(229, 163, 30, 0.3)', borderRadius: '10px', padding: '8px 12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '0.74rem', color: 'rgba(250, 242, 221, 0.8)' }}>
                  👑 บัญชี Admin สูงสุด: <strong style={{ color: '#E5A31E' }}>admin</strong>
                </span>
                <button
                  type="button"
                  onClick={() => {
                    setUsernameInput('admin');
                    setPasswordInput('takuapa2569');
                  }}
                  style={{
                    backgroundColor: 'rgba(229, 163, 30, 0.2)',
                    border: '1px solid #E5A31E',
                    color: '#E5A31E',
                    padding: '3px 8px',
                    borderRadius: '6px',
                    fontSize: '0.72rem',
                    fontWeight: 'bold',
                    cursor: 'pointer'
                  }}
                >
                  คลิกกรอกอัตโนมัติ
                </button>
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
                  transition: 'all 0.2s ease',
                  marginTop: '4px'
                }}
              >
                🔓 เข้าสู่ระบบ (Log in)
              </button>
            </form>
          )}

          {/* ========================================================= */}
          {/* REGISTER FORM */}
          {/* ========================================================= */}
          {authMode === 'register' && (
            <form onSubmit={handleRegister} style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <label style={{ fontSize: '0.76rem', fontWeight: 'bold', color: '#E5A31E' }}>
                  ชื่อ-นามสกุล *
                </label>
                <input
                  type="text"
                  required
                  placeholder="เช่น คุณกนกพล ตะกั่วป่า"
                  value={registerForm.full_name}
                  onChange={(e) => setRegisterForm({ ...registerForm, full_name: e.target.value })}
                  style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', backgroundColor: 'rgba(255, 255, 255, 0.06)', border: '1px solid rgba(229, 163, 30, 0.3)', color: '#FFF', fontSize: '0.85rem', outline: 'none', boxSizing: 'border-box' }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.76rem', fontWeight: 'bold', color: '#E5A31E', marginBottom: '4px' }}>
                    ชื่อผู้ใช้ (Username) *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="เช่น somchai2026"
                    value={registerForm.username}
                    onChange={(e) => setRegisterForm({ ...registerForm, username: e.target.value.toLowerCase().replace(/[^a-z0-9_]/g, '') })}
                    style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', backgroundColor: 'rgba(255, 255, 255, 0.06)', border: '1px solid rgba(229, 163, 30, 0.3)', color: '#FFF', fontSize: '0.85rem', outline: 'none', boxSizing: 'border-box' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.76rem', fontWeight: 'bold', color: '#E5A31E', marginBottom: '4px' }}>
                    เบอร์โทรศัพท์ *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="081-xxx-xxxx"
                    value={registerForm.phone}
                    onChange={(e) => setRegisterForm({ ...registerForm, phone: e.target.value })}
                    style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', backgroundColor: 'rgba(255, 255, 255, 0.06)', border: '1px solid rgba(229, 163, 30, 0.3)', color: '#FFF', fontSize: '0.85rem', outline: 'none', boxSizing: 'border-box' }}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.76rem', fontWeight: 'bold', color: '#E5A31E', marginBottom: '4px' }}>
                    รหัสผ่าน *
                  </label>
                  <input
                    type="password"
                    required
                    placeholder="รหัสผ่านอย่างน้อย 4 ตัว"
                    value={registerForm.password}
                    onChange={(e) => setRegisterForm({ ...registerForm, password: e.target.value })}
                    style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', backgroundColor: 'rgba(255, 255, 255, 0.06)', border: '1px solid rgba(229, 163, 30, 0.3)', color: '#FFF', fontSize: '0.85rem', outline: 'none', boxSizing: 'border-box' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.76rem', fontWeight: 'bold', color: '#E5A31E', marginBottom: '4px' }}>
                    ยืนยันรหัสผ่าน *
                  </label>
                  <input
                    type="password"
                    required
                    placeholder="กรอกรหัสผ่านซ้ำ"
                    value={registerForm.confirmPassword}
                    onChange={(e) => setRegisterForm({ ...registerForm, confirmPassword: e.target.value })}
                    style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', backgroundColor: 'rgba(255, 255, 255, 0.06)', border: '1px solid rgba(229, 163, 30, 0.3)', color: '#FFF', fontSize: '0.85rem', outline: 'none', boxSizing: 'border-box' }}
                  />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.76rem', fontWeight: 'bold', color: '#E5A31E', marginBottom: '4px' }}>
                  ฝ่าย / องค์กร / สังกัด
                </label>
                <input
                  type="text"
                  placeholder="เช่น ฝ่ายสถานที่, ฝ่ายกิจกรรม, ศิษย์เก่า, ชุมชนตลาดใหญ่"
                  value={registerForm.department}
                  onChange={(e) => setRegisterForm({ ...registerForm, department: e.target.value })}
                  style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', backgroundColor: 'rgba(255, 255, 255, 0.06)', border: '1px solid rgba(229, 163, 30, 0.3)', color: '#FFF', fontSize: '0.85rem', outline: 'none', boxSizing: 'border-box' }}
                />
              </div>

              <div style={{ backgroundColor: 'rgba(255, 255, 255, 0.04)', borderRadius: '8px', padding: '8px 12px', fontSize: '0.72rem', color: 'rgba(250, 242, 221, 0.7)' }}>
                ℹ️ สมาชิกที่สมัครใหม่จะได้รับสถานะ <strong style={{ color: '#FCD34D' }}>"รออนุมัติ"</strong> เพื่อให้ <strong>Super Admin (admin)</strong> แต่งตั้งและอนุมัติสิทธิ์เข้าใช้งาน
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
                  transition: 'all 0.2s ease',
                  marginTop: '4px'
                }}
              >
                ✨ ส่งคำขอสมัครสมาชิก
              </button>
            </form>
          )}

          <div style={{ width: '100%', borderTop: '1px solid rgba(255, 255, 255, 0.08)', paddingTop: '14px', textAlign: 'center' }}>
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
            <img src="/assets/logo.jpg" alt="Logo" style={{ width: '48px', height: '48px', borderRadius: '50%', border: '2px solid #E5A31E' }} />
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
            {/* User Profile Chip */}
            {currentUser && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '6px 14px', borderRadius: '10px', backgroundColor: 'rgba(255, 255, 255, 0.07)', border: '1px solid rgba(229, 163, 30, 0.3)' }}>
                <div style={{ width: '28px', height: '28px', borderRadius: '50%', backgroundColor: currentUser.role === 'superadmin' ? '#E5A31E' : currentUser.role === 'officer' ? '#34D399' : currentUser.role === 'staff' ? '#38BDF8' : '#94A3B8', color: '#122421', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: '0.8rem' }}>
                  {currentUser.role === 'superadmin' ? '👑' : currentUser.role === 'officer' ? '🛡️' : currentUser.role === 'staff' ? '🎫' : '👤'}
                </div>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <span style={{ fontSize: '0.8rem', fontWeight: 'bold', color: '#FFFFFF' }}>
                    {currentUser.full_name}
                  </span>
                  <span style={{ fontSize: '0.68rem', color: currentUser.role === 'superadmin' ? '#E5A31E' : '#A7F3D0' }}>
                    @{currentUser.username} · {currentUser.role === 'superadmin' ? 'Super Admin' : currentUser.role === 'officer' ? 'เจ้าหน้าที่' : currentUser.role === 'staff' ? 'สตาฟฟ์' : 'สมาชิก'}
                  </span>
                </div>
              </div>
            )}

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
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '14px' }}>
          <div style={{ backgroundColor: 'rgba(255, 255, 255, 0.04)', border: '1px solid rgba(229, 163, 30, 0.3)', borderRadius: '14px', padding: '16px' }}>
            <span style={{ fontSize: '0.75rem', color: 'rgba(250, 242, 221, 0.6)', display: 'block', marginBottom: '4px' }}>👥 สมาชิก & ผู้ใช้</span>
            <div style={{ fontSize: '1.8rem', fontWeight: 'bold', color: '#E5A31E', fontFamily: 'monospace' }}>
              {usersList.length} <span style={{ fontSize: '0.85rem', fontWeight: 'normal', color: 'rgba(250, 242, 221, 0.5)' }}>ท่าน</span>
            </div>
          </div>

          <div style={{ backgroundColor: 'rgba(255, 255, 255, 0.04)', border: '1px solid rgba(229, 163, 30, 0.3)', borderRadius: '14px', padding: '16px' }}>
            <span style={{ fontSize: '0.75rem', color: 'rgba(250, 242, 221, 0.6)', display: 'block', marginBottom: '4px' }}>📅 กิจกรรม</span>
            <div style={{ fontSize: '1.8rem', fontWeight: 'bold', color: '#E5A31E', fontFamily: 'monospace' }}>
              {events.length} <span style={{ fontSize: '0.85rem', fontWeight: 'normal', color: 'rgba(250, 242, 221, 0.5)' }}>รายการ</span>
            </div>
          </div>

          <div style={{ backgroundColor: 'rgba(255, 255, 255, 0.04)', border: '1px solid rgba(229, 163, 30, 0.3)', borderRadius: '14px', padding: '16px' }}>
            <span style={{ fontSize: '0.75rem', color: 'rgba(250, 242, 221, 0.6)', display: 'block', marginBottom: '4px' }}>🖼️ คลังภาพ</span>
            <div style={{ fontSize: '1.8rem', fontWeight: 'bold', color: '#F59E0B', fontFamily: 'monospace' }}>
              {archivePhotos.length} <span style={{ fontSize: '0.85rem', fontWeight: 'normal', color: 'rgba(250, 242, 221, 0.5)' }}>ภาพ</span>
            </div>
          </div>

          <div style={{ backgroundColor: 'rgba(255, 255, 255, 0.04)', border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '14px', padding: '16px' }}>
            <span style={{ fontSize: '0.75rem', color: 'rgba(250, 242, 221, 0.6)', display: 'block', marginBottom: '4px' }}>🎟️ ตั๋วกิจกรรม</span>
            <div style={{ fontSize: '1.8rem', fontWeight: 'bold', color: '#FCD34D', fontFamily: 'monospace' }}>
              {bookings.length} <span style={{ fontSize: '0.85rem', fontWeight: 'normal', color: 'rgba(250, 242, 221, 0.5)' }}>รายการ</span>
            </div>
          </div>

          <div style={{ backgroundColor: 'rgba(255, 255, 255, 0.04)', border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '14px', padding: '16px' }}>
            <span style={{ fontSize: '0.75rem', color: 'rgba(250, 242, 221, 0.6)', display: 'block', marginBottom: '4px' }}>✅ Check-in</span>
            <div style={{ fontSize: '1.8rem', fontWeight: 'bold', color: '#34D399', fontFamily: 'monospace' }}>
              {checkedInCount} <span style={{ fontSize: '0.85rem', fontWeight: 'normal', color: 'rgba(250, 242, 221, 0.5)' }}>/ {bookings.length}</span>
            </div>
          </div>

          <div style={{ backgroundColor: 'rgba(255, 255, 255, 0.04)', border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '14px', padding: '16px' }}>
            <span style={{ fontSize: '0.75rem', color: 'rgba(250, 242, 221, 0.6)', display: 'block', marginBottom: '4px' }}>🏛️ คำขอพื้นที่</span>
            <div style={{ fontSize: '1.8rem', fontWeight: 'bold', color: '#C44D27', fontFamily: 'monospace' }}>
              {pendingProposalsCount} <span style={{ fontSize: '0.85rem', fontWeight: 'normal', color: 'rgba(250, 242, 221, 0.5)' }}>/ {spaceProposals.length}</span>
            </div>
          </div>

          <div style={{ backgroundColor: 'rgba(255, 255, 255, 0.04)', border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '14px', padding: '16px' }}>
            <span style={{ fontSize: '0.75rem', color: 'rgba(250, 242, 221, 0.6)', display: 'block', marginBottom: '4px' }}>💡 ไอเดีย</span>
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
              backgroundColor: activeTab === 'users' ? '#E5A31E' : 'rgba(255, 255, 255, 0.06)',
              color: activeTab === 'users' ? '#122421' : '#FAF2DD',
              transition: 'all 0.2s ease',
              boxShadow: activeTab === 'users' ? '0 2px 10px rgba(229, 163, 30, 0.3)' : 'none'
            }}
            onClick={() => setActiveTab('users')}
          >
            👥 สมาชิก & สิทธิ์ ({usersList.length})
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
              backgroundColor: activeTab === 'events' ? '#E5A31E' : 'rgba(255, 255, 255, 0.06)',
              color: activeTab === 'events' ? '#122421' : '#FAF2DD',
              transition: 'all 0.2s ease'
            }}
            onClick={() => setActiveTab('events')}
          >
            📅 จัดการกิจกรรม ({events.length})
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
              backgroundColor: activeTab === 'archive' ? '#E5A31E' : 'rgba(255, 255, 255, 0.06)',
              color: activeTab === 'archive' ? '#122421' : '#FAF2DD',
              transition: 'all 0.2s ease'
            }}
            onClick={() => setActiveTab('archive')}
          >
            🖼️ คลังภาพ & เรื่องเล่า ({archivePhotos.length})
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
              backgroundColor: activeTab === 'site_copy' ? '#E5A31E' : 'rgba(255, 255, 255, 0.06)',
              color: activeTab === 'site_copy' ? '#122421' : '#FAF2DD',
              transition: 'all 0.2s ease'
            }}
            onClick={() => setActiveTab('site_copy')}
          >
            📝 ข้อความ & เนื้อหาเว็บ
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
            🎫 สแกนตั๋ว & รายชื่อ ({bookings.length})
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
            🏛️ จองพื้นที่ & อนุมัติ ({spaceProposals.length})
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
            💡 ไอเดียชุมชน ({ideas.length})
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

        {/* ========================================================================= */}
        {/* TAB: USER & MEMBER MANAGEMENT */}
        {/* ========================================================================= */}
        {activeTab === 'users' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {/* Header & Controls Bar */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '14px', backgroundColor: 'rgba(255, 255, 255, 0.03)', border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: '16px', padding: '18px 24px' }}>
              <div>
                <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#E5A31E', margin: '0 0 4px 0' }}>
                  👥 จัดการสมาชิก & สิทธิ์การเข้าใช้งาน (Member & Role Management)
                </h2>
                <p style={{ fontSize: '0.82rem', color: 'rgba(250, 242, 221, 0.7)', margin: 0 }}>
                  Super Admin (admin/takuapa2569) มีสิทธิ์แต่งตั้งสิทธิ์ อนุมัติผู้สมัครใหม่ และกำหนดบทบาทผู้ใช้งานในระบบ
                </p>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
                <button
                  onClick={handleResetUsers}
                  style={{
                    padding: '9px 16px',
                    borderRadius: '8px',
                    backgroundColor: 'rgba(255, 255, 255, 0.06)',
                    border: '1px solid rgba(255, 255, 255, 0.15)',
                    color: '#FAF2DD',
                    fontSize: '0.8rem',
                    cursor: 'pointer'
                  }}
                  title="คืนค่าสมาชิกตั้งต้น"
                >
                  🔄 คืนค่าเริ่มต้น
                </button>

                <button
                  onClick={handleOpenAddUser}
                  style={{
                    padding: '9px 18px',
                    borderRadius: '8px',
                    backgroundColor: '#E5A31E',
                    border: 'none',
                    color: '#122421',
                    fontWeight: 'bold',
                    fontSize: '0.82rem',
                    cursor: 'pointer',
                    boxShadow: '0 4px 15px rgba(229, 163, 30, 0.3)'
                  }}
                >
                  ➕ เพิ่มสมาชิกใหม่
                </button>
              </div>
            </div>

            {/* Role Stat Breakdown Cards */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '12px' }}>
              <div style={{ backgroundColor: 'rgba(229, 163, 30, 0.08)', border: '1px solid rgba(229, 163, 30, 0.3)', borderRadius: '12px', padding: '14px' }}>
                <span style={{ fontSize: '0.74rem', color: '#E5A31E', fontWeight: 'bold', display: 'block' }}>👑 Super Admin (สูงสุด)</span>
                <div style={{ fontSize: '1.6rem', fontWeight: 'bold', color: '#FFF' }}>
                  {usersList.filter(u => u.role === 'superadmin').length} <span style={{ fontSize: '0.8rem', fontWeight: 'normal', color: 'rgba(255,255,255,0.6)' }}>ท่าน</span>
                </div>
              </div>

              <div style={{ backgroundColor: 'rgba(52, 211, 153, 0.08)', border: '1px solid rgba(52, 211, 153, 0.3)', borderRadius: '12px', padding: '14px' }}>
                <span style={{ fontSize: '0.74rem', color: '#34D399', fontWeight: 'bold', display: 'block' }}>🛡️ Officer (เจ้าหน้าที่มรดก)</span>
                <div style={{ fontSize: '1.6rem', fontWeight: 'bold', color: '#FFF' }}>
                  {usersList.filter(u => u.role === 'officer').length} <span style={{ fontSize: '0.8rem', fontWeight: 'normal', color: 'rgba(255,255,255,0.6)' }}>ท่าน</span>
                </div>
              </div>

              <div style={{ backgroundColor: 'rgba(56, 189, 248, 0.08)', border: '1px solid rgba(56, 189, 248, 0.3)', borderRadius: '12px', padding: '14px' }}>
                <span style={{ fontSize: '0.74rem', color: '#38BDF8', fontWeight: 'bold', display: 'block' }}>🎫 Staff (เจ้าหน้าที่ตั๋ว/ต้อนรับ)</span>
                <div style={{ fontSize: '1.6rem', fontWeight: 'bold', color: '#FFF' }}>
                  {usersList.filter(u => u.role === 'staff').length} <span style={{ fontSize: '0.8rem', fontWeight: 'normal', color: 'rgba(255,255,255,0.6)' }}>ท่าน</span>
                </div>
              </div>

              <div style={{ backgroundColor: 'rgba(251, 191, 36, 0.08)', border: '1px solid rgba(251, 191, 36, 0.3)', borderRadius: '12px', padding: '14px' }}>
                <span style={{ fontSize: '0.74rem', color: '#FCD34D', fontWeight: 'bold', display: 'block' }}>⏳ รออนุมัติสิทธิ์ (Pending)</span>
                <div style={{ fontSize: '1.6rem', fontWeight: 'bold', color: '#FFF' }}>
                  {usersList.filter(u => u.status === 'pending').length} <span style={{ fontSize: '0.8rem', fontWeight: 'normal', color: 'rgba(255,255,255,0.6)' }}>ท่าน</span>
                </div>
              </div>
            </div>

            {/* Filter and Search Bar */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', alignItems: 'center', backgroundColor: 'rgba(255, 255, 255, 0.02)', padding: '14px', borderRadius: '12px', border: '1px solid rgba(255, 255, 255, 0.08)' }}>
              <div style={{ flex: 1, minWidth: '240px' }}>
                <input
                  type="text"
                  placeholder="🔍 ค้นหาชื่อ, Username, เบอร์โทร, หรือฝ่าย..."
                  value={userSearch}
                  onChange={(e) => setUserSearch(e.target.value)}
                  style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', backgroundColor: 'rgba(255, 255, 255, 0.06)', border: '1px solid rgba(255, 255, 255, 0.15)', color: '#FFF', fontSize: '0.85rem', outline: 'none', boxSizing: 'border-box' }}
                />
              </div>

              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                <select
                  value={userRoleFilter}
                  onChange={(e) => setUserRoleFilter(e.target.value)}
                  style={{ padding: '10px 12px', borderRadius: '8px', backgroundColor: 'rgba(255, 255, 255, 0.06)', border: '1px solid rgba(255, 255, 255, 0.2)', color: '#FAF2DD', fontSize: '0.82rem', outline: 'none' }}
                >
                  <option value="all" style={{ background: '#122421' }}>🎭 ทุกระดับสิทธิ์ (All Roles)</option>
                  <option value="superadmin" style={{ background: '#122421' }}>👑 Super Admin</option>
                  <option value="officer" style={{ background: '#122421' }}>🛡️ Officer (เจ้าหน้าที่)</option>
                  <option value="staff" style={{ background: '#122421' }}>🎫 Staff (สตาฟฟ์)</option>
                  <option value="member" style={{ background: '#122421' }}>👤 Member (สมาชิกทั่วไป)</option>
                </select>

                <select
                  value={userStatusFilter}
                  onChange={(e) => setUserStatusFilter(e.target.value)}
                  style={{ padding: '10px 12px', borderRadius: '8px', backgroundColor: 'rgba(255, 255, 255, 0.06)', border: '1px solid rgba(255, 255, 255, 0.2)', color: '#FAF2DD', fontSize: '0.82rem', outline: 'none' }}
                >
                  <option value="all" style={{ background: '#122421' }}>🚦 ทุกสถานะ (All Status)</option>
                  <option value="active" style={{ background: '#122421' }}>✅ ใช้งานได้ (Active)</option>
                  <option value="pending" style={{ background: '#122421' }}>⏳ รออนุมัติ (Pending)</option>
                  <option value="suspended" style={{ background: '#122421' }}>⛔ ระงับการใช้งาน (Suspended)</option>
                </select>
              </div>
            </div>

            {/* Users Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '16px' }}>
              {usersList
                .filter(u => {
                  const matchSearch = !userSearch ||
                    u.full_name.toLowerCase().includes(userSearch.toLowerCase()) ||
                    u.username.toLowerCase().includes(userSearch.toLowerCase()) ||
                    (u.phone && u.phone.includes(userSearch)) ||
                    (u.email && u.email.toLowerCase().includes(userSearch.toLowerCase())) ||
                    (u.department && u.department.toLowerCase().includes(userSearch.toLowerCase()));
                  const matchRole = userRoleFilter === 'all' || u.role === userRoleFilter;
                  const matchStatus = userStatusFilter === 'all' || u.status === userStatusFilter;
                  return matchSearch && matchRole && matchStatus;
                })
                .map(user => {
                  const isPrimaryAdmin = user.username === 'admin';
                  const isCurrentLoggedUser = currentUser?.id === user.id;

                  return (
                    <div
                      key={user.id}
                      style={{
                        backgroundColor: 'rgba(255, 255, 255, 0.03)',
                        border: user.status === 'pending'
                          ? '1.5px solid #F59E0B'
                          : user.role === 'superadmin'
                            ? '1.5px solid rgba(229, 163, 30, 0.5)'
                            : '1px solid rgba(255, 255, 255, 0.1)',
                        borderRadius: '16px',
                        padding: '20px',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        gap: '14px',
                        boxShadow: user.role === 'superadmin' ? '0 4px 20px rgba(229, 163, 30, 0.12)' : 'none',
                        position: 'relative'
                      }}
                    >
                      {/* Top Row: User Avatar & Role */}
                      <div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '10px', marginBottom: '12px' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                            <div
                              style={{
                                width: '44px',
                                height: '44px',
                                borderRadius: '50%',
                                backgroundColor: user.role === 'superadmin' ? '#E5A31E' : user.role === 'officer' ? '#34D399' : user.role === 'staff' ? '#38BDF8' : '#64748B',
                                color: '#122421',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontWeight: 'bold',
                                fontSize: '1.2rem',
                                boxShadow: '0 2px 10px rgba(0,0,0,0.3)'
                              }}
                            >
                              {user.role === 'superadmin' ? '👑' : user.role === 'officer' ? '🛡️' : user.role === 'staff' ? '🎫' : '👤'}
                            </div>
                            <div>
                              <h3 style={{ fontSize: '1.05rem', fontWeight: 'bold', color: '#FFF', margin: '0 0 2px 0' }}>
                                {user.full_name} {isCurrentLoggedUser && <span style={{ fontSize: '0.7rem', color: '#E5A31E' }}>(คุณ)</span>}
                              </h3>
                              <span style={{ fontSize: '0.78rem', color: '#E5A31E', fontFamily: 'monospace' }}>
                                @{user.username}
                              </span>
                            </div>
                          </div>

                          {/* Status Badge */}
                          <div>
                            {user.status === 'active' && (
                              <span style={{ padding: '3px 8px', borderRadius: '6px', backgroundColor: 'rgba(52, 211, 153, 0.15)', border: '1px solid #34D399', color: '#6EE7B7', fontSize: '0.72rem', fontWeight: 'bold' }}>
                                ✅ ใช้งานได้
                              </span>
                            )}
                            {user.status === 'pending' && (
                              <span style={{ padding: '3px 8px', borderRadius: '6px', backgroundColor: 'rgba(245, 158, 11, 0.2)', border: '1px solid #F59E0B', color: '#FCD34D', fontSize: '0.72rem', fontWeight: 'bold' }}>
                                ⏳ รออนุมัติ
                              </span>
                            )}
                            {user.status === 'suspended' && (
                              <span style={{ padding: '3px 8px', borderRadius: '6px', backgroundColor: 'rgba(239, 68, 68, 0.2)', border: '1px solid #EF4444', color: '#FCA5A5', fontSize: '0.72rem', fontWeight: 'bold' }}>
                                ⛔ ระงับชั่วคราว
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Role Pill */}
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
                          <span
                            style={{
                              padding: '4px 10px',
                              borderRadius: '6px',
                              backgroundColor: user.role === 'superadmin' ? 'rgba(229, 163, 30, 0.2)' : user.role === 'officer' ? 'rgba(52, 211, 153, 0.2)' : user.role === 'staff' ? 'rgba(56, 189, 248, 0.2)' : 'rgba(255, 255, 255, 0.08)',
                              border: `1px solid ${user.role === 'superadmin' ? '#E5A31E' : user.role === 'officer' ? '#34D399' : user.role === 'staff' ? '#38BDF8' : 'rgba(255, 255, 255, 0.2)'}`,
                              color: user.role === 'superadmin' ? '#E5A31E' : user.role === 'officer' ? '#A7F3D0' : user.role === 'staff' ? '#BAE6FD' : '#E2E8F0',
                              fontSize: '0.76rem',
                              fontWeight: 'bold'
                            }}
                          >
                            {user.role === 'superadmin' ? '👑 ผู้ดูแลระบบสูงสุด (Super Admin)' : user.role === 'officer' ? '🛡️ เจ้าหน้าที่มรดก (Officer)' : user.role === 'staff' ? '🎫 เจ้าหน้าที่ต้อนรับ & สแกนตั๋ว (Staff)' : '👤 สมาชิกทั่วไป (Member)'}
                          </span>
                        </div>

                        {/* Metadata Details */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', fontSize: '0.78rem', color: 'rgba(250, 242, 221, 0.75)' }}>
                          {user.department && (
                            <div>
                              <span style={{ color: '#E5A31E' }}>🏢 ฝ่าย/สังกัด:</span> {user.department}
                            </div>
                          )}
                          {user.phone && (
                            <div>
                              <span style={{ color: '#E5A31E' }}>📞 เบอร์โทร:</span> {user.phone}
                            </div>
                          )}
                          {user.email && (
                            <div>
                              <span style={{ color: '#E5A31E' }}>✉️ อีเมล:</span> {user.email}
                            </div>
                          )}
                          {user.notes && (
                            <div style={{ fontStyle: 'italic', color: 'rgba(250, 242, 221, 0.6)' }}>
                              💬 {user.notes}
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Action Buttons Toolbar */}
                      <div style={{ paddingTop: '12px', borderTop: '1px solid rgba(255, 255, 255, 0.08)', display: 'flex', flexWrap: 'wrap', gap: '6px', justifyContent: 'flex-end' }}>
                        {/* If Pending: Approve button */}
                        {user.status === 'pending' && (
                          <button
                            onClick={() => handleApproveUser(user)}
                            style={{ padding: '6px 12px', borderRadius: '6px', backgroundColor: '#34D399', color: '#122421', border: 'none', fontSize: '0.76rem', fontWeight: 'bold', cursor: 'pointer' }}
                          >
                            ✅ อนุมัติสิทธิ์
                          </button>
                        )}

                        {/* Toggle Suspend (except for primary admin) */}
                        {!isPrimaryAdmin && user.status !== 'pending' && (
                          <button
                            onClick={() => handleToggleSuspendUser(user)}
                            style={{
                              padding: '6px 10px',
                              borderRadius: '6px',
                              backgroundColor: user.status === 'suspended' ? 'rgba(52, 211, 153, 0.15)' : 'rgba(239, 68, 68, 0.15)',
                              border: `1px solid ${user.status === 'suspended' ? '#34D399' : '#EF4444'}`,
                              color: user.status === 'suspended' ? '#6EE7B7' : '#FCA5A5',
                              fontSize: '0.74rem',
                              cursor: 'pointer'
                            }}
                          >
                            {user.status === 'suspended' ? '▶️ ปลดระงับ' : '⏸️ ระงับ'}
                          </button>
                        )}

                        {/* Change Role Button (Super Admin Power) */}
                        {!isPrimaryAdmin && (
                          <button
                            onClick={() => handleOpenRoleModal(user)}
                            style={{ padding: '6px 10px', borderRadius: '6px', backgroundColor: 'rgba(229, 163, 30, 0.15)', border: '1px solid rgba(229, 163, 30, 0.4)', color: '#E5A31E', fontSize: '0.74rem', fontWeight: 'bold', cursor: 'pointer' }}
                          >
                            👑 แต่งตั้งสิทธิ์
                          </button>
                        )}

                        {/* Reset Password Button */}
                        <button
                          onClick={() => handleOpenPasswordReset(user)}
                          style={{ padding: '6px 10px', borderRadius: '6px', backgroundColor: 'rgba(255, 255, 255, 0.08)', border: '1px solid rgba(255, 255, 255, 0.15)', color: '#FAF2DD', fontSize: '0.74rem', cursor: 'pointer' }}
                        >
                          🔑 รหัสผ่าน
                        </button>

                        {/* Edit Info */}
                        <button
                          onClick={() => handleOpenEditUser(user)}
                          style={{ padding: '6px 10px', borderRadius: '6px', backgroundColor: 'rgba(255, 255, 255, 0.08)', border: '1px solid rgba(255, 255, 255, 0.15)', color: '#FAF2DD', fontSize: '0.74rem', cursor: 'pointer' }}
                        >
                          ✏️ แก้ไข
                        </button>

                        {/* Delete User (disabled for admin) */}
                        {!isPrimaryAdmin && (
                          <button
                            onClick={() => handleDeleteUser(user)}
                            style={{ padding: '6px 10px', borderRadius: '6px', backgroundColor: 'rgba(239, 68, 68, 0.12)', border: '1px solid rgba(239, 68, 68, 0.3)', color: '#FCA5A5', fontSize: '0.74rem', cursor: 'pointer' }}
                          >
                            🗑️ ลบ
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        )}

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

        {/* TAB ARCHIVE: HISTORIC PHOTOS & STORIES MANAGEMENT */}
        {activeTab === 'archive' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '14px', backgroundColor: 'rgba(255, 255, 255, 0.03)', border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: '16px', padding: '18px 24px' }}>
              <div>
                <h2 style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#E5A31E', margin: '0 0 4px 0' }}>
                  🖼️ จัดการคลังภาพถ่ายและเรื่องเล่าประวัติศาสตร์ (Archive Photos & Stories)
                </h2>
                <p style={{ fontSize: '0.82rem', color: 'rgba(250, 242, 221, 0.7)', margin: 0 }}>
                  คุณสามารถเพิ่มภาพถ่ายประวัติศาสตร์ใหม่ แก้ไขคำบรรยาย หรือเปลี่ยนปี พ.ศ. ได้โดยตรง ข้อมูลจะอัปเดตลงบนหน้าเว็บคลังภาพทันที
                </p>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
                <button
                  onClick={handleResetArchivePhotos}
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
                  title="คืนค่าภาพถ่ายประวัติศาสตร์เริ่มต้นทั้งหมด ๑๓ ภาพ"
                >
                  🔄 คืนค่า ๑๓ ภาพเริ่มต้น
                </button>

                <button
                  onClick={handleOpenCreateArchivePhoto}
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
                  ➕ เพิ่มภาพประวัติศาสตร์ใหม่
                </button>
              </div>
            </div>

            {/* Archive Photos Grid in Admin */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '16px' }}>
              {archivePhotos.map((photo, index) => {
                const categoryLabel = photo.category === 'diplomacy'
                  ? '🏛️ การทูต & อาคาร'
                  : photo.category === 'school'
                  ? '📚 ครู & นักเรียน'
                  : photo.category === 'sports'
                  ? '🏀 ทีมบาสเกตบอล'
                  : '📜 เรื่องเล่าชุมชน';

                return (
                  <div
                    key={photo.id}
                    style={{
                      backgroundColor: 'rgba(255, 255, 255, 0.03)',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      borderRadius: '16px',
                      overflow: 'hidden',
                      display: 'flex',
                      flexDirection: 'column',
                      transition: 'all 0.2s ease',
                      boxShadow: '0 4px 20px rgba(0,0,0,0.2)'
                    }}
                  >
                    <div style={{ position: 'relative', height: '170px', backgroundColor: '#1A2826', overflow: 'hidden' }}>
                      <img
                        src={photo.src}
                        alt={photo.title_th}
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        onError={(e: any) => { e.target.src = '/img/building-community.jpg'; }}
                      />
                      <span
                        style={{
                          position: 'absolute',
                          top: '10px',
                          left: '10px',
                          backgroundColor: 'rgba(18, 36, 33, 0.85)',
                          border: '1px solid rgba(229, 163, 30, 0.4)',
                          color: '#E5A31E',
                          padding: '3px 10px',
                          borderRadius: '999px',
                          fontSize: '0.72rem',
                          fontWeight: 'bold',
                          fontFamily: 'monospace'
                        }}
                      >
                        {photo.tag_th || `ภาพที่ ${index + 1}`}
                      </span>
                      <span
                        style={{
                          position: 'absolute',
                          top: '10px',
                          right: '10px',
                          backgroundColor: 'rgba(0, 0, 0, 0.75)',
                          color: '#FAF2DD',
                          padding: '3px 8px',
                          borderRadius: '6px',
                          fontSize: '0.7rem'
                        }}
                      >
                        {categoryLabel}
                      </span>
                    </div>

                    <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', flexGrow: 1, gap: '8px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '8px' }}>
                        <h3 style={{ fontSize: '1.05rem', fontWeight: 'bold', color: '#FFF', margin: 0, lineHeight: 1.3 }}>
                          {photo.title_th}
                        </h3>
                        <span style={{ fontSize: '0.75rem', color: 'rgba(250, 242, 221, 0.4)', fontFamily: 'monospace' }}>#{photo.id}</span>
                      </div>

                      {photo.title_en && (
                        <div style={{ fontSize: '0.8rem', color: '#E5A31E', fontStyle: 'italic' }}>
                          {photo.title_en}
                        </div>
                      )}

                      <p style={{ fontSize: '0.82rem', color: 'rgba(250, 242, 221, 0.75)', margin: '4px 0 10px 0', lineHeight: 1.5, flexGrow: 1 }}>
                        {photo.caption_th || 'ไม่มีคำบรรยาย'}
                      </p>

                      <div style={{ display: 'flex', gap: '8px', paddingTop: '10px', borderTop: '1px solid rgba(255, 255, 255, 0.08)' }}>
                        <button
                          onClick={() => handleOpenEditArchivePhoto(photo)}
                          style={{
                            flex: 1,
                            padding: '8px 12px',
                            borderRadius: '8px',
                            backgroundColor: 'rgba(229, 163, 30, 0.15)',
                            border: '1px solid rgba(229, 163, 30, 0.4)',
                            color: '#E5A31E',
                            fontSize: '0.8rem',
                            fontWeight: 'bold',
                            cursor: 'pointer',
                            transition: 'all 0.2s ease'
                          }}
                        >
                          ✏️ แก้ไข
                        </button>
                        <button
                          onClick={() => handleDeleteArchivePhoto(photo.id, photo.title_th)}
                          style={{
                            padding: '8px 12px',
                            borderRadius: '8px',
                            backgroundColor: 'rgba(239, 68, 68, 0.15)',
                            border: '1px solid rgba(239, 68, 68, 0.3)',
                            color: '#FCA5A5',
                            fontSize: '0.8rem',
                            cursor: 'pointer',
                            transition: 'all 0.2s ease'
                          }}
                        >
                          🗑️ ลบ
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* TAB: SITE COPY & CONTENT CMS */}
        {activeTab === 'site_copy' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            {/* Top Info & Quick Actions Banner */}
            <div style={{ backgroundColor: 'rgba(229, 163, 30, 0.08)', border: '1.5px solid rgba(229, 163, 30, 0.3)', borderRadius: '16px', padding: '20px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
              <div>
                <span style={{ fontSize: '0.72rem', color: '#E5A31E', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 'bold', display: 'block', marginBottom: '2px' }}>
                  ✍️ SITE-WIDE CONTENT & ARCHITECTURE CMS
                </span>
                <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#FAF2DD', margin: '0 0 4px 0' }}>
                  จัดการข้อความและเนื้อหาทั้งหมดในเว็บไซต์
                </h2>
                <p style={{ fontSize: '0.82rem', color: 'rgba(250, 242, 221, 0.7)', margin: 0 }}>
                  แก้ไขสโลแกน, หัวข้อหน้าแรก, ปรัชญาหน้าจั่ว ๕ สัญลักษณ์, ประวัติศาสตร์ ๔ ยุค, และข้อมูลติดต่อ (ข้อมูลบันทึกถาวร ไม่สูญหายเมื่อ Push Git)
                </p>
              </div>

              <div style={{ display: 'flex', gap: '10px' }}>
                <button
                  type="button"
                  onClick={handleResetSiteCopy}
                  style={{
                    padding: '9px 16px',
                    borderRadius: '8px',
                    backgroundColor: 'rgba(255, 255, 255, 0.08)',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    color: '#FAF2DD',
                    fontSize: '0.8rem',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px'
                  }}
                >
                  <span>🔄</span>
                  <span>คืนค่าเริ่มต้น</span>
                </button>

                <button
                  type="button"
                  onClick={handleSaveSiteCopy}
                  style={{
                    padding: '9px 20px',
                    borderRadius: '8px',
                    backgroundColor: '#E5A31E',
                    color: '#122421',
                    fontSize: '0.82rem',
                    fontWeight: 'bold',
                    border: 'none',
                    cursor: 'pointer',
                    boxShadow: '0 4px 15px rgba(229, 163, 30, 0.35)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px'
                  }}
                >
                  <span>💾</span>
                  <span>บันทึกข้อความทั้งหมด</span>
                </button>
              </div>
            </div>

            <form onSubmit={handleSaveSiteCopy} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              
              {/* SECTION 1: HERO SECTION */}
              <div style={{ backgroundColor: 'rgba(255, 255, 255, 0.03)', border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '16px', padding: '24px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '18px', paddingBottom: '12px', borderBottom: '1px solid rgba(255, 255, 255, 0.08)' }}>
                  <span style={{ fontSize: '1.4rem' }}>🌟</span>
                  <div>
                    <h3 style={{ fontSize: '1.05rem', fontWeight: 'bold', color: '#E5A31E', margin: 0 }}>
                      ข้อความหน้าแรก & ป้ายสโลแกน (Hero Section)
                    </h3>
                    <span style={{ fontSize: '0.75rem', color: 'rgba(250, 242, 221, 0.6)' }}>
                      ปรับแต่งป้ายรางวัล ASA, สโลแกนโรงเรียนจีนแห่งแรก, หัวข้อใหญ่ และคำบรรยายความเป็นมา
                    </span>
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '16px', marginBottom: '16px' }}>
                  {/* Award Ribbon */}
                  <div>
                    <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 'bold', color: '#E5A31E', marginBottom: '6px' }}>
                      🏆 ข้อความป้ายรางวัล ASA (ภาษาไทย)
                    </label>
                    <input
                      type="text"
                      value={siteCopy.hero_award_th || ''}
                      onChange={e => setSiteCopy({ ...siteCopy, hero_award_th: e.target.value })}
                      style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', backgroundColor: 'rgba(255, 255, 255, 0.06)', border: '1px solid rgba(255, 255, 255, 0.2)', color: '#FFF', fontSize: '0.85rem', outline: 'none', boxSizing: 'border-box' }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 'bold', color: '#E5A31E', marginBottom: '6px' }}>
                      🏆 ข้อความป้ายรางวัล (ภาษาอังกฤษ)
                    </label>
                    <input
                      type="text"
                      value={siteCopy.hero_award_en || ''}
                      onChange={e => setSiteCopy({ ...siteCopy, hero_award_en: e.target.value })}
                      style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', backgroundColor: 'rgba(255, 255, 255, 0.06)', border: '1px solid rgba(255, 255, 255, 0.2)', color: '#FFF', fontSize: '0.85rem', outline: 'none', boxSizing: 'border-box' }}
                    />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '16px', marginBottom: '16px' }}>
                  {/* Badge */}
                  <div>
                    <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 'bold', color: '#E5A31E', marginBottom: '6px' }}>
                      🏷️ ข้อความป้ายสโลแกน (ภาษาไทย)
                    </label>
                    <input
                      type="text"
                      value={siteCopy.hero_badge_th || ''}
                      onChange={e => setSiteCopy({ ...siteCopy, hero_badge_th: e.target.value })}
                      style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', backgroundColor: 'rgba(255, 255, 255, 0.06)', border: '1px solid rgba(255, 255, 255, 0.2)', color: '#FFF', fontSize: '0.85rem', outline: 'none', boxSizing: 'border-box' }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 'bold', color: '#E5A31E', marginBottom: '6px' }}>
                      🏷️ ข้อความป้ายสโลแกน (ภาษาอังกฤษ)
                    </label>
                    <input
                      type="text"
                      value={siteCopy.hero_badge_en || ''}
                      onChange={e => setSiteCopy({ ...siteCopy, hero_badge_en: e.target.value })}
                      style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', backgroundColor: 'rgba(255, 255, 255, 0.06)', border: '1px solid rgba(255, 255, 255, 0.2)', color: '#FFF', fontSize: '0.85rem', outline: 'none', boxSizing: 'border-box' }}
                    />
                  </div>
                </div>

                {/* Hero Title */}
                <div style={{ marginBottom: '16px' }}>
                  <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 'bold', color: '#E5A31E', marginBottom: '6px' }}>
                    📢 หัวข้อหลักหน้าแรก (Main Title ภาษาไทย) *
                  </label>
                  <input
                    type="text"
                    required
                    value={siteCopy.hero_title_th || ''}
                    onChange={e => setSiteCopy({ ...siteCopy, hero_title_th: e.target.value })}
                    style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', backgroundColor: 'rgba(255, 255, 255, 0.06)', border: '1px solid rgba(255, 255, 255, 0.2)', color: '#FFF', fontSize: '0.95rem', fontWeight: '600', outline: 'none', boxSizing: 'border-box' }}
                  />
                </div>

                <div style={{ marginBottom: '16px' }}>
                  <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 'bold', color: '#E5A31E', marginBottom: '6px' }}>
                    📢 หัวข้อหลักภาษาอังกฤษ (Main Title EN)
                  </label>
                  <input
                    type="text"
                    value={siteCopy.hero_title_en || ''}
                    onChange={e => setSiteCopy({ ...siteCopy, hero_title_en: e.target.value })}
                    style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', backgroundColor: 'rgba(255, 255, 255, 0.06)', border: '1px solid rgba(255, 255, 255, 0.2)', color: '#FFF', fontSize: '0.85rem', outline: 'none', boxSizing: 'border-box' }}
                  />
                </div>

                {/* Hero Description */}
                <div style={{ marginBottom: '16px' }}>
                  <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 'bold', color: '#E5A31E', marginBottom: '6px' }}>
                    📖 คำบรรยายความเป็นมา โต๊ะเบ๋ง สู่ เต้าหมิง (Description TH) *
                  </label>
                  <textarea
                    rows={3}
                    required
                    value={siteCopy.hero_desc_th || ''}
                    onChange={e => setSiteCopy({ ...siteCopy, hero_desc_th: e.target.value })}
                    style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', backgroundColor: 'rgba(255, 255, 255, 0.06)', border: '1px solid rgba(255, 255, 255, 0.2)', color: '#FFF', fontSize: '0.85rem', outline: 'none', boxSizing: 'border-box', resize: 'vertical' }}
                  />
                </div>

                <div style={{ marginBottom: '16px' }}>
                  <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 'bold', color: '#E5A31E', marginBottom: '6px' }}>
                    📖 คำบรรยายภาษาอังกฤษ (Description EN)
                  </label>
                  <textarea
                    rows={2}
                    value={siteCopy.hero_desc_en || ''}
                    onChange={e => setSiteCopy({ ...siteCopy, hero_desc_en: e.target.value })}
                    style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', backgroundColor: 'rgba(255, 255, 255, 0.06)', border: '1px solid rgba(255, 255, 255, 0.2)', color: '#FFF', fontSize: '0.85rem', outline: 'none', boxSizing: 'border-box', resize: 'vertical' }}
                  />
                </div>

                {/* Stats */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '14px', paddingTop: '12px', borderTop: '1px solid rgba(255, 255, 255, 0.06)' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.75rem', color: '#E5A31E', marginBottom: '4px' }}>ตัวเลขสถิติ 1</label>
                    <input
                      type="text"
                      value={siteCopy.hero_stat_1_val || ''}
                      onChange={e => setSiteCopy({ ...siteCopy, hero_stat_1_val: e.target.value })}
                      style={{ width: '100%', padding: '8px 10px', borderRadius: '6px', backgroundColor: 'rgba(255, 255, 255, 0.06)', border: '1px solid rgba(255, 255, 255, 0.2)', color: '#FCD34D', fontWeight: 'bold', fontSize: '0.9rem', outline: 'none', boxSizing: 'border-box', marginBottom: '4px' }}
                    />
                    <input
                      type="text"
                      placeholder="คำอธิบายสถิติ 1 (TH)"
                      value={siteCopy.hero_stat_1_lbl_th || ''}
                      onChange={e => setSiteCopy({ ...siteCopy, hero_stat_1_lbl_th: e.target.value })}
                      style={{ width: '100%', padding: '8px 10px', borderRadius: '6px', backgroundColor: 'rgba(255, 255, 255, 0.06)', border: '1px solid rgba(255, 255, 255, 0.2)', color: '#FFF', fontSize: '0.8rem', outline: 'none', boxSizing: 'border-box' }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.75rem', color: '#E5A31E', marginBottom: '4px' }}>ตัวเลขสถิติ 2</label>
                    <input
                      type="text"
                      value={siteCopy.hero_stat_2_val || ''}
                      onChange={e => setSiteCopy({ ...siteCopy, hero_stat_2_val: e.target.value })}
                      style={{ width: '100%', padding: '8px 10px', borderRadius: '6px', backgroundColor: 'rgba(255, 255, 255, 0.06)', border: '1px solid rgba(255, 255, 255, 0.2)', color: '#FCD34D', fontWeight: 'bold', fontSize: '0.9rem', outline: 'none', boxSizing: 'border-box', marginBottom: '4px' }}
                    />
                    <input
                      type="text"
                      placeholder="คำอธิบายสถิติ 2 (TH)"
                      value={siteCopy.hero_stat_2_lbl_th || ''}
                      onChange={e => setSiteCopy({ ...siteCopy, hero_stat_2_lbl_th: e.target.value })}
                      style={{ width: '100%', padding: '8px 10px', borderRadius: '6px', backgroundColor: 'rgba(255, 255, 255, 0.06)', border: '1px solid rgba(255, 255, 255, 0.2)', color: '#FFF', fontSize: '0.8rem', outline: 'none', boxSizing: 'border-box' }}
                    />
                  </div>
                </div>
              </div>

              {/* SECTION 2: GABLE PHILOSOPHY */}
              <div style={{ backgroundColor: 'rgba(255, 255, 255, 0.03)', border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '16px', padding: '24px' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '18px', paddingBottom: '12px', borderBottom: '1px solid rgba(255, 255, 255, 0.08)', flexWrap: 'wrap', gap: '10px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span style={{ fontSize: '1.4rem' }}>🏛️</span>
                    <div>
                      <h3 style={{ fontSize: '1.05rem', fontWeight: 'bold', color: '#E5A31E', margin: 0 }}>
                        ปรัชญาหน้าจั่ว & สถาปัตยกรรม ๕ สัญลักษณ์ (Gable Facade & Symbols)
                      </h3>
                      <span style={{ fontSize: '0.75rem', color: 'rgba(250, 242, 221, 0.6)' }}>
                        ถอดรหัสปรัชญาหน้าจั่ว ภาพจำลองจักรวาล ฟ้า-ดิน-คน และความหมายของแต่ละจุด
                      </span>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={handleResetGables}
                    style={{ padding: '6px 12px', fontSize: '0.75rem', borderRadius: '6px', backgroundColor: 'rgba(255, 255, 255, 0.08)', border: '1px solid rgba(255, 255, 255, 0.15)', color: '#FAF2DD', cursor: 'pointer' }}
                  >
                    🔄 คืนค่าสัญลักษณ์เริ่มต้น
                  </button>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '16px', marginBottom: '16px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 'bold', color: '#E5A31E', marginBottom: '6px' }}>
                      หัวข้อส่วนหน้าจั่ว (Title TH)
                    </label>
                    <input
                      type="text"
                      value={siteCopy.gable_title_th || ''}
                      onChange={e => setSiteCopy({ ...siteCopy, gable_title_th: e.target.value })}
                      style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', backgroundColor: 'rgba(255, 255, 255, 0.06)', border: '1px solid rgba(255, 255, 255, 0.2)', color: '#FFF', fontSize: '0.85rem', outline: 'none', boxSizing: 'border-box' }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 'bold', color: '#E5A31E', marginBottom: '6px' }}>
                      คำบรรยายส่วนหน้าจั่ว (Subtitle TH)
                    </label>
                    <input
                      type="text"
                      value={siteCopy.gable_subtitle_th || ''}
                      onChange={e => setSiteCopy({ ...siteCopy, gable_subtitle_th: e.target.value })}
                      style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', backgroundColor: 'rgba(255, 255, 255, 0.06)', border: '1px solid rgba(255, 255, 255, 0.2)', color: '#FFF', fontSize: '0.85rem', outline: 'none', boxSizing: 'border-box' }}
                    />
                  </div>
                </div>

                {/* 5 Symbols Cards */}
                <div style={{ marginTop: '16px' }}>
                  <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 'bold', color: '#E5A31E', marginBottom: '10px' }}>
                    สัญลักษณ์หน้าจั่วทั้ง ๕ สัญลักษณ์ (คลิกเพื่อแก้ไขเนื้อหา):
                  </label>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '12px' }}>
                    {gables.map((s, idx) => (
                      <div
                        key={s.id}
                        style={{
                          backgroundColor: 'rgba(255, 255, 255, 0.04)',
                          border: '1px solid rgba(255, 255, 255, 0.1)',
                          borderRadius: '12px',
                          padding: '14px',
                          display: 'flex',
                          flexDirection: 'column',
                          justifyContent: 'space-between',
                          gap: '10px'
                        }}
                      >
                        <div>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                            <span style={{ fontSize: '0.7rem', color: '#E5A31E', fontWeight: 'bold' }}>#{idx + 1} · {s.badge_th}</span>
                          </div>
                          <h4 style={{ fontSize: '0.9rem', fontWeight: 'bold', color: '#FFF', margin: '0 0 4px 0' }}>
                            {s.name_th}
                          </h4>
                          <p style={{ fontSize: '0.78rem', color: 'rgba(250, 242, 221, 0.7)', margin: 0, lineHeight: 1.4, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                            {s.desc_th}
                          </p>
                        </div>

                        <button
                          type="button"
                          onClick={() => handleOpenEditGable(s)}
                          style={{
                            padding: '6px 12px',
                            borderRadius: '6px',
                            backgroundColor: 'rgba(229, 163, 30, 0.15)',
                            border: '1px solid rgba(229, 163, 30, 0.4)',
                            color: '#FCD34D',
                            fontSize: '0.75rem',
                            fontWeight: '600',
                            cursor: 'pointer',
                            alignSelf: 'flex-start'
                          }}
                        >
                          ✏️ แก้ไขเนื้อหาสัญลักษณ์
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* SECTION 3: TIMELINE & 4 ERAS */}
              <div style={{ backgroundColor: 'rgba(255, 255, 255, 0.03)', border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '16px', padding: '24px' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '18px', paddingBottom: '12px', borderBottom: '1px solid rgba(255, 255, 255, 0.08)', flexWrap: 'wrap', gap: '10px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span style={{ fontSize: '1.4rem' }}>📜</span>
                    <div>
                      <h3 style={{ fontSize: '1.05rem', fontWeight: 'bold', color: '#E5A31E', margin: 0 }}>
                        ประวัติศาสตร์ & กาลเวลา ๑๒๐ ปี (Timeline & 4 Eras)
                      </h3>
                      <span style={{ fontSize: '0.75rem', color: 'rgba(250, 242, 221, 0.6)' }}>
                        ประวัติศาสตร์ความเป็นมาโรงเรียนเต้าหมิง ๔ ยุคสมัย และคำบรรยายเสียง
                      </span>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={handleResetTimeline}
                    style={{ padding: '6px 12px', fontSize: '0.75rem', borderRadius: '6px', backgroundColor: 'rgba(255, 255, 255, 0.08)', border: '1px solid rgba(255, 255, 255, 0.15)', color: '#FAF2DD', cursor: 'pointer' }}
                  >
                    🔄 คืนค่ายุคสมัยเริ่มต้น
                  </button>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '16px', marginBottom: '16px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 'bold', color: '#E5A31E', marginBottom: '6px' }}>
                      หัวข้อส่วนประวัติศาสตร์ (Story Title TH)
                    </label>
                    <input
                      type="text"
                      value={siteCopy.story_title_th || ''}
                      onChange={e => setSiteCopy({ ...siteCopy, story_title_th: e.target.value })}
                      style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', backgroundColor: 'rgba(255, 255, 255, 0.06)', border: '1px solid rgba(255, 255, 255, 0.2)', color: '#FFF', fontSize: '0.85rem', outline: 'none', boxSizing: 'border-box' }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 'bold', color: '#E5A31E', marginBottom: '6px' }}>
                      คำบรรยายส่วนประวัติศาสตร์ (Story Subtitle TH)
                    </label>
                    <input
                      type="text"
                      value={siteCopy.story_subtitle_th || ''}
                      onChange={e => setSiteCopy({ ...siteCopy, story_subtitle_th: e.target.value })}
                      style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', backgroundColor: 'rgba(255, 255, 255, 0.06)', border: '1px solid rgba(255, 255, 255, 0.2)', color: '#FFF', fontSize: '0.85rem', outline: 'none', boxSizing: 'border-box' }}
                    />
                  </div>
                </div>

                {/* 4 Eras Cards */}
                <div style={{ marginTop: '16px' }}>
                  <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 'bold', color: '#E5A31E', marginBottom: '10px' }}>
                    ยุคสมัยประวัติศาสตร์ทั้ง ๔ ยุค (คลิกเพื่อแก้ไขเนื้อหา):
                  </label>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '12px' }}>
                    {["1905", "1950", "1990", "2026"].map((year) => {
                      const era = timelineData[year] || DEFAULT_TIMELINE_DATA[year];
                      return (
                        <div
                          key={year}
                          style={{
                            backgroundColor: 'rgba(255, 255, 255, 0.04)',
                            border: '1px solid rgba(255, 255, 255, 0.1)',
                            borderRadius: '12px',
                            padding: '14px',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'space-between',
                            gap: '10px'
                          }}
                        >
                          <div>
                            <span style={{ fontSize: '0.7rem', color: '#E5A31E', fontWeight: 'bold', display: 'block', marginBottom: '4px' }}>
                              ⏳ {era?.badge_th || year}
                            </span>
                            <h4 style={{ fontSize: '0.9rem', fontWeight: 'bold', color: '#FFF', margin: '0 0 4px 0' }}>
                              {era?.title_th}
                            </h4>
                            <p style={{ fontSize: '0.78rem', color: 'rgba(250, 242, 221, 0.7)', margin: 0, lineHeight: 1.4, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                              {era?.desc_th}
                            </p>
                          </div>

                          <button
                            type="button"
                            onClick={() => handleOpenEditTimeline(year)}
                            style={{
                              padding: '6px 12px',
                              borderRadius: '6px',
                              backgroundColor: 'rgba(229, 163, 30, 0.15)',
                              border: '1px solid rgba(229, 163, 30, 0.4)',
                              color: '#FCD34D',
                              fontSize: '0.75rem',
                              fontWeight: '600',
                              cursor: 'pointer',
                              alignSelf: 'flex-start'
                            }}
                          >
                            ✏️ แก้ไขเนื้อหายุคสมัย
                          </button>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* SECTION 4: VISION & LIVING HERITAGE */}
              <div style={{ backgroundColor: 'rgba(255, 255, 255, 0.03)', border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '16px', padding: '24px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '18px', paddingBottom: '12px', borderBottom: '1px solid rgba(255, 255, 255, 0.08)' }}>
                  <span style={{ fontSize: '1.4rem' }}>💡</span>
                  <div>
                    <h3 style={{ fontSize: '1.05rem', fontWeight: 'bold', color: '#E5A31E', margin: 0 }}>
                      วิสัยทัศน์ & บริบทใหม่ในเมืองตะกั่วป่า (Vision & Heritage)
                    </h3>
                    <span style={{ fontSize: '0.75rem', color: 'rgba(250, 242, 221, 0.6)' }}>
                      คำอธิบายโครงการฟื้นฟูมรดกที่มีชีวิต และการมีส่วนร่วมของชุมชน
                    </span>
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '16px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 'bold', color: '#E5A31E', marginBottom: '6px' }}>
                      หัวข้อโครงการ (Vision Title TH)
                    </label>
                    <input
                      type="text"
                      value={siteCopy.vision_title_th || ''}
                      onChange={e => setSiteCopy({ ...siteCopy, vision_title_th: e.target.value })}
                      style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', backgroundColor: 'rgba(255, 255, 255, 0.06)', border: '1px solid rgba(255, 255, 255, 0.2)', color: '#FFF', fontSize: '0.85rem', outline: 'none', boxSizing: 'border-box' }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 'bold', color: '#E5A31E', marginBottom: '6px' }}>
                      คำบรรยายวิสัยทัศน์ (Vision Subtitle TH)
                    </label>
                    <input
                      type="text"
                      value={siteCopy.vision_subtitle_th || ''}
                      onChange={e => setSiteCopy({ ...siteCopy, vision_subtitle_th: e.target.value })}
                      style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', backgroundColor: 'rgba(255, 255, 255, 0.06)', border: '1px solid rgba(255, 255, 255, 0.2)', color: '#FFF', fontSize: '0.85rem', outline: 'none', boxSizing: 'border-box' }}
                    />
                  </div>
                </div>
              </div>

              {/* SECTION 5: CONTACT & LOCATION */}
              <div style={{ backgroundColor: 'rgba(255, 255, 255, 0.03)', border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '16px', padding: '24px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '18px', paddingBottom: '12px', borderBottom: '1px solid rgba(255, 255, 255, 0.08)' }}>
                  <span style={{ fontSize: '1.4rem' }}>📞</span>
                  <div>
                    <h3 style={{ fontSize: '1.05rem', fontWeight: 'bold', color: '#E5A31E', margin: 0 }}>
                      ข้อมูลติดต่อ & การเดินทาง (Contact & Location)
                    </h3>
                    <span style={{ fontSize: '0.75rem', color: 'rgba(250, 242, 221, 0.6)' }}>
                      เบอร์โทรศัพท์มูลนิธิฯ, อีเมล, ที่อยู่ และเวลาเปิดทำการ
                    </span>
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px', marginBottom: '16px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 'bold', color: '#E5A31E', marginBottom: '6px' }}>
                      เบอร์โทรศัพท์ติดต่อ
                    </label>
                    <input
                      type="text"
                      value={siteCopy.contact_phone || ''}
                      onChange={e => setSiteCopy({ ...siteCopy, contact_phone: e.target.value })}
                      style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', backgroundColor: 'rgba(255, 255, 255, 0.06)', border: '1px solid rgba(255, 255, 255, 0.2)', color: '#FFF', fontSize: '0.85rem', outline: 'none', boxSizing: 'border-box' }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 'bold', color: '#E5A31E', marginBottom: '6px' }}>
                      อีเมลติดต่อมูลนิธิฯ
                    </label>
                    <input
                      type="email"
                      value={siteCopy.contact_email || ''}
                      onChange={e => setSiteCopy({ ...siteCopy, contact_email: e.target.value })}
                      style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', backgroundColor: 'rgba(255, 255, 255, 0.06)', border: '1px solid rgba(255, 255, 255, 0.2)', color: '#FFF', fontSize: '0.85rem', outline: 'none', boxSizing: 'border-box' }}
                    />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 'bold', color: '#E5A31E', marginBottom: '6px' }}>
                      ที่อยู่ (ภาษาไทย)
                    </label>
                    <input
                      type="text"
                      value={siteCopy.contact_address_th || ''}
                      onChange={e => setSiteCopy({ ...siteCopy, contact_address_th: e.target.value })}
                      style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', backgroundColor: 'rgba(255, 255, 255, 0.06)', border: '1px solid rgba(255, 255, 255, 0.2)', color: '#FFF', fontSize: '0.85rem', outline: 'none', boxSizing: 'border-box' }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 'bold', color: '#E5A31E', marginBottom: '6px' }}>
                      เวลาทำการ (ภาษาไทย)
                    </label>
                    <input
                      type="text"
                      value={siteCopy.contact_hours_th || ''}
                      onChange={e => setSiteCopy({ ...siteCopy, contact_hours_th: e.target.value })}
                      style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', backgroundColor: 'rgba(255, 255, 255, 0.06)', border: '1px solid rgba(255, 255, 255, 0.2)', color: '#FFF', fontSize: '0.85rem', outline: 'none', boxSizing: 'border-box' }}
                    />
                  </div>
                </div>
              </div>

              {/* Bottom Submit Button */}
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
                <button
                  type="submit"
                  style={{
                    padding: '12px 32px',
                    borderRadius: '10px',
                    backgroundColor: '#E5A31E',
                    color: '#122421',
                    fontSize: '0.9rem',
                    fontWeight: 'bold',
                    border: 'none',
                    cursor: 'pointer',
                    boxShadow: '0 6px 20px rgba(229, 163, 30, 0.4)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px'
                  }}
                >
                  <span>💾</span>
                  <span>บันทึกการแก้ไขเนื้อหาเว็บไซต์ทั้งหมด (Save All Changes)</span>
                </button>
              </div>
            </form>
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

                {/* Image Path with Direct Upload & Presets */}
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                    <label style={{ fontSize: '0.78rem', fontWeight: 'bold', color: '#E5A31E' }}>
                      รูปภาพหน้าปกกิจกรรม (Image) *
                    </label>
                    <label
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '6px',
                        padding: '5px 12px',
                        borderRadius: '6px',
                        backgroundColor: 'rgba(229, 163, 30, 0.18)',
                        border: '1px solid #E5A31E',
                        color: '#E5A31E',
                        fontSize: '0.75rem',
                        fontWeight: 'bold',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease'
                      }}
                    >
                      📁 เลือกรูปจากเครื่อง / มือถือ
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            handleFileImageUpload(file, (dataUrl) => {
                              setEventForm(prev => ({ ...prev, image: dataUrl }));
                            });
                          }
                        }}
                        style={{ display: 'none' }}
                      />
                    </label>
                  </div>

                  <div style={{ display: 'flex', gap: '10px', alignItems: 'center', marginBottom: '8px' }}>
                    <input
                      type="text"
                      placeholder="เช่น /assets/event-tea.jpg หรือวาง URL รูปภาพ"
                      value={eventForm.image || ''}
                      onChange={e => setEventForm({ ...eventForm, image: e.target.value })}
                      style={{ flex: 1, padding: '10px 12px', borderRadius: '8px', backgroundColor: 'rgba(255, 255, 255, 0.06)', border: '1px solid rgba(255, 255, 255, 0.2)', color: '#FFF', fontSize: '0.85rem', outline: 'none', boxSizing: 'border-box' }}
                    />
                    {eventForm.image && (
                      <div style={{ width: '50px', height: '50px', borderRadius: '8px', overflow: 'hidden', border: '1.5px solid #E5A31E', flexShrink: 0 }}>
                        <img
                          src={eventForm.image}
                          alt="preview"
                          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                          onError={(e: any) => { e.target.src = '/assets/event-tea.jpg'; }}
                        />
                      </div>
                    )}
                  </div>

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

        {/* ARCHIVE PHOTO CREATE / EDIT MODAL */}
        {isArchiveModalOpen && (
          <div style={{ position: 'fixed', inset: 0, zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px' }}>
            <div
              style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(0, 0, 0, 0.85)', backdropFilter: 'blur(8px)' }}
              onClick={() => setIsArchiveModalOpen(false)}
            ></div>

            <div
              style={{
                position: 'relative',
                width: '100%',
                maxWidth: '650px',
                maxHeight: '90vh',
                overflowY: 'auto',
                backgroundColor: '#132422',
                border: '1.5px solid rgba(229, 163, 30, 0.45)',
                borderRadius: '20px',
                padding: '26px',
                boxShadow: '0 25px 60px rgba(0, 0, 0, 0.7), 0 0 30px rgba(229, 163, 30, 0.15)',
                zIndex: 10,
                color: '#FAF2DD'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px', borderBottom: '1px solid rgba(255, 255, 255, 0.1)', paddingBottom: '14px' }}>
                <div>
                  <span style={{ fontSize: '0.72rem', fontFamily: 'monospace', fontWeight: 'bold', color: '#E5A31E', textTransform: 'uppercase' }}>
                    {editingPhotoId !== null ? `✏️ EDIT ARCHIVE PHOTO #${editingPhotoId}` : '➕ CREATE NEW ARCHIVE PHOTO'}
                  </span>
                  <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#FFF', margin: '4px 0 0 0' }}>
                    {editingPhotoId !== null ? 'แก้ไขภาพถ่ายและเรื่องเล่าประวัติศาสตร์' : 'เพิ่มภาพถ่ายและเรื่องเล่าประวัติศาสตร์ใหม่'}
                  </h2>
                </div>
                <button
                  onClick={() => setIsArchiveModalOpen(false)}
                  style={{ background: 'none', border: 'none', color: '#FAF2DD', fontSize: '1.5rem', cursor: 'pointer', padding: '4px 8px' }}
                >
                  &times;
                </button>
              </div>

              <form onSubmit={handleSaveArchivePhoto} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {/* Category & Tag Row */}
                <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '14px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 'bold', color: '#E5A31E', marginBottom: '6px' }}>
                      หมวดหมู่ภาพ (Category) *
                    </label>
                    <select
                      value={archiveForm.category}
                      onChange={e => setArchiveForm({ ...archiveForm, category: e.target.value as any })}
                      style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', backgroundColor: 'rgba(255, 255, 255, 0.06)', border: '1px solid rgba(255, 255, 255, 0.2)', color: '#FFF', fontSize: '0.85rem', outline: 'none' }}
                    >
                      <option value="diplomacy" style={{ backgroundColor: '#132422' }}>🏛️ การทูต & อาคาร (Diplomacy & Building)</option>
                      <option value="school" style={{ backgroundColor: '#132422' }}>📚 ครู & นักเรียน (School & Faculty)</option>
                      <option value="sports" style={{ backgroundColor: '#132422' }}>🏀 กีฬา & ทีมบาสเกตบอล (Sports & Basketball)</option>
                      <option value="community" style={{ backgroundColor: '#132422' }}>📜 เรื่องเล่าชุมชน (Community Heritage)</option>
                    </select>
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 'bold', color: '#E5A31E', marginBottom: '6px' }}>
                      ป้ายยุคสมัย / ปี พ.ศ. (Tag TH)
                    </label>
                    <input
                      type="text"
                      placeholder="เช่น พ.ศ. ๒๔๙๓ หรือ ยุคทอง ๒๔๗๐"
                      value={archiveForm.tag_th || ''}
                      onChange={e => setArchiveForm({ ...archiveForm, tag_th: e.target.value })}
                      style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', backgroundColor: 'rgba(255, 255, 255, 0.06)', border: '1px solid rgba(255, 255, 255, 0.2)', color: '#FFF', fontSize: '0.85rem', outline: 'none', boxSizing: 'border-box' }}
                    />
                  </div>
                </div>

                {/* Image Path with Direct Upload & Live Preview */}
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                    <label style={{ fontSize: '0.78rem', fontWeight: 'bold', color: '#E5A31E' }}>
                      ที่อยู่รูปภาพ (Image) *
                    </label>
                    <label
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '6px',
                        padding: '5px 12px',
                        borderRadius: '6px',
                        backgroundColor: 'rgba(229, 163, 30, 0.18)',
                        border: '1px solid #E5A31E',
                        color: '#E5A31E',
                        fontSize: '0.75rem',
                        fontWeight: 'bold',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease'
                      }}
                    >
                      📁 เลือกรูปจากเครื่อง / มือถือ (Upload Photo)
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            handleFileImageUpload(file, (dataUrl) => {
                              setArchiveForm(prev => ({ ...prev, src: dataUrl }));
                            });
                          }
                        }}
                        style={{ display: 'none' }}
                      />
                    </label>
                  </div>

                  <div style={{ display: 'flex', gap: '10px', alignItems: 'center', marginBottom: '8px' }}>
                    <input
                      type="text"
                      required
                      placeholder="เช่น /img/exhibit-zone1-school.jpg หรือวาง URL รูปภาพ"
                      value={archiveForm.src || ''}
                      onChange={e => setArchiveForm({ ...archiveForm, src: e.target.value })}
                      style={{ flex: 1, padding: '10px 12px', borderRadius: '8px', backgroundColor: 'rgba(255, 255, 255, 0.06)', border: '1px solid rgba(255, 255, 255, 0.2)', color: '#FFF', fontSize: '0.85rem', outline: 'none', boxSizing: 'border-box' }}
                    />
                    {archiveForm.src && (
                      <div style={{ width: '50px', height: '50px', borderRadius: '8px', overflow: 'hidden', border: '1.5px solid #E5A31E', flexShrink: 0 }}>
                        <img
                          src={archiveForm.src}
                          alt="preview"
                          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                          onError={(e: any) => { e.target.src = '/img/building-community.jpg'; }}
                        />
                      </div>
                    )}
                  </div>

                  <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                    <span style={{ fontSize: '0.7rem', color: 'rgba(250, 242, 221, 0.5)', alignSelf: 'center' }}>ภาพในระบบ:</span>
                    {[
                      { label: 'อาคารดั้งเดิม ๒๔๖๕', path: '/img/exhibit-zone1-school.jpg' },
                      { label: 'ต้อนรับกงสุล ๒๔๙๓', path: '/img/exhibit-zone2-consul.jpg' },
                      { label: 'คณะครูอาจารย์', path: '/img/exhibit-zone2-teachers.jpg' },
                      { label: 'ป้ายโรงเรียน', path: '/img/exhibit-zone2-class.jpg' },
                      { label: 'อาคารเต้าหมิงปัจจุบัน', path: '/img/building-community.jpg' }
                    ].map(p => (
                      <button
                        key={p.path}
                        type="button"
                        onClick={() => setArchiveForm({ ...archiveForm, src: p.path })}
                        style={{
                          padding: '3px 8px',
                          fontSize: '0.7rem',
                          borderRadius: '4px',
                          backgroundColor: archiveForm.src === p.path ? '#E5A31E' : 'rgba(255, 255, 255, 0.08)',
                          color: archiveForm.src === p.path ? '#122421' : '#FAF2DD',
                          border: 'none',
                          cursor: 'pointer'
                        }}
                      >
                        {p.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Title TH & EN */}
                <div>
                  <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 'bold', color: '#E5A31E', marginBottom: '6px' }}>
                    ชื่อภาพประวัติศาสตร์ (ภาษาไทย) *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="เช่น พิธีต้อนรับกงสุลใหญ่สาธารณรัฐจีน ประจำปี ๒๔๙๓"
                    value={archiveForm.title_th || ''}
                    onChange={e => setArchiveForm({ ...archiveForm, title_th: e.target.value })}
                    style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', backgroundColor: 'rgba(255, 255, 255, 0.06)', border: '1px solid rgba(255, 255, 255, 0.2)', color: '#FFF', fontSize: '0.9rem', outline: 'none', boxSizing: 'border-box' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 'bold', color: '#E5A31E', marginBottom: '6px' }}>
                    ชื่อภาพภาษาอังกฤษ (Title EN)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Chinese Consul-General Official Reception (1950)"
                    value={archiveForm.title_en || ''}
                    onChange={e => setArchiveForm({ ...archiveForm, title_en: e.target.value })}
                    style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', backgroundColor: 'rgba(255, 255, 255, 0.06)', border: '1px solid rgba(255, 255, 255, 0.2)', color: '#FFF', fontSize: '0.85rem', outline: 'none', boxSizing: 'border-box' }}
                  />
                </div>

                {/* Caption TH & EN */}
                <div>
                  <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 'bold', color: '#E5A31E', marginBottom: '6px' }}>
                    คำบรรยายประวัติศาสตร์และเรื่องเล่า (Caption TH)
                  </label>
                  <textarea
                    rows={3}
                    placeholder="บันทึกข้อเท็จจริง เรื่องเล่า ความเป็นมา และบุคคลในภาพ..."
                    value={archiveForm.caption_th || ''}
                    onChange={e => setArchiveForm({ ...archiveForm, caption_th: e.target.value })}
                    style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', backgroundColor: 'rgba(255, 255, 255, 0.06)', border: '1px solid rgba(255, 255, 255, 0.2)', color: '#FFF', fontSize: '0.85rem', outline: 'none', boxSizing: 'border-box', resize: 'vertical' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 'bold', color: '#E5A31E', marginBottom: '6px' }}>
                    คำบรรยายภาษาอังกฤษ (Caption EN)
                  </label>
                  <textarea
                    rows={2}
                    placeholder="English historical notes and photographic evidence description..."
                    value={archiveForm.caption_en || ''}
                    onChange={e => setArchiveForm({ ...archiveForm, caption_en: e.target.value })}
                    style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', backgroundColor: 'rgba(255, 255, 255, 0.06)', border: '1px solid rgba(255, 255, 255, 0.2)', color: '#FFF', fontSize: '0.85rem', outline: 'none', boxSizing: 'border-box', resize: 'vertical' }}
                  />
                </div>

                {/* Modal Buttons */}
                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', paddingTop: '16px', borderTop: '1px solid rgba(255, 255, 255, 0.1)' }}>
                  <button
                    type="button"
                    onClick={() => setIsArchiveModalOpen(false)}
                    style={{ padding: '10px 20px', borderRadius: '8px', backgroundColor: 'rgba(255, 255, 255, 0.08)', border: '1px solid rgba(255, 255, 255, 0.15)', color: '#FAF2DD', fontSize: '0.85rem', cursor: 'pointer' }}
                  >
                    ยกเลิก
                  </button>

                  <button
                    type="submit"
                    style={{ padding: '10px 24px', borderRadius: '8px', backgroundColor: '#E5A31E', color: '#122421', fontSize: '0.85rem', fontWeight: 'bold', border: 'none', cursor: 'pointer', boxShadow: '0 4px 15px rgba(229, 163, 30, 0.35)' }}
                  >
                    💾 บันทึกภาพประวัติศาสตร์ (Save)
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* MODAL: EDIT GABLE SYMBOL */}
        {/* ========================================================================= */}
        {isGableModalOpen && editingGableId && (
          <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0, 0, 0, 0.82)', backdropFilter: 'blur(8px)', zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px' }}>
            <div style={{ width: '100%', maxWidth: '650px', maxHeight: '90vh', overflowY: 'auto', backgroundColor: '#122421', border: '1.5px solid rgba(229, 163, 30, 0.5)', borderRadius: '20px', padding: '28px', boxShadow: '0 25px 60px rgba(0, 0, 0, 0.8)' }}>
              
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', paddingBottom: '12px', borderBottom: '1px solid rgba(255, 255, 255, 0.1)' }}>
                <div>
                  <span style={{ fontSize: '0.72rem', color: '#E5A31E', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 'bold', display: 'block' }}>
                    🏛️ GABLE SYMBOL PHILOSOPHY EDITOR
                  </span>
                  <h3 style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#FFF', margin: 0 }}>
                    แก้ไขสัญลักษณ์หน้าจั่ว: {gableForm.name_th || editingGableId}
                  </h3>
                </div>

                <button
                  type="button"
                  onClick={() => setIsGableModalOpen(false)}
                  style={{ width: '32px', height: '32px', borderRadius: '50%', backgroundColor: 'rgba(255, 255, 255, 0.1)', border: 'none', color: '#FFF', fontSize: '1rem', cursor: 'pointer' }}
                >
                  ✕
                </button>
              </div>

              <form onSubmit={handleSaveGable} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '14px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 'bold', color: '#E5A31E', marginBottom: '6px' }}>
                      ชื่อสัญลักษณ์ (ภาษาไทย) *
                    </label>
                    <input
                      type="text"
                      required
                      value={gableForm.name_th || ''}
                      onChange={e => setGableForm({ ...gableForm, name_th: e.target.value })}
                      style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', backgroundColor: 'rgba(255, 255, 255, 0.06)', border: '1px solid rgba(255, 255, 255, 0.2)', color: '#FFF', fontSize: '0.9rem', outline: 'none', boxSizing: 'border-box' }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 'bold', color: '#E5A31E', marginBottom: '6px' }}>
                      ชื่อสัญลักษณ์ภาษาอังกฤษ (Name EN)
                    </label>
                    <input
                      type="text"
                      value={gableForm.name_en || ''}
                      onChange={e => setGableForm({ ...gableForm, name_en: e.target.value })}
                      style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', backgroundColor: 'rgba(255, 255, 255, 0.06)', border: '1px solid rgba(255, 255, 255, 0.2)', color: '#FFF', fontSize: '0.85rem', outline: 'none', boxSizing: 'border-box' }}
                    />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '14px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 'bold', color: '#E5A31E', marginBottom: '6px' }}>
                      ป้ายระบุตำแหน่ง (Badge TH)
                    </label>
                    <input
                      type="text"
                      value={gableForm.badge_th || ''}
                      onChange={e => setGableForm({ ...gableForm, badge_th: e.target.value })}
                      style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', backgroundColor: 'rgba(255, 255, 255, 0.06)', border: '1px solid rgba(255, 255, 255, 0.2)', color: '#FFF', fontSize: '0.85rem', outline: 'none', boxSizing: 'border-box' }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 'bold', color: '#E5A31E', marginBottom: '6px' }}>
                      ป้ายระบุตำแหน่ง EN
                    </label>
                    <input
                      type="text"
                      value={gableForm.badge_en || ''}
                      onChange={e => setGableForm({ ...gableForm, badge_en: e.target.value })}
                      style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', backgroundColor: 'rgba(255, 255, 255, 0.06)', border: '1px solid rgba(255, 255, 255, 0.2)', color: '#FFF', fontSize: '0.85rem', outline: 'none', boxSizing: 'border-box' }}
                    />
                  </div>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 'bold', color: '#E5A31E', marginBottom: '6px' }}>
                    คำอธิบายสั้น (Short Desc TH)
                  </label>
                  <input
                    type="text"
                    value={gableForm.short_desc_th || ''}
                    onChange={e => setGableForm({ ...gableForm, short_desc_th: e.target.value })}
                    style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', backgroundColor: 'rgba(255, 255, 255, 0.06)', border: '1px solid rgba(255, 255, 255, 0.2)', color: '#FFF', fontSize: '0.85rem', outline: 'none', boxSizing: 'border-box' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 'bold', color: '#E5A31E', marginBottom: '6px' }}>
                    คำบรรยายรายละเอียดสถาปัตยกรรม (Description TH) *
                  </label>
                  <textarea
                    rows={3}
                    required
                    value={gableForm.desc_th || ''}
                    onChange={e => setGableForm({ ...gableForm, desc_th: e.target.value })}
                    style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', backgroundColor: 'rgba(255, 255, 255, 0.06)', border: '1px solid rgba(255, 255, 255, 0.2)', color: '#FFF', fontSize: '0.85rem', outline: 'none', boxSizing: 'border-box', resize: 'vertical' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 'bold', color: '#E5A31E', marginBottom: '6px' }}>
                    ความหมายเชิงปรัชญา & คติเต๋า (Meaning TH) *
                  </label>
                  <textarea
                    rows={2}
                    required
                    value={gableForm.meaning_th || ''}
                    onChange={e => setGableForm({ ...gableForm, meaning_th: e.target.value })}
                    style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', backgroundColor: 'rgba(255, 255, 255, 0.06)', border: '1px solid rgba(255, 255, 255, 0.2)', color: '#FFF', fontSize: '0.85rem', outline: 'none', boxSizing: 'border-box', resize: 'vertical' }}
                  />
                </div>

                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', paddingTop: '16px', borderTop: '1px solid rgba(255, 255, 255, 0.1)' }}>
                  <button
                    type="button"
                    onClick={() => setIsGableModalOpen(false)}
                    style={{ padding: '10px 20px', borderRadius: '8px', backgroundColor: 'rgba(255, 255, 255, 0.08)', border: '1px solid rgba(255, 255, 255, 0.15)', color: '#FAF2DD', fontSize: '0.85rem', cursor: 'pointer' }}
                  >
                    ยกเลิก
                  </button>

                  <button
                    type="submit"
                    style={{ padding: '10px 24px', borderRadius: '8px', backgroundColor: '#E5A31E', color: '#122421', fontSize: '0.85rem', fontWeight: 'bold', border: 'none', cursor: 'pointer', boxShadow: '0 4px 15px rgba(229, 163, 30, 0.35)' }}
                  >
                    💾 บันทึกสัญลักษณ์ (Save)
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* MODAL: EDIT TIMELINE ERA */}
        {/* ========================================================================= */}
        {isTimelineModalOpen && editingTimelineYear && (
          <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0, 0, 0, 0.82)', backdropFilter: 'blur(8px)', zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px' }}>
            <div style={{ width: '100%', maxWidth: '650px', maxHeight: '90vh', overflowY: 'auto', backgroundColor: '#122421', border: '1.5px solid rgba(229, 163, 30, 0.5)', borderRadius: '20px', padding: '28px', boxShadow: '0 25px 60px rgba(0, 0, 0, 0.8)' }}>
              
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', paddingBottom: '12px', borderBottom: '1px solid rgba(255, 255, 255, 0.1)' }}>
                <div>
                  <span style={{ fontSize: '0.72rem', color: '#E5A31E', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 'bold', display: 'block' }}>
                    📜 TIMELINE ERA & STORY EDITOR
                  </span>
                  <h3 style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#FFF', margin: 0 }}>
                    แก้ไขประวัติศาสตร์ยุค: {timelineForm.badge_th || editingTimelineYear}
                  </h3>
                </div>

                <button
                  type="button"
                  onClick={() => setIsTimelineModalOpen(false)}
                  style={{ width: '32px', height: '32px', borderRadius: '50%', backgroundColor: 'rgba(255, 255, 255, 0.1)', border: 'none', color: '#FFF', fontSize: '1rem', cursor: 'pointer' }}
                >
                  ✕
                </button>
              </div>

              <form onSubmit={handleSaveTimeline} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '14px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 'bold', color: '#E5A31E', marginBottom: '6px' }}>
                      ช่วงปี พ.ศ. (Badge TH) *
                    </label>
                    <input
                      type="text"
                      required
                      value={timelineForm.badge_th || ''}
                      onChange={e => setTimelineForm({ ...timelineForm, badge_th: e.target.value })}
                      style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', backgroundColor: 'rgba(255, 255, 255, 0.06)', border: '1px solid rgba(255, 255, 255, 0.2)', color: '#FFF', fontSize: '0.9rem', outline: 'none', boxSizing: 'border-box' }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 'bold', color: '#E5A31E', marginBottom: '6px' }}>
                      ช่วงปี ค.ศ. (Badge EN)
                    </label>
                    <input
                      type="text"
                      value={timelineForm.badge_en || ''}
                      onChange={e => setTimelineForm({ ...timelineForm, badge_en: e.target.value })}
                      style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', backgroundColor: 'rgba(255, 255, 255, 0.06)', border: '1px solid rgba(255, 255, 255, 0.2)', color: '#FFF', fontSize: '0.85rem', outline: 'none', boxSizing: 'border-box' }}
                    />
                  </div>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 'bold', color: '#E5A31E', marginBottom: '6px' }}>
                    หัวข้อยุคสมัย (Title TH) *
                  </label>
                  <input
                    type="text"
                    required
                    value={timelineForm.title_th || ''}
                    onChange={e => setTimelineForm({ ...timelineForm, title_th: e.target.value })}
                    style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', backgroundColor: 'rgba(255, 255, 255, 0.06)', border: '1px solid rgba(255, 255, 255, 0.2)', color: '#FFF', fontSize: '0.9rem', outline: 'none', boxSizing: 'border-box' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 'bold', color: '#E5A31E', marginBottom: '6px' }}>
                    หัวข้อยุคสมัยภาษาอังกฤษ (Title EN)
                  </label>
                  <input
                    type="text"
                    value={timelineForm.title_en || ''}
                    onChange={e => setTimelineForm({ ...timelineForm, title_en: e.target.value })}
                    style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', backgroundColor: 'rgba(255, 255, 255, 0.06)', border: '1px solid rgba(255, 255, 255, 0.2)', color: '#FFF', fontSize: '0.85rem', outline: 'none', boxSizing: 'border-box' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 'bold', color: '#E5A31E', marginBottom: '6px' }}>
                    คำบรรยายประวัติศาสตร์และเหตุการณ์สำคัญ (Description TH) *
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={timelineForm.desc_th || ''}
                    onChange={e => setTimelineForm({ ...timelineForm, desc_th: e.target.value })}
                    style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', backgroundColor: 'rgba(255, 255, 255, 0.06)', border: '1px solid rgba(255, 255, 255, 0.2)', color: '#FFF', fontSize: '0.85rem', outline: 'none', boxSizing: 'border-box', resize: 'vertical' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 'bold', color: '#E5A31E', marginBottom: '6px' }}>
                    คำบรรยายภาพประวัติศาสตร์ (Caption TH)
                  </label>
                  <input
                    type="text"
                    value={timelineForm.caption_th || ''}
                    onChange={e => setTimelineForm({ ...timelineForm, caption_th: e.target.value })}
                    style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', backgroundColor: 'rgba(255, 255, 255, 0.06)', border: '1px solid rgba(255, 255, 255, 0.2)', color: '#FFF', fontSize: '0.85rem', outline: 'none', boxSizing: 'border-box' }}
                  />
                </div>

                {/* Photo */}
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                    <label style={{ fontSize: '0.78rem', fontWeight: 'bold', color: '#E5A31E' }}>
                      รูปภาพประกอบยุคสมัย
                    </label>
                    <label style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', padding: '4px 10px', borderRadius: '6px', backgroundColor: '#E5A31E', color: '#122421', fontSize: '0.75rem', fontWeight: 'bold', cursor: 'pointer' }}>
                      <span>📁 เลือกรูปใหม่</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            handleFileImageUpload(file, (dataUrl) => {
                              setTimelineForm(prev => ({ ...prev, photo: dataUrl }));
                            });
                          }
                        }}
                        style={{ display: 'none' }}
                      />
                    </label>
                  </div>
                  <input
                    type="text"
                    value={timelineForm.photo || ''}
                    onChange={e => setTimelineForm({ ...timelineForm, photo: e.target.value })}
                    style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', backgroundColor: 'rgba(255, 255, 255, 0.06)', border: '1px solid rgba(255, 255, 255, 0.2)', color: '#FFF', fontSize: '0.85rem', outline: 'none', boxSizing: 'border-box' }}
                  />
                </div>

                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', paddingTop: '16px', borderTop: '1px solid rgba(255, 255, 255, 0.1)' }}>
                  <button
                    type="button"
                    onClick={() => setIsTimelineModalOpen(false)}
                    style={{ padding: '10px 20px', borderRadius: '8px', backgroundColor: 'rgba(255, 255, 255, 0.08)', border: '1px solid rgba(255, 255, 255, 0.15)', color: '#FAF2DD', fontSize: '0.85rem', cursor: 'pointer' }}
                  >
                    ยกเลิก
                  </button>

                  <button
                    type="submit"
                    style={{ padding: '10px 24px', borderRadius: '8px', backgroundColor: '#E5A31E', color: '#122421', fontSize: '0.85rem', fontWeight: 'bold', border: 'none', cursor: 'pointer', boxShadow: '0 4px 15px rgba(229, 163, 30, 0.35)' }}
                  >
                    💾 บันทึกยุคสมัย (Save)
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* MODAL: ADD / EDIT USER */}
        {/* ========================================================================= */}
        {isUserModalOpen && (
          <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0, 0, 0, 0.82)', backdropFilter: 'blur(8px)', zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px' }}>
            <div style={{ width: '100%', maxWidth: '600px', maxHeight: '90vh', overflowY: 'auto', backgroundColor: '#122421', border: '1.5px solid rgba(229, 163, 30, 0.5)', borderRadius: '20px', padding: '28px', boxShadow: '0 25px 60px rgba(0, 0, 0, 0.8)' }}>
              
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', paddingBottom: '12px', borderBottom: '1px solid rgba(255, 255, 255, 0.1)' }}>
                <div>
                  <span style={{ fontSize: '0.72rem', color: '#E5A31E', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 'bold', display: 'block' }}>
                    👥 USER & MEMBER PROFILE
                  </span>
                  <h3 style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#FFF', margin: 0 }}>
                    {editingUserId ? `แก้ไขข้อมูลสมาชิก: ${userForm.full_name || ''}` : '➕ เพิ่มสมาชิก / เจ้าหน้าที่ใหม่'}
                  </h3>
                </div>

                <button
                  type="button"
                  onClick={() => setIsUserModalOpen(false)}
                  style={{ width: '32px', height: '32px', borderRadius: '50%', backgroundColor: 'rgba(255, 255, 255, 0.1)', border: 'none', color: '#FFF', fontSize: '1rem', cursor: 'pointer' }}
                >
                  ✕
                </button>
              </div>

              <form onSubmit={handleSaveUser} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '12px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 'bold', color: '#E5A31E', marginBottom: '6px' }}>
                      ชื่อผู้ใช้ (Username) *
                    </label>
                    <input
                      type="text"
                      required
                      disabled={!!editingUserId}
                      placeholder="เช่น prawit2026"
                      value={userForm.username || ''}
                      onChange={e => setUserForm({ ...userForm, username: e.target.value.toLowerCase().replace(/[^a-z0-9_]/g, '') })}
                      style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', backgroundColor: editingUserId ? 'rgba(255, 255, 255, 0.02)' : 'rgba(255, 255, 255, 0.06)', border: '1px solid rgba(255, 255, 255, 0.2)', color: editingUserId ? 'rgba(255,255,255,0.5)' : '#FFF', fontSize: '0.9rem', outline: 'none', boxSizing: 'border-box' }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 'bold', color: '#E5A31E', marginBottom: '6px' }}>
                      ชื่อ-นามสกุล *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="เช่น คุณกนกพล มณีโรจน์"
                      value={userForm.full_name || ''}
                      onChange={e => setUserForm({ ...userForm, full_name: e.target.value })}
                      style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', backgroundColor: 'rgba(255, 255, 255, 0.06)', border: '1px solid rgba(255, 255, 255, 0.2)', color: '#FFF', fontSize: '0.9rem', outline: 'none', boxSizing: 'border-box' }}
                    />
                  </div>
                </div>

                {!editingUserId && (
                  <div>
                    <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 'bold', color: '#E5A31E', marginBottom: '6px' }}>
                      รหัสผ่านแรกเข้า (Initial Password) *
                    </label>
                    <input
                      type="password"
                      required
                      placeholder="รหัสผ่านอย่างน้อย 4 ตัว"
                      value={userForm.password || ''}
                      onChange={e => setUserForm({ ...userForm, password: e.target.value })}
                      style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', backgroundColor: 'rgba(255, 255, 255, 0.06)', border: '1px solid rgba(255, 255, 255, 0.2)', color: '#FFF', fontSize: '0.9rem', outline: 'none', boxSizing: 'border-box' }}
                    />
                  </div>
                )}

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '12px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 'bold', color: '#E5A31E', marginBottom: '6px' }}>
                      ระดับสิทธิ์ (Role) *
                    </label>
                    <select
                      value={userForm.role || 'member'}
                      disabled={userForm.username === 'admin'}
                      onChange={e => setUserForm({ ...userForm, role: e.target.value as UserRole })}
                      style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', backgroundColor: 'rgba(255, 255, 255, 0.06)', border: '1px solid rgba(255, 255, 255, 0.2)', color: '#FFF', fontSize: '0.85rem', outline: 'none', boxSizing: 'border-box' }}
                    >
                      <option value="superadmin" style={{ background: '#122421' }}>👑 Super Admin (ผู้ดูแลระบบสูงสุด)</option>
                      <option value="officer" style={{ background: '#122421' }}>🛡️ Officer (เจ้าหน้าที่มรดก & คลังภาพ)</option>
                      <option value="staff" style={{ background: '#122421' }}>🎫 Staff (เจ้าหน้าที่ต้อนรับ & ตรวจตั๋ว)</option>
                      <option value="member" style={{ background: '#122421' }}>👤 Member (สมาชิกทั่วไป)</option>
                    </select>
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 'bold', color: '#E5A31E', marginBottom: '6px' }}>
                      สถานะการใช้งาน (Status) *
                    </label>
                    <select
                      value={userForm.status || 'active'}
                      disabled={userForm.username === 'admin'}
                      onChange={e => setUserForm({ ...userForm, status: e.target.value as UserStatus })}
                      style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', backgroundColor: 'rgba(255, 255, 255, 0.06)', border: '1px solid rgba(255, 255, 255, 0.2)', color: '#FFF', fontSize: '0.85rem', outline: 'none', boxSizing: 'border-box' }}
                    >
                      <option value="active" style={{ background: '#122421' }}>✅ ใช้งานได้ (Active)</option>
                      <option value="pending" style={{ background: '#122421' }}>⏳ รออนุมัติสิทธิ์ (Pending)</option>
                      <option value="suspended" style={{ background: '#122421' }}>⛔ ระงับการใช้งาน (Suspended)</option>
                    </select>
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '12px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 'bold', color: '#E5A31E', marginBottom: '6px' }}>
                      เบอร์โทรศัพท์
                    </label>
                    <input
                      type="tel"
                      placeholder="081-xxx-xxxx"
                      value={userForm.phone || ''}
                      onChange={e => setUserForm({ ...userForm, phone: e.target.value })}
                      style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', backgroundColor: 'rgba(255, 255, 255, 0.06)', border: '1px solid rgba(255, 255, 255, 0.2)', color: '#FFF', fontSize: '0.85rem', outline: 'none', boxSizing: 'border-box' }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 'bold', color: '#E5A31E', marginBottom: '6px' }}>
                      อีเมล
                    </label>
                    <input
                      type="email"
                      placeholder="name@example.com"
                      value={userForm.email || ''}
                      onChange={e => setUserForm({ ...userForm, email: e.target.value })}
                      style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', backgroundColor: 'rgba(255, 255, 255, 0.06)', border: '1px solid rgba(255, 255, 255, 0.2)', color: '#FFF', fontSize: '0.85rem', outline: 'none', boxSizing: 'border-box' }}
                    />
                  </div>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 'bold', color: '#E5A31E', marginBottom: '6px' }}>
                    ฝ่าย / สังกัด / องค์กร
                  </label>
                  <input
                    type="text"
                    placeholder="เช่น ฝ่ายสถานที่, ฝ่ายกิจกรรม, ศิษย์เก่าเต้าหมิง"
                    value={userForm.department || ''}
                    onChange={e => setUserForm({ ...userForm, department: e.target.value })}
                    style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', backgroundColor: 'rgba(255, 255, 255, 0.06)', border: '1px solid rgba(255, 255, 255, 0.2)', color: '#FFF', fontSize: '0.85rem', outline: 'none', boxSizing: 'border-box' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 'bold', color: '#E5A31E', marginBottom: '6px' }}>
                    หมายเหตุ / บันทึกเพิ่มเติม
                  </label>
                  <textarea
                    rows={2}
                    placeholder="บันทึกข้อมูลหน้าที่หรือความรับผิดชอบ..."
                    value={userForm.notes || ''}
                    onChange={e => setUserForm({ ...userForm, notes: e.target.value })}
                    style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', backgroundColor: 'rgba(255, 255, 255, 0.06)', border: '1px solid rgba(255, 255, 255, 0.2)', color: '#FFF', fontSize: '0.85rem', outline: 'none', boxSizing: 'border-box', resize: 'vertical' }}
                  />
                </div>

                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', paddingTop: '16px', borderTop: '1px solid rgba(255, 255, 255, 0.1)' }}>
                  <button
                    type="button"
                    onClick={() => setIsUserModalOpen(false)}
                    style={{ padding: '10px 20px', borderRadius: '8px', backgroundColor: 'rgba(255, 255, 255, 0.08)', border: '1px solid rgba(255, 255, 255, 0.15)', color: '#FAF2DD', fontSize: '0.85rem', cursor: 'pointer' }}
                  >
                    ยกเลิก
                  </button>

                  <button
                    type="submit"
                    style={{ padding: '10px 24px', borderRadius: '8px', backgroundColor: '#E5A31E', color: '#122421', fontSize: '0.85rem', fontWeight: 'bold', border: 'none', cursor: 'pointer', boxShadow: '0 4px 15px rgba(229, 163, 30, 0.35)' }}
                  >
                    💾 บันทึกข้อมูลสมาชิก (Save)
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* MODAL: APPOINT / CHANGE USER ROLE */}
        {/* ========================================================================= */}
        {isRoleModalOpen && roleTargetUser && (
          <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0, 0, 0, 0.82)', backdropFilter: 'blur(8px)', zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px' }}>
            <div style={{ width: '100%', maxWidth: '480px', backgroundColor: '#122421', border: '1.5px solid #E5A31E', borderRadius: '20px', padding: '28px', boxShadow: '0 25px 60px rgba(0, 0, 0, 0.8)' }}>
              
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', paddingBottom: '12px', borderBottom: '1px solid rgba(255, 255, 255, 0.1)' }}>
                <div>
                  <span style={{ fontSize: '0.72rem', color: '#E5A31E', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 'bold', display: 'block' }}>
                    👑 SUPER ADMIN ROLE APPOINTMENT
                  </span>
                  <h3 style={{ fontSize: '1.15rem', fontWeight: 'bold', color: '#FFF', margin: 0 }}>
                    แต่งตั้งระดับสิทธิ์: {roleTargetUser.full_name}
                  </h3>
                </div>

                <button
                  type="button"
                  onClick={() => setIsRoleModalOpen(false)}
                  style={{ width: '30px', height: '30px', borderRadius: '50%', backgroundColor: 'rgba(255, 255, 255, 0.1)', border: 'none', color: '#FFF', fontSize: '0.9rem', cursor: 'pointer' }}
                >
                  ✕
                </button>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <p style={{ fontSize: '0.82rem', color: 'rgba(250, 242, 221, 0.8)', margin: 0, lineHeight: 1.5 }}>
                  โปรดเลือกระดับสิทธิ์ที่ต้องการมอบหมายให้แก่ <strong style={{ color: '#E5A31E' }}>@{roleTargetUser.username}</strong>:
                </p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {[
                    { key: 'superadmin', title: '👑 Super Admin (ผู้ดูแลระบบสูงสุด)', desc: 'สิทธิ์สูงสุด: แต่งตั้งสิทธิ์, อนุมัติสมาชิก, แก้ไขเนื้อหา, จัดการระบบทุกจุด' },
                    { key: 'officer', title: '🛡️ Officer (เจ้าหน้าที่มรดก & กิจกรรม)', desc: 'สิทธิ์จัดการ: กิจกรรม, คลังภาพ & เรื่องเล่า, คำขอใช้พื้นที่, และสแกนตั๋ว' },
                    { key: 'staff', title: '🎫 Staff (เจ้าหน้าที่ต้อนรับ & ตรวจตั๋ว)', desc: 'สิทธิ์ตรวจสอบและสแกน QR Code ตั๋วหน้างาน, เช็คอินผู้เข้าร่วม' },
                    { key: 'member', title: '👤 Member (สมาชิกทั่วไป)', desc: 'สิทธิ์เข้าชมข้อมูลทั่วไปและประวัติการมีส่วนร่วม' }
                  ].map((item) => (
                    <label
                      key={item.key}
                      onClick={() => setNewSelectedRole(item.key as UserRole)}
                      style={{
                        padding: '12px 14px',
                        borderRadius: '10px',
                        backgroundColor: newSelectedRole === item.key ? 'rgba(229, 163, 30, 0.18)' : 'rgba(255, 255, 255, 0.04)',
                        border: `1.5px solid ${newSelectedRole === item.key ? '#E5A31E' : 'rgba(255, 255, 255, 0.1)'}`,
                        cursor: 'pointer',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '2px',
                        transition: 'all 0.2s ease'
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <strong style={{ fontSize: '0.85rem', color: newSelectedRole === item.key ? '#E5A31E' : '#FFF' }}>
                          {item.title}
                        </strong>
                        <input
                          type="radio"
                          name="roleChoice"
                          checked={newSelectedRole === item.key}
                          onChange={() => setNewSelectedRole(item.key as UserRole)}
                          style={{ accentColor: '#E5A31E' }}
                        />
                      </div>
                      <span style={{ fontSize: '0.72rem', color: 'rgba(250, 242, 221, 0.65)' }}>
                        {item.desc}
                      </span>
                    </label>
                  ))}
                </div>

                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', paddingTop: '16px', borderTop: '1px solid rgba(255, 255, 255, 0.1)' }}>
                  <button
                    type="button"
                    onClick={() => setIsRoleModalOpen(false)}
                    style={{ padding: '9px 18px', borderRadius: '8px', backgroundColor: 'rgba(255, 255, 255, 0.08)', border: '1px solid rgba(255, 255, 255, 0.15)', color: '#FAF2DD', fontSize: '0.82rem', cursor: 'pointer' }}
                  >
                    ยกเลิก
                  </button>

                  <button
                    type="button"
                    onClick={handleSaveRole}
                    style={{ padding: '9px 22px', borderRadius: '8px', backgroundColor: '#E5A31E', color: '#122421', fontSize: '0.82rem', fontWeight: 'bold', border: 'none', cursor: 'pointer', boxShadow: '0 4px 15px rgba(229, 163, 30, 0.35)' }}
                  >
                    👑 ยืนยันแต่งตั้งสิทธิ์
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* MODAL: RESET USER PASSWORD */}
        {/* ========================================================================= */}
        {isPasswordResetModalOpen && passwordTargetUser && (
          <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0, 0, 0, 0.82)', backdropFilter: 'blur(8px)', zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px' }}>
            <div style={{ width: '100%', maxWidth: '440px', backgroundColor: '#122421', border: '1.5px solid rgba(229, 163, 30, 0.5)', borderRadius: '20px', padding: '28px', boxShadow: '0 25px 60px rgba(0, 0, 0, 0.8)' }}>
              
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', paddingBottom: '12px', borderBottom: '1px solid rgba(255, 255, 255, 0.1)' }}>
                <div>
                  <span style={{ fontSize: '0.72rem', color: '#E5A31E', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 'bold', display: 'block' }}>
                    🔑 PASSWORD RESET
                  </span>
                  <h3 style={{ fontSize: '1.15rem', fontWeight: 'bold', color: '#FFF', margin: 0 }}>
                    เปลี่ยนรหัสผ่าน: {passwordTargetUser.full_name}
                  </h3>
                </div>

                <button
                  type="button"
                  onClick={() => setIsPasswordResetModalOpen(false)}
                  style={{ width: '30px', height: '30px', borderRadius: '50%', backgroundColor: 'rgba(255, 255, 255, 0.1)', border: 'none', color: '#FFF', fontSize: '0.9rem', cursor: 'pointer' }}
                >
                  ✕
                </button>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <p style={{ fontSize: '0.82rem', color: 'rgba(250, 242, 221, 0.75)', margin: 0 }}>
                  กรอกรหัสผ่านใหม่สำหรับชื่อผู้ใช้ <strong style={{ color: '#E5A31E' }}>@{passwordTargetUser.username}</strong>
                </p>

                <div>
                  <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 'bold', color: '#E5A31E', marginBottom: '6px' }}>
                    รหัสผ่านใหม่ *
                  </label>
                  <input
                    type="password"
                    autoFocus
                    placeholder="รหัสผ่านใหม่อย่างน้อย 4 ตัวอักษร"
                    value={newPasswordInput}
                    onChange={(e) => setNewPasswordInput(e.target.value)}
                    style={{ width: '100%', padding: '11px 14px', borderRadius: '8px', backgroundColor: 'rgba(255, 255, 255, 0.06)', border: '1px solid rgba(255, 255, 255, 0.2)', color: '#FFF', fontSize: '0.9rem', outline: 'none', boxSizing: 'border-box' }}
                  />
                </div>

                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', paddingTop: '16px', borderTop: '1px solid rgba(255, 255, 255, 0.1)' }}>
                  <button
                    type="button"
                    onClick={() => setIsPasswordResetModalOpen(false)}
                    style={{ padding: '9px 18px', borderRadius: '8px', backgroundColor: 'rgba(255, 255, 255, 0.08)', border: '1px solid rgba(255, 255, 255, 0.15)', color: '#FAF2DD', fontSize: '0.82rem', cursor: 'pointer' }}
                  >
                    ยกเลิก
                  </button>

                  <button
                    type="button"
                    onClick={handleSavePasswordReset}
                    style={{ padding: '9px 22px', borderRadius: '8px', backgroundColor: '#E5A31E', color: '#122421', fontSize: '0.82rem', fontWeight: 'bold', border: 'none', cursor: 'pointer', boxShadow: '0 4px 15px rgba(229, 163, 30, 0.35)' }}
                  >
                    🔑 บันทึกรหัสผ่านใหม่
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
