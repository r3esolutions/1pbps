export const dynamic = "force-dynamic";

import db from "@/src/lib/db";

export default async function AnnouncementsPage() {

  const [rows]: any = await db.query(`
    SELECT
      id,
      title,
      status,
      created_at
    FROM announcements
    ORDER BY id DESC
  `);

  return (
    <div className="max-w-7xl mx-auto p-8 text-white">

      <div className="flex items-center justify-between">

        <h1 className="text-4xl font-bold">
          Announcements
        </h1>

        <a
          href="/admin/announcements/new"
          className="rounded bg-cyan-500 px-5 py-3 font-bold text-black"
        >
          + New Announcement
        </a>

      </div>

      <div className="mt-8 rounded-3xl border border-white/10 overflow-hidden">

        <table className="w-full">

          <thead className="bg-zinc-900">
            <tr>
              <th className="p-4 text-left">Title</th>
              <th className="p-4 text-left">Status</th>
              <th className="p-4 text-left">Created</th>
            </tr>
          </thead>

          <tbody>

            {rows.map((a:any)=>(
              <tr
                key={a.id}
                className="border-b border-white/5"
              >
                <td className="p-4">
                  {a.title}
                </td>

                <td className="p-4">
                  {a.status}
                </td>

                <td className="p-4">
                  {String(a.created_at).slice(0,10)}
                </td>
              </tr>
            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
}
