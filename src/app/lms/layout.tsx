import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Knowledge Academy | The Facilitorium",
  description:
    "คอร์สออนไลน์และเนื้อหาเชิงลึกสำหรับวิทยากร — เรียนรู้เทคนิค Facilitation ระดับสากลกับ Den Master Fa",
  openGraph: {
    title: "Knowledge Academy | The Facilitorium",
    description:
      "คอร์สออนไลน์และเนื้อหาเชิงลึกสำหรับวิทยากร โดย Den Master Fa",
    url: "https://facilitorium.denmasterfa.com/lms",
  },
};

export default function LMSLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
