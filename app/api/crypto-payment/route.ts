import { NextResponse } from "next/server";
import { getAdmin } from "@/src/lib/auth";

export async function POST(req: Request) {
  try {
    const admin = await getAdmin();

    if (!admin) {
      return NextResponse.json(
        { success: false, message: "UNAUTHORIZED" },
        { status: 401 }
      );
    }

    const body = await req.json();

    // SAFE GUARD
    if (!body?.orderId || !body?.txid) {
      return NextResponse.json(
        { success: false, message: "INVALID INPUT" },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "PAYMENT RECEIVED",
      userId: admin.id
    });

  } catch (err) {
    return NextResponse.json(
      { success: false, message: "SERVER ERROR" },
      { status: 500 }
    );
  }
}
