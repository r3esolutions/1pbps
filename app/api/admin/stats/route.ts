import { NextResponse } from "next/server";
import db from "@/src/lib/db";

export async function GET() {

  const [customers]: any =
    await db.query(
      "SELECT COUNT(*) total FROM customers"
    );

  const [orders]: any =
    await db.query(
      "SELECT COUNT(*) total FROM orders"
    );

  const [tickets]: any =
    await db.query(
      "SELECT COUNT(*) total FROM tickets"
    );

  return NextResponse.json({
    customers: customers[0].total,
    orders: orders[0].total,
    tickets: tickets[0].total
  });
}
