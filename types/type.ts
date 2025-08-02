// types.ts
export type Product = {
  id: number;
  title: string;
  description: string;
  availability: "In Stock" | "Low Stock" | "Out Of Stock";
  rating: number;
  category: string;
  price: number;
  image?: string;
  created_at: Date;
};

export type Availability = "In Stock" | "Low Stock" | "Out of Stock";

export type ProductFormValues = {
  title: string;
  description: string;
  price: number;
  rating: number;
  availability: Availability;
  category: string;
  image?: string;
};

export type NotificationType =
  | "success"
  | "info"
  | "error"
  | "update"
  | "delete";

export type Notification = {
  notificationId: string;
  notificationMessage: string;
  notificationType: NotificationType;
  createdAt: Date;
};

export type NotificationStore = {
  notifications: Notification[];
  unreadCount: number;
  addNotification: (notification: {
    notificationId: string;
    notificationMessage: string;
    notificationType: NotificationType;
    createdAt: Date;
  }) => void;

  resetUnreadCount: () => void;
};
