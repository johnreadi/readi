'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

type User = {
  id: number;
  email: string;
  name: string | null;
  role: string;
  createdAt: string;
};

export default function UserList({ users: initialUsers }: { users: User[] }) {
  const router = useRouter();
  const [users, setUsers] = useState(initialUsers);
  const [isAdding, setIsAdding] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
        const res = await fetch('/api/users', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData),
        });

        if (!res.ok) throw new Error('Failed to create user');
        
        const newUser = await res.json();
        setUsers([newUser, ...users]);
        setIsAdding(false);
        setFormData({ email: '', password: '', name: '' });
        router.refresh();
    } catch (error) {
        alert('Erreur: ' + (error as Error).message);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer cet utilisateur ?')) return;

    try {
      const res = await fetch(`/api/users/${id}`, {
        method: 'DELETE',
      });

      if (!res.ok) throw new Error('Delete failed');

      setUsers(users.filter(u => u.id !== id));
      router.refresh();
    } catch (error) {
      alert('Erreur: ' + (error as Error).message);
    }
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '1.875rem', fontWeight: 'bold', color: '#111827' }}>
          Utilisateurs
        </h1>
        <button
            onClick={() => setIsAdding(!isAdding)}
            style={{
                backgroundColor: '#2563eb',
                color: 'white',
                padding: '0.5rem 1rem',
                borderRadius: '0.375rem',
                border: 'none',
                cursor: 'pointer',
                fontWeight: 500
            }}
        >
            {isAdding ? 'Annuler' : 'Ajouter un utilisateur'}
        </button>
      </div>

      {isAdding && (
        <div style={{ backgroundColor: 'white', padding: '1.5rem', borderRadius: '0.5rem', boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)', marginBottom: '2rem' }}>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '1rem' }}>Nouvel utilisateur</h3>
            <form onSubmit={handleSubmit}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                    <div>
                        <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, marginBottom: '0.25rem' }}>Email</label>
                        <input 
                            type="email" 
                            required 
                            value={formData.email}
                            onChange={(e) => setFormData({...formData, email: e.target.value})}
                            style={{ width: '100%', padding: '0.5rem', border: '1px solid #d1d5db', borderRadius: '0.375rem' }}
                        />
                    </div>
                    <div>
                        <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, marginBottom: '0.25rem' }}>Nom</label>
                        <input 
                            type="text" 
                            value={formData.name}
                            onChange={(e) => setFormData({...formData, name: e.target.value})}
                            style={{ width: '100%', padding: '0.5rem', border: '1px solid #d1d5db', borderRadius: '0.375rem' }}
                        />
                    </div>
                    <div>
                        <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, marginBottom: '0.25rem' }}>Mot de passe</label>
                        <input 
                            type="password" 
                            required 
                            value={formData.password}
                            onChange={(e) => setFormData({...formData, password: e.target.value})}
                            style={{ width: '100%', padding: '0.5rem', border: '1px solid #d1d5db', borderRadius: '0.375rem' }}
                        />
                    </div>
                </div>
                <button 
                    type="submit"
                    style={{
                        backgroundColor: '#10b981',
                        color: 'white',
                        padding: '0.5rem 1rem',
                        borderRadius: '0.375rem',
                        border: 'none',
                        cursor: 'pointer',
                        fontWeight: 500
                    }}
                >
                    Créer
                </button>
            </form>
        </div>
      )}

      <div style={{ backgroundColor: 'white', borderRadius: '0.5rem', boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead style={{ backgroundColor: '#f9fafb' }}>
            <tr>
              <th style={{ padding: '0.75rem 1.5rem', textAlign: 'left', fontSize: '0.75rem', fontWeight: 'bold', textTransform: 'uppercase', color: '#6b7280' }}>Utilisateur</th>
              <th style={{ padding: '0.75rem 1.5rem', textAlign: 'left', fontSize: '0.75rem', fontWeight: 'bold', textTransform: 'uppercase', color: '#6b7280' }}>Role</th>
              <th style={{ padding: '0.75rem 1.5rem', textAlign: 'right', fontSize: '0.75rem', fontWeight: 'bold', textTransform: 'uppercase', color: '#6b7280' }}>Actions</th>
            </tr>
          </thead>
          <tbody style={{ }}>
            {users.map((user) => (
              <tr key={user.id} style={{ borderTop: '1px solid #e5e7eb' }}>
                <td style={{ padding: '1rem 1.5rem' }}>
                    <div style={{ fontWeight: 500, color: '#111827' }}>{user.name || 'Sans nom'}</div>
                    <div style={{ fontSize: '0.875rem', color: '#6b7280' }}>{user.email}</div>
                </td>
                <td style={{ padding: '1rem 1.5rem' }}>
                    <span style={{ 
                        padding: '0.25rem 0.5rem', 
                        backgroundColor: '#dbeafe', 
                        color: '#1e40af', 
                        borderRadius: '0.25rem', 
                        fontSize: '0.75rem', 
                        fontWeight: 500 
                    }}>
                        {user.role}
                    </span>
                </td>
                <td style={{ padding: '1rem 1.5rem', textAlign: 'right' }}>
                    <button 
                        onClick={() => handleDelete(user.id)}
                        style={{ color: '#dc2626', background: 'none', border: 'none', cursor: 'pointer', fontSize: '0.875rem' }}
                    >
                        Supprimer
                    </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
