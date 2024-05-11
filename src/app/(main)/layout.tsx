"use client";

import Footer from "@components/Footer";
import Navbar from "@components/Navbar";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Sidebar from "../components/SideBar";
import { Suspense } from "react";
import { useRouter } from "next/navigation";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = sessionStorage.getItem("user");
  const router = useRouter();

  if (!user) {
    router.push("/auth");
  }

  return (
    <section>
      {/* Include shared UI here e.g. a header or sidebar */}
      <Suspense fallback={<div>Loading...</div>}>
        <Sidebar children={children} />
      </Suspense>
    </section>
  );
}
