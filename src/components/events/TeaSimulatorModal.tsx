'use client';

import React, { useState } from 'react';
import { useApp } from '@/lib/store';

const TEA_DATA = {
  oolong: {
    title_th: "ชาอู่หลงสุริยัน ตะกั่วป่า",
    title_en: "Takua Pa Sun Wuyi Oolong",
    desc_th: "รินน้ำร้อนอุณหภูมิ 92°C สกัดกลิ่นหอมอบอวล รสสัมผัสกลมกล่อมลงตัว",
    desc_en: "Steeped at 92°C, releasing rich charcoal-roasted aroma and lingering deep sweetness.",
    emoji: "🍵",
    aroma: "95%",
    sweet: "88%",
    calm: "92%"
  },
  longjing: {
    title_th: "ชาหลงจิ่งใบไผ่สด",
    title_en: "Spring Bamboo Well Green Tea",
    desc_th: "รินน้ำร้อนอุณหภูมิ 80°C ยอดอ่อนใบชาสด รสละมุน กลิ่นหอมยอดหญ้าฤดูใบไม้ผลิ",
    desc_en: "Steeped at 80°C with delicate tender shoots, floral notes, and soothing freshness.",
    emoji: "🌿",
    aroma: "90%",
    sweet: "92%",
    calm: "98%"
  },
  black: {
    title_th: "ชาดำกังฟูสูตรเปอรานากัน",
    title_en: "Heritage Kung Fu Black Tea",
    desc_th: "รินน้ำร้อนอุณหภูมิ 95°C รสเข้มข้น กลมกล่อม หอมกลิ่นผลไม้แห้ง เข้ากับขนมหวานได้ดีเยี่ยม",
    desc_en: "Steeped at 95°C, robust and velvety with notes of dried plum and honey malt.",
    emoji: "🫖",
    aroma: "96%",
    sweet: "85%",
    calm: "89%"
  }
};

const PASTRY_DATA = {
  taosae: {
    name_th: "ขนมเต้าส้อโบราณ",
    name_en: "Handmade Tao Sae Pastries"
  },
  angku: {
    name_th: "อังกู๊โก้ย & ขนมพริกไทย",
    name_en: "Red Tortoise Cake & Pepper Cookies"
  },
  kosui: {
    name_th: "ขนมโกสุ้ยน้ำตาลอ้อยสด",
    name_en: "Brown Sugar Ko Sui Delicacy"
  }
};

