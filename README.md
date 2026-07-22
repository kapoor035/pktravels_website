# PK Travels — Premium Luxury Coach Rental Portal

A premium, state-of-the-art web portal and booking engine for **PK Travels**, the trusted luxury bus and coach rental service in Delhi NCR. Designed with a high-end black-and-gold visual theme, smooth cinematic micro-animations, and a highly optimized mobile-first layout.

---

## 🌟 Key Features

### 🎬 Immersive Hero Section
- **Dynamic Drone Footage**: Background autoplaying, looped, and muted drone video showing the premium coach fleet.
- **Dynamic Viewport Height**: Configured with modern `h-[100dvh]` to perfectly cover active viewports on mobile devices.
- **Premium Badge**: A customized, responsive luxury badge highlighting the company's core services.

### 🏢 Pillars Grid (Who We Are)
- **Responsive Columns**: Adapts dynamically from a 2-column layout on mobile screens to a 4-column layout on desktops.
- **Premium Interaction**: Clean hover animations, glassmorphism card styling, and subtle micro-movements.

### 🛠️ Bespoke Services (Our Offerings)
- **Balanced Grids**: Converted into a 2-column layout on mobile, with a balanced spanning effect for the last service item.
- **Diverse Coverages**: Showcases dedicated cards for Wedding transport, Corporate charters, School & College trips, Outstation tours, Airport transfers, and family functions.

### 🚍 Premium Fleet Showcase
- **Widescreen Drone Preview**: Embedded widescreen featured drone video matching standard landscape media proportions.
- **Specs Checklist**: Clean checklist displaying high-class specifications (Pushback seats, GPS Tracking, AC, etc.) with responsive sizing.

### 📸 Visual Highlights (Gallery)
- **Mobile Autoplay Slider**: A modern single-card autoplay slideshow for mobile viewports supporting horizontal swipe gestures (`drag="x"`) and dot indicators.
- **Desktop Grid**: Maintains the original 3-column square thumbnail layout with visual overlays.
- **Widescreen Media Lightbox**: Click to open media inside a dark lightbox with full native HTML5 video player controls.

### 💬 Google Reviews Carousel
- **Endless Autoplay**: Infinite loop carousel sliding reviews automatically every 4–5 seconds.
- **Mobile Responsive**: Renders 3 cards on desktop, 2 cards on tablet, and 1 card on mobile devices.

### 📬 Chauffeur Desk & Quote Switcher
- **Segmented Mobile Switcher**: Includes an app-like Segmented Tab Selector on mobile viewports to toggle between **Quick Connect** details and the **Request Quote Form**, reducing vertical scrolling by over 50%.
- **Direct Maps Hook**: The office address functions as a link launching directions on Google Maps directly in a new tab.

### 📱 Sticky Quick Actions Bar
- **Instant Call & WhatsApp**: Fixed bottom action bar on mobile viewports with a subtle top border and high-contrast styling.

---

## 🛠️ Tech Stack

- **Core Framework**: React 19, Next.js (App Router), TypeScript
- **Styling & Theme**: TailwindCSS (Vanilla CSS tokens in `src/app/globals.css`)
- **Animations**: Framer Motion
- **Icons**: Lucide React

---

## 📂 Project Structure

```bash
├── public/
│   ├── assets/             # Branding favicons, icons, and local media assets
│   └── site.webmanifest    # Web app manifest for production setups
├── src/
│   ├── app/                # Next.js pages, routing, metadata configurations
│   ├── components/         # Reusable structural and interaction components
│   ├── config/
│   │   └── site.ts         # Centralized configuration variables for PK Travels
│   └── hooks/              # Custom helper hooks
```

---

## ⚙️ Branding & Configuration (`src/config/site.ts`)

Branding coordinates (including contact numbers, email, address, and maps hooks) are managed centrally in `src/config/site.ts`:

```typescript
export const siteConfig = {
  businessName: "PK Travels",
  phones: [
    { label: "Primary Booking", display: "+91 99110 16644", raw: "+919911016644" },
    { label: "Secondary Booking", display: "+91 99996 98020", raw: "+919999698020" },
  ],
  whatsapp: {
    display: "+91 99110 16644",
    number: "919911016644",
  },
  email: "pktravelsdelhi1@gmail.com",
  address: {
    line1: "Plot No. 484",
    line2: "Sector 19, Dwarka",
    line3: "New Delhi - 110075",
  },
  instagramUrl: "https://www.instagram.com/pktravels_kapoor/",
};
```

---

## 🚀 Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Run the Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to view the portal.

### 3. Build for Production
```bash
npm run build
npm run start
```
