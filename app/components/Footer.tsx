"use client";

import Link from "next/link";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import {
  Activity,
 
  Mail,
} from "lucide-react";
export default function Footer() {
  return (
    <footer className="relative border-t border-white/10 bg-slate-950">

      {/* Glow */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-500/60 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 py-14">

        <div className="grid md:grid-cols-4 gap-10">

          {/* Brand */}
          <div>

            <div className="flex items-center gap-3">

              <div className="p-2 rounded-xl bg-cyan-500/10 border border-cyan-500/20">
                <Activity className="h-6 w-6 text-cyan-400" />
              </div>

              <h2 className="text-2xl font-bold bg-gradient-to-r from-cyan-300 to-violet-300 bg-clip-text text-transparent">
                API Monitor
              </h2>

            </div>

            <p className="mt-5 text-slate-400 leading-7">
              Monitor your APIs in real time with uptime tracking,
              response analytics, detailed logs and instant email
              notifications.
            </p>

          </div>

          {/* Quick Links */}
          <div>

            <h3 className="text-white font-semibold mb-5">
              Quick Links
            </h3>

            <div className="flex flex-col gap-3 text-slate-400">

              <Link
                href="/"
                className="hover:text-cyan-400 transition"
              >
                Home
              </Link>

              <Link
                href="/login"
                className="hover:text-cyan-400 transition"
              >
                Login
              </Link>

              <Link
                href="/signup"
                className="hover:text-cyan-400 transition"
              >
                Sign Up
              </Link>

              <Link
                href="/dashboard"
                className="hover:text-cyan-400 transition"
              >
                Dashboard
              </Link>

            </div>

          </div>

          {/* Features */}
          <div>

            <h3 className="text-white font-semibold mb-5">
              Features
            </h3>

            <div className="flex flex-col gap-3 text-slate-400">

              <span>Real-Time Monitoring</span>

              <span>Response Analytics</span>

              <span>Email Notifications</span>

              <span>Health Logs</span>

              <span>Google Authentication</span>

            </div>

          </div>

          {/* Contact */}
          <div>

            <h3 className="text-white font-semibold mb-5">
              Connect
            </h3>

            <div className="space-y-4">

              <a
                href="akshitkumar0880@email.com"
                className="flex items-center gap-3 text-slate-400 hover:text-cyan-400 transition"
              >
                <Mail className="h-5 w-5" />
                Contact
              </a>

              <a
                href="https://github.com/akshit-942kumar"
                target="_blank"
                className="flex items-center gap-3 text-slate-400 hover:text-cyan-400 transition"
              >
                <FaGithub className="h-5 w-5" />
                GitHub
              </a>

              <a
                href="https://linkedin.com/"
                target="_blank"
                className="flex items-center gap-3 text-slate-400 hover:text-cyan-400 transition"
              >
                <FaLinkedin className="h-5 w-5" />
                LinkedIn
              </a>

            </div>

          </div>

        </div>

        {/* Bottom */}

        <div className="border-t border-white/10 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">

          <p className="text-slate-500 text-sm">
            © {new Date().getFullYear()} API Monitor. All rights reserved.
          </p>

          {/* <p className="text-slate-500 text-sm">
            Built with Next.js • Express.js • MongoDB • Node.js
          </p> */}

        </div>

      </div>

    </footer>
  );
}