export const dynamic = "force-dynamic";

import db from "@/src/lib/db";

export default async function KnowledgebasePage() {

  const [articles]: any = await db.query(`
    SELECT
      id,
      title,
      slug,
      category,
      created_at
    FROM knowledgebase
    WHERE status='published'
    ORDER BY id DESC
  `);

  return (
    <div className="max-w-7xl mx-auto p-8 text-white">

      <h1 className="text-4xl font-bold">
        Knowledgebase
      </h1>

      <p className="mt-2 text-gray-400">
        Documentation, tutorials and frequently asked questions.
      </p>

      <div className="mt-8 grid gap-6">

        {articles.map((a:any)=>(
          <a
            key={a.id}
            href={`/knowledgebase/${a.slug}`}
            className="rounded-3xl border border-white/10 p-6 hover:border-cyan-500 transition"
          >

            <div className="text-cyan-400 text-sm">
              {a.category}
            </div>

            <h2 className="mt-2 text-2xl font-bold">
              {a.title}
            </h2>

            <div className="mt-3 text-gray-500 text-sm">
              {String(a.created_at).slice(0,10)}
            </div>

          </a>
        ))}

      </div>

    </div>
  );
}
