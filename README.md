# AURELIA — Haute Joaillerie & Ethical Fine Jewelry
> **Section 4: Take-Home Project Submission**  
> **Brand:** AURELIA Fine Jewelry (Original artisan atelier concept)  
> **Framework:** Nuxt 3 (Universal SSR), Tailwind CSS, Pinia, Nitro Node.js Engine  
> **Live Demo:** [Deployable on Vercel / Netlify with 1-click]  
> **Repository:** [https://github.com/wmmandela/Online_Store](https://github.com/wmmandela/Online_Store)

---

## 💎 1. Project Overview & Concept

**AURELIA** is a modern, high-end online fine jewelry atelier specializing in ethical luxury: 100% recycled 18k solid gold, conflict-free laboratory-grown and ethically sourced natural diamonds, and responsibly mined rare gemstones (Ceylon Sapphires, Muzo Emeralds, South Sea Pearls, Australian Fire Opals).

The brand was crafted entirely from scratch—no existing store's branding, photography, or assets were copied. The visual identity pairs editorial typography (**Cormorant Garamond** serif headers with **Plus Jakarta Sans** body), a refined champagne gold and obsidian palette (`#D4AF37`, `#B88E35`, `#18181B`, `#FAF7EE`), subtle micro-interactions, responsive aspect-ratio media containers, and smooth slide-over transitions.

---

## 🛠️ 2. Tech Stack & Architecture

| Layer | Technology | Key Rationale |
|---|---|---|
| **Frontend Framework** | **Nuxt 3** (v3.15+) | Full Universal Server-Side Rendering (SSR) for instant First Contentful Paint (FCP) and complete SEO crawler indexing. |
| **CSS & Styling** | **Tailwind CSS** (v3.4+) | Utility-first architecture with custom design tokens for luxury typography, champagne gold shades, and elevation shadows. |
| **State Management** | **Pinia** (v2.3+) | Type-safe, reactive cart state with client-side `localStorage` persistence and hydration safety guards. |
| **Backend & API** | **Nuxt Nitro Node Engine** | High-performance Node.js / edge server routes (`server/api/`) serving products, categories, search, filtering, and checkout processing. |
| **Database Architecture** | **In-Memory Catalog + Supabase Ready** | Modular server data layer (`server/data/products.ts`) with typed models, paired with a complete **Supabase PostgreSQL migration script** (`supabase/schema.sql`). |
| **SEO & Meta** | **Nuxt useSeoMeta & Schema.org** | Unique titles/meta per page, Open Graph, Twitter Cards, canonical URLs, dynamic XML sitemap, `robots.txt`, and Google-compliant JSON-LD Product schema. |
| **Icons & Utilities** | **Lucide Icons & VueUse** | Lightweight SVG iconography and composables (`useCurrency`, `useToast`, `useQuickView`). |

---

## ✨ 3. Feature Highlights & User Flows

### A. Storefront / Homepage (`/`)
- **Luxury Hero Banner**: High-impact editorial photography, headline, and primary call-to-actions.
- **Value Proposition Bar**: 100% Recycled 18K Gold, Certified Ethical Diamonds, Complimentary Insured Worldwide Express Delivery, and Lifetime Care.
- **Curated Collections Showcase**: Direct portals into Rings, Necklaces, Earrings, and Bracelets with dynamic piece counts.
- **Bestsellers Grid**: Instant access to icon creations with Quick View and Quick Add to Bag.
- **Artisan Editorial**: Craftsmanship storytelling highlighting ethical metallurgy and zero newly mined gold.
- **Press Quotes & Newsletter**: Curated testimonials and instant VIP promo code grant (`AURELIA10`).

### B. Product Listing Page (PLP) (`/products`)
- **Clean URL Parameters**: Multi-faceted filter state synced with browser history (`/products?category=rings&sort=price-asc`).
- **Faceted Filters**:
  - Filter by Collection: Rings, Necklaces & Pendants, Earrings, Bracelets & Bangles.
  - Filter by Precious Metal: 18K Yellow Gold, 18K White Gold, 18K Rose Gold, Platinum 950.
  - Filter by Gemstone: Lab Diamond, Natural Diamond, Ceylon Sapphire, Colombian Emerald, South Sea Pearl, Opal.
  - In-Stock Only toggle.
- **Live Search**: Debounced search query across names, descriptions, materials, and categories.
- **Sorting Modes**: Featured & Bestsellers, Price: Low to High, Price: High to Low, Highest Rated, Newest Arrivals.
- **Active Filter Chips**: Visual tags with one-click individual dismissal and a "Clear All" reset.
- **Dual-Image Hover Flip**: Hovering over cards displays lifestyle/alternate angles smoothly.
- **Quick View Modal**: Preview pieces, change sizes, and add to bag without leaving the catalog.
- **Responsive Layout**: Sidebar on desktop, smooth slide-out filter drawer on mobile.

### C. Product Detail Page (PDP) (`/products/[slug]`)
- **Clean Semantic URLs**: e.g., `/products/aurora-diamond-solitaire-ring`.
- **Breadcrumb Navigation**: Visual hierarchy with embedded Schema.org `BreadcrumbList`.
- **Multi-Image Gallery**: High-res photography, interactive thumbnail switcher, and zoom transitions.
- **Variant Selectors**:
  - Ring Size selector (Sizes 5 through 10) or chain length options.
  - Sizing guide modal trigger with international conversion chart.
- **Complimentary Custom Engraving**: Live input for personalized band engraving (up to 24 characters).
- **Stock Status Indicator**: Real-time stock status ("In Stock - ships within 24 hours").
- **Quantity Selector & Add to Bag**: Animated processing state with toast confirmation.
- **Collapsible Specification Accordions**:
  1. Gemstone & Metal Specifications (Carat weight, Clarity, Cut, Hallmark, Width, Weight).
  2. Ethical Sourcing & Sustainability Charter.
  3. Lifetime Care & Maintenance guidelines.
- **Verified Client Reviews**: Rating overview, verified purchaser badges, and detailed testimonials.
- **Complete the Look**: Intelligent recommendations from the same collection.

### D. Shopping Bag & Cart Drawer (`/cart` & Slide-Out)
- **Slide-Out Cart Drawer**: Accessible from any page via the header bag icon.
- **Dedicated Full Bag Page (`/cart`)**: Detailed overview with image thumbnails, selected ring sizes, custom engraving text notes, and quantity steppers.
- **Free Shipping Progress Meter**: Dynamic calculation towards the $200 free express shipping threshold.
- **Promotional Voucher Engine**:
  - `AURELIA10`: 10% discount on order subtotal.
  - `VIP50`: $50 off orders of $500 or more.
  - `FREESHIP`: Waives all express courier fees.
- **Financial Breakdown**: Subtotal, discount savings, insured shipping, 8% estimated sales tax, and total.

### E. Mocked Checkout & Receipt (`/checkout` & `/order-success`)
- **3-Step Checkout Flow**:
  1. Contact & Shipping Address (Full name, email, phone, street, apartment, city, state, postal code, country).
  2. Delivery Tier Selection (Standard Insured vs Priority Concierge Express).
  3. Mock Payment Methods (Credit/Debit Card with live card formatting, Apple Pay test, PayPal test).
- **Server-Side Validation**: Calls `POST /api/checkout` to validate item availability, recalculate prices securely, apply discount codes, compute taxes, and issue a persistent order reference (`AUR-2026-XXXX`).
- **Order Success Page (`/order-success`)**:
  - Full itemized recap with photos, selected sizes, and custom engraving inscriptions.
  - Estimated delivery timeline and courier tracking badge.
  - Print/Save Receipt feature via `window.print()`.

---

## 🔍 4. SEO & Performance Strategy

1. **Unique Titles & Meta Descriptions**: Custom titles and metadata generated on every page via Nuxt's `useSeoMeta`.
2. **Open Graph & Twitter Cards**: `og:title`, `og:description`, `og:image`, `og:url`, `og:type="product"`, `twitter:card="summary_large_image"`.
3. **Structured Data (Schema.org JSON-LD)**:
   - **`Product` Schema** on PDP: includes `name`, `image`, `description`, `sku`, `brand`, `offers` (price, currency, availability, merchant return policy, shipping details), and `aggregateRating`.
   - **`BreadcrumbList` Schema**: full itemized hierarchy for Google search breadcrumbs.
   - **`Organization` & `WebSite` Schema** in global layout with `SearchAction` deep-linking.
4. **Clean Semantic URLs**: Descriptive hyphenated slugs (`/products/aurora-diamond-solitaire-ring`).
5. **Canonical Links**: Dynamically generated `<link rel="canonical" :href="url">` preventing duplicate content penalties.
6. **Dynamic XML Sitemap (`/sitemap.xml`)**: Generated by `server/routes/sitemap.xml.ts`, including all static routes and all dynamic product slugs with `lastmod`, `changefreq`, and `priority`.
7. **Robots.txt (`/robots.txt`)**: Generated by `server/routes/robots.txt.ts`, directing web crawlers to the sitemap while excluding `/checkout` and `/order-success`.
8. **Fast Image Handling & Core Web Vitals**:
   - Explicit `width` and `height` attributes to eliminate Cumulative Layout Shift (CLS).
   - `fetchpriority="high"` on LCP hero images.
   - Native `loading="lazy"` and `decoding="async"` on below-the-fold images.
   - High-performance CDN images with optimized WebP/AVIF auto-formatting.

---

## 🚀 5. How to Run Locally

### Prerequisites
- **Node.js**: v18.0.0 or higher (tested on Node v25.5.0)
- **npm**: v9.0.0 or higher (or pnpm / yarn)

### Installation & Launch
```bash
# 1. Clone the repository
git clone https://github.com/wmmandela/Online_Store.git
cd Online_Store

# 2. Install dependencies
npm install

# 3. Start local development server (runs on http://localhost:3000)
npm run dev

# 4. Create production build
npm run build

# 5. Preview production build locally
npm run preview
```

### Environment Variables
Copy `.env.example` to `.env` if customizing the site URL or Supabase keys:
```env
NUXT_PUBLIC_SITE_URL=https://aurelia-jewelry.vercel.app
# Optional Supabase config:
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_KEY=your-anon-key
```

---

## 🧠 6. Key Decisions Explained (Interview Talking Points)

### Q: Why Nuxt 3 (SSR) over a client-side SPA (e.g. plain Vue/React or Vite)?
> **A:** For an e-commerce store—especially high-value luxury—SEO and performance are paramount. Client-side SPAs render blank HTML on initial crawl, hurting organic ranking, search indexing, and social media link previews. Nuxt 3 provides Universal SSR out-of-the-box, ensuring search engine bots and social scrapers receive fully hydrated HTML with all Open Graph and Schema.org tags intact on the very first HTTP request.

### Q: How is the backend and database structured?
> **A:** Nuxt 3 comes with **Nitro**, a full-fledged Node.js / edge server engine. Instead of creating an external Express microservice with CORS overhead, we utilized Nitro server routes (`/server/api/products`, `/server/api/checkout`, etc.). This keeps frontend and backend within a unified TypeScript monorepo, shares types seamlessly between client and server, and deploys as serverless functions on Vercel/Netlify without cold-start friction.  
> In addition, a comprehensive **Supabase PostgreSQL migration file** (`supabase/schema.sql`) with tables, foreign keys, indexes, and Row Level Security (RLS) policies is included for turnkey integration with cloud databases.

### Q: Why Pinia with localStorage hydration handling?
> **A:** Pinia is Vue's official, type-safe store. In an SSR environment, accessing `localStorage` during server rendering causes hydration mismatch errors (`window is not defined`). We implemented an initialization guard (`init()`) that activates exclusively on the client (`import.meta.client`), seamlessly restoring the user's shopping bag, custom engravings, and applied promo codes while guaranteeing zero SSR flicker.

### Q: How were image performance and Cumulative Layout Shift (CLS) addressed?
> **A:** High-resolution luxury jewelry photography is heavy. We utilized CDN-optimized images with automatic modern format negotiation (WebP/AVIF), strict CSS aspect-ratio containers (`aspect-[4/5]`), explicit `width` and `height` dimensions, and `loading="lazy"`. Hero images use `fetchpriority="high"` to optimize the Largest Contentful Paint (LCP) metric.

---

## 🔮 7. What I Would Improve With More Time

1. **Production Payment Gateway**: Replace mocked checkout with real Stripe Elements (`@stripe/stripe-js`) supporting 3D Secure 2, Apple Pay, Google Pay, and Klarna with webhook fulfillment (`server/api/webhooks/stripe.post.ts`).
2. **User Authentication & Customer Dashboard**: Integrate Supabase Auth or Clerk to allow customers to view historical orders, track live courier shipments, save custom ring sizes, and maintain a persistent Wishlist.
3. **Database Cloud Sync & Admin Portal**: Connect the provided `supabase/schema.sql` directly to live PostgreSQL with an authenticated admin dashboard for inventory updates, price adjustments, and review moderation.
4. **Search Acceleration & Algolia/Meilisearch**: For a 10,000+ SKU store, integrate instant search faceting via Meilisearch or Algolia with typo tolerance and synonyms.
5. **Automated Testing Suite**:
   - **Unit Tests**: Vitest for Pinia store logic, coupon algorithms, and currency formatters.
   - **End-to-End Tests**: Playwright for end-to-end user journeys (Product browse → Filter → Add to Cart → Apply Promo Code → Checkout → Order Success verification).
6. **Web Vitals & Performance Monitoring**: Add Google Analytics 4 / Speed Insights to continuously track Core Web Vitals (LCP, FID/INP, CLS) in production.

---

## 🌐 8. Deployment

This project is configured for **zero-configuration 1-click deployment** on Vercel or Netlify.

### Deploying to Vercel:
1. Push this repository to GitHub (`wmmandela/Online_Store`).
2. Log into [vercel.com](https://vercel.com) and click **"Add New Project"**.
3. Import the `Online_Store` repository.
4. Vercel automatically detects **Nuxt.js** framework preset.
5. Click **"Deploy"**. The site will be live within 60 seconds with SSL, CDN caching, and serverless Nitro functions.

---

### Author
**Machera Mandela**  
GitHub: [@wmmandela](https://github.com/wmmandela)  
Repository: `Online_Store`
