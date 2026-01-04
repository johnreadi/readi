'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

type Media = {
  id: string;
  url: string;
  name: string | null;
  type: string;
};

export default function MediaLibrary({ initialMedia, onSelect }: { initialMedia: Media[], onSelect?: (url: string) => void }) {
  const router = useRouter();
  const [media, setMedia] = useState(initialMedia);
  const [uploading, setUploading] = useState(false);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    
    setUploading(true);
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await fetch('/api/media', {
        method: 'POST',
        body: formData,
      });

      if (!res.ok) throw new Error('Upload failed');
      
      const newMedia = await res.json();
      setMedia([newMedia, ...media]);
      router.refresh();
    } catch (error) {
      alert('Erreur: ' + (error as Error).message);
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer ce média ?')) return;

    try {
      const res = await fetch(`/api/media/${id}`, {
        method: 'DELETE',
      });

      if (!res.ok) throw new Error('Delete failed');

      setMedia(media.filter(m => m.id !== id));
      router.refresh();
    } catch (error) {
      alert('Erreur: ' + (error as Error).message);
    }
  };

  const copyToClipboard = (url: string) => {
    navigator.clipboard.writeText(url);
    alert('URL copiée !');
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl font-bold text-gray-900">
          Médiathèque
        </h1>
        <div className="relative">
            <input
                type="file"
                id="file-upload"
                className="hidden"
                onChange={handleUpload}
                disabled={uploading}
            />
            <label
                htmlFor="file-upload"
                className={`inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 cursor-pointer transition-colors ${uploading ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
                {uploading ? (
                    <>
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Upload en cours...
                    </>
                ) : (
                    <>
                        <svg className="-ml-1 mr-2 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                        </svg>
                        Ajouter un média
                    </>
                )}
            </label>
        </div>
      </div>

      {media.length === 0 ? (
          <div className="text-center py-12 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
              <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <h3 className="mt-2 text-sm font-medium text-gray-900">Aucun média</h3>
              <p className="mt-1 text-sm text-gray-500">Commencez par ajouter des images à votre bibliothèque.</p>
          </div>
      ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {media.map((item) => (
              <div key={item.id} className="group bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden hover:shadow-md transition-shadow">
                <div className="relative aspect-square bg-gray-100 flex items-center justify-center overflow-hidden">
                    {item.type.startsWith('image/') ? (
                        <img 
                            src={item.url} 
                            alt={item.name || 'Media'} 
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" 
                        />
                    ) : (
                        <svg className="h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                        </svg>
                    )}
                    
                    {/* Overlay actions */}
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-2 p-2">
                        {onSelect && (
                            <button 
                                onClick={() => onSelect(item.url)}
                                className="w-full bg-indigo-600 text-white text-xs font-medium px-2 py-1.5 rounded hover:bg-indigo-700 transition-colors shadow-sm"
                            >
                                Choisir
                            </button>
                        )}
                        <div className="flex gap-2 w-full">
                            <button 
                                onClick={() => copyToClipboard(item.url)}
                                className="flex-1 bg-white text-gray-700 text-xs font-medium px-2 py-1.5 rounded hover:bg-gray-100 transition-colors shadow-sm"
                                title="Copier URL"
                            >
                                Copier
                            </button>
                            <button 
                                onClick={() => handleDelete(item.id)}
                                className="bg-red-500 text-white p-1.5 rounded hover:bg-red-600 transition-colors shadow-sm"
                                title="Supprimer"
                            >
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
                <div className="p-2 border-t border-gray-100">
                    <p className="text-xs font-medium text-gray-700 truncate" title={item.name || 'Sans nom'}>
                        {item.name || 'Sans nom'}
                    </p>
                </div>
              </div>
            ))}
          </div>
      )}
    </div>
  );
}
