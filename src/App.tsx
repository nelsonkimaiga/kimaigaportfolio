import React, { useState, useEffect, Fragment } from 'react';
import { applySEO } from './seo';
import {
  Linkedin,
  Github,
  ExternalLink,
  ChevronDown,
  Mail,
  Phone,
  MapPin,
  ArrowUp,
  ArrowRight,
  Menu,
  X,
  Building2,
  Fingerprint,
  Wallet,
  CalendarClock,
  Waypoints,
  Cloud,
  Code2,
  Terminal,
  Users,
  Circle,
  HardHat,
  HeartPulse,
  FileCheck,
  FileSearch,
  Server,
  Database,
  Activity,
  History,
  Archive,
  ShieldCheck,
  GitBranch,
  Layers,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

// --- Types & Constants ---

interface Project {
  id: number;
  title: string;
  category: string;
  description: string;
  imageUrl: string;
  link: string;
  stack: string[];
}

interface EnterpriseCase {
  title: string;
  summary: string;
  stack: string[];
  flow: string[];
  icon: LucideIcon;
}

interface CareerEntry {
  period: string;
  company: string;
  headline: string;
  summary: string[];
  tags: string[];
  status: 'current' | 'recent' | 'past';
}

interface HealthFeature {
  title: string;
  desc: string;
  icon: LucideIcon;
}

type DomainId = 'health' | 'fintech' | 'insurtech';

interface Domain {
  id: DomainId;
  label: string;
  features: HealthFeature[];
  badges: string[];
}

interface SkillCategory {
  title: string;
  icon: LucideIcon;
  skills: string[];
}

const PROJECTS: Project[] = [
  {
    id: 1,
    title: 'Waragah Enterprises',
    category: 'websitework',
    description: 'Property Management Platform',
    imageUrl: 'https://www.waragahenterprise.co.ke/android-chrome-512x512.png',
    link: 'https://www.waragahenterprise.co.ke/',
    stack: ['React', 'Spring Boot', 'Daraja REST API']
  },
  {
    id: 2,
    title: '4MESHEN',
    category: 'websitework',
    description: 'Events Management & Ticketing Platform',
    imageUrl: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&q=80',
    link: 'https://www.fomeshen.co.ke/',
    stack: ['React', 'Spring Boot', 'REST API']
  },
  {
    id: 3,
    title: 'Madafu Travels',
    category: 'websitework',
    description: 'Boutique Safaris & Tours in East Africa',
    imageUrl: 'https://www.madafutravels.com/madafu.png',
    link: 'https://www.madafutravels.co.ke/',
    stack: ['React', 'NodeJS', 'REST API']
  },
  {
    id: 4,
    title: 'Good Financial Grant Practice',
    category: 'websitework',
    description: 'Grant Management Platform',
    imageUrl: 'https://gfgp.ai/img/logo.png',
    link: 'https://gfgp.ai',
    stack: ['React', 'Spring Boot', 'MySQL']
  },
  {
    id: 5,
    title: 'DOCUBOX',
    category: 'websitework',
    description: 'East African Documentary Film Fund',
    imageUrl: 'https://mydocubox.org/wp-content/uploads/2023/02/cropped-NEW-DOCUBOX-LOGO-VARIATIONS-15.png',
    link: 'https://mydocubox.org/',
    stack: ['React', 'PHP', 'PostgreSQL']
  },
  {
    id: 6,
    title: 'Addis Ababa University',
    category: 'websitework',
    description: 'Academic Management Portal',
    imageUrl: 'https://www.aau.edu.et/images/aauLogo.png',
    link: 'https://www.aau.edu.et/',
    stack: ['React', 'Laravel', 'MongoDB']
  },
];

const ENTERPRISE_CASES: EnterpriseCase[] = [
  {
    title: 'Claims Validation Switch',
    summary: 'Event-driven claims adjudication switch handling validation, fraud checks, and approvals across providers, hospitals, and payers.',
    stack: ['Spring Boot', 'Kafka', 'Microservices', 'FHIR'],
    flow: ['Hospital EMR', 'Claims API', 'Validation Engine', 'Adjudication', 'Payments'],
    icon: Layers
  },
  {
    title: 'Biometric Identity Platform',
    summary: 'COMPAS biometric identity platform deployed across Equity Bank Kenya and Post Bank Uganda — enrolling, verifying, and authenticating customers at scale.',
    stack: ['Java', 'Biometrics', 'Compulynx COMPAS', 'SOAP/REST'],
    flow: ['Bank Branch', 'Enrolment Kiosk', 'Biometric Engine', 'Identity Store'],
    icon: Server
  },
  {
    title: 'Health Information Exchange',
    summary: 'FHIR-based interoperability gateway connecting EMRs, national surveillance systems (DHIS2), and hospital platforms for standardized data exchange and reporting.',
    stack: ['HL7 FHIR', 'Spring Boot', 'OpenMRS', 'DHIS2'],
    flow: ['EMR', 'FHIR Gateway', 'Spring Boot APIs', 'OpenMRS / DHIS2'],
    icon: Database
  },
];

const DOMAIN_PILLS: { label: string; icon: LucideIcon }[] = [
  { label: 'InsurTech', icon: ShieldCheck },
  { label: 'Digital Health', icon: HeartPulse },
  { label: 'Fintech & Payments', icon: Wallet },
];

const DOMAINS: Domain[] = [
  {
    id: 'health',
    label: 'Digital Health',
    features: [
      {
        title: 'OpenMRS',
        desc: 'Production-grade EMR customization supporting clinics and national health programs across multiple deployments.',
        icon: Activity
      },
      {
        title: 'HL7 FHIR',
        desc: 'Interoperability standards engineering — designing FHIR resources, bundles, and RESTful APIs for standardized clinical data exchange.',
        icon: GitBranch
      },
      {
        title: 'DHIS2',
        desc: 'Surveillance and national reporting integrations enabling real-time aggregate health data for decision-making.',
        icon: Database
      },
    ],
    badges: ['HL7', 'FHIR R4', 'OpenMRS', 'DHIS2', 'OpenHIE']
  },
  {
    id: 'fintech',
    label: 'Fintech & Payments',
    features: [
      {
        title: 'M-Pesa & Tingg Gateways',
        desc: 'Mobile money integration across M-Pesa, Tingg, Airtel, and MTN MoMo — STK push, C2B and B2B flows with reliable settlement.',
        icon: Wallet
      },
      {
        title: 'Escrow Schedulers',
        desc: 'Time-boxed escrow and settlement schedulers ensuring funds move only when transaction conditions are fully met.',
        icon: CalendarClock
      },
      {
        title: 'Banking Middleware',
        desc: 'Integration middleware bridging core banking systems, switches, and mobile money rails through secure, auditable APIs.',
        icon: Waypoints
      },
    ],
    badges: ['M-Pesa', 'Tingg', 'Airtel', 'MTN MoMo', 'STK Push', 'C2B', 'B2B', 'Escrow', 'Settlement', 'ISO 8583']
  },
  {
    id: 'insurtech',
    label: 'InsurTech',
    features: [
      {
        title: 'Biometric Identity Scanning',
        desc: 'COMPAS biometric scanning and verification for digital identity — high-volume authentication across insurance and banking.',
        icon: Fingerprint
      },
      {
        title: 'Automated Adjudication',
        desc: 'Rules-driven adjudication engines that validate claims, detect fraud, and approve payouts automatically.',
        icon: FileCheck
      },
      {
        title: 'Provider Gateways',
        desc: 'Hospital and provider integrations streaming pre-auths and e-claims into the claims pipeline.',
        icon: Building2
      },
      {
        title: 'Compliance Audit Logging',
        desc: 'Immutable audit trails and compliance logging across every claim, decision, and payment event.',
        icon: FileSearch
      },
      {
        title: 'eClaims & HMIS Integrations',
        desc: 'Electronic claims processing and HMIS integrations spanning Care2000, Kranium, and Med360 for healthcare administration.',
        icon: ShieldCheck
      },
    ],
    badges: ['Spring Boot', 'Kafka', 'Microservices', 'Claims Automation', 'Fraud Detection', 'FHIR', 'Audit Logs', 'Compliance']
  },
];

const CAREER: CareerEntry[] = [
  {
    period: '2025 — Present',
    company: 'AON Minet',
    headline: 'InsurTech & Underwriting Automation',
    summary: [
      'Refactoring legacy underwriting flows into event-driven microservices for higher throughput and resilience.',
      'Automating claims processing end-to-end with hospital systems integration.',
    ],
    tags: ['Spring Boot', 'Redis', 'Microservices', 'Event-Driven Architecture', 'Claims Automation', 'Hospital Integrations'],
    status: 'current'
  },
  {
    period: '2023 — 2025',
    company: 'IntelliSOFT',
    headline: 'Digital Health Interoperability & LLM Integration',
    summary: [
      'Engineered OpenMRS EMR interoperability over HL7 FHIR and DHIS2.',
      'Bridged clinical systems with LLM-powered healthcare workflows.',
    ],
    tags: ['OpenMRS', 'HL7', 'FHIR', 'DHIS2', 'LLM Healthcare Integrations'],
    status: 'recent'
  },
  {
    period: '2022 — 2023',
    company: 'Jubilee Health Insurance',
    headline: 'Digital Health Mobility',
    summary: ['Shipped cross-platform wellness apps expanding member engagement on mobile and web.'],
    tags: ['React Native', 'Cross-platform', 'Web', 'Digital Health'],
    status: 'past'
  },
  {
    period: '2021 — 2022',
    company: 'UBIQPay',
    headline: 'FinTech & Multi-Country Payment Middleware',
    summary: ['Built multi-country payment middleware orchestrating M-Pesa, Tingg, Airtel, and MTN MoMo.'],
    tags: ['Payment Gateways', 'M-Pesa', 'Tingg', 'Airtel', 'MTN MoMo', 'Gaming/Lottery Backend'],
    status: 'past'
  },
  {
    period: '2020 — 2021',
    company: 'LCT Africa',
    headline: 'Healthcare Administration & HMIS Integration',
    summary: ['Automated eClaims processing and HMIS integrations across Care2000, Kranium, and Med360.'],
    tags: ['eClaims', 'HMIS', 'Care2000', 'Kranium', 'Med360'],
    status: 'past'
  },
  {
    period: '2018 — 2019',
    company: 'Compulynx',
    headline: 'Digital Identity Automation & Core Banking Systems',
    summary: ['Delivered the COMPAS biometric identity platform for Equity Bank Kenya and Post Bank Uganda.'],
    tags: ['COMPAS', 'Biometric Identity', 'Core Banking', 'Equity Bank Kenya', 'Post Bank Uganda'],
    status: 'past'
  },
  {
    period: '2015 — 2018',
    company: 'Moringa School & AAS',
    headline: 'Internal Business Systems & Foundation Engineering',
    summary: ['Built internal business systems and research community platforms, laying the engineering foundation.'],
    tags: ['Community of Practice', 'Research Platforms', 'Internal Systems'],
    status: 'past'
  },
];

const SKILL_CATEGORIES: SkillCategory[] = [
  {
    title: 'Programming Languages',
    icon: Code2,
    skills: ['Java', 'Python', 'Javascript', 'TypeScript']
  },
  {
    title: 'Frameworks & Libraries',
    icon: Layers,
    skills: ['Spring Boot', 'React', 'React Native', 'Angular', 'Django']
  },
  {
    title: 'Databases',
    icon: Database,
    skills: ['MySQL', 'PostgreSQL', 'ElasticSearch', 'Redis']
  },
  {
    title: 'DevOps & Tools',
    icon: Terminal,
    skills: ['Docker', 'CI/CD Pipelines', 'GitHub', 'Git', 'Vite', 'Maven', 'OpenMRS', 'FHIR', 'HL7', 'Health Information Systems']
  },
  {
    title: 'Cloud Tools',
    icon: Cloud,
    skills: ['AWS', 'Digital Ocean', 'Google Cloud Platform(GCP)']
  },
  {
    title: 'Agile & Leadership',
    icon: Users,
    skills: ['Scrum', 'Kanban', 'Mentorship', 'Technical Leadership', 'Code Reviews', 'Cross-team Collaboration']
  },
];

const SOCIAL_LINKS = {
  linkedin: 'https://linkedin.com/in/nelsonkimaiga',
  github: 'https://github.com/nelsonkimaiga',
  twitter: 'https://twitter.com/nelsonkimaiga',
};

// --- Sub-Components ---

const XIcon = ({ size = 24, className = "" }: { size?: number; className?: string }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 19 19"
    className={className}
    fill="currentColor"
  >
    <use href="/icons.svg#x-icon" />
  </svg>
);

const SectionHeading = ({ eyebrow, title }: { eyebrow: string; title: string }) => (
  <div className="text-center mb-16">
    <span className="block text-[var(--color-madafu-gold-light)] uppercase tracking-[0.4em] text-xs font-bold mb-4">
      {eyebrow}
    </span>
    <h3 className="text-3xl md:text-4xl font-bold tracking-tight text-white">
      {title}
    </h3>
    <div className="w-24 h-1 bg-[var(--color-madafu-gold)] mx-auto mt-6" />
  </div>
);

const FlowDiagram = ({ steps }: { steps: string[] }) => (
  <div className="flex flex-col md:flex-row items-stretch gap-2 md:gap-0">
    {steps.map((step, i) => (
      <Fragment key={step}>
        <div className="flex-1 flex items-center justify-center px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-center text-sm font-medium text-gray-200 transition-colors duration-300 hover:border-[var(--color-madafu-gold-light)]/40">
          {step}
        </div>
        {i < steps.length - 1 && (
          <div className="flex items-center justify-center text-gray-500 py-1 md:px-2 rotate-90 md:rotate-0">
            <ArrowRight size={16} />
          </div>
        )}
      </Fragment>
    ))}
  </div>
);

// --- Main Component ---

const App: React.FC = () => {
  const [isSticky, setIsSticky] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'enterprise' | 'web'>('enterprise');
  const [domainTab, setDomainTab] = useState<DomainId>('health');
  const [formData, setFormData] = useState({ name: '', phone: '', email: '', message: '' });

  const activeDomain = DOMAINS.find((domain) => domain.id === domainTab)!;

  // Scroll listener for sticky header and scroll-to-top button
  useEffect(() => {
    applySEO({
      title: 'Nelson Kimaiga | Senior Software Engineer',
      description: 'Senior software and systems engineer with 11+ years delivering production systems across fintech, InsurTech, and digital health — high-throughput backends and critical middleware.',
      robots: 'index, follow',
    });
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 50);
      setShowScrollTop(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      alert("Please fill in all required fields.");
      return;
    }
    console.log("Form Submitted:", formData);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const NavLinks = ({ mobile = false }) => (
    <ul className={`${mobile
      ? 'flex flex-col gap-6 text-xl items-center py-20'
      : 'hidden md:flex gap-6 items-center text-xs font-bold uppercase tracking-widest text-white'}`}>
      <li className="hover:text-[var(--color-madafu-gold-light)] transition-colors"><a href="#home" onClick={() => setIsMenuOpen(false)}>Home</a></li>
      <li className="hover:text-[var(--color-madafu-gold-light)] transition-colors"><a href="#about" onClick={() => setIsMenuOpen(false)}>About</a></li>
      <li className="hover:text-[var(--color-madafu-gold-light)] transition-colors"><a href="#health" onClick={() => setIsMenuOpen(false)}>Domains</a></li>
      <li className="hover:text-[var(--color-madafu-gold-light)] transition-colors"><a href="#experience" onClick={() => setIsMenuOpen(false)}>Experience</a></li>
      <li className="hover:text-[var(--color-madafu-gold-light)] transition-colors"><a href="#works" onClick={() => setIsMenuOpen(false)}>Projects</a></li>
      <li className="hover:text-[var(--color-madafu-gold-light)] transition-colors">
        <a href="https://blog.nelsonkimaiga.com" target="_blank" rel="noopener noreferrer" onClick={() => setIsMenuOpen(false)}>Blog</a>
      </li>
      <li className="hover:text-[var(--color-madafu-gold-light)] transition-colors"><a href="#contact" onClick={() => setIsMenuOpen(false)}>Contact</a></li>
    </ul>
  );

  return (
    <div className="font-sans text-gray-400 antialiased overflow-x-hidden bg-black selection:bg-[var(--color-madafu-gold)] selection:text-white">
      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-[2000] transition-all duration-500 px-6 py-4 flex justify-between items-center ${
        isSticky ? 'bg-black/80 backdrop-blur-md py-2 shadow-lg border-b border-[var(--color-madafu-gold-light)]/20' : 'bg-transparent'
      }`}>
        <a href="#home" className="block">
          <div className={`rounded-full border-2 border-[var(--color-madafu-gold-light)] overflow-hidden bg-white transition-all duration-500 ${
            isSticky ? 'w-10 h-10 ring-2 ring-white/20 ring-offset-2 ring-offset-black' : 'w-16 h-16'
          }`}>
             <img
              src="https://ui-avatars.com/api/?name=Nelson+Kimaiga&background=D4AF37&color=000000"
              alt="Nelson Kimaiga"
              className="w-full h-full object-cover"
            />
          </div>
        </a>

        {/* Desktop Nav */}
        <NavLinks />

        {/* Mobile Toggle */}
        <button onClick={toggleMenu} className="md:hidden text-white p-2" aria-label="Toggle menu">
          {isMenuOpen ? <X size={32} /> : <Menu size={32} />}
        </button>
      </nav>

      {/* Mobile Menu Overlay */}
      <div className={`fixed inset-0 z-[1999] bg-black text-white transition-transform duration-500 ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'} md:hidden`}>
        <NavLinks mobile />
      </div>

      {/* Hero Section */}
      <section id="home" className="relative min-h-screen bg-black flex flex-col items-center justify-center text-center px-4 overflow-hidden">
        {/* Atmospheric Light Background */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] bg-gradient-to-r from-blue-500/15 via-[var(--color-madafu-gold-light)]/10 to-blue-600/15 rounded-full blur-[140px] animate-pulse" />
          <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[100px]" />
        </div>

        <div className="relative z-10 animate-fadeInUp py-24">
          <div className="mx-auto mb-5 h-px w-12 bg-[var(--color-madafu-gold)]" />
          <h1 className="text-white text-4xl md:text-6xl lg:text-7xl font-thin uppercase tracking-tight mb-4">
            Nelson Kimaiga
          </h1>
          <h2 className="text-2xl md:text-4xl text-[var(--color-madafu-gold)] font-bold mb-6 leading-tight">
            Software Engineer specializing in Backend Systems, Digital Health &amp; Systems Integration.
          </h2>
          <p className="max-w-3xl mx-auto text-base md:text-lg text-gray-300 font-light leading-relaxed">
            11+ years delivering production systems across InsurTech, digital health, and fintech, high-throughput backends, and critical middleware.
          </p>

          {/* Domain Pills */}
          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            {DOMAIN_PILLS.map((pill) => (
              <span
                key={pill.label}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[var(--color-madafu-gold-light)]/30 bg-[var(--color-madafu-gold)]/5 text-[var(--color-madafu-gold-light)] font-mono text-sm whitespace-nowrap transition-all duration-300 hover:bg-[var(--color-madafu-gold)]/10 hover:border-[var(--color-madafu-gold)]/40"
              >
                <pill.icon size={14} className="opacity-80" />
                {pill.label}
              </span>
            ))}
          </div>

          {/* Dual CTAs */}
          <div className="mt-12 flex flex-col md:flex-row gap-4 justify-center">
            <a href="#works" className="px-10 py-4 bg-[var(--color-madafu-gold)] text-black font-bold rounded uppercase tracking-wider hover:bg-[var(--color-madafu-gold-light)] transition-all shadow-lg shadow-black/40">
              View Work &amp; Domains
            </a>
            <a href="#contact" className="px-10 py-4 border border-[var(--color-madafu-gold-light)]/40 text-[var(--color-madafu-gold-light)] font-bold rounded uppercase tracking-wider hover:bg-[var(--color-madafu-gold)]/10 transition-all">
              Hire / Book Consult
            </a>
          </div>

          <div className="flex gap-6 mt-12 justify-center">
            <a href={SOCIAL_LINKS.linkedin} target="_blank" rel="noopener noreferrer" className="w-12 h-12 inline-flex items-center justify-center bg-white/10 rounded-full hover:bg-white transition-all group" aria-label="LinkedIn">
              <Linkedin className="w-6 h-6 text-white group-hover:text-blue-600" />
            </a>
            <a href={SOCIAL_LINKS.github} target="_blank" rel="noopener noreferrer" className="w-12 h-12 inline-flex items-center justify-center bg-white/10 rounded-full hover:bg-white transition-all group" aria-label="GitHub">
              <Github className="w-6 h-6 text-white group-hover:text-black" />
            </a>
            <a href={SOCIAL_LINKS.twitter} target="_blank" rel="noopener noreferrer" className="w-12 h-12 inline-flex items-center justify-center bg-white/10 rounded-full hover:bg-white transition-all group" aria-label="X">
              <XIcon size={24} className="text-white group-hover:text-black" />
            </a>
          </div>
        </div>

        <div className="absolute bottom-6 animate-bounce">
          <a href="#about" aria-label="Scroll to About"><ChevronDown className="text-[var(--color-madafu-gold-light)] w-8 h-8" /></a>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 bg-black border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <SectionHeading eyebrow="Profile" title="About Me" />
          <p className="max-w-4xl mx-auto text-xl md:text-2xl font-light text-gray-300 text-justify leading-relaxed mb-20">
            I’m a <span className="text-white font-semibold">Senior Software Engineer</span> based in Nairobi, Kenya, with{' '}
            <span className="text-white font-semibold">11+ years of experience</span> building resilient web, mobile, and cloud applications. Specializing in{' '}
            <span className="text-white font-semibold">backend architectures</span>, <span className="text-white font-semibold">payment middleware</span>, and{' '}
            <span className="text-white font-semibold">digital health solutions</span>, I focus on turning complex technical challenges into scalable, production-ready platforms. When I'm not shipping code, I'm active in the open-source community and sharing technical insights on software design and architecture.
          </p>

          <div className="mb-12">
            <span className="inline-flex items-center gap-2 px-6 py-2.5 bg-[var(--color-madafu-gold)]/10 border border-[var(--color-madafu-gold-light)]/20 text-[var(--color-madafu-gold-light)] rounded-full font-mono text-xs uppercase tracking-widest">
              <HardHat size={14} className="text-[var(--color-madafu-gold)]" />
              Skills & Competencies
            </span>
          </div>

          {/* Skills Matrix */}
          <div className="max-w-6xl mx-auto text-left">
            {SKILL_CATEGORIES.map((category) => (
              <div
                key={category.title}
                className="flex flex-col md:flex-row md:items-center gap-4 md:gap-10 py-6 border-b border-white/10 last:border-b-0"
              >
                <div className="md:w-1/4 shrink-0 flex items-center gap-3">
                  <category.icon className="w-4 h-4 text-[#D4AF37] shrink-0" />
                  <h4 className="text-xs md:text-sm font-bold uppercase tracking-widest text-white whitespace-nowrap">
                    {category.title}
                  </h4>
                </div>
                <div className="flex-1 flex flex-wrap gap-2">
                  {category.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1.5 bg-white/[0.03] border border-white/10 text-gray-300 text-sm rounded-full transition-all duration-300 hover:border-[var(--color-madafu-gold)]/40 inline-flex items-center gap-2"
                    >
                      <Circle size={14} className="text-zinc-400 opacity-80" />
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Engineering Evolution Timeline */}
      <section id="experience" className="py-24 bg-black border-t border-white/10">
        <div className="max-w-5xl mx-auto px-6">
          <SectionHeading eyebrow="Career Journey" title="Career Journey" />

          <div className="relative">
            <div className="absolute left-1 top-0 bottom-0 w-0.5 md:left-1/2 md:-translate-x-1/2 bg-gradient-to-b from-[var(--color-madafu-gold)] via-[var(--color-madafu-gold-light)]/30 to-white/10" />

            <div className="space-y-12">
              {CAREER.map((entry, idx) => {
                const isActive = entry.status === 'current' || entry.status === 'recent';
                const isLeft = idx % 2 === 0;
                return (
                  <div key={`${entry.company}-${idx}`} className="relative md:grid md:grid-cols-2 md:gap-16">
                    {/* Glowing radar node */}
                    <span className="absolute left-[5px] md:left-1/2 top-1 -translate-x-1/2 z-10 w-5 h-5">
                      <span
                        className={`absolute inset-0 rounded-full ${
                          isActive ? 'bg-[var(--color-madafu-green)]/30 animate-ping' : 'bg-[#D4AF37]/15'
                        }`}
                      />
                      <span
                        className={`relative block w-5 h-5 rounded-full ring-4 ${
                          isActive
                            ? 'bg-[var(--color-madafu-green)] ring-[var(--color-madafu-green)]/20'
                            : 'bg-[#D4AF37] ring-[#D4AF37]/15'
                        }`}
                      />
                    </span>

                    <div className={`pl-10 md:pl-0 md:row-start-1 ${isLeft ? 'md:pr-20 md:text-right' : 'md:col-start-2 md:pl-20'}`}>
                      <div className="mb-2">
                        <span
                          className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border font-mono text-xs font-bold uppercase tracking-widest ${
                            isActive
                              ? 'bg-[var(--color-madafu-green)]/15 text-[var(--color-madafu-green)] border-[var(--color-madafu-green)]/40'
                              : 'bg-[#D4AF37]/10 text-[var(--color-madafu-gold-light)] border-[var(--color-madafu-gold-light)]/30'
                          }`}
                          title={entry.status === 'current' ? 'Current' : entry.status === 'recent' ? 'Recent' : 'Past'}
                        >
                          {entry.status === 'current' ? (
                            <Activity size={12} />
                          ) : entry.status === 'recent' ? (
                            <History size={12} />
                          ) : (
                            <Archive size={12} />
                          )}
                          {entry.period} · {entry.company}
                        </span>
                      </div>

                      <h4 className="text-xl md:text-2xl font-bold text-white mb-3">{entry.headline}</h4>

                      <ul className={`space-y-2 text-gray-100 font-light leading-relaxed ${isLeft ? 'md:flex md:flex-col md:items-end' : ''}`}>
                        {entry.summary.map((point, i) => (
                          <li key={i} className={`flex items-start gap-3 ${isLeft ? 'md:flex-row-reverse' : ''}`}>
                            <span
                              className={`mt-2 w-1.5 h-1.5 rounded-full shrink-0 ${
                                isActive ? 'bg-[var(--color-madafu-green)]' : 'bg-[var(--color-madafu-gold)]'
                              }`}
                            />
                            <span>{point}</span>
                          </li>
                        ))}
                      </ul>

                      <div className={`flex flex-wrap gap-2 mt-4 ${isLeft ? 'md:justify-end' : ''}`}>
                        {entry.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-2.5 py-1 rounded-full bg-[var(--color-madafu-gold)]/10 border border-[var(--color-madafu-gold-light)]/20 text-xs text-[var(--color-madafu-gold-light)]"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Domain Expertise */}
      <section id="health" className="py-24 bg-black border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeading eyebrow="Domain Expertise" title="Specialist Domains" />

          {/* Domain Tabs */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {DOMAINS.map((domain) => (
              <button
                key={domain.id}
                onClick={() => setDomainTab(domain.id)}
                aria-pressed={domainTab === domain.id}
                className={`px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ${
                  domainTab === domain.id
                    ? 'bg-[var(--color-madafu-green)] text-white shadow-lg shadow-[var(--color-madafu-green)]/30'
                    : 'bg-white/5 border border-white/10 text-gray-400 hover:border-[var(--color-madafu-green)]/40 hover:text-[var(--color-madafu-green)]'
                }`}
              >
                {domain.label}
              </button>
            ))}
          </div>

          <div key={activeDomain.id} className="animate-fadeInUp">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {activeDomain.features.map((feature) => (
                <div
                  key={feature.title}
                  className="group bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-8 transition-all duration-300 hover:border-[var(--color-madafu-gold)]/40 hover:shadow-2xl hover:shadow-black/80"
                >
                  <div className="w-12 h-12 rounded-xl bg-[var(--color-madafu-gold)]/10 border border-[var(--color-madafu-gold-light)]/20 flex items-center justify-center mb-5 text-[var(--color-madafu-gold-light)]">
                    <feature.icon size={24} />
                  </div>
                  <h4 className="text-lg font-bold text-white mb-2">{feature.title}</h4>
                  <p className="text-sm text-gray-300 leading-relaxed">{feature.desc}</p>
                </div>
              ))}
            </div>

            {/* Domain Technology Badges */}
            <div className="mt-12 text-center">
              <p className="text-xs uppercase tracking-widest text-gray-400 mb-5 font-bold font-mono">Technology Stack</p>
              <div className="flex flex-wrap justify-center gap-3">
                {activeDomain.badges.map((standard) => (
                  <span
                    key={standard}
                    className="px-4 py-2 rounded-full bg-[var(--color-madafu-gold)]/10 border border-[var(--color-madafu-gold-light)]/20 text-sm text-[var(--color-madafu-gold-light)] font-medium font-mono"
                  >
                    {standard}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects & Case Studies */}
      <section id="works" className="py-24 bg-black border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeading eyebrow="Selected Work" title="Projects & Case Studies" />

          {/* Tabs */}
          <div className="flex justify-center mb-12">
            <div className="inline-flex p-1 bg-white/5 border border-white/10 rounded-full">
              <button
                onClick={() => setActiveTab('enterprise')}
                className={`px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ${
                  activeTab === 'enterprise' ? 'bg-[var(--color-madafu-green)] text-white shadow-lg shadow-[var(--color-madafu-green)]/30' : 'text-gray-400 hover:text-[var(--color-madafu-green)]'
                }`}
              >
                Enterprise Systems
              </button>
              <button
                onClick={() => setActiveTab('web')}
                className={`px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ${
                  activeTab === 'web' ? 'bg-[var(--color-madafu-green)] text-white shadow-lg shadow-[var(--color-madafu-green)]/30' : 'text-gray-400 hover:text-[var(--color-madafu-green)]'
                }`}
              >
                Web Platforms & Apps
              </button>
            </div>
          </div>

          {activeTab === 'enterprise' ? (
            <div className="grid grid-cols-1 gap-10">
              {ENTERPRISE_CASES.map((entry) => (
                <div key={entry.title} className="bg-white/5 border border-white/10 rounded-2xl p-6 md:p-10 backdrop-blur-md transition-all duration-300 hover:border-[var(--color-madafu-gold)]/40 hover:shadow-2xl hover:shadow-black/80">
                  <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6 mb-8">
                    <div className="flex items-start gap-5 max-w-2xl">
                      <div className="w-12 h-12 shrink-0 rounded-xl bg-[var(--color-madafu-gold)]/10 border border-[var(--color-madafu-gold-light)]/20 text-[var(--color-madafu-gold-light)] flex items-center justify-center">
                        <entry.icon size={22} />
                      </div>
                      <div>
                        <h4 className="text-xl md:text-2xl font-bold text-white">{entry.title}</h4>
                        <p className="text-gray-300 mt-2 text-sm md:text-base leading-relaxed">{entry.summary}</p>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2 shrink-0">
                      {entry.stack.map((tech) => (
                        <span
                          key={tech}
                          className="px-3 py-1 rounded-full bg-[var(--color-madafu-gold)]/10 border border-[var(--color-madafu-gold-light)]/20 text-xs text-[var(--color-madafu-gold-light)] font-semibold"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                  <FlowDiagram steps={entry.flow} />
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {PROJECTS.map((project) => (
                <div key={project.id} className="group flex flex-col bg-white/5 rounded-xl border border-white/10 overflow-hidden backdrop-blur-md transition-all duration-300 hover:shadow-2xl hover:shadow-black/80 hover:border-[var(--color-madafu-gold)]/40">
                  <div className="relative aspect-video overflow-hidden">
                    <img
                      src={project.imageUrl}
                      alt={project.title}
                      className="w-full h-full object-contain bg-white p-6 rounded-lg transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-6 py-2 bg-[var(--color-madafu-gold)] text-black font-bold rounded-full transform translate-y-4 group-hover:translate-y-0 hover:bg-[var(--color-madafu-gold-light)] transition-all duration-300 flex items-center gap-2"
                      >
                        View Project <ExternalLink size={16} />
                      </a>
                    </div>
                  </div>

                  <div className="p-6 flex flex-col text-left">
                    <h4 className="text-lg font-bold text-white uppercase mb-1">
                      {project.title}
                    </h4>
                    <p className="text-gray-400 text-sm mb-4">
                      {project.description}
                    </p>

                    <div className="flex flex-wrap gap-2 mt-auto">
                      {project.stack.map((tech) => (
                        <span
                          key={tech}
                          className="px-2 py-1 bg-[var(--color-madafu-gold)]/10 border border-[var(--color-madafu-gold-light)]/20 rounded-full text-xs font-semibold text-[var(--color-madafu-gold-light)]"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 bg-black border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div className="flex flex-col justify-center">
            <h3 className="text-3xl md:text-4xl font-bold text-white tracking-tight mb-8">Let's keep in touch</h3>
            <p className="text-gray-300 text-lg mb-8 leading-relaxed">
              Open to senior engineering roles, freelance/consulting engagements, and enterprise architecture collaborations.
            </p>
            <div className="space-y-8 text-lg text-left">
              <div className="flex items-center gap-6 group cursor-default transition-transform duration-300 hover:translate-x-1">
                <div className="p-3 bg-white/5 border border-white/10 rounded-lg text-[var(--color-madafu-gold-light)]">
                  <MapPin className="w-6 h-6" />
                </div>
                <p className="text-gray-300">Nairobi, Kenya</p>
              </div>
              <div className="flex items-center gap-6 group cursor-default transition-transform duration-300 hover:translate-x-1">
                <div className="p-3 bg-white/5 border border-white/10 rounded-lg text-[var(--color-madafu-gold-light)]">
                  <Phone className="w-6 h-6" />
                </div>
                <p className="text-gray-300">+254 721 496 346</p>
              </div>
              <div className="flex items-center gap-6 group cursor-default transition-transform duration-300 hover:translate-x-1">
                <div className="p-3 bg-white/5 border border-white/10 rounded-lg text-[var(--color-madafu-gold-light)]">
                  <Mail className="w-6 h-6" />
                </div>
                <a href="mailto:nelson@nelsonkimaiga.com" className="text-gray-300 hover:text-[var(--color-madafu-gold-light)] transition-colors">
                  nelson@nelsonkimaiga.com
                </a>
              </div>
            </div>

            <div className="mt-16 text-left">
              <p className="font-bold text-white uppercase tracking-wider mb-6">I am social</p>
              <div className="flex gap-8">
                <a href={SOCIAL_LINKS.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="text-gray-400 hover:text-[var(--color-madafu-gold-light)] transition-colors"><Linkedin size={28} /></a>
                <a href={SOCIAL_LINKS.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="text-gray-400 hover:text-[var(--color-madafu-gold-light)] transition-colors"><Github size={28} /></a>
                <a href={SOCIAL_LINKS.twitter} target="_blank" rel="noopener noreferrer" aria-label="X" className="text-gray-400 hover:text-[var(--color-madafu-gold-light)] transition-colors"><XIcon size={28} /></a>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} autoComplete="off" className="bg-black border border-white/10 rounded-2xl shadow-2xl shadow-black/60 overflow-hidden">
            {/* Terminal Header */}
            <div className="flex items-center gap-2 border-b border-white/10 bg-white/5 px-4 py-3">
              <span className="w-3 h-3 rounded-full bg-red-500/70" />
              <span className="w-3 h-3 rounded-full bg-yellow-500/70" />
              <span className="w-3 h-3 rounded-full bg-green-500/70" />
              <span className="ml-3 text-xs font-mono text-[var(--color-madafu-green)]">nelson@kimaiga: ~/consult$</span>
            </div>

            <div className="p-8 md:p-10 space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-8">
                <input
                  type="text" name="name" placeholder="Full Name" required
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 outline-none transition-colors focus:border-[var(--color-madafu-green)] focus:ring-2 focus:ring-[var(--color-madafu-green)]/20"
                  onChange={handleInputChange}
                />
                <input
                  type="text" name="phone" placeholder="Phone Number"
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 outline-none transition-colors focus:border-[var(--color-madafu-green)] focus:ring-2 focus:ring-[var(--color-madafu-green)]/20"
                  onChange={handleInputChange}
                />
              </div>
              <input
                type="email" name="email" placeholder="Email Address" required
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 outline-none transition-colors focus:border-[var(--color-madafu-green)] focus:ring-2 focus:ring-[var(--color-madafu-green)]/20"
                onChange={handleInputChange}
              />
              <textarea
                name="message" rows={4} placeholder="Your Message — role, project scope, or consulting inquiry" required
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 outline-none transition-colors focus:border-[var(--color-madafu-green)] focus:ring-2 focus:ring-[var(--color-madafu-green)]/20 resize-none"
                onChange={handleInputChange}
              />
              <button type="submit" className="w-full py-4 bg-[var(--color-madafu-gold)] text-black font-bold rounded-lg uppercase tracking-wider hover:bg-[var(--color-madafu-gold-light)] transition-all shadow-lg shadow-black/40 active:scale-[0.98]">
                Send Message
              </button>
            </div>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black py-12 text-white border-t-2 border-[var(--color-madafu-gold-light)]/30">
        <div className="max-w-7xl mx-auto px-6 flex flex-col items-center gap-6">
          {/* Social Icons */}
          <div className="flex gap-4">
            <a href={SOCIAL_LINKS.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="w-11 h-11 inline-flex items-center justify-center bg-white/10 rounded-full text-white transition-all duration-300 hover:bg-white group">
              <Linkedin className="w-5 h-5 group-hover:text-blue-600" />
            </a>
            <a href={SOCIAL_LINKS.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="w-11 h-11 inline-flex items-center justify-center bg-white/10 rounded-full text-white transition-all duration-300 hover:bg-white group">
              <Github className="w-5 h-5 group-hover:text-black" />
            </a>
            <a href={SOCIAL_LINKS.twitter} target="_blank" rel="noopener noreferrer" aria-label="X" className="w-11 h-11 inline-flex items-center justify-center bg-white/10 rounded-full text-white transition-all duration-300 hover:bg-white group">
              <XIcon size={20} className="group-hover:text-black" />
            </a>
          </div>

          {/* Copyright */}
          <p className="text-sm text-white">&copy; {new Date().getFullYear()} Nelson Kimaiga. All Rights Reserved.</p>
        </div>

        {/* Floating Scroll-to-top button */}
        <button
          onClick={scrollToTop}
          className={`fixed bottom-8 right-8 p-2 bg-[var(--color-madafu-gold)] text-black rounded-full shadow-2xl transition-all duration-300 hover:bg-[var(--color-madafu-gold-light)] hover:scale-110 z-50 border border-white/20 ${
            showScrollTop ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'
          }`}
          aria-label="Scroll to top"
        >
          <ArrowUp className="w-5 h-5" />
        </button>
      </footer>
    </div>
  );
};

export default App;
