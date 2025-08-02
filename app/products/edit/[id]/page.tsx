"use client";

import CreateProductForm from "@/components/create-product.cmp";
import Title from "@/components/title.cmp";
import TopBar from "@/components/top-bar.cmp";
import EditProduct from "@/components/update-product.cmp";
import { FaCartPlus } from "react-icons/fa";

const UpdateProduct = () => {
  return (
    <div className="ml-60 md:ml-64 p-8 sm:ml-16">
      <TopBar />
      <Title title="Update Product" Icon={FaCartPlus} />
      <EditProduct />
    </div>
  );
};

export default UpdateProduct;
