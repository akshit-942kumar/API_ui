"use client";

import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function GoogleCallbackPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    const generateToken = async () => {
      console.log("Status:", status);
      console.log("Session:", session);

      if (status !== "authenticated") return;

      try {
        const res = await axios.post(
          `http://localhost:5001/api/auth/google-login`,
          {
            email: session?.user?.email,
            name: session?.user?.name,
          }
        );

        // console.log("Backend Response:", res.data);

        localStorage.setItem("token", res.data.token);

        // console.log(
        //   "Stored token:",
        //   localStorage.getItem("token")
        // );

        router.push("/dashboard");
      } catch (error) {
        console.log("Google login error:", error);
      }
    };

    generateToken();
  }, [session, status]);

  return <div>Signing you in...</div>;
}