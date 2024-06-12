import "../globals.css"
import { SessionProviderLayout } from "@/context/SessionProvider";

export const metadata = {
  title: "Authentication - Portal",
  description: "Authentication page",
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
      </body>
    </html>
  );
}
