import { NextResponse } from "next/server";
import db from "@/src/lib/db";

export async function POST(req: Request) {

  try {

    const body = await req.json();

    await db.query(
      `
      INSERT INTO ticket_replies
      (
        ticket_id,
        admin_reply,
        message
      )
      VALUES
      (
        ?,1,?
      )
      `,
      [
        body.ticket_id,
        body.message
      ]
    );

    await db.query(
      `
      UPDATE tickets
      SET
        status='answered',
        last_reply_at=NOW()
      WHERE id=?
      `,
      [body.ticket_id]
    );

    return NextResponse.json({
      success:true
    });

  } catch(err:any){

    return NextResponse.json({
      success:false,
      error:err.message
    });

  }

}
