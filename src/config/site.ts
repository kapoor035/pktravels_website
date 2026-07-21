export const siteConfig = {
  businessName: "PK Travels",
  tagline: "Premium Luxury Coaches",
  
  // Contact Details
  phones: [
    { label: "Primary Booking", display: "+91 99110 16644", raw: "+919911016644" },
    { label: "Secondary Booking", display: "+91 99996 98020", raw: "+919999698020" },
  ],
  whatsapp: {
    display: "+91 99110 16644",
    number: "919911016644",
    defaultText: "Hello PK Travels, I'm interested in booking a luxury coach charter.",
  },
  email: "pktravelsdwarka@gmail.com",
  
  // Office Location (Plot No. 484, Sector 19, Dwarka, New Delhi - 110075)
  address: {
    line1: "Plot No. 484",
    line2: "Sector 19, Dwarka",
    line3: "New Delhi - 110075",
    full: "Plot No. 484, Sector 19, Dwarka, New Delhi - 110075",
  },
  
  // Centering on PK Travels business location at Dwarka Sector 19
  googleMapsUrl: "https://maps.google.com/maps?q=PK%20Travels%2C%20Plot%20No.%20484%2C%20Sector%2019%2C%20Dwarka%2C%20New%20Delhi%20-%20110075&t=&z=16&ie=UTF8&iwloc=&output=embed",
  
  // Social Coordinates
  instagramUrl: "https://www.instagram.com/pktravels_kapoor/",
  
  // Metadata for SEO
  metadata: {
    title: "PK Travel Delhi | Premium Luxury Bus Rental in Delhi NCR",
    description: "Experience premium luxury coach bus rentals in Delhi NCR. Book high-end buses for weddings, corporate events, school trips, and outstation tours.",
    url: "https://pktraveldelhi.com",
  },
};
export type SiteConfig = typeof siteConfig;
