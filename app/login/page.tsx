
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Link from "next/link";
import toast from "react-hot-toast";
import { signIn } from "next-auth/react";

import { Mail, Lock, Activity } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (
    e: React.SyntheticEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    try {
      setLoading(true);

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/auth/login`,
        {
          email,
          password,
        }
      );

      localStorage.setItem(
        "token",
        response.data.token
      );
      console.log("token:",response)

      toast.success("Login successful 🚀");

      router.push("/dashboard");
    } catch (error: any) {
      toast.error(
        error.response?.data?.message ||
          "Login failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 flex items-center justify-center p-4">

      <Card className="w-full max-w-md border-slate-700 bg-white/10 backdrop-blur-xl shadow-2xl">

        <CardContent className="p-8">

          <div className="flex flex-col items-center mb-8">

            <div className="p-4 rounded-full bg-primary/20 mb-4">
              <Activity className="h-10 w-10 text-white" />
            </div>

            <h1 className="text-3xl font-bold text-white">
              API Monitor
            </h1>

            <p className="text-slate-400 mt-2">
              Sign in to your account
            </p>

          </div>

          <form
            onSubmit={handleLogin}
            className="space-y-5"
          >

            <div className="relative">

              <Mail className="absolute left-3 top-3.5 h-5 w-5 text-slate-400" />

              <Input
                type="email"
                placeholder="Email"
                className="pl-10 h-12 bg-slate-900/50 border-slate-700 text-white"
                value={email}
                onChange={(e) =>
                  setEmail(e.target.value)
                }
                required
              />

            </div>

            <div className="relative">

              <Lock className="absolute left-3 top-3.5 h-5 w-5 text-slate-400" />

              <Input
                type="password"
                placeholder="Password"
                className="pl-10 h-12 bg-slate-900/50 border-slate-700 text-white"
                value={password}
                onChange={(e) =>
                  setPassword(e.target.value)
                }
                required
              />

            </div>

            <Button
              type="submit"
              className="w-full h-12 text-base"
              disabled={loading}
            >
              {loading ? "Signing In..." : "Sign In"}
            </Button>

          </form>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-slate-700" />
            </div>

            <div className="relative text-w flex justify-center text-xs uppercase">
              <span className="bg-transparent px-2 text-slate-400">
                Or continue with
              </span>
            </div>
          </div>

          <Button
  type="button"
  variant="outline"
  className="w-full h-12  bg-gray-900 hover:bg-gray-400 text-white"
  onClick={() =>
    signIn("google", {
      callbackUrl: "/google-callback",
    })
  }
>
  <img
    src="https://cdn-icons-png.flaticon.com/128/300/300221.png"
    alt="Google"
    className="h-5 w-5 mr-2"
  />
  Continue with Google
</Button>
<div className="mt-6 text-center text-slate-400"> Don't have an account?{" "} <Link href="/signup" className="text-cyan-400 hover:underline" > Sign Up </Link> </div>
        </CardContent>

      </Card>

    </main>
  );
}

