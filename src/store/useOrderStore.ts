"use client";

import { create } from "zustand";

interface OrderStore {
  config: any;
  setConfig: (data:any)=>void;
}

export const useOrderStore =
create<OrderStore>((set)=>({
  config:{},
  setConfig:(data)=>
    set({config:data})
}));
