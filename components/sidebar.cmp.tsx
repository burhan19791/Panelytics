"use client";

import { useState } from "react";
import { TbLayoutDashboard, TbLayoutDashboardFilled } from "react-icons/tb";
import {
  MdOutlineShoppingCart,
  MdLogout,
  MdShoppingCart,
} from "react-icons/md";
import { IoStatsChart, IoStatsChartOutline } from "react-icons/io5";
import { useRouter } from "next/navigation";

const sidebarItems = [
  {
    id: "dashboard",
    label: "Dashboard",
    iconOutline: <TbLayoutDashboard className="text-xl" />,
    iconFilled: <TbLayoutDashboardFilled className="text-xl" />,
  },
  {
    id: "products",
    label: "Products",
    iconOutline: <MdOutlineShoppingCart className="text-xl" />,
    iconFilled: <MdShoppingCart className="text-xl" />,
  },
  {
    id: "statistics",
    label: "Statistics",
    iconOutline: <IoStatsChartOutline className="text-xl" />,
    iconFilled: <IoStatsChart className="text-xl" />,
  },
];

export default function Sidebar() {
  const [active, setActive] = useState("dashboard");
  const router = useRouter();

  return (
    <div className="h-screen bg-white px-2 md:px-8 py-4 flex flex-col w-16 md:w-64 transition-all">
      {/* Logo */}
      <div className="text-2xl font-semibold mb-6 ml-1 hidden md:block mt-4">
        Panelytics
      </div>

      {/* Items */}
      <div className="flex-1 space-y-2 text-gray-700">
        {sidebarItems.map((item) => (
          <div
            key={item.id}
            onClick={() => {
              setActive(item.id);
              router.push("../products");
            }}
            className={`
              flex items-center gap-2 px-3 py-2 rounded cursor-pointer transition
              ${
                active === item.id
                  ? "bg-blue-500 text-white"
                  : "hover:bg-gray-100"
              }
              justify-center md:justify-start
            `}
          >
            <div className="text-xl min-w-[1.5rem] flex justify-center">
              {active === item.id ? item.iconFilled : item.iconOutline}
            </div>
            <span className="hidden md:inline font-medium">{item.label}</span>
          </div>
        ))}
      </div>

      {/* Logout */}
      <div className="text-gray-600 flex items-center gap-2 cursor-pointer hover:bg-gray-100 px-3 py-2 rounded mt-8 justify-center md:justify-start">
        <MdLogout className="text-xl" />
        <span className="hidden md:inline">Logout</span>
      </div>
    </div>
  );
}
