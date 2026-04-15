import type { Metadata } from "next";
import { IBM_Plex_Sans, IBM_Plex_Mono, Bebas_Neue } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { SmoothScroll } from "@/components/smooth-scroll";
import "./globals.css";

const ibmPlexSans = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-sans",
  display: "swap",
});

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-mono",
  display: "swap",
});

const bebasNeue = Bebas_Neue({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-display",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Uriel Jeramiah Mendoza | Portfolio",
  description:
    "CS & Cybersecurity @ CU Boulder. NASA researcher, incoming Lumen Technologies intern, L3Harris collaborator. Building secure systems with ML and cloud infrastructure.",
  keywords: [
    "Uriel Mendoza",
    "portfolio",
    "computer science",
    "cybersecurity",
    "machine learning",
    "CU Boulder",
    "NASA",
    "Lumen Technologies",
  ],
  metadataBase: new URL("https://mendozauriel.com"),
  alternates: {
    canonical: "https://mendozauriel.com",
  },
  openGraph: {
    title: "Uriel Jeramiah Mendoza | Portfolio",
    description:
      "CS & Cybersecurity @ CU Boulder. NASA researcher, incoming Lumen Technologies intern, L3Harris collaborator.",
    url: "https://mendozauriel.com",
    siteName: "Uriel Mendoza Portfolio",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Uriel Jeramiah Mendoza | Portfolio",
    description:
      "CS & Cybersecurity @ CU Boulder. NASA researcher, incoming Lumen Technologies intern.",
  },
  icons: {
    icon: "/favicon.svg",
  },
  robots: {
    index: true,
    follow: true,
  },
  other: {
    "theme-color": "#141414",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${ibmPlexSans.variable} ${ibmPlexMono.variable} ${bebasNeue.variable} dark`}
      suppressHydrationWarning
    >
      <body className="font-sans antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Uriel Jeramiah Mendoza",
              url: "https://mendozauriel.com",
              email: "jeramiahblinks@gmail.com",
              jobTitle: "CS & Cybersecurity Student",
              sameAs: [
                "https://linkedin.com/in/uriel-mendoza",
                "https://github.com/uriel-mendoza",
              ],
              alumniOf: {
                "@type": "CollegeOrUniversity",
                name: "University of Colorado Boulder",
              },
              knowsAbout: [
                "Machine Learning",
                "Cybersecurity",
                "Network Engineering",
                "Cloud Computing",
              ],
            }),
          }}
        />
        <a href="#main-content" className="skip-to-content">
          Skip to main content
        </a>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          <SmoothScroll>{children}</SmoothScroll>
        </ThemeProvider>
      </body>
    </html>
  );
}
