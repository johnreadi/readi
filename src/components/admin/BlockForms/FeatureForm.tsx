import React, { useState } from 'react';
import MediaPicker from '../MediaPicker';
import RichTextEditor from '@/components/ui/RichTextEditor';

type Props = {
    content: any;
    onChange: (content: any) => void;
};

export default function FeatureForm({ content, onChange }: Props) {
    const [showMediaPicker, setShowMediaPicker] = useState(false);

    const updateField = (field: string, value: any) => {
        onChange({ ...content, [field]: value });
    };

    const handleImageSelect = (url: string) => {
        updateField('image', url);
        setShowMediaPicker(false);
    };

    return (
        <div className="space-y-6">
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Titre</label>
                <input
                    type="text"
                    value={content.title || ''}
                    onChange={(e) => updateField('title', e.target.value)}
                    className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-3 border transition-shadow hover:shadow-sm"
                />
            </div>
            <div>
                <RichTextEditor
                    label="Texte (Contenu riche)"
                    value={content.text}
                    onChange={(value) => updateField('text', value)}
                    placeholder="Description de la fonctionnalité..."
                    height="h-64"
                />
            </div>
            <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg border border-gray-200">
                <input
                    type="checkbox"
                    checked={content.reverse || false}
                    onChange={(e) => updateField('reverse', e.target.checked)}
                    id="reverse"
                    className="h-5 w-5 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded cursor-pointer"
                />
                <label htmlFor="reverse" className="block text-sm font-medium text-gray-700 cursor-pointer select-none">Inverser l'ordre (Image à gauche / Texte à droite)</label>
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Image d'illustration</label>
                <div className="flex flex-col md:flex-row items-start md:items-center gap-4 p-4 border border-gray-200 rounded-lg bg-gray-50">
                    {content.image ? (
                        <div className="relative group">
                            <img src={content.image} alt="Preview" className="h-32 w-32 object-cover rounded-lg border border-gray-200 shadow-sm" />
                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors rounded-lg" />
                        </div>
                    ) : (
                         <div className="h-32 w-32 flex items-center justify-center bg-white rounded-lg border border-dashed border-gray-300 text-gray-400">
                            <svg className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                        </div>
                    )}
                    <div className="flex flex-col gap-2">
                        <p className="text-sm text-gray-500 mb-1">Formats supportés: JPG, PNG, WEBP</p>
                        <button
                            onClick={() => setShowMediaPicker(true)}
                            className="inline-flex justify-center items-center px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 shadow-sm transition-all"
                        >
                            <svg className="mr-2 h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                            </svg>
                            {content.image ? 'Changer l\'image' : 'Choisir une image'}
                        </button>
                    </div>
                </div>
            </div>

            {showMediaPicker && (
                <MediaPicker onSelect={handleImageSelect} onClose={() => setShowMediaPicker(false)} />
            )}
        </div>
    );
}
