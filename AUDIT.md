# Triple W Rentals — Site-Wide Powertrain Positioning Audit

**Purpose:** Inventory every place the live site references fueling, gas, electric, lithium, battery, charging, motor, engine, or powertrain — so the lithium + gas repositioning can be applied with zero drift.

**Scope of scan:** All files under `src/`, including pages, components, content, schema, meta tags, API routes, lib utilities, and image alt text.

**Headline finding:** The site's powertrain language is concentrated almost entirely in **one file** — `src/content/siteContent.ts`. The page components consume that content object, so a single content rewrite + a meta-tag rewrite + a schema rewrite reaches the entire homepage. No FAQ/testimonial/CTA strings sit hardcoded in components, and no image alt text mentions powertrain anywhere.

---

## 1. Routes Map (every page in the site)

| Route | File | Notes |
|---|---|---|
| `/` (homepage, only marketing page) | [src/app/page.tsx](src/app/page.tsx) | Single-page composition of all section components |
| Root layout (applies site-wide metadata + JSON-LD) | [src/app/layout.tsx](src/app/layout.tsx) | Owns `<title>`, meta description, keywords, OpenGraph |
| API: `/api/send-lead` | [src/app/api/send-lead/route.ts](src/app/api/send-lead/route.ts) | Form lead handler. No marketing copy. |

The site is **single-page** (no `/about`, `/services`, `/blog`, etc.). All section components are rendered inline on `/` via `page.tsx`.

### Section components rendered on `/`
- `Header` → [src/components/sections/Header.tsx](src/components/sections/Header.tsx)
- `Hero` → [src/components/sections/Hero.tsx](src/components/sections/Hero.tsx)
- `FirstScroll` → [src/components/sections/FirstScroll.tsx](src/components/sections/FirstScroll.tsx)
- `MobileQuoteForm` → [src/components/sections/MobileQuoteForm.tsx](src/components/sections/MobileQuoteForm.tsx)
- `WhyChooseUs` → [src/components/sections/WhyChooseUs.tsx](src/components/sections/WhyChooseUs.tsx)
- `ChooseYourCart` → [src/components/sections/ChooseYourCart.tsx](src/components/sections/ChooseYourCart.tsx)
- `WhereCartsShine` → [src/components/sections/WhereCartsShine.tsx](src/components/sections/WhereCartsShine.tsx)
- `HowItWorks` → [src/components/sections/HowItWorks.tsx](src/components/sections/HowItWorks.tsx)
- `Testimonials` → [src/components/sections/Testimonials.tsx](src/components/sections/Testimonials.tsx)
- `DeliveryArea` → [src/components/sections/DeliveryArea.tsx](src/components/sections/DeliveryArea.tsx)
- `FAQ` → [src/components/sections/FAQ.tsx](src/components/sections/FAQ.tsx)
- `FinalCTA` → [src/components/sections/FinalCTA.tsx](src/components/sections/FinalCTA.tsx)
- `Footer` → [src/components/sections/Footer.tsx](src/components/sections/Footer.tsx)
- `MobileBottomBar` → [src/components/sections/MobileBottomBar.tsx](src/components/sections/MobileBottomBar.tsx)
- `BackToTop` → [src/components/ui/BackToTop.tsx](src/components/ui/BackToTop.tsx)
- `QuoteForm` → [src/components/sections/QuoteForm.tsx](src/components/sections/QuoteForm.tsx)
- `LocalBusinessSchema` → [src/components/LocalBusinessSchema.tsx](src/components/LocalBusinessSchema.tsx)

---

## 2. Keyword Matches — Powertrain References Found

Keywords scanned (case-insensitive): `fuel | fueled | fueling | refuel | gas | gasoline | electric | electricity | lithium | battery | batteries | charge | charging | charged | recharge | powertrain | motor | engine`.

| # | File | Line | Current text | Keyword | Powertrain context |
|---|---|---|---|---|---|
| 1 | [src/content/siteContent.ts](src/content/siteContent.ts:37) | 37 | `'Clean, fueled, and ready to operate',` (hero benefits bullet) | fueled | **Gas-only** (should be both) |
| 2 | [src/content/siteContent.ts](src/content/siteContent.ts:64) | 64 | `description: \`Clean, fueled, and ready exactly when you need them. ${business.reviewCount} events served.\`` (Why Choose Us → Event-Ready Carts) | fueled | **Gas-only** (should be both) |
| 3 | [src/content/siteContent.ts](src/content/siteContent.ts:162) | 162 | `'Fueled and ready',` (How It Works → expectations list) | Fueled | **Gas-only** (should be both) |
| 4 | [src/content/siteContent.ts](src/content/siteContent.ts:245) | 245 | `'Fueled and ready to operate',` (Pricing → included list) | Fueled | **Gas-only** (should be both) |
| 5 | [src/content/siteContent.ts](src/content/siteContent.ts:285) | 285 | `question: 'Are your carts fueled and ready?',` (FAQ Q) | fueled | **Gas-only** (should be both) |
| 6 | [src/content/siteContent.ts](src/content/siteContent.ts:286) | 286 | `answer: 'Yes. Every cart arrives clean, inspected, fueled, and ready to operate. We include phone support during your rental if you have any questions.',` (FAQ A) | fueled | **Gas-only** (should be both) |

