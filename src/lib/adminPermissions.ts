import db from "@/src/lib/db";
import { cookies } from "next/headers";

export async function hasPermission(permission:string){

  const cookieStore = await cookies();

  const adminId = cookieStore.get("admin_id")?.value;

  if(!adminId){
    return false;
  }

  const [rows]:any = await db.query(
    "SELECT * FROM admin_permissions WHERE admin_id=? LIMIT 1",
    [adminId]
  );

  if(!rows.length){
    return false;
  }

  const permissions = rows[0];

  return permissions[permission] === 1;

}
