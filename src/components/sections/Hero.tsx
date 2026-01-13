'use client';

import { Phone, Check, Star } from 'lucide-react';
import { business, hero } from '@/content/siteContent';
import { QuoteForm } from './QuoteForm';

export function Hero() {
  return (
    <section className="relative bg-gradient-to-br from-bg-900 via-bg-800 to-bg-900 pt-24 lg:pt-32 pb-16 lg:pb-24 overflow-hidden">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.03%22%3E%3Cpath%20d%3D%22M36%2034v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6%2034v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6%204V0H4v4H0v2h4v4h2V6h4V4H6z%22%2F%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E')] opacity-50" />

      <div className="container-default relative">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div className="text-white space-y-8">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-warning-soft text-warning text-sm font-medium">
              {hero.scarcityBadge}
            </div>

            <div className="space-y-6">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
                {hero.headline}
              </h1>

              <p className="text-xl sm:text-2xl text-blue-50 font-medium leading-relaxed">
                Delivered, set up, and ready exactly when your event needs them.
              </p>

              <p className="text-lg text-blue-100 leading-relaxed">
                We handle delivery, setup, and pickup so you don't have to.
              </p>
            </div>
          </div>

          <div className="hidden lg:block">
            <QuoteForm />
          </div>
        </div>
      </div>
    </section>
  );
}
