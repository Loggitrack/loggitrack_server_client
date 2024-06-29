"use client";

// Dashboard.js
import DashboardCard from "@components/DashboardCard";
import ListView from "@components/ListView";
import OrderCard from "@components/OrderCard";
import { useEffect, useState } from "react";
import { AppState } from "../../store";
import { useSelector } from "react-redux";

export default function Dashboard() {
  const [data, setData] = useState({
    stats: null,
    mostUsedUrls: [],
    mostUsedModels: [],
    events: [],
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  // const [serverUrl, setServerUrl] = useState(null);

  const serverUrl = useSelector((state: AppState) => state.serverUrl);

  console.log('dashboard serverurl', serverUrl);

  useEffect(() => {
    // if (typeof window !== "undefined") {
    //   const host = window.location.host;
    //   let domain = host.split(":")[0];
    //   setServerUrl(`http://${domain}:3020`);
    // }
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const [statsRes, urlsRes, modelsRes, eventsRes] = await Promise.all([
          fetch(`${serverUrl}/stats/requests`, { cache: "no-store" }),
          fetch(`${serverUrl}/request-log/distinct/urls`, {
            cache: "no-store",
          }),
          fetch(`${serverUrl}/model-changes/distinct/model`, {
            cache: "no-store",
          }),
          fetch(`${serverUrl}/model-changes/distinct/events`, {
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
