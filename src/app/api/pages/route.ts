import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  try {
    const body = await request.json();
    const { title, slug } = body;

    if (!title || !slug) {
      return new NextResponse("Missing title or slug", { status: 400 });
    }

    const page = await prisma.page.create({
      data: {
        title,
        slug,
      },
    });

    return NextResponse.json(page);
  } catch (error) {
    console.error('Error creating page:', error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
