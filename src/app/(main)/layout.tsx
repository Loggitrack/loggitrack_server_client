"use client";

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
  var user = null;
  if (typeof window !== "undefined") {
    user = localStorage.getItem("user");
  }
  const router = useRouter();

  if (!user) {
    router.push("/auth");
  }

  return (
    <section>
      {/* Include shared UI here e.g. a header or sidebar */}
      <Suspense fallback={<div>Loading...</div>}>
        <Sidebar> {children} </Sidebar>
      </Suspense>
    </section>
  );
}
