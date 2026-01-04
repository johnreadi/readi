import { prisma } from '@/lib/prisma';
import PageEditor from './PageEditor';
import { notFound } from 'next/navigation';

export default async function AdminPageEdit({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const page = await prisma.page.findUnique({
    where: { id: id },
    include: { blocks: { orderBy: { order: 'asc' } } }
  });

  if (!page) {
    notFound();
  }

  const serializedPage = {
    ...page,
    createdAt: page.createdAt.toISOString(),
    updatedAt: page.updatedAt.toISOString(),
  };

  return <PageEditor page={serializedPage} />;
}
