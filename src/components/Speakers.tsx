import { motion } from 'framer-motion';
import { useInView } from './useInView';
import bestonpic from './images/beston.jpg'; /*  LINKED THE PICTURE HERE FOR BESTON. I added the name in the function. DO the same for other pictures */


const speakers = [
  {
    name: 'Joshua Alonge',
    role: 'Video & Production',
    color: 'from-blue-500 to-blue-700',
    initials: 'JA',
    emoji: '🎤',
  },
  {
    name: 'Wole Adebari',
    role: 'FOH Engineer & Broadcast',
    color: 'from-sky-400 to-blue-600',
    initials: 'WA',
    emoji: '🎬',
  },
  {
    name: 'Kunle Oluwasanmi',
    role: 'FOH Engineer & Lighting',
    color: 'from-blue-400 to-sky-500',
    initials: 'AO',
    emoji: '💡',
  },
  {
    name: 'Shola Oluyemi',
    role: 'Production & Operations',
    color: 'from-sky-300 to-blue-500',
    initials: 'SO',
    emoji: '🎛️',
  },
  {
    name: 'Beston Uche',
    role: 'Host & FOH Engineer',
    color: 'from-sky-300 to-blue-500',
    initials: 'BU',
    emoji: '🏠', /* Would like a house for an emoji here! DONE*/
    image: bestonpic,
  },
];

export default function Speakers() {
  const { ref, isInView } = useInView();

  return (
    <section id="speakers" className="relative py-28 sm:py-36 bg-gradient-to-b from-navy-800 via-navy-900 bg-navy-900 overflow-hidden"> {/* REMOVED TEH BLEND IN GRADIANT! DONE*/}
      {/* Decorative */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-400/20 to-transparent" />
      <div className="absolute top-40 left-10 w-[300px] h-[300px] rounded-full bg-sky-400/5 blur-[100px]" />

      <div className="max-w-7xl mx-auto px-6" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-20"
        >
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold tracking-widest uppercase text-sky-400 border border-sky-400/20 bg-sky-400/5 mb-6">
            Meet the Speakers
          </span>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-[family-name:var(--font-display)] text-white mb-6">
            5 Impactful{' '}
            <span className="bg-gradient-to-r from-blue-400 to-sky-400 bg-clip-text text-transparent">
              Speakers
            </span>{' '}
            😀
          </h2>
          <p className="max-w-2xl mx-auto text-lg text-blue-100/50 leading-relaxed">
            Learn from experienced practitioners who are passionate about worship technology and ready to share their expertise.
          </p>
        </motion.div>

        {/* Speaker Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {speakers.map((speaker, i) => (
            <motion.div
              key={speaker.name}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.15 * i }}
              className="perspective-container"
            >
              <div className="card-3d group relative">
                {/* Card */}
                
                <div className="relative rounded-3xl overflow-hidden glass hover:bg-white/[0.08] transition-all duration-500">
                  {/* Avatar area */}
                  <div className={`relative h-56 bg-gradient-to-br ${speaker.color} flex items-center justify-center overflow-hidden`}>
                    
                    {/* Abstract pattern overlay */}
                    <div className="absolute inset-0 opacity-10 z-0 pointer-events-none">
                      <div className="absolute top-4 right-4 w-32 h-32 border-2 border-white/30 rounded-full" />
                      <div className="absolute bottom-4 left-4 w-20 h-20 border-2 border-white/20 rounded-lg rotate-45" />
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 border border-white/10 rounded-full" />
                    </div>

                    {/* Initials UPDATED THIS SECTION TO REFLECT PICTURE OR INITIALS. DONE */}
                   
                   
                    {speaker.image ? (
                      <img
                        src={speaker.image}
                        alt={speaker.name}
                        className="relative z-10 w-full h-full object-cover"
                      />
                    ) : (
                      <span className="text-6xl font-bold text-white/90 font-[family-name:var(--font-display)] relative z-10 group-hover:scale-110 transition-transform duration-500">
                        {speaker.initials}
                      </span>
                    )}
                    
                    
                    {/* Emoji badge */}
                    <div className="absolute top-4 right-4 w-10 h-10 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center text-lg">
                      {speaker.emoji}
                    </div>
                  </div>

                  {/* Info */}
                  <div className="p-6">
                    <h3 className="text-xl font-bold font-[family-name:var(--font-display)] text-white mb-1">
                      {speaker.name}
                    </h3>
                    <p className="text-blue-300/60 text-sm">{speaker.role}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
