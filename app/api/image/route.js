import { NextResponse } from "next/server";
import prisma from "@/prisma/client";

export async function POST(req) {
  try {
    const body = await req.json();
    const image = await prisma.image.create({
      data: body,
    });
    return NextResponse.json(image, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}

// images --> 6581b8a68ed68658fcf49d55,6581bd888ed68658fcf49d58
