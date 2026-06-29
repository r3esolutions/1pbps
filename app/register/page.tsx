"use client";

import { useState } from "react";

export default function RegisterPage() {
  const [loading,setLoading] = useState(false);

  const [firstName,setFirstName] = useState("");
  const [lastName,setLastName] = useState("");
  const [email,setEmail] = useState("");
  const [phone,setPhone] = useState("");
  const [whatsapp,setWhatsapp] = useState("");
  const [telegram,setTelegram] = useState("");
  const [company,setCompany] = useState("");
  const [gst,setGst] = useState("");
  const [pan,setPan] = useState("");
  const [password,setPassword] = useState("");
  const [confirmPassword,setConfirmPassword] = useState("");

  async function register() {

    if(password !== confirmPassword){
      alert("Passwords do not match");
      return;
    }

    setLoading(true);


    const res = await fetch("/api/register",{
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({
        full_name:firstName + " " + lastName,
        email,
        phone,
        whatsapp,
        telegram,
        company_name:company,
        gst_number:gst,
        pan_number:pan,
        password,
      })
    });

    const data = await res.json();

    if(data.success){
      alert("Registration Successful");
      window.location.href="/login";
    }else{
      alert(data.error || "Registration Failed");
    }

    setLoading(false);
  }

  return (
    <div className="mx-auto max-w-7xl px-6 py-20">

      <div className="mx-auto max-w-5xl rounded-3xl border border-white/10 bg-zinc-900/60 p-10">

        <h1 className="mb-8 text-center text-5xl font-bold text-white">
          Create Account
        </h1>

        <div className="grid gap-5 md:grid-cols-2">

          <input className="w-full rounded-xl bg-black p-4 text-white"
            placeholder="First Name"
            value={firstName}
            onChange={(e)=>setFirstName(e.target.value)}
          />

          <input className="w-full rounded-xl bg-black p-4 text-white"
            placeholder="Last Name"
            value={lastName}
            onChange={(e)=>setLastName(e.target.value)}
          />

          <input className="w-full rounded-xl bg-black p-4 text-white"
            placeholder="Email Address"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
          />

          <input className="w-full rounded-xl bg-black p-4 text-white"
            placeholder="Phone Number"
            value={phone}
            onChange={(e)=>setPhone(e.target.value)}
          />

          <input className="w-full rounded-xl bg-black p-4 text-white"
            placeholder="WhatsApp Number"
            value={whatsapp}
            onChange={(e)=>setWhatsapp(e.target.value)}
          />

          <input className="w-full rounded-xl bg-black p-4 text-white"
            placeholder="Telegram Username"
            value={telegram}
            onChange={(e)=>setTelegram(e.target.value)}
          />

          <input className="w-full rounded-xl bg-black p-4 text-white"
            placeholder="Company Name"
            value={company}
            onChange={(e)=>setCompany(e.target.value)}
          />

          <input className="w-full rounded-xl bg-black p-4 text-white"
            placeholder="GST Number"
            value={gst}
            onChange={(e)=>setGst(e.target.value)}
          />

          <input className="w-full rounded-xl bg-black p-4 text-white"
            placeholder="PAN Number"
            value={pan}
            onChange={(e)=>setPan(e.target.value)}
          />

          <input
            type="password"
            className="w-full rounded-xl bg-black p-4 text-white"
            placeholder="Password"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
          />

          <input
            type="password"
            className="w-full rounded-xl bg-black p-4 text-white"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e)=>setConfirmPassword(e.target.value)}
          />

        </div>

        <button
          onClick={register}
          disabled={loading}
          className="mt-8 w-full rounded-xl bg-cyan-400 py-4 font-bold text-black"
        >
          {loading ? "Creating Account..." : "Create Account"}
        </button>

      </div>

    </div>
  );
}
