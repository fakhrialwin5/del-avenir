'use client';

import { useState, type FormEvent } from 'react';
import { motion } from 'framer-motion';
import { SectionHeading } from '@/components/ui/SectionHeading';
import ScrollReveal from '@/components/animations/ScrollReveal';
import { useRegistration } from '@/lib/hooks/useRegistration';
import { cn } from '@/lib/utils';

/* ── Types ── */

interface FormData {
  name: string;
  email: string;
  phone: string;
  role: string;
  guests: string;
}

const initialForm: FormData = {
  name: '',
  email: '',
  phone: '',
  role: 'Guest',
  guests: '1',
};

const ROLES = ['Guest', 'Participant', 'Volunteer'];

/* ── Component ── */

export default function RegistrationForm() {
  const [form, setForm] = useState<FormData>(initialForm);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const { submit, loading } = useRegistration();

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setErrorMsg(null);

    const result = await submit({
      name: form.name,
      email: form.email,
      phone: form.phone,
      role: form.role,
      guests: parseInt(form.guests, 10),
    });

    if (result.success) {
      setSubmitted(true);
      setForm(initialForm);
    } else {
      setErrorMsg(result.error || 'Something went wrong. Please try again.');
    }
  }

  return (
    <section className="bg-cream px-4 py-section" id="register">
      <div className="mx-auto max-w-3xl">
        <ScrollReveal variant="fadeUp">
          <SectionHeading
            title="Register Now"
            subtitle="Daftarkan diri Anda untuk menghadiri Muhadhoroh Kubro 2026"
          />
        </ScrollReveal>

        <ScrollReveal variant="fadeUp" delay={0.2} className="mt-12">
          {submitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="rounded-2xl border border-green/20 bg-white p-10 text-center shadow-lg"
            >
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green/10">
                <svg
                  className="h-8 w-8 text-green"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="font-display text-2xl font-bold text-green-dark">
                Registration Successful!
              </h3>
              <p className="mt-2 text-gray-600">
                Terima kasih! Kami akan menghubungi Anda melalui email untuk informasi lebih lanjut.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="mt-6 text-sm font-medium text-gold-dark underline underline-offset-2 hover:text-gold"
              >
                Register another person
              </button>
            </motion.div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="rounded-2xl border border-gray-100 bg-white p-8 shadow-lg md:p-10"
            >
              {errorMsg && (
                <div className="mb-6 rounded-lg bg-red-50 border border-red-200 p-4 text-sm text-red-600">
                  {errorMsg}
                </div>
              )}

              <div className="space-y-6">
                {/* Name */}
                <div>
                  <label htmlFor="name" className="mb-1.5 block text-sm font-medium text-gray-700">
                    Full Name <span className="text-red-400">*</span>
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                    className={cn(
                      'w-full rounded-lg border border-gray-200 px-4 py-3 text-sm',
                      'placeholder:text-gray-400 focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/20',
                      'transition-colors duration-200',
                    )}
                  />
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-gray-700">
                    Email Address <span className="text-red-400">*</span>
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={form.email}
                    onChange={handleChange}
                    placeholder="your@email.com"
                    className={cn(
                      'w-full rounded-lg border border-gray-200 px-4 py-3 text-sm',
                      'placeholder:text-gray-400 focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/20',
                      'transition-colors duration-200',
                    )}
                  />
                </div>

                {/* Phone */}
                <div>
                  <label htmlFor="phone" className="mb-1.5 block text-sm font-medium text-gray-700">
                    Phone Number <span className="text-red-400">*</span>
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    required
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="e.g. 0812-XXXX-XXXX"
                    className={cn(
                      'w-full rounded-lg border border-gray-200 px-4 py-3 text-sm',
                      'placeholder:text-gray-400 focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/20',
                      'transition-colors duration-200',
                    )}
                  />
                </div>

                {/* Role */}
                <div>
                  <label htmlFor="role" className="mb-1.5 block text-sm font-medium text-gray-700">
                    Role
                  </label>
                  <select
                    id="role"
                    name="role"
                    value={form.role}
                    onChange={handleChange}
                    className={cn(
                      'w-full rounded-lg border border-gray-200 px-4 py-3 text-sm',
                      'focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/20',
                      'transition-colors duration-200',
                    )}
                  >
                    {ROLES.map((r) => (
                      <option key={r} value={r}>
                        {r}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Number of Guests */}
                <div>
                  <label htmlFor="guests" className="mb-1.5 block text-sm font-medium text-gray-700">
                    Number of Guests
                  </label>
                  <input
                    id="guests"
                    name="guests"
                    type="number"
                    min="1"
                    max="10"
                    value={form.guests}
                    onChange={handleChange}
                    className={cn(
                      'w-full rounded-lg border border-gray-200 px-4 py-3 text-sm',
                      'focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/20',
                      'transition-colors duration-200',
                    )}
                  />
                </div>
              </div>

              {/* Submit */}
              <div className="mt-8">
                <motion.button
                  type="submit"
                  disabled={loading}
                  className={cn(
                    'w-full rounded-lg bg-green px-6 py-3.5 font-semibold text-white',
                    'transition-all duration-200 hover:bg-green-light',
                    'shadow-md shadow-green/20',
                    'disabled:opacity-50 disabled:cursor-not-allowed',
                  )}
                  whileHover={loading ? {} : { scale: 1.02 }}
                  whileTap={loading ? {} : { scale: 0.98 }}
                >
                  {loading ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                      </svg>
                      Submitting...
                    </span>
                  ) : (
                    'Submit Registration'
                  )}
                </motion.button>
              </div>

              <p className="mt-4 text-center text-xs text-gray-400">
                By submitting, you agree to our privacy policy and terms of service.
              </p>
            </form>
          )}
        </ScrollReveal>
      </div>
    </section>
  );
}
