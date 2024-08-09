import "@/app/globals.css";
import type { Metadata } from "next";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";

export const metadata: Metadata = {
  title: "Eoverse",
  description: "A place to store your thoughts",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      className="flex flex-col justify-between relative"
      style={{ minHeight: "100dvh" }}
    >
      <Header />
      <div className="flex-grow p-4 sm:p-6" style={{
        background: "https://t4.ftcdn.net/jpg/05/36/32/95/360_F_536329537_RblOApJIbTIPjNlROJrKKiJaFmceLJvZ.jpg"
      }}>
        <div className="m-auto w-full flex flex-col justify-start items-start">
          {children}
        </div>
      </div>
      <Footer />
    </div>
  );
}
