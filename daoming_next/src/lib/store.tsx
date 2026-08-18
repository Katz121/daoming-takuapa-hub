'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Language } from '../types';
import { TRANSLATIONS } from '../data/translations';
import { TicketData } from '@/components/events/ETicketModal';

interface AppContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  t: (key: keyof typeof TRANSLATIONS['th']) => string;
  toastMsg: string | null;
  showToast: (msg: string) => void;
  selectedZone: string;
  setSelectedZone: (zone: string) => void;
  isTeaModalOpen: boolean;
  setTeaModalOpen: (open: boolean) => void;
  lightboxPhotoIndex: number | null;
  openLightbox: (index: number) => void;
  closeLightbox: () => void;
  activeTicket: TicketData | null;
  setActiveTicket: (ticket: TicketData | null) => void;
  isVirtualTourOpen: boolean;
  setVirtualTourOpen: (open: boolean) => void;
  isAudioGuideOpen: boolean;
  setAudioGuideOpen: (open: boolean) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Language>('th');
  const [toastMsg, setToastMsg] = useState<string | null>(null);
  const [selectedZone, setSelectedZone] = useState<string>('hall');
  const [isTeaModalOpen, setTeaModalOpen] = useState<boolean>(false);
  const [lightboxPhotoIndex, setLightboxPhotoIndex] = useState<number | null>(null);
  const [activeTicket, setActiveTicket] = useState<TicketData | null>(null);
  const [isVirtualTourOpen, setVirtualTourOpen] = useState<boolean>(false);
  const [isAudioGuideOpen, setAudioGuideOpen] = useState<boolean>(false);

  const t = (key: keyof typeof TRANSLATIONS['th']): string => {
    const dict = TRANSLATIONS[lang] || TRANSLATIONS.th;
    return (dict as any)[key] || key;
  };

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => {
      setToastMsg(null);
    }, 4000);
  };

  const openLightbox = (index: number) => {
    setLightboxPhotoIndex(index);
  };

  const closeLightbox = () => {
    setLightboxPhotoIndex(null);
  };

  return (
    <AppContext.Provider
      value={{
        lang,
        setLang,
        t,
        toastMsg,
        showToast,
        selectedZone,
        setSelectedZone,
        isTeaModalOpen,
        setTeaModalOpen,
        lightboxPhotoIndex,
        openLightbox,
        closeLightbox,
        activeTicket,
        setActiveTicket,
        isVirtualTourOpen,
        setVirtualTourOpen,
        isAudioGuideOpen,
        setAudioGuideOpen
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
