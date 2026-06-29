"use client";

import { useEffect, useState } from "react";

export default function LeadsPage() {

  const [leads, setLeads] = useState<any[]>([]);

  useEffect(() => {
    loadLeads();
  }, []);

  async function loadLeads() {

    const res = await fetch("/api/admin/leads");
    const data = await res.json();

    if (Array.isArray(data)) {
      setLeads(data);
    } else if (data.success) {
      setLeads(data.leads);
    }
  }

  return (
    <div className="max-w-7xl mx-auto p-8 text-white">

      <h1 className="text-4xl font-bold">
        Leads Management
      </h1>

      <div className="mt-8 overflow-auto rounded-3xl border border-white/10">

        <table className="w-full">

          <thead className="bg-zinc-900 border-b border-white/10">
            <tr>
              <th className="p-4 text-left">ID</th>
              <th className="p-4 text-left">Name</th>
              <th className="p-4 text-left">Email</th>
              <th className="p-4 text-left">Phone</th>
              <th className="p-4 text-left">Service</th>
              <th className="p-4 text-left">Status</th>
              <th className="p-4 text-left">Created</th>
            </tr>
          </thead>

          <tbody>

            {leads.map((lead) => (
              <tr
                key={lead.id}
                className="border-b border-white/5 hover:bg-white/5"
              >
                <td className="p-4">{lead.id}</td>

                <td className="p-4 font-semibold">
                  {lead.full_name}
                </td>

                <td className="p-4">
                  {lead.email}
                </td>

                <td className="p-4">
                  {lead.phone}
                </td>

                <td className="p-4">
                  {lead.service_interest}
                </td>

                <td className="p-4">
                  <span className="rounded-full bg-cyan-500/20 px-3 py-1 text-cyan-400">
                    {lead.status}
                  </span>
                </td>

                <td className="p-4">
                  {String(lead.created_at).slice(0,10)}
                </td>

              </tr>
            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
}
