import Main from "./(main)/page";
import Login from "./auth/page";
import GetHostComponent from "@components/GetHostComponent";

export default function Home() {
  const isAuth = false;

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {<Login />}
      {/* <GetHostComponent /> */}
    </main>
  );
}
