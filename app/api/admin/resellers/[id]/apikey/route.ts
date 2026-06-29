import { randomBytes } from "crypto";
import { NextResponse } from "next/server";
import db from "@/src/lib/db";
import { requireAdminApi } from "@/src/lib/adminAuth";

export async function POST(req: Request,{ params }: any) {
  await requireAdminApi();

  const { id } = await params;

  const [rows]: any = await db.query(
    "SELECT customer_id FROM resellers WHERE id=? LIMIT 1",
    [id]
  );

  if(!rows.length){
    return NextResponse.json({
      success:false,
      error:"Reseller not found"
    });
  }

  const customerId = rows[0].customer_id;

  const apiKey = randomBytes(24).toString("hex");
  const apiSecret = randomBytes(48).toString("hex");

  await db.query(
    "DELETE FROM api_keys WHERE customer_id=?",
    [customerId]
  );

  await db.query(
    `
    INSERT INTO api_keys
    (
      customer_id,
      api_key,
      api_secret,
      status
    )
    VALUES
    (?,?,?,'Active')
    `,
    [
      customerId,
      apiKey,
      apiSecret
    ]
  );

  return NextResponse.redirect(
    new URL(`/admin/resellers/${id}`,req.url)
  );
}
