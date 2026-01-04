'use client';

import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';

type Message = {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  subject: string | null;
  message: string;
  read: boolean;
  direction: string;
  status: string;
  toName: string | null;
  toEmail: string | null;
  sentAt: string | null;
  error: string | null;
  createdAt: string;
};

type MailboxTab = 'inbox' | 'sent' | 'drafts' | 'failed';

type ComposeState = {
  mode: 'view' | 'compose';
  draftId?: string;
  toEmail: string;
  toName: string;
  subject: string;
  body: string;
};

const tabLabels: Record<MailboxTab, string> = {
  inbox: 'Réception',
  sent: 'Envoyés',
  drafts: 'Brouillons',
  failed: 'Échecs',
};

function formatDate(dateIso: string) {
  const d = new Date(dateIso);
  return `${d.toLocaleDateString('fr-FR')} ${d.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}`;
}

function badgeColor(status: string) {
  if (status === 'SENT') return { bg: '#dcfce7', fg: '#166534' };
  if (status === 'FAILED') return { bg: '#fee2e2', fg: '#991b1b' };
  if (status === 'DRAFT') return { bg: '#e0f2fe', fg: '#075985' };
  return { bg: '#f3f4f6', fg: '#374151' };
}

export default function AdminMailbox() {
  const router = useRouter();
  const [tab, setTab] = useState<MailboxTab>('inbox');
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [compose, setCompose] = useState<ComposeState>({
    mode: 'view',
    toEmail: '',
    toName: '',
    subject: '',
    body: '',
  });

  const apiFilter = useMemo(() => {
    if (tab === 'inbox') return { direction: 'INBOUND' };
    if (tab === 'sent') return { direction: 'OUTBOUND', status: 'SENT' };
    if (tab === 'drafts') return { direction: 'OUTBOUND', status: 'DRAFT' };
    return { direction: 'OUTBOUND', status: 'FAILED' };
  }, [tab]);

  const selected = useMemo(() => messages.find(m => m.id === selectedId) || null, [messages, selectedId]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return messages;

    return messages.filter(m => {
      const hay = [
        m.name,
        m.email,
        m.phone || '',
        m.subject || '',
        m.message,
        m.toEmail || '',
        m.toName || '',
        m.status,
      ]
        .join(' ')
        .toLowerCase();
      return hay.includes(q);
    });
  }, [messages, query]);

  async function fetchMessages() {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (apiFilter.direction) params.set('direction', apiFilter.direction);
      if ((apiFilter as any).status) params.set('status', (apiFilter as any).status);

      const res = await fetch(`/api/messages?${params.toString()}`);
      if (!res.ok) throw new Error('Impossible de charger les messages');
      const data = await res.json();

      const normalized: Message[] = (data || []).map((m: any) => ({
        ...m,
        createdAt: typeof m.createdAt === 'string' ? m.createdAt : new Date(m.createdAt).toISOString(),
        sentAt: m.sentAt ? (typeof m.sentAt === 'string' ? m.sentAt : new Date(m.sentAt).toISOString()) : null,
      }));

      setMessages(normalized);
      if (normalized.length > 0) {
        setSelectedId(prev => (prev && normalized.some(x => x.id === prev) ? prev : normalized[0].id));
      } else {
        setSelectedId(null);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchMessages();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tab]);

  async function toggleRead(msg: Message) {
    try {
      const res = await fetch(`/api/messages/${msg.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ read: !msg.read }),
      });
      if (!res.ok) throw new Error('Impossible de mettre à jour');
      const updated = await res.json();
      setMessages(prev => prev.map(m => (m.id === msg.id ? { ...m, ...updated } : m)));
      router.refresh();
    } catch (e) {
      console.error(e);
    }
  }

  async function deleteMessage(id: string) {
    if (!confirm('Supprimer ce message ?')) return;
    try {
      const res = await fetch(`/api/messages/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Suppression impossible');
      setMessages(prev => prev.filter(m => m.id !== id));
      if (selectedId === id) setSelectedId(null);
      router.refresh();
    } catch (e) {
      console.error(e);
    }
  }

  function startNewMessage() {
    setCompose({
      mode: 'compose',
      toEmail: '',
      toName: '',
      subject: '',
      body: '',
    });
    setSelectedId(null);
  }

  function startReply(msg: Message) {
    const subject = msg.subject ? (msg.subject.startsWith('Re:') ? msg.subject : `Re: ${msg.subject}`) : `Re: Message`;
    const body = `\n\n---\nDe: ${msg.name} <${msg.email}>\nDate: ${formatDate(msg.createdAt)}\n\n${msg.message}`;

    setCompose({
      mode: 'compose',
      toEmail: msg.email,
      toName: msg.name,
      subject,
      body,
    });
    setSelectedId(null);
  }

  function startEditDraft(msg: Message) {
    setCompose({
      mode: 'compose',
      draftId: msg.id,
      toEmail: msg.toEmail || '',
      toName: msg.toName || '',
      subject: msg.subject || '',
      body: msg.message || '',
    });
    setSelectedId(null);
  }

  async function saveDraft(sendNow: boolean) {
    if (!compose.toEmail || !compose.body) {
      alert('Destinataire et message requis');
      return;
    }

    try {
      setLoading(true);
      if (compose.draftId) {
        const res = await fetch(`/api/messages/${compose.draftId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            toEmail: compose.toEmail,
            toName: compose.toName || null,
            subject: compose.subject || null,
            message: compose.body,
          }),
        });
        if (!res.ok) throw new Error('Enregistrement impossible');
        const updated = await res.json();

        if (sendNow) {
          const sendRes = await fetch(`/api/messages/${updated.id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ send: true }),
          });
          const sentPayload = await sendRes.json();
          if (!sendRes.ok) {
            alert(sentPayload?.error || 'Envoi échoué');
          }
        }
      } else {
        const res = await fetch('/api/messages', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            toEmail: compose.toEmail,
            toName: compose.toName || null,
            subject: compose.subject || null,
            message: compose.body,
            send: sendNow,
          }),
        });
        const payload = await res.json();
        if (!res.ok) {
          alert(payload?.error || 'Création/Envoi échoué');
        }
      }

      setCompose({ mode: 'view', toEmail: '', toName: '', subject: '', body: '' });
      setTab(sendNow ? 'sent' : 'drafts');
      await fetchMessages();
      router.refresh();
    } catch (e) {
      console.error(e);
      alert((e as Error).message);
    } finally {
      setLoading(false);
    }
  }

  const leftWidth = 380;

  return (
    <div style={{ display: 'flex', gap: '1.25rem', height: 'calc(100vh - 8rem)' }}>
      <div style={{ width: leftWidth, minWidth: leftWidth, backgroundColor: 'white', borderRadius: '0.75rem', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
        <div style={{ padding: '1rem', borderBottom: '1px solid #e5e7eb' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '0.75rem' }}>
            <div style={{ fontWeight: 700, color: '#111827' }}>Boîte de réception</div>
            <button onClick={startNewMessage} style={{ backgroundColor: '#2563eb', color: 'white', border: 'none', borderRadius: '0.5rem', padding: '0.5rem 0.75rem', cursor: 'pointer', fontWeight: 600 }}>
              Nouveau
            </button>
          </div>

          <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.75rem', flexWrap: 'wrap' }}>
            {(Object.keys(tabLabels) as MailboxTab[]).map(t => (
              <button
                key={t}
                onClick={() => setTab(t)}
                style={{
                  border: '1px solid #e5e7eb',
                  backgroundColor: tab === t ? '#111827' : 'white',
                  color: tab === t ? 'white' : '#111827',
                  borderRadius: '999px',
                  padding: '0.35rem 0.65rem',
                  cursor: 'pointer',
                  fontSize: '0.8rem',
                  fontWeight: 600,
                }}
              >
                {tabLabels[t]}
              </button>
            ))}
          </div>

          <div style={{ marginTop: '0.75rem' }}>
            <input
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="Rechercher..."
              style={{ width: '100%', padding: '0.6rem 0.75rem', border: '1px solid #e5e7eb', borderRadius: '0.5rem' }}
            />
          </div>
        </div>

        <div style={{ overflowY: 'auto', flex: 1 }}>
          {loading && messages.length === 0 ? (
            <div style={{ padding: '1rem', color: '#6b7280' }}>Chargement...</div>
          ) : filtered.length === 0 ? (
            <div style={{ padding: '1rem', color: '#6b7280' }}>Aucun message.</div>
          ) : (
            filtered.map(m => {
              const isSelected = m.id === selectedId && compose.mode === 'view';
              const primary = m.direction === 'INBOUND' ? m.name : m.toName || m.toEmail || 'Destinataire';
              const secondary = m.direction === 'INBOUND' ? m.email : m.toEmail || '';
              const preview = (m.subject || '').trim() || (m.message || '').slice(0, 70);
              const pill = badgeColor(m.status);

              return (
                <button
                  key={m.id}
                  onClick={() => {
                    setSelectedId(m.id);
                    setCompose({ mode: 'view', toEmail: '', toName: '', subject: '', body: '' });
                  }}
                  style={{
                    width: '100%',
                    textAlign: 'left',
                    border: 'none',
                    backgroundColor: isSelected ? '#f3f4f6' : 'white',
                    padding: '0.9rem 1rem',
                    borderBottom: '1px solid #f3f4f6',
                    cursor: 'pointer',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', gap: '0.75rem' }}>
                    <div style={{ minWidth: 0 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <div style={{ fontWeight: m.read ? 600 : 800, color: '#111827', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{primary}</div>
                        {!m.read && m.direction === 'INBOUND' ? (
                          <span style={{ width: 8, height: 8, borderRadius: 999, backgroundColor: '#2563eb', display: 'inline-block' }} />
                        ) : null}
                      </div>
                      <div style={{ fontSize: '0.8rem', color: '#6b7280', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{secondary}</div>
                      <div style={{ fontSize: '0.85rem', color: '#374151', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{preview}</div>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '0.35rem' }}>
                      <div style={{ fontSize: '0.75rem', color: '#6b7280' }}>{formatDate(m.createdAt)}</div>
                      <div style={{ fontSize: '0.7rem', backgroundColor: pill.bg, color: pill.fg, padding: '0.15rem 0.45rem', borderRadius: '999px', fontWeight: 700 }}>{m.status}</div>
                    </div>
                  </div>
                </button>
              );
            })
          )}
        </div>
      </div>

      <div style={{ flex: 1, backgroundColor: 'white', borderRadius: '0.75rem', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
        <div style={{ padding: '1rem 1.25rem', borderBottom: '1px solid #e5e7eb', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem' }}>
          <div style={{ fontWeight: 800, color: '#111827' }}>
            {compose.mode === 'compose' ? 'Nouveau message' : selected ? (selected.subject || 'Message') : 'Sélectionne un message'}
          </div>

          <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
            {compose.mode === 'view' && selected ? (
              <>
                {selected.direction === 'INBOUND' ? (
                  <button
                    onClick={() => startReply(selected)}
                    style={{ backgroundColor: '#111827', color: 'white', border: 'none', borderRadius: '0.5rem', padding: '0.45rem 0.7rem', cursor: 'pointer', fontWeight: 700 }}
                  >
                    Répondre
                  </button>
                ) : null}

                {selected.direction === 'OUTBOUND' && selected.status !== 'SENT' ? (
                  <button
                    onClick={() => startEditDraft(selected)}
                    style={{ backgroundColor: '#111827', color: 'white', border: 'none', borderRadius: '0.5rem', padding: '0.45rem 0.7rem', cursor: 'pointer', fontWeight: 700 }}
                  >
                    Modifier
                  </button>
                ) : null}

                {selected.direction === 'OUTBOUND' && selected.status !== 'SENT' ? (
                  <button
                    onClick={async () => {
                      setCompose({ mode: 'view', toEmail: '', toName: '', subject: '', body: '' });
                      setLoading(true);
                      try {
                        const res = await fetch(`/api/messages/${selected.id}`, {
                          method: 'PATCH',
                          headers: { 'Content-Type': 'application/json' },
                          body: JSON.stringify({ send: true }),
                        });
                        const payload = await res.json();
                        if (!res.ok) {
                          alert(payload?.error || 'Envoi échoué');
                        }
                        await fetchMessages();
                      } finally {
                        setLoading(false);
                      }
                    }}
                    style={{ backgroundColor: '#2563eb', color: 'white', border: 'none', borderRadius: '0.5rem', padding: '0.45rem 0.7rem', cursor: 'pointer', fontWeight: 800 }}
                  >
                    Envoyer
                  </button>
                ) : null}

                {selected.direction === 'INBOUND' ? (
                  <button
                    onClick={() => toggleRead(selected)}
                    style={{ backgroundColor: 'white', color: '#111827', border: '1px solid #e5e7eb', borderRadius: '0.5rem', padding: '0.45rem 0.7rem', cursor: 'pointer', fontWeight: 700 }}
                  >
                    {selected.read ? 'Marquer non lu' : 'Marquer lu'}
                  </button>
                ) : null}

                <button
                  onClick={() => deleteMessage(selected.id)}
                  style={{ backgroundColor: 'white', color: '#b91c1c', border: '1px solid #fee2e2', borderRadius: '0.5rem', padding: '0.45rem 0.7rem', cursor: 'pointer', fontWeight: 800 }}
                >
                  Supprimer
                </button>
              </>
            ) : null}

            {compose.mode === 'compose' ? (
              <>
                <button
                  onClick={() => saveDraft(false)}
                  disabled={loading}
                  style={{ backgroundColor: 'white', color: '#111827', border: '1px solid #e5e7eb', borderRadius: '0.5rem', padding: '0.45rem 0.7rem', cursor: 'pointer', fontWeight: 800 }}
                >
                  Enregistrer brouillon
                </button>
                <button
                  onClick={() => saveDraft(true)}
                  disabled={loading}
                  style={{ backgroundColor: '#2563eb', color: 'white', border: 'none', borderRadius: '0.5rem', padding: '0.45rem 0.7rem', cursor: 'pointer', fontWeight: 900 }}
                >
                  Envoyer
                </button>
                <button
                  onClick={() => {
                    setCompose({ mode: 'view', toEmail: '', toName: '', subject: '', body: '' });
                    setSelectedId(messages[0]?.id || null);
                  }}
                  style={{ backgroundColor: 'white', color: '#6b7280', border: '1px solid #e5e7eb', borderRadius: '0.5rem', padding: '0.45rem 0.7rem', cursor: 'pointer', fontWeight: 700 }}
                >
                  Annuler
                </button>
              </>
            ) : null}
          </div>
        </div>

        <div style={{ padding: '1.25rem', overflowY: 'auto', flex: 1 }}>
          {compose.mode === 'compose' ? (
            <div style={{ maxWidth: 900 }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                <div>
                  <label style={{ display: 'block', marginBottom: '0.35rem', fontWeight: 700, color: '#374151' }}>Email destinataire</label>
                  <input
                    value={compose.toEmail}
                    onChange={e => setCompose(prev => ({ ...prev, toEmail: e.target.value }))}
                    placeholder="client@exemple.fr"
                    style={{ width: '100%', padding: '0.6rem 0.75rem', border: '1px solid #e5e7eb', borderRadius: '0.5rem' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '0.35rem', fontWeight: 700, color: '#374151' }}>Nom destinataire (optionnel)</label>
                  <input
                    value={compose.toName}
                    onChange={e => setCompose(prev => ({ ...prev, toName: e.target.value }))}
                    placeholder="Nom"
                    style={{ width: '100%', padding: '0.6rem 0.75rem', border: '1px solid #e5e7eb', borderRadius: '0.5rem' }}
                  />
                </div>
              </div>

              <div style={{ marginTop: '0.75rem' }}>
                <label style={{ display: 'block', marginBottom: '0.35rem', fontWeight: 700, color: '#374151' }}>Sujet</label>
                <input
                  value={compose.subject}
                  onChange={e => setCompose(prev => ({ ...prev, subject: e.target.value }))}
                  placeholder="Sujet"
                  style={{ width: '100%', padding: '0.6rem 0.75rem', border: '1px solid #e5e7eb', borderRadius: '0.5rem' }}
                />
              </div>

              <div style={{ marginTop: '0.75rem' }}>
                <label style={{ display: 'block', marginBottom: '0.35rem', fontWeight: 700, color: '#374151' }}>Message</label>
                <textarea
                  value={compose.body}
                  onChange={e => setCompose(prev => ({ ...prev, body: e.target.value }))}
                  placeholder="Écris ton message..."
                  style={{ width: '100%', minHeight: 320, padding: '0.75rem', border: '1px solid #e5e7eb', borderRadius: '0.5rem', resize: 'vertical' }}
                />
              </div>

              <div style={{ marginTop: '0.75rem', fontSize: '0.85rem', color: '#6b7280' }}>
                L'envoi utilise SMTP via les variables d'environnement (SMTP_HOST/PORT/USER/PASS).
              </div>
            </div>
          ) : selected ? (
            <div style={{ maxWidth: 900 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', gap: '1rem', flexWrap: 'wrap' }}>
                <div>
                  <div style={{ fontSize: '0.85rem', color: '#6b7280' }}>{selected.direction === 'INBOUND' ? 'De' : 'À'}</div>
                  <div style={{ fontWeight: 800, color: '#111827' }}>
                    {selected.direction === 'INBOUND'
                      ? `${selected.name} <${selected.email}>`
                      : `${selected.toName || ''}${selected.toName ? ' ' : ''}<${selected.toEmail || ''}>`}
                  </div>
                  {selected.phone ? <div style={{ color: '#6b7280', marginTop: '0.25rem' }}>Téléphone: {selected.phone}</div> : null}
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '0.85rem', color: '#6b7280' }}>Date</div>
                  <div style={{ fontWeight: 700, color: '#111827' }}>{formatDate(selected.createdAt)}</div>
                  <div style={{ marginTop: '0.35rem', fontSize: '0.8rem', fontWeight: 800, color: badgeColor(selected.status).fg, backgroundColor: badgeColor(selected.status).bg, display: 'inline-block', padding: '0.2rem 0.5rem', borderRadius: '999px' }}>
                    {selected.status}
                  </div>
                </div>
              </div>

              {selected.error ? (
                <div style={{ marginTop: '1rem', padding: '0.75rem', border: '1px solid #fee2e2', backgroundColor: '#fff1f2', borderRadius: '0.5rem', color: '#991b1b' }}>
                  <div style={{ fontWeight: 800, marginBottom: '0.25rem' }}>Erreur d'envoi</div>
                  <div style={{ whiteSpace: 'pre-wrap' }}>{selected.error}</div>
                </div>
              ) : null}

              <div style={{ marginTop: '1.25rem', whiteSpace: 'pre-wrap', lineHeight: 1.6, color: '#111827' }}>{selected.message}</div>
            </div>
          ) : (
            <div style={{ color: '#6b7280' }}>Sélectionne un message dans la liste ou clique sur « Nouveau ».</div>
          )}
        </div>
      </div>
    </div>
  );
}
