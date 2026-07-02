
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Link from "next/link";
import toast from "react-hot-toast";
import { signIn } from "next-auth/react";

import {
  Mail,
  Lock,
  User,
  Activity,
} from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function SignupPage() {
  const router = useRouter();

  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] =
    useState<string>("");

  const [loading, setLoading] =
    useState<boolean>(false);

  const handleSignup = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    try {
      setLoading(true);

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/auth/signup`,
        {
          name,
          email,
          password,
        }
      );

      toast.success(
        response.data.message ||
          "OTP sent successfully"
      );

      router.push(
        `/verify-otp?email=${email}`
      );
    } catch (error: any) {
      toast.error(
        error.response?.data?.message ||
          "Signup failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 flex items-center justify-center p-4">

      <Card className="w-full max-w-md border-slate-700 bg-white/10 backdrop-blur-xl shadow-2xl">

        <CardContent className="p-8">

          {/* HEADER */}
          <div className="flex flex-col items-center mb-8">

            <div className="p-4 rounded-full bg-primary/20 mb-4">
              <Activity className="h-10 w-10 text-white" />
            </div>

            <h1 className="text-3xl font-bold text-white">
              Create Account
            </h1>

            <p className="text-slate-400 mt-2">
              Sign up to continue
            </p>

          </div>

          {/* FORM */}
          <form
            onSubmit={handleSignup}
            className="space-y-5"
          >

            {/* NAME */}
            <div className="relative">
              <User className="absolute left-3 top-3.5 h-5 w-5 text-slate-400" />

              <Input
                type="text"
                placeholder="Name"
                className="pl-10 h-12 bg-slate-900/50 border-slate-700 text-white"
                value={name}
                onChange={(e) =>
                  setName(e.target.value)
                }
                required
              />
            </div>

            {/* EMAIL */}
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

            {/* PASSWORD */}
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
              {loading
                ? "Sending OTP..."
                : "Sign Up"}
            </Button>

          </form>

          {/* DIVIDER */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-slate-700" />
            </div>

            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-transparent px-2 text-slate-400">
                Or continue with
              </span>
            </div>
          </div>

          {/* GOOGLE SIGNUP */}
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

          {/* LOGIN LINK */}
          <div className="mt-6 text-center text-slate-400">
            Already have an account?{" "}
            <Link
              href="/login"
              className="text-cyan-400 hover:underline"
            >
              Login
            </Link>
          </div>

        </CardContent>

      </Card>

    </main>
  );
}

