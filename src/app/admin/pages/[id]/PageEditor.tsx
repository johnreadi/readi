'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import BlockEditorForm from '../../../../components/admin/BlockEditorForm';
import Modal from '@/components/ui/Modal';

type Block = {
  id: string;
  type: string;
  order: number;
  content: any;
};

type Page = {
  id: string;
  title: string;
  slug: string;
  metaDesc: string | null;
  blocks: Block[];
};

export default function PageEditor({ page }: { page: Page }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: page.title,
    slug: page.slug,
    metaDesc: page.metaDesc || '',
  });
  
  const [editingBlock, setEditingBlock] = useState<Block | null>(null);
  const [blockContent, setBlockContent] = useState<any>({});
  const [savingBlock, setSavingBlock] = useState(false);
  const [isAddingBlock, setIsAddingBlock] = useState(false);

  const BLOCK_TYPES = [
    { type: 'MenuBlock', label: 'Menu' },
    { type: 'HeroBlock', label: 'Héro (Bannière)' },
    { type: 'ServicesAccordionBlock', label: 'Services (Accordéon)' },
    { type: 'FeatureBlock', label: 'Fonctionnalités' },
    { type: 'MaintenanceBlock', label: 'Maintenance' },
    { type: 'ProductsBlock', label: 'Produits' },
    { type: 'CableConfigBlock', label: 'Configurateur Câble' },
    { type: 'ContactBlock', label: 'Contact' },
    { type: 'FooterBlock', label: 'Pied de page' },
  ];

  const openBlockEditor = (block: Block) => {
    setEditingBlock(block);
    let content = block.content;
    try {
        if (typeof content === 'string') {
            content = JSON.parse(content);
        }
    } catch (e) {
        content = {};
    }
    setBlockContent(content);
  };

  const saveBlock = async () => {
    if (!editingBlock) return;
    setSavingBlock(true);
    try {
        const res = await fetch(`/api/blocks/${editingBlock.id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ content: blockContent }),
        });

        if (!res.ok) throw new Error('Erreur lors de la sauvegarde du bloc');
        
        router.refresh();
        setEditingBlock(null);
        alert('Bloc sauvegardé');
    } catch (error) {
        alert('Erreur: ' + (error as Error).message);
    } finally {
        setSavingBlock(false);
    }
  };

  const deleteBlock = async (id: string) => {
    if(!confirm('Êtes-vous sûr de vouloir supprimer ce bloc ?')) return;
    
    try {
        const res = await fetch(`/api/blocks/${id}`, {
            method: 'DELETE',
        });
        if (!res.ok) throw new Error('Erreur suppression');
        router.refresh();
    } catch (error) {
        alert('Erreur: ' + (error as Error).message);
    }
  }

  const addBlock = async (type: string) => {
    try {
        const order = page.blocks.length > 0 
            ? Math.max(...page.blocks.map(b => b.order)) + 1 
            : 0;
            
        const res = await fetch('/api/blocks', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                pageId: page.id,
                type,
                order,
                content: {} 
            }),
        });

        if (!res.ok) throw new Error('Erreur création bloc');
        
        router.refresh();
        setIsAddingBlock(false);
    } catch (error) {
        alert('Erreur: ' + (error as Error).message);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch(`/api/pages/${page.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error('Erreur lors de la sauvegarde');
      
      router.refresh();
      alert('Page sauvegardée avec succès');
    } catch (error) {
      alert('Erreur: ' + (error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '1.875rem', fontWeight: 'bold', color: '#111827' }}>
          Édition: {page.title}
        </h1>
        <div style={{ display: 'flex', gap: '1rem' }}>
            <Link 
            href="/admin/pages"
            style={{
                backgroundColor: 'white',
                color: '#374151',
                padding: '0.5rem 1rem',
                borderRadius: '0.375rem',
                textDecoration: 'none',
                fontWeight: 500,
                border: '1px solid #d1d5db'
            }}
            >
            Retour
            </Link>
            <a 
            href={`/${page.slug === 'home' ? '' : page.slug}`}
            target="_blank"
            style={{
                backgroundColor: '#2563eb',
                color: 'white',
                padding: '0.5rem 1rem',
                borderRadius: '0.375rem',
                textDecoration: 'none',
                fontWeight: 500
            }}
            >
            Voir la page
            </a>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: '2rem' }}>
        {/* Main Content - Blocks */}
        <div style={{ backgroundColor: 'white', padding: '1.5rem', borderRadius: '0.5rem', boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#111827' }}>Contenu (Blocs)</h2>
                <button
                    onClick={() => setIsAddingBlock(true)}
                    style={{
                        backgroundColor: '#10b981',
                        color: 'white',
                        padding: '0.25rem 0.75rem',
                        borderRadius: '0.375rem',
                        fontSize: '0.875rem',
                        border: 'none',
                        cursor: 'pointer'
                    }}
                >
                    + Ajouter un bloc
                </button>
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {page.blocks.map((block) => (
                    <div key={block.id} style={{ 
                        border: '1px solid #e5e7eb', 
                        borderRadius: '0.375rem', 
                        padding: '1rem',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        backgroundColor: '#f9fafb'
                    }}>
                        <div>
                            <span style={{ 
                                display: 'inline-block', 
                                padding: '0.25rem 0.5rem', 
                                backgroundColor: '#e5e7eb', 
                                borderRadius: '0.25rem', 
                                fontSize: '0.75rem', 
                                fontWeight: 'bold',
                                marginRight: '0.5rem',
                                color: '#4b5563'
                            }}>
                                {block.type}
                            </span>
                            <span style={{ fontSize: '0.875rem', color: '#6b7280' }}>
                                Ordre: {block.order}
                            </span>
                        </div>
                        <div style={{ display: 'flex', gap: '0.5rem' }}>
                            <button 
                                onClick={() => openBlockEditor(block)}
                                style={{ color: '#2563eb', background: 'none', border: 'none', cursor: 'pointer', fontSize: '0.875rem' }}
                            >
                                Éditer
                            </button>
                            <button 
                                onClick={() => deleteBlock(block.id)}
                                style={{ color: '#dc2626', background: 'none', border: 'none', cursor: 'pointer', fontSize: '0.875rem' }}
                            >
                                Supprimer
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>

        {/* Sidebar - Page Settings */}
        <div style={{ backgroundColor: 'white', padding: '1.5rem', borderRadius: '0.5rem', boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)', height: 'fit-content' }}>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#111827', marginBottom: '1.5rem' }}>Paramètres</h2>
            <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: '1rem' }}>
                    <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, color: '#374151', marginBottom: '0.25rem' }}>Titre</label>
                    <input 
                        type="text" 
                        value={formData.title}
                        onChange={(e) => setFormData({...formData, title: e.target.value})}
                        style={{ width: '100%', padding: '0.5rem', borderRadius: '0.375rem', border: '1px solid #d1d5db' }}
                    />
                </div>
                <div style={{ marginBottom: '1rem' }}>
                    <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, color: '#374151', marginBottom: '0.25rem' }}>Slug</label>
                    <input 
                        type="text" 
                        value={formData.slug}
                        onChange={(e) => setFormData({...formData, slug: e.target.value})}
                        style={{ width: '100%', padding: '0.5rem', borderRadius: '0.375rem', border: '1px solid #d1d5db' }}
                    />
                </div>
                <div style={{ marginBottom: '1rem' }}>
                    <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, color: '#374151', marginBottom: '0.25rem' }}>Description (SEO)</label>
                    <textarea 
                        value={formData.metaDesc}
                        onChange={(e) => setFormData({...formData, metaDesc: e.target.value})}
                        style={{ width: '100%', padding: '0.5rem', borderRadius: '0.375rem', border: '1px solid #d1d5db', minHeight: '100px' }}
                    />
                </div>
                <button 
                    type="submit" 
                    disabled={loading}
                    style={{ 
                        width: '100%', 
                        padding: '0.75rem', 
                        backgroundColor: '#2563eb', 
                        color: 'white', 
                        borderRadius: '0.375rem', 
                        border: 'none', 
                        cursor: loading ? 'not-allowed' : 'pointer',
                        fontWeight: 500
                    }}
                >
                    {loading ? 'Sauvegarde...' : 'Sauvegarder'}
                </button>
            </form>
        </div>
      </div>
      
      {editingBlock && (
        <Modal
            isOpen={!!editingBlock}
            onClose={() => setEditingBlock(null)}
            title={`Éditer le bloc: ${editingBlock.type}`}
            footer={
                <>
                  <button 
                    onClick={() => setEditingBlock(null)}
                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Annuler
                  </button>
                  <button 
                    onClick={saveBlock}
                    disabled={savingBlock}
                    className={`px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${savingBlock ? 'opacity-50 cursor-not-allowed' : ''}`}
                  >
                    {savingBlock ? 'Sauvegarde...' : 'Sauvegarder'}
                  </button>
                </>
            }
        >
          <BlockEditorForm 
            blockType={editingBlock.type} 
            content={blockContent} 
            onChange={setBlockContent} 
          />
        </Modal>
      )}
      {isAddingBlock && (
        <Modal
            isOpen={isAddingBlock}
            onClose={() => setIsAddingBlock(false)}
            title="Ajouter un bloc"
            size="md"
        >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {BLOCK_TYPES.map((bt) => (
                    <button
                        key={bt.type}
                        onClick={() => addBlock(bt.type)}
                        className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 hover:border-indigo-500 hover:ring-1 hover:ring-indigo-500 transition-all text-left group"
                    >
                        <span className="font-medium text-gray-900 group-hover:text-indigo-600 block">{bt.label}</span>
                        <span className="text-xs text-gray-500 mt-1 block">Ajouter ce bloc à la page</span>
                    </button>
                ))}
            </div>
        </Modal>
      )}
    </div>
  );
}
