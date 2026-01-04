'use client';

import React from 'react';

export default function CableConfigBlock({ content }: { content: any }) {
  return (
    <section className="mbr-section info1 cid-roBBtZOi7b mbr-parallax-background" id="info1-11" style={{ backgroundImage: `url(${content.backgroundImage || "assets/images/mbr-1920x1080.jpg"})` }}>
        <div className="mbr-overlay" style={{ opacity: 0.5, backgroundColor: 'rgb(35, 35, 35)' }}></div>
        <div className="container-fluid">
            <div className="media-container-row">
                <div className="title col-12 col-md-8">
                    <h2 className="align-center mbr-bold mbr-white pb-3 mbr-fonts-style display-4">
                        {content.title || "Configurez vous-même votre Câble, et nous communiquer la référence pour un devis"}
                    </h2>
                </div>
            </div>
            <iframe 
                src={content.iframeUrl || "https://www.eetgroup.com/fr-fr/external-guides/productguide?externalId=fbb885a1-d180-4a3f-911b-6c35504b3862&guideId=cable"} 
                width="100%" 
                height="800"
                style={{ border: 'none' }}
                title="Cable Configurator"
            />
        </div>
    </section>
  );
}
