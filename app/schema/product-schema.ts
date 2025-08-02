import { z } from "zod";

const availabilityEnum = z.enum(["In Stock", "Out of Stock", "Low Stock"]);
const categoryEnum = z.enum(["Apparel", "Electronics", "Cosmetics"]);

export const productSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  price: z.number().min(0, "Price must be a positive number"),
  rating: z.number().min(0).max(5, "Rating must be between 0 and 5"),
  image: z.string(),
  availability: availabilityEnum,
  category: categoryEnum,
});

export type ProductFormValues = z.infer<typeof productSchema>;
