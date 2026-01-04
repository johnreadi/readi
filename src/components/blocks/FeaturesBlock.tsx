'use client';
import React from 'react';

export default function FeaturesBlock({ content }: { content: any }) {
  const reverse = content.reverse || false;
  
  return (
    <section className={`features2 cid-${content.cid || "ro5NSghQXv"}`} id={content.anchor || "features2-u"}>
        <div className="container-fluid">
            <div className={`row main align-items-center ${reverse ? 'flex-row-reverse' : ''}`}>
                <div className="col-md-6 image-element align-self-stretch">
                    <div className="img-wrap" style={{ width: '80%', height: '80%', margin: '0 auto' }}>
                        <img src={content.image || "/assets/images/affichage1-1080x600.png"} alt={content.title} title={content.title} style={{ width: '100%' }} />
                    </div>
                </div>
                <div className="col-md-6 text-element">
                    <div className="text-content">
                        <h2 className="mbr-title pt-2 mbr-fonts-style align-center display-2">
                            {content.title || "Affichage Dynamique"}
                        </h2>
                        <div className="underline align-center">
                             <div className="line"></div>
                        </div>
                        <div className="mbr-section-text">
                            <p className="mbr-text pt-3 mbr-light mbr-fonts-style align-center display-5">
                                {content.text || "Nous proposons un système d'affichage dynamique moderne..."}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>          
    </section>
  );
}