export function TeaSimulatorModal() {
  const { lang, t, isTeaModalOpen, setTeaModalOpen, showToast, setActiveTicket } = useApp();
  const [selectedTea, setSelectedTea] = useState<'oolong' | 'longjing' | 'black'>('oolong');
  const [selectedPastry, setSelectedPastry] = useState<'taosae' | 'angku' | 'kosui'>('taosae');
  const [isBrewing, setIsBrewing] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [guestName, setGuestName] = useState<string>('');
  const [guestPhone, setGuestPhone] = useState<string>('');

  if (!isTeaModalOpen) return null;

  const isEn = lang === 'en';
  const tea = TEA_DATA[selectedTea];
  const pastry = PASTRY_DATA[selectedPastry];

  const handleBrew = () => {
    setIsBrewing(true);
    setTimeout(() => {
      setIsBrewing(false);
      showToast(
        isEn
          ? "🍵 Tea brewed to perfection! Ready for your real visit."
          : "🍵 รินชาสำเร็จ! หอมกรุ่น อุณหภูมิและความสุนทรีย์สมบูรณ์แบบ"
      );
    }, 900);
  };

  const handleRSVP = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const res = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          eventId: 'e1',
          guestName,
          guestPhone,
          seats: 1,
          teaBlend: isEn ? tea.title_en : tea.title_th,
          pastryType: isEn ? pastry.name_en : pastry.name_th
        })
      });

      const json = await res.json();

      if (!res.ok) {
        showToast(json.details || json.error || 'Failed to book session');
        return;
      }

      setTeaModalOpen(false);
      setGuestName('');
      setGuestPhone('');

      showToast(
        isEn
          ? `🎉 Tea session reserved! Your E-Ticket Pass has been generated.`
          : `🎉 สำรองที่นั่งสำเร็จ! ระบบออกตั๋วดิจิทัลพร้อม QR Code ให้ท่านเรียบร้อยแล้ว`
      );

      if (json.data) {
        setActiveTicket(json.data);
      }
    } catch (err: any) {
      showToast(`Error: ${err.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={`tea-modal ${isTeaModalOpen ? 'open' : ''}`} id="teaSimulationModal">
      <div className="tea-modal-backdrop" onClick={() => setTeaModalOpen(false)}></div>
      <div className="tea-modal-content">
        <button className="tea-modal-close" onClick={() => setTeaModalOpen(false)} aria-label="ปิด">&times;</button>

        <div className="tea-modal-header">
          <div className="tea-modal-badge">{t('tea_modal_badge')}</div>
          <h3>{t('tea_modal_title')}</h3>
          <p>{t('tea_modal_desc')}</p>
        </div>

        <div className="tea-modal-body">
          {/* Tea Selection */}
          <div className="tea-step-group">
            <label className="tea-step-label">
              <span className="step-num">๑</span> <span>{t('tea_step_1')}</span>
            </label>
            <div className="tea-options-grid" id="teaOptionsGrid">
              <div
                className={`tea-option-card ${selectedTea === 'oolong' ? 'active' : ''}`}
                onClick={() => setSelectedTea('oolong')}
              >
                <span className="tea-icon">🍵</span>
                <div className="tea-info">
                  <h4>{isEn ? "Takua Pa Sun Oolong" : "ชาอู่หลงสุริยัน ตะกั่วป่า"}</h4>
                  <p>{isEn ? "Charcoal-roasted aroma, full body, lingering sweet aftertaste" : "หอมกลิ่นคั่วถ่านไม้โบราณ บอดี้ลึก ชุ่มคอ สดชื่นยาวนาน"}</p>
                  <span className="tea-taste-tag">{isEn ? "Roast • Deep Sweet" : "คั่วถ่านไม้ • ชุ่มคอ"}</span>
                </div>
              </div>

              <div
                className={`tea-option-card ${selectedTea === 'longjing' ? 'active' : ''}`}
                onClick={() => setSelectedTea('longjing')}
              >
                <span className="tea-icon">🌿</span>
                <div className="tea-info">
                  <h4>{isEn ? "Spring Bamboo Longjing" : "ชาหลงจิ่งใบไผ่สด"}</h4>
                  <p>{isEn ? "Tender tea shoots, floral notes, crisp spring aroma" : "ยอดอ่อนใบชาสด รสละมุน กลิ่นหอมยอดหญ้าฤดูใบไม้ผลิ"}</p>
                  <span className="tea-taste-tag">{isEn ? "Smooth • Soothing" : "ละมุน • ผ่อนคลาย"}</span>
                </div>
              </div>

              <div
                className={`tea-option-card ${selectedTea === 'black' ? 'active' : ''}`}
                onClick={() => setSelectedTea('black')}
              >
                <span className="tea-icon">🫖</span>
                <div className="tea-info">
                  <h4>{isEn ? "Peranakan Kung Fu Black" : "ชาดำกังฟูสูตรเปอรานากัน"}</h4>
                  <p>{isEn ? "Velvety malt body, dried fruit notes, pairs perfectly with sweets" : "รสเข้มข้น กลมกล่อม หอมกลิ่นผลไม้แห้ง เข้ากับขนมหวานได้ดีเยี่ยม"}</p>
                  <span className="tea-taste-tag">{isEn ? "Rich • Sweet Fruit" : "เข้มข้น • หอมหวาน"}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Delicacy Selection */}
          <div className="tea-step-group">
            <label className="tea-step-label">
              <span className="step-num">๒</span> <span>{t('tea_step_2')}</span>
            </label>
            <div className="tea-options-grid" id="pastryOptionsGrid">
              <div
                className={`pastry-option-card ${selectedPastry === 'taosae' ? 'active' : ''}`}
                onClick={() => setSelectedPastry('taosae')}
              >
                <span className="tea-icon">🥮</span>
                <div className="tea-info">
                  <h4>{isEn ? "Handmade Tao Sae Pastries (2 pcs)" : "ขนมเต้าส้อโบราณเต้าหมิง (๒ ชิ้น)"}</h4>
                  <p>{isEn ? "Crispy flaky crust, black pepper savory & sweet golden bean fillings" : "แป้งบางกรอบ ไส้เค็มพริกไทยดำ & ไส้หวานถั่วทอง อบสดร้อนๆ"}</p>
                </div>
              </div>

              <div
                className={`pastry-option-card ${selectedPastry === 'angku' ? 'active' : ''}`}
                onClick={() => setSelectedPastry('angku')}
              >
                <span className="tea-icon">🥟</span>
                <div className="tea-info">
                  <h4>{isEn ? "Ang Ku Kueh & Pepper Biscuits" : "อังกู๊โก้ย & ขนมพริกไทยโบราณ"}</h4>
                  <p>{isEn ? "Auspicious red tortoise cake and crunchy ancient pepper cookies" : "ขนมเต่าแดงมงคล แป้งเหนียวนุ่มไส้ถั่วกวน และคุกกี้พริกไทยกรุบกรอบ"}</p>
                </div>
              </div>

              <div
                className={`pastry-option-card ${selectedPastry === 'kosui' ? 'active' : ''}`}
                onClick={() => setSelectedPastry('kosui')}
              >
                <span className="tea-icon">🍮</span>
                <div className="tea-info">
                  <h4>{isEn ? "Cane Sugar Ko Sui Delicacy" : "ขนมโกสุ้ยน้ำตาลอ้อยสด"}</h4>
                  <p>{isEn ? "Traditional steamed palm sugar cake topped with fresh coconut flakes" : "ขนมถ้วยน้ำตาลอ้อยดั้งเดิม โรยมะพร้าวขูดใหม่ รสหวานละมุน"}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Interactive Brew Simulation Card */}
          <div className="tea-brew-simulation-card" id="teaBrewBox">
            <div className="brew-visual-wrapper">
              <div className="steaming-cup">
                <div className="steam-vapors">
                  <span></span><span></span><span></span>
                </div>
                <div className="cup-graphic" id="brewCupEmoji">{tea.emoji}</div>
              </div>
              <div className="brew-status-info">
                <h4 id="brewStatusTitle">
                  {isEn ? `Serving Set: ${tea.title_en} + ${pastry.name_en}` : `เซ็ตชาพร้อมเสิร์ฟ: ${tea.title_th} + ${pastry.name_th}`}
                </h4>
                <p id="brewStatusDesc">{isEn ? tea.desc_en : tea.desc_th}</p>
                <div className="tea-flavor-bars">
                  <div className="flavor-bar-item">
                    <span>กลิ่นหอม (Aroma)</span>
                    <div className="f-track"><div className="f-fill" id="aromaFill" style={{ width: tea.aroma }}></div></div>
                  </div>
                  <div className="flavor-bar-item">
                    <span>ความชุ่มคอ (Sweetness)</span>
                    <div className="f-track"><div className="f-fill" id="sweetFill" style={{ width: tea.sweet }}></div></div>
                  </div>
                  <div className="flavor-bar-item">
                    <span>ความผ่อนคลาย (Calmness)</span>
                    <div className="f-track"><div className="f-fill" id="calmFill" style={{ width: tea.calm }}></div></div>
                  </div>
                </div>
              </div>
            </div>

            <button
              type="button"
              className="btn btn-outline-sm btn-brew"
              onClick={handleBrew}
              disabled={isBrewing}
              id="brewActionBtn"
            >
              {isBrewing ? (isEn ? "⏳ Brewing fresh tea..." : "⏳ กำลังรินชาและสกัดกลิ่นหอม...") : (isEn ? "🫖 Brew & Taste Simulation" : "🫖 รินชา & ชิมรสชาติจำลอง (Brew & Taste)")}
            </button>
          </div>

          {/* Quick Booking Form in Modal */}
          <div className="tea-booking-form-box">
            <h4>{isEn ? "Reserve Real Session (Limited 16 seats/round):" : "สำรองที่นั่งรอบจริง (จำกัดรอบละ 16 ท่าน):"}</h4>
            <form onSubmit={handleRSVP} id="teaQuickBookingForm">
              <div className="tea-form-row">
                <input
                  type="text"
                  placeholder={isEn ? "Full Name" : "ชื่อ-นามสกุล / นามปากกา"}
                  value={guestName}
                  onChange={e => setGuestName(e.target.value)}
                  required
                />
                <input
                  type="tel"
                  placeholder={isEn ? "Phone / LINE ID" : "เบอร์โทรศัพท์ / LINE ID"}
                  value={guestPhone}
                  onChange={e => setGuestPhone(e.target.value)}
                  required
                />
                <select id="teaGuestRound" required>
                  <option value="round1">{isEn ? "Afternoon Round 02:00 - 03:15 PM" : "รอบบ่าย 14:00 - 15:15 น. (เหลือ 2 ที่)"}</option>
                  <option value="round2">{isEn ? "Evening Round 03:30 - 04:45 PM" : "รอบเย็น 15:30 - 16:45 น. (เหลือ 2 ที่)"}</option>
                </select>
              </div>
              <button type="submit" className="btn btn-primary btn-block" disabled={isSubmitting}>
                <span>{isSubmitting ? (isEn ? "⏳ Generating Digital Ticket..." : "⏳ กำลังออกตั๋วดิจิทัล...") : t('btn_confirm_tea_rsvp')}</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
