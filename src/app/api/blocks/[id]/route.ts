import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { revalidatePath } from 'next/cache';

// PUT /api/blocks/[id] - Mettre à jour un bloc
export async function PUT(
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
    const { content, order, type } = body;

    const updateData: any = {};
    if (content) updateData.content = typeof content === 'string' ? content : JSON.stringify(content);
    if (order !== undefined) updateData.order = order;
    if (type) updateData.type = type;

    const updatedBlock = await prisma.block.update({
      where: { id: id },
      data: updateData,
      include: { page: true }
    });

    if (updatedBlock.page) {
        revalidatePath(`/${updatedBlock.page.slug === 'home' ? '' : updatedBlock.page.slug}`);
    }

    return NextResponse.json(updatedBlock);
  } catch (error) {
    console.error('Error updating block:', error);
    return NextResponse.json({ error: 'Failed to update block' }, { status: 500 });
  }
}

// DELETE /api/blocks/[id] - Supprimer un bloc
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
    const block = await prisma.block.findUnique({ where: { id }, include: { page: true } });
    
    if (block) {
        await prisma.block.delete({
            where: { id: id },
        });
        if (block.page) {
            revalidatePath(`/${block.page.slug === 'home' ? '' : block.page.slug}`);
        }
    }

    return NextResponse.json({ message: 'Block deleted successfully' });
  } catch (error) {
    console.error('Error deleting block:', error);
    return NextResponse.json({ error: 'Failed to delete block' }, { status: 500 });
  }
}
