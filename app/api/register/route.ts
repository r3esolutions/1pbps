import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import db from "@/src/lib/db";
import { verifyTurnstile } from "@/src/lib/turnstile";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const captchaOk = await verifyTurnstile(
      body.turnstileToken || ""
    );

    if (!captchaOk) {
      return NextResponse.json({
        success:false,
        error:"Captcha verification failed"
      });
    }


    const hashedPassword = await bcrypt.hash(
      body.password,
      10
    );

    const referralCode =
      "PBPS" +
      Math.random().toString(36)
      .substring(2,8)
      .toUpperCase();

    await db.query(
      `INSERT INTO customers
      (
        full_name,
        email,
        phone,
        whatsapp,
        telegram,
        company_name,
        gst_number,
        pan_number,
        password,
        referral_code
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        body.full_name,
        body.email,
        body.phone,
        body.whatsapp,
        body.telegram,
        body.company_name,
        body.gst_number,
        body.pan_number,
        hashedPassword,
        referralCode
      ]
    );

    return NextResponse.json({
      success:true
    });

  } catch(error:any) {

    return NextResponse.json({
      success:false,
      error:error.message
    });
  }
}
