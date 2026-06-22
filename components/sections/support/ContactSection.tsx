'use client';

import { Phone, MessageCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { CONTACT_INFO } from '@/lib/constants';

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export default function ContactSection() {
  return (
    <section className="bg-black py-24">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          className="text-center mb-12"
        >
          <h2 className="text-4xl sm:text-5xl font-display text-white mb-4">
            Contact <span className="italic text-white/60">Person</span>
          </h2>
          <p className="text-lg text-white/60 font-body max-w-2xl mx-auto">
            Reach out to our admin team for any inquiries regarding donations and sponsorship
          </p>
        </motion.div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2">
          {CONTACT_INFO.admins.map((admin, index) => (
            <motion.div
              key={admin.name}
              initial="hidden"
              animate="visible"
              variants={fadeInUp}
              transition={{ delay: index * 0.1 }}
              className="rounded-3xl border border-white/10 bg-white/5 p-8 text-center transition-all duration-300 hover:-translate-y-1 hover:bg-white/10"
            >
              {/* Avatar placeholder */}
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-white/10">
                <Phone className="h-7 w-7 text-white" />
              </div>

              <h3 className="font-display text-xl font-bold text-white">
                {admin.name}
              </h3>
              <p className="mt-2 text-sm text-white/60 font-body">{admin.role}</p>
              <p className="mt-3 font-medium text-white font-body">{admin.phone}</p>

              <div className="mt-6">
                <a
                  href={`https://wa.me/${admin.phoneClean}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex w-full items-center justify-center gap-2 rounded-lg bg-white px-6 py-3 font-semibold text-black transition-colors hover:bg-gray-100"
                >
                  <MessageCircle className="h-4 w-4" />
                  Chat on WhatsApp
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
