'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function SettingsForm({ user }: { user: any }) {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: user.name || '',
    email: user.email || '',
    password: '',
    confirmPassword: '',
  });

  const [mailSettings, setMailSettings] = useState({
    inboundForwardEmail: '',
    outboundFromName: '',
    outboundFromEmail: '',
  });

  const [message, setMessage] = useState({ type: '', text: '' });

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch('/api/settings');
        if (!res.ok) return;
        const data = await res.json();
        if (cancelled) return;
        setMailSettings({
          inboundForwardEmail: data?.inboundForwardEmail || '',
          outboundFromName: data?.outboundFromName || '',
          outboundFromEmail: data?.outboundFromEmail || '',
        });
      } catch {
        // ignore
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage({ type: '', text: '' });

    if (formData.password && formData.password !== formData.confirmPassword) {
      setMessage({ type: 'error', text: 'Les mots de passe ne correspondent pas' });
      return;
    }

    try {
      const [profileRes, settingsRes] = await Promise.all([
        fetch(`/api/users/${user.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: formData.name,
            email: formData.email,
            password: formData.password || undefined,
          }),
        }),
        fetch('/api/settings', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            inboundForwardEmail: mailSettings.inboundForwardEmail || null,
            outboundFromName: mailSettings.outboundFromName || null,
            outboundFromEmail: mailSettings.outboundFromEmail || null,
          }),
        }),
      ]);

      if (!profileRes.ok) throw new Error('Erreur lors de la mise à jour du profil');
      if (!settingsRes.ok) throw new Error('Erreur lors de la mise à jour des paramètres');

      setMessage({ type: 'success', text: 'Profil mis à jour avec succès' });
      router.refresh();
      setFormData(prev => ({ ...prev, password: '', confirmPassword: '' }));
    } catch (error) {
        console.error(error);
      setMessage({ type: 'error', text: 'Une erreur est survenue' });
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: '600px' }}>
      {message.text && (
        <div style={{ 
          padding: '1rem', 
          marginBottom: '1rem', 
          borderRadius: '0.375rem', 
          backgroundColor: message.type === 'error' ? '#fee2e2' : '#dcfce7',
          color: message.type === 'error' ? '#dc2626' : '#16a34a'
        }}>
          {message.text}
        </div>
      )}

      <div style={{ marginBottom: '1.5rem' }}>
        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Nom</label>
        <input
          type="text"
          value={formData.name}
          onChange={e => setFormData({ ...formData, name: e.target.value })}
          style={{ width: '100%', padding: '0.5rem', border: '1px solid #d1d5db', borderRadius: '0.375rem' }}
        />
      </div>

      <div style={{ marginBottom: '1.5rem' }}>
        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Email</label>
        <input
          type="email"
          value={formData.email}
          onChange={e => setFormData({ ...formData, email: e.target.value })}
          style={{ width: '100%', padding: '0.5rem', border: '1px solid #d1d5db', borderRadius: '0.375rem' }}
        />
      </div>

      <div style={{ borderTop: '1px solid #e5e7eb', margin: '2rem 0', paddingTop: '2rem' }}>
        <h3 style={{ fontSize: '1.125rem', fontWeight: 'bold', marginBottom: '1.5rem' }}>Changer le mot de passe</h3>
        
        <div style={{ marginBottom: '1.5rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Nouveau mot de passe</label>
          <input
            type="password"
            value={formData.password}
            onChange={e => setFormData({ ...formData, password: e.target.value })}
            style={{ width: '100%', padding: '0.5rem', border: '1px solid #d1d5db', borderRadius: '0.375rem' }}
            placeholder="Laisser vide pour ne pas changer"
          />
        </div>

        <div style={{ marginBottom: '1.5rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Confirmer le mot de passe</label>
          <input
            type="password"
            value={formData.confirmPassword}
            onChange={e => setFormData({ ...formData, confirmPassword: e.target.value })}
            style={{ width: '100%', padding: '0.5rem', border: '1px solid #d1d5db', borderRadius: '0.375rem' }}
          />
        </div>
      </div>

      <div style={{ borderTop: '1px solid #e5e7eb', margin: '2rem 0', paddingTop: '2rem' }}>
        <h3 style={{ fontSize: '1.125rem', fontWeight: 'bold', marginBottom: '1.5rem' }}>Paramètres de messagerie</h3>

        <div style={{ marginBottom: '1.5rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Email de copie (messages reçus)</label>
          <input
            type="email"
            value={mailSettings.inboundForwardEmail}
            onChange={e => setMailSettings({ ...mailSettings, inboundForwardEmail: e.target.value })}
            style={{ width: '100%', padding: '0.5rem', border: '1px solid #d1d5db', borderRadius: '0.375rem' }}
            placeholder="ex: contact@readi.fr"
          />
        </div>

        <div style={{ marginBottom: '1.5rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Nom expéditeur (messages sortants)</label>
          <input
            type="text"
            value={mailSettings.outboundFromName}
            onChange={e => setMailSettings({ ...mailSettings, outboundFromName: e.target.value })}
            style={{ width: '100%', padding: '0.5rem', border: '1px solid #d1d5db', borderRadius: '0.375rem' }}
            placeholder="Readi"
          />
        </div>

        <div style={{ marginBottom: '1.5rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Email expéditeur (messages sortants)</label>
          <input
            type="email"
            value={mailSettings.outboundFromEmail}
            onChange={e => setMailSettings({ ...mailSettings, outboundFromEmail: e.target.value })}
            style={{ width: '100%', padding: '0.5rem', border: '1px solid #d1d5db', borderRadius: '0.375rem' }}
            placeholder="ex: no-reply@readi.fr"
          />
        </div>
      </div>

      <button
        type="submit"
        style={{
          backgroundColor: '#2563eb',
          color: 'white',
          padding: '0.75rem 1.5rem',
          borderRadius: '0.375rem',
          border: 'none',
          cursor: 'pointer',
          fontWeight: 500
        }}
      >
        Enregistrer les modifications
      </button>
    </form>
  );
}
