import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { sendEmail } from '@/lib/mailer';

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  try {
    const { id } = await params;
    await prisma.message.delete({
      where: { id },
    });

    return NextResponse.json({ message: 'Message deleted' });
  } catch (error) {
    console.error('Error deleting message:', error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  try {
    const { id } = await params;
    const body = await request.json();

    if (typeof body.read === 'boolean') {
      const updatedMessage = await prisma.message.update({
        where: { id },
        data: { read: body.read },
      });

      return NextResponse.json(updatedMessage);
    }

    if (body.send === true) {
      const msg = await prisma.message.findUnique({ where: { id } });
      if (!msg) return new NextResponse('Not Found', { status: 404 });
      if (msg.direction !== 'OUTBOUND') {
        return new NextResponse('Bad Request', { status: 400 });
      }
      if (!msg.toEmail || !msg.message) {
        return new NextResponse('Missing required fields', { status: 400 });
      }

      const settings = await prisma.setting.findFirst();
      const fromEmail = settings?.outboundFromEmail || process.env.SMTP_USER || msg.email;
      const fromName = settings?.outboundFromName || msg.name || 'Readi';
      const from = `${fromName} <${fromEmail}>`;

      try {
        await sendEmail({
          from,
          to: msg.toEmail,
          subject: msg.subject || 'Message',
          text: msg.message,
        });

        const updated = await prisma.message.update({
          where: { id },
          data: {
            status: 'SENT',
            sentAt: new Date(),
            error: null,
            read: true,
          },
        });

        return NextResponse.json(updated);
      } catch (error) {
        const updated = await prisma.message.update({
          where: { id },
          data: {
            status: 'FAILED',
            error: (error as Error).message,
          },
        });

        return NextResponse.json(updated, { status: 502 });
      }
    }

    return new NextResponse('Bad Request', { status: 400 });
  } catch (error) {
    console.error('Error updating message:', error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return new NextResponse('Unauthorized', { status: 401 });
  }

  try {
    const { id } = await params;
    const body = await request.json();
    const { toEmail, toName, subject, message } = body;

    const msg = await prisma.message.findUnique({ where: { id } });
    if (!msg) return new NextResponse('Not Found', { status: 404 });
    if (msg.direction !== 'OUTBOUND') {
      return new NextResponse('Bad Request', { status: 400 });
    }

    const updated = await prisma.message.update({
      where: { id },
      data: {
        toEmail: toEmail ?? msg.toEmail,
        toName: toName ?? msg.toName,
        subject: subject ?? msg.subject,
        message: message ?? msg.message,
        status: 'DRAFT',
      },
    });

    return NextResponse.json(updated);
  } catch (error) {
    console.error('Error updating message:', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}
