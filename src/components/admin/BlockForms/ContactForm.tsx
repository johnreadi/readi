import React from 'react';

type Props = {
    content: any;
    onChange: (content: any) => void;
};

export default function ContactForm({ content, onChange }: Props) {
    const updateField = (field: string, value: any) => {
        onChange({ ...content, [field]: value });
    };

    return (
        <div className="space-y-6">
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Titre du formulaire</label>
                <input
                    type="text"
                    value={content.title || ''}
                    onChange={(e) => updateField('title', e.target.value)}
                    className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2.5 border transition-shadow"
                />
            </div>
        </div>
    );
}
