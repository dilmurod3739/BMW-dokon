'use client';

import * as React from 'react';
import { useState, useEffect, useCallback } from 'react';
import { AdminTab, BookingLead, BookingStatus } from '@/types/admin';
import {
  getBookings,
  getAdminMetrics,
  updateBookingStatus,
  deleteBooking,
  addBooking,
} from '@/lib/bookingsStorage';
import { CARS_DATA } from '@/data/cars';
import { AdminSidebar } from '@/components/admin/AdminSidebar';
import { AdminHeader } from '@/components/admin/AdminHeader';
import { DashboardTab } from '@/components/admin/DashboardTab';
import { BookingsTab } from '@/components/admin/BookingsTab';
import { CarsTab } from '@/components/admin/CarsTab';
import { DealershipsTab } from '@/components/admin/DealershipsTab';
import { NewBookingModal } from '@/components/admin/NewBookingModal';
import { AdminAuthGate, AUTH_STORAGE_KEY } from '@/components/admin/AdminAuthGate';

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isCheckingAuth, setIsCheckingAuth] = useState<boolean>(true);
  const [activeTab, setActiveTab] = useState<AdminTab>('dashboard');
  const [bookings, setBookings] = useState<BookingLead[]>([]);
  const [metrics, setMetrics] = useState(() => getAdminMetrics());
  const [searchQuery, setSearchQuery] = useState('');
  const [isNewBookingModalOpen, setIsNewBookingModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  const refreshData = useCallback(() => {
    const list = getBookings();
    setBookings(list);
    setMetrics(getAdminMetrics());
  }, []);

  useEffect(() => {
    try {
      const stored = sessionStorage.getItem(AUTH_STORAGE_KEY);
      if (stored === 'true') {
        setIsAuthenticated(true);
      }
    } catch {}
    setIsCheckingAuth(false);
  }, []);

  const handleLogout = () => {
    try {
      sessionStorage.removeItem(AUTH_STORAGE_KEY);
    } catch {}
    setIsAuthenticated(false);
    showToast('Tizimdan muvaffaqiyatli chiqildi');
  };

  useEffect(() => {
    if (!isAuthenticated) return;
    refreshData();

    const handleUpdate = () => {
      refreshData();
    };

    window.addEventListener('bmw-bookings-updated', handleUpdate);
    return () => {
      window.removeEventListener('bmw-bookings-updated', handleUpdate);
    };
  }, [refreshData]);

  const handleUpdateStatus = (id: string, status: BookingStatus) => {
    updateBookingStatus(id, status);
    refreshData();
    showToast(`Ariza holati muvaffaqiyatli o‘zgartirildi: ${status}`);
  };

  const handleDeleteBooking = (id: string) => {
    deleteBooking(id);
    refreshData();
    showToast('Ariza o‘chirildi');
  };

  const handleAddBooking = (
    lead: Omit<BookingLead, 'id' | 'createdAt' | 'status'> & { status?: BookingStatus }
  ) => {
    addBooking(lead);
    refreshData();
    showToast(`Yangi ariza muvaffaqiyatli qo‘shildi: ${lead.fullName}`);
  };

  const pendingCount = bookings.filter((b) => b.status === 'pending').length;

  if (isCheckingAuth) {
    return (
      <div className="min-h-screen bg-[#070709] flex items-center justify-center">
        <div className="w-8 h-8 rounded-full border-2 border-white/20 border-t-[#1C69D4] animate-spin" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <AdminAuthGate onAuthenticate={() => setIsAuthenticated(true)} />;
  }

  return (
    <div className="min-h-screen bg-[#070709] text-white flex flex-col md:flex-row antialiased selection:bg-[#1C69D4] selection:text-white">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-5 right-5 z-50 bg-[#1C69D4] text-white text-xs font-bold px-4 py-3 rounded-xl shadow-2xl border border-white/20 animate-fade-in flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-white animate-ping" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Left Sidebar */}
      <AdminSidebar
        activeTab={activeTab}
        onTabChange={(tab) => {
          setActiveTab(tab);
          setSearchQuery('');
        }}
        pendingCount={pendingCount}
        totalCarsCount={CARS_DATA.length}
        onLogout={handleLogout}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        <AdminHeader
          activeTab={activeTab}
          onOpenNewBookingModal={() => setIsNewBookingModalOpen(true)}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          pendingCount={pendingCount}
        />

        <main className="flex-1 p-6 sm:p-8 max-w-7xl w-full mx-auto">
          {activeTab === 'dashboard' && (
            <DashboardTab
              metrics={metrics}
              bookings={bookings}
              onNavigateTab={(tab) => {
                setActiveTab(tab);
                setSearchQuery('');
              }}
              onUpdateStatus={handleUpdateStatus}
            />
          )}

          {activeTab === 'bookings' && (
            <BookingsTab
              bookings={bookings}
              searchQuery={searchQuery}
              onUpdateStatus={handleUpdateStatus}
              onDeleteBooking={handleDeleteBooking}
            />
          )}

          {activeTab === 'cars' && <CarsTab searchQuery={searchQuery} />}

          {activeTab === 'dealerships' && <DealershipsTab bookings={bookings} />}
        </main>
      </div>

      {/* Manual New Booking Lead Modal */}
      <NewBookingModal
        isOpen={isNewBookingModalOpen}
        onClose={() => setIsNewBookingModalOpen(false)}
        onAddBooking={handleAddBooking}
      />
    </div>
  );
}
