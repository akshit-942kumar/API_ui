
"use client";

import Link from "next/link";
import { Activity, LogOut,Home } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect,useState } from "react";
import { Button } from "@/components/ui/button";

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
  const [isLoggedIn, setIsLoggedIn] = useState(false);

useEffect(() => {
  setIsLoggedIn(!!localStorage.getItem("token"));
}, []);
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/");
  };

  return (
    <nav className="sticky top-0 z-50 border-b border-white/10 bg-slate-950/70 backdrop-blur-xl">

      <div className="max-w-7xl mx-auto h-20 px-6 flex items-center justify-between">

        {/* Logo */}
        <Link
          href="/dashboard"
          className="flex items-center gap-3"
        >
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
{isLoggedIn &&(
    <AlertDialog>

          <AlertDialogTrigger asChild>
            <Button
              variant="outline"
              className="
                border-red-500/30
                bg-red-500/10
                text-red-300
                hover:bg-red-500
                hover:text-white
                transition-all
              "
            >
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </Button>
          </AlertDialogTrigger>

          <AlertDialogContent className="bg-slate-950 border border-slate-800 text-white">

            <AlertDialogHeader>

              <AlertDialogTitle>
                Are you sure?
              </AlertDialogTitle>

              <AlertDialogDescription className="text-slate-400">
                You will be logged out from your account and will need to sign in again.
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


)}
</div>
        {/* Logout */}
      
      </div>

    </nav>
  );
}

