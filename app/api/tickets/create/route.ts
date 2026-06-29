import { NextResponse } from "next/server";
import db from "@/src/lib/db";
import { getCurrentCustomer } from "@/src/lib/auth";

export async function POST(req: Request) {
  try {

    const customer = await getCurrentCustomer();

    if (!customer) {
      return NextResponse.json({
        success:false,
        message:"Unauthorized"
      });
    }

    const body = await req.json();

    const ticketNo =
      "TKT-" +
      Date.now().toString().slice(-8);

    await db.query(
      `
      INSERT INTO tickets
      (
        customer_id,
        order_id,
        department,
        ticket_number,
        subject,
        message,
        priority,
        status
      )
      VALUES
      (
        ?,?,?,?,?,?,?,'open'
      )
      `,
      [
        customer.id,
        body.order_id || null,
        body.department || "Technical Support",
        ticketNo,
        body.subject,
        body.message,
        body.priority || "medium"
      ]
    );

    return NextResponse.json({
      success:true,
      ticket_number:ticketNo
    });

  } catch(err:any) {

    return NextResponse.json({
      success:false,
      error:err.message
    });

  }
}
