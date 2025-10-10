import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const rows = await prisma.item.findMany();
  return NextResponse.json(rows);
}
export async function POST(req: NextRequest) {
  const data = await req.json();
  const row = await prisma.item.create({ data });
  return NextResponse.json(row, { status: 201 });
}