import { NextResponse } from "next/server";
import prisma from "@/prisma/client";

export async function POST(req) {
  try {
    const body = await req.json();
    const product = await prisma.product.create({
      data: body,
    });
    return NextResponse.json(product, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}

// product ids -> 6581b4cb8ed68658fcf49d4d,6581bebd8ed68658fcf49d5a
