'use client';

import { useState, useEffect } from 'react';
import MediaLibrary from '@/app/admin/media/MediaLibrary';
import Modal from '@/components/ui/Modal';

type MediaPickerProps = {
    onSelect: (url: string) => void;
    onClose: () => void;
};

export default function MediaPicker({ onSelect, onClose }: MediaPickerProps) {
    const [media, setMedia] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('/api/media')
            .then(res => res.json())
            .then(data => {
                setMedia(data);
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setLoading(false);
            });
    }, []);

    return (
        <Modal
            isOpen={true}
            onClose={onClose}
            title="Médiathèque"
            size="xl"
        >
            {loading ? (
                <div className="flex justify-center items-center p-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
                </div>
            ) : (
                <MediaLibrary initialMedia={media} onSelect={onSelect} />
            )}
        </Modal>
    );
}
