import type { Metadata, Viewport } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import { siteConfig } from "@/config/site";
import Script from "next/script";

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
    "Luxury Bus Hire Delhi",
    "Luxury Coach Rental Delhi",
    "Premium Bus Rental Delhi",
    "Corporate Bus Rental Delhi",
    "Wedding Bus Rental Delhi",
    "Luxury Coach Delhi NCR",
    "Group Transportation Delhi",
    "Staff Transportation Delhi",
    "School Bus Rental Delhi",
    "Outstation Bus Rental Delhi",
    "VIP Coach Rental Delhi",
    "PK Travels Delhi",
    "Luxury Coach Hire Delhi"
  ],
  authors: [{ name: siteConfig.businessName }],
  publisher: siteConfig.businessName,
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
        url: `${siteConfig.metadata.url}/assets/logo/logo.png`,
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
    images: [`${siteConfig.metadata.url}/assets/logo/logo.png`],
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
  // Structured JSON-LD LocalBusiness Schema for SEO
  const localBusinessJsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": siteConfig.businessName,
    "image": `${siteConfig.metadata.url}/assets/logo/logo.png`,
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
    "areaServed": {
      "@type": "AdministrativeArea",
      "name": "Delhi NCR"
    },
    "sameAs": [
      siteConfig.instagramUrl
    ]
  };

  // Structured JSON-LD Organization Schema for SEO
  const organizationJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": siteConfig.businessName,
    "url": siteConfig.metadata.url,
    "logo": `${siteConfig.metadata.url}/assets/logo/logo.png`,
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": siteConfig.phones[0].raw,
      "contactType": "booking support",
      "areaServed": "IN",
      "availableLanguage": ["en", "hi"]
    },
    "sameAs": [
      siteConfig.instagramUrl
    ]
  };

  // Structured JSON-LD Website Schema for SEO
  const websiteJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": siteConfig.businessName,
    "url": siteConfig.metadata.url,
    "potentialAction": {
      "@type": "SearchAction",
      "target": `${siteConfig.metadata.url}/?s={search_term_string}`,
      "query-input": "required name=search_term_string"
    }
  };

  return (
    <html lang="en" className={`${inter.variable} ${outfit.variable} scroll-smooth`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
      </head>
      <body className="antialiased selection:bg-gold selection:text-black">
        {children}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-1GYRC0ZJQW"
          strategy="afterInteractive"
        />

        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-1GYRC0ZJQW');
          `}
        </Script>
      </body>
    </html>
  );
}
