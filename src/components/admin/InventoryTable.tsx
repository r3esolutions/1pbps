"use client";

import { useMemo, useState } from "react";

export default function InventoryTable({ servers }: any) {

  const [search,setSearch]=useState("");
  const [status,setStatus]=useState("all");

  const filtered=useMemo(()=>{

    return servers.filter((s:any)=>{

      const q=search.toLowerCase();

      const okSearch=
        !q ||
        (s.hostname||"").toLowerCase().includes(q) ||
        (s.location||"").toLowerCase().includes(q) ||
        (s.provider||"").toLowerCase().includes(q) ||
        (s.asset_tag||"").toLowerCase().includes(q);

      const okStatus=
        status==="all" || s.status===status;

      return okSearch && okStatus;

    });

  },[servers,search,status]);

  return(
    <>

      <div className="mb-6 flex flex-wrap gap-4">

        <input
          placeholder="Search hostname, provider, asset..."
          value={search}
          onChange={e=>setSearch(e.target.value)}
          className="rounded border border-white/10 bg-black px-4 py-3 text-white w-80"
        />

        <select
          value={status}
          onChange={e=>setStatus(e.target.value)}
          className="rounded border border-white/10 bg-black px-4 py-3"
        >
          <option value="all">All Status</option>
          <option value="available">Available</option>
          <option value="reserved">Reserved</option>
          <option value="active">Active</option>
          <option value="maintenance">Maintenance</option>
        </select>

      </div>

      <table className="w-full">

        <thead className="bg-zinc-900">

          <tr>
            <th className="p-4 text-left">Hostname</th>
            <th className="p-4 text-left">Location</th>
            <th className="p-4 text-left">Provider</th>
            <th className="p-4 text-left">Price</th>
            <th className="p-4 text-left">Status</th>
            <th className="p-4 text-left">Action</th>
          </tr>

        </thead>

        <tbody>

          {filtered.map((s:any)=>(

            <tr
              key={s.id}
              className="border-b border-white/5"
            >

              <td className="p-4">{s.hostname}</td>

              <td className="p-4">{s.location}</td>

              <td className="p-4">{s.provider}</td>

              <td className="p-4">
                ${Number(s.monthly_price||0).toFixed(2)}
              </td>

              <td className="p-4">
                {s.status}
              </td>

              <td className="p-4">
                <a
                  href={`/admin/inventory/${s.id}`}
                  className="rounded bg-cyan-500 px-3 py-2 text-black"
                >
                  View
                </a>
              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </>
  );

}
