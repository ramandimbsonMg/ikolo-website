// src/components/ProductCard.tsx
import Image from "next/image";
import Link from "next/link";
export default function ProductCard({ product }: { product: any }) {
  return (
    <div className="border rounded-2xl shadow-sm p-4 hover:shadow-lg transition">
      <div className="w-full h-44 relative rounded-xl overflow-hidden">
        <Image
          src={product.image || "/products/default.jpg"}
          alt={product.name}
          fill
          style={{ objectFit: "cover" }}
        />
      </div>

      <h4 className="mt-3 font-semibold">{product.name}</h4>
      <p className="text-sm text-gray-600 mt-1">{product.description}</p>
      <div className="flex items-center justify-between mt-4">
        <div className="font-bold">{product.price.toLocaleString()} Ar</div>
        <Link href={`/shop?product=${product.id}`}>
            Commander
        
        </Link>
      </div>
    </div>
  );
}
