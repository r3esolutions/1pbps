"use client";

import { useState } from "react";

export default function NewInventoryPage() {

  const [form, setForm] = useState({
    hostname:"",
    provider:"",
    location:"",
    datacenter:"",
    rack:"",
    cpu:"",
    ram:"",
    storage:"",
    ipv4_available:0,
    monthly_price:"",
    asset_tag:"",
    instant_setup:false
  });

  function update(key:string,value:any){
    setForm({...form,[key]:value});
  }

  async function save(){

    const res = await fetch("/api/admin/inventory",{
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify(form)
    });

    const data=await res.json();

    if(data.success){
      alert("Server Added");
      location.href="/admin/inventory";
    }else{
      alert(data.error || "Failed");
    }

  }

  return(
    <div className="max-w-5xl mx-auto p-8 text-white">

      <h1 className="text-4xl font-bold mb-8">
        Add Server
      </h1>

      <div className="grid md:grid-cols-2 gap-5">

        <input placeholder="Hostname" className="rounded border p-3 bg-black" onChange={e=>update("hostname",e.target.value)} />
        <input placeholder="Provider" className="rounded border p-3 bg-black" onChange={e=>update("provider",e.target.value)} />
        <input placeholder="Location" className="rounded border p-3 bg-black" onChange={e=>update("location",e.target.value)} />
        <input placeholder="Datacenter" className="rounded border p-3 bg-black" onChange={e=>update("datacenter",e.target.value)} />
        <input placeholder="Rack" className="rounded border p-3 bg-black" onChange={e=>update("rack",e.target.value)} />
        <input placeholder="CPU" className="rounded border p-3 bg-black" onChange={e=>update("cpu",e.target.value)} />
        <input placeholder="RAM" className="rounded border p-3 bg-black" onChange={e=>update("ram",e.target.value)} />
        <input placeholder="Storage" className="rounded border p-3 bg-black" onChange={e=>update("storage",e.target.value)} />
        <input placeholder="IPv4 Available" type="number" className="rounded border p-3 bg-black" onChange={e=>update("ipv4_available",e.target.value)} />
        <input placeholder="Monthly Price" className="rounded border p-3 bg-black" onChange={e=>update("monthly_price",e.target.value)} />
        <input placeholder="Asset Tag" className="rounded border p-3 bg-black" onChange={e=>update("asset_tag",e.target.value)} />

        <label className="flex items-center gap-3">
          <input
            type="checkbox"
            onChange={e=>update("instant_setup",e.target.checked)}
          />
          Instant Setup
        </label>

      </div>

      <button
        onClick={save}
        className="mt-8 rounded bg-cyan-500 px-8 py-3 font-bold text-black"
      >
        Save Server
      </button>

    </div>
  );
}
