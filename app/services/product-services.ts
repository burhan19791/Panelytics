import { Product, ProductFormValues } from "@/types/type";
import axios from "axios";

const BASE_URL = "http://localhost:5001/products";
const API_URL = "http://localhost:5001/products";

export const createProduct = async (productData: ProductFormValues) => {
  const res = await axios.post("http://localhost:5001/products", productData);
  return res.data;
};

export const fetchProducts = async (): Promise<Product[]> => {
  const res = await axios.get<Product[]>(API_URL);
  return res.data;
};

export const deleteAllProducts = async (): Promise<void> => {
  await axios.delete(API_URL);
};

export const deleteProductById = async (id: number): Promise<void> => {
  await axios.delete(`${API_URL}/${id}`);
};

export const getProductById = async (id: string) => {
  const res = await axios.get<Product>(`${BASE_URL}/${id}`);
  return res.data;
};

export const updateProduct = async (id: string, data: Product) => {
  const res = await axios.put(`${BASE_URL}/${id}`, data);
  return res.data;
};
