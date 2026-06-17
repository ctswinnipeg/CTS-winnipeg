export default function Footer({ onShowPosters }: { onShowPosters: () => void }) {
  return (
    <footer className="relative bg-navy-950 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-sky-400 flex items-center justify-center text-white font-bold font-[family-name:var(--font-display)] text-sm shadow-lg shadow-blue-500/20">
              CTS
            </div>
            <div>
              <div className="text-white font-semibold font-[family-name:var(--font-display)] text-sm">
                Church Tech Summit
              </div>
              <div className="text-blue-300/40 text-xs">Winnipeg 2026</div>
            </div>
          </div>

          {/* Links */}
          <div className="flex items-center gap-8 text-sm text-blue-200/40">
            <a href="#about" className="hover:text-white transition-colors">About</a>
            <a href="#speakers" className="hover:text-white transition-colors">Speakers</a>
            <a href="#faq" className="hover:text-white transition-colors">FAQ</a>
            <a href="#contact" className="hover:text-white transition-colors">Contact</a>
            <button onClick={onShowPosters} className="hover:text-white transition-colors">
              Posters
            </button>
          </div>

          {/* Copyright */}
          <div className="text-blue-200/30 text-xs">
            © 2026 Church Tech Summit Winnipeg
          </div>
        </div>
      </div>
    </footer>
  );
}
