'use client';

import React from 'react';

type RichTextEditorProps = {
    value: string;
    onChange: (value: string) => void;
    label?: string;
    placeholder?: string;
    className?: string;
    height?: string;
};

export default function RichTextEditor({ 
    value, 
    onChange, 
    label, 
    placeholder, 
    className = "",
    height = "h-64"
}: RichTextEditorProps) {
    return (
        <div className={`w-full ${className}`}>
            {label && (
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    {label}
                </label>
            )}
            <div className={`rich-text-editor-wrapper ${height}`}>
                <textarea
                    value={value || ''}
                    onChange={(e) => onChange(e.target.value)}
                    placeholder={placeholder}
                    className="h-full w-full rounded-lg border border-gray-200 bg-white p-3 text-sm text-gray-900 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
            </div>
            <style jsx global>{`
                .rich-text-editor-wrapper textarea {
                    resize: vertical;
                }
            `}</style>
        </div>
    );
}
