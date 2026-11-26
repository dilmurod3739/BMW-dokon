import { BookingLead, BookingStatus, AdminMetrics } from '@/types/admin';
import { CARS_DATA, DEALERSHIPS } from '@/data/cars';

const STORAGE_KEY = 'bmw_admin_bookings_v1';

export const INITIAL_DEMO_BOOKINGS: BookingLead[] = [
  {
    id: 'lead-101',
    fullName: 'Azizbek Rahimov',
    phone: '+998 (90) 123-45-67',
    email: 'azizbek.rahimov@example.com',
    carId: 'bmw-m8-gran-coupe',
    preferredDate: '2026-11-28',
    dealershipId: 'tashkent-flagship',
    notes: 'Tanlangan rang: Isle of Man Green (#1B4D3E). Kredit shartlari bilan qiziqmoqda.',
    status: 'pending',
    type: 'test-drive',
    createdAt: '2026-11-26T09:30:00.000Z',
  },
  {
    id: 'lead-102',
    fullName: 'Jasur Toshmatov',
    phone: '+998 (97) 777-88-99',
    email: 'j.toshmatov@company.uz',
    carId: 'bmw-i7-xdrive60',
    preferredDate: '2026-11-29',
    dealershipId: 'tashkent-flagship',
    notes: 'To‘liq elektr flagman i7. Korporativ lizing asosida sotib olish rejalashtirilgan.',
    status: 'confirmed',
    type: 'test-drive',
    createdAt: '2026-11-25T14:15:00.000Z',
  },
  {
    id: 'lead-103',
    fullName: 'Nodira Karimova',
    phone: '+998 (93) 555-12-34',
    email: 'n.karimova@gmail.com',
    carId: 'bmw-x7-m60i',
    preferredDate: '2026-11-27',
    dealershipId: 'samarkand-center',
    notes: '7 o‘rindiqli oilaviy premium SUV. Shanba kuni soat 11:00 da sinov haydashi.',
    status: 'completed',
    type: 'test-drive',
    createdAt: '2026-11-24T11:00:00.000Z',
  },
  {
    id: 'lead-104',
    fullName: 'Sherzod Aliyev',
    phone: '+998 (99) 888-00-11',
    email: 'sherzod.aliyev@mail.uz',
    carId: 'bmw-m4-competition',
    preferredDate: '2026-11-30',
    dealershipId: 'tashkent-flagship',
    notes: 'Sao Paulo Yellow rangi bo‘yicha individual konsultatsiya.',
    status: 'confirmed',
    type: 'test-drive',
    createdAt: '2026-11-26T08:20:00.000Z',
  },
  {
    id: 'lead-105',
    fullName: 'Jamshid Umarov',
    phone: '+998 (91) 333-44-55',
    email: 'j.umarov@finance.uz',
    carId: 'bmw-x5-m-competition',
    preferredDate: '2026-12-01',
    dealershipId: 'fergana-branch',
    notes: '[BMW Financial Services] Lizing: Boshlang‘ich 30%, 36 oy muddat.',
    status: 'pending',
    type: 'finance',
    createdAt: '2026-11-26T12:45:00.000Z',
  },
];

let memoryBookings: BookingLead[] = [...INITIAL_DEMO_BOOKINGS];

export function getBookings(): BookingLead[] {
  if (typeof window === 'undefined') {
    return memoryBookings;
  }
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_DEMO_BOOKINGS));
      return INITIAL_DEMO_BOOKINGS;
    }
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed) && parsed.length > 0) {
      return parsed;
    }
    return INITIAL_DEMO_BOOKINGS;
  } catch {
    return memoryBookings;
  }
}

export function saveBookings(bookings: BookingLead[]): void {
  memoryBookings = [...bookings];
  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(bookings));
      window.dispatchEvent(new Event('bmw-bookings-updated'));
    } catch (e) {
      console.warn('Failed to save to localStorage:', e);
    }
  }
}

export function addBooking(
  booking: Omit<BookingLead, 'id' | 'createdAt' | 'status'> & { status?: BookingStatus }
): BookingLead {
  const current = getBookings();
  const newLead: BookingLead = {
    ...booking,
    id: `lead-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
    status: booking.status || 'pending',
    createdAt: new Date().toISOString(),
  };

  const updated = [newLead, ...current];
  saveBookings(updated);
  return newLead;
}

export function updateBookingStatus(id: string, status: BookingStatus): boolean {
  const current = getBookings();
  const index = current.findIndex((b) => b.id === id);
  if (index === -1) return false;

  current[index] = { ...current[index], status };
  saveBookings(current);
  return true;
}

export function deleteBooking(id: string): boolean {
  const current = getBookings();
  const filtered = current.filter((b) => b.id !== id);
  if (filtered.length === current.length) return false;

  saveBookings(filtered);
  return true;
}

export function getAdminMetrics(): AdminMetrics {
  const bookings = getBookings();
  const pendingBookings = bookings.filter((b) => b.status === 'pending').length;
  const confirmedBookings = bookings.filter((b) => b.status === 'confirmed').length;
  const completedBookings = bookings.filter((b) => b.status === 'completed').length;
  const cancelledBookings = bookings.filter((b) => b.status === 'cancelled').length;

  const totalCatalogCars = CARS_DATA.length;
  const totalCatalogValueUSD = CARS_DATA.reduce((sum, car) => sum + car.price, 0);
  const totalDealerships = DEALERSHIPS.length;

  return {
    totalBookings: bookings.length,
    pendingBookings,
    confirmedBookings,
    completedBookings,
    cancelledBookings,
    totalCatalogCars,
    totalCatalogValueUSD,
    totalDealerships,
  };
}
