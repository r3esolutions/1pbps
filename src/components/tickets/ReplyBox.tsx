"use client";

import { useState } from "react";

export default function ReplyBox(
  { ticketId }: any
) {

  const [message,setMessage] =
    useState("");

  async function sendReply() {

    if(!message.trim()){
      return;
    }

    const res = await fetch(
      "/api/tickets/reply",
      {
        method:"POST",
        headers:{
          "Content-Type":"application/json"
        },
        body:JSON.stringify({
          ticket_id:ticketId,
          message
        })
      }
    );

    const data = await res.json();

    if(data.success){
      location.reload();
    } else {
      alert("Reply Failed");
    }
  }

  return (
    <div className="mt-8">

      <textarea
        rows={6}
        value={message}
        onChange={(e)=>
          setMessage(e.target.value)
        }
        placeholder="Type your reply..."
        className="w-full rounded border p-3 bg-black text-white"
      />

      <button
        onClick={sendReply}
        className="mt-3 rounded bg-cyan-500 px-6 py-3 font-bold text-black"
      >
        Send Reply
      </button>

    </div>
  );
}
