import { useNotificationStore } from "@/app/stores/notificationStore";
import {
  Bell,
  Info,
  CheckCircle,
  XCircle,
  Trash2,
  RefreshCcw,
} from "lucide-react";
import { useState } from "react";
import { FaRegBell } from "react-icons/fa";

export function NotificationBell() {
  const { notifications, unreadCount, resetUnreadCount } =
    useNotificationStore();
  const [open, setOpen] = useState(false);

  const toggleOpen = () => {
    setOpen(!open);
    if (!open) resetUnreadCount();
  };

  const getIcon = (type: string) => {
    const iconClass = "w-4 h-4 mr-2";
    switch (type) {
      case "success":
        return <CheckCircle className={`${iconClass} text-green-500`} />;
      case "error":
        return <XCircle className={`${iconClass} text-red-500`} />;
      case "info":
        return <Info className={`${iconClass} text-blue-500`} />;
      case "delete":
        return <Trash2 className={`${iconClass} text-rose-500`} />;
      case "update":
        return <RefreshCcw className={`${iconClass} text-yellow-500`} />;
      default:
        return <Info className={iconClass} />;
    }
  };

  return (
    <div className="relative">
      <button
        onClick={toggleOpen}
        className="relative p-2 rounded-full bg-white w-10 h-10 flex items-center justify-center hover:bg-gray-100 transition"
      >
        <FaRegBell />
        {unreadCount > 0 && (
          <span className="absolute top-0 right-0 inline-flex items-center justify-center px-1.5 py-0.5 text-xs font-bold text-white bg-red-600 rounded-full transform translate-x-1/2 -translate-y-1/2">
            {unreadCount}
          </span>
        )}
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-80 bg-white shadow-xl rounded-2xl p-2 max-h-96 overflow-y-auto z-50">
          {notifications.length === 0 ? (
            <div className="text-sm text-left text-gray-500 text-center p-4">
              No notifications
            </div>
          ) : (
            notifications.map((n) => (
              <div
                key={n.notificationId}
                className="flex items-start gap-2 p-3 rounded-xl hover:bg-gray-50 transition"
              >
                {getIcon(n.notificationType)}
                <div>
                  <p className="text-sm text-gray-800">
                    {n.notificationMessage}
                  </p>
                  <span className="text-xs text-gray-400">
                    {n.createdAt.toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}
