import React from 'react';

type Props = {
    content: any;
    onChange: (content: any) => void;
};

export default function GenericForm({ content, onChange }: Props) {
    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        try {
            const parsed = JSON.parse(e.target.value);
            onChange(parsed);
        } catch (e) {
            // Keep the string value if invalid JSON, but we can't really pass it back as object easily without local state.
            // For now, let's assume the parent handles string vs object or we use local state here.
        }
    };

    const [jsonString, setJsonString] = React.useState(JSON.stringify(content, null, 2));

    React.useEffect(() => {
        setJsonString(JSON.stringify(content, null, 2));
    }, [content]);

    return (
        <div className="space-y-6">
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Contenu JSON (Mode Avancé)</label>
                <div className="relative">
                    <textarea
                        value={jsonString}
                        onChange={(e) => {
                            setJsonString(e.target.value);
                            try {
                                onChange(JSON.parse(e.target.value));
                            } catch (e) {
                                // invalid json
                            }
                        }}
                        rows={10}
                        className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-3 border font-mono bg-gray-50"
                        spellCheck={false}
                    />
                    <div className="absolute top-2 right-2 text-xs text-gray-400 bg-white px-2 py-1 rounded border border-gray-200">
                        JSON
                    </div>
                </div>
                <p className="mt-2 text-xs text-gray-500">
                    Modifiez la structure de données brute du bloc. Attention : une syntaxe invalide peut casser l'affichage.
                </p>
            </div>
        </div>
    );
}
