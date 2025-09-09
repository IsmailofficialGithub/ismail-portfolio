import { NextResponse } from "next/server";
import {  transporter } from "@/lib/nodemailer";

export async function POST(req, res) {
  const { email, subject, message } = await req.json();


  try {
    const data=await transporter.verify();
    if(!data){
      throw new Error("Email server not ready");
    }
    // 1️⃣ Mail to Owner (you)
    const ownerMail = {
      from: `"Portfolio Contact" <${process.env.AdminEmail}>`,
      to: process.env.AdminEmail,
      subject: `📩 New Portfolio Message: ${subject || "No subject"}`,
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; color: #333;">
          <h2 style="color: #4CAF50;">New Message from Portfolio</h2>
          <p><strong>From:</strong> ${email}</p>
          <p><strong>Subject:</strong> ${subject}</p>
          <hr style="margin: 20px 0;">
          <p style="font-size: 15px; line-height: 1.5;">${message}</p>
        </div>
      `,
    };

    // 2️⃣ Auto-reply to Sender
    const senderMail = {
      from: `"Ismail Abbasi" <${process.env.AdminEmail}>`,
      to: email,
      subject: "✅ Your message was received",
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; color: #333;">
          <h2 style="color: #4CAF50;">Thank you for contacting me!</h2>
          <p>I have received your message and will get back to you soon.</p>
          <hr style="margin: 20px 0;">
          <p><strong>Your message:</strong></p>
          <blockquote style="border-left: 4px solid #4CAF50; padding-left: 10px; color: #555;">
            ${message}
          </blockquote>
          <p style="color: #777;">Best regards,<br/>Ismail Abbasi</p>
        </div>
      `,
    };

    // ✅ Send Emails
    const owner = await transporter.sendMail(ownerMail);
    const sender = await transporter.sendMail(senderMail);

    return NextResponse.json("Email sent successfully" ,{status:200});
  } catch (error) {
    console.error("Email error:", error); // full error in server logs
  return NextResponse.json(
    { error: error.message || "Something went wrong" },
    { status: 500 }
  );
  }
}
