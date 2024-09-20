import type { Metadata } from "next";
import localFont from "next/font/local";
import RandomFact from "@/components/randomFact/randomFact";
import Aside from "@/components/Aside/Aside";
import cl from "./layout.module.css";
import "./globals.css";
import cat from "@/public/images/cat.png";
import Image from "next/image";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Cats Fact App",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <main className={cl.layout}>
          <Aside position="left" />
          <div className={cl.container}>
            <header>
              <h1>Cat Facts</h1>
              <div className={cl.randomFactContainer}>
                <Image src={cat} alt="cat" width={cat.width / 2} height={cat.height / 2} />
                <RandomFact />
              </div>
            </header>
            {children}
          </div>
          <Aside position="right" />
        </main>
      </body>
    </html>
  );
}
