import { prisma } from '@/lib/prisma';
import MediaLibrary from './MediaLibrary';

export default async function AdminMedia() {
  const media = await prisma.media.findMany({
    orderBy: { createdAt: 'desc' },
  });

  const serializedMedia = media.map(m => ({
    ...m,
    createdAt: m.createdAt.toISOString(),
  }));

  return <MediaLibrary initialMedia={serializedMedia} />;
}
