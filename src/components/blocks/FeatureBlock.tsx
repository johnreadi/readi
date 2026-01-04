'use client';

import React from 'react';

export default function FeatureBlock({ content, reverse = false }: { content: any, reverse?: boolean }) {
  // content.reverse allows the DB to control layout, but we can also pass it as a prop
  const isReverse = content.reverse !== undefined ? content.reverse : reverse;

  return (
    <section className={`features2 cid-ro5NSghQXv`} id={content.id || "features2-u"}>
        <div className="container-fluid">
            <div className="row main align-items-center">
                {isReverse ? (
                  <>
                    <div className="col-md-6 text-element">
                        <div className="text-content">
                            <h2 className="mbr-title pt-2 mbr-fonts-style align-center display-2">
                                {content.title}
                            </h2>
                            <div className="underline align-center">
                                 <div className="line"></div>
                            </div>
                            <div className="mbr-section-text">
                                <p className="mbr-text pt-3 mbr-light mbr-fonts-style align-center display-5">
                                    {content.text}
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6 image-element align-self-stretch">
                        <div className="img-wrap" style={{ width: '80%', height: '80%' }}>
                            <img src={content.image || "assets/images/affichage1-1080x600.png"} alt={content.title} title="" />
                        </div>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="col-md-6 image-element align-self-stretch">
                        <div className="img-wrap" style={{ width: '80%', height: '80%' }}>
                            <img src={content.image || "assets/images/affichage1-1080x600.png"} alt={content.title} title="" />
                        </div>
                    </div>
                    <div className="col-md-6 text-element">
                        <div className="text-content">
                            <h2 className="mbr-title pt-2 mbr-fonts-style align-center display-2">
                                {content.title}
                            </h2>
                            <div className="underline align-center">
                                 <div className="line"></div>
                            </div>
                            <div className="mbr-section-text">
                                <p className="mbr-text pt-3 mbr-light mbr-fonts-style align-center display-5">
                                    {content.text}
                                </p>
                            </div>
                        </div>
                    </div>
                  </>
                )}
            </div>
        </div>          
    </section>
  );
}
