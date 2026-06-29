import Link from "next/link";
import PaymentsActions from "@/src/components/admin/PaymentsActions";

async function getPayments() {
  const res = await fetch("http://127.0.0.1:3000/api/admin/payments", {
    cache: "no-store",
  });

  const data = await res.json();
  return data.payments || [];
}

export default async function PaymentsPage() {
  const payments = await getPayments();

  return (
    <div className="max-w-7xl mx-auto p-8 text-white">

      <div className="flex items-center justify-between">
        <h1 className="text-4xl font-bold">
          Payments
        </h1>
      </div>

      <div className="mt-8 overflow-hidden rounded-2xl border border-white/10">

        <table className="w-full">

          <thead className="bg-zinc-900">
            <tr>
              <th className="p-4 text-left">TXID</th>
              <th className="p-4 text-left">Customer</th>
              <th className="p-4 text-left">Order</th>
              <th className="p-4 text-left">Amount</th>
              <th className="p-4 text-left">Status</th><th className="p-4 text-center">Action</th>
            </tr>
          </thead>

          <tbody>

            {payments.map((p:any)=>(
              <tr
                key={p.id}
                className="border-b border-white/10"
              >
                <td className="p-4">{p.txid || "-"}</td>
                <td className="p-4">
                  <div>{p.full_name}</div>
                  <div className="text-sm text-gray-400">{p.email}</div>
                </td>
                <td className="p-4">{p.order_number}</td>
                <td className="p-4">${Number(p.amount || 0).toFixed(2)}</td>
                <td className="p-4">
  <span
    className={
      p.status === "Paid"
        ? "rounded bg-green-600 px-2 py-1 text-xs"
        : p.status === "Rejected"
        ? "rounded bg-red-600 px-2 py-1 text-xs"
        : "rounded bg-yellow-600 px-2 py-1 text-xs"
    }
  >
    {p.status}
  </span>
</td>

<td className="p-4 text-center">
<div className="flex items-center justify-center gap-2">
<Link href={`/admin/orders/${p.order_id}`} className="rounded bg-cyan-600 px-3 py-1 text-sm">View</Link>
<PaymentsActions orderId={p.order_id} status={p.status} />
</div>
</td>
              </tr>
            ))}

            {!payments.length && (
              <tr>
                <td
                  colSpan={6}
                  className="p-8 text-center text-gray-400"
                >
                  No payments found.
                </td>
              </tr>
            )}

          </tbody>

        </table>

      </div>

    </div>
  );
}
