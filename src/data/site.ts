/**
 * Single source of truth for all site content.
 * Swap the bracketed placeholders for real studio details before launch.
 */

/**
 * The studio's number, defined once. `display` is what people read,
 * `e164` drives the tel: and wa.me links — change both together.
 */
const studioPhone = {
  display: '+91 70870 97401',
  e164: '917087097401',
} as const;

export const studio = {
  name: 'vSM Innovators',
  tagline: 'Interior Design Studio · Punjab',
  blurb:
    'Luxury interior design for residences, villas and farmhouses in Jalandhar, Ludhiana and Amritsar.',
  founder: 'Mehul Jain',
  cities: ['Jalandhar', 'Ludhiana', 'Amritsar'],
  /** Full studio address, one line per rendered row. */
  address: [
    '1st Floor, 400 Satyam Hospital Lane',
    'Opp. M.G.N. Public School, Krishna Nagar',
    'Adarsh Nagar, Jalandhar, Punjab 144008',
  ],
  /** Condensed form for tight spaces such as the menu overlay. */
  addressShort: 'Krishna Nagar, Adarsh Nagar, Jalandhar',
  visitNote: 'Visits by appointment',
  mapUrl:
    'https://www.google.com/maps/search/?api=1&query=' +
    encodeURIComponent(
      'vSM Innovators, 1st Floor 400 Satyam Hospital Lane, Krishna Nagar, Adarsh Nagar, Jalandhar, Punjab 144008',
    ),
  phone: studioPhone.display,
  phoneHref: `tel:+${studioPhone.e164}`,
  email: 'hello@vsminnovators.com',
  whatsapp: `https://wa.me/${studioPhone.e164}`,
  whatsappNumber: studioPhone.display,
  instagram: 'https://instagram.com/vsminnovators',
  instagramHandle: '@vsminnovators',
} as const;

export type NavItem = { label: string; path: string };

export const navigation: NavItem[] = [
  { label: 'Home', path: '/' },
  { label: 'Portfolio', path: '/portfolio' },
  { label: 'Studio', path: '/studio' },
  { label: 'Services', path: '/services' },
  { label: 'Process', path: '/process' },
  { label: 'Journal', path: '/journal' },
  { label: 'Contact', path: '/contact' },
];

export const heroSlides = [
  {
    id: 'hero-0',
    src: '/hero/haveli-living-room.jpg',
    alt: 'Signature living room, Haveli Lane Residence — wide, morning light',
  },
  {
    id: 'hero-1',
    src: '/hero/orchard-verandah-dusk.jpg',
    alt: 'Orchard Farmhouse verandah at dusk',
  },
  {
    id: 'hero-2',
    src: '/hero/jaali-plaster-detail.jpg',
    alt: 'Detail: brass jaali and lime plaster in raking light',
  },
] as const;

/* ------------------------------------------------------------------ */
/* Projects                                                            */
/* ------------------------------------------------------------------ */

export type Room = {
  num: string;
  room: string;
  text: string;
  wide: { id: string; alt: string };
  details: { id: string; alt: string }[];
};

export type Project = {
  slug: string;
  name: string;
  location: string;
  type: string;
  size: string;
  year: string;
  scope: string;
  coverAlt: string;
  brief: string;
  approach: string;
  materials: string;
  /** Material names shown with a neutral swatch — the palette stays monochrome. */
  palette: { name: string; tone: string }[];
  rooms: Room[];
  compare: { a: string; b: string }[];
  quote: string;
  client: string;
};

