// src/ui/components/products/product-card.tsx
import { useCart } from "@/pages/api/cart/use-cart";
import Image from "next/image";
import { AiOutlineShoppingCart } from "react-icons/ai";

export default function ProductCard({ product, onAdd }: any ) {
  const { addToCart, cartCount } = useCart();

  const handleAdd = () => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: 1,
    });
    alert(`${product.name} ajouté au panier !`);
  };

  return (
    <div className="border rounded-2xl shadow-sm p-4 hover:shadow-lg transition bg-white">
      <div className="w-full h-44 relative rounded-xl overflow-hidden">
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

      <h4 className="mt-3 font-semibold text-green-700">{product.name}</h4>
      <p className="text-sm text-gray-600 mt-1">{product.description}</p>
      <div className="flex items-center justify-between mt-4">
        <div className="font-bold">{product.price.toLocaleString()} Ar</div>
        <button
          onClick={() => addToCart({ ...product, quantity: 1 })}
          className="bg-primary text-white p-2 rounded-full hover:bg-primary-dark transition flex items-center gap-1"
        >
          <AiOutlineShoppingCart size={18} />
        </button>
      </div>
    </div>
  );
}
