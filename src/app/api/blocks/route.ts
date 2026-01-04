import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { revalidatePath } from 'next/cache';

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  try {
    const body = await request.json();
    const { pageId, type, order, content } = body;

    const block = await prisma.block.create({
      data: {
        pageId,
        type,
        order,
        content: JSON.stringify(content || {}),
      },
      include: { page: true }
    });

    if (block.page) {
        revalidatePath(`/${block.page.slug === 'home' ? '' : block.page.slug}`);
    }

    return NextResponse.json(block);
  } catch (error) {
    console.error('Error creating block:', error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
