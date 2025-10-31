import cmsImage from '../assets/cmss.png';
import cognifyImage from '../assets/cognify.png';
import igadsEcomImage from '../assets/igad.png';
import schoolImage from '../assets/school.png';
import pgImage from '../assets/pg.png';
import cicdImage from '../assets/cicd2.png';

import portfolioNewImage from '../assets/atheek2.png';
import arMenuImage from '../assets/3d.png';
import igadsLandingImage from '../assets/igadss.png';
import greenDecorsImage from '../assets/green.png';
import realEstateImage from '../assets/realEstate.png';
import foobaeImage from '../assets/foobae.png';
import billingImage from '../assets/billing.png';
import redclubImage from '../assets/redclub.png';
import oldPortfolioImage from '../assets/portfolioOld.png';

import { Project } from '../types';

export const projects: Project[] = [
  {
    id: 1,
    slug: 'cognify-child-learning',
    title: 'Cognify – Child Learning & Screening Platform',
    image: cognifyImage,
    tags: [
      'React.js',
      'JWT Webtokens',
      'Gamified Learning',
      'AI Chatbot',
      'Node.js',
      'MongoDB',
      'Express',
    ],
    date: '2025',
    company: 'Cognify',
    github: 'https://github.com/Atheeek/Cognify-project',
    description: [
      'Full-stack child learning and cognitive screening platform using React.js, Node.js, Express, and MongoDB.',
      'Gamified modules and interactive games for engaging learning.',
      'AI chatbot providing personalized recommendations.',
      'Level-based progress tracking with charts and dashboards.',
      'Responsive design optimized for tablets and desktops.',
    ],
  },
  {
    id: 2,
    slug: 'pg-pal-saas',
    title: 'PG-Pal | SaaS Management Platform',
    image: pgImage,
    tags: [
      'React.js',
      'Node.js',
      'Express.js',
      'MongoDB',
      'Tailwind CSS',
      'REST API',
      'JWT Authentication',
      'Twilio API',
    ],
    date: '2025',
    company: 'Personal Full-Stack Project',
    liveUrl: 'https://smart-pg.vercel.app/',
    description: [
      'SaaS platform for property managers and tenants using Typescript, React.js, Node.js, and TailwindCSS.',
      'Automated messaging with Twilio API for notifications.',
      'Tenant management: Registration, billing, and occupancy tracking.',
      'Responsive dashboard with real-time updates.',
      'Mobile-first UI for smooth user experience.',
    ],
  },
  {
    id: 3,
    slug: 'igads-ecommerce',
    title: 'IGADS E-commerce Website',
    image: igadsEcomImage,
    tags: ['Shopify'],
    date: '2024',
    company: 'IGADS',
    liveUrl: 'https://igadsmobile.myshopify.com',
    description: [
      'Custom Shopify e-commerce website tailored for IGADS.',
      'Optimized product listing and checkout for better conversions.',
      'Mobile-first responsive design.',
      'Admin panel customization for inventory and order management.',
      'SEO-friendly structure and performance-optimized assets.',
    ],
  },
  {
    id: 4,
    slug: 'modern-school-website',
    title: 'Modern School Website',
    image: schoolImage,
    tags: ['Typescript', 'TailwindCSS', 'Responsive UI', 'Framer Motion'],
    date: '2023',
    company: 'School Project',
    liveUrl: 'https://tems-school.vercel.app/',
    description: [
      'Responsive school website template using Typescript, React.js, and TailwindCSS.',
      'Modern design focusing on usability and accessibility.',
      'Clear information architecture for courses, staff, events, and contacts.',
      'Mobile-first layouts supporting all devices.',
      'Fast-loading pages with optimized assets and reusable components.',
    ],
  },
  {
    id: 5,
    slug: 'portfolio-new',
    title: 'Atheek Portfolio (2025 Edition)',
    image: portfolioNewImage,
    tags: ['React.js', 'GSAP', 'Framer Motion', 'TailwindCSS'],
    date: '2025',
    company: 'Personal Portfolio',
    liveUrl: 'https://atheek.vercel.app/',
    github: 'https://github.com/Atheeek/Portfolio-new',
    description: [
      'Cinematic and interactive developer portfolio built with React.js and GSAP animations.',
      'Features 3D visuals, parallax effects, and motion-driven storytelling.',
      'Dark/light theme toggle and responsive layout for mobile and desktop.',
      'Optimized for performance and portfolio presentation.',
    ],
  },
  {
    id: 6,
    slug: '3d-ar-menu',
    title: '3D AR Menu Experience',
    image: arMenuImage,
    tags: ['Three.js', 'React.js', '3D', 'WebXR', 'Vite'],
    date: '2025',
    company: '3D Experimental Project',
    liveUrl: 'https://3d-armenu.vercel.app/',
    github: 'https://github.com/Atheeek/3D-AR-Menu',
    description: [
      'Augmented Reality food menu built using Three.js and React.',
      'Interactive 3D models allowing users to visualize dishes in real-world scale.',
      'Optimized for mobile and AR-compatible devices.',
      'Experimentation project combining 3D web and UI motion design.',
    ],
  },
  {
    id: 7,
    slug: 'igads-landing-page',
    title: 'IGADS Landing Page',
    image: igadsLandingImage,
    tags: ['React.js', 'TailwindCSS', 'Framer Motion'],
    date: '2025',
    company: 'IGADS',
    liveUrl: 'https://igads.vercel.app/',
    github: 'https://github.com/Atheeek/igads-landing-page',
    description: [
      'Clean and engaging landing page designed for IGADS marketing campaigns.',
      'Built with React.js, Framer Motion, and TailwindCSS for modern design and animations.',
      'Optimized for fast performance and conversion-focused layouts.',
    ],
  },
  {
    id: 8,
    slug: 'green-decors',
    title: 'Green Decors Website',
    image: greenDecorsImage,
    tags: ['React.js', 'TailwindCSS', 'Framer Motion'],
    date: '2025',
    company: 'Green Decors',
    liveUrl: 'https://green-decors-in.vercel.app/',
    github: 'https://github.com/Atheeek/Green-Decors.in',
    description: [
      'Elegant home decor business website built with React.js and TailwindCSS.',
      'Showcases services, products, and project portfolio.',
      'Interactive animations powered by Framer Motion.',
      'Optimized for SEO and mobile responsiveness.',
    ],
  },
  {
    id: 9,
    slug: 'foobae-restaurant',
    title: 'Foobae Restaurant Website',
    image: foobaeImage,
    tags: ['React.js', 'TailwindCSS', 'Responsive UI'],
    date: '2025',
    company: 'Foobae Restaurant',
    liveUrl: 'https://foobae-restaurant.vercel.app/',
    github: 'https://github.com/Atheeek/Foobae-restaurant',
    description: [
      'Responsive restaurant website with online ordering interface.',
      'Modern, appetizing UI showcasing menu, chefs, and testimonials.',
      'Optimized for SEO, fast loading, and mobile responsiveness.',
    ],
  },
  {
    id: 10,
    slug: 'redclub-frontend',
    title: 'RedClub Frontend',
    image: redclubImage,
    tags: ['React.js', 'TailwindCSS', 'Authentication', 'Dashboard'],
    date: '2025',
    company: 'RedClub',
    liveUrl: 'https://red-club.vercel.app/',
    github: 'https://github.com/Atheeek/redclub-frontend',
    description: [
      'Frontend for RedClub app featuring authentication, dashboard, and modern UI.',
      'Built with React.js and TailwindCSS with modular reusable components.',
      'Responsive layout with focus on user experience and design polish.',
    ],
  },
  {
    id: 11,
    slug: 'billing-system',
    title: 'Billing System',
    image: billingImage,
    tags: ['React.js', 'Node.js', 'TailwindCSS', 'Full-Stack'],
    date: '2025',
    company: 'Billing Platform',
    liveUrl: 'https://billing-blush.vercel.app/',
    github: 'https://github.com/Atheeek/billing',
    description: [
      'Minimal billing and invoice management system built with MERN stack.',
      'Supports CRUD operations, PDF invoice generation, and user authentication.',
      'Simple responsive UI for small businesses and freelancers.',
    ],
  },
];

export function getProjectBySlug(slug: string) {
  return projects.find((p) => p.slug === slug);
}
