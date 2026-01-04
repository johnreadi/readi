import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { sendEmail } from '@/lib/mailer';

function buildFrom(settings: { outboundFromName: string | null; outboundFromEmail: string | null }) {
  const email = settings.outboundFromEmail || process.env.SMTP_USER || 'no-reply@localhost';
  const name = settings.outboundFromName || 'Readi';
  return `${name} <${email}>`;
}

export async function GET(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return new NextResponse('Unauthorized', { status: 401 });
  }

  try {
    const { searchParams } = new URL(request.url);
    const direction = searchParams.get('direction');

    const where: any = {};
    if (direction) where.direction = direction;

    const messages = await prisma.message.findMany({
      where,
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json(messages);
  } catch (error) {
    console.error('Error fetching messages:', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return new NextResponse('Unauthorized', { status: 401 });
  }

  try {
    const body = await request.json();
    const { toEmail, toName, subject, message, send } = body;

    if (!toEmail || !message) {
      return new NextResponse('Missing required fields', { status: 400 });
    }

    const settings = await prisma.setting.findFirst();
    const from = buildFrom({
      outboundFromName: settings?.outboundFromName ?? null,
      outboundFromEmail: settings?.outboundFromEmail ?? null,
    });

    const created = await prisma.message.create({
      data: {
        name: settings?.outboundFromName || session.user?.name || 'Readi',
        email: settings?.outboundFromEmail || session.user?.email || (process.env.SMTP_USER || 'no-reply@localhost'),
        phone: null,
        subject: subject ?? null,
        message,
        read: true,
        direction: 'OUTBOUND',
        status: send ? 'SENT' : 'DRAFT',
        toName: toName ?? null,
        toEmail,
        sentAt: send ? new Date() : null,
      },
    });

    if (send) {
      try {
        await sendEmail({
          from,
          to: toEmail,
          subject: subject || 'Message',
          text: message,
        });

        const updated = await prisma.message.update({
          where: { id: created.id },
          data: {
            status: 'SENT',
            sentAt: new Date(),
            error: null,
          },
        });

        return NextResponse.json(updated);
      } catch (error) {
        const updated = await prisma.message.update({
          where: { id: created.id },
          data: {
            status: 'FAILED',
            error: (error as Error).message,
          },
        });

        return NextResponse.json(updated, { status: 502 });
      }
    }

    return NextResponse.json(created);
  } catch (error) {
    console.error('Error creating message:', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}
