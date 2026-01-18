import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { profile, socialLinks } from "@/data/portfolio";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Felipe Cabrera - Desarrollador Full Stack | Data & Space Apps",
  description: "Estudiante de Ingeniería y analista de seguridad. Desarrollador Full Stack en datos y ML (HEA, Calorflow). Experto en Python y FastAPI. Abierto a colaborar",
  openGraph: {
    title: profile.name,
    description: "Estudiante de Ingeniería y analista de seguridad. Desarrollador Full Stack en datos y ML (HEA, Calorflow). Experto en Python y FastAPI. Abierto a colaborar",
    url: 'https://felicabrera.com',
    siteName: profile.name,
    locale: 'es_UY',
    type: 'website',
  },
  alternates: {
    canonical: 'https://felicabrera.com'
  },
  robots: {
    index: true,
    follow: true,
  },
  keywords: profile.keywords || ["portfolio", "developer", "projects", "blog"],
  author: profile.name,
  twitter: {
    card: "summary_large_image",
    title: profile.name,
    description: "Estudiante de Ingeniería y analista de seguridad. Desarrollador Full Stack en datos y ML (HEA, Calorflow). Experto en Python y FastAPI. Abierto a colaborar",
    ...(profile.twitter && { site: profile.twitter, creator: profile.twitter }),
  },
};

export default function RootLayout({ children }) {
  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": profile.name,
    "jobTitle": profile.role,
    "url": "https://felicabrera.com",
    "sameAs": socialLinks.map(link => link.url),
    "email": profile.email,
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Montevideo",
      "addressCountry": "UY"
    }
  };

  return (
    <html lang="es" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="theme-color" content="#ffffff" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased font-sans`}
      >
        {children}
      </body>
    </html>
  );
}
