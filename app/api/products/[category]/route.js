import { NextResponse } from "next/server";
import prisma from "@/prisma/client";

export async function GET(req, { params: { category } }) {
  try {
    const products = await prisma.product.findMany({
      where: {
        category: category,
      },
    });
    return NextResponse.json(products, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
