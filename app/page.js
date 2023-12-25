import { getServerSession } from "next-auth";
import ProductCard from "./components/ProductCard";
import { authOptions } from "./api/auth/[...nextauth]/route";
import { Suspense } from "react";
import Loading from "./loading";

export const metadata = {
  title: "MensFit",
  description: "A Place for Fit & Comfortable Outfit | MensFit",
};

export default async function Home({ params: {}, searchParams: { category } }) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/products`, {
    next: {
      revalidate: 300,
    },
  });
  const products = await res.json();
  const session = await getServerSession(authOptions);
  return (
    <main className="w-full flex flex-col items-center">
      {/* PRODUCTS DISPLAY */}
      {session && (
        <p className="my-3">
          Hello{" "}
          <span className="font-light text-base">{session?.user?.name}</span>!
        </p>
      )}
      <Suspense fallback={<Loading />}>
        <div className="w-full max-w-5xl flex flex-col items-center justify-center gap-5 md:flex-row flex-wrap">
          {products?.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>
      </Suspense>
    </main>
  );
}
