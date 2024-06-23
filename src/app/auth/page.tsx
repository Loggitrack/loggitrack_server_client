"use client";

import Link from "next/link";

import { Button } from "@components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@components/ui/card";
import { Input } from "@components/ui/input";
import { Label } from "@components/ui/label";
import Image from "next/image";
import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

import {  useDispatch } from 'react-redux';
import {  AppDispatch } from '../store';


export default function Login() {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [error, setError] = useState("");
  const router = useRouter();
  const [serverUrl, setServerUrl] = useState(null);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const host = window.location.host;
      let domain = host.split(":")[0];
      localStorage.setItem("domain", domain);

      localStorage.setItem("serverUrl", `http://${domain}:3020`);
      setServerUrl(`http://${domain}:3020`);
      dispatch({ type: 'SET_SERVER_URL', payload: serverUrl });
    }
  }, []);

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(`${serverUrl}/signin`, {
        email: email,
        password: password,
      });

      if (res.status === 200) {
        console.log(res.data);
        if (typeof window !== "undefined") {
          localStorage.setItem("user", JSON.stringify(res.data?.data));
        }
        router.push("/dashboard");
      } else {
        setError("Failed trying to authenticate user.");
      }
    } catch (error) {
      // Handle error
      console.error("Error:", error);
      setError("An error occurred while trying to authenticate user.");
    }
  };

  return (
    <div className="flex flex-col justify-center items-center ">
      {error && (
        <p className="text-red border rounded-sm p-5 border-red"> {error} </p>
      )}

      <Image
        src={"/base_logo_transparent_background.png"}
        alt="Loggitrack logo"
        width={300}
        height={200}
      />
      <Card className=" max-w-sm border-primary">
        <CardHeader>
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleFormSubmit}>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                  <Link
                    href="auth/forgot_password"
                    className="ml-auto inline-block text-sm underline"
                  >
                    Forgot your password?
                  </Link>
                </div>
                <Input
                  id="password"
                  type="password"
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <Button type="submit" className="w-full">
                Login
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
