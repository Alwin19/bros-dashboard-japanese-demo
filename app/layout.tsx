import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import { SidebarProvider} from "@/components/ui/sidebar"
import { DashboardSidebar } from "@/components/dashboard-sidebar"


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "BROS Dashboard - Rumah Sakit",
  description: "Dashboard Keuangan Rumah Sakit",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen`}
      >
        <SidebarProvider>
          <DashboardSidebar />
          {children}
        </SidebarProvider>
      </body>
    </html>
  );
}
