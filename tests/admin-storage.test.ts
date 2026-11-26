import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { CARS_DATA, DEALERSHIPS } from '../src/data/cars';
import { ADMIN_PASSCODE } from '../src/components/admin/AdminAuthGate';
import {
  getBookings,
  addBooking,
  updateBookingStatus,
  deleteBooking,
  getAdminMetrics,
  INITIAL_DEMO_BOOKINGS,
} from '../src/lib/bookingsStorage';

describe('Admin Bookings Storage & Metrics Unit Tests', () => {
  it('retrieves default demo bookings with valid lead fields', () => {
    const list = getBookings();
    assert.ok(Array.isArray(list));
    assert.ok(list.length >= 5);

    const first = list[0];
    assert.ok(first.id);
    assert.ok(first.fullName);
    assert.ok(first.phone);
    assert.ok(first.carId);
    assert.ok(first.dealershipId);
    assert.ok(['pending', 'confirmed', 'completed', 'cancelled'].includes(first.status));
  });

  it('adds a new customer test-drive booking and returns unique lead object', () => {
    const initialCount = getBookings().length;
    const newLead = addBooking({
      fullName: 'Farhod Alimov',
      phone: '+998 (90) 999-11-22',
      email: 'f.alimov@test.uz',
      carId: 'bmw-m8-gran-coupe',
      dealershipId: 'tashkent-flagship',
      preferredDate: '2026-12-05',
      notes: 'BMW M8 Gran Coupe test-drive so‘rovi',
      type: 'test-drive',
      status: 'pending',
    });

    assert.ok(newLead.id.startsWith('lead-'));
    assert.equal(newLead.fullName, 'Farhod Alimov');
    assert.equal(newLead.status, 'pending');

    const updatedList = getBookings();
    assert.equal(updatedList.length, initialCount + 1);
    assert.equal(updatedList[0].id, newLead.id);
  });

  it('updates an existing booking status accurately', () => {
    const lead = addBooking({
      fullName: 'Test Mijoz',
      phone: '+998 90 000 00 00',
      email: 'test@bmw.uz',
      carId: 'bmw-i7-xdrive60',
      dealershipId: 'tashkent-flagship',
      preferredDate: '2026-12-10',
      type: 'test-drive',
    });

    assert.equal(lead.status, 'pending');

    const updated = updateBookingStatus(lead.id, 'confirmed');
    assert.equal(updated, true);

    const currentList = getBookings();
    const found = currentList.find((b) => b.id === lead.id);
    assert.ok(found);
    assert.equal(found?.status, 'confirmed');
  });

  it('safely deletes a booking by ID', () => {
    const lead = addBooking({
      fullName: 'O‘chiriladigan Mijoz',
      phone: '+998 99 111 22 33',
      email: 'delete@me.uz',
      carId: 'bmw-x7-m60i',
      dealershipId: 'samarkand-center',
      preferredDate: '2026-12-15',
      type: 'test-drive',
    });

    const countBefore = getBookings().length;
    const deleted = deleteBooking(lead.id);
    assert.equal(deleted, true);

    const countAfter = getBookings().length;
    assert.equal(countAfter, countBefore - 1);
    assert.equal(getBookings().some((b) => b.id === lead.id), false);
  });

  it('calculates accurate admin dashboard metrics', () => {
    const metrics = getAdminMetrics();
    assert.ok(metrics.totalBookings > 0);
    assert.equal(
      metrics.totalBookings,
      metrics.pendingBookings +
        metrics.confirmedBookings +
        metrics.completedBookings +
        metrics.cancelledBookings
    );
    assert.equal(metrics.totalCatalogCars, CARS_DATA.length);
    assert.ok(metrics.totalCatalogValueUSD > 500000);
    assert.equal(metrics.totalDealerships, DEALERSHIPS.length);
  });

  it('verifies admin security passcode BMW2027', () => {
    assert.equal(ADMIN_PASSCODE, 'BMW2027');
    assert.equal('BMW2027'.trim() === ADMIN_PASSCODE, true);
    assert.equal('wrong_code'.trim() === ADMIN_PASSCODE, false);
    assert.equal('1234'.trim() === ADMIN_PASSCODE, false);
  });
});
