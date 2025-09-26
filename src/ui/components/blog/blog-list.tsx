"use client";

import BlogCard from "./blog-card";

export default function BlogList({ posts }: any) {
  return (
    <section className="mt-12 mx-auto max-w-8xl">
      <h1 className="text-4xl font-extrabold text-primary text-center">
        📰 Blog
      </h1>
      {posts.length > 0 ? (
        <div className="grid lg:grid-cols-4 grid-cols-1 gap-6">
          {posts.map((p: any) => (
            <BlogCard key={p.id} post={p} />
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500 mt-12">
          Aucun article publié pour le moment. 🌱
        </p>
      )}
    </section>
  );
}
