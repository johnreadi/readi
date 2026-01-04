'use client';

import React from 'react';

export default function ProductsBlock({ content }: { content: any }) {
  return (
    <section className="cid-roBmLlbdko" id={content.id || "content7-z"}>
        <div className="mbr-overlay" style={{ opacity: 0.8, backgroundColor: 'rgb(239, 239, 239)' }}>
        </div>
        <div className="container-fluid">
            <div className="row justify-content-center">
                <div className="col-12 col-lg-6 col-md-8 align-center">
                    <h2 className="mbr-section-title align-center mbr-fonts-style mbr-bold display-4">
                        {content.title || "Trouvez les références d'origine des produits & pièces détachées constructeurs. Veuillez nous envoyer votre choix pour un devis"}
                    </h2>
                </div>
            </div> 
            <iframe 
                src={content.iframeUrl || "https://www.eetgroup.com/fr-fr/external-guides/productguide?externalId=855948f7-0461-4b48-b2d6-1ab51285adc7&guideId=all"} 
                width="100%" 
                height="800"
                style={{ border: 'none' }}
                title="Product Guide"
            />
        </div>
    </section>
  );
}
