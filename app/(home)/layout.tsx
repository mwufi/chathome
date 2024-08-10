import CursorsProvider from "./cursors-provider";
import Cursors from "./Cursors";

import "@/app/globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

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
      <div className="flex-grow p-4 sm:p-6 bg-teal-50">
        <div className="max-w-7xl m-auto w-full flex flex-col justify-start items-start">
          <CursorsProvider>
            <Cursors />
            {children}
          </CursorsProvider>
        </div>
      </div>
      <Footer />
    </div>
  );
}
