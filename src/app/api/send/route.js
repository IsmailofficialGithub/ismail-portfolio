import { NextResponse } from "next/server";
import { sendEmail } from "@/lib/nodemailer";

export async function POST(req, res) {
  const { email, subject, message } = await req.json();
  try {
   const ownerMail = {
      from: `"Portfolio Contact" <${process.env.SMTP_USER}>`,
      to: process.env.AdminEmail, // your personal inbox
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

    // 2️⃣ Auto-reply to the sender
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

    // Send both mails
  const owner=  await sendEmail(ownerMail);
    const sender=await sendEmail(senderMail);
    console.log(owner,sender)
    return NextResponse.json("Email sent successfully" ,{status:200});
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
