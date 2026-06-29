"use client";

import { useState } from "react";

export default function CryptoPayment() {
  const [txid,setTxid] = useState("");
  const [loading,setLoading] = useState(false);

  const params =
    typeof window !== "undefined"
      ? new URLSearchParams(window.location.search)
      : null;

  const orderNumber =
    params?.get("order") || "";

  async function submitPayment() {

    if(!txid){
      alert("Please enter TXID");
      return;
    }

    setLoading(true);

    const res = await fetch("/api/crypto-payment",{
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({
        order_number:orderNumber,
        txid
      })
    });

    const data = await res.json();

    if(data.success){
      window.location.href="/payment-success";
    }else{
      alert(data.error || "Payment submit failed");
    }

    setLoading(false);
  }

  return (
    <main className="min-h-screen bg-black text-white">
      <div className="mx-auto max-w-4xl px-6 py-24">

        <h1 className="text-5xl font-bold">
          Crypto Payment
        </h1>

        <div className="mt-4 text-cyan-400">
          Order: {orderNumber}
        </div>

        <div className="mt-10 rounded-3xl border border-cyan-500/20 bg-zinc-950 p-8">

          <div className="space-y-6">

            <div>
              <strong>Bitcoin Wallet:</strong><br />
              bc1qua04p5nqawffms5yatt3kwy6drqhjp9nw7t4c5
            </div>

            <div>
              <strong>Ethereum Wallet:</strong><br />
              0x192CCA08B41AF454A172978999E23890bAB17eC1
            </div>

            <div>
              <strong>USDT Wallet:</strong><br />
              0xB9888Bf5e8072F086e6c740E85c8542eCA54C2Da
            </div>

            <input
              value={txid}
              onChange={(e)=>setTxid(e.target.value)}
              placeholder="Transaction ID (TXID)"
              className="w-full rounded-xl bg-black p-4"
            />

            <button
              onClick={submitPayment}
              disabled={loading}
              className="rounded-xl bg-cyan-500 px-8 py-4 font-bold text-black"
            >
              {loading ? "Submitting..." : "Submit Payment"}
            </button>

          </div>

        </div>

      </div>
    </main>
  );
}
