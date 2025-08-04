import axios from "axios";

const BASE_URL = "http://localhost:5001/dashboard";

export const getTotalProducts = async () => {
  const res = await axios.get(`${BASE_URL}/products`);
  return res.data.totalProducts;
};

export const getTotalOrders = async () => {
  const res = await axios.get(`${BASE_URL}/orders`);
  return res.data.totalOrders
};

export const getTotalProfit = async ()=>{
    const res = await axios.get(`${BASE_URL}/profit`)
}