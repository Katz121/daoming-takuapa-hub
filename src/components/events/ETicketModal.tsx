'use client';

import React from 'react';
import { useApp } from '@/lib/store';
import Image from 'next/image';

export interface TicketData {
  id: string;
  ticketCode: string;
  eventId: string;
  eventTitle: string;
  eventTitleEn: string;
  guestName: string;
  guestPhone: string;
  seats: number;
  teaBlend?: string;
  pastryType?: string;
  totalAmount: number;
  status: string;
  qrDataUrl: string;
  createdAt: string;
  remainingSeatsAfter?: number;
}

interface ETicketModalProps {
  ticket: TicketData | null;
  onClose: () => void;
}

export function ETicketModal({ ticket, onClose }: ETicketModalProps) {
  const { lang, showToast } = useApp();

  if (!ticket) return null;
  const isEn = lang === 'en';

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = ticket.qrDataUrl;
    link.download = `DaoMing-Ticket-${ticket.ticketCode}.png`;
    link.click();
    showToast(isEn ? "📥 E-Ticket QR Code downloaded!" : "📥 บันทึกภาพ QR Code ตั๋วเข้างานสำเร็จแล้ว!");
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 overflow-y-auto animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative max-w-md w-full bg-[#FCF8F2] rounded-3xl overflow-hidden border-2 border-[#E5A31E] shadow-2xl my-8 p-6 sm:p-8 space-y-6 text-[#122421]"
        onClick={e => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-[#EDE4D5] hover:bg-[#E5A31E]/30 text-[#122421] flex items-center justify-center font-bold text-xs"
        >
          ✕
        </button>

        {/* Ticket Header */}
        <div className="text-center space-y-2 pt-2 border-b border-[#E5A31E]/30 pb-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#122421] text-[#E5A31E] font-mono text-xs font-bold">
            <span>🎟️ DAOMING DIGITAL PASS</span>
          </div>
          <h3 className="font-serif text-xl font-bold text-[#122421]">
            {isEn ? ticket.eventTitleEn : ticket.eventTitle}
          </h3>
          <span className="font-mono text-xs font-bold text-[#C44D27] block tracking-wider">
            TICKET NO: {ticket.ticketCode}
          </span>
        </div>

        {/* Center QR Box */}
        <div className="flex flex-col items-center justify-center bg-white p-4 rounded-2xl border-2 border-dashed border-[#E5A31E]/50 shadow-inner space-y-3">
          <div className="relative w-44 h-44 rounded-xl overflow-hidden bg-white p-2 border border-gray-200">
            <Image
              src={ticket.qrDataUrl}
              alt="E-Ticket QR Code"
              fill
              className="object-contain"
            />
          </div>
          <span className="font-mono text-[11px] text-[#122421]/60 text-center">
            {isEn ? "Scan at Dao Ming Reception Desk" : "แสดง QR Code นี้แก่เจ้าหน้าที่ ณ จุดต้อนรับเต้าหมิง"}
          </span>
        </div>

        {/* Pass Specs */}
        <div className="bg-[#EDE4D5]/40 rounded-2xl p-4 space-y-2 text-xs font-sans border border-[#E5A31E]/20">
          <div className="flex justify-between">
            <span className="text-[#122421]/60">{isEn ? 'Guest Name' : 'ชื่อผู้สำรองที่นั่ง'}:</span>
            <span className="font-bold text-[#122421]">{ticket.guestName}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-[#122421]/60">{isEn ? 'Phone Contact' : 'เบอร์โทรศัพท์'}:</span>
            <span className="font-mono font-semibold text-[#122421]">{ticket.guestPhone}</span>
          </div>
          {ticket.teaBlend && (
            <div className="flex justify-between">
              <span className="text-[#122421]/60">{isEn ? 'Tea Blend' : 'สายพันธุ์ชา'}:</span>
              <span className="font-medium text-[#C44D27]">{ticket.teaBlend}</span>
            </div>
          )}
          {ticket.pastryType && (
            <div className="flex justify-between">
              <span className="text-[#122421]/60">{isEn ? 'Delicacy' : 'ขนมจับคู่'}:</span>
              <span className="font-medium text-[#122421]">{ticket.pastryType}</span>
            </div>
          )}
          <div className="flex justify-between pt-2 border-t border-[#E5A31E]/20 font-bold">
            <span>{isEn ? 'Total Amount' : 'ยอดรวม'}:</span>
            <span className="text-[#C44D27] font-mono text-sm">
              {ticket.totalAmount > 0 ? `฿${ticket.totalAmount}` : (isEn ? 'Free Admission' : 'เข้าร่วมฟรี')}
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-3">
          <button
            onClick={handleDownload}
            className="flex-1 py-3 rounded-xl bg-[#EDE4D5] hover:bg-[#E5A31E]/30 text-[#122421] font-semibold text-xs font-mono transition-all border border-[#E5A31E]/30"
          >
            💾 {isEn ? 'Save QR Code' : 'บันทึก QR Code'}
          </button>
          <button
            onClick={handlePrint}
            className="flex-1 py-3 rounded-xl bg-[#C44D27] hover:bg-[#a83c1b] text-white font-bold text-xs shadow-md transition-all"
          >
            🖨️ {isEn ? 'Print Ticket' : 'พิมพ์บัตรเข้างาน'}
          </button>
        </div>
      </div>
    </div>
  );
}
