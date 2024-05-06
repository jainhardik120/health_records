import type { Metadata } from "next";
import { Inter } from "next/font/google";
import NavBar from "./components/NavBar";
import { SignerProvider } from "./state/signer";
const inter = Inter({ subsets: ["latin"] });
import 'react-toastify/dist/ReactToastify.css'
import "./globals.css"
import { Slide, ToastContainer } from 'react-toastify';

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
            <ToastContainer
              position="bottom-center"
              autoClose={1000}
              hideProgressBar
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="light"
              transition={Slide}
            />
            <Footer />
          </div>
        </body>
      </html>
    </SignerProvider>
  );
}
