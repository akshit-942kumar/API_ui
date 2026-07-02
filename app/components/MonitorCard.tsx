
"use client";

import { useState } from "react";
import axios from "axios";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import {
  Globe,
  Timer,
  Trash2,
  Activity,
  FileText,
  Server
} from "lucide-react";

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

interface Monitor {
  _id: string;
  name: string;
  url: string;
  status: string;
  responseTime: number;
    statusCode: number | null;
}
const getStatusText = (code: number | null) => {
  if (code === null) return "No Response";

  const map: Record<number, string> = {
    200: "OK",
    201: "Created",
    204: "No Content",
    301: "Moved Permanently",
    302: "Found",
    400: "Bad Request",
    401: "Unauthorized",
    403: "Forbidden",
    404: "Not Found",
    429: "Too Many Requests",
    500: "Internal Server Error",
    502: "Bad Gateway",
    503: "Service Unavailable",
  };

  return `${code} ${map[code] || ""}`;
};
interface Log {
  _id: string;
  status: string;
  responseTime: number;
  checkedAt: string;
  statusCode:number|null
}

interface Props {
  monitor: Monitor;
  onDelete: (id: string) => void;
}

export default function MonitorCard({
  monitor,
  onDelete,
}: Props) {
  const isUp = monitor.status === "UP";

const isUnhealthy = monitor.status === "UNHEALTHY";
const isDown = monitor.status === "DOWN";
  const [logsOpen, setLogsOpen] = useState(false);
  const [logs, setLogs] = useState<Log[]>([]);
  const [loadingLogs, setLoadingLogs] = useState(false);

  const fetchLogs = async () => {
    try {
      setLoadingLogs(true);

      const token = localStorage.getItem("token");

      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/monitors/logs/${monitor._id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setLogs(res.data);
      setLogsOpen(true);
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingLogs(false);
    }
  };

  return (
    <Card
      className="
        bg-gradient-to-br
        from-slate-900
        via-indigo-950
        to-purple-950
        border border-indigo-500/20
        hover:border-cyan-400/50
        hover:shadow-[0_0_45px_rgba(99,102,241,0.3)]
        hover:-translate-y-2
        transition-all duration-300
        rounded-3xl
        overflow-hidden
      "
    >
      <CardContent className="p-6">

        {/* HEADER */}
        <div className="flex justify-between items-start">

          <div className="flex items-center gap-4">

            <div className="p-3 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10">
              <Globe className="h-6 w-6 text-cyan-300" />
            </div>

            <div>
              <h2 className="text-2xl font-extrabold bg-gradient-to-r from-cyan-300 to-violet-300 bg-clip-text text-transparent">
                {monitor.name}
              </h2>

              <p className="text-sm text-indigo-100 mt-1 break-all">
                {monitor.url}
              </p>
            </div>

          </div>

          <div
  className={`flex items-center gap-2 px-4 py-2 rounded-full border font-semibold text-sm
    ${
      isUp
        ? "bg-green-500/10 text-green-300 border-green-500/30"
        : isUnhealthy
        ? "bg-yellow-500/10 text-yellow-300 border-yellow-500/30"
        : "bg-red-500/10 text-red-300 border-red-500/30"
    }`}
>
  <span
    className={`h-3 w-3 rounded-full animate-pulse
      ${
        isUp
          ? "bg-green-400"
          : isUnhealthy
          ? "bg-yellow-400"
          : "bg-red-400"
      }`}
  />

  {monitor.status}
</div>

        </div>

        {/* METRICS */}
        <div className="grid md:grid-cols-3 gap-4 mt-8">

  {/* Response Time */}
  <div className="rounded-2xl bg-white/10 backdrop-blur-md border border-white/10 p-5 shadow-lg">

    <div className="flex items-center gap-2 text-indigo-100 text-sm">
      <Timer className="h-4 w-4" />
      Response Time
    </div>

    <p className="text-3xl font-bold text-white mt-3">
      {monitor.responseTime}
      <span className="text-base text-slate-300 ml-1">
        ms
      </span>
    </p>

  </div>

  {/* HTTP Status */}
  <div className="rounded-2xl bg-white/10 backdrop-blur-md border border-white/10 p-5 shadow-lg">

    <div className="flex items-center gap-2 text-indigo-100 text-sm">
      <Server className="h-4 w-4" />
      HTTP Status
    </div>

    <p
      className={`text-xl font-bold mt-3
        ${
          isUp
            ? "text-green-300"
            : isUnhealthy
            ? "text-yellow-300"
            : "text-red-300"
        }`}
    >
      {getStatusText(monitor.statusCode)}
    </p>

  </div>

  {/* Health */}
  <div className="rounded-2xl bg-white/10 backdrop-blur-md border border-white/10 p-5 shadow-lg">

    <div className="flex items-center gap-2 text-indigo-100 text-sm">
      <Activity className="h-4 w-4" />
      Health
    </div>

  <div className="flex justify-center mt-3">
  <p
    className={`text-2xl font-bold whitespace-nowrap
      ${
        isUp
          ? "text-green-300"
          : isUnhealthy
          ? "text-yellow-300"
          : "text-red-300"
      }`}
  >
    {isUp
      ? "Healthy"
      : isUnhealthy
      ? "Unhealthy"
      : "Offline"}
  </p>
</div>
  </div>

</div>
        {/* FOOTER */}
        <div className="flex justify-end gap-3 mt-8">

          {/* SHOW LOGS */}
          <Button
            onClick={fetchLogs}
            className="gap-2 rounded-xl bg-cyan-600 hover:bg-cyan-700"
          >
            <FileText className="h-4 w-4" />

            {loadingLogs
              ? "Loading..."
              : "Show Logs"}
          </Button>

          {/* LOGS POPUP */}
          <AlertDialog
            open={logsOpen}
            onOpenChange={setLogsOpen}
          >

            <AlertDialogContent
              className="
                max-w-2xl
                bg-slate-950
                border border-slate-800
                text-white
                max-h-[90vh]
                flex flex-col
              "
            >

              <AlertDialogHeader>
                <AlertDialogTitle>
                  {monitor.name} Logs
                </AlertDialogTitle>

                <AlertDialogDescription className="text-slate-400">
                  Recent monitoring history.
                </AlertDialogDescription>
              </AlertDialogHeader>

              <div className="flex-1 overflow-y-auto space-y-3 pr-2">

                {logs.length === 0 ? (
                  <p className="text-slate-400">
                    No logs found.
                  </p>
                ) : (
                  logs.map((log) => (
  <div
    key={log._id}
    className="flex justify-between items-center rounded-xl bg-slate-900 border border-slate-800 p-4"
  >
    <div>
      <p className="text-sm text-slate-400">
        {new Date(log.checkedAt).toLocaleString()}
      </p>

      <p
        className={`font-bold ${
          log.status === "UP"
            ? "text-green-400"
            : log.status === "UNHEALTHY"
            ? "text-yellow-400"
            : "text-red-400"
        }`}
      >
        {log.status}
      </p>
    </div>

    <div className="text-right">
      <p className="text-cyan-300 font-semibold">
        {log.responseTime} ms
      </p>

      <p className="text-sm text-slate-300 mt-1">
        HTTP {log.statusCode}
      </p>
    </div>
  </div>
))
                )}

              </div>

              <AlertDialogFooter className="mt-4 border-t border-slate-800 pt-4">
                <AlertDialogCancel
                  className="
                    bg-slate-800
                    text-white
                    border-slate-700
                    hover:bg-slate-700
                    hover:text-white
                  "
                >
                  Close
                </AlertDialogCancel>
              </AlertDialogFooter>

            </AlertDialogContent>

          </AlertDialog>

          {/* DELETE */}
          <AlertDialog>

            <AlertDialogTrigger asChild>
              <Button
                variant="destructive"
                className="gap-2 rounded-xl"
              >
                <Trash2 className="h-4 w-4" />
                Delete
              </Button>
            </AlertDialogTrigger>

            <AlertDialogContent className="bg-slate-900 border border-slate-800 text-white">

              <AlertDialogHeader>

                <AlertDialogTitle>
                  Delete Monitor?
                </AlertDialogTitle>

                <AlertDialogDescription className="text-slate-400">
                  Are you sure you want to delete
                  <span className="font-semibold text-white">
                    {" "}{monitor.name}
                  </span>
                  ? This action cannot be undone.
                </AlertDialogDescription>

              </AlertDialogHeader>

              <AlertDialogFooter>

                <AlertDialogCancel className="bg-slate-800 text-white border-slate-700 hover:bg-slate-700 hover:text-white">
                  Cancel
                </AlertDialogCancel>

                <AlertDialogAction
                  className="bg-red-600 hover:bg-red-700"
                  onClick={() =>
                    onDelete(monitor._id)
                  }
                >
                  Delete
                </AlertDialogAction>

              </AlertDialogFooter>

            </AlertDialogContent>

          </AlertDialog>

        </div>

      </CardContent>
    </Card>
  );
}

