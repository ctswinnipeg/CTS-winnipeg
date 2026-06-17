import { motion } from 'framer-motion';
import { useInView } from './useInView';
import { Mail, Phone, MapPin, ExternalLink } from 'lucide-react';

export default function Contact() {
  const { ref, isInView } = useInView();

  return (
    <section id="contact" className="relative py-28 sm:py-36 bg-gradient-to-b from-white to-navy-950 overflow-hidden">
      {/* Transition gradient mesh */}
      <div className="absolute inset-0">
        <div className="absolute bottom-0 left-0 right-0 h-[60%] bg-gradient-to-b from-transparent to-navy-950" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold tracking-widest uppercase text-blue-600 border border-blue-200 bg-blue-50 mb-6">
            Get in Touch
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold font-[family-name:var(--font-display)] text-navy-950 mb-6">
            Contact{' '}
            <span className="bg-gradient-to-r from-blue-600 to-sky-500 bg-clip-text text-transparent">
              Us
            </span>
          </h2>
          <p className="max-w-2xl mx-auto text-lg text-navy-700/60 leading-relaxed">
            Have questions? We'd love to hear from you. Reach out and we'll get back to you as soon as possible.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {/* Phone */}
          <motion.a
            href="tel:+14313361978"
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="perspective-container"
          >
            <div className="card-3d group p-8 rounded-3xl border border-blue-100/80 bg-white hover:shadow-2xl hover:shadow-blue-100/50 transition-all duration-500 text-center h-full">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center mx-auto mb-5 group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-blue-200">
                <Phone size={26} className="text-white" />
              </div>
              <h3 className="text-lg font-bold font-[family-name:var(--font-display)] text-navy-950 mb-2">Phone</h3>
              <p className="text-blue-500 font-medium">(431) 336-1978</p>
            </div>
          </motion.a>

          {/* Email */}
          <motion.a
            href="mailto:ctswinnipeg@gmail.com"
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="perspective-container"
          >
            <div className="card-3d group p-8 rounded-3xl border border-blue-100/80 bg-white hover:shadow-2xl hover:shadow-blue-100/50 transition-all duration-500 text-center h-full">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-sky-400 to-blue-500 flex items-center justify-center mx-auto mb-5 group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-sky-200">
                <Mail size={26} className="text-white" />
              </div>
              <h3 className="text-lg font-bold font-[family-name:var(--font-display)] text-navy-950 mb-2">Email</h3>
              <p className="text-blue-500 font-medium text-sm sm:text-base break-all">ctswinnipeg@gmail.com</p>
            </div>
          </motion.a>

          {/* Location */}
          <motion.a
            href="https://maps.google.com/?q=341+Willton+Street+Winnipeg"
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="perspective-container"
          >
            <div className="card-3d group p-8 rounded-3xl border border-blue-100/80 bg-white hover:shadow-2xl hover:shadow-blue-100/50 transition-all duration-500 text-center h-full">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-400 to-sky-400 flex items-center justify-center mx-auto mb-5 group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-blue-200">
                <MapPin size={26} className="text-white" />
              </div>
              <h3 className="text-lg font-bold font-[family-name:var(--font-display)] text-navy-950 mb-2">Location</h3>
              <p className="text-blue-500 font-medium flex items-center justify-center gap-1">
                341 Willton St, Winnipeg
                <ExternalLink size={14} />
              </p>
            </div>
          </motion.a>
        </div>

        {/* CTA banner */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="mt-20 relative"
        >
          <div className="relative rounded-3xl overflow-hidden">
            {/* Gradient background */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-blue-500 to-sky-400" />
            {/* Decorative shapes */}
            <div className="absolute inset-0 overflow-hidden">
              <div className="absolute -top-20 -right-20 w-60 h-60 border-2 border-white/10 rounded-full" />
              <div className="absolute -bottom-10 -left-10 w-40 h-40 border-2 border-white/10 rounded-full" />
              <div className="absolute top-1/2 left-1/3 w-32 h-32 border border-white/5 rounded-full" />
            </div>

            <div className="relative px-8 py-14 sm:px-16 sm:py-20 text-center">
              <h3 className="text-3xl sm:text-4xl font-bold font-[family-name:var(--font-display)] text-white mb-4">
                Ready to Level Up?
              </h3>
              <p className="text-blue-100/80 text-lg max-w-xl mx-auto mb-8">
                Don't miss this opportunity to grow your skills, connect with other tech volunteers, and take your church production to the next level.
              </p>
              <a
                href="https://www.eventbrite.com/e/church-tech-summit-winnipeg-tickets-1991739238679?aff=oddtdtcreator"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-10 py-4 bg-white text-blue-600 font-bold rounded-full text-lg hover:shadow-2xl hover:shadow-white/20 transition-all hover:-translate-y-1 active:translate-y-0"
              >
                Register on Eventbrite
                <ExternalLink size={18} />
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
