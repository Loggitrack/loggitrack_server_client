// "use client";

import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@components/ui/table";
import { Badge } from "@components/ui/badge";
import { CalendarIcon } from "lucide-react";
import { useSelector } from "react-redux";
import { AppState } from "../../../store";

async function getData(id: any) {
  const serverUrl = useSelector((state: AppState) => state.serverUrl.serverUrl);
  const res = await fetch(`${serverUrl}/request-log/${id}`, {
    cache: "no-store",
  });
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

async function RequestDetail({ params }: any) {
  const request = await getData(params.id);
  const {
    id,
    timestamp,
    method,
    url,
    protocol,
    headers,
    body,
    query_parameters,
    remote_address,
    user_id,
    request_id,
    referrer,
    cookies,
    content_length,
    origin,
    is_secure,
    api_version,
    application_name,
    client_type,
    environment,
    additional_info,
    auth_token,
    response_time,
    response_status_code,
    response_data,
  } = request;

  const formatTimestamp = (timestamp: any) => {
    const date = new Date(timestamp);
    return date.toLocaleString();
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2">
        <CalendarIcon className="h-5 w-5 text-gray-400" />
        <p className="text-lg font-medium">{formatTimestamp(timestamp)}</p>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Key</TableHead>
            <TableHead>Value</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>{id}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Method</TableCell>
            <TableCell>{method}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>URL</TableCell>
            <TableCell>{url}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Protocol</TableCell>
            <TableCell>{protocol}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Headers</TableCell>
            <TableCell>
              {Object.entries(headers).map(([key, value]) => (
                <div key={key}>
                  <strong>{key}:</strong> {(value as any).join(", ")}
                </div>
              ))}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Body</TableCell>
            <TableCell>{JSON.stringify(body)}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Query Parameters</TableCell>
            <TableCell>{query_parameters}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Remote Address</TableCell>
            <TableCell>{remote_address}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>User ID</TableCell>
            <TableCell>{user_id}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Request ID</TableCell>
            <TableCell>{request_id}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Referrer</TableCell>
            <TableCell>{referrer}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Cookies</TableCell>
            <TableCell>
              {cookies &&
                Object.entries(cookies).map(([key, value]) => (
                  <div key={key}>
                    <strong>{key}:</strong> {value as any}
                  </div>
                ))}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Content Length</TableCell>
            <TableCell>{content_length}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Origin</TableCell>
            <TableCell>{origin}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Is Secure</TableCell>
            <TableCell>
              <Badge variant={is_secure ? "secondary" : "outline"}>
                {is_secure ? "Yes" : "No"}
              </Badge>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>API Version</TableCell>
            <TableCell>{api_version}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Application Name</TableCell>
            <TableCell>{application_name}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Client Type</TableCell>
            <TableCell>{client_type}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Environment</TableCell>
            <TableCell>{environment}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Additional Info</TableCell>
            <TableCell>{additional_info}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Auth Token</TableCell>
            <TableCell>{auth_token}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Response Time</TableCell>
            <TableCell>{response_time}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Response Status Code</TableCell>
            <TableCell>
              <Badge
                variant={
                  response_status_code.toString().startsWith("2")
                    ? "secondary"
                    : "outline"
                }
              >
                {response_status_code}
              </Badge>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Response Data</TableCell>
            <TableCell>{JSON.stringify(response_data)}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
}

export default RequestDetail;
