'use client';

import * as React from 'react';
import { SiteLayout, useSiteModal } from '@/components/layout/SiteLayout';
import { ConfiguratorStudio } from '@/components/catalog/ConfiguratorStudio';

function ConfiguratorContent() {
  const { openTestDrive, openCarDetail } = useSiteModal();

  return (
    <div className="pt-20">
      <ConfiguratorStudio
        onBookTestDrive={(car, color) => openTestDrive(car.id, color)}
        onViewDetails={(car) => openCarDetail(car)}
      />
    </div>
  );
}

export default function ConfiguratorPage() {
  return (
    <SiteLayout>
      <ConfiguratorContent />
    </SiteLayout>
  );
}
