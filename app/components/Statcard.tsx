"use client";

import { Card, CardContent } from "@/components/ui/card";

interface StatCardProps {
  title: string;
  value: number | string;
}

export default function StatCard({ title, value }: StatCardProps) {
  return (
   <Card
  className="
    rounded-2xl
    border border-white/10
    bg-white/5
    backdrop-blur-xl

    hover:bg-white/10
    hover:border-cyan-400/40
    hover:shadow-[0_0_25px_rgba(34,211,238,0.15)]

    transition-all duration-300
  "
>
      <CardContent className="p-4 flex flex-col gap-1">

        <p className="text-xs uppercase tracking-wider text-slate-400">
          {title}
        </p>

        <h2 className="text-2xl font-bold text-white">
          {value}
        </h2>

      </CardContent>
    </Card>
  );
}