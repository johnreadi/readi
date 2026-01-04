import React from 'react';
import RichTextEditor from '@/components/ui/RichTextEditor';

type Props = {
    content: any;
    onChange: (content: any) => void;
};

export default function ServicesForm({ content, onChange }: Props) {
    const updateField = (field: string, value: any) => {
        onChange({ ...content, [field]: value });
    };

    const addItem = () => {
        const items = content.items || [];
        updateField('items', [...items, { title: 'Nouveau service', content: 'Description...' }]);
    };

    const updateItem = (index: number, field: string, value: string) => {
        const items = [...(content.items || [])];
        items[index] = { ...items[index], [field]: value };
        updateField('items', items);
    };

    const removeItem = (index: number) => {
        const items = [...(content.items || [])];
        items.splice(index, 1);
        updateField('items', items);
    };

    return (
        <div className="space-y-8">
            <div className="bg-gray-50 p-6 rounded-xl border border-gray-200 shadow-sm">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <svg className="w-5 h-5 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                    </svg>
                    Configuration Générale
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Titre de la section</label>
                        <input
                            type="text"
                            value={content.title || ''}
                            onChange={(e) => updateField('title', e.target.value)}
                            className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-3 border transition-all hover:shadow-sm"
                            placeholder="Ex: Nos Services"
                        />
                    </div>
                     <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Sous-titre</label>
                        <textarea
                            value={content.subtitle || ''}
                            onChange={(e) => updateField('subtitle', e.target.value)}
                            rows={2}
                            className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-3 border transition-all hover:shadow-sm"
                            placeholder="Une brève description..."
                        />
                    </div>
                </div>
            </div>
            
            <div className="space-y-4">
                <div className="flex justify-between items-center border-b border-gray-200 pb-4">
                    <div>
                        <h3 className="text-lg font-semibold text-gray-900">Liste des Services</h3>
                        <p className="text-sm text-gray-500">Gérez les cartes de services affichées dans ce bloc.</p>
                    </div>
                    <button 
                        onClick={addItem}
                        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 shadow-sm transition-all hover:shadow-md"
                    >
                        <svg className="-ml-1 mr-2 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                        </svg>
                        Ajouter un service
                    </button>
                </div>
                
                <div className="space-y-6">
                    {(content.items || []).map((item: any, index: number) => (
                        <div key={index} className="group relative bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-lg transition-all duration-200 p-6">
                            <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                <button 
                                    onClick={() => removeItem(index)} 
                                    className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                    title="Supprimer ce service"
                                >
                                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                    </svg>
                                </button>
                            </div>
                            
                            <div className="space-y-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Titre du service</label>
                                    <input
                                        type="text"
                                        value={item.title}
                                        onChange={(e) => updateItem(index, 'title', e.target.value)}
                                        className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-3 border font-semibold text-lg"
                                        placeholder="Titre du service"
                                    />
                                </div>
                                <div>
                                    <RichTextEditor
                                        label="Description (Contenu riche)"
                                        value={item.content}
                                        onChange={(value) => updateItem(index, 'content', value)}
                                        placeholder="Décrivez votre service..."
                                        height="h-48"
                                    />
                                </div>
                            </div>
                        </div>
                    ))}
                    
                    {(content.items || []).length === 0 && (
                        <div className="text-center py-12 bg-gray-50 rounded-xl border-2 border-dashed border-gray-300">
                            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                            </svg>
                            <h3 className="mt-2 text-sm font-medium text-gray-900">Aucun service</h3>
                            <p className="mt-1 text-sm text-gray-500">Commencez par ajouter un nouveau service à la liste.</p>
                            <div className="mt-6">
                                <button
                                    onClick={addItem}
                                    className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                >
                                    <svg className="-ml-1 mr-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                        <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                                    </svg>
                                    Ajouter un service
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
