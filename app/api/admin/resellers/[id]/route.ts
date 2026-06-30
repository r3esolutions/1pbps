import { getAdmin } from "@/src/lib/auth";
import { NextResponse } from "next/server";
import db from "@/src/lib/db";
import { requireAdminApi } from "@/src/lib/adminAuth";

export async function POST(req: Request,{ params }: any) {
  await requireAdminApi();

  const { id } = await params;
  const form = await req.formData();

  await db.query(
    `
    UPDATE resellers
    SET
      company_name=?,
      credit=?,
      discount_percent=?,
      status=?
    WHERE id=?
    `,
    [
      form.get("company_name"),
      form.get("credit"),
      form.get("discount_percent"),
      form.get("status"),
      id
    ]
  );

  return NextResponse.redirect(
    new URL("/admin/resellers", req.url)
  );
}
