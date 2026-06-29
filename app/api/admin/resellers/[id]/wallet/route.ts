import db from "@/src/lib/db";
import { requireAdminApi } from "@/src/lib/adminAuth";
import { NextResponse } from "next/server";

export async function POST(req: Request, { params }: any) {
  await requireAdminApi();

  const { id } = await params;
  const form = await req.formData();

  const amount = Number(form.get("amount"));
  const type = String(form.get("type"));

  await db.query("START TRANSACTION");

  try {

    if (type === "add") {
      await db.query(
        "UPDATE resellers SET credit = credit + ? WHERE id=?",
        [amount, id]
      );
    } else {
      await db.query(
        "UPDATE resellers SET credit = credit - ? WHERE id=?",
        [amount, id]
      );
    }

    const [[reseller]]: any = await db.query(
      "SELECT credit FROM resellers WHERE id=?",
      [id]
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
        id,
        type === "add" ? "credit" : "debit",
        amount,
        reseller.credit,
        type === "add"
          ? "Admin wallet credit"
          : "Admin wallet debit"
      ]
    );

    await db.query("COMMIT");

    return NextResponse.redirect(
      new URL(`/admin/resellers/${id}`, req.url)
    );

  } catch (err) {

    await db.query("ROLLBACK");
    throw err;

  }

}
