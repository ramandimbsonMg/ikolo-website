import { useCart } from "@/pages/api/cart/use-cart";
import Image from "next/image";
import { AiOutlineShoppingCart } from "react-icons/ai";
import Link from "next/link";

export default function ProductCard({ product, onAdd }: any) {
  const { addToCart } = useCart();

  return (
    <div className="border rounded-2xl shadow-sm p-4 hover:shadow-lg transition bg-white">
      {/* Image cliquable */}
      <Link href={`/products/${product.slug}`}>
        <div className="w-full h-44 relative rounded-xl overflow-hidden cursor-pointer">
          <Image
            src={
              product.image
                ? `${product.image}`
                : "/assets/images/products/default.webp"
            }
            alt={product.name}
            fill
            style={{ objectFit: "cover" }}
          />
        </div>
      </Link>

      {/* Nom cliquable */}
      <Link href={`/products/${product.slug}`}>
        <h4 className="mt-3 font-semibold text-green-700 hover:underline cursor-pointer">
          {product.name}
        </h4>
      </Link>

      <p className="text-sm text-gray-600 mt-1 line-clamp-2">
        {product.description}
      </p>

      <div className="flex items-center justify-between mt-4">
        <div className="font-bold">{product.price.toLocaleString()} Ar</div>
        <button
          onClick={() =>
            addToCart({
              id: product.id,
              name: product.name,
              price: product.price,
              image: product.image,
              quantity: 1,
            })
          }
          className="bg-primary text-white p-2 rounded-full hover:bg-primary-dark transition flex items-center gap-1"
        >
          <AiOutlineShoppingCart size={18} />
        </button>
      </div>
    </div>
  );
}
