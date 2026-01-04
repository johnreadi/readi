import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import SettingsForm from './SettingsForm';
import { redirect } from 'next/navigation';

export default async function AdminSettings() {
  const session = await getServerSession(authOptions);
  
  if (!session) {
    redirect('/login');
  }

  return (
    <div>
      <h1 style={{ fontSize: '1.875rem', fontWeight: 'bold', color: '#111827', marginBottom: '2rem' }}>
        Paramètres du profil
      </h1>
      <div style={{ backgroundColor: 'white', padding: '2rem', borderRadius: '0.5rem', boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)' }}>
        <SettingsForm user={session.user} />
      </div>
    </div>
  );
}
