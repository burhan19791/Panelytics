"use client";

import CreateProductForm from "@/app/components/create-product.cmp";
import Title from "@/app/components/title.cmp";
import TopBar from "@/app/components/top-bar.cmp";
import EditProduct from "@/app/components/update-product.cmp";
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
