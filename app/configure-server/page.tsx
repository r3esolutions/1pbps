import ServerConfigurator from "@/src/sections/ServerConfigurator";

export const metadata = {
  title: "Configure Dedicated Server | 1PBPS",
};

export default function ConfigureServer() {
  return (
    <main className="bg-black min-h-screen">
      <ServerConfigurator />
    </main>
  );
}
