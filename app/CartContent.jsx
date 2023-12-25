"use client";
import React, { useEffect, useState } from "react";
import ProductCartCard from "./components/ProductCartCard";
import { useDispatch, useSelector } from "react-redux";
import {
  cartAmtUpdated,
  cartUpdated,
  getCartList,
  getCartTotalAmt,
} from "./store/cart";
import StoreWrapper from "./components/StoreWrapper";
import { loadStripe } from "@stripe/stripe-js";

const CartContent = () => {
  const dispatch = useDispatch();
  const cartList = useSelector(getCartList);
  const totalAmt = useSelector(getCartTotalAmt);
  // CHECKOUT
  const makePayment = async () => {
    const stripe = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE);
    const res = await fetch(`/api/checkout/stripe`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        products: JSON.parse(localStorage.getItem("cartList")),
      }),
    });
    const session = await res.json();
    console.log(session);
    const result = await stripe.redirectToCheckout({
      sessionId: session.id,
    });
    if (result.error) {
      console.log(result.error);
    }
  };
  const placeShipRocketOrder = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/order`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        products: JSON.parse(localStorage.getItem("cartList")),
      }),
    });
    const data = JSON.stringify(await res.json());
    console.log(data);
  };
  useEffect(() => {
    const updateCartList = () => {
      dispatch(cartUpdated());
      dispatch(cartAmtUpdated());
    };
    updateCartList();
  }, [dispatch]);
  return (
    <div className="relative w-full h-full">
      {cartList.length === 0 ? (
        <div className="w-full h-[400px] flex flex-col justify-center items-center">
          <h2>Shopping Cart is Empty</h2>
        </div>
      ) : (
        <>
          <div className="w-full sticky top-0 right-0 bg-white z-50 py-3">
            <h2 className="text-center text-xl xs:text-2xl sm:text-4xl">
              Your Cart
            </h2>
          </div>
          <div className="flex flex-col lg:flex-row flex-wrap gap-5 lg:justify-center">
            {cartList?.map((item, key) => {
              return <ProductCartCard {...item} key={key} />;
            })}
          </div>
          <div className="bg-white w-full flex flex-col justify-center items-start p-5 gap-2">
            <div className="flex justify-between w-full">
              <p className="font-light xs:text-lg">Subtotal</p>
              <p className="font-bold">Rs. {totalAmt}</p>
            </div>
            <p>
              Tax included.{" "}
              <span className="underline cursor-pointer">Shipping</span>{" "}
              calculated at checkout.
            </p>
            <button className="btn btn-accent w-full" onClick={makePayment}>
              Checkout
            </button>
            {/* <button
              className="btn btn-neutral w-full"
              onClick={placeShipRocketOrder}
            >
              Place Order
            </button> */}
          </div>
        </>
      )}
    </div>
  );
};

const Component = () => (
  <StoreWrapper>
    <CartContent />
  </StoreWrapper>
);

export default Component;
