import "@/app/globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Providers } from "@/app/components/Providers";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";

const inter = Inter({ subsets: ["latin"] });

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
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <div
            className="flex flex-col justify-between relative"
            style={{ minHeight: "100dvh" }}
          >
            <Header />
            <div className="flex-grow p-4 sm:p-6 bg-gray-50">
              <div className="m-auto w-full flex flex-col justify-start items-start">
                {children}
              </div>
            </div>
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  );
}
