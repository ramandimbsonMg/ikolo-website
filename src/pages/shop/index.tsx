import { prisma } from "@/lib/prisma";
import ProductCard from "@/ui/components/products/product-card";
import { Seo } from "@/ui/components/seo/seo";
import { Layout } from "@/ui/components/layout/layout";
import { Container } from "@/ui/components/container/container";
import { useState } from "react";
import { useCart } from "../api/cart/use-cart";
import { AiOutlineClose } from "react-icons/ai";

export default function Shop({ products }: { products: any[] }) {
  const {
    cart,
    addToCart,
    removeFromCart,
    removeFinal,
    clearCart,
    cartTotal,
    saveCartToDB,
  } = useCart();
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !address || cart.length === 0) {
      alert(
        "Veuillez remplir tous les champs et avoir des produits dans le panier !"
      );
      return;
    }

    await saveCartToDB(); // enregistre la commande

    alert(`✅ Commande enregistrée :
Nom : ${name}
Adresse : ${address}
Produits : ${cart.map((p) => `${p.name} x${p.quantity}`).join(", ")}
Total : ${cartTotal.toLocaleString()} Ar`);

    clearCart();
    setName("");
    setAddress("");
  };

  return (
    <>
      <Seo
        title="Ikolo | Boutique"
        description="Produits cosmétiques naturels"
      />
      <Layout isDisplayBreakCrumbs={false}>
        <Container>
          <h1 className="text-4xl font-bold text-center text-primary my-8">
            🌿 Boutique Ikolo
          </h1>

          {/* Panier */}
          {cart.length > 0 && (
            <div className="mt-16 bg-white/80 backdrop-blur-md p-6 rounded-2xl shadow-xl max-w-2xl mx-auto">
              <h2 className="text-2xl font-semibold mb-4">🛒 Votre panier</h2>
              <ul className="space-y-3">
                {cart.map((item) => (
                  <li
                    key={item.id}
                    className="flex justify-between items-center bg-gray-100 p-3 rounded-lg"
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={
                          item.image || "/assets/images/products/default.webp"
                        }
                        alt={item.name}
                        className="w-12 h-12 object-cover rounded"
                      />
                      <span>{item.name}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span>
                        {item.quantity} x {item.price.toLocaleString()} Ar
                      </span>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="px-2 text-2xl"
                      >
                        -
                      </button>
                      {item.pendingRemove && (
                        <button
                          onClick={() => removeFinal(item.id)}
                          className="px-2 text-red-600"
                        >
                          Supprimer définitivement
                        </button>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
              <div className="mt-4 flex justify-between font-bold text-lg">
                <span>Total :</span>
                <span>{cartTotal.toLocaleString()} Ar</span>
              </div>

              <form onSubmit={handleSubmit} className="mt-6 grid gap-4">
                <input
                  type="text"
                  placeholder="Nom complet"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full p-3 border rounded-lg"
                  required
                />
                <input
                  type="text"
                  placeholder="Adresse de livraison"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full p-3 border rounded-lg"
                  required
                />
                <button
                  type="submit"
                  className="w-full bg-primary text-white py-3 rounded-lg font-medium hover:bg-primary-dark transition"
                >
                  Valider la commande
                </button>
              </form>
            </div>
          )}

          {/* Liste des produits */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mt-12">
            {products.map((p) => (
              <ProductCard
                key={p.id}
                product={p}
                onAdd={() =>
                  addToCart({
                    id: p.id,
                    name: p.name,
                    price: p.price,
                    image: p.image,
                    quantity: 1,
                  })
                }
              />
            ))}
          </div>
        </Container>
      </Layout>
    </>
  );
}

// Récupération des produits côté serveur
export async function getServerSideProps() {
  const products = await prisma.product.findMany({
    orderBy: { createdAt: "desc" },
  });
  return { props: { products: JSON.parse(JSON.stringify(products)) } };
}
