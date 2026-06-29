export interface OrderConfig {
  location: string;
  server: string;
  ram: string;
  storage: string;
  os: string;
  ipv4: number;
  bandwidth: string;
  billing: string;
  payment: string;
  total: number;
}

export const defaultOrder: OrderConfig = {
  location: "",
  server: "",
  ram: "",
  storage: "",
  os: "",
  ipv4: 1,
  bandwidth: "100 Mbps",
  billing: "1 Month",
  payment: "PayPal",
  total: 0
};
