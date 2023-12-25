"use client";
import React, { useEffect, useState } from "react";
import StoreWrapper from "./StoreWrapper";
import { useDispatch } from "react-redux";
import { cartAmtUpdated, cartItemAdded } from "../store/cart";

const Product = (props) => {
  const { id } = props;
  const dispatch = useDispatch();
  // QUANTITY
  const [quantity, setQuantity] = useState(1);
  // SIZES
  const [selectedSize, setSelectedSize] = useState("M");
  const handleSizeChange = (event) => {
    setSelectedSize(event.target.getAttribute("aria-label"));
  };
  // CART
  const addToCart = async () => {
    dispatch(
      cartItemAdded({
        name: props?.name,
        price: props?.price,
        discountPrice: props?.discountPrice,
        quantity: quantity,
        size: selectedSize,
        image: props?.image,
        id: id,
      })
    );
    dispatch(cartAmtUpdated());
  };
  return (
    <>
      <p className="font-light">Sizes</p>
      <div className="join mb-3">
        <input
          className="join-item btn p-3"
          type="radio"
          name="options"
          aria-label="S"
          checked={selectedSize === "S"}
          onChange={handleSizeChange}
        />
        <input
          className="join-item btn p-3"
          type="radio"
          name="options"
          aria-label="M"
          checked={selectedSize === "M"}
          onChange={handleSizeChange}
        />
        <input
          className="join-item btn p-3"
          type="radio"
          name="options"
          aria-label="L"
          checked={selectedSize === "L"}
          onChange={handleSizeChange}
        />
        <input
          className="join-item btn p-3"
          type="radio"
          name="options"
          aria-label="XL"
          checked={selectedSize === "XL"}
          onChange={handleSizeChange}
        />
        <input
          className="join-item btn p-3"
          type="radio"
          name="options"
          aria-label="XXL"
          checked={selectedSize === "XXL"}
          onChange={handleSizeChange}
        />
      </div>
      <p className="font-light">Quantity</p>
      <div className="flex join mb-2">
        <button
          className="btn btn-neutral join-item text-2xl"
          onClick={() => {
            if (quantity != 1) {
              setQuantity(quantity - 1);
            }
          }}
        >
          -
        </button>
        <input
          type="number"
          value={quantity}
          onChange={(text) => setQuantity(text)}
          className="input input-bordered join-item"
          min={1}
          max={50}
        />
        <button
          className="btn btn-neutral join-item text-2xl"
          onClick={() => setQuantity(quantity + 1)}
        >
          +
        </button>
      </div>
      <div className="flex flex-col gap-4 w-full max-w-xs">
        <button
          className="btn btn-outline sm:text-sm p-2"
          onClick={() => addToCart()}
        >
          Add to Card
        </button>
        <button className="btn btn-primary">Buy Now</button>
      </div>
    </>
  );
};

const Component = (props) => (
  <StoreWrapper>
    <Product {...props} />
  </StoreWrapper>
);
export default Component;
