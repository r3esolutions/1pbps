export const dynamic = "force-dynamic";

import db from "@/src/lib/db";

export default async function AnnouncementsPage() {

  const [rows]: any = await db.query(`
    SELECT *
    FROM announcements
    WHERE status='published'
    ORDER BY id DESC
  `);

  return (
    <div className="max-w-6xl mx-auto p-8 text-white">

      <h1 className="text-4xl font-bold mb-8">
        Announcements
      </h1>

      <div className="space-y-6">

        {rows.map((a:any)=>(

          <div
            key={a.id}
            className="rounded-3xl border border-white/10 p-6"
          >

            <h2 className="text-2xl font-bold">
              {a.title}
            </h2>

            <div className="mt-2 text-sm text-gray-400">
              {String(a.created_at).slice(0,10)}
            </div>

            <div className="mt-6 whitespace-pre-wrap">
              {a.content}
            </div>

          </div>

        ))}

      </div>

    </div>
  );
}
