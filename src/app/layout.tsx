import "../scss/globals.scss";
import { Inter } from "next/font/google";
import Head from "next/head";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header/Header";
import { Gtm } from "@/components/Gtm/Gtm";
import Script from "next/script";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Cristian Rojas",
  description:
    "Cristian Rojas FrontEnd Developer | React | Next.js | JavaScript | Vtex IO | Git | Node",
  robots: { index: true, follow: true },
  authors: { name: "Cristian Rojas" },
  keywords: [
    "Cristian rojas FrontEnd Developer",
    "Cristian Rojas Desarrollador web",
    "React",
    "Next.js",
    "TypeScript",
    "JavaScript",
    "FrontEnd",
    "Web",
    "Developer",
    "Vtex IO",
    "css",
    "html",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=GTM-56ZQ33K"
        strategy="afterInteractive"
      />
      <body className={inter.className}>
        <Gtm />
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
