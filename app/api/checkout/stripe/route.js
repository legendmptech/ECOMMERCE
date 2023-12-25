import { NextResponse } from "next/server";
// import prisma from "@/prisma/client";
import Stripe from "stripe";

export async function GET(req) {
  return NextResponse.json({
    message: "succes",
  });
}
export async function POST(req) {
  try {
    const { products } = await req.json();
    const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY);
    const lineItems = products.map((product) => ({
      price_data: {
        currency: "inr",
        product_data: {
          name: product.name,
          images: [product.image],
        },
        unit_amount: Math.round(product.discountPrice * 100),
      },
      quantity: product.quantity,
    }));
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      success_url: `${process.env.NEXT_PUBLIC_URL}/checkout/success`,
      cancel_url: `${process.env.NEXT_PUBLIC_URL}/checkout/cancel`,
      billing_address_collection: "required",
      shipping_address_collection: {
        allowed_countries: ["IN"],
      },
      phone_number_collection: {
        enabled: true,
      },
    });
    return NextResponse.json(
      { id: session.id, sessionData: session },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
