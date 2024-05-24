import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json()
    const { title, description, imageUrl, rent, addr1, addr2, author } = reqBody
    const room = await prisma.rooms.create({
      data: {
        title,
        description,
        imageUrl,
        rent: parseInt(rent),
        addr1,
        addr2,
        authorID: author
      }
    })
    return NextResponse.json({
      message: `New room added`,
      success: true,
      room
    })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}