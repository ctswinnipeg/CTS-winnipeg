import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from './useInView';
import { ChevronDown } from 'lucide-react';

const faqs = [
  {
    q: 'Who is this event for?',
    a: 'The Church Tech Summit is designed for worship and media volunteers who serve in churches across Winnipeg. Whether you handle audio, video, lighting, or production — this event is for you!',
  },
  {
    q: 'When and where is the summit?',
    a: 'The summit takes place on July 11, 2026, starting at noon. It will be held at 341 Willton Street, Winnipeg, Manitoba.',
  },
  {
    q: 'Is there a cost to attend?',
    a: 'Registration is done through Eventbrite. Visit our registration page for the latest information on pricing and availability.',
  },
  {
    q: 'What topics will be covered?',
    a: 'The summit covers four key areas: Audio (mixing, EQ, signal flow), Video (cameras, live switching, streaming), Lighting (stage design, DMX), and Production (service planning, team coordination).',
  },
  {
    q: 'How many speakers will there be?',
    a: 'We have 4 impactful speakers lined up: Joshua Alonge, Wole Adebari, Adekunle Oluwasanmi, and Sola — each bringing their unique expertise in worship technology.',
  },
  {
    q: 'Will there be resources available after the event?',
    a: 'Yes! One of the key goals of the summit is to build a lasting network of resources for all attendees, including video content and human resources that you can tap into long after the event.',
  },
  {
    q: 'Do I need to be experienced in tech to attend?',
    a: 'Not at all! The summit is designed for volunteers at all levels — whether you\'re just getting started or have years of experience. Our goal is to raise the excellence level for everyone.',
  },
  {
    q: 'Can I bring my team?',
    a: 'Absolutely! We encourage you to bring your entire tech volunteer team. The more people who attend, the greater the impact on your church\'s production quality.',
  },
];

function FaqItem({ q, a, isOpen, toggle }: { q: string; a: string; isOpen: boolean; toggle: () => void }) {
  return (
    <div className="border border-blue-100/80 rounded-2xl overflow-hidden bg-white hover:shadow-lg hover:shadow-blue-50 transition-shadow duration-300">
      <button
        onClick={toggle}
        className="w-full flex items-center justify-between p-6 sm:p-7 text-left gap-4"
      >
        <span className="text-lg font-semibold font-[family-name:var(--font-display)] text-navy-950">
          {q}
        </span>
        <ChevronDown
          size={20}
          className={`shrink-0 text-blue-500 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="px-6 sm:px-7 pb-6 sm:pb-7 text-navy-700/60 leading-relaxed">
              {a}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FAQ() {
  const { ref, isInView } = useInView();
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="relative py-28 sm:py-36 bg-gradient-to-b from-white via-ice-50 to-white overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-200/40 to-transparent" />
      <div className="absolute bottom-20 right-10 w-[400px] h-[400px] rounded-full bg-blue-100/40 blur-[100px]" />

      <div className="max-w-3xl mx-auto px-6" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold tracking-widest uppercase text-blue-600 border border-blue-200 bg-blue-50 mb-6">
            FAQ
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold font-[family-name:var(--font-display)] text-navy-950 mb-6">
            Frequently Asked{' '}
            <span className="bg-gradient-to-r from-blue-600 to-sky-500 bg-clip-text text-transparent">
              Questions
            </span>
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="space-y-4"
        >
          {faqs.map((faq, i) => (
            <FaqItem
              key={i}
              q={faq.q}
              a={faq.a}
              isOpen={openIndex === i}
              toggle={() => setOpenIndex(openIndex === i ? null : i)}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