**Components scanned for hardcoded powertrain strings:** Zero matches in any of the `.tsx` files (Hero, ChooseYourCart, FAQ, HowItWorks, WhyChooseUs, Footer, FirstScroll, Pricing, Header, MobileBottomBar, MobileQuoteForm, Testimonials, FinalCTA, DeliveryArea, WhereCartsShine, QuoteForm, LocalBusinessSchema). Every section pulls from `siteContent.ts`.

**Lib + API scanned:** Zero matches in `src/lib/*.ts`, `src/app/api/send-lead/route.ts`, or `src/components/GoogleAdsTracking.tsx`.

> Caveat — false-positive sweep: the string `gas` does NOT appear standalone anywhere in `src/`. The string `motor` and `engine` do NOT appear. The string `electric` / `lithium` / `battery` / `charge` do NOT appear. The site currently has **zero** lithium positioning, exactly as the brief states.

---

## 3. Meta Tags — Current State

| File | Line | Field | Current text |
|---|---|---|---|
| [src/app/layout.tsx](src/app/layout.tsx:15) | 15 | `<title>` | `Triple W Rentals | 4-Seater Golf Cart Rentals Tyler, TX | Delivery Included` |
| [src/app/layout.tsx](src/app/layout.tsx:16) | 16 | meta description | `4-seater golf cart rentals in Tyler, TX & East Texas. From $300+ (3-day min). Delivery & pickup included. Perfect for weddings, RV parks, resorts & events. Fast quotes. Call (972) 965-6901.` |
| [src/app/layout.tsx](src/app/layout.tsx:17) | 17 | meta keywords | `golf cart rental Tyler TX, golf cart rental East Texas, Longview golf cart rental, wedding golf cart rental, RV park golf cart, resort golf cart rental, 4-seater golf cart, Club Car rental, EZGO rental, golf cart delivery Tyler` |
| [src/app/layout.tsx](src/app/layout.tsx:19) | 19 | `og:title` | `Triple W Rentals | 4-Seater Golf Cart Rentals Tyler, TX` |
| [src/app/layout.tsx](src/app/layout.tsx:20) | 20 | `og:description` | `4-seater golf cart rentals delivered & picked up. From $300+ (3-day min). Serving Tyler & East Texas.` |

**Missing:** `twitter:title`, `twitter:description`, dedicated `twitter` block. Currently only `openGraph` is set. The brief asks to update Twitter tags — they'll need to be added.

---

## 4. Image Alt Text — Powertrain References

All `alt=` attributes in the codebase:

| File | Line | Current alt | Mentions powertrain? |
|---|---|---|---|
| [src/components/sections/ChooseYourCart.tsx](src/components/sections/ChooseYourCart.tsx:41) | 41 | `` `${cart.name} - Golf Cart Rental` `` | No (dynamic, derived from cart name in content) |
| [src/components/sections/Footer.tsx](src/components/sections/Footer.tsx:20) | 20 | `` `${business.name} Logo` `` | No |
| [src/components/sections/HeroVisual.tsx](src/components/sections/HeroVisual.tsx:11) | 11 | `Event-ready golf carts delivered and set up at venue` | No |
| [src/components/sections/Header.tsx](src/components/sections/Header.tsx:38) | 38 | `` `${business.name} Logo` `` | No |

`HeroVisual` exists as a file but is **not** rendered in `page.tsx` — it was removed from the homepage layout in recent commits. Safe to ignore unless re-added.

No alt text says "fueled" or implies powertrain. When the new lithium and gas cart cards are added (and when cart names in `cartTypes` change), the dynamic alt at `ChooseYourCart.tsx:41` will automatically pick up the new naming (e.g., "Govecourt Lithium 4-Seater - Golf Cart Rental"). That's acceptable but could be sharpened.

---

## 5. FAQ Entries — Full Inventory

All FAQ Q&A pairs live in [src/content/siteContent.ts:251-292](src/content/siteContent.ts):

1. How much do golf cart rentals cost in Tyler, TX?
2. Do you deliver to RV parks and resorts?
3. Can I rent golf carts for a wedding?
4. What's the minimum rental period?
5. How fast do you respond to quote requests?
6. Do you deliver and pick up the carts?
7. What cities do you serve in East Texas?
8. How far in advance should I book?
9. **Are your carts fueled and ready?** ← rewrite to "charged or fueled"
10. What brands of golf carts do you rent? ← brief says insert new lithium/gas Qs **after** this one

