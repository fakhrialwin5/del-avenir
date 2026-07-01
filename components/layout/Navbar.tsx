'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';

import { Menu, X } from 'lucide-react';
import { NAV_LINKS } from '@/lib/constants';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 60);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  return (
    <>
      {/* Desktop: Floating Pill Navbar */}
      <header
        className={`fixed left-1/2 -translate-x-1/2 z-50 hidden md:block transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          scrolled
            ? 'top-4'
            : 'top-8'
        }`}
      >
        <nav
          className={`flex items-center gap-1 rounded-full px-2 py-2 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            scrolled
              ? 'bg-white/80 backdrop-blur-xl border border-black/[0.06] shadow-[0_2px_20px_rgba(0,0,0,0.06)]'
              : 'bg-white/10 backdrop-blur-md border border-white/20'
          }`}
        >
          {/* Logo */}
          <Link href="/" className="flex items-center gap-0.5 pl-5 pr-3">
            <span
              className={`font-display text-xl tracking-tight transition-colors duration-300 ${
                scrolled ? 'text-black' : 'text-white'
              }`}
            >
              Del&apos;Avenir
            </span>
            <sup
              className={`text-[9px] font-body transition-colors duration-300 ${
                scrolled ? 'text-gray-400' : 'text-white/50'
              }`}
            >
              ®
            </sup>
          </Link>

          {/* Divider */}
          <div
            className={`w-px h-5 transition-colors duration-300 ${
              scrolled ? 'bg-black/10' : 'bg-white/20'
            }`}
          />

          {/* Nav Links */}
          <div className="flex items-center gap-0.5">
            {NAV_LINKS.filter((link) => link.href !== '/support').map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`relative px-4 py-2 text-[13px] font-body font-medium rounded-full transition-all duration-300 ${
                  pathname === link.href
                    ? scrolled
                      ? 'text-black bg-black/[0.05]'
                      : 'text-white bg-white/10'
                    : scrolled
                      ? 'text-gray-500 hover:text-black hover:bg-black/[0.03]'
                      : 'text-white/60 hover:text-white hover:bg-white/10'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Divider */}
          <div
            className={`w-px h-5 transition-colors duration-300 ${
              scrolled ? 'bg-black/10' : 'bg-white/20'
            }`}
          />

          {/* CTA */}
          <Link
            href="/support"
            className={`ml-1 mr-1 inline-flex items-center rounded-full px-5 py-2 text-[13px] font-body font-medium btn-premium ${
              scrolled
                ? 'bg-black text-white hover:bg-gray-800'
                : 'bg-white text-black hover:bg-white/90'
            }`}
          >
            Support Us
          </Link>
        </nav>
      </header>

      {/* Mobile: Top bar */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 md:hidden transition-all duration-300 ${
          scrolled || !isHome
            ? 'bg-white/90 backdrop-blur-xl border-b border-black/[0.06]'
            : 'bg-transparent'
        }`}
      >
        <nav className="flex items-center justify-between px-5 py-4">
          <Link href="/" className="flex items-center gap-0.5">
            <span
              className={`font-display text-xl tracking-tight ${
                scrolled || !isHome ? 'text-black' : 'text-white'
              }`}
            >
              Del&apos;Avenir
            </span>
          </Link>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className={`p-2 rounded-full transition-colors ${
              scrolled || !isHome
                ? 'text-black hover:bg-black/5'
                : 'text-white hover:bg-white/10'
            }`}
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </nav>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-40 bg-white md:hidden"
          >
            <div className="flex flex-col items-center justify-center h-full gap-2">
              {NAV_LINKS.filter((link) => link.href !== '/support').map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 * i, ease: [0.16, 1, 0.3, 1] }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className={`block px-8 py-4 text-3xl font-display transition-colors ${
                      pathname === link.href ? 'text-black' : 'text-gray-300 hover:text-black'
                    }`}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="mt-4"
              >
                <Link
                  href="/support"
                  onClick={() => setMobileOpen(false)}
                  className="inline-flex items-center rounded-full bg-black px-8 py-3.5 text-base font-medium font-body text-white btn-premium"
                >
                  Support Us
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
