import Navbar from "@/components/navbar";
import Sidebar from "@/components/sidebar";
import { getAPILimitCount } from "@/lib/api-limit";
import React from "react";

const DashboardLayout = async ({ children }: { children: React.ReactNode }) => {
  const apiLimitCount = await getAPILimitCount();
  return (
    <div className="relative h-full">
      <div className="md:w-72 h-full bg-gray-900 hidden md:flex md:flex-col md:fixed md:inset-y-0 z-[80]">
        <Sidebar apiLimitCount={apiLimitCount} />
      </div>

      <main className="md:pl-72">
        <Navbar />
        {children}
      </main>
    </div>
  );
};

export default DashboardLayout;