Brief calls for adding 5 new Qs after entry 10:
- Are these gas or electric golf carts?
- How long does a lithium golf cart last on one charge?
- What happens if a lithium cart loses charge during my event?
- Is a lithium cart as powerful as a gas one?
- Will I smell fumes or hear engine noise from a lithium cart?

---

## 6. Testimonials — Powertrain Mentions

All testimonials live in [src/content/siteContent.ts:174-211](src/content/siteContent.ts). Scanned all 6 entries. **Zero** testimonials currently mention electric, lithium, battery, gas, or charging. They are powertrain-neutral.

Stacey's quote (the verified lithium proof point) is **not** present in the testimonial array. The brief uses it inside the new "Why Lithium" section as a featured block quote, not as a testimonial card — so it should be added in the new section, not the testimonial array (unless we also want it in both places).

---

## 7. CTA / Button Labels

Searched every `<button>`, link CTA, and form submit label. **None** reference powertrain.

Notable CTAs (powertrain-neutral, safe as-is):
- `See If Carts Are Available for Your Event` ([src/content/siteContent.ts:41](src/content/siteContent.ts:41))
- `Check Availability for Your Event` ([src/content/siteContent.ts:303](src/content/siteContent.ts:303))
- `Get Your Exact Quote` (rendered per cart card in `ChooseYourCart`)
- `Call (972) 965-6901` (header/mobile bar)

The brief introduces a new CTA `See Cart Options →` for the "Why Lithium" section, which is additive (no existing CTA to update).

---

## 8. Form Fields — Cart Type Selector

[src/components/sections/QuoteForm.tsx:340-355](src/components/sections/QuoteForm.tsx:340) renders a "Cart Type" picker whose options are sourced from `cartTypes` in `siteContent.ts`. Currently 2 options:

| id | display name |
|---|---|
| `standard` | Standard Golf Cart |
| `luxury` | Luxury Golf Cart |

Brief requires:
- Lithium 4-Seater (Standard)
- Lithium Luxury (Lifted)
- Classic Gas 4-Seater
- Not sure — recommend one for me

The current selector is **option-driven by the `cartTypes` array** — so expanding `cartTypes` from 2 → 3 cards in section 6.3 will automatically populate 3 of the 4 picker options. The "Not sure" option does not exist today as a `cartTypes` entry — it will need to be added either as a fourth `cartTypes` entry (with no card) or as a hardcoded extra button below the picker. Decision needed at Gate 4.

The label `Cart Type <span className="text-text-muted">(optional)</span>` is fine — no powertrain language to update.

The number-of-carts stepper, location input, dates picker, name/email/phone inputs — all powertrain-neutral, no changes needed.

---

## 9. Structured Data (JSON-LD)

[src/components/LocalBusinessSchema.tsx](src/components/LocalBusinessSchema.tsx) emits LocalBusiness + OfferCatalog schema. Powertrain-relevant entries:

| Field | Current value |
|---|---|
| Schema → description | `Golf Cart Rentals in Nationwide delivery, based in East Texas (Tyler). Delivery and pickup included. 4-seater carts only. 3-day minimum.` |
| OfferCatalog item 1 → name | `Standard 4-Seater Golf Cart` |
| OfferCatalog item 1 → description | `Reliable, comfortable 4-seater golf cart rental` |
| OfferCatalog item 2 → name | `Luxury 4-Seater Golf Cart` |
| OfferCatalog item 2 → description | `Premium 4-seater golf cart rental with upgraded features` |

To match the new 3-card cart selector, the OfferCatalog needs to be expanded to 3 items (Lithium Standard, Lithium Luxury, Classic Gas) with descriptions that name the powertrain. Will be handled in Step 4.

---

## 10. Other Site Areas Scanned (Clean — No Action Needed)

| Area | Result |
|---|---|
| `src/lib/constants.ts` | No powertrain copy |
| `src/lib/tracking.ts`, `googleAds.ts`, `scroll.ts`, `supabase.ts` | No marketing copy |
| `src/app/api/send-lead/route.ts` | Email template — no powertrain references in subject or body; safe |
| `src/components/GoogleAdsTracking.tsx` | No copy |
| `src/components/ui/BackToTop.tsx` | No copy |
| `src/components/ui/DateRangePicker.tsx` | No copy |
| Footer copy | Sourced from `business` object — no powertrain refs |
| Header copy | Phone CTA + nav links only — no powertrain refs |
| `package.json`, `tailwind.config.js`, `next.config.mjs` | Config only |

---

## 11. Contradictions Found (gas-only language that should represent both)

