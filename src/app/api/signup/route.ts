import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs"
import { prisma } from "@/lib/prisma";

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json()
    const { name, email, password, rePassword, role, phone } = reqBody

    if (password !== rePassword) {
      return NextResponse.json({ error: `Passwords didn't match` }, { status: 400 })
    }

    const salt = await bcryptjs.genSalt(10)
    const hashedPassword = await bcryptjs.hash(password, salt)
    const createdUser = await prisma.users.create({
      data: { name: name, email: email, role: role, password: hashedPassword, phone: phone }
    })

    return NextResponse.json({
      message: "User created successfully",
      success: true,
      createdUser
    })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}