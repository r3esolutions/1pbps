export const dynamic = "force-dynamic";

import db from "@/src/lib/db";
import { notFound } from "next/navigation";
import Link from "next/link";

export default async function InventoryDetails({
  params,
}:{
  params:Promise<{id:string}>
}){

  const {id}=await params;

  const [rows]:any=await db.query(
    "SELECT * FROM server_inventory WHERE id=? LIMIT 1",
    [id]
  );

  if(!rows.length){
    notFound();
  }

  const s=rows[0];

  return(
    <div className="max-w-6xl mx-auto p-8 text-white">

      <div className="flex items-center justify-between">

        <div>
          <h1 className="text-4xl font-bold">
            {s.hostname || "Unnamed Server"}
          </h1>

          <div className="mt-2 text-gray-400">
            Asset Tag : {s.asset_tag || "-"}
          </div>
        </div>

        <Link
          href="/admin/inventory"
          className="rounded bg-cyan-500 px-5 py-3 font-semibold text-black"
        >
          Back
        </Link>

      </div>

      <div className="grid md:grid-cols-2 gap-6 mt-8">

        <div className="rounded-3xl border border-white/10 p-6">

          <h2 className="mb-4 text-2xl font-bold">
            Hardware
          </h2>

          <div>CPU : {s.cpu}</div>
          <div>RAM : {s.ram}</div>
          <div>Storage : {s.storage}</div>
          <div>IPv4 : {s.ipv4_available}</div>

        </div>

        <div className="rounded-3xl border border-white/10 p-6">

          <h2 className="mb-4 text-2xl font-bold">
            Location
          </h2>

          <div>Provider : {s.provider}</div>
          <div>Location : {s.location}</div>
          <div>Datacenter : {s.datacenter}</div>
          <div>Rack : {s.rack}</div>

        </div>

        <div className="rounded-3xl border border-white/10 p-6">

          <h2 className="mb-4 text-2xl font-bold">
            Billing
          </h2>

          <div>Monthly : ${s.monthly_price}</div>
          <div>Setup Fee : ${s.setup_fee}</div>
          <div>Next Due : {s.next_due_date || "-"}</div>

        </div>

        <div className="rounded-3xl border border-white/10 p-6">

          <h2 className="mb-4 text-2xl font-bold">
            Status
          </h2>

          <div>Status : {s.status}</div>
          <div>Instant Setup : {s.instant_setup ? "Yes" : "No"}</div>
          <div>Customer ID : {s.customer_id || "-"}</div>
          <div>Order ID : {s.order_id || "-"}</div>

        </div>

      </div>

    </div>
  );
}
