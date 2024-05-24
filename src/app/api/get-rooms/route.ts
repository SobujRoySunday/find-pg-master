import { prisma } from "@/lib/prisma";
import { NextApiRequest } from "next";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url)
    const query = url.searchParams.get('q') || "";

    let rooms = await prisma.rooms.findMany({
      where: {
        isBooked: false,
        OR: [
          {
            title: {
              contains: query,
              mode: 'insensitive',
            }
          },
          {
            description: {
              contains: query,
              mode: 'insensitive',
            }
          },
          {
            addr1: {
              contains: query,
              mode: 'insensitive',
            }
          },
          {
            addr2: {
              contains: query,
              mode: 'insensitive',
            }
          }
        ]
      },
      include: { author: true }
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