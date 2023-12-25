"use client";
import { useRouter } from "next/navigation";
import { MdCancel } from "react-icons/md";
const CheckoutCancel = () => {
  const router = useRouter();
  return (
    <div className="w-full h-60 flex flex-col justify-center items-center gap-3">
      <div className="flex flex-row items-center justify-center gap-5">
        <p className="text-3xl">Payment Unsuccessful</p>
        <MdCancel color="red" size={30} />
      </div>
      <button
        className="btn btn-neutral"
        onClick={() => {
          router.replace("/");
        }}
      >
        OK
      </button>
    </div>
  );
};

export default CheckoutCancel;
