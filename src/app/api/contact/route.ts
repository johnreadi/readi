import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { sendEmail } from '@/lib/mailer';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, message } = body;

    if (!name || !email || !message) {
      return new NextResponse("Missing required fields", { status: 400 });
    }

    const newMessage = await prisma.message.create({
      data: {
        name,
        email,
        phone,
        subject: null,
        message,
        direction: 'INBOUND',
        status: 'RECEIVED',
      },
    });

    try {
      const settings = await prisma.setting.findFirst();
      const forwardTo = settings?.inboundForwardEmail;

      if (forwardTo) {
        const from = process.env.SMTP_USER || 'no-reply@localhost';
        await sendEmail({
          from,
          to: forwardTo,
          subject: `Nouveau message reçu - ${name}`,
          text: `Nom: ${name}\nEmail: ${email}\nTéléphone: ${phone || '-'}\n\nMessage:\n${message}`,
          replyTo: email,
        });
      }
    } catch (error) {
      console.error('Error forwarding inbound message email:', error);
    }

    return NextResponse.json(newMessage);
  } catch (error) {
    console.error('Error creating message:', error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
