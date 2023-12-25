import { Inter, Lexend } from "next/font/google";
import "./globals.css";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { Provider as StoreProvider } from "react-redux";

const lexend = Lexend({ subsets: ["latin"] });

export const metadata = {
  title: "MensFit",
  description: "A Place for Fit & Comfortable Outfit | MensFit",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={lexend.className}>
        <Navbar />
        <div className="mb-20"></div>
        <main className="flex flex-col items-center">{children}</main>
        <div className="z-10">
          <Footer />
        </div>
      </body>
    </html>
  );
}
