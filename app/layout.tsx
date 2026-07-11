import type { Metadata, Viewport } from "next";
import { Instrument_Serif, Inter, Amiri, Space_Grotesk } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import SmoothScroll from "@/components/layout/SmoothScroll";
import ScrollProgress from "@/components/layout/ScrollProgress";
import CursorGlow from "@/components/ui/CursorGlow";

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

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  variable: "--font-ui",
});

const amiri = Amiri({
  weight: ["400", "700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-arabic",
});

export const metadata: Metadata = {
  metadataBase: new URL('https://del-avenir.pages.dev'),
  title: "Del'Avenir",
  description:
    "Generasi 11 Baitul Qur'an — Mewujudkan mimpi, merajut masa depan.",
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
    title: "Del'Avenir",
    description:
      "Generasi 11 Baitul Qur'an — Mewujudkan mimpi, merajut masa depan.",
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
    title: "Del'Avenir",
    description:
      "Generasi 11 Baitul Qur'an — Mewujudkan mimpi, merajut masa depan.",
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
    <html lang="en" className={`${instrumentSerif.variable} ${inter.variable} ${spaceGrotesk.variable} ${amiri.variable}`}>
      <head>
        {/* Resource hints for Google Fonts */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        <link rel="dns-prefetch" href="https://fonts.gstatic.com" />
        {/* Preload hero video for LCP — only metadata, full load deferred */}
        <link rel="preload" as="video" href="/videos/green-fields-and-peaks.960x540.mp4" type="video/mp4" />
        {/* Preload mount-fuji video for non-home hero pages */}
        <link rel="dns-prefetch" href="/videos/mount-fuji-pastel-sky-wallpaperwaves-com.mp4" />
      </head>
      <body className="min-h-screen bg-white text-black antialiased film-grain">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:z-[9999] focus:bg-white focus:p-4 focus:text-sm focus:font-medium focus:text-black focus:outline-2 focus:outline-gold"
        >
          Skip to main content
        </a>
        <SmoothScroll>
          <Navbar />
          <main id="main-content">{children}</main>
          <Footer />
          <ScrollProgress />
          <CursorGlow />
        </SmoothScroll>
        <Analytics />
      </body>
    </html>
  );
}
