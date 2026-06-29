"use client";

export default function OrdersTable({ orders }: any) {

  async function verify(id:number){
    const res = await fetch("/api/admin/verify-payment",{
      method:"POST",
      headers:{ "Content-Type":"application/json" },
      body:JSON.stringify({ id })
    });

    const data = await res.json();

    if(data.success) location.reload();
  }

  async function reject(id:number){
    const res = await fetch("/api/admin/reject-payment",{
      method:"POST",
      headers:{ "Content-Type":"application/json" },
      body:JSON.stringify({ id })
    });

    const data = await res.json();

    if(data.success) location.reload();
  }

  return (
    <table className="w-full text-white">

      <thead>
        <tr className="border-b border-white/10">
          <th className="p-3 text-left">Order</th>
          <th className="p-3 text-left">Customer</th>
          <th className="p-3 text-left">Location</th>
          <th className="p-3 text-left">Plan</th>
          <th className="p-3 text-left">Amount</th>
          <th className="p-3 text-left">Payment</th>
          <th className="p-3 text-left">Service</th>
          <th className="p-3 text-left">Actions</th>
        </tr>
      </thead>

      <tbody>

        {orders.map((o:any)=>(
          <tr
            key={o.id}
            className="border-b border-white/5"
          >
            <td className="p-3 font-bold text-cyan-400">
              {o.order_number}
            </td>

            <td className="p-3">
              {o.full_name}
              <div className="text-xs text-gray-400">
                {o.email}
              </div>
            </td>

            <td className="p-3">{o.location}</td>

            <td className="p-3">{o.server_plan}</td>

            <td className="p-3">${o.total}</td>

            <td className="p-3">
              <span className="rounded-full bg-green-500/20 px-3 py-1 text-green-400">
                {o.payment_status}
              </span>
            </td>

            <td className="p-3">
              <span className="rounded-full bg-cyan-500/20 px-3 py-1 text-cyan-400">
                {o.service_status || "Pending"}
              </span>
            </td>

            <td className="p-3 space-x-2">

              <a
                href={`/admin/orders/${o.id}`}
                className="inline-block rounded bg-cyan-500 px-3 py-2 text-black font-semibold"
              >
                Manage
              </a>

              <button
                onClick={() => verify(o.id)}
                className="rounded bg-green-600 px-3 py-2"
              >
                Verify
              </button>

              <button
                onClick={() => reject(o.id)}
                className="rounded bg-red-600 px-3 py-2"
              >
                Reject
              </button>

            </td>

          </tr>
        ))}

      </tbody>

    </table>
  );
}
