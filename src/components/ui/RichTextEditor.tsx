'use client';

import React, { useMemo } from 'react';
import dynamic from 'next/dynamic';
import 'react-quill/dist/quill.snow.css';

// Import dynamique pour éviter les erreurs SSR (document is not defined)
const ReactQuill = dynamic(() => import('react-quill'), { 
    ssr: false,
    loading: () => <div className="h-48 w-full bg-gray-50 animate-pulse rounded-md border border-gray-200"></div>
});

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
    
    // Configuration des modules (barre d'outils)
    const modules = useMemo(() => ({
        toolbar: [
            [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
            ['bold', 'italic', 'underline', 'strike'],
            [{ 'color': [] }, { 'background': [] }],
            [{ 'list': 'ordered'}, { 'list': 'bullet' }],
            [{ 'align': [] }],
            ['link', 'image', 'video'],
            ['clean']
        ],
    }), []);

    const formats = [
        'header',
        'bold', 'italic', 'underline', 'strike',
        'color', 'background',
        'list', 'bullet',
        'align',
        'link', 'image', 'video'
    ];

    return (
        <div className={`w-full ${className}`}>
            {label && (
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    {label}
                </label>
            )}
            <div className={`rich-text-editor-wrapper ${height}`}>
                <ReactQuill
                    theme="snow"
                    value={value || ''}
                    onChange={onChange}
                    modules={modules}
                    formats={formats}
                    placeholder={placeholder}
                    className="h-full rounded-lg"
                />
            </div>
            <style jsx global>{`
                .rich-text-editor-wrapper .quill {
                    height: 100%;
                    display: flex;
                    flex-direction: column;
                }
                .rich-text-editor-wrapper .ql-toolbar {
                    border-top-left-radius: 0.5rem;
                    border-top-right-radius: 0.5rem;
                    border-color: #e5e7eb;
                    background-color: #f9fafb;
                }
                .rich-text-editor-wrapper .ql-container {
                    border-bottom-left-radius: 0.5rem;
                    border-bottom-right-radius: 0.5rem;
                    border-color: #e5e7eb;
                    flex: 1;
                    overflow: hidden;
                    font-size: 0.875rem; /* text-sm */
                }
                .rich-text-editor-wrapper .ql-editor {
                    font-family: inherit;
                    min-height: 150px;
                }
            `}</style>
        </div>
    );
}
