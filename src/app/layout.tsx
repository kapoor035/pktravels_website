import type { Metadata, Viewport } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import { siteConfig } from "@/config/site";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

export const metadata: Metadata = {
  title: siteConfig.metadata.title,
  description: siteConfig.metadata.description,
  keywords: [
    "Luxury Bus Rental Delhi",
    "Luxury Coach Rental New Delhi",
    "Wedding Bus Rental Delhi NCR",
    "Corporate Coach Hire Delhi",
    "School Bus Rental Delhi",
    "Rent Luxury Bus Dwarka",
    "Outstation Bus Rental Delhi",
    "PK Travels New Delhi"
  ],
  authors: [{ name: siteConfig.businessName }],
  alternates: {
    canonical: siteConfig.metadata.url,
  },
  openGraph: {
    title: siteConfig.metadata.title,
    description: siteConfig.metadata.description,
    url: siteConfig.metadata.url,
    siteName: siteConfig.businessName,
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: `${siteConfig.metadata.url}/assets/logo/logo.PNG`,
        width: 800,
        height: 800,
        alt: `${siteConfig.businessName} Logo`,
      }
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.metadata.title,
    description: siteConfig.metadata.description,
    images: [`${siteConfig.metadata.url}/assets/logo/logo.PNG`],
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
    other: [
      {
        rel: "android-chrome-192x192",
        url: "/android-chrome-192x192.png",
      },
      {
        rel: "android-chrome-512x512",
        url: "/android-chrome-512x512.png",
      },
    ],
  },
  manifest: "/site.webmanifest",
};

export const viewport: Viewport = {
  themeColor: "#0b0b0b",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Structured JSON-LD Business Schema for SEO
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": siteConfig.businessName,
    "image": `${siteConfig.metadata.url}/assets/logo/logo.PNG`,
    "@id": `${siteConfig.metadata.url}/#localbusiness`,
    "url": siteConfig.metadata.url,
    "telephone": siteConfig.phones[0].raw,
    "priceRange": "$$$",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": `${siteConfig.address.line1}, ${siteConfig.address.line2}`,
      "addressLocality": "New Delhi",
      "postalCode": "110075",
      "addressCountry": "IN"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "28.5853755", // Center Dwarka Sector 19
      "longitude": "77.0504746"
    },
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday"
      ],
      "opens": "00:00",
      "closes": "23:59"
    },
    "sameAs": [
      siteConfig.instagramUrl
    ]
  };

  return (
    <html lang="en" className={`${inter.variable} ${outfit.variable} scroll-smooth`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="antialiased selection:bg-gold selection:text-black">
        {children}
      </body>
    </html>
  );
}
