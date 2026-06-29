import { NextResponse } from "next/server";
import db from "@/src/lib/db";

export async function GET() {
  try {

    const [queue]: any = await db.query(`
      SELECT
        id,
        recipient,
        subject,
        body
      FROM email_queue
      WHERE status='pending'
      ORDER BY id ASC
      LIMIT 20
    `);

    let sent = 0;

    for (const mail of queue) {

      // TODO:
      // SMTP / Mail Provider (Resend, SMTP, Mailgun, SES, etc.)
      // ko yahan integrate karna hai.

      await db.query(
        `
        UPDATE email_queue
        SET
          status='sent',
          sent_at=NOW()
        WHERE id=?
        `,
        [mail.id]
      );

      sent++;
    }

    return NextResponse.json({
      success: true,
      sent
    });

  } catch (err:any) {

    return NextResponse.json({
      success: false,
      error: err.message
    });

  }
}
