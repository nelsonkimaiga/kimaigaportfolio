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
  Server,
  Database,
  Activity,
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
  role: string;
  company: string;
  tags?: string[];
}

interface HealthFeature {
  title: string;
  desc: string;
  icon: LucideIcon;
}

interface SkillCategory {
  title: string;
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
    summary: 'Event-driven claims adjudication switch orchestrating validation, fraud checks, and approvals across providers, hospitals, and payers.',
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
    summary: 'FHIR-based interoperability gateway connecting EMRs, national surveillance systems (DHIS2), and hospital platforms for seamless data exchange and reporting.',
    stack: ['HL7 FHIR', 'Spring Boot', 'OpenMRS', 'DHIS2'],
    flow: ['EMR', 'FHIR Gateway', 'Spring Boot APIs', 'OpenMRS / DHIS2'],
    icon: Database
  },
];

const DOMAIN_PILLS = [
  '11+ Years Experience',
  'InsurTech',
  'Digital Health',
  'Fintech & Payments',
];

const HEALTH_FEATURES: HealthFeature[] = [
  {
    title: 'OpenMRS',
    desc: 'Customization and production-grade EMR workflows powering clinics and national health programs across multiple deployments.',
    icon: Activity
  },
  {
    title: 'HL7 FHIR',
    desc: 'Interoperability standards engineering — designing FHIR resources, bundles, and RESTful APIs for seamless clinical data exchange.',
    icon: GitBranch
  },
  {
    title: 'DHIS2',
    desc: 'Surveillance and national reporting integrations enabling real-time aggregate health data for decision-making.',
    icon: Database
  },
  {
    title: 'eClaims & HMIS Integrations',
    desc: 'Electronic claims processing and HMIS integrations spanning Care2000, Kranium, and Med360 for healthcare administration.',
    icon: ShieldCheck
  },
];

const HEALTH_STANDARDS = [
  'HL7', 'FHIR R4', 'OpenMRS', 'DHIS2', 'OpenHIE', 'Care2000', 'Kranium', 'Med360', 'EMR', 'HIE'
];

const CAREER: CareerEntry[] = [
  {
    period: 'Apr 2025 — Present',
    role: 'Senior Software Engineer',
    company: 'AON Minet',
    tags: ['Microservices', 'Event-Driven Architecture', 'Claims Automation', 'Hospital Integrations']
  },
  {
    period: 'May 2023 — Mar 2025',
    role: 'Digital Health Software Engineer',
    company: 'IntelliSOFT',
    tags: ['OpenMRS EMR', 'HL7 FHIR Interoperability', 'DHIS2', 'LLM Healthcare Integrations']
  },
  {
    period: 'Nov 2022 — Apr 2023',
    role: 'FullStack Engineer',
    company: 'Jubilee Health Insurance',
    tags: ['Digital Health Wellness Apps', 'Cross-platform Mobile & Web']
  },
  {
    period: 'Jul 2021 — Oct 2022',
    role: 'Software Engineer',
    company: 'UBIQPay',
    tags: ['Payment Gateways: M-Pesa, Tingg, Airtel, MTN MoMo', 'Gaming/Lottery Backend']
  },
  {
    period: 'Jan 2020 — Jun 2021',
    role: 'Software Engineer',
    company: 'LCT Africa',
    tags: ['eClaims Processing', 'Healthcare Administration', 'HMIS Integrations: Care2000, Kranium, Med360']
  },
  {
    period: 'May 2018 — Dec 2019',
    role: 'FullStack Developer',
    company: 'Compulynx',
    tags: ['COMPAS Biometric Platform', 'Equity Bank Kenya & Post Bank Uganda']
  },
  {
    period: 'Oct 2016 — Apr 2018',
    role: 'Software Developer',
    company: 'African Academy of Sciences',
    tags: ['Community of Practice Research Platforms']
  },
  {
    period: 'May 2015 — Sept 2016',
    role: 'Junior Software Developer',
    company: 'Moringa School'
  },
];

