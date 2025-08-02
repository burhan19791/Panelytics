"use client";

import { ProductsTable } from "@/components/products-table.cmp";
import Title from "@/components/title.cmp";
import TopBar from "@/components/top-bar.cmp";
import React from "react";
import { FaShoppingCart } from "react-icons/fa";
import { TbLayoutDashboardFilled } from "react-icons/tb";

const Products = () => {
  return (
    <div className="ml-60 md:ml-64 p-8 sm:ml-16">
      <TopBar />
      <Title title="Products" Icon={FaShoppingCart} />
      <ProductsTable />
    </div>
  );
};

export default Products;
