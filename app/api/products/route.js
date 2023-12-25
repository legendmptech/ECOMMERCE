import { NextResponse } from "next/server";
import prisma from "@/prisma/client";

export async function GET(req) {
  try {
    const products = await prisma.product.findMany();
    return NextResponse.json(products, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
