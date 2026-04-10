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
  description: "คลังความรู้ เครื่องมือ หลักสูตร และคอมมูนิตี้ สำหรับวิทยากรและผู้รักการเรียนรู้ยุคใหม่",
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
