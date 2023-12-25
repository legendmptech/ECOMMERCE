import prisma from "@/prisma/client";
import { NextResponse } from "next/server";

export async function GET(req, { params: { id } }) {
  try {
    const image = await prisma.image.findUnique({
      where: { id: id },
    });
    if (!image) {
      return NextResponse.json({ error: "Image not found" }, { status: 200 });
    }
    return NextResponse.json({ ...image }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error?.message }, { status: 400 });
  }
}
