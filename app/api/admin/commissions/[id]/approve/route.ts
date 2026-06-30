import { getAdmin } from "@/src/lib/auth";
import db from "@/src/lib/db";
import { requireAdminApi } from "@/src/lib/adminAuth";
import { NextResponse } from "next/server";

export async function POST(req: Request, { params }: any) {
  await requireAdminApi();

  const { id } = await params;

  await db.query("START TRANSACTION");

  try {

    const [rows]: any = await db.query(
      `
      SELECT *
      FROM reseller_commissions
      WHERE id=?
      LIMIT 1
      `,
      [id]
    );

    if (!rows.length) {
      throw new Error("Commission not found");
    }

    const c = rows[0];

    if (c.status === "paid") {
      await db.query("COMMIT");
      return NextResponse.json({ success: true });
    }

    await db.query(
      `
      UPDATE resellers
      SET credit = credit + ?
      WHERE id=?
      `,
      [c.commission_amount, c.reseller_id]
    );

    const [[wallet]]: any = await db.query(
      "SELECT credit FROM resellers WHERE id=?",
      [c.reseller_id]
    );

    await db.query(
      `
      INSERT INTO reseller_wallet_transactions
      (
        reseller_id,
        type,
        amount,
        balance_after,
        description
      )
      VALUES (?,?,?,?,?)
      `,
      [
        c.reseller_id,
        "credit",
        c.commission_amount,
        wallet.credit,
        "Commission payout"
      ]
    );

    await db.query(
      `
      UPDATE reseller_commissions
      SET status='paid'
      WHERE id=?
      `,
      [id]
    );

    await db.query("COMMIT");

    return NextResponse.json({
      success: true
    });

  } catch (err: any) {

    await db.query("ROLLBACK");

    return NextResponse.json({
      success: false,
      error: err.message
    });

  }

}
