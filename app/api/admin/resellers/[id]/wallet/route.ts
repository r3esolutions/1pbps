import db from "@/src/lib/db";
import { NextResponse } from "next/server";

export async function POST(req: Request,{ params }: any){

  const { id } = await params;
  const form = await req.formData();

  const amount = Number(form.get("amount"));
  const type = String(form.get("type"));

  if(type==="add"){
    await db.query(
      "UPDATE resellers SET credit=credit+? WHERE id=?",
      [amount,id]
    );
  }else{
    await db.query(
      "UPDATE resellers SET credit=credit-? WHERE id=?",
      [amount,id]
    );
  }

  return NextResponse.redirect(
    new URL(`/admin/resellers/${id}`,req.url)
  );
}
