import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import NavBar from "./components/NavBar";
import { SignerProvider } from "./state/signer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Decentralised Health Records",
  description: "Minor Project II",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SignerProvider>
      <html lang="en">
        <body className={inter.className}>
          <NavBar />
          <div className="h-16" />
          {children}
        </body>
      </html>
    </SignerProvider>
  );
}
