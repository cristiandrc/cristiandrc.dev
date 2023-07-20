import "../scss/globals.scss";
import { Inter } from "next/font/google";
import Head from "next/head";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header/Header";
import { Gtm } from "@/components/Gtm/Gtm";
import Script from "next/script";
import { Background } from "@/components/Background/Background";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Portfolio - Cristian Rojas",
  description:
    "Experienced FrontEnd developer specializing in React, TypeScript, and modern tools. Crafting exceptional and fast digital experiences. Explore my website now!",
  authors: { name: "Cristian Rojas" },
  robots: { index: true },
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
  alternates: {
    canonical: "/",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Gtm />
        <Background />
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
