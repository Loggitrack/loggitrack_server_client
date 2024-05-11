import { useRouter } from "next/navigation";

export default function Main() {
  // router navigate to /dashboard

  const router = useRouter();

  router.push("/dashboard");

  return (
    <main className="flex h-[85vh] flex-col items-center justify-between p-24">
      <h1>Main</h1>
    </main>
  );
}
