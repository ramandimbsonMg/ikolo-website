// src/components/BlogCard.tsx
import Link from "next/link";
import Image from "next/image";

export default function BlogCard({ post }: { post: any }) {
  return (
    <article className="border rounded-xl overflow-hidden shadow-sm hover:shadow-md transition bg-white">
      {/* Image si elle existe */}
      {post.image ? (
        <div className="relative h-48 w-full">
          <Image
            src={post.image}
            alt={post.title}
            fill
            style={{ objectFit: "cover" }}
            className="rounded-t-xl"
          />
        </div>
      ) : (
        // <div className="h-48 w-full bg-gray-100 rounded-t-xl" /> // juste un espace vide
        <div></div>
      )}

      <div className="p-4">
        <h4 className="font-semibold text-lg">{post.title}</h4>
        {post.excerpt && (
          <p className="text-sm text-gray-600 mt-2">{post.excerpt}</p>
        )}
        <div className="mt-3">
          <Link
            href={`/blog/${post.slug}`}
            className="text-ikoloGreen font-medium hover:underline"
          >
            Lire
          </Link>
        </div>
      </div>
    </article>
  );
}
