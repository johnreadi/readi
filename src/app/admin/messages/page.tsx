import { prisma } from '@/lib/prisma';
import AdminMessagesList from './AdminMessagesList';

export default async function AdminMessages() {
  const messages = await prisma.message.findMany({
    orderBy: { createdAt: 'desc' },
  });

  const serializedMessages = messages.map(msg => ({
    ...msg,
    createdAt: msg.createdAt.toISOString(),
  }));

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '1.875rem', fontWeight: 'bold', color: '#111827' }}>
          Messages ({messages.length})
        </h1>
      </div>

      <AdminMessagesList messages={serializedMessages} />
    </div>
  );
}
