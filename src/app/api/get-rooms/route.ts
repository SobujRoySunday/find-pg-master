import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    let rooms = await prisma.rooms.findMany()
    if (!rooms) {
      rooms = []
    }

    return NextResponse.json({
      message: 'Rooms fetched',
      success: true,
      rooms
    })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}