const rawProjects = [
  {
    slug: 'haveli-lane-residence',
    name: 'Haveli Lane Residence',
    location: 'Jalandhar',
    type: 'Residential',
    size: '6,400 sq ft',
    year: '2025',
    scope: 'Full-service design, turnkey execution, furniture & art curation',
    coverAlt:
      'Haveli Lane Residence — double-height living room with lime-plaster walls and brass jaali screen, Jalandhar',
    brief:
      'A family of three generations wanted one house that could hold both: the courtyard gatherings of their childhood and the quiet, private rooms of contemporary life.',
    approach:
      'We organised the plan around a sky-lit inner court, letting every room borrow its light. Traditional elements — jaali, chowkat doorframes, terrazzo floors — were redrawn with cleaner proportions, so the house reads as heritage without becoming a period piece.',
    materials:
      'Lime plaster, Jaisalmer and Kota stone, reclaimed sheesham, hand-beaten brass, khadi and handloom linen.',
    palette: [
      { name: 'Lime white', tone: '#f1f1f1' },
      { name: 'Jaisalmer', tone: '#d2d2d2' },
      { name: 'Kota grey', tone: '#a6a6a6' },
      { name: 'Sheesham', tone: '#5c5c5c' },
      { name: 'Brass', tone: '#2e2e2e' },
    ],
    rooms: [
      {
        room: 'The Court',
        text: 'A sky-lit court at the centre of the house — the place every morning begins and every festival ends.',
        wideAlt: 'Wide view of the inner courtyard with terrazzo floor and skylight',
        detailAlts: [
          'Detail: brass jaali casting patterned light',
          'Detail: hand-finished lime plaster texture',
        ],
      },
      {
        room: 'Living & Dining',
        text: 'Low seating, deep window seats and a twelve-seat table cut from a single slab of reclaimed sheesham.',
        wideAlt: 'Living and dining room, warm afternoon light',
        detailAlts: ['Detail: sheesham dining table joinery', 'Detail: handloom linen upholstery'],
      },
      {
        room: 'Principal Suite',
        text: 'Stillness above all: Kota stone, soft linen and a single framed view of the garden neem.',
        wideAlt: 'Principal bedroom with Kota stone floor and garden view',
        detailAlts: ['Detail: carved chowkat door frame', 'Detail: brass bedside lamp'],
      },
    ],
    compare: [
      { a: 'Material moodboard', b: 'Completed living room' },
      { a: '3D visualisation — courtyard', b: 'Completed courtyard' },
    ],
    quote: 'They listened to three generations and somehow built one house we all recognise as ours.',
    client: 'The S. family, Jalandhar',
  },
  {
    slug: 'orchard-farmhouse',
    name: 'The Orchard Farmhouse',
    location: 'Ludhiana',
    type: 'Villa / Farmhouse',
    size: '11,500 sq ft',
    year: '2024',
    scope: 'Interior architecture, custom furniture, landscape-facing pavilions, styling',
    coverAlt: 'The Orchard Farmhouse — verandah opening onto a guava orchard, Ludhiana',
    brief:
      'A weekend farmhouse among guava orchards, built for long lunches and large gatherings — open to the land, yet comfortable through Punjab’s winters.',
    approach:
      'Deep verandahs and folding timber screens blur the line between house and orchard. Inside, warm stone, rammed-earth walls and fireplaces of hand-cut sandstone keep the rooms generous in scale but intimate in feeling.',
    materials: 'Rammed earth, Dholpur sandstone, teak, cane, block-printed cotton, aged brass.',
    palette: [
      { name: 'Earth', tone: '#8a8a8a' },
      { name: 'Dholpur', tone: '#dcdcdc' },
      { name: 'Orchard', tone: '#6f6f6f' },
      { name: 'Teak', tone: '#3d3d3d' },
      { name: 'Cane', tone: '#c2c2c2' },
    ],
    rooms: [
      {
        room: 'The Verandah',
        text: 'Thirty metres of shaded verandah, where lunch runs into dusk and the orchard does the decorating.',
        wideAlt: 'Long verandah with cane furniture overlooking the orchard',
        detailAlts: [
          'Detail: folding teak screen hardware',
          'Detail: block-printed cushions on cane daybed',
        ],
      },
      {
        room: 'The Great Room',
        text: 'A double-height hall warmed by a sandstone hearth, scaled for forty guests yet calm for two.',
        wideAlt: 'Great room with sandstone fireplace and rammed-earth walls',
        detailAlts: ['Detail: rammed-earth wall strata', 'Detail: aged brass pendant lighting'],
      },
      {
        room: 'Guest Pavilions',
        text: 'Four pavilions set among the trees, each with its own garden bath and morning light.',
        wideAlt: 'Guest pavilion bedroom with orchard view',
        detailAlts: ['Detail: stone garden bath', 'Detail: hand-woven bed throw'],
      },
    ],
    compare: [
      { a: 'Concept sketch — verandah', b: 'Completed verandah' },
      { a: '3D visualisation — great room', b: 'Completed great room' },
    ],
    quote:
      'It feels as if the house has always stood in the orchard. That was exactly what we hoped for.',
    client: 'Mr & Mrs K., Ludhiana',
  },
];

export const projects: Project[] = rawProjects.map((p) => ({
  ...p,
  rooms: p.rooms.map((r, j) => ({
    num: String(j + 1).padStart(2, '0'),
    room: r.room,
    text: r.text,
    wide: { id: `${p.slug}-r${j}-wide`, alt: r.wideAlt },
    details: r.detailAlts.map((alt, k) => ({ id: `${p.slug}-r${j}-d${k}`, alt })),
  })),
}));

