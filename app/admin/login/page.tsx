"use client";

import { useState } from "react";

export default function AdminLogin() {
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");

  async function login() {
    const res = await fetch("/api/admin/login",{
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({
        email,
        password
      })
    });

    const data = await res.json();

    if(data.success){
      window.location.href="/admin";
    }else{
      alert(data.message || "Login Failed");
    }
  }

  return (
    <div className="mx-auto max-w-md px-6 py-24">
      <h1 className="text-5xl font-bold text-white">
        Admin Login
      </h1>

      <div className="mt-8 space-y-4">
        <input
          type="email"
          placeholder="Email"
          className="w-full rounded-xl border border-white/10 bg-black p-4 text-white"
          onChange={(e)=>setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full rounded-xl border border-white/10 bg-black p-4 text-white"
          onChange={(e)=>setPassword(e.target.value)}
        />

        <button
          onClick={login}
          className="w-full rounded-xl bg-cyan-400 p-4 font-bold text-black"
        >
          Login
        </button>
      </div>
    </div>
  );
}
