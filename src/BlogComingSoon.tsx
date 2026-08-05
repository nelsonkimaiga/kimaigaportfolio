import React from 'react';
import { Newspaper, Linkedin, Github, ArrowUpRight } from 'lucide-react';

const SOCIAL_LINKS = {
  linkedin: 'https://linkedin.com/in/nelsonkimaiga',
  github: 'https://github.com/nelsonkimaiga',
  twitter: 'https://twitter.com/nelsonkimaiga',
};

const MAIN_SITE_URL = 'https://nelsonkimaiga.com';

const XIcon = ({ size = 20, className = '' }: { size?: number; className?: string }) => (
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

const BlogComingSoon: React.FC = () => {
  const year = new Date().getFullYear();

  return (
    <div className="relative min-h-screen bg-[#0a0e27] text-white overflow-hidden flex flex-col items-center justify-center px-6 font-sans">
      {/* Ambient Glow */}
      <div className="absolute inset-0 opacity-40 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-gradient-to-r from-blue-600 to-teal-400 rounded-full blur-[120px] animate-pulse" />
      </div>

      {/* Brand */}
      <a href={MAIN_SITE_URL} className="absolute top-8 left-8 z-10" aria-label="Nelson Kimaiga">
        <div className="w-12 h-12 rounded-full border-2 border-[#7afbc4] overflow-hidden bg-white">
          <img
            src="https://ui-avatars.com/api/?name=Nelson+Kimaiga&background=00196F&color=7afbc4"
            alt="Nelson Kimaiga"
            className="w-full h-full object-cover"
          />
        </div>
      </a>

      {/* Content */}
      <div className="relative z-10 text-center max-w-2xl mx-auto">
        <div className="flex justify-center mb-8">
          <div className="w-16 h-16 rounded-2xl border border-[#7afbc4]/30 bg-[#7afbc4]/10 flex items-center justify-center shadow-[0_0_40px_rgba(122,251,196,0.15)]">
            <Newspaper className="w-7 h-7 text-[#7afbc4]" />
          </div>
        </div>

        <h1 className="text-5xl md:text-7xl font-thin uppercase tracking-tight mb-6">
          Coming <span className="text-[#7afbc4]">Soon</span>
        </h1>

        <p className="text-lg md:text-xl text-gray-400 font-light leading-relaxed mb-12">
          Thoughts on software engineering, open source, and everything in between.
        </p>

        <div className="flex items-center justify-center gap-3 text-sm text-gray-500 uppercase tracking-widest mb-10">
          <span className="w-2 h-2 rounded-full bg-[#7afbc4] animate-pulse" />
          Stay tuned
        </div>

        <a
          href={MAIN_SITE_URL}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-white/15 bg-white/5 text-sm font-medium text-gray-200 hover:text-[#0a0e27] hover:bg-[#7afbc4] hover:border-[#7afbc4] transition-all"
        >
          Back to main site <ArrowUpRight size={16} />
        </a>
      </div>

      {/* Footer */}
      <footer className="absolute bottom-8 left-0 right-0 z-10 flex flex-col items-center gap-4">
        <div className="flex gap-5">
          <a href={SOCIAL_LINKS.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="p-2.5 rounded-full border border-white/15 bg-white/5 text-gray-300 hover:text-[#0a0e27] hover:bg-[#7afbc4] hover:border-[#7afbc4] transition-all">
            <Linkedin size={20} />
          </a>
          <a href={SOCIAL_LINKS.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="p-2.5 rounded-full border border-white/15 bg-white/5 text-gray-300 hover:text-[#0a0e27] hover:bg-[#7afbc4] hover:border-[#7afbc4] transition-all">
            <Github size={20} />
          </a>
          <a href={SOCIAL_LINKS.twitter} target="_blank" rel="noopener noreferrer" aria-label="X" className="p-2.5 rounded-full border border-white/15 bg-white/5 text-gray-300 hover:text-[#0a0e27] hover:bg-[#7afbc4] hover:border-[#7afbc4] transition-all">
            <XIcon size={16} />
          </a>
        </div>
        <p className="text-xs text-gray-500">&copy; {year} Nelson Kimaiga. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default BlogComingSoon;
