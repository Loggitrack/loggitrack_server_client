"use client";

// Dashboard.js
import DashboardCard from "@components/DashboardCard";
import ListView from "@components/ListView";
import OrderCard from "@components/OrderCard";
import { useEffect, useState } from "react";

export default function Dashboard() {
  const [data, setData] = useState({
    stats: null,
    mostUsedUrls: [],
    mostUsedModels: [],
    events: [],
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const [statsRes, urlsRes, modelsRes, eventsRes] = await Promise.all([
          fetch(`http://127.0.0.1:3020/stats/requests`, { cache: "no-store" }),
          fetch(`http://127.0.0.1:3020/request-log/distinct/urls`, {
            cache: "no-store",
          }),
          fetch(`http://127.0.0.1:3020/models-changes/distict/model`, {
            cache: "no-store",
          }),
          fetch(`http://127.0.0.1:3020/models-changes/distict/events`, {
            cache: "no-store",
          }),
        ]);

        const [stats, urls, models, events] = await Promise.all([
          statsRes.json(),
          urlsRes.json(),
          modelsRes.json(),
          eventsRes.json(),
        ]);

        if (!statsRes.ok || !urlsRes.ok || !modelsRes.ok || !eventsRes.ok) {
          throw new Error("Failed to fetch some data");
        }

        setData({ stats, mostUsedUrls: urls, mostUsedModels: models, events });
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 overflow-scroll">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        <OrderCard />
        <DashboardCard
          title="Total request logged"
          description="Total request logged"
          value={data?.stats?.total_requests}
        />
        <DashboardCard
          title="Total routes called"
          description="Total routes called"
          value={data.stats?.total_routes}
        />
        <DashboardCard
          title="Distinct connected users"
          description="Total distinct connected users"
          value={data.stats?.distinct_users}
        />
        <DashboardCard
          title="Active Sessions"
          description="Total active sessions"
          value={data.stats?.distinct_sessions}
        />

        {data.events &&
          data.events.map((event) => (
            <DashboardCard
              title={event?.event}
              description="Model change Events"
              value={event?.count}
            />
          ))}
      </div>

      <div className=" w-full mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2    ">
        {data.mostUsedUrls && (
          <ListView
            data={data.mostUsedUrls}
            headers={"Api Route"}
            title="Most used api route"
            className=""
          />
        )}
        {data.mostUsedModels && (
          <ListView
            data={data.mostUsedModels}
            headers={"Data Models"}
            title="Most used Data Models"
            className=""
          />
        )}
      </div>
    </main>
  );
}
