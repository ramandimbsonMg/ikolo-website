// src/components/BlogCard.tsx
import Link from "next/link";
import Image from "next/image";

export default function BlogCard({ post }: { post: any }) {
  return (
    <article className="border rounded-xl overflow-hidden shadow-sm">
      <div className="relative h-48 w-full">
        <Image
          src={post.image || "/plants/hero.jpg"}
          alt={post.title}
          fill
          style={{ objectFit: "cover" }}
        />
      </div>
      <div className="p-4">
        <h4 className="font-semibold">{post.title}</h4>
        <p className="text-sm text-gray-600 mt-2">{post.excerpt}</p>
        <div className="mt-3">
          <Link href={`/blog/${post.slug}`}>
            <a className="text-ikoloGreen font-medium">Lire</a>
          </Link>
        </div>
      </div>
    </article>
  );
}
