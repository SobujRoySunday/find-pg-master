import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json()
    const { title, description, imageUrl, rent } = reqBody
    const room = await prisma.rooms.create({ data: { title: title, description: description, imageUrl: imageUrl, rent } })
    return NextResponse.json({
      message: `New room added`,
      success: true,
      room
    })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}