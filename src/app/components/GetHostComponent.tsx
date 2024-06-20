import React from "react";
import { headers } from "next/headers";

function GetHostComponent() {
  const headersList = headers();
  const host = headersList.get("host");

  console.log("Host : ", host);

  if (typeof window !== "undefined") {
    localStorage.setItem("host", host);
    let domain = host.split(":")[0];
    localStorage.setItem("domain", domain);
    localStorage.setItem("serverUrl", `http://${domain}:3020`);
  }

  return <div></div>;
}

export default GetHostComponent;
