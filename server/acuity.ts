/**
 * Same-origin proxy for Skylar's public Acuity scheduler, used by the branded
 * booking flow. Acuity's scheduling endpoints send no CORS headers, so the
 * browser reaches them through /api/acuity/* (Cloudflare Worker in
 * production, Vite middleware in dev). Only public, read-only data passes
 * through: the session and package catalog, and open times.
 */
const OWNER_ID = '37370862';
const OWNER_KEY = '0d64f5fe';
const ACUITY = 'https://app.acuityscheduling.com';
export const TIMEZONE = 'America/New_York';

type Grouped<T> = Record<string, T[]>;
type AppointmentType = { id: number; name: string; active: boolean; private: boolean; description: string; duration: number; price: string; category: string; type: string; classSize: number | null; calendarIDs: number[] };
type Product = { id: number; title: string; description: string; formattedPrice: string; category: string; isSubscription: boolean; subscriptionTermsText: string };

const json = (body: unknown, maxAge: number) =>
  new Response(JSON.stringify(body), { headers: { 'content-type': 'application/json', 'cache-control': `public, max-age=${maxAge}` } });

async function catalog() {
  const html = await (await fetch(`${ACUITY}/schedule.php?owner=${OWNER_ID}`)).text();
  const match = html.match(/var BUSINESS = (\{.*?\});\s*var CLIENT_INFO/s);
  if (!match) return json({ error: 'Could not read the Acuity catalog' }, 0);
  const business = JSON.parse(match[1]) as { appointmentTypes: Grouped<AppointmentType>; products: Grouped<Product> };
  const services = Object.values(business.appointmentTypes)
    .flat()
    .filter((t) => t.active && !t.private)
    .map(({ id, name, description, duration, price, category, type, classSize, calendarIDs }) => ({ id, name, description, duration, price, category, type, classSize, calendarIDs }));
  const products = Object.values(business.products ?? {}).flat();
  return json({ services, products }, 300);
}

async function times(params: URLSearchParams) {
  const type = params.get('appointmentTypeId') ?? '';
  const calendar = params.get('calendarId') ?? '';
  const start = params.get('startDate') ?? '';
  if (!/^\d+$/.test(type) || !/^\d+$/.test(calendar) || !/^\d{4}-\d{2}-\d{2}$/.test(start)) return json({ error: 'Bad request' }, 0);
  const query = new URLSearchParams({ owner: OWNER_KEY, appointmentTypeId: type, calendarId: calendar, startDate: start, timezone: TIMEZONE, maxDays: '21' });
  const res = await fetch(`${ACUITY}/api/scheduling/v1/availability/times?${query}`);
  return new Response(res.body, { status: res.status, headers: { 'content-type': 'application/json', 'cache-control': 'no-store' } });
}

export async function handleAcuity(url: URL): Promise<Response | null> {
  if (url.pathname === '/api/acuity/catalog') return catalog();
  if (url.pathname === '/api/acuity/times') return times(url.searchParams);
  return null;
}

/** Acuity's own checkout for one open time, with the client's details filled in. */
export function checkoutUrl(serviceId: number, calendarId: number, time: string, client: { firstName: string; lastName: string; email: string; phone: string }) {
  const query = new URLSearchParams({ 'appointmentTypeIds[]': String(serviceId), ...client });
  return `${ACUITY}/schedule/${OWNER_KEY}/appointment/${serviceId}/calendar/${calendarId}/datetime/${encodeURIComponent(time)}?${query}`;
}

export const packageUrl = (productId: number) => `${ACUITY}/catalog.php?owner=${OWNER_ID}&action=addCart&clear=1&id=${productId}`;
