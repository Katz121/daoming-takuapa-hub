'use client';

import React from 'react';
import { useApp } from '@/lib/store';
import { Toast } from './Toast';
import { MobileDock } from './MobileDock';
import { AmbientSoundscape } from './AmbientSoundscape';
import { PhotoLightbox } from '../archive/PhotoLightbox';
import { TeaSimulatorModal } from '../events/TeaSimulatorModal';
import { ETicketModal } from '../events/ETicketModal';
import { VirtualTourModal } from '../spaces/VirtualTourModal';
import { AudioGuideModal } from '../timeline/AudioGuideModal';

export function AppModals() {
  const { activeTicket, setActiveTicket } = useApp();

  return (
    <>
      <MobileDock />
      <AmbientSoundscape />
      <Toast />
      <PhotoLightbox />
      <TeaSimulatorModal />
      <ETicketModal ticket={activeTicket} onClose={() => setActiveTicket(null)} />
      <VirtualTourModal />
      <AudioGuideModal />
    </>
  );
}
