import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs"
import jwt from 'jsonwebtoken'

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json()
    const { email, password } = reqBody

    const user = await prisma.users.findUnique({ where: { email } })

    if (!user) {
      return NextResponse.json({ error: `User doesn't exist` }, { status: 400 })
    }

    const checkAuth = await bcryptjs.compare(password, user.password)
    if (!checkAuth) {
      return NextResponse.json({ error: `Invalid password` }, { status: 400 })
    }

    // create token
    const tokenData = {
      id: user.id,
      name: user.name,
      role: user.role
    }
    const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET_KEY!, { expiresIn: "1d" })

    // create the response
    const response = NextResponse.json({
      message: 'Login successful',
      success: true,
      token
    })
    response.cookies.set('authToken', token, { expires: Date.now() + (24 * 60 * 60 * 1000), httpOnly: true, path: '/' })

    // finally returning the response
    return response;
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}