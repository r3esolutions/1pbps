"use client";

import { useEffect, useState } from "react";


import { getOrder } from "@/src/lib/orderStorage";
export default function CheckoutPage() {

  const [config,setConfig] = useState<any>(null);

  useEffect(() => {
    const data = sessionStorage.getItem("serverConfig");

    if(data){
      setConfig(JSON.parse(data));
    }
  },[]);


  const [loading,setLoading] = useState(false);

  const [order,setOrder] = useState<any>(null);

  useEffect(()=>{
    setOrder(getOrder());
  },[]);



  const [fullName,setFullName] = useState("");
  const [company,setCompany] = useState("");
  const [email,setEmail] = useState("");
  const [phone,setPhone] = useState("");
  const [country,setCountry] = useState("");

  async function submitOrder() {

    setLoading(true);

    const response = await fetch("/api/orders",{
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({
        full_name:fullName,
        company_name:company,
        email:email,
        phone:phone,
        country:country,

        location:config?.location || "Amsterdam",
        server_plan:config?.server || "EPYC 4245P",
        ram:config?.ram || "32 GB",
        storage:config?.storage || "2x480GB SSD",
        operating_system:config?.operatingSystem || "Ubuntu 24.04",
        ipv4_qty:config?.ipv4 || 1,
        bandwidth:(config?.bandwidth || 100) + " Mbps",
        billing_term:config?.billingTerm || "1 Month",
        payment_method:"PayPal",
        subtotal:config?.total || 0,
        discount:0,
        total:config?.total || 0
      })
    });

    const data = await response.json();

    if(data.success){
      sessionStorage.setItem("lastOrderNumber", data.order_number); window.location.href="/payment/crypto?order=" + data.order_number;
    }

    setLoading(false);
  }

  return (
    <main className="min-h-screen bg-black text-white">
      <div className="mx-auto max-w-5xl px-6 py-24">

        <h1 className="text-5xl font-bold">
          Checkout
        </h1>

        <div className="mt-10 space-y-4">

          <input
            value={fullName}
            onChange={(e)=>setFullName(e.target.value)}
            placeholder="Full Name"
            className="w-full rounded-xl bg-zinc-900 p-4"
          />

          <input
            value={company}
            onChange={(e)=>setCompany(e.target.value)}
            placeholder="Company Name"
            className="w-full rounded-xl bg-zinc-900 p-4"
          />

          <input
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            placeholder="Email Address"
            className="w-full rounded-xl bg-zinc-900 p-4"
          />

          <input
            value={phone}
            onChange={(e)=>setPhone(e.target.value)}
            placeholder="Phone Number"
            className="w-full rounded-xl bg-zinc-900 p-4"
          />

          <input
            value={country}
            onChange={(e)=>setCountry(e.target.value)}
            placeholder="Country"
            className="w-full rounded-xl bg-zinc-900 p-4"
          />

          <div className="rounded-xl bg-zinc-900 p-4">
            <div>Location: {config?.location}</div>
            <div>Server: {config?.server}</div>
            <div>RAM: {config?.ram}</div>
            <div>Storage: {config?.storage}</div>
            <div>OS: {config?.operatingSystem}</div>
            <div>Billing: {config?.billingTerm}</div>
            <div>IPv4: {config?.ipv4}</div>
            <div>Bandwidth: {config?.bandwidth} Mbps</div>
            <div className="font-bold text-cyan-400">
              Total: ${config?.total}
            </div>
          </div>

          <button
            onClick={submitOrder}
            className="w-full rounded-xl bg-cyan-500 py-4 font-bold text-black"
          >
            {loading ? "Processing..." : "Place Order"}
          </button>

        </div>

      </div>
    </main>
  );
}
