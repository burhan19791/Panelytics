"use client";

import { useForm } from "react-hook-form";
import { Label, TextInput, Textarea, Select, Button } from "flowbite-react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { RiArrowGoBackLine } from "react-icons/ri";
import { IoChevronBackOutline } from "react-icons/io5";
import toast from "react-hot-toast";
import { createProduct } from "@/app/services/product-services";
import { useMutation } from "@tanstack/react-query";
import { ProductFormValues, productSchema } from "@/app/schema/product-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { error } from "console";
import { showCreateSuccessToast } from "./toasts/create-product-toast";
import { useNotificationStore } from "@/app/stores/notificationStore";
import { NotificationType } from "@/types/type";

const CreateProductForm = () => {
  const router = useRouter();
  const { addNotification } = useNotificationStore();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ProductFormValues>({
    defaultValues: {
      title: "",
      description: "",
      image: "",
      price: 0,
      rating: 0,
    },
    resolver: zodResolver(productSchema),
  });

  const mutation = useMutation({
    mutationFn: createProduct,
    onSuccess: () => {
      const notificationMessage = "Product created successfully!";
      const notificationType: NotificationType = "success";
      const notificationId = crypto.randomUUID();
      const createdAt = new Date();

      showCreateSuccessToast();

      addNotification({
        notificationId,
        notificationMessage,
        notificationType,
        createdAt,
      });

      axios.post("http://localhost:5001/notifications", {
        notificationId,
        notificationMessage,
        notificationType,
        createdAt,
      });

      router.push("/products");
    },
    onError: (error) => {
      toast.error("Failed to create product");
      console.error("Error creating product:", error);
    },
  });

  const onSubmit = (data: ProductFormValues) => {
    mutation.mutate(data); // ✅ This line stays here
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mx-auto mt-8 bg-white p-8 rounded-lg shadow space-y-6"
    >
      <div
        className="font-bold flex items-center gap-1 cursor-pointer"
        onClick={() => router.push("/products")}
      >
        <IoChevronBackOutline />
        Back
      </div>
      {/* Row 1: Title */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <div className="mb-2 block">
            <Label className="font-bold" htmlFor="title">
              Product Title
            </Label>
          </div>
          <TextInput
            id="title"
            placeholder="Title"
            color={errors.title ? "failure" : "gray"} // this works in Flowbite
            {...register("title")}
          />
          {errors.title && (
            <p className="mt-1 text-sm text-red-600">{errors.title.message}</p>
          )}
        </div>
        <div>
          <div className="mb-2 block">
            <Label className="font-bold" htmlFor="title">
              Product Image
            </Label>
          </div>
          <TextInput
            id="image"
            placeholder="Imag Url"
            color={errors.title ? "failure" : "gray"} // this works in Flowbite
            {...register("image")}
          />
          {errors.title && (
            <p className="mt-1 text-sm text-red-600">{errors.title.message}</p>
          )}
        </div>
      </div>
      {/* Row 2: Description */}
      <div>
        <div className="mb-2 block">
          <Label className="font-bold" htmlFor="description">
            Product Description
          </Label>
        </div>
        <Textarea
          id="description"
          placeholder="Give product description..."
          color={errors.description ? "failure" : "gray"}
          rows={4}
          {...register("description", { required: true })}
        />
        {errors.description && (
          <p className="mt-1 text-sm text-red-600">
            {errors.description.message}
          </p>
        )}
      </div>

      {/* Row 3: Price & Rating */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <div className="mb-2 block">
            <Label className="font-bold" htmlFor="price">
              Product Price
            </Label>
          </div>
          <TextInput
            id="price"
            color={errors.price ? "failure" : "gray"}
            type="number"
            placeholder="Price"
            {...register("price", { valueAsNumber: true })}
          />
          {errors.price && (
            <p className="mt-1 text-sm text-red-600">{errors.price.message}</p>
          )}
        </div>

        <div>
          <div className="mb-2 block">
            <Label className="font-bold" htmlFor="rating">
              Product Rating
            </Label>
          </div>
          <TextInput
            id="rating"
            color={errors.rating ? "failure" : "gray"}
            type="number"
            placeholder="Rating"
            {...register("rating", { valueAsNumber: true })}
          />
          {errors.rating && (
            <p className="mt-1 text-sm text-red-600">{errors.rating.message}</p>
          )}
        </div>
      </div>

      {/* Row 4: Availability & Category */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <div className="mb-2 block">
            <Label className="font-bold" htmlFor="availability">
              Product Availability
            </Label>
          </div>
          <Select
            id="availability"
            {...register("availability", { required: true })}
          >
            {errors.availability && (
              <p className="mt-1 text-sm text-red-600">
                {errors.availability.message}
              </p>
            )}

            <option value="In Stock">In Stock</option>
            <option value="Out of Stock">Out of Stock</option>
            <option value="Low Stock">Low Stock</option>
          </Select>
        </div>

        <div>
          <div className="mb-2 block">
            <Label className="font-bold" htmlFor="category">
              Product Category
            </Label>
          </div>
          <Select id="category" {...register("category", { required: true })}>
            <option value="Apparel">Apparel</option>
            <option value="Electronics">Electronics</option>
            <option value="Cosmetics">Cosmetics</option>
          </Select>
        </div>
      </div>

      {/* Submit */}
      <div className="pt-4">
        <Button type="submit" className="bg-blue-500 hover:bg-blue-700">
          Submit Product
        </Button>
      </div>
    </form>
  );
};

export default CreateProductForm;
