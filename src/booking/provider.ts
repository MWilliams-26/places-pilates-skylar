/**
 * Where bookings happen. The Schedule page renders whichever provider is set
 * here: live booking in the site's design on Skylar's Acuity data
 * (components/LiveBooking.tsx), the clickable prototype (components/Booking.tsx),
 * a platform's own embed, or a link to its hosted booking page.
 */
export type BookingProvider =
  | { kind: 'live' }
  | { kind: 'prototype' }
  | { kind: 'embed'; name: string; src: string }
  | { kind: 'link'; name: string; href: string };

/**
 * Skylar's live "Places, Pilates" Acuity account, shown in the site's design.
 * Her Acuity embed instead: { kind: 'embed', name: 'Acuity Scheduling',
 * src: 'https://app.acuityscheduling.com/schedule.php?owner=37370862&ref=embedded_csp' }
 */
export const bookingProvider: BookingProvider = { kind: 'live' };
