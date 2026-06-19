import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useInView } from './useInView';

function getTimeLeft() {
  const target = new Date('2026-08-08T12:00:00-05:00').getTime(); /* Update date to august 8th*/
  const now = Date.now();
  const diff = Math.max(0, target - now);

  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

export default function Countdown() {
  const [time, setTime] = useState(getTimeLeft());
  const { ref, isInView } = useInView();

  useEffect(() => {
    const interval = setInterval(() => setTime(getTimeLeft()), 1000);
    return () => clearInterval(interval);
  }, []);

  const units = [
    { label: 'Days', value: time.days },
    { label: 'Hours', value: time.hours },
    { label: 'Minutes', value: time.minutes },
    { label: 'Seconds', value: time.seconds },
  ];

  return (
    <section className="relative py-20 sm:py-28 bg-gradient-to-b from-navy-800 to-navy-800 overflow-hidden">
      {/* Background grid lines */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `linear-gradient(rgba(59,130,246,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(59,130,246,0.3) 1px, transparent 1px)`,
          backgroundSize: '80px 80px',
        }} />
      </div>

      <div className="max-w-4xl mx-auto px-6 text-center" ref={ref}>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-sky-400/70 font-medium text-sm uppercase tracking-widest mb-10"
        >
          Countdown to the Summit
        </motion.p>

        <div className="grid grid-cols-4 gap-4 sm:gap-8">
          {units.map((unit, i) => (
            <motion.div
              key={unit.label}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 * i }}
              className="perspective-container"
            >
              <div className="card-3d glass rounded-2xl sm:rounded-3xl p-4 sm:p-8 animate-pulse-glow">
                <div className="text-3xl sm:text-5xl lg:text-6xl font-bold font-[family-name:var(--font-display)] bg-gradient-to-b from-white to-blue-200 bg-clip-text text-transparent">
                  {String(unit.value).padStart(2, '0')}
                </div>
                <div className="text-blue-300/40 text-xs sm:text-sm mt-2 uppercase tracking-wider">
                  {unit.label}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
