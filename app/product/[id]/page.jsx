import Product from "@/app/components/Product";
import React from "react";
import ProductImageCarousel from "./ProductImageCarousel";

const ProductPage = async ({ params: { id } }) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/product/${id}`, {
    next: {
      revalidate: 300,
    },
  });
  const product = await res.json();
  const imageRes = await fetch(
    `${process.env.NEXT_PUBLIC_URL}/api/image/${product?.imageId}`,
    {
      next: {
        revalidate: 300,
      },
    }
  );
  const images = await imageRes.json();
  return (
    <div className="w-full flex flex-col items-center">
      <h1 className="mt-4 xsm:mb-5 font-light px-5 underline sm:no-underline">
        {product?.name}
      </h1>
      <div
        className="w-11/12 flex flex-col items-center md:flex-row
       md:justify-evenly md:items-start md:gap-3 lg:gap-8"
      >
        <div className="w-11/12 md:w-1/2 max-w-xl flex flex-col items-center lg:items-end">
          {images?.url && <ProductImageCarousel imgList={images?.url} />}
        </div>
        <div className="w-full flex flex-col items-start gap-3 mt-5 md:mt-0">
          <div className="flex flex-row gap-3">
            <span className="text-lg font-extralight line-through">
              Rs. {product?.price}
            </span>
            <span className="text-lg font-light">
              Rs. {product?.discountPrice}
            </span>
          </div>
          <span className="text-lg font-extralight mb-2">
            Tax included{" "}
            <span className="underline cursor-pointer">shipping</span>{" "}
            calculated at checkout
          </span>
          <div className="flex flex-col gap-4 w-full max-w-sm">
            {product?.id !== undefined && (
              <Product {...product} image={images?.url[0]} />
            )}
          </div>
          <p className="py-4 sm:max-w-sm">{product?.desc}</p>
        </div>
      </div>
    </div>
  );
};

export async function generateMetadata({ params, searchParams }, parent) {
  // fetch data
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_URL}/api/product/${params.id}`,
    {
      next: {
        revalidate: 300,
      },
    }
  );
  const product = await res.json();
  const imageRes = await fetch(
    `${process.env.NEXT_PUBLIC_URL}/api/image/${product?.imageId}`,
    {
      next: {
        revalidate: 300,
      },
    }
  );
  const images = await imageRes.json();

  return {
    title: product?.name + " | MensFit",
    openGraph: {
      images: [...images?.url],
    },
  };
}

export default ProductPage;
