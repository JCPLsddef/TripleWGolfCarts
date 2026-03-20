'use client';

import Script from 'next/script';
import { Phone, Check, Star } from 'lucide-react';
import { business, hero } from '@/content/siteContent';
import { QuoteForm } from './QuoteForm';

export function Hero() {
  return (
    <section className="relative bg-gradient-to-br from-bg-900 via-bg-800 to-bg-900 pt-24 lg:pt-32 pb-16 lg:pb-24 overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div style={{width: '1440px', height: '900px'}} data-us-project="kVirbInN8Hn5Wr87IWgy"></div>
      </div>
      <Script
        id="unicornstudio"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `!function(){var u=window.UnicornStudio;if(u&&u.init){if(document.readyState==="loading"){document.addEventListener("DOMContentLoaded",function(){u.init()})}else{u.init()}}else{window.UnicornStudio={isInitialized:!1};var i=document.createElement("script");i.src="https://cdn.jsdelivr.net/gh/hiunicornstudio/unicornstudio.js@v2.1.4/dist/unicornStudio.umd.js",i.onload=function(){if(document.readyState==="loading"){document.addEventListener("DOMContentLoaded",function(){UnicornStudio.init()})}else{UnicornStudio.init()}},(document.head||document.body).appendChild(i)}}();`
        }}
      />

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
