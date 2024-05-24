import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function GET(req: NextRequest) {
  try {
    const cookies = req.cookies;
    const authToken = cookies.get('authToken')?.value || "";
    const decodedToken: any = jwt.verify(authToken, process.env.TOKEN_SECRET_KEY!)

    return NextResponse.json({
      message: 'User fetched',
      success: true,
      userID: decodedToken.id
    })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}