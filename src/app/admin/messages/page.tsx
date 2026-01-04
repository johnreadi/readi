import AdminMailbox from './AdminMailbox';

export default function AdminMessages() {
  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '1.875rem', fontWeight: 'bold', color: '#111827' }}>Messages</h1>
      </div>

      <AdminMailbox />
    </div>
  );
}
