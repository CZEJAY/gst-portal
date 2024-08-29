export const metadata = {
  title: "CBT TEST",
};
import { CandidateAuthProvider } from "@/context/CandidateAuthContext";
import "../globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <CandidateAuthProvider>{children}</CandidateAuthProvider>
      </body>
    </html>
  );
}