Every entry in the table below currently implies gas-only and must be rewritten to represent both lithium and gas:

| # | Location | Current implication | Fix direction |
|---|---|---|---|
| 1 | [src/content/siteContent.ts:37](src/content/siteContent.ts:37) — hero benefit bullet | "fueled" means gas | Change to "charged or fueled" (per brief 6.4 framing) |
| 2 | [src/content/siteContent.ts:64](src/content/siteContent.ts:64) — Why Choose Us card | "fueled" means gas | Apply 6.4 fix: "Clean, charged or fueled — whichever you book — and ready exactly when you need them." |
| 3 | [src/content/siteContent.ts:162](src/content/siteContent.ts:162) — How It Works expectations | "Fueled and ready" | Apply 6.5 fix: "Charged or fueled to full" |
| 4 | [src/content/siteContent.ts:245](src/content/siteContent.ts:245) — Pricing → included list | "Fueled and ready to operate" | Mirror 6.5 fix: "Charged or fueled to full" |
| 5 | [src/content/siteContent.ts:285-286](src/content/siteContent.ts:285) — FAQ Q + A | "fueled" framing | Apply 6.6 fix verbatim |
| 6 | [src/app/layout.tsx:15-20](src/app/layout.tsx:15) — title, description, og:* | "golf cart rentals" with no powertrain mention | Apply 6.7 new title/description/og + add twitter tags |
| 7 | [src/app/layout.tsx:17](src/app/layout.tsx:17) — meta keywords | No lithium / electric / battery terms | Append the 5 new keywords from 6.7 |
| 8 | [src/components/LocalBusinessSchema.tsx](src/components/LocalBusinessSchema.tsx) — JSON-LD OfferCatalog | 2 cart types, no powertrain in descriptions | Expand to 3 offers + name the powertrain in each description |
| 9 | [src/content/siteContent.ts:69-107](src/content/siteContent.ts:69) — `cartTypes` array | 2 cart cards, neither labeled lithium or gas | Replace with 3-card structure from brief 6.3 |
| 10 | [src/content/siteContent.ts:25-42](src/content/siteContent.ts:25) — `hero` object | No lithium mention in H1/subhead | Apply 6.1 hero rewrite |

No other contradictions found. The site is uniformly powertrain-silent today, with "fueled" being the only gas-leaning language.

---

## 12. Recommended Update Sequence (preview for later gates)

Because all marketing copy funnels through a single content file, the safest order is:

1. **Step 3 (Gate 3):** Rewrite `siteContent.ts` (`hero`, `whyChooseUs`, `cartTypes`, `cartComparison`, `howItWorks`, `pricing`, `faqs`) + `layout.tsx` (title, description, og, twitter, keywords). Add a new exported `whyLithium` content block and a new `<WhyLithium />` section component slotted between `WhyChooseUs` and `ChooseYourCart` in `page.tsx`.
2. **Step 4 (Gate 4):** Update `LocalBusinessSchema.tsx` OfferCatalog → 3 entries with powertrain. Add the "Not sure — recommend one for me" option to the form picker. Pass through alt-text refresh (auto-handled by dynamic alts).
3. **Step 7 (Gate 5):** Run the QA checklist from section 10 of the brief.

---

## 13. Open Questions Surfaced by the Audit (input needed at Gate 2)

In addition to the 7 unknowns Juan asked us to surface in Step 2 of the brief, the audit raised these implementation-side decisions:

1. **"Not sure" picker option** — add as a fourth `cartTypes` entry (would render as a card we don't want) or hardcode as an extra button under the picker? Recommend hardcoded extra button so it doesn't appear as a card.
2. **Stacey testimonial placement** — featured quote in the "Why Lithium" section only, or also append to the `testimonials` array for the testimonial carousel? Brief says "appears exactly once" in QA — so featured-only is the correct read.
3. **Lithium card images** — both lithium cards currently point at the existing standard + luxury Wix-hosted images. We'll need new image URLs once lithium-specific photos exist. Acceptable to ship with current images and swap later? (Flagging per brief 5.6.)
4. **Schema OfferCatalog ordering** — list lithium offers first to mirror the homepage card order? Recommend yes.
5. **Twitter card tags** — none exist today. Brief 6.7 says to update them, so we'll **add** them rather than update.

---

## 14. Bottom Line

- Single content file owns 100% of the powertrain language. Surgical fix possible.
- 6 string locations to rewrite (all in `siteContent.ts`).
- 1 layout file to update for SEO meta.
- 1 schema file to update for JSON-LD.
- 1 new content block + 1 new section component to add.
- 1 form picker to extend by one option.
- 0 alt-text rewrites required (dynamic from `cartTypes`).
- 0 hardcoded testimonial / CTA / FAQ strings buried in components.

Audit complete. Awaiting `GO GATE 2`.
