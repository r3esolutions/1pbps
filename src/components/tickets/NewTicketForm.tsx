"use client";

import { useState } from "react";

export default function NewTicketForm({ orders }: any) {

  const [department,setDepartment] =
    useState("Technical Support");

  const [priority,setPriority] =
    useState("medium");

  const [orderId,setOrderId] =
    useState("");

  const [subject,setSubject] =
    useState("");

  const [message,setMessage] =
    useState("");

  async function createTicket() {

    const res = await fetch(
      "/api/tickets/create",
      {
        method:"POST",
        headers:{
          "Content-Type":"application/json"
        },
        body:JSON.stringify({
          department,
          order_id: orderId || null,
          subject,
          message,
          priority
        })
      }
    );

    const data = await res.json();

    if(data.success){
      alert("Ticket Created: " + data.ticket_number);
      window.location.href="/dashboard/tickets";
    } else {
      alert(data.error || data.message || "Failed");
    }
  }

  return (
    <div className="mt-8 space-y-5">

      <select
        value={department}
        onChange={(e)=>setDepartment(e.target.value)}
        className="w-full rounded border p-3 bg-black text-white"
      >
        <option>Technical Support</option>
        <option>Billing</option>
        <option>Sales</option>
        <option>Abuse</option>
      </select>

      <select
        value={orderId}
        onChange={(e)=>setOrderId(e.target.value)}
        className="w-full rounded border p-3 bg-black text-white"
      >
        <option value="">
          Select Service
        </option>

        {orders.map((o:any)=>(
          <option key={o.id} value={o.id}>
            {o.order_number} - {o.server_plan} ({o.location})
          </option>
        ))}
      </select>

      <input
        value={subject}
        onChange={(e)=>setSubject(e.target.value)}
        placeholder="Subject"
        className="w-full rounded border p-3 bg-black text-white"
      />

      <textarea
        rows={8}
        value={message}
        onChange={(e)=>setMessage(e.target.value)}
        placeholder="Describe your issue..."
        className="w-full rounded border p-3 bg-black text-white"
      />

      <select
        value={priority}
        onChange={(e)=>setPriority(e.target.value)}
        className="w-full rounded border p-3 bg-black text-white"
      >
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
        <option value="critical">Critical</option>
      </select>

      <button
        onClick={createTicket}
        className="rounded bg-cyan-500 px-8 py-3 font-bold text-black"
      >
        Create Ticket
      </button>

    </div>
  );
}
