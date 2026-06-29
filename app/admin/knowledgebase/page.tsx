export const dynamic = "force-dynamic";

import db from "@/src/lib/db";

export default async function KnowledgebaseAdminPage() {

  const [articles]: any = await db.query(`
    SELECT
      id,
      title,
      slug,
      category,
      created_at
    FROM knowledgebase
    ORDER BY id DESC
  `);

  return (
    <div className="max-w-7xl mx-auto p-8 text-white">

      <div className="flex items-center justify-between">

        <h1 className="text-4xl font-bold">
          Knowledgebase
        </h1>

        <a
          href="/admin/knowledgebase/new"
          className="rounded bg-cyan-500 px-5 py-3 font-bold text-black"
        >
          + New Article
        </a>

      </div>

      <div className="mt-8 rounded-3xl border border-white/10 overflow-hidden">

        <table className="w-full">

          <thead className="bg-zinc-900">
            <tr>
              <th className="p-4 text-left">Title</th>
              <th className="p-4 text-left">Category</th>
              <th className="p-4 text-left">Slug</th>
              <th className="p-4 text-left">Created</th>
            </tr>
          </thead>

          <tbody>

            {articles.map((a:any)=>(
              <tr
                key={a.id}
                className="border-b border-white/5"
              >
                <td className="p-4 font-semibold">
                  {a.title}
                </td>

                <td className="p-4">
                  {a.category}
                </td>

                <td className="p-4">
                  {a.slug}
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
