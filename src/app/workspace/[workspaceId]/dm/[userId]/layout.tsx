import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Direct Message",
};

export default function DmLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
} 