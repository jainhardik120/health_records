import type { Metadata } from "next";
import { Inter } from "next/font/google";
import NavBar from "./components/NavBar";
import { SignerProvider } from "./state/signer";
const inter = Inter({ subsets: ["latin"] });
import "./globals.css"

export const metadata: Metadata = {
  title: "Decentralised Health Records",
  description: "Minor Project II",
};

const Footer: React.FC = () => {
  return (
    <>
      <footer className="footer">
        <p className="text-white">&copy; 2024 Hospital Records Management System</p>
      </footer>
    </>
  )
}

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
            <Footer />
          </div>
        </body>
      </html>
    </SignerProvider>
  );
}
