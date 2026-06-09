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
  id: number;
  title: string;
  category: string;
  icon: React.ReactNode;
  color: string;
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

const SKILLS: Skill[] = [
  { id: 1, title: 'Java / OpenMRS', category: 'Back-end', icon: <Code2 className="w-5 h-5" />, color: 'bg-yellow-400' },
  { id: 2, title: 'React Native', category: 'Mobile Development', icon: <Smartphone className="w-5 h-5" />, color: 'bg-cyan-400' },
  { id: 3, title: 'HTML5/ReactJS', category: 'Front-End', icon: <Globe className="w-5 h-5" />, color: 'bg-orange-400' },
  { id: 4, title: 'Python', category: 'Back-End', icon: <Code2 className="w-5 h-5" />, color: 'bg-blue-400' },
  { id: 5, title: 'Spring Boot', category: 'Back-End', icon: <Code2 className="w-5 h-5" />, color: 'bg-green-400' },
  { id: 6, title: 'MySQL / Postgres', category: 'Relational Databases', icon: <Database className="w-5 h-5" />, color: 'bg-indigo-400' },
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
        isSticky ? 'bg-[#00196F] py-2 shadow-lg' : 'bg-transparent'
      }`}>
        <a href="#home" className="block">
          <div className={`rounded-full border-2 border-[#7afbc4] overflow-hidden bg-white transition-all duration-500 ${isSticky ? 'w-10 h-10' : 'w-16 h-16'}`}>
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
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-blue-500 to-teal-400 rounded-full blur-3xl animate-pulse" />
        </div>

        <div className="z-10 animate-fadeInUp">
          <p className="text-[#7afbc4] font-extrabold text-lg mb-2">Hello, I'm</p>
          <h1 className="text-white text-5xl md:text-8xl font-thin uppercase tracking-tighter mb-4">
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
            <a href="NELSON_KIMAIGA_CV.pdf" target="_blank" rel="noopener noreferrer" className="px-10 py-4 border-2 border-[#7afbc4] text-[#7afbc4] font-bold rounded uppercase hover:bg-[#7afbc4] hover:text-[#00196F] transition-all">
              My Resume
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
              <div key={project.id} className="group flex flex-col bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-2xl">
                {/* Image Container */}
                <div className="relative aspect-video overflow-hidden">
                  <img 
                    src={project.imageUrl} 
                    alt={project.title} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
                  />
                  {/* Hover Button Overlay */}
                  <div className="absolute inset-0 bg-[#00196F]/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <a 
                      href={project.link} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="px-6 py-2 bg-[#7afbc4] text-[#00196F] font-bold rounded-full transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 flex items-center gap-2"
                    >
                      View Project <ExternalLink size={16} />
                    </a>
                  </div>
                </div>

                {/* Content Area */}
                <div className="p-6 flex flex-col text-left">
                  <h4 className="text-lg font-bold text-[#00196F] uppercase mb-1">
                    {project.title}
                  </h4>
                  <p className="text-gray-500 text-sm mb-4">
                    {project.description}
                  </p>
                  
                  {/* Tech Stack Badges */}
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
      <section id="about" className="py-24 bg-[#2a2d38] text-white overflow-hidden">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <h3 className="text-4xl md:text-5xl font-light uppercase text-[#7afbc4] mb-8">About Me</h3>
          <p className="text-xl md:text-2xl font-light text-gray-400 leading-relaxed mb-16">
            I’m a <span className="text-white font-medium">Digital Health Software Developer</span> based in Nairobi, Kenya, 
            building robust solutions for Web and Mobile platforms while advocating for open-source and modern software engineering practices.
          </p>

          <div className="mt-12 mb-8">
            <span className="inline-block px-8 py-3 bg-[#52947e] rounded text-white font-bold uppercase tracking-widest mb-12">
              Skills & Competencies
            </span>
          </div>

          {/* Timeline */}
          <div className="relative before:absolute before:inset-0 before:left-1/2 before:-ml-0.5 before:w-1 before:bg-[#52947e]/30 before:hidden md:before:block">
            {SKILLS.map((skill, index) => (
              <div key={skill.id} className={`relative flex flex-col md:flex-row items-center gap-8 mb-12 ${
                index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
              }`}>
                <div className={`hidden md:block w-1/2 px-10 text-right ${index % 2 === 0 ? 'text-right' : 'text-left'}`}>
                  <span className="text-gray-500 font-bold uppercase text-sm tracking-widest">{skill.category}</span>
                </div>

                <div className={`relative z-10 p-3 rounded-full ${skill.color} text-white shadow-xl`}>
                  {skill.icon}
                </div>

                <div className={`w-full md:w-1/2 px-4 md:px-10`}>
                  <div className="bg-white/5 p-6 rounded-lg border border-white/10 text-left hover:bg-white/10 transition-colors">
                    <h4 className="text-[#7afbc4] font-bold text-lg">{skill.title}</h4>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 bg-[#ebfffc]">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div>
            <h3 className="text-4xl font-light text-[#00196F] uppercase mb-8">Let's keep in touch</h3>
            <div className="space-y-6 text-lg text-left">
              <div className="flex items-center gap-4">
                <MapPin className="text-[#36B693]" />
                <p>Nairobi, Kenya</p>
              </div>
              <div className="flex items-center gap-4">
                <Phone className="text-[#36B693]" />
                <p>+254 721 496 346</p>
              </div>
              <div className="flex items-center gap-4">
                <Mail className="text-[#36B693]" />
                <p>nelsonkimaiga@aol.com</p>
              </div>
            </div>

            <div className="mt-12 text-left">
              <p className="font-bold text-[#00196F] uppercase mb-4">I am social</p>
              <div className="flex gap-4">
                <a href={SOCIAL_LINKS.linkedin} target="_blank" rel="noopener noreferrer" className="p-4 bg-gray-200 rounded-full hover:bg-[#7afbc4] transition-colors"><Linkedin /></a>
                <a href={SOCIAL_LINKS.github} target="_blank" rel="noopener noreferrer" className="p-4 bg-gray-200 rounded-full hover:bg-[#7afbc4] transition-colors"><Github /></a>
                <a href={SOCIAL_LINKS.twitter} target="_blank" rel="noopener noreferrer" className="p-4 bg-gray-200 rounded-full hover:bg-[#7afbc4] transition-colors"><Twitter /></a>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input 
                type="text" name="name" placeholder="Full Name" required
                className="w-full p-4 rounded bg-white border border-gray-200 outline-none focus:border-[#36B693] text-left"
                onChange={handleInputChange}
              />
              <input 
                type="text" name="phone" placeholder="Phone Number"
                className="w-full p-4 rounded bg-white border border-gray-200 outline-none focus:border-[#36B693] text-left"
                onChange={handleInputChange}
              />
            </div>
            <input 
              type="email" name="email" placeholder="Email Address" required
              className="w-full p-4 rounded bg-white border border-gray-200 outline-none focus:border-[#36B693] text-left"
              onChange={handleInputChange}
            />
            <textarea 
              name="message" rows={5} placeholder="Your Message" required
              className="w-full p-4 rounded bg-white border border-gray-200 outline-none focus:border-[#36B693] resize-none text-left"
              onChange={handleInputChange}
            />
            <button type="submit" className="w-full py-4 bg-[#00196F] text-white font-bold rounded uppercase hover:bg-[#36B693] transition-colors">
              Talk To Me
            </button>
          </form>
        </div>
      </section>

      {/* Map Section */}
      <div className="w-full h-96 grayscale hover:grayscale-0 transition-all duration-1000">
        <iframe 
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.7973913081755!2d36.78962807604665!3d-1.296188335639256!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182f10a7737a028b%3A0xa2072998d86424c6!2sIntelliSOFT%20Consulting%20Ltd!5e0!3m2!1sen!2ske!4v1721962205153!5m2!1sen!2ske"
          className="w-full h-full border-0"
          loading="lazy"
          title="Office Location"
        />
      </div>

      {/* Footer */}
      <footer className="relative bg-black py-12 text-center text-white border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 flex flex-col items-center gap-4">
          <p className="text-sm tracking-widest uppercase font-medium">
            All Rights Reserved | <a href="#" className="text-[#7afbc4] hover:text-white transition-colors">Nelson Kimaiga</a>
          </p>
          <p className="text-xs text-gray-500">
            &copy; {new Date().getFullYear()} Nelson Kimaiga. Built with React & Tailwind.
          </p>
        </div>
        
        {/* Fixed Scroll-to-top button */}
        <button 
          onClick={scrollToTop}
          className={`fixed bottom-8 right-8 p-3 bg-[#7afbc4] text-[#00196F] rounded-full shadow-2xl transition-all duration-300 hover:bg-white hover:scale-110 z-50 ${
            showScrollTop ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'
          }`}
          aria-label="Scroll to top"
        >
          <ArrowUp className="w-6 h-6" />
        </button>
      </footer>
    </div>
  );
};

export default App;
