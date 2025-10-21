"use client";

import Stats from "../components/stats";
import { ArrowUpRight } from "lucide-react";
import { getUserSession } from "../lib/sessionStorageUtils";

export default function Dashboard() {
  const user = getUserSession();

  return (
    <div className="p-6">
      <div>
        <h2 className="mb-3 text-3xl font-semibold md:mb-4 md:text-4xl lg:mb-6">
          Dashboard
        </h2>
        <p className="group flex items-center gap-1 text-sm md:text-base lg:text-lg">
          Email: {user.email}
        </p>
        <p className="group flex items-center gap-1 text-sm md:text-base lg:text-lg">
          Username: {user.username}
        </p>
        <p className="group flex items-center gap-1 text-sm md:text-base lg:text-lg">
          Id: {user.id?.toLocaleUpperCase()}
        </p>
      </div>
    </div>
  );
}
