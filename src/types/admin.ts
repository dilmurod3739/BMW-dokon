export type BookingStatus = 'pending' | 'confirmed' | 'completed' | 'cancelled';

export type BookingType = 'test-drive' | 'finance';

export interface BookingLead {
  id: string;
  fullName: string;
  phone: string;
  email: string;
  carId: string;
  preferredDate: string;
  dealershipId: string;
  notes?: string;
  status: BookingStatus;
  type: BookingType;
  createdAt: string;
}

export interface AdminMetrics {
  totalBookings: number;
  pendingBookings: number;
  confirmedBookings: number;
  completedBookings: number;
  cancelledBookings: number;
  totalCatalogCars: number;
  totalCatalogValueUSD: number;
  totalDealerships: number;
}

export type AdminTab = 'dashboard' | 'bookings' | 'cars' | 'dealerships';
