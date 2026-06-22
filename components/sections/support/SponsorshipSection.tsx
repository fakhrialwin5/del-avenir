'use client';

import { Check, Sparkles } from 'lucide-react';
import ScrollReveal from '@/components/animations/ScrollReveal';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Button } from '@/components/ui/Button';
import { SPONSORSHIP_TIERS } from '@/lib/constants';

const tierStyles: Record<string, { border: string; badge: string; highlight: string }> = {
  Gold: {
    border: 'border-gold/40 shadow-gold',
    badge: 'bg-gradient-to-r from-gold to-gold-dark text-white',
    highlight: 'ring-2 ring-gold/30',
  },
  Silver: {
    border: 'border-gray-300',
    badge: 'bg-gray-200 text-gray-800',
    highlight: '',
  },
  Bronze: {
    border: 'border-amber-300',
    badge: 'bg-amber-100 text-amber-800',
    highlight: '',
  },
};

export default function SponsorshipSection() {
  return (
    <section
      id="sponsorship"
      className="bg-cream py-section sm:py-section"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <SectionHeading
            title="Become a Sponsor"
            subtitle="Partner with us to nurture future leaders through various sponsorship opportunities"
          />
        </ScrollReveal>

        <div className="mt-12 grid gap-8 lg:grid-cols-3 items-start">
          {SPONSORSHIP_TIERS.map((tier, index) => {
            const isGold = tier.tier === 'Gold';
            const styles = tierStyles[tier.tier];

            return (
              <ScrollReveal
                key={tier.tier}
                delay={index * 0.15}
                variant="fadeUp"
              >
                <div
                  className={`relative rounded-card border-2 bg-white p-8 text-center transition-all duration-300 hover:-translate-y-2 hover:shadow-xl ${
                    styles.border
                  } ${isGold ? 'scale-100 lg:scale-105 ' + styles.highlight : ''}`}
                >
                  {/* Tier Badge */}
                  <div
                    className={`inline-flex items-center gap-2 rounded-full px-5 py-2 text-sm font-semibold ${
                      isGold ? 'bg-gold text-green-dark' : styles.badge
                    }`}
                  >
                    {isGold && <Sparkles className="h-4 w-4" />}
                    {tier.tier}
                  </div>

                  {/* Price */}
                  <div className="mt-6">
                    <span className="font-display text-4xl font-bold text-foreground">
                      {tier.price}
                    </span>
                  </div>

                  <p className="mt-2 text-sm text-gray-500">
                    {isGold
                      ? 'Premium partnership package'
                      : tier.tier === 'Silver'
                        ? 'Standard sponsorship package'
                        : 'Basic sponsorship package'}
                  </p>

                  {/* Divider */}
                  <div className="mx-auto my-6 h-px w-16 bg-gradient-to-r from-transparent via-gold/50 to-transparent" />

                  {/* Benefits */}
                  <ul className="space-y-3 text-left">
                    {tier.benefits.map((benefit) => (
                      <li key={benefit} className="flex items-start gap-3">
                        <Check
                          className={`mt-0.5 h-5 w-5 shrink-0 ${
                            isGold ? 'text-gold' : 'text-green'
                          }`}
                        />
                        <span className="text-gray-700">{benefit}</span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA */}
                  <div className="mt-8">
                    <Button
                      variant={isGold ? 'primary' : 'secondary'}
                      size="lg"
                      href={`https://wa.me/${
                        isGold
                          ? '62895401209855'
                          : '6289510084866'
                      }`}
                      className={isGold ? 'w-full' : 'w-full'}
                    >
                      Choose Plan
                    </Button>
                  </div>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
