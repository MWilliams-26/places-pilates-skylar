/*
 * Site copy and data: draft copy for Skylar's review.
 * Facts come from Skylar's own public materials (see docs/RESEARCH.md).
 * Anything unconfirmed is shown as a visible placeholder, never invented.
 */

export const links = {
  instagram: 'https://www.instagram.com/placespilates/',
  email: 'skylarnicolecreative@gmail.com',
};

/**
 * Real posts from @placespilates, shown as posted with their captions.
 * Mockup use only: Skylar must approve every photo before public launch
 * (docs/ASSETS.md).
 */
export const instagramPosts = [
  {
    id: 'Dd4zqNAFLVq',
    image: '/images/ig/post-face-behind-places.webp',
    alt: 'Skylar on a mat holding a small ball, with the text: allow me to reintroduce myself, founder of Places, Pilates',
    caption: 'the face behind Places, i can’t wait to see you in the studio!!',
    kind: 'carousel',
  },
  {
    id: 'DWm1ZbrlLCq',
    image: '/images/ig/skylar-founding-day.webp',
    alt: 'Skylar taking a mirror selfie at home, holding her new LLC binder',
    caption: 'allow me reintroduce myself🤍 hi! i’m skylar! ✨OFFICIAL✨ FOUNDER',
    kind: 'carousel',
  },
  {
    id: 'Ddjx56AFLwG',
    image: '/images/ig/skylar-studio.webp',
    alt: 'Skylar taking a mirror selfie in a reformer studio',
    caption: 'the many stages of my career… one thing that’s always stayed. my love of people. my love of movement.',
    kind: 'carousel',
  },
  {
    id: 'Daobm5_h56F',
    image: '/images/ig/post-better-together.webp',
    alt: 'Graphic: Pilates is Better Together, bring a friend, receive a discount',
    caption: 'building community one friend at a time 🤍',
    kind: 'photo',
  },
  {
    id: 'DaxtDWZhm6K',
    image: '/images/ig/post-midday-movement.webp',
    alt: 'Skylar at the barre in a mirrored studio, with the text: midday movement between clients and classes',
    caption: 'movement doesn’t have to take long, be fancy, or take up any extra brain space',
    kind: 'reel',
  },
  {
    id: 'DdxIPShBLLH',
    image: '/images/ig/post-class-schedule.webp',
    alt: 'The Places, Pilates weekly class schedule graphic',
    caption: 'weekly class schedule 🥰✨ can’t wait to move with you!!!',
    kind: 'photo',
  },
  {
    id: 'DeeQM0KzfUa',
    image: '/images/ig/post-day-in-life.webp',
    alt: 'Skylar putting her hair up in a mirror, with the text: spend the day with me as a freelance Pilates instructor in NYC',
    caption: 'summer day as a freelance Pilates Instructor🤍',
    kind: 'reel',
  },
  {
    id: 'Dej6S-slMvp',
    image: '/images/ig/post-hot-takes.webp',
    alt: 'Skylar mid-laugh, with the text: hills i will die on as a pilates instructor',
    caption: 'hot takes or just lukewarm?? What are some of your fitness/movement hills?',
    kind: 'carousel',
  },
] as const;

/** Feature switches for things that depend on Skylar's decisions. */
export const features = {
  /** Show the studio page in navigation once a space is secured. Until then it is a preview at /studio. */
  studioInNav: false,
};

export const nav = [
  { label: 'About', href: '/about' },
  { label: 'Classes', href: '/classes' },
  { label: 'Schedule', href: '/book' },
  { label: 'Pricing', href: '/pricing' },
  { label: 'Community', href: '/community' },
  { label: 'Contact', href: '/contact' },
];

export type ClassFormat = {
  id: string;
  name: string;
  kind: 'Group' | 'Private' | 'Virtual';
  /** As currently published; null when sources disagree or say nothing. */
  duration: string | null;
  summary: string;
  goodFor: string;
  expect: string[];
};

/** Only private sessions are on Skylar's online calendar today; the other formats go through Contact. */
export const classAction = (c: ClassFormat) =>
  c.id === 'private' ? { href: '/book', label: `Book a ${c.name}` } : { href: '/contact', label: `Ask about ${c.name}` };

export const classFormats: ClassFormat[] = [
  {
    id: 'group-reformer',
    name: 'Group Reformer',
    kind: 'Group',
    duration: '50 min',
    summary: 'A small-group class on the reformer. Springs, straps, and clear cueing build strength from the center out.',
    goodFor: 'Building strength and control, with the support of the machine.',
    expect: ['A full-body reformer session', 'Personal cueing in a small group', 'Modifications offered throughout'],
  },
  {
    id: 'mat-pop-up',
    name: 'Mat Pilates Pop-Up',
    kind: 'Group',
    duration: null,
    summary: 'Mat Pilates, popping up around the city. Core strength, control, and alignment, with no equipment needed.',
    goodFor: 'Trying Pilates for the first time, or keeping it up between reformer classes.',
    expect: ['Mat work, no machines', 'Dates and locations announced on Instagram'],
  },
  {
    id: 'private',
    name: 'Private Session',
    kind: 'Private',
    duration: null,
    summary: 'One-on-one instruction tailored to your body, your goals, and your schedule.',
    goodFor: 'A personal program, a specific goal, or your first time on a reformer.',
    expect: ['A session built around you', 'Your pace, your focus'],
  },
  {
    id: 'virtual',
    name: 'Virtual Session',
    kind: 'Virtual',
    duration: '1 hr',
    summary: 'Pilates anywhere: a live session with Skylar from your living room, dressing room, or hotel room.',
    goodFor: 'Performers on tour, busy weeks, and anyone outside New York.',
    expect: ['Live, one-on-one online', 'Mat-based work you can do at home'],
  },
];

/**
 * Current published rates, shown as provisional. They come from the studio's
 * current scheduler and differ from older listings (see docs/RESEARCH.md),
 * so none of them is final until Skylar confirms.
 */
export const provisionalPricing = [
  {
    group: 'Group Reformer',
    items: [
      { name: 'Single class', price: '$25' },
      { name: '4-class pack', price: '$100' },
      { name: '8-class pack', price: '$184' },
      { name: '12-class pack', price: '$240', note: 'No expiration' },
    ],
  },
  {
    group: 'Private sessions',
    items: [
      { name: 'Single session', price: '$150' },
      { name: '4-session pack', price: '$588' },
      { name: '6-session pack', price: '$840' },
      { name: '12-session pack', price: '$1,440' },
    ],
  },
  {
    group: 'Programs & pop-ups',
    items: [
      { name: 'Private program, 6 weeks (2×/week)', price: '$210/week' },
      { name: 'Private program, 12 weeks (2×/week)', price: '$194/week' },
      { name: 'Mat Pilates Pop-Up', price: '$15' },
    ],
  },
];
