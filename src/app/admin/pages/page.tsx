import { prisma } from '@/lib/prisma';
import Link from 'next/link';

export default async function AdminPages() {
  const pages = await prisma.page.findMany({
    orderBy: { createdAt: 'desc' },
    include: { blocks: true }
  });

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '1.875rem', fontWeight: 'bold', color: '#111827' }}>
          Gestion des pages
        </h1>
        <Link 
          href="/admin/pages/new"
          style={{
            backgroundColor: '#2563eb',
            color: 'white',
            padding: '0.5rem 1rem',
            borderRadius: '0.375rem',
            textDecoration: 'none',
            fontWeight: 500
          }}
        >
          Nouvelle page
        </Link>
      </div>

      <div style={{ backgroundColor: 'white', borderRadius: '0.5rem', boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead style={{ backgroundColor: '#f9fafb' }}>
            <tr>
              <th style={{ padding: '0.75rem 1.5rem', textAlign: 'left', fontSize: '0.75rem', fontWeight: 'bold', textTransform: 'uppercase', color: '#6b7280' }}>Titre</th>
              <th style={{ padding: '0.75rem 1.5rem', textAlign: 'left', fontSize: '0.75rem', fontWeight: 'bold', textTransform: 'uppercase', color: '#6b7280' }}>Slug</th>
              <th style={{ padding: '0.75rem 1.5rem', textAlign: 'left', fontSize: '0.75rem', fontWeight: 'bold', textTransform: 'uppercase', color: '#6b7280' }}>Blocs</th>
              <th style={{ padding: '0.75rem 1.5rem', textAlign: 'right', fontSize: '0.75rem', fontWeight: 'bold', textTransform: 'uppercase', color: '#6b7280' }}>Actions</th>
            </tr>
          </thead>
          <tbody style={{ }}>
            {pages.map((page) => (
              <tr key={page.id} style={{ borderTop: '1px solid #e5e7eb' }}>
                <td style={{ padding: '1rem 1.5rem', whiteSpace: 'nowrap' }}>
                  <div style={{ fontWeight: 500, color: '#111827' }}>{page.title}</div>
                </td>
                <td style={{ padding: '1rem 1.5rem', whiteSpace: 'nowrap', color: '#6b7280' }}>
                  /{page.slug}
                </td>
                <td style={{ padding: '1rem 1.5rem', whiteSpace: 'nowrap', color: '#6b7280' }}>
                  {page.blocks.length} blocs
                </td>
                <td style={{ padding: '1rem 1.5rem', whiteSpace: 'nowrap', textAlign: 'right', fontSize: '0.875rem' }}>
                  <Link 
                    href={`/admin/pages/${page.id}`}
                    style={{ color: '#2563eb', fontWeight: 500, textDecoration: 'none', marginRight: '1rem' }}
                  >
                    Éditer
                  </Link>
                  <a href={`/${page.slug === 'home' ? '' : page.slug}`} target="_blank" style={{ color: '#6b7280', textDecoration: 'none' }}>
                    Voir
                  </a>
                </td>
              </tr>
            ))}
            {pages.length === 0 && (
              <tr>
                <td colSpan={4} style={{ padding: '2rem', textAlign: 'center', color: '#6b7280' }}>
                  Aucune page trouvée
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
