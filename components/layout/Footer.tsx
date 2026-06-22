'use client';

import Link from 'next/link';

import { NAV_LINKS, CONTACT_INFO } from '@/lib/constants';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-black text-white">
      <div className="max-w-7xl mx-auto px-8 py-20 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8">
          {/* Brand - spans more */}
          <div className="md:col-span-5">
            <Link href="/" className="inline-block">
              <span className="font-display text-2xl tracking-tight text-white">
                Del&apos;Avenir
              </span>
              <sup className="text-[9px] font-body text-white/40">®</sup>
            </Link>
            <p className="mt-4 text-sm text-white/40 font-body max-w-sm leading-relaxed">
              Generasi 11 Baitul Qur&apos;an. Achieving the dream of achieving success.
              Carving the era, painting the future.
            </p>
            {/* Social Links */}
            <div className="flex items-center gap-3 mt-6">
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white/[0.06] flex items-center justify-center text-white/40 hover:bg-white hover:text-black transition-all duration-300"
                aria-label="Instagram"
              >
                <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white/[0.06] flex items-center justify-center text-white/40 hover:bg-white hover:text-black transition-all duration-300"
                aria-label="YouTube"
              >
                <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
              </a>
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white/[0.06] flex items-center justify-center text-white/40 hover:bg-white hover:text-black transition-all duration-300"
                aria-label="TikTok"
              >
                <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 0 0-.79-.05A6.34 6.34 0 0 0 3.15 15.2a6.34 6.34 0 0 0 10.86 4.48V13.2a8.16 8.16 0 0 0 5.58 2.17v-3.45a4.85 4.85 0 0 1-2-1.33z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-3 md:col-start-7">
            <h3 className="text-[11px] font-body font-medium text-white/30 uppercase tracking-[0.15em] mb-5">
              Pages
            </h3>
            <ul className="space-y-3">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/50 hover:text-white transition-colors duration-200 font-body"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="md:col-span-4">
            <h3 className="text-[11px] font-body font-medium text-white/30 uppercase tracking-[0.15em] mb-5">
              Contact
            </h3>
            <ul className="space-y-3">
              <li>
                <span className="text-sm text-white/50 font-body block">
                  Pesantren Baitul Qur&apos;an Sragen
                </span>
              </li>
              {CONTACT_INFO.admins.map((admin) => (
                <li key={admin.name}>
                  <a
                    href={`tel:${admin.phoneClean}`}
                    className="text-sm text-white/50 hover:text-white transition-colors font-body"
                  >
                    {admin.phone}
                    <span className="text-white/30 ml-1.5">{admin.name}</span>
                  </a>
                </li>
              ))}
              <li className="pt-2">
                <span className="text-[11px] text-white/25 font-body block mb-1 uppercase tracking-[0.1em]">
                  Donation
                </span>
                <span className="text-sm text-white/50 font-body">
                  BSI {CONTACT_INFO.donation.accountNumber}
                </span>
                <br />
                <span className="text-xs text-white/30 font-body">
                  a.n. {CONTACT_INFO.donation.accountName}
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-16 pt-8 border-t border-white/[0.06]">
          <p className="text-xs text-white/25 font-body text-center">
            &copy; {currentYear} Del&apos;Avenir. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
