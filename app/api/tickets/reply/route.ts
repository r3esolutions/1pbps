import { NextResponse } from "next/server";
import db from "@/src/lib/db";
import { getCurrentCustomer } from "@/src/lib/auth";

export async function POST(req: Request) {
  try {

    const customer = await getCurrentCustomer();

    if (!customer) {
      return NextResponse.json({
        success:false
      });
    }

    const body = await req.json();

    await db.query(
      `
      INSERT INTO ticket_replies
      (
        ticket_id,
        customer_id,
        admin_reply,
        message
      )
      VALUES
      (
        ?,?,0,?
      )
      `,
      [
        body.ticket_id,
        customer.id,
        body.message
      ]
    );

    await db.query(
      `
      UPDATE tickets
      SET
        status='customer_reply',
        last_reply_at=NOW()
      WHERE id=?
      `,
      [body.ticket_id]
    );

    return NextResponse.json({
      success:true
    });

  } catch(err:any) {

    return NextResponse.json({
      success:false,
      error:err.message
    });

  }
}
