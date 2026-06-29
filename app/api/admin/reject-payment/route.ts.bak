import { NextResponse } from "next/server";
import db from "@/src/lib/db";

export async function POST(req: Request) {
  try {

    const body = await req.json();

    await db.query(
      `
      UPDATE orders
      SET
        payment_status='Rejected',
        status='Cancelled'
      WHERE id=?
      `,
      [body.id]
    );

    return NextResponse.json({
      success:true
    });

  } catch(error:any) {

    return NextResponse.json({
      success:false,
      error:error.message
    });
  }
}
