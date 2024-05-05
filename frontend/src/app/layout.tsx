import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import NavBar from "./components/NavBar";
import { SignerProvider } from "./state/signer";
import "./styles/navbar.css"
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
          <div className="app-container">
            <NavBar />
            <div className="app-content">
              {children}
            </div>
            <footer className="footer">
              <p className="text-white">&copy; 2024 Hospital Records Management System</p>
            </footer>
          </div>
        </body>
      </html>
    </SignerProvider>
  );
}