export const projectTypes = [
  'All',
  'Residential',
  'Penthouse',
  'Villa / Farmhouse',
  'Commercial',
  'Hospitality',
];

export function projectFacts(p: Project) {
  return [
    { k: 'Location', v: `${p.location}, Punjab` },
    { k: 'Size', v: p.size },
    { k: 'Scope', v: p.scope },
    { k: 'Year', v: p.year },
  ];
}

/* ------------------------------------------------------------------ */
/* Services, process, fees                                             */
/* ------------------------------------------------------------------ */

export type Service = { num: string; title: string; desc: string; includes: string };

const rawServices: [string, string, string][] = [
  [
    'Full-service interior design',
    'Complete design of every room — layouts, finishes, lighting, furniture and art — documented to the last detail.',
    'concept, drawings, 3D views, specifications',
  ],
  [
    'Turnkey execution',
    'We manage contractors, craftspeople and vendors on site, and hand over a finished, styled home.',
    'site management, procurement, quality control, handover',
  ],
  [
    'Design consultation',
    'Focused sessions for those planning a build or refresh who want an expert eye on direction and decisions.',
    'site visit, recommendations, material direction',
  ],
  [
    'Space planning',
    'Plans that organise how a home is lived in — light, movement, privacy and proportion.',
    'measured survey, layout options, furniture plans',
  ],
  [
    'Furniture & art curation',
    'Pieces sourced from Indian makers, galleries and select international studios, chosen for each room.',
    'sourcing, art advisory, installation',
  ],
  [
    'Custom furniture',
    'Pieces designed in the studio and made by hand with workshops across Punjab and Rajasthan.',
    'design, prototyping, workshop supervision',
  ],
  [
    'Renovation',
    'Careful transformation of existing homes and heritage properties, keeping what deserves to stay.',
    'assessment, redesign, phased execution',
  ],
  [
    'Styling',
    'The final layer: textiles, objects, books and flowers that make a finished house feel inhabited.',
    'styling, photography preparation, seasonal refresh',
  ],
];

export const services: Service[] = rawServices.map(([title, desc, includes], i) => ({
  num: String(i + 1).padStart(2, '0'),
  title,
  desc,
  includes,
}));

export type ProcessStep = {
  num: string;
  title: string;
  time: string;
  desc: string;
  id: string;
  alt: string;
};

const rawProcess: [string, string, string][] = [
  [
    'Discovery',
    '1–2 weeks',
    'We visit the site, listen to how you live, and agree scope, budget and timeline in a written proposal.',
  ],
  [
    'Concept & moodboards',
    '3–4 weeks',
    'A design direction expressed through plans, references and the first physical material boards.',
  ],
  [
    'Design development & 3D',
    '4–6 weeks',
    'Detailed drawings and 3D visualisation of every key room, refined together until it feels right.',
  ],
  [
    'Material selection',
    '2–3 weeks',
    'Stone yards, workshops and our material library — every finish chosen in person, in daylight.',
  ],
  [
    'Execution & site management',
    '4–9 months',
    'Our team runs the site day to day, with weekly updates and regular walkthroughs.',
  ],
  [
    'Styling & handover',
    '2–3 weeks',
    'Furniture, art and textiles installed; the house is styled, cleaned and handed over, ready to live in.',
  ],
];

export const processSteps: ProcessStep[] = rawProcess.map(([title, time, desc], i) => ({
  num: String(i + 1).padStart(2, '0'),
  title,
  time,
  desc,
  id: `process-${i}`,
  alt: `${title} — studio or site photograph`,
}));

export const fees = [
  {
    title: 'Design',
    basis: 'Fixed fee · per sq ft',
    text: 'Full design and documentation, billed in stages tied to each phase. You appoint contractors; we oversee design intent.',
  },
  {
    title: 'Turnkey',
    basis: 'Design fee + project cost',
    text: 'We design and deliver end to end. Execution is costed transparently against an agreed budget, with milestone payments.',
  },
  {
    title: 'Consultation',
    basis: 'Per session',
    text: 'A focused site visit and advisory session. The fee is adjusted against a full commission if you proceed.',
  },
];

/* ------------------------------------------------------------------ */
/* Studio                                                              */
/* ------------------------------------------------------------------ */

