'use client';

import * as React from 'react';
import { createContext, useContext, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Car, CarCategory, CarColor } from '@/types/car';
import { CARS_DATA } from '@/data/cars';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { CarDetailModal } from '@/components/catalog/CarDetailModal';
import { TestDriveModal } from '@/components/forms/TestDriveModal';
import { CompareModal } from '@/components/compare/CompareModal';
import { GarageModal } from '@/components/garage/GarageModal';
import { useFavorites } from '@/hooks/useFavorites';

interface SiteModalContextType {
  openTestDrive: (carId?: string, selectedColor?: CarColor, customNote?: string) => void;
  openCarDetail: (car: Car, initialColorIndex?: number) => void;
  openCompare: (carIds?: string[]) => void;
  openGarage: () => void;
  favoriteIds: string[];
  toggleFavorite: (carId: string) => void;
}

const SiteModalContext = createContext<SiteModalContextType | undefined>(undefined);

export function useSiteModal() {
  const ctx = useContext(SiteModalContext);
  if (!ctx) {
    throw new Error('useSiteModal must be used within a SiteLayout');
  }
  return ctx;
}

export function SiteLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const {
    favoriteIds,
    toggleFavorite,
    clearFavorites,
    count: favoriteCount,
  } = useFavorites();

  const [detailCar, setDetailCar] = useState<Car | null>(null);
  const [detailInitialColorIndex, setDetailInitialColorIndex] = useState<number>(0);
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  const [testDriveCarId, setTestDriveCarId] = useState<string | undefined>(undefined);
  const [testDriveColor, setTestDriveColor] = useState<CarColor | undefined>(undefined);
  const [testDriveNote, setTestDriveNote] = useState<string | undefined>(undefined);
  const [isTestDriveOpen, setIsTestDriveOpen] = useState(false);

  const [isCompareOpen, setIsCompareOpen] = useState(false);
  const [compareCarIds, setCompareCarIds] = useState<string[]>([]);
  const [isGarageOpen, setIsGarageOpen] = useState(false);

  const handleOpenCompare = (carIds?: string[]) => {
    if (carIds && carIds.length > 0) {
      setCompareCarIds(carIds);
    }
    setIsCompareOpen(true);
  };

  const handleOpenTestDrive = (
    carId?: string,
    selectedColor?: CarColor,
    customNote?: string
  ) => {
    setTestDriveCarId(carId);
    setTestDriveColor(selectedColor);
    setTestDriveNote(customNote);
    setIsTestDriveOpen(true);
  };

  const handleCloseTestDrive = () => {
    setIsTestDriveOpen(false);
    setTestDriveCarId(undefined);
    setTestDriveColor(undefined);
    setTestDriveNote(undefined);
  };

  const handleViewDetails = (car: Car, initialColorIndex: number = 0) => {
    setDetailCar(car);
    setDetailInitialColorIndex(initialColorIndex);
    setIsDetailOpen(true);
  };

  const handleCloseDetails = () => {
    setIsDetailOpen(false);
    setDetailCar(null);
  };

  const handleSelectCategory = (category: CarCategory) => {
    router.push(`/models${category !== 'all' ? `?category=${category}` : ''}`);
  };

  const handleSelectCarFromNavbar = (carId: string) => {
    const car = CARS_DATA.find((c) => c.id === carId);
    if (car) {
      handleViewDetails(car);
    }
  };

  return (
    <SiteModalContext.Provider
      value={{
        openTestDrive: handleOpenTestDrive,
        openCarDetail: handleViewDetails,
        openCompare: handleOpenCompare,
        openGarage: () => setIsGarageOpen(true),
        favoriteIds,
        toggleFavorite,
      }}
    >
      <div className="min-h-screen bg-[#0A0A0C] text-white flex flex-col selection:bg-[#0066B1] selection:text-white">
        {/* Navigation */}
        <Navbar
          onOpenTestDrive={handleOpenTestDrive}
          onSelectCategory={handleSelectCategory}
          onSelectCar={handleSelectCarFromNavbar}
          favoriteCount={favoriteCount}
          onOpenGarage={() => setIsGarageOpen(true)}
          onOpenCompare={() => handleOpenCompare()}
        />

        {/* Page Content */}
        <div className="flex-1 flex flex-col">{children}</div>

        {/* Global Footer */}
        <Footer
          onOpenTestDrive={handleOpenTestDrive}
          onSelectCategory={handleSelectCategory}
        />

        {/* Global Modals */}
        <CarDetailModal
          car={detailCar}
          initialColorIndex={detailInitialColorIndex}
          isOpen={isDetailOpen}
          onClose={handleCloseDetails}
          onBookTestDrive={(car, color) => {
            handleCloseDetails();
            handleOpenTestDrive(car.id, color);
          }}
        />

        <TestDriveModal
          isOpen={isTestDriveOpen}
          onClose={handleCloseTestDrive}
          carId={testDriveCarId}
          selectedColor={testDriveColor}
          customNote={testDriveNote}
        />

        <CompareModal
          isOpen={isCompareOpen}
          onClose={() => setIsCompareOpen(false)}
          initialCarIds={compareCarIds}
          onBookTestDrive={(car: Car) => {
            setIsCompareOpen(false);
            handleOpenTestDrive(car.id);
          }}
        />

        <GarageModal
          isOpen={isGarageOpen}
          onClose={() => setIsGarageOpen(false)}
          favoriteIds={favoriteIds}
          onToggleFavorite={toggleFavorite}
          onClearFavorites={clearFavorites}
          onViewDetails={(car) => {
            setIsGarageOpen(false);
            handleViewDetails(car);
          }}
          onBookTestDrive={(car) => {
            setIsGarageOpen(false);
            handleOpenTestDrive(car.id);
          }}
          onOpenCompare={(carIds: string[]) => {
            setIsGarageOpen(false);
            handleOpenCompare(carIds);
          }}
        />
      </div>
    </SiteModalContext.Provider>
  );
}
