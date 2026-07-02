"use client";

import Link from "next/link";
import { useState,useEffect } from "react";
import {
  Activity,
  Bell,
  ShieldCheck,
  Timer,
  BarChart3,
  Globe,
} from "lucide-react";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { Button } from "@/components/ui/button";

export default function HomePage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

useEffect(() => {
  const token = localStorage.getItem("token");
  setIsLoggedIn(!!token);
}, []);
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 text-white">

      <Navbar />

      {/* HERO */}
      <section className="max-w-7xl mx-auto px-6 py-24">

        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* LEFT */}

          <div>

            <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-4 py-2 text-cyan-300 mb-6">

              <Activity className="h-4 w-4" />

              API Monitoring Platform

            </div>

            <h1 className="text-5xl lg:text-6xl font-extrabold leading-tight">

              Monitor your APIs

              <span className="block bg-gradient-to-r from-cyan-400 to-violet-400 bg-clip-text text-transparent">

                in Real Time

              </span>

            </h1>

            <p className="mt-8 text-lg text-slate-300 leading-8">

              Track uptime, response time, receive instant email alerts
              and monitor all your APIs from one beautiful dashboard.

            </p>

            <div className="flex gap-4 mt-10">

             <Link href={isLoggedIn ? "/dashboard" : "/signup"}>
  <Button className="h-12 px-8 bg-cyan-500 hover:bg-cyan-600">
    {isLoggedIn ? "Go to Dashboard" : "Get Started"}
  </Button>
</Link>

              {!isLoggedIn && (
  <Link href="/login">
    <Button
      variant="outline"
      className="h-12 px-8 border-slate-700 bg-slate-900 hover:bg-slate-800"
    >
      Login
    </Button>
  </Link>
)}

            </div>

          </div>

          {/* RIGHT */}

          <div>

            <div className="rounded-3xl border border-slate-800 bg-slate-900/70 backdrop-blur-xl p-8 shadow-2xl">

              <h2 className="text-xl font-bold mb-6">
                Dashboard Preview
              </h2>

              <div className="space-y-4">

                <div className="flex justify-between rounded-xl bg-slate-800 p-4">

                  <span>User Service</span>

                  <span className="text-green-400 font-semibold">
                    UP
                  </span>

                </div>

                <div className="flex justify-between rounded-xl bg-slate-800 p-4">

                  <span>Payment API</span>

                  <span className="text-green-400 font-semibold">
                    143 ms
                  </span>

                </div>

                <div className="flex justify-between rounded-xl bg-slate-800 p-4">

                  <span>Email Service</span>

                  <span className="text-red-400 font-semibold">
                    DOWN
                  </span>

                </div>

              </div>

            </div>

          </div>

        </div>

      </section>

      {/* FEATURES */}

      <section className="max-w-7xl mx-auto px-6 pb-24">

        <h2 className="text-4xl font-bold text-center mb-14">

          Everything you need

        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

          <FeatureCard
            icon={<Globe className="h-8 w-8 text-cyan-400" />}
            title="Real-Time Monitoring"
            desc="Continuously monitor your APIs and websites."
          />

          <FeatureCard
            icon={<Timer className="h-8 w-8 text-cyan-400" />}
            title="Response Time"
            desc="Measure latency and monitor performance."
          />

          <FeatureCard
            icon={<Bell className="h-8 w-8 text-cyan-400" />}
            title="Email Alerts"
            desc="Receive instant downtime notifications."
          />

          <FeatureCard
            icon={<BarChart3 className="h-8 w-8 text-cyan-400" />}
            title="Logs"
            desc="View monitoring history and response logs."
          />

          <FeatureCard
            icon={<ShieldCheck className="h-8 w-8 text-cyan-400" />}
            title="Secure Login"
            desc="Email authentication and Google Sign-In."
          />

          <FeatureCard
            icon={<Activity className="h-8 w-8 text-cyan-400" />}
            title="Beautiful Dashboard"
            desc="Manage all monitors from one place."
          />

        </div>

      </section>

      {/* CTA */}

      <section className="px-6 pb-24">

        <div className="max-w-5xl mx-auto rounded-3xl bg-gradient-to-r from-cyan-600 to-violet-700 p-12 text-center">

          <h2 className="text-4xl font-bold">

            Ready to monitor your APIs?

          </h2>

          <p className="mt-5 text-cyan-100">

            Create your account and start tracking your services in minutes.

          </p>

          <Link href={isLoggedIn ? "/dashboard" : "/signup"}>
  <Button className="mt-8 bg-white text-slate-900 hover:bg-slate-200 px-8 h-12">
    {isLoggedIn ? "Open Dashboard" : "Start Monitoring"}
  </Button>
</Link>

        </div>

      </section>

      <Footer />

    </main>
  );
}

function FeatureCard({
  icon,
  title,
  desc,
}: {
  icon: React.ReactNode;
  title: string;
  desc: string;
}) {
  return (
    <div className="rounded-3xl border border-slate-800 bg-slate-900/70 p-8 hover:border-cyan-500 transition">

      {icon}

      <h3 className="text-2xl font-bold mt-6">
        {title}
      </h3>

      <p className="mt-3 text-slate-400">
        {desc}
      </p>

    </div>
  );
}