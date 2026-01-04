import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

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
        message,
      },
    });

    return NextResponse.json(newMessage);
  } catch (error) {
    console.error('Error creating message:', error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