export const beliefs = [
  {
    title: 'Of this place',
    text: 'Punjab’s crafts, climate and way of gathering shape every plan — not as ornament, but as structure.',
  },
  {
    title: 'Made by hand',
    text: 'We work with stone carvers, brass workers and weavers whose skill gives a room its weight and warmth.',
  },
  {
    title: 'Built to last',
    text: 'We design for decades, not seasons. Nothing goes in that we wouldn’t want to see in twenty years.',
  },
];

export const studioShots = [
  {
    id: 'studio-1',
    alt: 'Material library — stone, timber and textile samples',
    caption: 'The material library',
  },
  {
    id: 'studio-2',
    alt: 'Site visit — team reviewing joinery on site',
    caption: 'On site, Ludhiana',
  },
  {
    id: 'studio-3',
    alt: 'Studio desk with drawings and moodboards',
    caption: 'Drawings in progress',
  },
];

/*
 * A team grid and a "Recognition & press" list used to sit here. Both were
 * placeholder-only and have been removed rather than shipped empty. To bring
 * the team section back, restore an array of { id, name, role } and render it
 * on the studio page the way studioShots is rendered.
 */

export const collaborators = [
  { t: 'Thathera brass workers', y: 'Jandiala Guru' },
  { t: 'Phulkari embroiderers', y: 'Patiala' },
  { t: 'Stone carvers', y: 'Dholpur' },
  { t: 'Handloom weavers', y: 'Panipat' },
];

/* ------------------------------------------------------------------ */
/* Social proof, journal                                               */
/* ------------------------------------------------------------------ */

export const testimonials = [
  {
    quote: 'They listened to three generations and somehow built one house we all recognise as ours.',
    who: 'A.S.',
    project: 'Residence, Jalandhar',
  },
  {
    quote:
      'Calm, exacting and always honest about cost. The farmhouse was finished the week they promised.',
    who: 'R.K.',
    project: 'Farmhouse, Ludhiana',
  },
];

export const press = [0, 1, 2, 3, 4].map((i) => ({ id: `press-${i}` }));

export const instagramGrid = [
  'Brass detail',
  'Stone yard visit',
  'Moodboard in progress',
  'Site, Ludhiana',
  'Workshop, sheesham joinery',
  'Finished room vignette',
].map((alt, i) => ({ id: `ig-${i}`, alt }));

export const journal = [
  {
    id: 'journal-1',
    cat: 'Material story',
    read: '6 min',
    title: 'Jaali, reconsidered',
    dek: 'How an old screen becomes a modern instrument for light, air and privacy.',
    alt: 'Brass jaali in afternoon sun',
  },
  {
    id: 'journal-2',
    cat: 'Design ideas',
    read: '5 min',
    title: 'Living with Kota stone',
    dek: 'Why the humblest stone in North India ages more gracefully than marble.',
    alt: 'Honed Kota stone floor detail',
  },
  {
    id: 'journal-3',
    cat: 'Sneak peek',
    read: '3 min',
    title: 'Inside the Orchard Farmhouse kitchen',
    dek: 'Teak, brass and a hearth built for winter Sundays.',
    alt: 'Farmhouse kitchen with teak cabinetry',
  },
];

/* ------------------------------------------------------------------ */
/* Contact form schema                                                 */
/* ------------------------------------------------------------------ */

export type FormField = {
  label: string;
  name: string;
  type: string;
  required: boolean;
  placeholder: string;
};

export const formFields: FormField[] = [
  { label: 'Name', name: 'name', type: 'text', required: true, placeholder: '' },
  { label: 'Phone', name: 'phone', type: 'tel', required: true, placeholder: '+91' },
  { label: 'Email', name: 'email', type: 'email', required: true, placeholder: '' },
  {
    label: 'Project location',
    name: 'location',
    type: 'text',
    required: false,
    placeholder: 'e.g. Model Town, Jalandhar',
  },
  {
    label: 'Property size (sq ft)',
    name: 'size',
    type: 'text',
    required: false,
    placeholder: 'e.g. 5,000',
  },
];

export const formSelects = [
  {
    label: 'Project type',
    name: 'type',
    options: ['Residence', 'Penthouse', 'Villa / Farmhouse', 'Commercial', 'Hospitality'],
  },
  {
    label: 'Approximate budget',
    name: 'budget',
    options: ['₹50L – 1 Cr', '₹1 – 2 Cr', '₹2 – 5 Cr', '₹5 Cr +', 'Prefer to discuss'],
  },
  {
    label: 'Timeline',
    name: 'timeline',
    options: ['Within 3 months', '3–6 months', '6–12 months', 'Exploring'],
  },
];
