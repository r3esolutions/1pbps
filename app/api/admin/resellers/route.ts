import { NextResponse } from "next/server";
import db from "@/src/lib/db";

export async function POST(req:Request){

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
