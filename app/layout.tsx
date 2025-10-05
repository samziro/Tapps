import type { Metadata } from "next";
import { Pacifico, Outfit } from "next/font/google";
import "./globals.css";

// Fonts
const pacifico = Pacifico({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
  variable: "--font-pacifico",
});

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-outfit",
});

// =============================
// SEO Metadata
// =============================
export const metadata: Metadata = {
  title:
    "Tapps Broilers Enterprise | Fresh Broiler Chicken in Watamu & Malindi | Farm-to-Table Poultry Kenya",
  description:
    "Tapps Broilers Enterprise delivers farm-raised, hygienic, and affordable broiler chickens in Watamu and Malindi, Kenya. Fresh from our farm to your table.",
  keywords: [
    "Tapps Broilers",
    "Broilers Watamu",
    "Broilers Malindi",
    "Broiler Chicken Watamu",
    "Broiler Chicken Malindi",
    "Buy Broiler Chicken Kenya",
    "Fresh broilers Watamu",
    "Fresh broilers Malindi",
    "Farm-raised chicken Watamu",
    "Farm-raised chicken Malindi",
    "Affordable chicken Watamu",
    "Affordable chicken Malindi",
    "Poultry farm Watamu",
    "Poultry farm Malindi",
  ],
  authors: [{ name: "Tapps Broilers Enterprise" }],
  openGraph: {
    title:
      "Tapps Broilers Enterprise | Fresh Broiler Chicken in Watamu & Malindi",
    description:
      "Order hygienic, healthy, and affordable broiler chickens delivered in Watamu and Malindi. Farm-to-table poultry from Tapps Broilers Enterprise.",
    url: "https://tapps-kappa.vercel.app",
    siteName: "Tapps Broilers Enterprise",
    images: [
      {
        url: "/broilers_close_up.jpg",
        width: 1200,
        height: 630,
        alt: "Fresh broilers from Tapps Broilers Enterprise",
      },
    ],
    locale: "en_KE",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title:
      "Tapps Broilers Enterprise | Fresh Broiler Chicken in Watamu & Malindi",
    description:
      "Farm-raised, hygienic, and affordable broiler chicken. Available in Watamu and Malindi – order today from Tapps Broilers Enterprise.",
    creator: "@tappsbroilers",
    images: ["/broilers_close_up.jpg"],
  },
};

// =============================
// Root Layout
// =============================
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <head>
        {/* Mobile friendly */}
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        {/* Favicon & App Icons */}
        <link rel="icon" href="/favicon.png" />
        <link rel="apple-touch-icon" href="/logo.png" />
        <link rel="manifest" href="/site.webmanifest" />

        {/* Structured Data: Local Business + Product */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              name: "Tapps Broilers Enterprise",
              description:
                "Fresh, farm-raised broiler chickens delivered in Watamu and Malindi, Kenya.",
              url: "https://tapps-kappa.vercel.app",
              telephone: "+254769751566",
              address: {
                "@type": "PostalAddress",
                streetAddress: "Jiwe-leupe",
                addressLocality: "Watamu",
                addressRegion: "Kilifi",
                postalCode: "80202",
                addressCountry: "KE",
              },
              image: "/broilers_close_up.jpg",
              priceRange: "KSh 500 - KSh 600",
              sameAs: [
                "https://www.facebook.com/tappsbroilers",
                "https://www.instagram.com/tappsbroilers",
                "https://twitter.com/tappsbroilers",
              ],
              makesOffer: {
                "@type": "Offer",
                itemOffered: {
                  "@type": "Product",
                  name: "Fresh Broiler Chicken",
                  image: "/broilers_close_up.jpg",
                  description:
                    "Farm-raised, hygienic, and affordable broiler chickens in Watamu & Malindi.",
                  brand: { "@type": "Brand", name: "Tapps Broilers Enterprise" },
                  offers: {
                    "@type": "Offer",
                    priceCurrency: "KES",
                    price: "500",
                    availability: "https://schema.org/InStock",
                  },
                },
              },
            }),
          }}
        />
      </head>
      <!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-B7FQ9Y3P1T"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'G-B7FQ9Y3P1T');
</script>
      <body className={`${outfit.className} ${pacifico.variable} antialiased`}>
        <header>
          {/* Hidden heading for accessibility & SEO */}
          <h1 className="sr-only">
            Tapps Broilers Enterprise | Fresh Broiler Chicken in Watamu & Malindi
          </h1>
        </header>

        <main>{children}</main>

        
      </body>
    </html>
  );
}
