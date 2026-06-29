"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function NewReseller() {

  const router = useRouter();

  const [form,setForm]=useState({
    customer_id:"",
    company_name:"",
    credit:"0",
    discount_percent:"0"
  });

  async function save(e:any){
    e.preventDefault();

    const res=await fetch("/api/admin/resellers",{
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify(form)
    });

    const json=await res.json();

    if(json.success){
      router.push("/admin/resellers");
    }else{
      alert(json.error);
    }
  }

  return(
    <div className="max-w-2xl mx-auto p-8 text-white">

      <h1 className="text-4xl font-bold mb-8">
        Add Reseller
      </h1>

      <form onSubmit={save} className="space-y-5">

        <input
          className="w-full rounded bg-zinc-900 p-3"
          placeholder="Customer ID"
          value={form.customer_id}
          onChange={e=>setForm({...form,customer_id:e.target.value})}
        />

        <input
          className="w-full rounded bg-zinc-900 p-3"
          placeholder="Company Name"
          value={form.company_name}
          onChange={e=>setForm({...form,company_name:e.target.value})}
        />

        <input
          className="w-full rounded bg-zinc-900 p-3"
          placeholder="Opening Credit"
          value={form.credit}
          onChange={e=>setForm({...form,credit:e.target.value})}
        />

        <input
          className="w-full rounded bg-zinc-900 p-3"
          placeholder="Discount %"
          value={form.discount_percent}
          onChange={e=>setForm({...form,discount_percent:e.target.value})}
        />

        <button
          className="rounded bg-cyan-600 px-6 py-3 font-bold text-black"
        >
          Save Reseller
        </button>

      </form>

    </div>
  );
}
