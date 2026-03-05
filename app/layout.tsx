import type { Viewport } from "next";
import { LayoutClient } from "./LayoutClient";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: "cover",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-background text-foreground antialiased">
        <LayoutClient>{children}</LayoutClient>
      </body>
    </html>
  );
}
