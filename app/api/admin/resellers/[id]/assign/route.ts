import { getAdmin } from "@/src/lib/auth";
import db from "@/src/lib/db";
import { requireAdminApi } from "@/src/lib/adminAuth";
import { NextResponse } from "next/server";

export async function POST(req: Request,{ params }: any) {
  await requireAdminApi();

  const { id } = await params;
  const form = await req.formData();

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
      id,
      form.get("customer_id")
    ]
  );

  return NextResponse.redirect(
    new URL(`/admin/resellers/${id}/clients`,req.url)
  );
}
