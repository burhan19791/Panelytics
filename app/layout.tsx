// app/layout.tsx
import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/sidebar.cmp";
import { Toaster } from "react-hot-toast";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Providers } from "./poviders/providers";

// Import Outfit with multiple weights
const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Panelytics",
  description: "Admin panel using Outfit font",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${outfit.variable} font-outfit antialiased`}>
        <div className="bg-gray-50 min-h-screen">
          <div className="min-h-screen fixed">
            <Sidebar />
          </div>
          <Providers>{children}</Providers>

          <Toaster
            position="top-right"
            toastOptions={{
              duration: 3000,
              style: {
                background: "#1f2937", // dark gray
                color: "#fff",
                borderRadius: "0.5rem",
              },
              success: {
                iconTheme: {
                  primary: "#22c55e", // green-500
                  secondary: "#dcfce7", // green-100
                },
              },
              error: {
                iconTheme: {
                  primary: "#ef4444", // red-500
                  secondary: "#fee2e2", // red-100
                },
              },
            }}
          />
        </div>
      </body>
    </html>
  );
}
