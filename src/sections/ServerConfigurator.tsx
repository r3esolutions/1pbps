"use client";

import { useEffect, useState } from "react";
import { servers, ipv4Price } from "@/src/lib/serverPricing";
import { ramOptions } from "@/src/lib/ramPricing";
import { storageOptions } from "@/src/lib/storagePricing";
import { getBandwidthPrice } from "@/src/lib/bandwidthPricing";

export default function ServerConfigurator() {

  const [server,setServer] = useState("EPYC 4245P");
  const [ipv4,setIpv4] = useState(1);
  const [ram,setRam] = useState("32 GB");
  const [storage,setStorage] = useState("2x480GB SSD");
  const [bandwidth,setBandwidth] = useState(100);
  const [billingTerm,setBillingTerm] = useState("1 Month");
  const [location,setLocation] = useState("Amsterdam");
useEffect(() => {
  const params = new URLSearchParams(window.location.search);
  const qsLocation = params.get("location");
  const qsServer = params.get("server");

  if (qsLocation) {
    const city = qsLocation.charAt(0).toUpperCase() + qsLocation.slice(1).replace(/-/g, " ");
    setLocation(city);
  }

  if (qsServer) {
    setServer(qsServer);
  }
}, []);

  const [operatingSystem,setOperatingSystem] = useState("Ubuntu 24.04");

  const total =
    (servers[server as keyof typeof servers] || 0) +
    (ramOptions[ram as keyof typeof ramOptions] || 0) +
    (storageOptions[storage as keyof typeof storageOptions] || 0) +
    (ipv4 * ipv4Price) +
    getBandwidthPrice(bandwidth);

  const saveConfig = () => {
    sessionStorage.setItem(
      "serverConfig",
      JSON.stringify({
        location,
        server,
        ram,
        storage,
        operatingSystem,
        billingTerm,
        ipv4,
        bandwidth,
        total
      })
    );

    window.location.href="/checkout";
  };

  return (
    <section className="bg-black py-20 text-white">
      <div className="mx-auto max-w-7xl px-6">

        <h2 className="text-5xl font-bold">
          Configure Your Server
        </h2>

        <div className="mt-12 grid gap-8 lg:grid-cols-2">

          <div className="space-y-4">

            <select value={server} onChange={(e)=>setServer(e.target.value)} className="w-full rounded-xl bg-zinc-900 p-4">
              {Object.keys(servers).map((item)=>(
                <option key={item} value={item}>{item}</option>
              ))}
            </select>

            <select value={ram} onChange={(e)=>setRam(e.target.value)} className="w-full rounded-xl bg-zinc-900 p-4">
              {Object.keys(ramOptions).map((item)=>(
                <option key={item} value={item}>{item}</option>
              ))}
            </select>

            <select value={storage} onChange={(e)=>setStorage(e.target.value)} className="w-full rounded-xl bg-zinc-900 p-4">
              {Object.keys(storageOptions).map((item)=>(
                <option key={item} value={item}>{item}</option>
              ))}
            </select>

            <select value={location} onChange={(e)=>setLocation(e.target.value)} className="w-full rounded-xl bg-zinc-900 p-4">
              <option>Amsterdam</option>
              <option>Frankfurt</option>
              <option>London</option>
              <option>Singapore</option>
              <option>Mumbai</option>
              <option>New York</option>
              <option>Los Angeles</option>
            </select>

            <select value={operatingSystem} onChange={(e)=>setOperatingSystem(e.target.value)} className="w-full rounded-xl bg-zinc-900 p-4">
              <option>Ubuntu 24.04</option>
              <option>Ubuntu 22.04</option>
              <option>Debian 12</option>
              <option>Rocky Linux 9</option>
              <option>AlmaLinux 9</option>
              <option>Windows Server 2025</option>
            </select>

            <select value={billingTerm} onChange={(e)=>setBillingTerm(e.target.value)} className="w-full rounded-xl bg-zinc-900 p-4">
              <option>1 Month</option>
              <option>3 Months</option>
              <option>6 Months</option>
              <option>12 Months</option>
            </select>

            <input
              type="number"
              min="1"
              max="32"
              value={ipv4}
              onChange={(e)=>setIpv4(Number(e.target.value))}
              className="w-full rounded-xl bg-zinc-900 p-4"
            />

            <div>
              <label>Bandwidth: {bandwidth} Mbps</label>
              <input
                type="range"
                min="100"
                max="40000"
                step="100"
                value={bandwidth}
                onChange={(e)=>setBandwidth(Number(e.target.value))}
                className="w-full"
              />
            </div>

          </div>

          <div className="rounded-3xl border border-cyan-500/20 bg-zinc-950 p-8">

            <h3 className="text-2xl font-bold">
              Order Summary
            </h3>

            <div className="mt-6 space-y-2 text-gray-300">
              <div>Location: {location}</div>
              <div>Server: {server}</div>
              <div>RAM: {ram}</div>
              <div>Storage: {storage}</div>
              <div>OS: {operatingSystem}</div>
              <div>Billing: {billingTerm}</div>
              <div>IPv4: {ipv4}</div>
              <div>Bandwidth: {bandwidth} Mbps</div>
            </div>

            <div className="mt-8 text-4xl font-bold text-cyan-400">
              ${total.toFixed(2)}/mo
            </div>

            <button
              onClick={saveConfig}
              className="mt-8 w-full rounded-xl bg-cyan-500 py-4 font-bold text-black"
            >
              Continue To Checkout
            </button>

          </div>

        </div>
      </div>
    </section>
  );
}
