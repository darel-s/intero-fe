"use client";

import { Inter } from "next/font/google";
import "./globals.css";
import Sidebar from "./components/sidebar";
import { usePathname } from "next/navigation";
import { Toaster } from "react-hot-toast";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
    const pathname = usePathname();

    return (
        <html lang="en">
            <body className={inter.className}>
                <div className="flex">
                    {pathname !== "/login" && <Sidebar />}
                    <main className="flex-grow">{children}</main>
                    <Toaster />
                </div>
            </body>
        </html>
    );
}
