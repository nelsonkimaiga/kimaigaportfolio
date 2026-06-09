import React, { useState, useEffect } from 'react';
import { 
  Linkedin, 
  Github, 
  Twitter, 
  ExternalLink, 
  Database, 
  Code2, 
  Smartphone, 
  Globe, 
  ChevronDown, 
  Mail, 
  Phone, 
  MapPin,
  ArrowUp,
  Menu,
  X
} from 'lucide-react';

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

interface Skill {
  name: string;
}

interface SkillCategory {
  title: string;
  skills: string[];
}

const PROJECTS: Project[] = [
  { 
    id: 1, 
    title: 'DOCUBOX', 
    category: 'websitework', 
    description: 'Digital Archiving System', 
    imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=400', 
    link: 'https://mydocubox.org/',
    stack: ['React', 'Node.js', 'PostgreSQL']
  },
  { 
    id: 2, 
    title: 'Good Financial Grant Practice', 
    category: 'websitework', 
    description: 'Grant Management Platform', 
    imageUrl: 'https://images.unsplash.com/photo-1454165833767-027ffea89c17?auto=format&fit=crop&q=80&w=400', 
    link: 'https://gfgp.ai',
    stack: ['Angular', 'Spring Boot', 'MySQL']
  },
  { 
    id: 3, 
    title: 'Open Research Africa', 
    category: 'websitework', 
    description: 'Scientific Publishing Platform', 
    imageUrl: 'https://images.unsplash.com/photo-1507413245164-6160d8298b31?auto=format&fit=crop&q=80&w=400', 
    link: 'https://openresearchafrica.org/',
    stack: ['Java', 'React', 'ElasticSearch']
  },
  { 
    id: 4, 
    title: 'D3 PlayGround', 
    category: 'websitework', 
    description: 'Interactive Data Visualizations', 
    imageUrl: 'https://images.unsplash.com/photo-1551288049-bbda38a594a0?auto=format&fit=crop&q=80&w=400', 
    link: 'http://nelsonkimaiga.github.io/D3Graphs/',
    stack: ['D3.js', 'JavaScript', 'SVG']
  },
  { 
    id: 5, 
    title: 'Addis Ababa University', 
    category: 'websitework', 
    description: 'Academic Management Portal', 
    imageUrl: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&q=80&w=400', 
    link: 'https://www.aau.edu.et/',
    stack: ['Python', 'Django', 'PostgreSQL']
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

const TypingEffect = () => {
  const [text, setText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [typingSpeed, setTypingSpeed] = useState(150);

  const phrases = ["a code Junkie", "an Agile Junkie", "a Versatile Software Engineer"];

  useEffect(() => {
    const handleTyping = () => {
      const i = loopNum % phrases.length;
      const fullText = phrases[i];

      setText(isDeleting 
        ? fullText.substring(0, text.length - 1) 
        : fullText.substring(0, text.length + 1)
      );

      setTypingSpeed(isDeleting ? 30 : 150);

      if (!isDeleting && text === fullText) {
        setTimeout(() => setIsDeleting(true), 1000);
      } else if (isDeleting && text === '') {
        setIsDeleting(false);
        setLoopNum(loopNum + 1);
      }
    };

    const timer = setTimeout(handleTyping, typingSpeed);
    return () => clearTimeout(timer);
  }, [text, isDeleting, loopNum, typingSpeed]);

  return <span className="text-[#7afbc4] border-r-2 border-[#7afbc4] animate-pulse">{text}</span>;
};

// --- Main Component ---

const App: React.FC = () => {
  const [isSticky, setIsSticky] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [formData, setFormData] = useState({ name: '', phone: '', email: '', message: '' });

  // Scroll listener for sticky header and scroll-to-top button
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
      : 'hidden md:flex gap-8 items-center text-xs font-bold uppercase tracking-widest text-white'}`}>
      <li className="hover:text-[#7afbc4] transition-colors"><a href="#home" onClick={() => setIsMenuOpen(false)}>Home</a></li>
      <li className="hover:text-[#7afbc4] transition-colors"><a href="#works" onClick={() => setIsMenuOpen(false)}>Portfolio</a></li>
      <li className="hover:text-[#7afbc4] transition-colors"><a href="#about" onClick={() => setIsMenuOpen(false)}>About</a></li>
      <li className="hover:text-[#7afbc4] transition-colors">
        <a href="https://rhapsody.azurewebsites.net/" target="_blank" rel="noopener noreferrer" onClick={() => setIsMenuOpen(false)}>Blog</a>
      </li>
      <li className="hover:text-[#7afbc4] transition-colors"><a href="#contact" onClick={() => setIsMenuOpen(false)}>Contact</a></li>
    </ul>
  );

  return (
    <div className="font-raleway text-gray-600 antialiased overflow-x-hidden">
      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-[2000] transition-all duration-500 px-6 py-4 flex justify-between items-center ${
        isSticky ? 'bg-[#00196F] py-2 shadow-lg border-b border-[#7afbc4]/20' : 'bg-transparent'
      }`}>
        <a href="#home" className="block">
          <div className={`rounded-full border-2 border-[#7afbc4] overflow-hidden bg-white transition-all duration-500 ${
            isSticky ? 'w-10 h-10 ring-2 ring-white/20 ring-offset-2 ring-offset-[#00196F]' : 'w-16 h-16'
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
      <div className={`fixed inset-0 z-[1999] bg-[#00196F] text-white transition-transform duration-500 ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'} md:hidden`}>
        <NavLinks mobile />
      </div>

      {/* Hero Section */}
      <section id="home" className="relative h-screen bg-[#29293a] flex flex-col items-center justify-center text-center px-4 overflow-hidden">
        {/* Atmospheric Light Background */}
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-blue-500 to-teal-400 rounded-full blur-[120px] animate-pulse" />
        </div>

        <div className="z-10 animate-fadeInUp">
          <p className="text-[#7afbc4] font-extrabold text-lg mb-2">Hello, I'm</p>
          <h1 className="text-white text-5xl md:text-8xl font-thin uppercase tracking-tight mb-4">
            Nelson Kimaiga
          </h1>
          <h2 className="text-xl md:text-3xl text-white font-light">
            I am <TypingEffect />
          </h2>

          <div className="flex gap-6 mt-12 justify-center">
            <a href={SOCIAL_LINKS.linkedin} target="_blank" rel="noopener noreferrer" className="p-3 bg-white/10 rounded-full hover:bg-white transition-all group">
              <Linkedin className="w-6 h-6 text-white group-hover:text-blue-600" />
            </a>
            <a href={SOCIAL_LINKS.github} target="_blank" rel="noopener noreferrer" className="p-3 bg-white/10 rounded-full hover:bg-white transition-all group">
              <Github className="w-6 h-6 text-white group-hover:text-black" />
            </a>
            <a href={SOCIAL_LINKS.twitter} target="_blank" rel="noopener noreferrer" className="p-3 bg-white/10 rounded-full hover:bg-white transition-all group">
              <Twitter className="w-6 h-6 text-white group-hover:text-sky-400" />
            </a>
          </div>

          <div className="mt-16 flex flex-col md:flex-row gap-4 justify-center">
            <a href="#works" className="px-10 py-4 bg-[#7afbc4] text-[#00196F] font-bold rounded uppercase hover:bg-white transition-all">
              See My Portfolio
            </a>
          </div>
        </div>

        <div className="absolute bottom-10 animate-bounce">
          <a href="#works"><ChevronDown className="text-[#7afbc4] w-8 h-8" /></a>
        </div>
      </section>

      {/* Portfolio Section */}
      <section id="works" className="py-24 bg-[#ebfffc]">
        <div className="max-w-7xl mx-auto px-6">
          <h3 className="text-4xl md:text-5xl font-light text-[#00196F] uppercase text-center mb-16">
            My Portfolio
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {PROJECTS.map((project) => (
              <div key={project.id} className="group flex flex-col bg-white rounded-xl shadow-md border border-slate-100 overflow-hidden transition-all duration-300 hover:shadow-2xl">
                <div className="relative aspect-video overflow-hidden">
                  <img 
                    src={project.imageUrl} 
                    alt={project.title} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
                  />
                  <div className="absolute inset-0 bg-[#00196F]/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <a 
                      href={project.link} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="px-6 py-2 bg-[#7afbc4] text-[#00196F] font-bold rounded-full transform translate-y-4 group-hover:translate-y-0 hover:scale-105 transition-all duration-300 flex items-center gap-2"
                    >
                      View Project <ExternalLink size={16} />
                    </a>
                  </div>
                </div>

                <div className="p-6 flex flex-col text-left">
                  <h4 className="text-lg font-bold text-[#00196F] uppercase mb-1">
                    {project.title}
                  </h4>
                  <p className="text-gray-500 text-sm mb-4">
                    {project.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mt-auto">
                    {project.stack.map((tech) => (
                      <span 
                        key={tech} 
                        className="px-2 py-1 bg-slate-100 rounded-full text-xs font-semibold text-[#00196F]"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 bg-[#2a2d38] text-white">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h3 className="text-4xl md:text-5xl font-light uppercase text-[#7afbc4] mb-8">About Me</h3>
          <p className="max-w-4xl mx-auto text-xl md:text-2xl font-light text-gray-400 leading-relaxed mb-20">
            I’m a <span className="text-white font-medium">Software Engineer</span> based in Nairobi, Kenya, 
            building robust solutions for Web and Mobile platforms while advocating for open-source and modern software engineering practices.
          </p>

          <div className="mb-12">
            <span className="inline-block px-8 py-3 bg-[#52947e] rounded text-white font-bold uppercase tracking-widest mb-12">
              Skills & Competencies
            </span>
          </div>

          {/* Categorical Grid Layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-left">
            {SKILL_CATEGORIES.map((category) => (
              <div 
                key={category.title} 
                className="bg-white p-8 rounded-xl shadow-sm border border-slate-100 transition-all duration-300 hover:shadow-md"
              >
                <h4 className="text-lg font-bold text-[#00196F] uppercase mb-6 border-b border-slate-50 pb-2">
                  {category.title}
                </h4>
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill) => (
                    <span 
                      key={skill} 
                      className="px-3 py-1 bg-[#ebfffc] text-[#00196F] text-sm font-medium rounded-md border border-[#7afbc4]/20"
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

      {/* Contact Section */}
      <section id="contact" className="py-24 bg-[#ebfffc]">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div className="flex flex-col justify-center">
            <h3 className="text-4xl font-light text-[#00196F] uppercase mb-8">Let's keep in touch</h3>
            <div className="space-y-8 text-lg text-left">
              <div className="flex items-center gap-6 group cursor-default transition-transform duration-300 hover:translate-x-1">
                <div className="p-3 bg-white rounded-lg shadow-sm">
                  <MapPin className="text-[#36B693] w-6 h-6" />
                </div>
                <p>Nairobi, Kenya</p>
              </div>
              <div className="flex items-center gap-6 group cursor-default transition-transform duration-300 hover:translate-x-1">
                <div className="p-3 bg-white rounded-lg shadow-sm">
                  <Phone className="text-[#36B693] w-6 h-6" />
                </div>
                <p>+254 721 496 346</p>
              </div>
              <div className="flex items-center gap-6 group cursor-default transition-transform duration-300 hover:translate-x-1">
                <div className="p-3 bg-white rounded-lg shadow-sm">
                  <Mail className="text-[#36B693] w-6 h-6" />
                </div>
                <p>nelsonkimaiga@aol.com</p>
              </div>
            </div>

            <div className="mt-16 text-left">
              <p className="font-bold text-[#00196F] uppercase tracking-wider mb-6">I am social</p>
              <div className="flex gap-8">
                <a href={SOCIAL_LINKS.linkedin} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#00196F] transition-colors"><Linkedin size={28} /></a>
                <a href={SOCIAL_LINKS.github} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#00196F] transition-colors"><Github size={28} /></a>
                <a href={SOCIAL_LINKS.twitter} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#00196F] transition-colors"><Twitter size={28} /></a>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-10 bg-white/40 p-10 rounded-2xl backdrop-blur-sm border border-white/40 shadow-xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-10">
              <div className="relative">
                <input 
                  type="text" name="name" placeholder="Full Name" required
                  className="bg-transparent border-b-2 border-gray-300 focus:border-[#36B693] transition-colors outline-none px-0 py-3 w-full text-left"
                  onChange={handleInputChange}
                />
              </div>
              <div className="relative">
                <input 
                  type="text" name="phone" placeholder="Phone Number"
                  className="bg-transparent border-b-2 border-gray-300 focus:border-[#36B693] transition-colors outline-none px-0 py-3 w-full text-left"
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div className="relative">
              <input 
                type="email" name="email" placeholder="Email Address" required
                className="bg-transparent border-b-2 border-gray-300 focus:border-[#36B693] transition-colors outline-none px-0 py-3 w-full text-left"
                onChange={handleInputChange}
              />
            </div>
            <div className="relative">
              <textarea 
                name="message" rows={4} placeholder="Your Message" required
                className="bg-transparent border-b-2 border-gray-300 focus:border-[#36B693] transition-colors outline-none px-0 py-3 w-full resize-none text-left"
                onChange={handleInputChange}
              />
            </div>
            <button type="submit" className="w-full py-4 bg-[#00196F] text-white font-bold rounded-md uppercase tracking-wider hover:bg-[#36B693] transition-all shadow-lg hover:shadow-[#36B693]/20 active:scale-[0.98]">
              Talk To Me
            </button>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-950 py-12 text-white border-t-2 border-[#7afbc4]">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8 text-center md:text-left">
          {/* Left Side: Brand */}
          <div className="flex flex-col items-center md:items-start gap-2">
            <span className="text-lg font-bold tracking-tight">Nelson Kimaiga</span>
            <div className="flex gap-4 text-xs font-medium uppercase tracking-widest">
              <a href={SOCIAL_LINKS.linkedin} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">LinkedIn</a>
              <a href={SOCIAL_LINKS.github} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">GitHub</a>
              <a href={SOCIAL_LINKS.twitter} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">Twitter</a>
            </div>
          </div>

          {/* Right Side: Copyright & Scroll */}
          <div className="flex flex-col items-center md:items-end gap-2 text-sm text-gray-400">
            <p>&copy; {new Date().getFullYear()} Nelson Kimaiga. All Rights Reserved.</p>
            <button 
              onClick={scrollToTop} 
              className="text-xs uppercase tracking-widest text-gray-500 hover:text-[#7afbc4] transition-colors flex items-center gap-2"
            >
              Back to top <ArrowUp size={12} />
            </button>
          </div>
        </div>
        
        {/* Floating Scroll-to-top button */}
        <button 
          onClick={scrollToTop}
          className={`fixed bottom-8 right-8 p-2 bg-[#7afbc4] text-[#00196F] rounded-full shadow-2xl transition-all duration-300 hover:bg-white hover:scale-110 z-50 border border-white/20 ${
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
