import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function getStats() {
  const pageCount = await prisma.page.count();
  const blockCount = await prisma.block.count();
  const userCount = await prisma.user.count();
  const messageCount = await prisma.message.count({ where: { read: false } });
  const mediaCount = await prisma.media.count();
  
  return { pageCount, blockCount, userCount, messageCount, mediaCount };
}

export default async function AdminDashboard() {
  const stats = await getStats();

  return (
    <div>
      <h1 style={{ fontSize: '1.875rem', fontWeight: 'bold', color: '#111827', marginBottom: '2rem' }}>
        Tableau de bord
      </h1>

      <div className="row">
        <div className="col-md-4 mb-4">
          <div style={{ backgroundColor: 'white', padding: '1.5rem', borderRadius: '0.5rem', boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div>
                <p style={{ color: '#6b7280', fontSize: '0.875rem', fontWeight: 500 }}>Pages</p>
                <p style={{ fontSize: '2rem', fontWeight: 'bold', color: '#111827', margin: 0 }}>{stats.pageCount}</p>
              </div>
              <div style={{ padding: '1rem', backgroundColor: '#eff6ff', borderRadius: '0.5rem', color: '#2563eb' }}>
                <span className="sli-docs" style={{ fontSize: '1.5rem' }}></span>
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-4 mb-4">
          <div style={{ backgroundColor: 'white', padding: '1.5rem', borderRadius: '0.5rem', boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div>
                <p style={{ color: '#6b7280', fontSize: '0.875rem', fontWeight: 500 }}>Messages non lus</p>
                <p style={{ fontSize: '2rem', fontWeight: 'bold', color: '#111827', margin: 0 }}>{stats.messageCount}</p>
              </div>
              <div style={{ padding: '1rem', backgroundColor: '#fef2f2', borderRadius: '0.5rem', color: '#dc2626' }}>
                <span className="sli-envelope" style={{ fontSize: '1.5rem' }}></span>
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-4 mb-4">
          <div style={{ backgroundColor: 'white', padding: '1.5rem', borderRadius: '0.5rem', boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div>
                <p style={{ color: '#6b7280', fontSize: '0.875rem', fontWeight: 500 }}>Utilisateurs</p>
                <p style={{ fontSize: '2rem', fontWeight: 'bold', color: '#111827', margin: 0 }}>{stats.userCount}</p>
              </div>
              <div style={{ padding: '1rem', backgroundColor: '#fef3c7', borderRadius: '0.5rem', color: '#d97706' }}>
                <span className="sli-people" style={{ fontSize: '1.5rem' }}></span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div style={{ marginTop: '2rem', backgroundColor: 'white', padding: '1.5rem', borderRadius: '0.5rem', boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)' }}>
        <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '1rem' }}>Actions rapides</h2>
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <a href="/admin/pages/new" className="btn btn-primary">
                <span className="sli-plus" style={{ marginRight: '0.5rem' }}></span>
                Nouvelle page
            </a>
            <a href="/admin/media" className="btn btn-outline-primary">
                <span className="sli-picture" style={{ marginRight: '0.5rem' }}></span>
                Gérer les médias
            </a>
            <a href="/admin/settings" className="btn btn-outline-secondary">
                <span className="sli-settings" style={{ marginRight: '0.5rem' }}></span>
                Paramètres
            </a>
            <a href="/" target="_blank" className="btn btn-outline-success">
                <span className="sli-globe" style={{ marginRight: '0.5rem' }}></span>
                Voir le site
            </a>
        </div>
      </div>
    </div>
  );
}
