'use client';

import { useState } from 'react';
import { CreditCard, Copy, Check, ExternalLink } from 'lucide-react';
import { motion } from 'framer-motion';
import { CONTACT_INFO } from '@/lib/constants';

export default function DonationSection() {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(CONTACT_INFO.donation.accountNumber);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = CONTACT_INFO.donation.accountNumber;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <section id="donation" className="bg-gray-900 py-24">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl sm:text-5xl font-display text-white mb-4">
            Donation <span className="italic text-white/60">Account</span>
          </h2>
          <p className="text-lg text-white/60 font-body max-w-2xl mx-auto">
            Your contribution brings us closer to a golden future
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="mt-10 overflow-hidden rounded-3xl border border-white/10 bg-black"
        >
          {/* Bank Info */}
          <div className="p-8 sm:p-10">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/10">
                <CreditCard className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="font-display text-xl font-bold text-white">
                  Bank Transfer
                </h3>
                <p className="text-sm text-white/60 font-body">
                  {CONTACT_INFO.donation.bank}
                </p>
              </div>
            </div>

            <div className="mt-6 space-y-4 rounded-lg bg-white/5 p-6">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-white/60 font-body">
                  Account Number
                </span>
                <span className="font-display text-2xl font-bold tracking-wider text-white">
                  {CONTACT_INFO.donation.accountNumber}
                </span>
              </div>

              <div className="h-px bg-white/10" />

              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-white/60 font-body">
                  Account Name
                </span>
                <span className="font-semibold text-white font-body">
                  {CONTACT_INFO.donation.accountName}
                </span>
              </div>
            </div>

            <button
              onClick={handleCopy}
              className="mt-6 flex w-full items-center justify-center gap-2 rounded-lg bg-white px-6 py-3 font-semibold text-black transition-colors hover:bg-gray-100"
            >
              {copied ? (
                <>
                  <Check className="h-5 w-5" />
                  Copied!
                </>
              ) : (
                <>
                  <Copy className="h-5 w-5" />
                  Copy Account Number
                </>
              )}
            </button>
          </div>

          {/* Divider */}
          <div className="h-px bg-white/10" />

          {/* WhatsApp Proof */}
          <div className="p-8 sm:p-10">
            <p className="mb-4 text-center text-white/60 font-body">
              After transferring, send proof to:
            </p>

            <div className="mb-6 text-center">
              <span className="text-sm text-white/60 font-body">WhatsApp</span>
              <p className="font-display text-xl font-bold text-white">
                {CONTACT_INFO.donation.whatsapp}
              </p>
            </div>

            <a
              href={`https://wa.me/${CONTACT_INFO.donation.whatsappClean}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-white px-6 py-3 font-semibold text-black transition-colors hover:bg-gray-100"
            >
              <ExternalLink className="h-5 w-5" />
              Send via WhatsApp
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
