import { getAdmin } from "@/src/lib/auth";
import { NextResponse } from "next/server";
import db from "@/src/lib/db";
import { requireAdminApi } from "@/src/lib/adminAuth";

function genPass(){
  return Math.random().toString(36).slice(-10);
}

export async function POST(req: Request){
  await requireAdminApi();

  const { order_id } = await req.json();

  const [orders]: any = await db.query(
    "SELECT * FROM orders WHERE id=?",
    [order_id]
  );

  if(!orders.length){
    return NextResponse.json({ success:false });
  }

  const order = orders[0];

  const [servers]: any = await db.query(
    "SELECT * FROM servers WHERE status='available' LIMIT 1"
  );

  if(!servers.length){
    return NextResponse.json({ success:false, message:"No server" });
  }

  const server = servers[0];
  const password = genPass();

  await db.query(
    "UPDATE orders SET server_id=?, ip_address=?, password=?, provisioning_status='active', activated_at=NOW() WHERE id=?",
    [server.id, server.ip_address, password, order_id]
  );

  await db.query(
    "UPDATE servers SET status='active', assigned_customer_id=? WHERE id=?",
    [order.customer_id, server.id]
  );

  return NextResponse.json({
    success:true,
    ip: server.ip_address,
    username:"root",
    password
  });
}
