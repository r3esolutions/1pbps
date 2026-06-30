import { getAdmin } from "@/src/lib/auth";
import { NextResponse } from "next/server";
import db from "@/src/lib/db";
import { requireAdminApi } from "@/src/lib/adminAuth";

export async function POST(req: Request) {
  await requireAdminApi();
  try {

    const body = await req.json();

    await db.query(
      `
      INSERT INTO server_inventory
      (
        hostname,
        provider,
        location,
        datacenter,
        rack,
        cpu,
        ram,
        storage,
        ipv4_available,
        monthly_price,
        asset_tag,
        instant_setup
      )
      VALUES
      (
        ?,?,?,?,?,?,?,?,?,?,?,?
      )
      `,
      [
        body.hostname,
        body.provider,
        body.location,
        body.datacenter,
        body.rack,
        body.cpu,
        body.ram,
        body.storage,
        Number(body.ipv4_available || 0),
        Number(body.monthly_price || 0),
        body.asset_tag,
        body.instant_setup ? 1 : 0
      ]
    );

    return NextResponse.json({
      success: true
    });

  } catch (err: any) {

    return NextResponse.json({
      success: false,
      error: err.message
    });

  }
}

export async function GET() {
  await requireAdminApi();

  const [rows]: any = await db.query(`
    SELECT *
    FROM server_inventory
    ORDER BY id DESC
  `);

  return NextResponse.json({
    success: true,
    inventory: rows
  });

}
