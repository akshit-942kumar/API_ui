
"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";

import { ShieldCheck, Activity } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function VerifyOtpClient() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const email = searchParams.get("email");

  const [otp, setOtp] = useState<string>("");
  const [loading, setLoading] =
    useState<boolean>(false);

  const handleVerify = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    if (!email) {
      toast.error("Email not found");
      return;
    }

    try {
      setLoading(true);

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/auth/verify-otp`,
        {
          email,
          otp,
        }
      );

      toast.success(
        response.data.message ||
          "Account created successfully"
      );

      router.push("/login");
    } catch (error: any) {
      toast.error(
        error.response?.data?.message ||
          "OTP verification failed"
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
              Verify OTP
            </h1>

            <p className="text-slate-400 mt-2 text-center">
              Enter the 4-digit OTP sent to
            </p>

            <p className="text-cyan-400 font-medium mt-1">
              {email}
            </p>

          </div>

          {/* FORM */}
          <form
            onSubmit={handleVerify}
            className="space-y-6"
          >

            <div className="relative">

              <ShieldCheck className="absolute left-3 top-3.5 h-5 w-5 text-slate-400" />

              <Input
                type="text"
                maxLength={4}
                placeholder="Enter OTP"
                value={otp}
                onChange={(e) =>
                  setOtp(
                    e.target.value.replace(/\D/g, "")
                  )
                }
                className="pl-10 h-14 text-center tracking-[10px] text-2xl bg-slate-900/50 border-slate-700 text-white"
                required
              />

            </div>

            <Button
              type="submit"
              className="w-full h-12 text-base"
              disabled={loading}
            >
              {loading
                ? "Verifying..."
                : "Verify OTP"}
            </Button>

          </form>

        </CardContent>

      </Card>

    </main>
  );
}
