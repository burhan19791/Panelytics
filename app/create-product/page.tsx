"use client";

import CreateProductForm from "@/app/components/create-product.cmp";
import Title from "@/app/components/title.cmp";
import TopBar from "@/app/components/top-bar.cmp";
import { FaCartPlus } from "react-icons/fa";

const CreateProduct = () => {
  return (
    <div className="ml-60 md:ml-64 p-8 sm:ml-16">
      <TopBar />
      <Title title="Create Product" Icon={FaCartPlus} />
      <CreateProductForm />
    </div>
  );
};

export default CreateProduct;
