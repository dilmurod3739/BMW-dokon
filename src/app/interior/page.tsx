'use client';

import * as React from 'react';
import { SiteLayout, useSiteModal } from '@/components/layout/SiteLayout';
import { InteriorSection } from '@/components/home/InteriorSection';
import { CARS_DATA } from '@/data/cars';

function InteriorContent() {
  const { openTestDrive, openCarDetail } = useSiteModal();

  return (
    <div className="pt-20">
      <InteriorSection
        onBookTestDrive={(carId, interiorColor) => {
          openTestDrive(
            carId,
            undefined,
            interiorColor
              ? `Tanlangan salon: ${interiorColor.name} (${interiorColor.material})`
              : undefined
          );
        }}
        onViewDetails={(car) => openCarDetail(car)}
      />
    </div>
  );
}

export default function InteriorPage() {
  return (
    <SiteLayout>
      <InteriorContent />
    </SiteLayout>
  );
}
