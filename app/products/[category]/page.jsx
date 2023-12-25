import { Suspense } from "react";
import ProductCard from "../../components/ProductCard";
import Loading from "@/app/loading";

export const metadata = {
  title: "Products in MensFit",
  description: "A Place for Fit & Comfortable Outfit | MensFit",
};

export default async function Home({ params: { category } }) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_URL}/api/products/${category}`,
    {
      next: {
        revalidate: 3000,
      },
    }
  );
  const products = await res.json();
  return (
    <main className="w-full flex flex-col items-center">
      {/* PRODUCTS DISPLAY */}
      <h1 className="my-6">{category.toUpperCase()}S</h1>
      <Suspense fallback={<Loading />}>
        <div className="w-full max-w-5xl flex flex-col items-center justify-center gap-5 md:flex-row flex-wrap">
          {products.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>
      </Suspense>
    </main>
  );
}
