import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(_: NextRequest, { params }: { params: { id: string }}) {
  const row = await prisma.item.findUnique({ where: { id: params.id }});
  return NextResponse.json(row ?? {}, { status: row?200:404 });
}
export async function PUT(req: NextRequest, { params }: { params: { id: string }}) {
  const data = await req.json();
  const row = await prisma.item.update({ where: { id: params.id }, data });
  return NextResponse.json(row);
}
export async function DELETE(_: NextRequest, { params }: { params: { id: string }}) {
  await prisma.item.delete({ where: { id: params.id }});
  return NextResponse.json({ ok: true });
}