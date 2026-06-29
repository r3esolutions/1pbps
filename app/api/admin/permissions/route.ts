import { NextResponse } from "next/server";
import db from "@/src/lib/db";
import { requireAdminApi } from "@/src/lib/adminAuth";

export async function POST(req: Request) {
  await requireAdminApi();

  try {

    const form = await req.formData();

    const adminId = Number(form.get("admin_id"));

    function checked(name:string){
      return form.get(name) ? 1 : 0;
    }

    await db.query(
      `
      UPDATE admin_permissions
      SET
        customers_view=?,
        customers_edit=?,
        orders_view=?,
        orders_edit=?,
        invoices_view=?,
        invoices_edit=?,
        tickets_view=?,
        tickets_edit=?,
        leads_view=?,
        leads_edit=?
      WHERE admin_id=?
      `,
      [
        checked("customers_view"),
        checked("customers_edit"),
        checked("orders_view"),
        checked("orders_edit"),
        checked("invoices_view"),
        checked("invoices_edit"),
        checked("tickets_view"),
        checked("tickets_edit"),
        checked("leads_view"),
        checked("leads_edit"),
        adminId
      ]
    );

    return NextResponse.redirect(
      new URL("/admin/permissions", req.url)
    );

  } catch(err:any){

    return NextResponse.json({
      success:false,
      error:err.message
    });

  }

}