const SKILL_CATEGORIES: SkillCategory[] = [
  {
    title: 'Programming Languages',
    skills: ['Java', 'Python', 'Javascript', 'TypeScript']
  },
  {
    title: 'Frameworks & Libraries',
    skills: ['Spring Boot', 'React', 'React Native', 'Angular', 'Django']
  },
  {
    title: 'Databases',
    skills: ['MySQL', 'PostgreSQL', 'ElasticSearch', 'Redis']
  },
  {
    title: 'DevOps & Tools',
    skills: ['Docker', 'CI/CD Pipelines', 'GitHub', 'Git', 'Vite', 'Maven', 'OpenMRS', 'FHIR', 'HL7', 'Health Information Systems']
  },
  {
    title: 'Cloud Tools',
    skills: ['AWS', 'Digital Ocean', 'Google Cloud Platform(GCP)']
  },
  {
    title: 'Agile & Leadership',
    skills: ['Scrum', 'Project Management', 'Agile Development', 'Team Leadership']
  }
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

const SectionHeading = ({ eyebrow, title, dark = false }: { eyebrow: string; title: string; dark?: boolean }) => (
  <div className="text-center mb-16">
    <span className={`inline-block px-3 py-1 rounded-full font-mono text-xs uppercase tracking-widest mb-4 border ${
      dark ? 'bg-[#2DD4BF]/10 border-[#2DD4BF]/20 text-[#2DD4BF]' : 'bg-[#0D9488]/10 border-[#0D9488]/20 text-[#0D9488]'
    }`}>
      {eyebrow}
    </span>
    <h3 className={`text-3xl md:text-4xl font-bold tracking-tight ${dark ? 'text-white' : 'text-slate-900'}`}>
      {title}
    </h3>
  </div>
);

const FlowDiagram = ({ steps }: { steps: string[] }) => (
  <div className="flex flex-col md:flex-row items-stretch gap-2 md:gap-0">
    {steps.map((step, i) => (
      <Fragment key={step}>
        <div className="flex-1 flex items-center justify-center px-4 py-3 rounded-lg bg-slate-800/60 border border-slate-700 text-center text-sm font-medium text-slate-200 transition-colors duration-300 hover:border-teal-500/40">
          {step}
        </div>
        {i < steps.length - 1 && (
          <div className="flex items-center justify-center text-slate-500 py-1 md:px-2 rotate-90 md:rotate-0">
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
  const [formData, setFormData] = useState({ name: '', phone: '', email: '', message: '' });

  // Scroll listener for sticky header and scroll-to-top button
  useEffect(() => {
    applySEO({
      title: 'Nelson Kimaiga | Senior Software & Systems Engineer',
      description: '11+ years of experience designing, building, and deploying scalable enterprise software across backend architectures, payment switches, cloud infrastructure, and digital health.',
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
      <li className="hover:text-[#2DD4BF] transition-colors"><a href="#home" onClick={() => setIsMenuOpen(false)}>Home</a></li>
      <li className="hover:text-[#2DD4BF] transition-colors"><a href="#about" onClick={() => setIsMenuOpen(false)}>About</a></li>
      <li className="hover:text-[#2DD4BF] transition-colors"><a href="#experience" onClick={() => setIsMenuOpen(false)}>Experience</a></li>
      <li className="hover:text-[#2DD4BF] transition-colors"><a href="#works" onClick={() => setIsMenuOpen(false)}>Projects</a></li>
      <li className="hover:text-[#2DD4BF] transition-colors">
        <a href="https://blog.nelsonkimaiga.com" target="_blank" rel="noopener noreferrer" onClick={() => setIsMenuOpen(false)}>Blog</a>
      </li>
      <li className="hover:text-[#2DD4BF] transition-colors"><a href="#contact" onClick={() => setIsMenuOpen(false)}>Contact</a></li>
    </ul>
  );

  return (
    <div className="font-sans text-slate-400 antialiased overflow-x-hidden bg-slate-950">
      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-[2000] transition-all duration-500 px-6 py-4 flex justify-between items-center ${
        isSticky ? 'bg-[#0A1128]/90 backdrop-blur-md py-2 shadow-lg border-b border-teal-400/20' : 'bg-transparent'
      }`}>
        <a href="#home" className="block">
          <div className={`rounded-full border-2 border-[#2DD4BF] overflow-hidden bg-white transition-all duration-500 ${
            isSticky ? 'w-10 h-10 ring-2 ring-white/20 ring-offset-2 ring-offset-[#0A1128]' : 'w-16 h-16'
          }`}>
             <img
              src="https://ui-avatars.com/api/?name=Nelson+Kimaiga&background=00196F&color=7afbc4"
              alt="Nelson Kimaiga"
              className="w-full h-full object-cover"
            />
          </div>
        </a>

        {/* Desktop Nav */}
        <NavLinks />

        {/* Mobile Toggle */}
        <button onClick={toggleMenu} className="md:hidden text-white p-2">
          {isMenuOpen ? <X size={32} /> : <Menu size={32} />}
        </button>
      </nav>

      {/* Mobile Menu Overlay */}
      <div className={`fixed inset-0 z-[1999] bg-[#0A1128] text-white transition-transform duration-500 ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'} md:hidden`}>
        <NavLinks mobile />
      </div>

      {/* Hero Section */}
      <section id="home" className="relative min-h-screen bg-[#0A1128] flex flex-col items-center justify-center text-center px-4 overflow-hidden">
        {/* Atmospheric Light Background */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] bg-gradient-to-r from-blue-500/15 via-teal-400/10 to-blue-600/15 rounded-full blur-[140px] animate-pulse" />
          <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[100px]" />
        </div>

        <div className="relative z-10 animate-fadeInUp py-24">
          <p className="text-[#2DD4BF] font-extrabold text-lg mb-2">Hello, I'm</p>
          <h1 className="text-white text-5xl md:text-7xl lg:text-8xl font-thin uppercase tracking-tight mb-4">
            Nelson Kimaiga
          </h1>
          <h2 className="text-2xl md:text-4xl text-white font-bold mb-4">
            Senior Software & Systems Engineer
          </h2>
          <p className="max-w-2xl mx-auto text-base md:text-lg text-slate-300 font-light leading-relaxed">
            11+ years of experience designing, building, and deploying scalable enterprise software across backend architectures, payment switches, cloud infrastructure, and digital health.
          </p>

          {/* Domain Pills */}
          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            {DOMAIN_PILLS.map((pill, i) => (
              <span
                key={pill}
                className={`px-4 py-2 rounded-full font-mono text-sm whitespace-nowrap transition-all duration-300 ${
                  i === 0
                    ? 'bg-[#2DD4BF] text-slate-950 font-semibold'
                    : 'border border-white/15 bg-white/5 text-slate-300 hover:border-[#2DD4BF]/50 hover:text-[#2DD4BF]'
                }`}
              >
                {pill}
              </span>
            ))}
          </div>

          <div className="flex gap-6 mt-12 justify-center">
            <a href={SOCIAL_LINKS.linkedin} target="_blank" rel="noopener noreferrer" className="p-3 bg-white/10 rounded-full hover:bg-white transition-all group" aria-label="LinkedIn">
              <Linkedin className="w-6 h-6 text-white group-hover:text-blue-600" />
            </a>
            <a href={SOCIAL_LINKS.github} target="_blank" rel="noopener noreferrer" className="p-3 bg-white/10 rounded-full hover:bg-white transition-all group" aria-label="GitHub">
              <Github className="w-6 h-6 text-white group-hover:text-black" />
            </a>
            <a href={SOCIAL_LINKS.twitter} target="_blank" rel="noopener noreferrer" className="p-3 bg-white/10 rounded-full hover:bg-white transition-all group" aria-label="X">
              <XIcon size={24} className="text-white group-hover:text-black" />
            </a>
          </div>

          <div className="mt-12 flex flex-col md:flex-row gap-4 justify-center">
            <a href="#works" className="px-10 py-4 bg-[#2DD4BF] text-slate-950 font-bold rounded uppercase hover:bg-white transition-all">
              See My Portfolio
            </a>
          </div>
        </div>

        <div className="absolute bottom-6 animate-bounce">
          <a href="#about"><ChevronDown className="text-[#2DD4BF] w-8 h-8" /></a>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 bg-slate-50 text-slate-900">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <SectionHeading eyebrow="Profile" title="About Me" />
          <p className="max-w-4xl mx-auto text-xl md:text-2xl font-light text-slate-600 text-justify leading-relaxed mb-20">
            I’m a <span className="text-slate-900 font-semibold">Senior Software Engineer</span> based in Nairobi, Kenya, with{' '}
            <span className="text-slate-900 font-semibold">11+ years of experience</span> building resilient web, mobile, and cloud applications. Specializing in{' '}
            <span className="text-slate-900 font-semibold">backend architectures</span>, <span className="text-slate-900 font-semibold">DevOps</span>, and{' '}
            <span className="text-slate-900 font-semibold">digital health solutions</span>, I focus on turning complex technical challenges into scalable, production-ready platforms. When I'm not shipping code, I'm active in the open-source community and sharing technical insights on software design and architecture.
          </p>

          <div className="mb-12">
            <span className="inline-block px-8 py-3 bg-[#0D9488]/10 border border-[#0D9488]/20 text-[#0D9488] rounded font-bold uppercase tracking-widest mb-12">
              Skills & Competencies
            </span>
          </div>

          {/* Categorical Grid Layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-left">
            {SKILL_CATEGORIES.map((category) => (
              <div
                key={category.title}
                className="bg-white p-8 rounded-xl border border-slate-200 shadow-sm transition-all duration-300 hover:shadow-md"
              >
                <h4 className="text-lg font-bold text-slate-900 uppercase mb-6 border-b border-slate-100 pb-2">
                  {category.title}
                </h4>
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1 bg-[#0D9488]/10 text-[#0D9488] text-sm font-medium rounded-md border border-[#0D9488]/20"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Career Roadmap */}
      <section id="experience" className="py-24 bg-slate-900">
        <div className="max-w-5xl mx-auto px-6">
          <SectionHeading eyebrow="Career Journey" title="Career Roadmap" dark />

          <div className="relative ml-2 border-l-2 border-slate-800 pl-8 md:pl-12 space-y-8">
            {CAREER.map((entry, idx) => (
              <div key={`${entry.company}-${idx}`} className="relative">
                <span className="absolute -left-[38px] md:-left-[54px] top-2 w-3 h-3 rounded-full bg-[#2DD4BF] ring-4 ring-[#2DD4BF]/25" />
                <div className="bg-slate-800/40 border border-slate-800 rounded-xl p-6 transition-all duration-300 hover:border-teal-500/40 hover:-translate-y-1">
                  <span className="inline-block text-xs font-bold text-[#2DD4BF] uppercase tracking-widest mb-2 font-mono">
                    {entry.period}
                  </span>
                  <h4 className="text-lg md:text-xl font-bold text-white">{entry.role}</h4>
                  <p className="text-sm text-slate-400 mb-3 flex items-center gap-2">
                    <Building2 size={14} className="text-slate-500" />
                    <span className="text-slate-300 font-medium">{entry.company}</span>
                  </p>
                  {entry.tags && entry.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {entry.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2.5 py-1 rounded-full bg-[#2DD4BF]/10 border border-[#2DD4BF]/20 text-xs text-[#2DD4BF]"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Digital Health & Specialty */}
      <section id="health" className="py-24 bg-[#F4F7F6]">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeading eyebrow="Specialty" title="Digital Health Expertise" />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {HEALTH_FEATURES.map((feature) => (
              <div
                key={feature.title}
                className="group bg-white border border-slate-200 shadow-sm rounded-xl p-8 transition-all duration-300 hover:shadow-md"
              >
                <div className="w-12 h-12 rounded-xl bg-[#0D9488]/10 flex items-center justify-center mb-5 text-[#0D9488]">
                  <feature.icon size={24} />
                </div>
                <h4 className="text-lg font-bold text-slate-900 mb-2">{feature.title}</h4>
                <p className="text-sm text-slate-600 leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>

          {/* Health Standards Badges */}
          <div className="mt-12 text-center">
            <p className="text-xs uppercase tracking-widest text-slate-500 mb-5 font-bold font-mono">Health Standards</p>
            <div className="flex flex-wrap justify-center gap-3">
              {HEALTH_STANDARDS.map((standard) => (
                <span
                  key={standard}
                  className="px-4 py-2 rounded-full bg-[#0D9488]/5 border border-[#0D9488]/20 text-sm text-[#0D9488] font-medium font-mono"
                >
                  {standard}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Projects & Case Studies */}
      <section id="works" className="py-24 bg-slate-950">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeading eyebrow="Selected Work" title="Projects & Case Studies" dark />

          {/* Tabs */}
          <div className="flex justify-center mb-12">
            <div className="inline-flex p-1 bg-slate-900/60 border border-slate-800 rounded-full">
              <button
                onClick={() => setActiveTab('enterprise')}
                className={`px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ${
                  activeTab === 'enterprise' ? 'bg-[#2DD4BF] text-slate-950 shadow-lg' : 'text-slate-400 hover:text-white'
                }`}
              >
                Enterprise Systems
              </button>
              <button
                onClick={() => setActiveTab('web')}
                className={`px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ${
                  activeTab === 'web' ? 'bg-[#2DD4BF] text-slate-950 shadow-lg' : 'text-slate-400 hover:text-white'
                }`}
              >
                Web Platforms & Apps
              </button>
            </div>
          </div>

          {activeTab === 'enterprise' ? (
            <div className="grid grid-cols-1 gap-10">
              {ENTERPRISE_CASES.map((entry) => (
                <div key={entry.title} className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 md:p-10 transition-all duration-300 hover:border-teal-500/40">
                  <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6 mb-8">
                    <div className="flex items-start gap-5 max-w-2xl">
                      <div className="w-12 h-12 shrink-0 rounded-xl bg-[#2DD4BF]/10 border border-[#2DD4BF]/20 text-[#2DD4BF] flex items-center justify-center">
                        <entry.icon size={22} />
                      </div>
                      <div>
                        <h4 className="text-xl md:text-2xl font-bold text-white">{entry.title}</h4>
                        <p className="text-slate-400 mt-2 text-sm md:text-base leading-relaxed">{entry.summary}</p>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2 shrink-0">
                      {entry.stack.map((tech) => (
                        <span
                          key={tech}
                          className="px-3 py-1 rounded-full bg-[#2DD4BF]/10 border border-[#2DD4BF]/20 text-xs text-[#2DD4BF] font-semibold"
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
                <div key={project.id} className="group flex flex-col bg-slate-900/80 rounded-xl border border-slate-800 overflow-hidden transition-all duration-300 hover:shadow-2xl hover:border-teal-500/40">
                  <div className="relative aspect-video overflow-hidden">
                    <img
                      src={project.imageUrl}
                      alt={project.title}
                      className="w-full h-full object-contain bg-white p-6 rounded-lg transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-slate-950/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-6 py-2 bg-[#2DD4BF] text-slate-950 font-bold rounded-full transform translate-y-4 group-hover:translate-y-0 hover:scale-105 transition-all duration-300 flex items-center gap-2"
                      >
                        View Project <ExternalLink size={16} />
                      </a>
                    </div>
                  </div>

                  <div className="p-6 flex flex-col text-left">
                    <h4 className="text-lg font-bold text-white uppercase mb-1">
                      {project.title}
                    </h4>
                    <p className="text-slate-400 text-sm mb-4">
                      {project.description}
                    </p>

                    <div className="flex flex-wrap gap-2 mt-auto">
                      {project.stack.map((tech) => (
                        <span
                          key={tech}
                          className="px-2 py-1 bg-[#2DD4BF]/10 border border-[#2DD4BF]/20 rounded-full text-xs font-semibold text-[#2DD4BF]"
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
      <section id="contact" className="py-24 bg-slate-100">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div className="flex flex-col justify-center">
            <h3 className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight mb-8">Let's keep in touch</h3>
            <div className="space-y-8 text-lg text-left">
              <div className="flex items-center gap-6 group cursor-default transition-transform duration-300 hover:translate-x-1">
                <div className="p-3 bg-white border border-slate-200 shadow-sm rounded-lg">
                  <MapPin className="text-[#0D9488] w-6 h-6" />
                </div>
                <p className="text-slate-700">Nairobi, Kenya</p>
              </div>
              <div className="flex items-center gap-6 group cursor-default transition-transform duration-300 hover:translate-x-1">
                <div className="p-3 bg-white border border-slate-200 shadow-sm rounded-lg">
                  <Phone className="text-[#0D9488] w-6 h-6" />
                </div>
                <p className="text-slate-700">+254 721 496 346</p>
              </div>
              <div className="flex items-center gap-6 group cursor-default transition-transform duration-300 hover:translate-x-1">
                <div className="p-3 bg-white border border-slate-200 shadow-sm rounded-lg">
                  <Mail className="text-[#0D9488] w-6 h-6" />
                </div>
                <a href="mailto:nelson@nelsonkimaiga.com" className="text-slate-700 hover:text-[#0D9488] transition-colors">
                  nelson@nelsonkimaiga.com
                </a>
              </div>
            </div>

            <div className="mt-16 text-left">
              <p className="font-bold text-slate-900 uppercase tracking-wider mb-6">I am social</p>
              <div className="flex gap-8">
                <a href={SOCIAL_LINKS.linkedin} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-[#0D9488] transition-colors"><Linkedin size={28} /></a>
                <a href={SOCIAL_LINKS.github} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-[#0D9488] transition-colors"><Github size={28} /></a>
                <a href={SOCIAL_LINKS.twitter} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-[#0D9488] transition-colors"><XIcon size={28} /></a>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-10 bg-white p-10 rounded-2xl border border-slate-200 shadow-sm">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-10">
              <div className="relative">
                <input
                  type="text" name="name" placeholder="Full Name" required
                  className="bg-transparent border-b-2 border-slate-300 focus:border-[#0D9488] transition-colors outline-none px-0 py-3 w-full text-left text-slate-900 placeholder-slate-400"
                  onChange={handleInputChange}
                />
              </div>
              <div className="relative">
                <input
                  type="text" name="phone" placeholder="Phone Number"
                  className="bg-transparent border-b-2 border-slate-300 focus:border-[#0D9488] transition-colors outline-none px-0 py-3 w-full text-left text-slate-900 placeholder-slate-400"
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div className="relative">
              <input
                type="email" name="email" placeholder="Email Address" required
                className="bg-transparent border-b-2 border-slate-300 focus:border-[#0D9488] transition-colors outline-none px-0 py-3 w-full text-left text-slate-900 placeholder-slate-400"
                onChange={handleInputChange}
              />
            </div>
            <div className="relative">
              <textarea
                name="message" rows={4} placeholder="Your Message" required
                className="bg-transparent border-b-2 border-slate-300 focus:border-[#0D9488] transition-colors outline-none px-0 py-3 w-full resize-none text-left text-slate-900 placeholder-slate-400"
                onChange={handleInputChange}
              />
            </div>
            <button type="submit" className="w-full py-4 bg-[#0D9488] text-white font-bold rounded-md uppercase tracking-wider hover:bg-[#0F766E] transition-all shadow-lg active:scale-[0.98]">
              Talk To Me
            </button>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-950 py-12 text-white border-t-2 border-teal-400/30">
        <div className="max-w-7xl mx-auto px-6 flex flex-col items-center gap-6">
          {/* Social Icons */}
          <div className="flex gap-4">
            <a href={SOCIAL_LINKS.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="p-3 bg-white/10 rounded-full text-white transition-all duration-300 hover:bg-white group">
              <Linkedin className="w-5 h-5 group-hover:text-blue-600" />
            </a>
            <a href={SOCIAL_LINKS.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="p-3 bg-white/10 rounded-full text-white transition-all duration-300 hover:bg-white group">
              <Github className="w-5 h-5 group-hover:text-black" />
            </a>
            <a href={SOCIAL_LINKS.twitter} target="_blank" rel="noopener noreferrer" aria-label="X" className="p-3 bg-white/10 rounded-full text-white transition-all duration-300 hover:bg-white group">
              <XIcon size={20} className="group-hover:text-black" />
            </a>
          </div>

          {/* Copyright */}
          <p className="text-sm text-white">&copy; {new Date().getFullYear()} Nelson Kimaiga. All Rights Reserved.</p>
        </div>

        {/* Floating Scroll-to-top button */}
        <button
          onClick={scrollToTop}
          className={`fixed bottom-8 right-8 p-2 bg-[#2DD4BF] text-slate-950 rounded-full shadow-2xl transition-all duration-300 hover:bg-white hover:scale-110 z-50 border border-white/20 ${
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
