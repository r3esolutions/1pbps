import db from "@/src/lib/db";

export const dynamic = "force-dynamic";

export default async function OrdersPage({ params }: any) {

  const { id } = params;

  return (
    <div className="text-white p-6">

      <h1 className="text-3xl font-bold mb-6">
        Order #{id}
      </h1>

      <form action="/api/admin/provision/activate" method="POST">
        <input type="hidden" name="order_id" value={id} />

        <button className="bg-green-500 text-black px-4 py-2 rounded">
          Activate Server
        </button>
      </form>

    </div>
  );
}
