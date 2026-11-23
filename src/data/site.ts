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
  name: 'VSM Innovators',
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
      'VSM Innovators, 1st Floor 400 Satyam Hospital Lane, Krishna Nagar, Adarsh Nagar, Jalandhar, Punjab 144008',
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
    src: '/work/residence-elevation-night.jpg',
    alt: 'Private residence elevation at night — stone, timber screens and planted balconies',
  },
  {
    id: 'hero-1',
    src: '/work/office-reception-lounge.jpg',
    alt: 'Office reception lounge with a curved glass screen and a sculpted timber ceiling',
  },
  {
    id: 'hero-2',
    src: '/work/commercial-block-elevation.jpg',
    alt: 'Commercial block elevation with sculpted fins and concealed lighting',
  },
] as const;

/* ------------------------------------------------------------------ */
/* Projects                                                            */
/* ------------------------------------------------------------------ */

/* ------------------------------------------------------------------ */
/* Projects                                                            */
/*                                                                      */
/* Every entry below is real VSM Innovators work. Descriptive fields    */
/* are optional on purpose: a project shows only the facts the studio   */
/* has confirmed, so nothing is invented to fill a layout. Add          */
/* `year`, `location`, `size`, `scope` and the narrative fields as the  */
/* details are confirmed and the page will render them.                 */
/* ------------------------------------------------------------------ */

export type Shot = { src: string; alt: string };

export type Project = {
  slug: string;
  name: string;
  type: string;
  /** Visualisation vs. a photograph of completed work — stated on the page. */
  medium: 'Visualisation' | 'Completed';
  cover: Shot;
  summary: string;
  gallery?: Shot[];
  location?: string;
  year?: string;
  size?: string;
  scope?: string;
  brief?: string;
  approach?: string;
  materials?: string;
};

export const projects: Project[] = [
  {
    slug: 'private-residence-elevation',
    name: 'Private Residence',
    type: 'Residential',
    medium: 'Visualisation',
    cover: {
      src: '/work/residence-elevation-night.jpg',
      alt: 'Private residence elevation at night — stone, timber screens and planted balconies',
    },
    summary:
      'A three-storey residence organised around deep balconies and timber screens, with a full-height stone portal anchoring the entrance. Lit to be read from the street after dark.',
  },
  {
    slug: 'corporate-office',
    name: 'Corporate Office',
    type: 'Commercial',
    medium: 'Visualisation',
    cover: {
      src: '/work/office-directors-cabin.jpg',
      alt: "Director's cabin with full-height timber shelving and a backlit feature wall",
    },
    summary:
      'A full office floor: director’s cabin, boardroom, reception lounge and a gallery corridor. Warm timber joinery and layered lighting carry through every room.',
    gallery: [
      {
        src: '/work/office-conference-room.jpg',
        alt: 'Boardroom with fluted panelling, linear lighting and a twelve-seat table',
      },
      {
        src: '/work/office-reception-lounge.jpg',
        alt: 'Reception lounge with a curved glass screen and a sculpted timber ceiling',
      },
      {
        src: '/work/office-gallery-corridor.jpg',
        alt: 'Gallery corridor with a slatted timber ceiling and a suspended display wall',
      },
    ],
  },
  {
    slug: 'handlooms-store',
    name: 'Handlooms Store',
    type: 'Retail',
    medium: 'Visualisation',
    cover: {
      src: '/work/handlooms-store-facade.jpg',
      alt: 'Handlooms store facade at dusk — arched display windows over three lit floors',
    },
    summary:
      'A classical retail facade built around display: arched windows stacked over three floors, each one lit so the fabric reads from the street at dusk.',
  },
  {
    slug: 'showroom-reception',
    name: 'Showroom & Reception',
    type: 'Commercial',
    medium: 'Visualisation',
    cover: {
      src: '/work/showroom-reception.jpg',
      alt: 'Showroom reception with arched stone niches, herringbone flooring and an open stair',
    },
    summary:
      'A narrow showroom floor opened up with arched niches, a sculpted ceiling and a herringbone floor that draws visitors toward the stair.',
  },
  {
    slug: 'commercial-block',
    name: 'Commercial Block',
    type: 'Commercial',
    medium: 'Visualisation',
    cover: {
      src: '/work/commercial-block-elevation.jpg',
      alt: 'Commercial block elevation with sculpted fins, concealed lighting and a ground-floor pharmacy',
    },
    summary:
      'A mixed-use block fronted by sculpted vertical fins and concealed lighting, with retail and a pharmacy at street level.',
  },
];

export const projectTypes = ['All', 'Residential', 'Commercial', 'Retail'];

/** Only the facts that have been confirmed for a project. */
export function projectFacts(p: Project) {
  return [
    { k: 'Type', v: p.type },
    p.location ? { k: 'Location', v: p.location } : null,
    p.size ? { k: 'Size', v: p.size } : null,
    p.scope ? { k: 'Scope', v: p.scope } : null,
    p.year ? { k: 'Year', v: p.year } : null,
    { k: 'Shown as', v: p.medium },
  ].filter((f): f is { k: string; v: string } => f !== null);
}


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
