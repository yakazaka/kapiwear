import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: Request) {
  try {
    const { to, subject, text } = await req.json();

    // Mail gönderici ayarları (Gmail kullanacağız)
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER, // Senin Gmail adresin
        pass: process.env.EMAIL_PASS, // Normal şifren değil, "Uygulama Şifresi"
      },
    });

    const mailOptions = {
      from: `"KAPIWEAR" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      text,
    };

    await transporter.sendMail(mailOptions);
    return NextResponse.json({ message: 'Mail başarıyla gönderildi' }, { status: 200 });
  } catch (error: any) {
    console.error("Mail gönderme hatası:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}