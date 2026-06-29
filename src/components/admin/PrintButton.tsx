"use client";

export default function PrintButton() {
  return (
    <button
      onClick={() => window.print()}
      className="rounded bg-cyan-600 px-4 py-2 font-semibold text-black hover:bg-cyan-500"
    >
      Print Invoice
    </button>
  );
}
