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
    site: "@your_twitter_handle", // Replace with actual Twitter handle
    creator: "@your_twitter_handle", // Replace with actual Twitter handle
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
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased font-sans`}
      >
        {children}
      </body>
    </html>
  );
}
