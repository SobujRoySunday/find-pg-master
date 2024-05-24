import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url)
    const query = url.searchParams.get('u') || "";
    console.log(query);


    let rooms = await prisma.rooms.findMany({
      where: {
        authorID: query
      }
    })
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