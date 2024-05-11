"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import Main from "./(main)/page";
import Login from "./auth/page";

export default function Home() {
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {}, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {isAuth ? <Main /> : <Login />}
    </main>
  );
}
