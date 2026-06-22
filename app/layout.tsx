import type { Metadata, Viewport } from "next";
import { Instrument_Serif, Inter, Amiri } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const instrumentSerif = Instrument_Serif({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
  variable: "--font-display",
});

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-body",
});

const amiri = Amiri({
  weight: ["400", "700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-arabic",
});

export const metadata: Metadata = {
  title: "Del'Avenir — Pesantren Baitul Qur'an Sragen",
  description:
    "Generasi 11 Baitul Qur'an — Achieving the dream of achieving success. Carving the era, painting the future.",
  keywords: [
    "Pesantren Baitul Qur'an",
    "Sragen",
    "Islamic Boarding School",
    "Del'Avenir",
    "Generasi 11",
    "Tahfidz",
    "Muhadhoroh Kubro",
  ],
  authors: [{ name: "Del'Avenir Team" }],
  creator: "Del'Avenir",
  openGraph: {
    type: "website",
    locale: "id_ID",
    url: "https://delavenir.com",
    siteName: "Del'Avenir",
    title: "Del'Avenir — Pesantren Baitul Qur'an Sragen",
    description:
      "Generasi 11 Baitul Qur'an — Achieving the dream of achieving success. Carving the era, painting the future.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Del'Avenir",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Del'Avenir — Pesantren Baitul Qur'an Sragen",
    description:
      "Generasi 11 Baitul Qur'an — Achieving the dream of achieving success. Carving the era, painting the future.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#FFFFFF",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${instrumentSerif.variable} ${inter.variable} ${amiri.variable}`}>
      <head>
        {/* Resource hints for Google Fonts */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        <link rel="dns-prefetch" href="https://fonts.gstatic.com" />
      </head>
      <body className="min-h-screen bg-white text-black antialiased film-grain">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:z-[9999] focus:bg-white focus:p-4 focus:text-sm focus:font-medium focus:text-black focus:outline-2 focus:outline-gold"
        >
          Skip to main content
        </a>
        <Navbar />
        <main id="main-content">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
