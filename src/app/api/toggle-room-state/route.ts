import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { id } = reqBody;

    const prevRoom = await prisma.rooms.findUnique({ where: { id: id } });

    const newRoom = await prisma.rooms.update({
      where: {
        id: id
      },
      data: {
        isBooked: !(prevRoom?.isBooked)
      }
    })

    return NextResponse.json({
      message: `Updated the room`,
      success: true,
      newRoom
    })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}