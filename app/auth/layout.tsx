import { Analytics } from "@vercel/analytics/react"
import { Toaster } from "sonner";
import "../globals.css"
import { SessionProviderLayout } from "@/context/SessionProvider";

export const metadata = {
  title: "Authentication - UNIUYO GST Portal",
  description: "Authentication page",
  icons: "/uniuyo-logo.png"

};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <SessionProviderLayout>{children}</SessionProviderLayout>
        <div className="absolute">
        <Toaster />
        </div>
      <Analytics />
      </body>
    </html>
  );
}
