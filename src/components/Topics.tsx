import { motion } from 'framer-motion';
import { useInView } from './useInView';
import { Volume2, Video, Lightbulb, Settings } from 'lucide-react';

const topics = [
  {
    icon: Volume2,
    title: 'Audio',
    description: 'Mixing techniques, EQ, signal flow, monitoring, and creating immersive sound experiences for worship services.',
    gradient: 'from-blue-600 to-blue-500',
    bgGlow: 'bg-blue-500/10',
  },
  {
    icon: Video,
    title: 'Video',
    description: 'Camera operation, live switching, streaming workflows, graphics, and producing engaging visual content.',
    gradient: 'from-sky-500 to-blue-500',
    bgGlow: 'bg-sky-500/10',
  },
  {
    icon: Lightbulb,
    title: 'Lighting',
    description: 'Stage design, DMX programming, mood creation, color theory, and using light to enhance the worship experience.',
    gradient: 'from-blue-400 to-sky-400',
    bgGlow: 'bg-blue-400/10',
  },
  {
    icon: Settings,
    title: 'Production',
    description: 'Service planning, team coordination, technical direction, problem-solving, and running a seamless production.',
    gradient: 'from-sky-400 to-blue-300',
    bgGlow: 'bg-sky-400/10',
  },
];

export default function Topics() {
  const { ref, isInView } = useInView();

  return (
    <section id="topics" className="relative py-28 sm:py-36 bg-white overflow-hidden">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, #0a0e27 1px, transparent 0)`,
          backgroundSize: '40px 40px',
        }} />
      </div>
      
      {/* Light color accents */}
      <div className="absolute top-20 right-0 w-[500px] h-[500px] rounded-full bg-blue-100/50 blur-[120px]" />
      <div className="absolute bottom-20 left-0 w-[400px] h-[400px] rounded-full bg-sky-100/50 blur-[100px]" />

      <div className="max-w-7xl mx-auto px-6" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-20"
        >
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold tracking-widest uppercase text-blue-600 border border-blue-200 bg-blue-50 mb-6">
            What You'll Learn
          </span>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-[family-name:var(--font-display)] text-navy-950 mb-6">
            Summit{' '}
            <span className="bg-gradient-to-r from-blue-600 to-sky-500 bg-clip-text text-transparent">
              Topics
            </span>
          </h2>
          <p className="max-w-2xl mx-auto text-lg text-navy-700/60 leading-relaxed">
            Dive deep into the core areas of church production technology with practical, hands-on sessions.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 gap-8">
          {topics.map((topic, i) => (
            <motion.div
              key={topic.title}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.12 * i }}
              className="perspective-container"
            >
              <div className="card-3d group relative p-8 sm:p-10 rounded-3xl border border-blue-100/80 bg-white hover:shadow-2xl hover:shadow-blue-100/50 transition-all duration-500 h-full">
                {/* Glow on hover */}
                <div className={`absolute inset-0 rounded-3xl ${topic.bgGlow} opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl -z-10`} />
                
                <div className="flex items-start gap-6">
                  <div className={`shrink-0 w-16 h-16 rounded-2xl bg-gradient-to-br ${topic.gradient} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    <topic.icon size={28} className="text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold font-[family-name:var(--font-display)] text-navy-950 mb-3">
                      {topic.title}
                    </h3>
                    <p className="text-navy-700/50 leading-relaxed">
                      {topic.description}
                    </p>
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
