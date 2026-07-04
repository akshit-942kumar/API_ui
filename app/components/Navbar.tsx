"use client";

import Link from "next/link";
import {
  Activity,
  Home,
  LogOut,
  Settings,
  Trash2,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";

import { Button } from "@/components/ui/button";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

export default function Navbar() {
  const router = useRouter();

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    setIsLoggedIn(!!localStorage.getItem("token"));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    router.push("/");
  };

  const deleteUser = async () => {
    try {
      const token = localStorage.getItem("token");

      await axios.delete(
        `${process.env.NEXT_PUBLIC_API_URL}/api/auth/deleteUser`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      

      localStorage.removeItem("token");
      setIsLoggedIn(false);

      router.push("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <nav className="sticky top-0 z-50 border-b border-white/10 bg-slate-950/70 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto h-20 px-6 flex items-center justify-between">
        {/* Logo */}
        <Link href="/dashboard" className="flex items-center gap-3">
          <div className="p-3 rounded-2xl bg-gradient-to-r from-cyan-500 to-indigo-600 shadow-lg">
            <Activity className="h-6 w-6 text-white" />
          </div>

          <div>
            <h1 className="text-2xl font-extrabold bg-gradient-to-r from-cyan-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent">
              API Monitor
            </h1>

            <p className="text-xs text-slate-400">
              Real-time Monitoring
            </p>
          </div>
        </Link>

        <div className="flex items-center gap-3">
          {/* Home Button */}
          <Link href="/">
            <Button
              variant="outline"
              className="
                border-cyan-500/30
                bg-cyan-500/10
                text-cyan-300
                hover:bg-cyan-500
                hover:text-white
              "
            >
              <Home className="mr-2 h-4 w-4" />
              Home
            </Button>
          </Link>

          {isLoggedIn && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  className="
                    border-slate-700
                    bg-slate-900
                    hover:bg-slate-800
                  "
                >
                  <Settings className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>

              <DropdownMenuContent
                align="end"
                className="w-56 bg-slate-950 border border-slate-800 text-white"
              >
                {/* Logout */}
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                      <LogOut className="mr-2 h-4 w-4" />
                      Logout
                    </DropdownMenuItem>
                  </AlertDialogTrigger>

                  <AlertDialogContent className="bg-slate-950 border border-slate-800 text-white">
                    <AlertDialogHeader>
                      <AlertDialogTitle>
                        Logout?
                      </AlertDialogTitle>

                      <AlertDialogDescription className="text-slate-400">
                        Are you sure you want to logout?
                      </AlertDialogDescription>
                    </AlertDialogHeader>

                    <AlertDialogFooter>
                      <AlertDialogCancel className="bg-slate-800 border-slate-700 text-white hover:bg-slate-700">
                        Cancel
                      </AlertDialogCancel>

                      <AlertDialogAction
                        onClick={handleLogout}
                        className="bg-red-600 hover:bg-red-700"
                      >
                        Logout
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>

                {/* Delete Account */}
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <DropdownMenuItem
                      onSelect={(e) => e.preventDefault()}
                      className="text-red-400"
                    >
                      <Trash2 className="mr-2 h-4 w-4" />
                      Delete Account
                    </DropdownMenuItem>
                  </AlertDialogTrigger>

                  <AlertDialogContent className="bg-slate-950 border border-slate-800 text-white">
                    <AlertDialogHeader>
                      <AlertDialogTitle>
                        Delete Account?
                      </AlertDialogTitle>

                      <AlertDialogDescription className="text-slate-400">
                        This action cannot be undone. Your account and all your
                        monitors will be permanently deleted.
                      </AlertDialogDescription>
                    </AlertDialogHeader>

                    <AlertDialogFooter>
                      <AlertDialogCancel className="bg-slate-800 border-slate-700 text-white hover:bg-slate-700">
                        Cancel
                      </AlertDialogCancel>

                      <AlertDialogAction
                        onClick={deleteUser}
                        className="bg-red-600 hover:bg-red-700"
                      >
                        Delete Account
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </div>
    </nav>
  );
}