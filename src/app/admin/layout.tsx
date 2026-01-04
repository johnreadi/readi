'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { signOut, useSession } from 'next-auth/react';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { data: session } = useSession();

  const menuItems = [
    { label: 'Tableau de bord', href: '/admin', icon: 'sli-speedometer' },
    { label: 'Pages', href: '/admin/pages', icon: 'sli-docs' },
    { label: 'Messages', href: '/admin/messages', icon: 'sli-envelope' },
    { label: 'Médiathèque', href: '/admin/media', icon: 'sli-picture' },
    { label: 'Utilisateurs', href: '/admin/users', icon: 'sli-people' },
    { label: 'Paramètres', href: '/admin/settings', icon: 'sli-settings' },
  ];

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#f3f4f6' }}>
      {/* Sidebar */}
      <aside style={{ 
        width: '250px', 
        backgroundColor: '#1f2937', 
        color: 'white', 
        display: 'flex', 
        flexDirection: 'column',
        position: 'fixed',
        height: '100vh',
        zIndex: 1000
      }}>
        <div style={{ padding: '1.5rem', borderBottom: '1px solid #374151' }}>
          <h1 style={{ fontSize: '1.25rem', fontWeight: 'bold', margin: 0 }}>Readi Admin</h1>
        </div>
        
        <nav style={{ flex: 1, padding: '1rem' }}>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            {menuItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <li key={item.href} style={{ marginBottom: '0.5rem' }}>
                  <Link 
                    href={item.href}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      padding: '0.75rem 1rem',
                      borderRadius: '0.375rem',
                      color: isActive ? 'white' : '#d1d5db',
                      backgroundColor: isActive ? '#374151' : 'transparent',
                      textDecoration: 'none',
                      transition: 'background-color 0.2s'
                    }}
                  >
                    <span className={`mbr-iconfont ${item.icon}`} style={{ marginRight: '0.75rem', fontSize: '1.2rem' }}></span>
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div style={{ padding: '1rem', borderTop: '1px solid #374151' }}>
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem' }}>
            <div style={{ 
              width: '32px', height: '32px', borderRadius: '50%', backgroundColor: '#4b5563', 
              display: 'flex', alignItems: 'center', justifyContent: 'center', marginRight: '0.75rem'
            }}>
              <span className="sli-user"></span>
            </div>
            <div style={{ overflow: 'hidden' }}>
              <div style={{ fontSize: '0.875rem', fontWeight: 500, whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>
                {session?.user?.name || 'Admin'}
              </div>
              <div style={{ fontSize: '0.75rem', color: '#9ca3af' }}>
                {session?.user?.email}
              </div>
            </div>
          </div>
          <button 
            onClick={() => signOut({ callbackUrl: '/' })}
            style={{
              width: '100%',
              padding: '0.5rem',
              backgroundColor: '#dc2626',
              color: 'white',
              border: 'none',
              borderRadius: '0.375rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <span className="sli-logout" style={{ marginRight: '0.5rem' }}></span>
            Déconnexion
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main style={{ flex: 1, marginLeft: '250px', padding: '2rem' }}>
        {children}
      </main>
    </div>
  );
}
