'use client';

import * as React from 'react';
import { useState } from 'react';
import { Car, CarCategory, CarColor } from '@/types/car';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { HeroSection } from '@/components/home/HeroSection';
import { BrandStory } from '@/components/home/BrandStory';
import { DealershipsSection } from '@/components/home/DealershipsSection';
import { CtaBanner } from '@/components/home/CtaBanner';
import { CatalogSection } from '@/components/catalog/CatalogSection';
import { ConfiguratorStudio } from '@/components/catalog/ConfiguratorStudio';
import { FinanceCalculator } from '@/components/finance/FinanceCalculator';
import { CarDetailModal } from '@/components/catalog/CarDetailModal';
import { TestDriveModal } from '@/components/forms/TestDriveModal';
import { CompareModal } from '@/components/compare/CompareModal';
import { GarageModal } from '@/components/garage/GarageModal';
import { useFavorites } from '@/hooks/useFavorites';

export default function HomePage() {
  const {
    favoriteIds,
    toggleFavorite,
    clearFavorites,
    count: favoriteCount,
  } = useFavorites();

  const [selectedCategory, setSelectedCategory] = useState<CarCategory>('all');
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

  const handleBookFromCard = (car: Car, selectedColor?: CarColor) => {
    handleOpenTestDrive(car.id, selectedColor);
  };

  const handleScrollToCatalog = () => {
    const catalogElem = document.getElementById('catalog');
    if (catalogElem) {
      catalogElem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0A0C] text-white flex flex-col selection:bg-[#0066B1] selection:text-white">
      {/* Navigation */}
      <Navbar
        onOpenTestDrive={handleOpenTestDrive}
        onSelectCategory={setSelectedCategory}
        favoriteCount={favoriteCount}
        onOpenGarage={() => setIsGarageOpen(true)}
        onOpenCompare={() => handleOpenCompare()}
      />

      {/* Main Content */}
      <main className="flex-1">
        {/* 1. Cinematic Hero Section */}
        <HeroSection
          onExploreModels={handleScrollToCatalog}
          onOpenTestDrive={() => handleOpenTestDrive()}
        />

        {/* 2. Interactive Models Catalog */}
        <CatalogSection
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
          onViewDetails={handleViewDetails}
          onBookTestDrive={handleBookFromCard}
          favoriteIds={favoriteIds}
          onToggleFavorite={toggleFavorite}
          onCompare={(carId) => handleOpenCompare([carId])}
        />

        {/* 3. BMW Individual Configurator Studio */}
        <ConfiguratorStudio
          onBookTestDrive={(car, color) => handleOpenTestDrive(car.id, color)}
          onViewDetails={handleViewDetails}
        />

        {/* 4. BMW Heritage & Brand Story */}
        <BrandStory />

        {/* 5. Dealerships Network in Uzbekistan */}
        <DealershipsSection
          onBookTestDrive={() => handleOpenTestDrive()}
        />

        {/* 6. BMW Financial Services / Lizing Kalkulyatori */}
        <FinanceCalculator
          onApplyFinance={(car, note) => handleOpenTestDrive(car.id, undefined, note)}
        />

        {/* 7. Call To Action Banner */}
        <CtaBanner
          onOpenTestDrive={() => handleOpenTestDrive()}
          onExploreModels={handleScrollToCatalog}
        />
      </main>

      {/* Footer */}
      <Footer
        onOpenTestDrive={() => handleOpenTestDrive()}
        onSelectCategory={setSelectedCategory}
      />

      {/* Quick View Modal */}
      <CarDetailModal
        car={detailCar}
        isOpen={isDetailOpen}
        onClose={handleCloseDetails}
        onBookTestDrive={(car, color) => handleOpenTestDrive(car.id, color)}
        initialColorIndex={detailInitialColorIndex}
      />

      {/* Test-Drive Booking Modal */}
      <TestDriveModal
        isOpen={isTestDriveOpen}
        onClose={handleCloseTestDrive}
        carId={testDriveCarId}
        selectedColor={testDriveColor}
        customNote={testDriveNote}
      />

      {/* Models Comparison Modal */}
      <CompareModal
        isOpen={isCompareOpen}
        onClose={() => setIsCompareOpen(false)}
        initialCarIds={compareCarIds}
        onBookTestDrive={(car) => handleOpenTestDrive(car.id)}
      />

      {/* My Garage / Favorites Modal */}
      <GarageModal
        isOpen={isGarageOpen}
        onClose={() => setIsGarageOpen(false)}
        favoriteIds={favoriteIds}
        onToggleFavorite={toggleFavorite}
        onClearFavorites={clearFavorites}
        onViewDetails={handleViewDetails}
        onBookTestDrive={(car) => handleOpenTestDrive(car.id)}
        onOpenCompare={(ids) => {
          setIsGarageOpen(false);
          handleOpenCompare(ids);
        }}
      />
    </div>
  );
}
