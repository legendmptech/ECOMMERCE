"use client";
import StoreWrapper from "@/app/components/StoreWrapper";
import { cartEmptied } from "@/app/store/cart";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { FaCheckCircle } from "react-icons/fa";
import { useDispatch } from "react-redux";
const CheckoutSuccess = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(cartEmptied());
  });
  return (
    <div className="w-full h-60 flex flex-col justify-center items-center gap-3">
      <div className="flex flex-row items-center justify-center gap-5">
        <p className="text-3xl">Payment Successful</p>
        <FaCheckCircle color="green" size={30} />
      </div>
      <button
        className="btn btn-neutral"
        onClick={() => {
          router.replace("/");
        }}
      >
        Continue Shopping
      </button>
    </div>
  );
};

const Component = () => (
  <StoreWrapper>
    <CheckoutSuccess />
  </StoreWrapper>
);
export default Component;
