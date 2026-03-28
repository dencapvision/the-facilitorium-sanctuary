import type { Metadata } from "next";
import { Inter, Cormorant_Garamond } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

const cormorantGaramond = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-serif",
});

export const metadata: Metadata = {
  title: "The Facilitorium | โรงเรียนวิทยากรผู้สร้างการเปลี่ยนแปลง",
  description: "คลังความรู้ เครื่องมือ หลักสูตร และคอมมูนิตี้ สำหรับวิทยากรและผู้รักการเรียนรู้ยุคใหม่",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="th" className={`${inter.variable} ${cormorantGaramond.variable}`}>
      <body className="antialiased selection:bg-gold selection:text-white">
        {children}
      </body>
    </html>
  );
}
