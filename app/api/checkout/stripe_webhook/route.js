import { NextResponse } from "next/server";

export async function POST(req) {
  const event = await req.json();
  switch (event.type) {
    case "payment_intent.succeeded":
      console.log("Successful");
      break;
    case "checkout.session.completed":
      // CREATE SHIPROCKET ORDER
      const session = event.data.object;

      break;
  }
  return NextResponse.json({ received: true }, { status: 200 });
}
