import prisma from "@/prisma/client";
import { NextResponse } from "next/server";

export async function GET(req, { params: { id } }) {
  try {
    const product = await prisma.product.findUnique({
      where: { id: id },
    });
    if (!product) {
      return NextResponse.json({ error: "User not found" }, { status: 200 });
    }
    return NextResponse.json({ ...product }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error?.message }, { status: 400 });
  }
}

export async function PUT(req, { params: { id } }) {
  try {
    const body = await req.json();
    const product = await prisma.product.findUnique({
      where: { id: id },
    });
    if (!product) {
      return NextResponse.json(
        { message: "No Product Exist" },
        { status: 200 }
      );
    }
    const updatedProduct = await prisma.product.update({
      where: { id: product.id },
      data: body,
    });
    return NextResponse.json(updatedProduct, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
