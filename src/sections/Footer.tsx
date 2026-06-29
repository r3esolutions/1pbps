export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-black py-20">

      <div className="mx-auto max-w-7xl px-6">

        <div className="grid gap-10 md:grid-cols-5">

          <div>
            <h3 className="text-3xl font-bold text-white">
              1PBPS
            </h3>

            <p className="mt-4 text-gray-400">
              Enterprise cloud infrastructure, dedicated servers,
              GPU servers and global networking solutions.
            </p>
          </div>

          <div>
            <h4 className="font-bold text-white">Products</h4>
            <ul className="mt-4 space-y-2 text-gray-400">
              <li>Dedicated Servers</li>
              <li>GPU Servers</li>
              <li>Cloud VPS</li>
              <li>Storage Servers</li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-white">Solutions</h4>
            <ul className="mt-4 space-y-2 text-gray-400">
              <li>Streaming</li>
              <li>Gaming</li>
              <li>VPN</li>
              <li>AI Infrastructure</li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-white">Network</h4>
            <ul className="mt-4 space-y-2 text-gray-400">
              <li>Global Backbone</li>
              <li>Locations</li>
              <li>DDoS Protection</li>
              <li>Looking Glass</li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-white">Company</h4>
            <ul className="mt-4 space-y-2 text-gray-400">
              <li>About Us</li>
              <li>Contact</li>
              <li>Blog</li>
              <li>Partners</li>
            </ul>
          </div>

        </div>

        <div className="mt-12 border-t border-white/10 pt-8 text-center text-gray-500">
          © 2026 1PBPS. All Rights Reserved.
        </div>

      </div>

<div className="mt-16 border-t border-white/10 pt-10">
<h3 className="text-xl font-bold text-white">Popular Dedicated Server Locations</h3>
<div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-3 text-gray-400">
<a href="/dedicated-servers/amsterdam">Amsterdam</a>
<a href="/dedicated-servers/frankfurt">Frankfurt</a>
<a href="/dedicated-servers/london">London</a>
<a href="/dedicated-servers/paris">Paris</a>
<a href="/dedicated-servers/singapore">Singapore</a>
<a href="/dedicated-servers/tokyo">Tokyo</a>
<a href="/dedicated-servers/dubai">Dubai</a>
<a href="/dedicated-servers/mumbai">Mumbai</a>
<a href="/dedicated-servers/new-york">New York</a>
<a href="/dedicated-servers/chicago">Chicago</a>
<a href="/dedicated-servers/dallas">Dallas</a>
<a href="/dedicated-servers/miami">Miami</a>
</div>
</div>
<div className="mt-10">
<h3 className="text-xl font-bold text-white">Country Dedicated Servers</h3>
<div className="mt-4 flex flex-wrap gap-4 text-gray-400">
<a href="/usa-dedicated-servers">USA</a>
<a href="/germany-dedicated-servers">Germany</a>
<a href="/uk-dedicated-servers">UK</a>
<a href="/netherlands-dedicated-servers">Netherlands</a>
<a href="/france-dedicated-servers">France</a>
<a href="/singapore-dedicated-servers">Singapore</a>
</div>
</div>
    </footer>
  );
}

const locationLinks = [
"amsterdam","frankfurt","london","paris","madrid","milan",
"warsaw","stockholm","vienna","prague","zurich","helsinki",
"oslo","copenhagen","bucharest","sofia","athens","istanbul",
"dubai","singapore","tokyo","seoul","hong-kong","sydney",
"melbourne","mumbai","delhi","bangalore","chennai",
"hyderabad","kolkata","new-york","los-angeles","chicago",
"dallas","miami","atlanta","seattle","san-jose",
"toronto","montreal"
];
