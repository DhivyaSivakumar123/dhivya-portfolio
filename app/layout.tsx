import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Dhivya S — Full Stack Developer",
  description:
    "Portfolio of Dhivya S, a Full Stack Developer & Cloud Enthusiast, presented as an interactive solar system."
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="font-body bg-bg text-text">{children}</body>
    </html>
  );
}
