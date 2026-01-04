'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

type Message = {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  message: string;
  read: boolean;
  createdAt: string;
};

export default function AdminMessagesList({ messages: initialMessages }: { messages: Message[] }) {
  const router = useRouter();
  const [messages, setMessages] = useState(initialMessages);

  const handleDelete = async (id: string) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer ce message ?')) return;

    try {
      const res = await fetch(`/api/messages/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Failed to delete');
      
      setMessages(messages.filter(m => m.id !== id));
      router.refresh();
    } catch (error) {
      alert('Erreur: ' + (error as Error).message);
    }
  };

  const toggleRead = async (id: string, currentStatus: boolean) => {
    try {
      const res = await fetch(`/api/messages/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ read: !currentStatus }),
      });
      if (!res.ok) throw new Error('Failed to update');

      setMessages(messages.map(m => m.id === id ? { ...m, read: !currentStatus } : m));
      router.refresh();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div style={{ backgroundColor: 'white', borderRadius: '0.5rem', boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)', overflow: 'hidden' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead style={{ backgroundColor: '#f9fafb' }}>
          <tr>
            <th style={{ padding: '0.75rem 1.5rem', textAlign: 'left', fontSize: '0.75rem', fontWeight: 'bold', color: '#6b7280', textTransform: 'uppercase' }}>État</th>
            <th style={{ padding: '0.75rem 1.5rem', textAlign: 'left', fontSize: '0.75rem', fontWeight: 'bold', color: '#6b7280', textTransform: 'uppercase' }}>Date</th>
            <th style={{ padding: '0.75rem 1.5rem', textAlign: 'left', fontSize: '0.75rem', fontWeight: 'bold', color: '#6b7280', textTransform: 'uppercase' }}>Nom</th>
            <th style={{ padding: '0.75rem 1.5rem', textAlign: 'left', fontSize: '0.75rem', fontWeight: 'bold', color: '#6b7280', textTransform: 'uppercase' }}>Contact</th>
            <th style={{ padding: '0.75rem 1.5rem', textAlign: 'left', fontSize: '0.75rem', fontWeight: 'bold', color: '#6b7280', textTransform: 'uppercase' }}>Message</th>
            <th style={{ padding: '0.75rem 1.5rem', textAlign: 'right', fontSize: '0.75rem', fontWeight: 'bold', color: '#6b7280', textTransform: 'uppercase' }}>Actions</th>
          </tr>
        </thead>
        <tbody style={{ }}>
          {messages.length === 0 ? (
            <tr>
              <td colSpan={6} style={{ padding: '1.5rem', textAlign: 'center', color: '#6b7280' }}>
                Aucun message reçu.
              </td>
            </tr>
          ) : (
            messages.map((msg) => (
              <tr key={msg.id} style={{ borderTop: '1px solid #e5e7eb', backgroundColor: msg.read ? 'white' : '#f0f9ff' }}>
                <td style={{ padding: '1rem 1.5rem' }}>
                    <button 
                        onClick={() => toggleRead(msg.id, msg.read)}
                        style={{ 
                            background: 'none', 
                            border: 'none', 
                            cursor: 'pointer',
                            color: msg.read ? '#9ca3af' : '#2563eb'
                        }}
                        title={msg.read ? "Marquer comme non lu" : "Marquer comme lu"}
                    >
                        <span className={msg.read ? "sli-check" : "sli-envelope-open"} style={{ fontSize: '1.2rem' }}></span>
                    </button>
                </td>
                <td style={{ padding: '1rem 1.5rem', whiteSpace: 'nowrap', fontSize: '0.875rem', color: '#6b7280' }}>
                  {new Date(msg.createdAt).toLocaleDateString('fr-FR')} <br/> 
                  <span style={{ fontSize: '0.75rem' }}>{new Date(msg.createdAt).toLocaleTimeString('fr-FR')}</span>
                </td>
                <td style={{ padding: '1rem 1.5rem', whiteSpace: 'nowrap', fontSize: '0.875rem', color: '#111827', fontWeight: 500 }}>
                  {msg.name}
                </td>
                <td style={{ padding: '1rem 1.5rem', fontSize: '0.875rem', color: '#6b7280' }}>
                  <div style={{ color: '#111827' }}>{msg.email}</div>
                  <div>{msg.phone}</div>
                </td>
                <td style={{ padding: '1rem 1.5rem', fontSize: '0.875rem', color: '#4b5563', maxWidth: '300px' }}>
                  {msg.message}
                </td>
                <td style={{ padding: '1rem 1.5rem', textAlign: 'right' }}>
                    <button 
                        onClick={() => handleDelete(msg.id)}
                        style={{ 
                            background: 'none', 
                            border: 'none', 
                            cursor: 'pointer',
                            color: '#dc2626'
                        }}
                        title="Supprimer"
                    >
                        <span className="sli-trash" style={{ fontSize: '1.2rem' }}></span>
                    </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
