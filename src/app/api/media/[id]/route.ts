import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { unlink } from 'fs/promises';
import path from 'path';

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
    const media = await prisma.media.findUnique({
      where: { id },
    });

    if (!media) {
      return new NextResponse("Media not found", { status: 404 });
    }

    // Delete from filesystem
    const filepath = path.join(process.cwd(), 'public', media.url);
    try {
        await unlink(filepath);
    } catch (e) {
        console.warn('Failed to delete file from disk (might not exist):', e);
    }

    // Delete from DB
    await prisma.media.delete({
      where: { id },
    });

    return NextResponse.json({ message: 'Media deleted successfully' });
  } catch (error) {
    console.error('Error deleting media:', error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
