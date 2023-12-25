import { NextResponse } from "next/server";
import prisma from "@/prisma/client";

export async function GET(req) {
  try {
    const images = await prisma.image.findMany();
    return NextResponse.json(images, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
