import db from "@/src/lib/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {

  const form = await req.formData();

  const customerId = form.get("customer_id");
  const resellerId = form.get("reseller_id");

  await db.query(
    "DELETE FROM reseller_clients WHERE customer_id=?",
    [customerId]
  );

  await db.query(
    `
    INSERT INTO reseller_clients
    (
      reseller_id,
      customer_id
    )
    VALUES
    (?,?)
    `,
    [
      resellerId,
      customerId
    ]
  );

  return NextResponse.json({
    success: true
  });
}
