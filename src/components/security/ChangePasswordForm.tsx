"use client";

import { useState } from "react";

export default function ChangePasswordForm() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit() {
    if (newPassword !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    setLoading(true);

    const res = await fetch("/api/change-password", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        currentPassword,
        newPassword
      })
    });

    const data = await res.json();

    setLoading(false);

    if (data.success) {
      alert("Password changed successfully");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } else {
      alert(data.error || "Failed");
    }
  }

  return (
    <div className="space-y-4">
      <input
        type="password"
        placeholder="Current Password"
        value={currentPassword}
        onChange={(e)=>setCurrentPassword(e.target.value)}
        className="w-full rounded border border-white/10 bg-black p-3 text-white"
      />

      <input
        type="password"
        placeholder="New Password"
        value={newPassword}
        onChange={(e)=>setNewPassword(e.target.value)}
        className="w-full rounded border border-white/10 bg-black p-3 text-white"
      />

      <input
        type="password"
        placeholder="Confirm New Password"
        value={confirmPassword}
        onChange={(e)=>setConfirmPassword(e.target.value)}
        className="w-full rounded border border-white/10 bg-black p-3 text-white"
      />

      <button
        onClick={submit}
        disabled={loading}
        className="rounded bg-cyan-500 px-6 py-3 font-bold text-black"
      >
        {loading ? "Updating..." : "Change Password"}
      </button>
    </div>
  );
}
