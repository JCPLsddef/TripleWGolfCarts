'use client';

import { Zap, Battery, CheckCircle2, ArrowRight, Quote } from 'lucide-react';
import { whyLithium } from '@/content/siteContent';

const iconMap = {
  Zap,
  Battery,
  CheckCircle2,
};

export function WhyLithium() {
  return (
    <section className="section-padding bg-bg-alt">
      <div className="container-default">
        <div className="text-center mb-10 max-w-3xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-text mb-4">
            {whyLithium.heading}
          </h2>
          <p className="text-base sm:text-lg text-text-muted leading-relaxed">
            {whyLithium.intro}
          </p>
          <p className="mt-4 text-sm text-text-muted italic">
            {whyLithium.ownerCredit}
          </p>
        </div>

        <div className="grid sm:grid-cols-3 gap-6 max-w-5xl mx-auto mb-12">
          {whyLithium.benefits.map((b) => {
            const Icon = iconMap[b.icon as keyof typeof iconMap];
            return (
              <div key={b.title} className="card text-left">
                <div className="w-12 h-12 bg-primary-soft rounded-xl flex items-center justify-center mb-4">
                  {Icon && <Icon className="w-6 h-6 text-primary" />}
                </div>
                <h3 className="text-lg font-semibold text-text mb-2">{b.title}</h3>
                <p className="text-text-muted text-sm leading-relaxed">{b.body}</p>
              </div>
            );
          })}
        </div>

        <div className="max-w-3xl mx-auto mb-12">
          <figure className="relative bg-white border-l-4 border-primary rounded-lg p-6 sm:p-8 shadow-sm">
            <Quote className="absolute top-4 right-4 w-8 h-8 text-primary/20" aria-hidden />
            <blockquote className="text-lg sm:text-xl italic text-text leading-relaxed">
              “{whyLithium.featuredQuote.text}”
            </blockquote>
            <figcaption className="mt-4 text-sm text-text-muted">
              <span className="font-semibold text-text">{whyLithium.featuredQuote.attribution}</span>
              <span>, {whyLithium.featuredQuote.detail}</span>
            </figcaption>
          </figure>
        </div>

        <div className="max-w-5xl mx-auto mb-10">
          <h3 className="text-xl sm:text-2xl font-bold text-text text-center mb-6">
            {whyLithium.comparison.heading}
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border border-border rounded-lg overflow-hidden bg-white">
              <thead>
                <tr className="bg-bg-alt">
                  {whyLithium.comparison.columns.map((col, i) => (
                    <th
                      key={col}
                      className={`text-left font-semibold text-text px-4 py-3 border-b border-border ${
                        i === 1 ? 'text-primary' : ''
                      }`}
                    >
                      {col}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {whyLithium.comparison.rows.map((row, ri) => (
                  <tr
                    key={ri}
                    className={ri % 2 === 1 ? 'bg-bg-alt/40' : ''}
                  >
                    {row.map((cell, ci) => (
                      <td
                        key={ci}
                        className={`px-4 py-3 border-b border-border align-top ${
                          ci === 0 ? 'font-medium text-text' : 'text-text-muted'
                        } ${ci === 1 ? 'text-text' : ''}`}
                      >
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="text-center max-w-2xl mx-auto">
          <p className="text-text font-medium mb-5">{whyLithium.closingNudge}</p>
          <a
            href={whyLithium.ctaHref}
            className="btn-primary inline-flex items-center gap-2"
          >
            {whyLithium.ctaText}
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
}
