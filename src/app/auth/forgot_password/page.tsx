"use client";
import React from "react";
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
import Link from "next/link";

function Forgot_password() {
  return (
    <div className="flex justify-center items-center h-[100vh]">
      <Card className=" w-80 h-80 border-primary">
        <CardHeader>
          <CardTitle className="text-2xl">Forgot Password?</CardTitle>
          <CardDescription>Enter your email below</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col space-y-10">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                required
              />
            </div>
            <Button type="submit" className="w-full">
              Send Update password
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default Forgot_password;
