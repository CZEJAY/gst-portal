import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../../globals.css";
import Providers from "@/redux/Providers";
import { DeviceProvider } from "@/context/deviceContext";
import { SessionProviderLayout } from "@/context/SessionProvider";
import Siderbar from "../_components/Siderbar";
import Header from "../_components/header";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "UNIUYO GST Dashboard - BIOMETRIC",
  description: "BIOMETRIC PORTAL",
  icons: "/uniuyo-logo.png"
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <SessionProviderLayout>
          <DeviceProvider>
            <Providers>
            <main className="flex flex-row">
                {/* <LeftSidebar /> */}
                <Siderbar />
                <Header />
                <section className="main-container">
                  <div className="w-full ">{children}</div>
                </section>
                {/* <RightSideBar /> */}
              </main>
            </Providers>
          </DeviceProvider>
        </SessionProviderLayout>
      </body>
    </html>
  );
}
