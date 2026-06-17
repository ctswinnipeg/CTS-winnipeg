import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Speakers', href: '#speakers' },
  { label: 'Topics', href: '#topics' },
  { label: 'FAQ', href: '#faq' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-navy-950/90 backdrop-blur-xl shadow-lg shadow-blue-500/5 border-b border-white/5'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <a href="#" className="flex items-center gap-2 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-sky-400 flex items-center justify-center text-white font-bold font-[family-name:var(--font-display)] text-sm shadow-lg shadow-blue-500/30 group-hover:shadow-blue-500/50 transition-shadow">
            CTS
          </div>
          <span className="text-white font-semibold font-[family-name:var(--font-display)] hidden sm:block">
            Church Tech Summit
          </span>
        </a>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-sm text-blue-100/70 hover:text-white transition-colors relative group"
            >
              {link.label}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-400 to-sky-400 group-hover:w-full transition-all duration-300" />
            </a>
          ))}
          <a
            href="https://www.eventbrite.com/e/church-tech-summit-winnipeg-tickets-1991739238679?aff=oddtdtcreator"
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2.5 bg-gradient-to-r from-blue-500 to-sky-400 text-white text-sm font-semibold rounded-full hover:shadow-lg hover:shadow-blue-500/30 transition-all hover:-translate-y-0.5 active:translate-y-0"
          >
            Register Now
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden text-white p-2"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-navy-950/95 backdrop-blur-xl border-t border-white/5 px-6 py-6 space-y-4">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setOpen(false)}
              className="block text-blue-100/80 hover:text-white transition-colors py-2"
            >
              {link.label}
            </a>
          ))}
          <a
            href="https://www.eventbrite.com/e/church-tech-summit-winnipeg-tickets-1991739238679?aff=oddtdtcreator"
            target="_blank"
            rel="noopener noreferrer"
            className="block text-center px-5 py-3 bg-gradient-to-r from-blue-500 to-sky-400 text-white font-semibold rounded-full"
          >
            Register Now
          </a>
        </div>
      )}
    </nav>
  );
}
