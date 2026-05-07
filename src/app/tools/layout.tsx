import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Toolkit Sanctuary | The Facilitorium",
  description:
    "คลังเครื่องมือ Facilitation ระดับโปร — AI Session Designer, Workshop Deck, Template และทรัพยากรดิจิทัล สำหรับวิทยากรมืออาชีพ",
  openGraph: {
    title: "Toolkit Sanctuary | The Facilitorium",
    description:
      "คลังเครื่องมือ Facilitation ระดับโปร สำหรับวิทยากรมืออาชีพ",
    url: "https://facilitorium.denmasterfa.com/tools",
  },
};

export default function ToolsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
