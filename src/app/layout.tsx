import type { Metadata } from "next";
import "./globals.css";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "শাহিন সরকার | রেজুমে",
  description: "শাহিন সরকারের অনলাইন রেজুমে ও পোর্টফোলিও",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="bn" className="h-full antialiased">
      <body className="min-h-full flex flex-col bg-surface font-sans text-ink">
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
