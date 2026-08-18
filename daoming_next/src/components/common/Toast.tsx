'use client';

import React from 'react';
import { useApp } from '@/lib/store';

export function Toast() {
  const { toastMsg } = useApp();

  if (!toastMsg) return null;

  return (
    <div className="fixed bottom-24 sm:bottom-8 right-4 sm:right-8 z-50 flex items-center gap-3 px-5 py-3 rounded-xl bg-[#122421] text-white border-2 border-[#E5A31E] shadow-2xl animate-in slide-in-from-bottom-5 fade-in duration-300">
      <span className="w-6 h-6 rounded-full bg-[#E5A31E] text-[#122421] flex items-center justify-center font-bold text-xs">
        ✓
      </span>
      <p className="text-sm font-medium">{toastMsg}</p>
    </div>
  );
}
