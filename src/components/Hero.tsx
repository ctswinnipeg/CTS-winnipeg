import { motion } from 'framer-motion';
import { CalendarDays, MapPin, Clock, ChevronDown } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-navy-950">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        {/* Gradient orbs */}
        <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] rounded-full bg-blue-500/10 blur-[120px] animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] rounded-full bg-sky-400/10 blur-[100px] animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-navy-700/30 blur-[150px]" />
        
        {/* 3D Grid floor */}
        <div className="absolute bottom-0 left-0 right-0 h-[400px] grid-floor opacity-40" />
        
        {/* Floating 3D shapes */}
        <motion.div
          animate={{ y: [-20, 20, -20], rotateZ: [0, 10, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-[20%] right-[15%] w-20 h-20 border border-blue-400/20 rounded-2xl rotate-45"
          style={{ transformStyle: 'preserve-3d' }}
        />
        <motion.div
          animate={{ y: [10, -15, 10], rotateZ: [0, -15, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-[30%] left-[10%] w-16 h-16 border border-sky-300/20 rounded-full"
        />
        <motion.div
          animate={{ y: [-10, 20, -10], rotateX: [0, 180, 360] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute bottom-[35%] left-[20%] w-3 h-3 bg-blue-400/40 rounded-full"
        />
        <motion.div
          animate={{ y: [15, -10, 15] }}
          transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-[40%] right-[25%] w-12 h-12 border border-sky-400/15 rotate-12"
        />

        {/* Star-like dots */}
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-blue-300/30 rounded-full animate-pulse"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 3}s`,
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-8">
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            <span className="text-sm text-blue-200/80 font-medium">July 11, 2026 · Winnipeg, MB</span>
          </div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-5xl sm:text-7xl lg:text-8xl font-extrabold font-[family-name:var(--font-display)] leading-[0.95] tracking-tight mb-6"
        >
          <span className="text-white">Church Tech</span>
          <br />
          <span className="bg-gradient-to-r from-blue-400 via-sky-400 to-blue-300 bg-clip-text text-transparent">
            Summit
          </span>
          <br />
          <span className="text-white/90 text-4xl sm:text-5xl lg:text-6xl">Winnipeg</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="max-w-2xl mx-auto text-lg sm:text-xl text-blue-100/60 mb-10 leading-relaxed"
        >
          Elevating worship tech excellence across Winnipeg churches.
          <br className="hidden sm:block" />
          Audio · Video · Lighting · Production
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-14"
        >
          <a
            href="https://www.eventbrite.com/e/church-tech-summit-winnipeg-tickets-1991739238679?aff=oddtdtcreator" /* Eventbrite link */
            target="_blank"
            rel="noopener noreferrer"
            className="group px-8 py-4 bg-gradient-to-r from-blue-500 to-sky-400 text-white font-bold rounded-full text-lg shadow-2xl shadow-blue-500/25 hover:shadow-blue-500/40 transition-all hover:-translate-y-1 active:translate-y-0 flex items-center gap-2"
          >
            Register Now
            <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </a>
          <a
            href="#about"
            className="px-8 py-4 text-blue-200/80 font-semibold rounded-full border border-blue-400/20 hover:border-blue-400/40 hover:text-white transition-all hover:-translate-y-0.5"
          >
            Learn More
          </a>
        </motion.div>

        {/* Event meta */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex flex-wrap justify-center gap-6 sm:gap-10"
        >
          {[
            { icon: CalendarDays, label: 'August 08, 2026' }, /* update date to august 8th */
            { icon: Clock, label: 'Starting at Noon' },
            { icon: MapPin, label: '341 Willton St, Winnipeg' },
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-2 text-blue-200/50">
              <item.icon size={18} className="text-blue-400/60" />
              <span className="text-sm">{item.label}</span>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <a href="#about" className="text-blue-300/40 hover:text-blue-300/70 transition-colors">
          <ChevronDown size={28} />
        </a>
      </motion.div>
    </section>
  );
}
