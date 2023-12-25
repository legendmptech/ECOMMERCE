"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import store from "../store/configStore";
import { Provider as StoreProvider, useDispatch } from "react-redux";
import {
  cartAmtUpdated,
  cartItemDeleted,
  cartItemQDecremented,
  cartItemQIncremented,
} from "../store/cart";

const ProductCartCard = ({
  price,
  discountPrice,
  quantity,
  size,
  name,
  id,
  image,
}) => {
  const dispatch = useDispatch();
  return (
    <StoreProvider store={store}>
      <div className="w-full flex bg-base-100 shadow-xl">
        <Image
          src={image}
          alt="cart product"
          width={150}
          height={200}
          className="w-[100px] xs:w-[150px] sm:w-[175px] rounded-lg object-cover"
        />
        {/* QUANTITY BUTTON */}
        <div className="card-body w-full gap-1 p-2 justify-evenly">
          <div className="flex">
            <p className="font-light text-xs xs:text-base lg:text-lg">{name}</p>
            <div className="badge badge-sm sm:badge-lg badge-outline cursor-pointer hover:badge-warning py-3">
              <p className="text-lg font-bold text-gray-700">
                {size.toUpperCase()}
              </p>
            </div>
          </div>
          <div className="badge badge-xs xs:badge-sm md:badge-md badge-accent cursor-pointer">
            Amount Saved Rs. {(price - discountPrice) * quantity}
          </div>
          <div className="w-full flex flex-col flex-wrap justify-between items-center">
            <p className=" font-extralight text-center text-base lg:text-lg line-through">
              Rs. {price * quantity}
            </p>
            <p className=" font-light text-center text-2xl lg:text-4xl">
              Rs. {discountPrice * quantity}
            </p>
          </div>
          <div className="w-full flex justify-evenly items-center">
            <div className="flex join self-center">
              <button
                className="btn btn-neutral join-item text-sm p-2 xs:p-3"
                onClick={() => {
                  setTimeout(() => {
                    if (quantity > 1) {
                      dispatch(
                        cartItemQDecremented({
                          id: id,
                          size: size,
                        })
                      );
                      dispatch(cartAmtUpdated());
                    }
                  }, 0);
                }}
              >
                -
              </button>
              <input
                type="number"
                value={quantity}
                onChange={(event) => {
                  if (Number(event.target.value) > quantity) {
                    dispatch(
                      cartItemQIncremented({
                        id: id,
                        size: size,
                      })
                    );
                    dispatch(cartAmtUpdated());
                  } else {
                    dispatch(
                      cartItemQDecremented({
                        id: id,
                        size: size,
                      })
                    );
                    dispatch(cartAmtUpdated());
                  }
                }}
                className="input input-bordered join-item text-sm p-2"
                min={1}
                max={20}
              />
              <button
                className="btn btn-neutral join-item text-sm p-2 xs:p-3"
                onClick={() => {
                  dispatch(
                    cartItemQIncremented({
                      id: id,
                      size: size,
                    })
                  );
                  dispatch(cartAmtUpdated());
                }}
              >
                +
              </button>
            </div>
            <div
              onClick={() => {
                dispatch(
                  cartItemDeleted({
                    id: id,
                    size: size,
                  })
                );
                dispatch(cartAmtUpdated());
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 448 512"
                className="w-[14px] xs:w-[20px] sm:w-[24px] fill-slate-700 cursor-pointer"
              >
                <path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </StoreProvider>
  );
};

export default ProductCartCard;
