import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "เข้าร่วม FA-OS Ecosystem | The Facilitorium",
  description:
    "สมัครเข้าร่วม The Facilitorium — FA-OS Ecosystem สำหรับวิทยากรที่ต้องการยกระดับทักษะและขยายเครือข่าย",
  openGraph: {
    title: "เข้าร่วม FA-OS Ecosystem | The Facilitorium",
    description:
      "เริ่มต้นการเดินทางสู่การเป็น Facilitator มืออาชีพ กับ The Facilitorium",
    url: "https://facilitorium.denmasterfa.com/join",
  },
  robots: {
    index: false,
  },
};

export default function JoinLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
