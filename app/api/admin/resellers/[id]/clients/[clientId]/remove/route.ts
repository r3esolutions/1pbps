import { getAdmin } from "@/src/lib/auth";
import db from "@/src/lib/db";
import { requireAdminApi } from "@/src/lib/adminAuth";
import { NextResponse } from "next/server";

export async function POST(
  req: Request,
  { params }: any
) {
  await requireAdminApi();

  const { id, clientId } = await params;

  await db.query(
    `
    DELETE FROM reseller_clients
    WHERE reseller_id=?
      AND customer_id=?
    `,
    [
      id,
      clientId
    ]
  );

  return NextResponse.redirect(
    new URL(
      `/admin/resellers/${id}/clients`,
      req.url
    )
  );

}
