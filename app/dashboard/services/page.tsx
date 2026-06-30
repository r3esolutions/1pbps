export const dynamic = "force-dynamic";

import db from "@/src/lib/db";
import { getAdmin } from "@/src/lib/auth";

export default async function ServicesPage() {

  const customer = await getAdmin();

  const [rows]: any = await db.query(`
    SELECT
      id,
      order_number,
      location,
      server_plan,
      operating_system,
      status,
      hostname,
      primary_ip,
      username,
      server_password,
      service_status,
      next_due_date
    FROM orders
    WHERE customer_id = ?
    ORDER BY id DESC
  `,
    [customer.id]
  );

  return (
    <div className="p-8">

      <h1 className="text-4xl font-bold text-white">
        My Services
      </h1>

      <div className="mt-8 space-y-6">

        {rows.map((s:any)=>(

          <div
            key={s.order_number}
            className="rounded-xl border border-white/10 p-6 text-white"
          >

            <div className="text-2xl font-bold text-cyan-400">
              {s.server_plan}
            </div>

            <div className="mt-4 grid md:grid-cols-2 gap-3">

              <div>
                <strong>Order:</strong> {s.order_number}
              </div>

              <div>
                <strong>Location:</strong> {s.location}
              </div>

              <div>
                <strong>Operating System:</strong> {s.operating_system}
              </div>

              <div>
                <strong>Status:</strong> {s.status}
              </div>

              <div>
                <strong>Service Status:</strong> {s.service_status || "Pending"}
              </div>

              <div>
                <strong>Hostname:</strong> {s.hostname || "-"}
              </div>

              <div>
                <strong>Primary IP:</strong> {s.primary_ip || "-"}
              </div>

              <div>
                <strong>Username:</strong> {s.username || "-"}
              </div>

              <div>
                <strong>Password:</strong> {s.server_password || "-"}
              </div>

              <div>
                <strong>Next Due Date:</strong>{" "}
                {s.next_due_date
                  ? String(s.next_due_date).slice(0,10)
                  : "-"
                }
              </div>
              <div>
                <a
                  href={`/dashboard/services/${s.id}`}
                  className="inline-block rounded bg-cyan-500 px-4 py-2 font-semibold text-black"
                >
                  View Details
                </a>
              </div>

            </div>

          </div>

        ))}

      </div>

    </div>
  );
}
