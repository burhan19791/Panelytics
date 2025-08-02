"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import Title from "@/app/components/title.cmp";
import TopBar from "@/app/components/top-bar.cmp";
import { FaEdit } from "react-icons/fa";
import {
  Label,
  TextInput,
  Textarea,
  Select,
  Button,
  Spinner,
} from "flowbite-react";
import { NotificationType, Product } from "@/types/type";
import { IoChevronBackOutline } from "react-icons/io5";
import { getProductById, updateProduct } from "@/app/services/product-services";
import { showUpdateToast } from "./toasts/update-product-toast";
import { useNotificationStore } from "@/app/stores/notificationStore";

const EditProduct = () => {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;
  const { addNotification } = useNotificationStore();

  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { isSubmitting },
  } = useForm<Product>();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    const fetchProduct = async () => {
      try {
        const data = await getProductById(id);
        const fields: (keyof Product)[] = [
          "title",
          "image",
          "description",
          "price",
          "rating",
          "availability",
          "category",
        ];
        fields.forEach((field) => setValue(field, data[field]));
      } catch (err) {
        console.error("Failed to load product", err);
        // Optionally show an error toast
      } finally {
        setLoading(false); // 🔑 always stop loading spinner
      }
    };

    fetchProduct();
  }, [id, setValue]);

  const onSubmit = async (data: Product) => {
    const notificationMessage = "Product updated successfully!";
    const notificationType: NotificationType = "update";
    const notificationId = crypto.randomUUID(); // ✅ Use a separate name
    const createdAt = new Date();

    try {
      await updateProduct(id, data); // ✅ your update service
      showUpdateToast(); // ✅ custom toast after successful update
      addNotification({
        notificationId,
        notificationMessage,
        notificationType,
        createdAt,
      });

      router.push("/products"); // ✅ navigate back to products
    } catch (err) {
      console.error("Update failed", err);
      // Optional: show an error toast here too
    }
  };

  if (loading) {
    return (
      <div className="text-center mt-10">
        <Spinner size="lg" />
        <p>Loading product...</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 mt-8">
      <div className="mx-auto mt-8 bg-white p-8 rounded-lg shadow space-y-6">
        <div
          className="font-bold flex items-center gap-1 cursor-pointer"
          onClick={() => router.push("/products")}
        >
          <IoChevronBackOutline />
          Back
        </div>
        {/* Title */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Label className="font-bold" htmlFor="title">
              Product Title
            </Label>
            <TextInput id="title" {...register("title")} required />
          </div>
          <div>
            <Label className="font-bold" htmlFor="image">
              Product Image
            </Label>
            <TextInput id="image" {...register("image")} required />
          </div>
        </div>

        {/* Description */}
        <div>
          <Label className="font-bold" htmlFor="description">
            Product Description
          </Label>
          <Textarea id="description" {...register("description")} rows={4} />
        </div>

        {/* Price + Rating */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Label className="font-bold" htmlFor="price">
              Product Price
            </Label>
            <TextInput
              id="price"
              type="number"
              step="0.01"
              {...register("price")}
              required
            />
          </div>

          <div>
            <Label className="font-bold" htmlFor="rating">
              Product Rating
            </Label>
            <TextInput
              id="rating"
              type="number"
              step="0.1"
              {...register("rating")}
            />
          </div>
        </div>

        {/* Category + Availability */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Label className="font-bold" htmlFor="availability">
              Product Availability
            </Label>
            <Select
              id="availability"
              {...register("availability")}
              defaultValue={watch("availability")}
            >
              <option value="in-stock">In Stock</option>
              <option value="out-of-stock">Out of Stock</option>
              <option value="low-stock">Low Stock</option>
            </Select>
          </div>
          <div>
            <Label className="font-bold" htmlFor="category">
              Product Category
            </Label>
            <Select id="category" {...register("category")}>
              <option value="apparel">Apparel</option>
              <option value="electronics">Electronics</option>
              <option value="cosmetics">Cosmetics</option>
            </Select>
          </div>
        </div>

        <Button
          type="submit"
          disabled={isSubmitting}
          className="font-bold py-2 px-4 bg-blue-600 hover:bg-blue-700"
        >
          {isSubmitting ? (
            <>
              <Spinner size="sm" className="mr-2" />
              Submitting...
            </>
          ) : (
            "Submit"
          )}
        </Button>
      </div>
    </form>
  );
};

export default EditProduct;
