import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const body = await req.json();
    const category = await CategoryModel.create(body);
    return NextResponse.json(category, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
