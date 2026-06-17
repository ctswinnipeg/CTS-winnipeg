import { motion } from 'framer-motion';
import { useInView } from './useInView';
import { Target, Users, Network, Sparkles } from 'lucide-react';

const goals = [
  {
    icon: Target,
    title: 'Raise Excellence',
    description: 'Elevate the technical skill level of worship and media volunteer teams across Winnipeg churches.',
  },
  {
    icon: Sparkles,
    title: 'Show Possibilities',
    description: 'Explore what\'s achievable with modern audio, video, lighting, and production techniques.',
  },
  {
    icon: Network,
    title: 'Build Networks',
    description: 'Create a lasting network of resources — both video content and human connections — for all attendees.',
  },
  {
    icon: Users,
    title: 'Unite Teams',
    description: 'Bring together tech volunteers from diverse churches to learn, share, and grow as a community.',
  },
];

export default function About() {
  const { ref, isInView } = useInView();

  return (
    <section id="about" className="relative py-28 sm:py-36 bg-gradient-to-b from-navy-950 via-navy-900 to-navy-800 overflow-hidden">
      {/* Decorative */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/20 to-transparent" />
      <div className="absolute top-20 right-0 w-[400px] h-[400px] rounded-full bg-blue-500/5 blur-[100px]" />
      <div className="absolute bottom-20 left-0 w-[300px] h-[300px] rounded-full bg-sky-400/5 blur-[80px]" />

      <div className="max-w-7xl mx-auto px-6" ref={ref}>
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-20"
        >
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold tracking-widest uppercase text-sky-400 border border-sky-400/20 bg-sky-400/5 mb-6">
            About the Event
          </span>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-[family-name:var(--font-display)] text-white mb-6">
            Why{' '}
            <span className="bg-gradient-to-r from-blue-400 to-sky-400 bg-clip-text text-transparent">
              Church Tech Summit?
            </span>
          </h2>
          <p className="max-w-3xl mx-auto text-lg text-blue-100/50 leading-relaxed">
            This event is designed for the worship and media volunteers that serve in our various churches in Winnipeg. 
            Covering topics in audio, video, lighting, and production — we're here to equip, inspire, and connect.
          </p>
        </motion.div>

        {/* Goals grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {goals.map((goal, i) => (
            <motion.div
              key={goal.title}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 * i }}
              className="perspective-container"
            >
              <div className="card-3d group relative p-8 rounded-3xl glass hover:bg-white/[0.08] transition-all duration-500 h-full">
                {/* Gradient border effect on hover */}
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-blue-500/20 to-sky-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10 blur-xl" />
                
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500/20 to-sky-400/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <goal.icon size={26} className="text-sky-400" />
                </div>
                <h3 className="text-xl font-bold font-[family-name:var(--font-display)] text-white mb-3">
                  {goal.title}
                </h3>
                <p className="text-blue-100/40 text-sm leading-relaxed">
                  {goal.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Image showcase */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-4 perspective-container"
        >
          <div className="card-3d rounded-2xl overflow-hidden h-64 md:h-80">
            <img
              src="https://images.pexels.com/photos/19452351/pexels-photo-19452351.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200"
              alt="Audio mixing console"
              className="w-full h-full object-cover hover:scale-110 transition-transform duration-700"
            />
          </div>
          <div className="card-3d rounded-2xl overflow-hidden h-64 md:h-80">
            <img
              src="https://images.pexels.com/photos/30831640/pexels-photo-30831640.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200"
              alt="Stage lighting"
              className="w-full h-full object-cover hover:scale-110 transition-transform duration-700"
            />
          </div>
          <div className="card-3d rounded-2xl overflow-hidden h-64 md:h-80">
            <img
              src="https://images.pexels.com/photos/9275222/pexels-photo-9275222.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200"
              alt="Conference presentation"
              className="w-full h-full object-cover hover:scale-110 transition-transform duration-700"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
