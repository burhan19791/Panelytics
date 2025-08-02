import { getProductById } from "@/app/services/product-services";
import Image from "next/image";
import { notFound } from "next/navigation";

export default async function ProductView({
  params,
}: {
  params: { id: string };
}) {
  const product = await getProductById(params.id);

  if (!product) return notFound();

  return (
    <div className="outer px-6 py-10 grid grid-cols-1 md:grid-cols-2 gap-10">
      <div className="w-full aspect-square relative">
        {product?.image && (
          <Image
            src={product.image}
            alt="Product image"
            width={500}
            height={500}
          />
        )}
      </div>
      <div className="space-y-4">
        <h1 className="text-3xl font-semibold">{product.title}</h1>
        <p className="text-xl text-gray-800 font-medium">${product.price}</p>
        <p className="text-sm text-gray-600">{product.description}</p>
        <p className="text-sm text-gray-500">
          <span className="font-medium">Category:</span> {product.category}
        </p>
        <p className="text-sm text-gray-500">
          <span className="font-medium">Availability:</span>{" "}
          {product.availability}
        </p>
        <p className="text-sm text-gray-500">
          <span className="font-medium">Rating:</span> {product.rating}
        </p>
      </div>
    </div>
  );
}
