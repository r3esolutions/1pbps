import { getAdmin } from "@/src/lib/auth";
import { NextResponse } from "next/server";
import db from "@/src/lib/db";
import { requireAdminApi } from "@/src/lib/adminAuth";

export async function POST(req:Request) {
  await requireAdminApi();

  const body=await req.json();

  await db.query(
    `
    INSERT INTO resellers
    (
      customer_id,
      company_name,
      credit,
      discount_percent
    )
    VALUES
    (?,?,?,?)
    `,
    [
      body.customer_id,
      body.company_name,
      body.credit,
      body.discount_percent
    ]
  );

  return NextResponse.json({
    success:true
  });

}
