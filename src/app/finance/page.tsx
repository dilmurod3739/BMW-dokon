'use client';

import * as React from 'react';
import { SiteLayout, useSiteModal } from '@/components/layout/SiteLayout';
import { FinanceCalculator } from '@/components/finance/FinanceCalculator';

function FinanceContent() {
  const { openTestDrive } = useSiteModal();

  return (
    <div className="pt-20">
      <FinanceCalculator
        onApplyFinance={(car, note) => openTestDrive(car.id, undefined, note)}
      />
    </div>
  );
}

export default function FinancePage() {
  return (
    <SiteLayout>
      <FinanceContent />
    </SiteLayout>
  );
}
