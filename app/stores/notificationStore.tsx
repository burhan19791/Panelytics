import { NotificationStore, NotificationType } from "@/types/type";
import { create } from "zustand";

export const useNotificationStore = create<NotificationStore>((set) => ({
  notifications: [],
  unreadCount: 0,
  addNotification: (notification) =>
    set((state) => ({
      notifications: [notification, ...state.notifications],
      unreadCount: state.unreadCount + 1,
    })),
  resetUnreadCount: () => set({ unreadCount: 0 }),
}));
