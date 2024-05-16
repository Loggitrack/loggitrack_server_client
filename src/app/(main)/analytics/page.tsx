"use client";

import { useEffect, useState } from "react";
import { Bar, Pie, Line, Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement
);

export default function Analytics() {
  const [endpointUsageData, setEndpointUsageData] = useState([]);
  const [httpMethodsData, setHttpMethodsData] = useState([]);
  const [responseTimesData, setResponseTimesData] = useState([]);
  const [statusCodesData, setStatusCodesData] = useState([]);
  const [errorTypesData, setErrorTypesData] = useState([]);
  const [failedRequestsData, setFailedRequestsData] = useState([]);

  useEffect(() => {
    async function fetchEndpointUsage() {
      const response = await fetch("http://localhost:3020/api-usage/endpoints");
      const data = await response.json();
      setEndpointUsageData(data);
    }

    async function fetchHTTPMethods() {
      const response = await fetch(
        "http://localhost:3020/api-usage/http-methods"
      );
      const data = await response.json();
      setHttpMethodsData(data);
    }

    async function fetchResponseTimes() {
      const response = await fetch(
        "http://localhost:3020/performance/response-times"
      );
      const data = await response.json();
      setResponseTimesData(data);
    }

    async function fetchStatusCodes() {
      const response = await fetch("http://localhost:3020/status-codes");
      const data = await response.json();
      setStatusCodesData(data);
    }

    async function fetchErrorTypes() {
      const response = await fetch("http://localhost:3020/errors/types");
      const data = await response.json();
      setErrorTypesData(data);
    }

    async function fetchFailedRequests() {
      const response = await fetch(
        "http://localhost:3020/errors/failed-requests"
      );
      const data = await response.json();
      setFailedRequestsData(data);
    }

    fetchEndpointUsage();
    fetchHTTPMethods();
    fetchResponseTimes();
    fetchStatusCodes();
    fetchErrorTypes();
    fetchFailedRequests();
  }, []);

  const endpointUsageLabels = endpointUsageData.map((item) => item._id);
  const endpointUsageCounts = endpointUsageData.map((item) => item.count);

  const httpMethodsLabels = httpMethodsData.map((item) => item._id);
  const httpMethodsCounts = httpMethodsData.map((item) => item.count);

  const responseTimesLabels = responseTimesData.map((item) => item._id);
  const responseTimesValues = responseTimesData.map(
    (item) => item.avgResponseTime
  );

  const statusCodesLabels = statusCodesData.map((item) => item._id);
  const statusCodesCounts = statusCodesData.map((item) => item.count);

  const errorTypesLabels = errorTypesData.map((item) => item._id);
  const errorTypesCounts = errorTypesData.map((item) => item.count);

  const endpointUsageChartData = {
    labels: endpointUsageLabels,
    datasets: [
      {
        label: "Endpoint Usage",
        data: endpointUsageCounts,
        backgroundColor: "rgba(54, 162, 235, 0.2)",
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 1,
      },
    ],
  };

  const httpMethodsChartData = {
    labels: httpMethodsLabels,
    datasets: [
      {
        label: "HTTP Methods",
        data: httpMethodsCounts,
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const responseTimesChartData = {
    labels: responseTimesLabels,
    datasets: [
      {
        label: "Response Times",
        data: responseTimesValues,
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
        fill: true,
      },
    ],
  };

  const statusCodesChartData = {
    labels: statusCodesLabels,
    datasets: [
      {
        label: "Status Codes",
        data: statusCodesCounts,
        backgroundColor: [
          "rgba(75, 192, 192, 0.2)",
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
        ],
        borderColor: [
          "rgba(75, 192, 192, 1)",
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const errorTypesChartData = {
    labels: errorTypesLabels,
    datasets: [
      {
        label: "Error Types",
        data: errorTypesCounts,
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        borderColor: "rgba(255, 99, 132, 1)",
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    maintainAspectRatio: false,
  };

  return (
    <main className="flex flex-col items-center justify-between p-4 w-full ">
      <div className="w-full  mx-auto grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className=" p-4  rounded-lg shadow col-span-2">
          <h1 className="text-xl font-semibold mb-4">API Endpoint Usage</h1>
          <div className="w-full h-64">
            <Bar data={endpointUsageChartData} options={chartOptions} />
          </div>
        </div>

        <div className=" p-4 rounded-lg shadow">
          <h1 className="text-xl font-semibold mb-4">
            HTTP Methods Distribution
          </h1>
          <div className="w-full h-64">
            <Pie data={httpMethodsChartData} options={chartOptions} />
          </div>
        </div>

        <div className=" p-4 rounded-lg shadow">
          <h1 className="text-xl font-semibold mb-4">
            Status Codes Distribution
          </h1>
          <div className="w-full h-64">
            <Doughnut data={statusCodesChartData} options={chartOptions} />
          </div>
        </div>

        <div className=" p-4 rounded-lg shadow col-span-2">
          <h1 className="text-xl font-semibold mb-4">Response Times</h1>
          <div className="w-full h-64">
            <Line data={responseTimesChartData} options={chartOptions} />
          </div>
        </div>

        <div className=" p-4 rounded-lg shadow">
          <h1 className="text-xl font-semibold mb-4">Error Types</h1>
          <div className="w-full h-64">
            <Bar data={errorTypesChartData} options={chartOptions} />
          </div>
        </div>

        <div className=" p-4 rounded-lg shadow col-span-1 md:col-span-2">
          <h1 className="text-xl font-semibold mb-4">Failed Requests</h1>
          <div className="overflow-auto">
            <table className="min-w-full  border">
              <thead>
                <tr>
                  <th className="py-2 px-4 border-b">Endpoint</th>
                  <th className="py-2 px-4 border-b">Status Code</th>
                  <th className="py-2 px-4 border-b">Error</th>
                </tr>
              </thead>
              <tbody>
                {failedRequestsData.map((request, index) => (
                  <tr key={index}>
                    <td className="py-2 px-4 border-b">{request.url}</td>
                    <td className="py-2 px-4 border-b">
                      {request.response_status_code}
                    </td>
                    <td className="py-2 px-4 border-b">
                      {request.response_data?.message}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </main>
  );
}
