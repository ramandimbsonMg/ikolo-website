// src/components/Footer.tsx
import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-secondary/30 mt-12">
      <div className="container mx-auto px-6 py-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <Link href="/" className="flex items-center gap-3">
            <Image
              src="/assets/images/logo/logo_ikolo~2.png"
              alt="Ikolo"
              width={80}
              height={80}
              className="rounded-full object-cover"
            />
          </Link>

          <p className="text-sm mt-2">
            Beauté enracinée dans la nature malgache
          </p>
        </div>

        <div>
          <h4 className="font-semibold">Liens</h4>
          <ul className="mt-2 text-sm">
            <li>
              <Link href="/products">Produits</Link>
            </li>
            <li>
              <Link href="/shop">Boutique</Link>
            </li>
            <li>
              <Link href="/blog">Actualités</Link>
            </li>
            <li>
              <Link href="/contact">Contact</Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold">Contact</h4>
          <p className="text-sm mt-2">contact@ikolo.mg</p>
          <p className="text-sm">Madagascar</p>
        </div>
      </div>

      <div className="border-t border-gray-800">
        <div className="container mx-auto px-6 py-4 text-center text-sm text-gray-600">
          © {new Date().getFullYear()} Ikolo. Mentions légales · Crédits
        </div>
      </div>
    </footer>
  );
}
