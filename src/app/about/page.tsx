'use client';

import * as React from 'react';
import { SiteLayout, useSiteModal } from '@/components/layout/SiteLayout';
import { BrandStory } from '@/components/home/BrandStory';
import { DealershipsSection } from '@/components/home/DealershipsSection';

function AboutContent() {
  const { openTestDrive } = useSiteModal();

  return (
    <div className="pt-20">
      {/* 1. BMW Heritage & Brand Story */}
      <BrandStory />

      {/* 2. Official Dealerships in Uzbekistan */}
      <div id="dealers">
        <DealershipsSection onBookTestDrive={() => openTestDrive()} />
      </div>
    </div>
  );
}

export default function AboutPage() {
  return (
    <SiteLayout>
      <AboutContent />
    </SiteLayout>
  );
}
