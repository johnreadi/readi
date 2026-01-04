import React, { useState } from 'react';
import MediaPicker from '../MediaPicker';

type Props = {
    content: any;
    onChange: (content: any) => void;
};

export default function MenuForm({ content, onChange }: Props) {
    const [showMediaPicker, setShowMediaPicker] = useState(false);

    const updateField = (field: string, value: any) => {
        onChange({ ...content, [field]: value });
    };

    const handleLogoSelect = (url: string) => {
        updateField('logo', url);
        setShowMediaPicker(false);
    };

    const addMenuItem = () => {
        const items = content.items || [];
        updateField('items', [...items, { label: 'Nouveau lien', link: '#' }]);
    };

    const updateMenuItem = (index: number, field: string, value: string) => {
        const items = [...(content.items || [])];
        items[index] = { ...items[index], [field]: value };
        updateField('items', items);
    };

    const removeMenuItem = (index: number) => {
        const items = [...(content.items || [])];
        items.splice(index, 1);
        updateField('items', items);
    };

    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Nom de la marque</label>
                    <input
                        type="text"
                        value={content.brandName || ''}
                        onChange={(e) => updateField('brandName', e.target.value)}
                        className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2.5 border transition-shadow"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Téléphone</label>
                    <input
                        type="text"
                        value={content.phone || ''}
                        onChange={(e) => updateField('phone', e.target.value)}
                        className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2.5 border transition-shadow"
                    />
                </div>
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Logo</label>
                <div className="flex items-center gap-4 p-4 border border-gray-200 rounded-lg bg-gray-50">
                    {content.logo ? (
                        <div className="h-16 w-32 flex items-center justify-center bg-white rounded border border-gray-200 p-2">
                            <img src={content.logo} alt="Logo" className="max-h-full max-w-full object-contain" />
                        </div>
                    ) : (
                         <div className="h-16 w-32 flex items-center justify-center bg-gray-100 rounded border border-dashed border-gray-300 text-gray-400 text-xs">
                            Aucun logo
                        </div>
                    )}
                    <button
                        onClick={() => setShowMediaPicker(true)}
                        className="px-4 py-2 bg-white border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 shadow-sm"
                    >
                        {content.logo ? 'Changer le logo' : 'Choisir le logo'}
                    </button>
                </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                <div className="flex justify-between items-center mb-4">
                    <label className="block text-sm font-medium text-gray-900">Éléments du menu</label>
                    <button 
                        onClick={addMenuItem} 
                        className="text-sm px-3 py-1.5 bg-indigo-50 text-indigo-700 rounded-md hover:bg-indigo-100 font-medium transition-colors flex items-center gap-1"
                    >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                        </svg>
                        Ajouter un élément
                    </button>
                </div>
                <div className="space-y-2">
                    {(content.items || []).map((item: any, index: number) => (
                        <div key={index} className="flex gap-3 items-center bg-white border border-gray-200 p-3 rounded-lg shadow-sm group">
                            <div className="flex-1 grid grid-cols-2 gap-3">
                                <div className="relative">
                                    <label className="absolute -top-2 left-2 bg-white px-1 text-[10px] text-gray-500">Label</label>
                                    <input
                                        type="text"
                                        placeholder="Label"
                                        value={item.label}
                                        onChange={(e) => updateMenuItem(index, 'label', e.target.value)}
                                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border"
                                    />
                                </div>
                                <div className="relative">
                                    <label className="absolute -top-2 left-2 bg-white px-1 text-[10px] text-gray-500">Lien</label>
                                    <input
                                        type="text"
                                        placeholder="Lien (ex: #section1)"
                                        value={item.link}
                                        onChange={(e) => updateMenuItem(index, 'link', e.target.value)}
                                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border"
                                    />
                                </div>
                            </div>
                            <button 
                                onClick={() => removeMenuItem(index)} 
                                className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                title="Supprimer"
                            >
                                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                    ))}
                     {(content.items || []).length === 0 && (
                        <p className="text-sm text-gray-500 italic text-center py-4 bg-white rounded-lg border border-dashed border-gray-300">
                            Aucun élément de menu.
                        </p>
                    )}
                </div>
            </div>

            {showMediaPicker && (
                <MediaPicker onSelect={handleLogoSelect} onClose={() => setShowMediaPicker(false)} />
            )}
        </div>
    );
}
