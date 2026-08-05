import React, { useEffect } from 'react';
import { Newspaper, Linkedin, Github, ArrowUpRight } from 'lucide-react';
import { applySEO } from './seo';

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

  useEffect(() => {
    applySEO({
      title: "The Rhapsody | A developer's shenanigans",
      description: "The Rhapsody — Nelson Kimaiga's developer blog, coming soon.",
      robots: 'noindex, follow',
    });
  }, []);

  return (
    <div className="relative min-h-screen bg-black text-white overflow-hidden flex flex-col items-center justify-center px-6 font-sans">
      {/* Old Blog Cover */}
      <div className="absolute inset-0 pointer-events-none">
        <img
          src="https://rhapsody.azurewebsites.net/content/images/2016/05/programmer.jpg"
          alt=""
          aria-hidden="true"
          className="w-full h-full object-contain scale-105 opacity-40"
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/10 to-black/90" />
      </div>

      {/* Brand */}
      <a href={MAIN_SITE_URL} className="absolute top-8 left-8 z-10" aria-label="Nelson Kimaiga">
        <div className="w-12 h-12 rounded-full border-2 border-[var(--color-madafu-gold-light)] overflow-hidden bg-white">
          <img
            src="https://ui-avatars.com/api/?name=Nelson+Kimaiga&background=D4AF37&color=000000"
            alt="Nelson Kimaiga"
            className="w-full h-full object-cover"
          />
        </div>
      </a>

      {/* Content */}
      <div className="relative z-10 text-center max-w-2xl mx-auto">
        <div className="flex justify-center mb-8">
          <div className="w-16 h-16 rounded-2xl border border-[var(--color-madafu-gold)]/30 bg-[var(--color-madafu-gold)]/10 flex items-center justify-center shadow-[0_0_40px_rgba(212,175,55,0.15)]">
            <Newspaper className="w-7 h-7 text-[var(--color-madafu-gold)]" />
          </div>
        </div>

        <p className="text-xs font-bold uppercase tracking-[0.4em] text-[var(--color-madafu-gold-light)] mb-4">Coming Soon</p>

        <h1 className="text-5xl md:text-7xl font-thin uppercase tracking-tight mb-6">
          The <span className="text-[var(--color-madafu-gold)]">Rhapsody</span>
        </h1>

        <p className="text-lg md:text-xl text-white/90 font-light leading-relaxed mb-12">
          A developer's shenanigans.
        </p>

        <div className="flex items-center justify-center gap-3 text-sm font-medium text-white uppercase tracking-widest mb-10">
          <span className="w-2 h-2 rounded-full bg-[var(--color-madafu-gold)] animate-pulse" />
          Stay tuned
        </div>

        <a
          href={MAIN_SITE_URL}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-white/15 bg-white/5 text-sm font-medium text-gray-200 hover:text-black hover:bg-[var(--color-madafu-gold)] hover:border-[var(--color-madafu-gold)] transition-all"
        >
          Back to main site <ArrowUpRight size={16} />
        </a>
      </div>

      {/* Footer */}
      <footer className="absolute bottom-8 left-0 right-0 z-10 flex flex-col items-center gap-4">
        <div className="flex gap-5">
          <a href={SOCIAL_LINKS.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="p-2.5 rounded-full border border-white/15 bg-white/5 text-gray-300 hover:text-black hover:bg-[var(--color-madafu-gold)] hover:border-[var(--color-madafu-gold)] transition-all">
            <Linkedin size={20} />
          </a>
          <a href={SOCIAL_LINKS.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="p-2.5 rounded-full border border-white/15 bg-white/5 text-gray-300 hover:text-black hover:bg-[var(--color-madafu-gold)] hover:border-[var(--color-madafu-gold)] transition-all">
            <Github size={20} />
          </a>
          <a href={SOCIAL_LINKS.twitter} target="_blank" rel="noopener noreferrer" aria-label="X" className="p-2.5 rounded-full border border-white/15 bg-white/5 text-gray-300 hover:text-black hover:bg-[var(--color-madafu-gold)] hover:border-[var(--color-madafu-gold)] transition-all">
            <XIcon size={16} />
          </a>
        </div>
        <p className="text-xs text-gray-500">&copy; {year} Nelson Kimaiga. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default BlogComingSoon;
