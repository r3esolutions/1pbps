"use client";

import { useState } from "react";

export default function PaymentsActions({
  orderId,
  status,
}:{
  orderId:number;
  status:string;
}) {

  const [loading,setLoading]=useState(false);

  async function verify(){

    if(loading) return;

    setLoading(true);

    await fetch("/api/admin/verify-payment",{
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({
        id:orderId
      })
    });

    location.reload();
  }

  async function reject(){

    if(loading) return;

    setLoading(true);

    await fetch("/api/admin/reject-payment",{
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({
        id:orderId
      })
    });

    location.reload();
  }

  if(status==="Paid"){
    return (
      <span className="text-green-400 font-semibold">
        Verified
      </span>
    );
  }

  if(status==="Rejected"){
    return (
      <span className="text-red-400 font-semibold">
        Rejected
      </span>
    );
  }

  return(
    <div className="flex gap-2 justify-center">

      <button
        onClick={verify}
        disabled={loading}
        className="rounded bg-green-600 px-3 py-1 text-sm"
      >
        Verify
      </button>

      <button
        onClick={reject}
        disabled={loading}
        className="rounded bg-red-600 px-3 py-1 text-sm"
      >
        Reject
      </button>

    </div>
  );

}
