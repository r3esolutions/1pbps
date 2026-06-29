export const dynamic = "force-dynamic";

import db from "@/src/lib/db";

export default async function EmailTemplatesPage() {

  const [rows]: any = await db.query(`
    SELECT
      id,
      template_name,
      subject,
      created_at
    FROM email_templates
    ORDER BY id DESC
  `);

  return (
    <div className="max-w-7xl mx-auto p-8 text-white">

      <div className="flex items-center justify-between">

        <h1 className="text-4xl font-bold">
          Email Templates
        </h1>

        <a
          href="/admin/email-templates/new"
          className="rounded bg-cyan-500 px-5 py-3 font-bold text-black"
        >
          + New Template
        </a>

      </div>

      <div className="mt-8 overflow-auto rounded-3xl border border-white/10">

        <table className="w-full">

          <thead className="bg-zinc-900">
            <tr>
              <th className="p-4 text-left">Template</th>
              <th className="p-4 text-left">Subject</th>
              <th className="p-4 text-left">Created</th>
              <th className="p-4 text-left">Action</th>
            </tr>
          </thead>

          <tbody>

            {rows.map((t:any)=>(
              <tr
                key={t.id}
                className="border-b border-white/5"
              >
                <td className="p-4 font-semibold">
                  {t.template_name}
                </td>

                <td className="p-4">
                  {t.subject}
                </td>

                <td className="p-4">
                  {String(t.created_at).slice(0,10)}
                </td>

                <td className="p-4">
                  <a
                    href={`/admin/email-templates/${t.id}`}
                    className="rounded bg-cyan-500 px-3 py-2 text-black"
                  >
                    Edit
                  </a>
                </td>

              </tr>
            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
}
