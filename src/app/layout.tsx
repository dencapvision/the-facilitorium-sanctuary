import type { Metadata } from "next";
import { Prompt, Sarabun } from "next/font/google";
import "./globals.css";

const prompt = Prompt({
  subsets: ["latin", "thai"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-heading",
});

const sarabun = Sarabun({
  subsets: ["latin", "thai"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-body",
});

export const metadata: Metadata = {
  title: "The Facilitorium | โรงเรียนวิทยากรผู้สร้างการเปลี่ยนแปลง",
  description: "คลังความรู้ เครื่องมือ หลักสูตร และคอมมูนิตี้ สำหรับวิทยากรและผู้รักการเรียนรู้ยุคใหม่ โดย เด่น Master Fa",
  keywords: ["วิทยากร", "Facilitator", "LMS", "การเรียนรู้", "AI ช่วยสอน", "The Facilitorium", "FA-OS"],
  authors: [{ name: "Den Master Fa" }],
  openGraph: {
    title: "The Facilitorium | โรงเรียนวิทยากรผู้สร้างการเปลี่ยนแปลง",
    description: "คลังความรู้ เครื่องมือ หลักสูตร และคอมมูนิตี้ สำหรับวิทยากรและผู้รักการเรียนรู้ยุคใหม่",
    url: "https://facilitorium.denmasterfa.com",
    siteName: "The Facilitorium",
    images: [
      {
        url: "https://nheppvjayzxlblkeanxs.supabase.co/storage/v1/object/public/The%20Facilitorium/Bradner%20The%20facilitorium1.png",
        width: 1200,
        height: 630,
        alt: "The Facilitorium - Facilitation Operating System",
      },
    ],
    locale: "th_TH",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "The Facilitorium | โรงเรียนวิทยากรผู้สร้างการเปลี่ยนแปลง",
    description: "คลังความรู้ เครื่องมือ หลักสูตร และคอมมูนิตี้ สำหรับวิทยากรและผู้รักการเรียนรู้ยุคใหม่",
    images: ["https://nheppvjayzxlblkeanxs.supabase.co/storage/v1/object/public/The%20Facilitorium/Bradner%20The%20facilitorium1.png"],
  },
  icons: {
    icon: 'https://nheppvjayzxlblkeanxs.supabase.co/storage/v1/object/public/The%20Facilitorium/Logo%20The%20facilitorium6.png',
    shortcut: 'https://nheppvjayzxlblkeanxs.supabase.co/storage/v1/object/public/The%20Facilitorium/Logo%20The%20facilitorium6.png',
    apple: 'https://nheppvjayzxlblkeanxs.supabase.co/storage/v1/object/public/The%20Facilitorium/Logo%20The%20facilitorium6.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="th" className={`${prompt.variable} ${sarabun.variable}`}>
      <body className="antialiased selection:bg-gold selection:text-white">
        {children}
      </body>
    </html>
  );
}
