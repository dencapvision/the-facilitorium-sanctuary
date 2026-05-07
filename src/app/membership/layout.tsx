import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sanctuary Access — แผนสมาชิก | The Facilitorium",
  description:
    "ปลดล็อกเครื่องมือ AI ขั้นสูง คลังความรู้วิทยากรมืออาชีพ และ Community เฉพาะทาง ด้วยแผนสมาชิก FA-OS Membership",
  openGraph: {
    title: "Sanctuary Access — แผนสมาชิก | The Facilitorium",
    description:
      "ยกระดับสู่วิทยากรระดับพรีเมียม ด้วย FA-OS Membership ของ The Facilitorium",
    url: "https://facilitorium.denmasterfa.com/membership",
  },
};

export default function MembershipLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
