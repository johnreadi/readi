import { prisma } from '@/lib/prisma';
import UserList from './UserList';

export default async function AdminUsers() {
  const users = await prisma.user.findMany({
    orderBy: { createdAt: 'desc' },
    select: {
        id: true,
        email: true,
        name: true,
        role: true,
        createdAt: true,
    }
  });

  const serializedUsers = users.map(user => ({
    ...user,
    createdAt: user.createdAt.toISOString(),
  }));

  return <UserList users={serializedUsers} />;
}
