import type { Metadata } from "next";
import { Geist, Geist_Mono, Pacifico } from "next/font/google";
import "./globals.css";

// Fonts
const pacifico = Pacifico({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
  variable: "--font-pacifico",
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Metadata for SEO & social sharing
export const metadata: Metadata = {
  title: "Tapps Broilers Enterprise | Fresh Broiler Chicken in Watamu | Broilers Watamu",
  description:
    "Tapps Broilers Enterprise delivers fresh, farm-raised broiler chickens in Watamu, Kenya. Hygienic, healthy, and affordable broilers direct from the farm.",
  keywords: [
    "Tapps Broilers",
    "Broilers Watamu",
    "Watamu Broilers",
    "Broilers Enterprise",
    "Fresh Broilers Watamu",
    "Fresh broiler chicken Kenya",
    "Farm-raised chicken Watamu",
    "Affordable broilers Watamu",
  ],
  authors: [{ name: "Tapps Broilers Enterprise" }],
  openGraph: {
    title: "Tapps Broilers Enterprise | Fresh Broiler Chicken in Watamu",
    description:
      "Order hygienic, healthy, and affordable broiler chicken in Watamu. Direct farm-to-table delivery from Tapps Broilers Enterprise.",
    url: "https://tapps-kappa.vercel.app",
    siteName: "Tapps Broilers Enterprise",
    images: [
      {
        url: "/broilers_close_up.jpg", // Add real image inside /public
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
    title: "Tapps Broilers Enterprise",
    description:
      "Order fresh broiler chicken in Watamu from Tapps Broilers Enterprise. Farm-raised, hygienic, and affordable.",
    images: ["/broilers_close_up.jpg"],
  },
};

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

        {/* Favicon (place favicon.ico or logo.png in /public) */}
        <link rel="icon" href="/favicon.png" />

        {/* Schema.org JSON-LD for Local Business */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              name: "Tapps Broilers Enterprise",
              description:
                "Fresh, farm-raised broiler chickens delivered in Watamu, Kenya.",
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
              image: "/logo.jpg",
            }),
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${pacifico.variable} antialiased`}
      >
        <header>
          {/* Hidden heading for accessibility */}
          <h1 className="sr-only">Tapps Broilers Enterprise</h1>
        </header>

        <main>{children}</main>

        
      </body>
    </html>
  );
}
