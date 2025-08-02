"use client";

import React, { useState, useRef, useEffect } from "react";
import { FaCalendar, FaRegBell, FaSearch } from "react-icons/fa";
import { NotificationBell } from "./notification/notification-bell";

const TopBar = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const currentDate = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  useEffect(() => {
    if (isSearchOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isSearchOpen]);

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <p className="text-xl font-normal ">Welcome back, User</p>
      </div>

      <div className="flex items-center gap-4">
        {/* Search Button (Collapsed) */}
        {!isSearchOpen && (
          <div
            onClick={() => setIsSearchOpen(true)}
            className="w-10 h-10 bg-white rounded-full flex items-center justify-center cursor-pointer transition-all duration-300 ease-in-out"
          >
            <FaSearch className="text-xs text-gray-700" />
          </div>
        )}

        {/* Search Input (Expanded) */}
        {isSearchOpen && (
          <div className="w-60 h-10 bg-white border border-gray-200 rounded-full flex items-center pl-4 pr-2 transition-all duration-300 ease">
            <FaSearch className="text-xs text-gray-700" />
            <input
              ref={inputRef}
              type="text"
              placeholder="Search..."
              className="ml-2 text-sm bg-transparent outline-none w-full"
            />
            <div
              onClick={() => setIsSearchOpen(false)}
              className="cursor pointer w-5 h-5 text-sm"
            >
              ✕
            </div>
          </div>
        )}

        <NotificationBell />
        <div className="w-px rounded-b-lg h-6 bg-gray-400" />
        <div className="flex items-center gap-2">
          <div className="rounded-full w-10 h-10 bg-gray-500"></div>
          <div>
            <div className="text-sm font-bold mb-4 leading-0">Burhan Shah</div>
            <div className="text-gray-500 text-xs tracking-wide leading-0">
              OWNER
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
