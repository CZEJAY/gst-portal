export const metadata = {
  title: "CBT TEST",
};
import { CandidateAuthProvider } from "@/context/CandidateAuthContext";
import "../globals.css";
import { Toaster } from "sonner";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <CandidateAuthProvider>
          {children}
          <div className="absolute">
            <Toaster />
          </div>
        </CandidateAuthProvider>
      </body>
    </html>
  );
}
