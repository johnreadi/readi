import React, { useState } from 'react';
import MediaPicker from '../MediaPicker';

type Props = {
    content: any;
    onChange: (content: any) => void;
};

export default function HeroForm({ content, onChange }: Props) {
    const [showMediaPicker, setShowMediaPicker] = useState(false);
    const [fieldToUpdate, setFieldToUpdate] = useState<string | null>(null);

    const updateField = (field: string, value: any) => {
        onChange({ ...content, [field]: value });
    };

    const handleImageSelect = (url: string) => {
        if (fieldToUpdate) {
            updateField(fieldToUpdate, url);
        }
        setShowMediaPicker(false);
        setFieldToUpdate(null);
    };

    const addAnimatedWord = () => {
        const words = content.animatedWords || [];
        updateField('animatedWords', [...words, 'Nouveau mot']);
    };

    const updateAnimatedWord = (index: number, value: string) => {
        const words = [...(content.animatedWords || [])];
        words[index] = value;
        updateField('animatedWords', words);
    };

    const removeAnimatedWord = (index: number) => {
        const words = [...(content.animatedWords || [])];
        words.splice(index, 1);
        updateField('animatedWords', words);
    };

    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Titre principal</label>
                    <input
                        type="text"
                        value={content.title || ''}
                        onChange={(e) => updateField('title', e.target.value)}
                        className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2.5 border transition-shadow"
                        placeholder="Ex: Bienvenue sur..."
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Sous-titre</label>
                    <input
                        type="text"
                        value={content.subtitle || ''}
                        onChange={(e) => updateField('subtitle', e.target.value)}
                        className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2.5 border transition-shadow"
                        placeholder="Ex: La solution pour..."
                    />
                </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                <div className="flex justify-between items-center mb-4">
                    <label className="block text-sm font-medium text-gray-900">Mots Animés (Machine à écrire)</label>
                    <button 
                        onClick={addAnimatedWord} 
                        className="text-sm px-3 py-1.5 bg-indigo-50 text-indigo-700 rounded-md hover:bg-indigo-100 font-medium transition-colors flex items-center gap-1"
                    >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                        </svg>
                        Ajouter un mot
                    </button>
                </div>
                <div className="space-y-3">
                    {(content.animatedWords || []).map((word: string, index: number) => (
                        <div key={index} className="flex gap-3 items-center group">
                            <div className="flex-1 relative">
                                <input
                                    type="text"
                                    value={word}
                                    onChange={(e) => updateAnimatedWord(index, e.target.value)}
                                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border pr-8"
                                    placeholder={`Mot ${index + 1}`}
                                />
                                <span className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 text-xs">{index + 1}</span>
                            </div>
                            <button 
                                onClick={() => removeAnimatedWord(index)} 
                                className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                title="Supprimer ce mot"
                            >
                                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                </svg>
                            </button>
                        </div>
                    ))}
                    {(content.animatedWords || []).length === 0 && (
                        <p className="text-sm text-gray-500 italic text-center py-2">Aucun mot animé. Ajoutez-en pour dynamiser votre titre.</p>
                    )}
                </div>
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Image de fond</label>
                <div className="flex items-start gap-4 p-4 border border-gray-200 rounded-lg bg-gray-50">
                    {content.backgroundImage ? (
                        <div className="relative group">
                            <img 
                                src={content.backgroundImage} 
                                alt="Background Preview" 
                                className="h-32 w-full max-w-xs object-cover rounded-lg shadow-sm border border-gray-200" 
                            />
                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
                                <button
                                    onClick={() => { setFieldToUpdate('backgroundImage'); setShowMediaPicker(true); }}
                                    className="text-white bg-white/20 backdrop-blur-sm px-3 py-1.5 rounded-md hover:bg-white/30 font-medium text-sm"
                                >
                                    Changer
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div className="h-32 w-full max-w-xs bg-gray-100 rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center text-gray-400">
                            <span className="text-sm">Aucune image</span>
                        </div>
                    )}
                    <div className="flex-1">
                        <p className="text-sm text-gray-500 mb-3">
                            Choisissez une image de haute qualité pour l'arrière-plan de la section héroïque.
                        </p>
                        <button
                            onClick={() => { setFieldToUpdate('backgroundImage'); setShowMediaPicker(true); }}
                            className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            <svg className="-ml-1 mr-2 h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            {content.backgroundImage ? 'Changer l\'image' : 'Choisir une image'}
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
