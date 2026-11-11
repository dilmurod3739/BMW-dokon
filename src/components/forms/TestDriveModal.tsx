'use client';

import * as React from 'react';
import { CarColor } from '@/types/car';
import { Modal } from '@/components/ui/Modal';
import { BookingForm } from './BookingForm';

interface TestDriveModalProps {
  isOpen: boolean;
  onClose: () => void;
  carId?: string;
  selectedColor?: CarColor;
  customNote?: string;
}

export function TestDriveModal({
  isOpen,
  onClose,
  carId,
  selectedColor,
  customNote,
}: TestDriveModalProps) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="BMW Test-Drive va Lizing Arizasi"
      description="Bavariya qudrati va mislsiz haydash dinamikasini shaxsan his qiling"
      maxWidth="2xl"
    >
      <BookingForm
        key={`${carId || 'default'}-${selectedColor?.name || 'none'}-${customNote ? 'custom' : 'std'}-${isOpen ? 'open' : 'closed'}`}
        initialCarId={carId}
        initialColor={selectedColor}
        initialNotes={customNote}
        onSuccess={onClose}
      />
    </Modal>
  );
}
