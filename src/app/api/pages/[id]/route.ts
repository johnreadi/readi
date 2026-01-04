import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { revalidatePath } from 'next/cache';

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const { id } = await params;
  const body = await request.json();
  const { title, slug, metaDesc } = body;

  try {
    const page = await prisma.page.update({
      where: { id: id },
      data: {
        title,
        slug,
        metaDesc,
      },
    });

    revalidatePath(`/${slug === 'home' ? '' : slug}`);
    return NextResponse.json(page);
  } catch (error) {
    console.error('Error updating page:', error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const { id } = await params;

  try {
    const page = await prisma.page.delete({
      where: { id: id },
    });

    return NextResponse.json(page);
  } catch (error) {
    console.error('Error deleting page:', error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
