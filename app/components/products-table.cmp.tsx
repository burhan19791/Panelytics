"use client";

import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeadCell,
  TableRow,
} from "flowbite-react";
import { useEffect, useRef, useState } from "react";
import { FaSearch, FaStar } from "react-icons/fa";
import { IoChevronDown, IoEye, IoFilterSharp } from "react-icons/io5";
import { MdDelete, MdSort } from "react-icons/md";
import axios from "axios";
import { NotificationType, Product } from "@/types/type";
import { useRouter } from "next/navigation";
import { DeleteConfirmationModal } from "./delete-confirmation-modal.cmp";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import {
  deleteAllProducts,
  deleteProductById,
  fetchProducts,
} from "@/app/services/product-services";
import Image from "next/image";
import { useNotificationStore } from "@/app/stores/notificationStore";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Eye, MoreHorizontal, Pencil, Trash } from "lucide-react";
import { showDeleteAllToast } from "./toasts/delete-products-toast";
import { showDeleteToast } from "./toasts/delete-product-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

export function ProductsTable() {
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const [searchTerm, setSearchTerm] = useState("");
  const [showDeleteAllModal, setShowDeleteAllModal] = useState(false);
  const [showDeleteOneModal, setShowDeleteOneModal] = useState(false);
  const [availabilityFilter, setAvailabilityFilter] = useState("All");

  const [selectedProductId, setSelectedProductId] = useState<number | null>(
    null
  );

  const { addNotification } = useNotificationStore();
  const queryClient = useQueryClient();

  // ✅ Fetching Products
  const { data: products = [], isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });

  // ✅ Delete All Mutation
  const deleteAllMutation = useMutation({
    mutationFn: deleteAllProducts,
    onSuccess: () => {
      const notificationMessage = "Product deleted successfully!";
      const notificationType: NotificationType = "delete";
      const notificationId = crypto.randomUUID();
      const createdAt = new Date();

      showDeleteAllToast();

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

      queryClient.invalidateQueries({ queryKey: ["products"] });
      setShowDeleteAllModal(false);
    },
    onError: () => {
      toast.error("Failed to delete all products.");
    },
  });

  // ✅ Delete One Mutation
  const deleteOneMutation = useMutation({
    mutationFn: (id: number) => deleteProductById(id),
    onSuccess: () => {
      const notificationMessage = "Product deleted successfully!";
      const notificationType: NotificationType = "delete";
      const notificationId = crypto.randomUUID();
      const createdAt = new Date();

      showDeleteToast();

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

      queryClient.invalidateQueries({ queryKey: ["products"] });
      setShowDeleteOneModal(false);
    },
    onError: () => {
      toast.error("Failed to delete the product.");
    },
  });

  const handleDeleteAll = () => deleteAllMutation.mutate();
  const handleDeleteProduct = () => {
    if (selectedProductId) deleteOneMutation.mutate(selectedProductId);
  };

  const filteredProducts = products.filter((product) => {
    const matchesTitle = product.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    const matchesAvailability =
      availabilityFilter === "All" || product.availability === availabilityFilter;

    return matchesTitle && matchesAvailability;
  });

  return (
    <>
      <div className="flex items-center justify-end gap-2 mt-6">
        <Button
          size="xs"
          onClick={() => router.push("/create-product")}
          className="font-bold py-5 bg-blue-500 cursor-pointer hover:bg-blue-700 focus:ring-transparent"
        >
          Create Product
        </Button>
        <Button
          onClick={() => setShowDeleteAllModal(true)}
          size="xs"
          className="font-bold py-5 border bg-red-500 hover:bg-red-700 focus:ring-transparent"
        >
          Delete All
        </Button>
      </div>

      <div className="overflow-x-auto bg-white p-4 mt-4 rounded-lg">
        <div className="flex justify-between">
          <div className="w-60 h-9 bg-white border border-gray-200 rounded-lg flex mb-6 items-center pl-4 pr-2">
            <FaSearch className="text-xs text-gray-700" />
            <input
              ref={inputRef}
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="ml-2 text-sm bg-transparent outline-none w-full"
            />
          </div>
          <div className="flex items-center gap-4">
            <div className="mb-6">
              <Select onValueChange={(value) => setAvailabilityFilter(value)}>
                <SelectTrigger className="">
                  <SelectValue placeholder="Availability" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All">All</SelectItem>
                  <SelectItem value="In Stock">In Stock</SelectItem>
                  <SelectItem value="Low Stock">Low Stock</SelectItem>
                  <SelectItem value="Out of Stock">Out of Stock</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="h-9 bg-white border gap-2 border-gray-200 text-sm rounded-lg flex mb-6 items-center px-4">
              Filter <IoFilterSharp className="text-sm" />
            </div>
            <div className="h-9 bg-white border gap-2 border-gray-200 text-sm rounded-lg flex mb-6 items-center px-4">
              Sort <MdSort className="text-sm" />
            </div>
          </div>
        </div>

        <Table className="divide-y divide-gray-200">
          <TableHead>
            <TableRow>
              <TableHeadCell>Id</TableHeadCell>
              <TableHeadCell>Image</TableHeadCell>
              <TableHeadCell>Title</TableHeadCell>
              <TableHeadCell>Description</TableHeadCell>
              <TableHeadCell>Category</TableHeadCell>
              <TableHeadCell>Rating</TableHeadCell>
              <TableHeadCell>Price</TableHeadCell>
              <TableHeadCell>Availability</TableHeadCell>
              <TableHeadCell>Created At</TableHeadCell>
              <TableHeadCell></TableHeadCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredProducts.map((product) => (
              <TableRow key={product.id}>
                <TableCell className="py-6 font-medium">{product.id}</TableCell>
                <TableCell className="py-6">
                  {product.image && (
                    <Image
                      src={product.image}
                      alt={product.title}
                      width={60}
                      height={60}
                      className="object-cover rounded"
                    />
                  )}
                </TableCell>
                <TableCell className="py-6">{product.title}</TableCell>
                <TableCell className="py-6 max-w-14 truncate">
                  {product.description}
                </TableCell>
                <TableCell className="py-6">{product.category}</TableCell>
                <TableCell className="py-6 gap-2">
                  <span className="flex items-center gap-1">
                    {product.rating} <FaStar className="text-yellow-400" />
                  </span>
                </TableCell>
                <TableCell className="py-6">${product.price}</TableCell>
                <TableCell className="py-6">
                  <span
                    className={`rounded-md px-2.5 py-1.5 text-xs font-semibold text-nowrap ${
                      product.availability === "In Stock"
                        ? "bg-green-100 text-green-800"
                        : product.availability === "Low Stock"
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {product.availability}
                  </span>
                </TableCell>
                <TableCell className="py-6">
                  {new Date(product.created_at).toLocaleDateString()}
                </TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <button className="p-2 rounded-md hover:bg-muted transition">
                        <MoreHorizontal className="h-5 w-5" />
                      </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-36">
                      <DropdownMenuItem
                        onClick={() =>
                          router.push(`/product-view/${product.id}`)
                        }
                      >
                        <Eye className="mr-2 h-4 w-4 text-muted-foreground" />{" "}
                        View
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() =>
                          router.push(`/products/edit/${product.id}`)
                        }
                      >
                        <Pencil className="mr-2 h-4 w-4 text-muted-foreground" />{" "}
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => {
                          setSelectedProductId(product.id);
                          setShowDeleteOneModal(true);
                        }}
                        className="text-red-600 focus:text-red-600"
                      >
                        <Trash className="mr-2 h-4 w-4 text-red-600" /> Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Delete All Modal */}
      <DeleteConfirmationModal
        onClose={() => setShowDeleteAllModal(false)}
        show={showDeleteAllModal}
        onConfirm={handleDeleteAll}
        message="Are you sure you want to delete all products?"
      />

      {/* Delete One Modal */}
      <DeleteConfirmationModal
        show={showDeleteOneModal}
        onClose={() => setShowDeleteOneModal(false)}
        onConfirm={handleDeleteProduct}
        message="Are you sure you want to delete this product?"
      />
    </>
  );
}
