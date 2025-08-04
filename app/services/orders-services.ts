import axios from "axios";

const BASE_URL = "http://localhost:5001"; // Your backend running on port 5001

// ✅ Create an order
export const createOrder = async ({
  customer_name,
  address,
  items,
}: {
  customer_name: string;
  address: string;
  items: { product_id: number; quantity: number }[];
}) => {
  const res = await axios.post(`${BASE_URL}/orders`, {
    customer_name,
    address,
    items,
  });
  return res.data;
};

// ✅ Get all orders
export const getAllOrders = async () => {
  const res = await axios.get(`${BASE_URL}/orders`);
  return res.data;
};

// ✅ Get a single order by ID
export const getOrderById = async (id: number) => {
  const res = await axios.get(`${BASE_URL}/orders/${id}`);
  return res.data; // { order, items }
};


