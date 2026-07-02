"use client";

import { useState } from "react";
import axios from "axios";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import toast from "react-hot-toast";

interface Props {
  onSuccess: () => void;
}

export default function AddMonitorModal({ onSuccess }: Props) {
  const [name, setName] = useState("");
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAdd = async ( ) => {
      if (!name.trim() || !url.trim()) {
    toast.error("Please fill all fields");
    return;
  }
  try {
    new URL(url);
  } catch {
   toast.error("Please enter a valid URL");
    return;
  }

    try {
      
      setLoading(true);
      const res=localStorage.getItem("token")

    await axios.post(
  `${process.env.NEXT_PUBLIC_API_URL}/api/monitors/addMonitor`,
  {
    name,
    url,
  },
  {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  }
);

toast.success("Monitor added successfully 🚀");

setName("");
setUrl("");

onSuccess();
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

 return (
  <div
    className="
      relative overflow-hidden
      rounded-3xl
      border border-cyan-500/20
      bg-gradient-to-br
      from-slate-900
      via-slate-950
      to-indigo-950

      p-8
      shadow-[0_0_40px_rgba(59,130,246,0.15)]
    "
  >
    {/* Glow */}
    <div className="absolute -top-16 -right-16 h-40 w-40 rounded-full bg-cyan-500/20 blur-3xl" />

    <div className="relative">

      {/* Heading */}
      <div className="mb-6">

        <h2 className="text-3xl font-extrabold bg-gradient-to-r from-cyan-300 to-violet-300 bg-clip-text text-transparent">
          Add New Monitor
        </h2>

        <p className="text-slate-400 mt-2">
          Monitor your APIs and websites in real time.
        </p>

      </div>

      {/* Form */}
      <div className="space-y-4">

        <Input
          placeholder="Monitor Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="
            h-12
            bg-white/5
            border-white/10
            text-white
            placeholder:text-slate-400
            focus-visible:ring-cyan-500
          "
        />

        <Input
          placeholder="https://example.com"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="
            h-12
            bg-white/5
            border-white/10
            text-white
            placeholder:text-slate-400
            focus-visible:ring-cyan-500
          "
        />

        <Button
          onClick={handleAdd}
          disabled={loading}
          className="
            w-full h-12
            rounded-xl

            bg-gradient-to-r
            from-cyan-500
            to-violet-600

            hover:from-cyan-400
            hover:to-violet-500

            text-white
            font-semibold
            text-base

            transition-all duration-300
          "
        >
          {loading ? "Adding Monitor..." : "Add Monitor"}
        </Button>

      </div>

    </div>
  </div>
);
}