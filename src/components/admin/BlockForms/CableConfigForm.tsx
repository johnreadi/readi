import React, { useState } from 'react';
import MediaPicker from '../MediaPicker';

type Props = {
    content: any;
    onChange: (content: any) => void;
};

export default function CableConfigForm({ content, onChange }: Props) {
    const [showMediaPicker, setShowMediaPicker] = useState(false);

    const updateField = (field: string, value: any) => {
        onChange({ ...content, [field]: value });
    };

    const handleImageSelect = (url: string) => {
        updateField('backgroundImage', url);
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
                    className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2.5 border transition-shadow"
                />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">URL de l'iFrame (Configurateur)</label>
                <input
                    type="text"
                    value={content.iframeUrl || ''}
                    onChange={(e) => updateField('iframeUrl', e.target.value)}
                    className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2.5 border transition-shadow"
                    placeholder="https://..."
                />
            </div>
             <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Image de fond</label>
                <div className="flex items-center gap-4 p-4 border border-gray-200 rounded-lg bg-gray-50">
                    {content.backgroundImage ? (
                        <img src={content.backgroundImage} alt="Preview" className="h-24 w-24 object-cover rounded-lg border border-gray-200 shadow-sm" />
                    ) : (
                         <div className="h-24 w-24 flex items-center justify-center bg-gray-100 rounded-lg border border-dashed border-gray-300 text-gray-400">
                            <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                        </div>
                    )}
                    <button
                        onClick={() => setShowMediaPicker(true)}
                        className="px-4 py-2 bg-white border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 shadow-sm"
                    >
                        {content.backgroundImage ? 'Changer l\'image' : 'Choisir une image'}
                    </button>
                </div>
            </div>

            {showMediaPicker && (
                <MediaPicker onSelect={handleImageSelect} onClose={() => setShowMediaPicker(false)} />
            )}
        </div>
    );
}
