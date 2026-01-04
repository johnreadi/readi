import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

async function getOrCreateSettings() {
  const existing = await prisma.setting.findFirst();
  if (existing) return existing;
  return prisma.setting.create({ data: {} });
}

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session) {
    return new NextResponse('Unauthorized', { status: 401 });
  }

  try {
    const settings = await getOrCreateSettings();
    return NextResponse.json(settings);
  } catch (error) {
    console.error('Error fetching settings:', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}

export async function PUT(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return new NextResponse('Unauthorized', { status: 401 });
  }

  try {
    const body = await request.json();
    const { inboundForwardEmail, outboundFromName, outboundFromEmail } = body;

    const settings = await getOrCreateSettings();

    const updated = await prisma.setting.update({
      where: { id: settings.id },
      data: {
        inboundForwardEmail: inboundForwardEmail ?? null,
        outboundFromName: outboundFromName ?? null,
        outboundFromEmail: outboundFromEmail ?? null,
      },
    });

    return NextResponse.json(updated);
  } catch (error) {
    console.error('Error updating settings:', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}
