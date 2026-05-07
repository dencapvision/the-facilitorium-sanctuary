import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Community Sanctuary | The Facilitorium",
  description:
    "ชุมชนวิทยากรแถวหน้าของไทย แลกเปลี่ยนความรู้ ประสบการณ์ และเติบโตไปด้วยกันในพื้นที่ FA-OS Ecosystem",
  openGraph: {
    title: "Community Sanctuary | The Facilitorium",
    description:
      "ชุมชนวิทยากรแถวหน้าของไทย แลกเปลี่ยนความรู้และเติบโตไปด้วยกัน",
    url: "https://facilitorium.denmasterfa.com/community",
  },
};

export default function CommunityLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
