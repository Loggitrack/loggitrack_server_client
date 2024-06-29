"use client";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "./lib/utils";
import { PublicEnvScript } from "next-runtime-env";
import { headers } from "next/headers";
import { Provider } from "react-redux";
import { store } from "./store";

const fontSans = Inter({ subsets: ["latin"], variable: "--font-sans" });

// export const metadata: Metadata = {
//   title: "Loggitrack",
//   description: "Your logging companion",
//   icons: {
//     icon: "./icon.png",
//   },
// };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Provider store={store}>
    <html lang="en">
      <body>{children}</body>
    </html>
    </Provider>
  );
}
