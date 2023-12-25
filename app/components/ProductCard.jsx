import Image from "next/image";
import Link from "next/link";
import React from "react";

/**
 * id
 * title
 * description
 * img
 * category
 * @returns
 */

const ProductCard = async ({
  id,
  name,
  desc,
  imageId,
  price,
  discountPrice,
}) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_URL}/api/image/${imageId}`,
    {
      next: {
        revalidate: 300,
      },
    }
  );
  const images = await res.json();
  return (
    <Link
      href={`/product/${id}`}
      className="card w-full xs:w-2/3 xsm:w-1/2 sm:1/3 max-w-sm relative bg-base-100 shadow-xl hover:scale-95 cursor-pointer rounded-md transition-transform hover:shadow-2xl mt-5"
    >
      {images?.url && (
        <Image
          src={images?.url[0]}
          alt="t-shirt"
          loading="lazy"
          width={300}
          height={450}
          className="w-full h-[300px] sm:h-[350px] md:h-[400px] object-cover object-top rounded-t-sm"
        />
      )}
      <div className="card-body p-5">
        <h2 className="line-clamp-2">{name}</h2>
        <p className="line-clamp-2">{desc}</p>
      </div>
      <div className="absolute top-1 right-2">
        <p className="line-through text-lg right-0">{price}</p>
        <p className="font-bold text-xl">{discountPrice}</p>
      </div>
    </Link>
  );
};

export default ProductCard;
