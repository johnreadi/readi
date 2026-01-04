import React, { useState } from 'react';
import MediaPicker from '../MediaPicker';

type Props = {
    content: any;
    onChange: (content: any) => void;
};

export default function MaintenanceForm({ content, onChange }: Props) {
    const [showMediaPicker, setShowMediaPicker] = useState(false);
    const [editingCardIndex, setEditingCardIndex] = useState<number | null>(null);

    const updateField = (field: string, value: any) => {
        onChange({ ...content, [field]: value });
    };

    const handleImageSelect = (url: string) => {
        if (editingCardIndex !== null) {
            const cards = [...(content.cards || [])];
            cards[editingCardIndex] = { ...cards[editingCardIndex], image: url };
            updateField('cards', cards);
            setEditingCardIndex(null);
        }
        setShowMediaPicker(false);
    };

    const addCard = () => {
        const cards = content.cards || [];
        updateField('cards', [...cards, { title: 'Nouvelle carte', text: 'Description...', image: '' }]);
    };

    const updateCard = (index: number, field: string, value: string) => {
        const cards = [...(content.cards || [])];
        cards[index] = { ...cards[index], [field]: value };
        updateField('cards', cards);
    };

    const removeCard = (index: number) => {
        const cards = [...(content.cards || [])];
        cards.splice(index, 1);
        updateField('cards', cards);
    };

    return (
        <div className="space-y-6">
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Titre Principal</label>
                <input
                    type="text"
                    value={content.title || ''}
                    onChange={(e) => updateField('title', e.target.value)}
                    className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2.5 border transition-shadow"
                    placeholder="Titre de la section"
                />
            </div>
            
            <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                <div className="flex justify-between items-center mb-4">
                    <label className="block text-sm font-medium text-gray-900">Cartes de maintenance</label>
                    <button 
                        onClick={addCard} 
                        className="text-sm px-3 py-1.5 bg-indigo-50 text-indigo-700 rounded-md hover:bg-indigo-100 font-medium transition-colors flex items-center gap-1"
                    >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                        </svg>
                        Ajouter une carte
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {(content.cards || []).map((card: any, index: number) => (
                        <div key={index} className="group relative bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow p-4">
                             <button 
                                onClick={() => removeCard(index)} 
                                className="absolute top-2 right-2 p-1 text-gray-400 hover:text-red-600 rounded-full hover:bg-red-50 transition-colors"
                                title="Supprimer cette carte"
                            >
                                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                            
                            <div className="flex flex-col gap-4">
                                <div className="flex items-start gap-4">
                                    <div 
                                        className="h-16 w-16 flex-shrink-0 bg-gray-100 rounded-lg border border-gray-200 overflow-hidden cursor-pointer hover:opacity-80 transition-opacity"
                                        onClick={() => { setEditingCardIndex(index); setShowMediaPicker(true); }}
                                    >
                                        {card.image ? (
                                            <img src={card.image} alt="Preview" className="h-full w-full object-cover" />
                                        ) : (
                                            <div className="h-full w-full flex items-center justify-center text-gray-400">
                                                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                </svg>
                                            </div>
                                        )}
                                    </div>
                                    <div className="flex-1 space-y-3">
                                        <div>
                                            <label className="block text-xs font-medium text-gray-500 mb-1">Titre</label>
                                            <input
                                                type="text"
                                                value={card.title}
                                                onChange={(e) => updateCard(index, 'title', e.target.value)}
                                                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border"
                                            />
                                        </div>
                                    </div>
                                </div>
                                
                                <div>
                                    <label className="block text-xs font-medium text-gray-500 mb-1">Description</label>
                                    <textarea
                                        value={card.text}
                                        onChange={(e) => updateCard(index, 'text', e.target.value)}
                                        rows={3}
                                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border"
                                    />
                                </div>
                            </div>
                        </div>
                    ))}
                    {(content.cards || []).length === 0 && (
                        <div className="col-span-full py-8 text-center text-gray-500 italic bg-white rounded-lg border border-dashed border-gray-300">
                            Aucune carte. Commencez par en ajouter une.
                        </div>
                    )}
                </div>
            </div>

             {showMediaPicker && (
                <MediaPicker onSelect={handleImageSelect} onClose={() => setShowMediaPicker(false)} />
            )}
        </div>
    );
}
