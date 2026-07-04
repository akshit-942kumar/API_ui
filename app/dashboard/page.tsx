
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import axios from "axios";
import { Activity } from "lucide-react";

import AddMonitorModal from "../components/AddMonitorModel";
import Navbar from "../components/Navbar";
import StatCard from "../components/Statcard";
import MonitorCard from "../components/MonitorCard";
import Footer from "../components/Footer";


interface Monitor {
  _id: string;
  name: string;
  url: string;
  status: string;
  responseTime: number;
  statusCode:number|null;
  lastEmailSent?:string;
}

export default function DashboardPage() {
  const router = useRouter();
  const { data: session, status } = useSession();
// const [email,setEmail]=useState<String>("");
  const [monitors, setMonitors] = useState<Monitor[]>([]);
  const [loading, setLoading] = useState(true);
// console.log("monitors:",monitors);

  const fetchMonitors = async () => {
     console.count("fetchMonitors");

    const token = localStorage.getItem("token");
// console.log("localstorage token:",token)
    if (!token) {
      setLoading(false);
        router.push("/login");
      return;
    }

    try {

// console.log("Dashboard token:", token);
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/monitors/getMonitors`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      
     

      setMonitors(res.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };
async function downServices() {
console.log("chrcking down");
const token = localStorage.getItem("token");
const response= await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/profile`,
        {
           headers: {
            Authorization: `Bearer ${token}`,
          },

        }
      )
  for (const monitor of monitors) {
  if (monitor.status !== "DOWN") continue;

  const ONE_DAY = 24 * 60 * 60 * 1000;

  if (
    !monitor.lastEmailSent ||
    Date.now() - new Date(monitor.lastEmailSent).getTime() > ONE_DAY
  ) {
    await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/api/notifications/sendNotification`,
      {
        email: response.data.email,
        monitorName: monitor.name,
        url: monitor.url,
        status: "DOWN",
        message: `${monitor.name} is DOWN`,
      }
    );

    await axios.patch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/monitors/lastEmail/${monitor._id}`,
      {
        lastEmailSent: new Date(),
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  }
}
}
useEffect(() => {
  if (monitors.length > 0) {
    console.log("Calling downServices");
    downServices();
  }
}, [monitors]);
  const deleteMonitor = async (id: string) => {
    try {
      const token = localStorage.getItem("token");

      await axios.delete(
        `${process.env.NEXT_PUBLIC_API_URL}/api/monitors/deleteMonitor/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      fetchMonitors();
    } catch (err) {
      console.log(err);
    }
  };

  
  useEffect(() => {
    if (status === "loading") return;

    const token = localStorage.getItem("token");
// console.log("token:",token)
    if (!token && !session) {
      router.push("/login");
      return;
    }

    fetchMonitors();
  }, [session, status, router]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    // console.log("console token:",token);
    
    if (!token) return;

    const interval = setInterval(() => {
      fetchMonitors();
    }, 30000);

    return () => clearInterval(interval);
  }, []);
useEffect(() => {
   console.log("Mounted");
}, []);
  if (status === "loading") {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center text-white text-xl">
        Loading Dashboard...
      </div>
    );
  }

  const total = monitors.length; 
const up = monitors.filter(
  (m) => m.status === "UP"
).length;

const unhealthy = monitors.filter(
  (m) => m.status === "UNHEALTHY"
).length;

const down = monitors.filter(
  (m) => m.status === "DOWN"
).length;

  const avgResponse =
    monitors.length > 0
      ? monitors.reduce(
          (acc, m) => acc + m.responseTime,
          0
        ) / monitors.length
      : 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white">

      <Navbar />

      <div className="max-w-7xl mx-auto px-6 py-8 space-y-8">

        {/* HERO SECTION */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">

          <div>
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-cyan-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent">
              Dashboard
            </h1>

            <p className="text-slate-400 text-lg mt-3">
              Monitor and track your APIs in real time.
            </p>
          </div>

          <AddMonitorModal onSuccess={fetchMonitors} />

        </div>

        {/* GOOGLE WARNING */}
        {!localStorage.getItem("token") && (
          <div className="rounded-2xl border border-yellow-500/20 bg-yellow-500/10 p-5 text-yellow-300 backdrop-blur-md">
            You are signed in using Google. API management currently requires a backend JWT.
          </div>
        )}

        {/* STATS */}
       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5">

          <StatCard
            title="Total Monitors"
            value={total}
          />

          <StatCard
            title="Healthy"
            value={up}
          />
          <StatCard
  title="Unhealthy"
  value={unhealthy}
/>
          <StatCard
            title="Down"
            value={down}
          />

          <StatCard
            title="Avg Response"
            value={`${Math.round(avgResponse)} ms`}
          />

        </div>

        {/* MONITORS SECTION */}
        <div className="space-y-6">

          <div className="flex items-center gap-3">
            <Activity className="h-6 w-6 text-cyan-400" />

            <h2 className="text-2xl font-bold">
              Active Monitors
            </h2>
          </div>

          {loading ? (
            <div className="flex justify-center py-20">
              <p className="text-slate-400 text-lg">
                Loading monitors...
              </p>
            </div>
          ) : monitors.length === 0 ? (
            <div className="rounded-3xl border border-slate-800 bg-slate-900/50 backdrop-blur-md p-16 text-center">

              <div className="flex justify-center mb-5">
                <Activity className="h-16 w-16 text-slate-600" />
              </div>

              <h3 className="text-2xl font-semibold">
                No Monitors Yet
              </h3>

              <p className="text-slate-400 mt-3">
                Start monitoring your first API by adding a monitor.
              </p>

            </div>
          ) : (
            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
              {monitors.map((monitor) => (
                <MonitorCard
                  key={monitor._id}
                  monitor={monitor}
                  onDelete={deleteMonitor}
                />
              ))}
            </div>
          )}

        </div>

      </div>
      <Footer/>
    </div>
  );
}

