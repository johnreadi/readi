'use client';

import React, { useState } from 'react';

interface ServiceItem {
  title: string;
  content: string;
  icon?: string;
}

export default function ServicesAccordionBlock({ content }: { content: any }) {
  // Use state to track which accordion item is open
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const items: ServiceItem[] = content.items || [];

  return (
    <section className="toggle1 cid-qMYEyX8lNp mbr-parallax-background" id="toggle1-j" style={{ backgroundImage: `url(${content.backgroundImage || "assets/images/mbr-1920x1279.jpg"})` }}>
        <div className="mbr-overlay" style={{ opacity: 0.3, backgroundColor: 'rgb(193, 193, 193)' }}>
        </div>
        <div className="container-fluid">
            <div className="media-container-row">
                <div className="col-12 col-md-12">
                    <div className="section-head text-center space30">
                       <h2 className="mbr-section-title pb-3 mbr-fonts-style display-2">
                           {content.title || "Nos domaines de services"}
                       </h2>
                    </div>
                    
                    <div className="section-subhead text-center space30">
                        <h2 className="mbr-section-subtitle mbr-light mbr-fonts-style pb-3 pt-3 display-5">
                            {content.subtitle || "Nous intervenons sur site s'il y a lieu et par accord avec nos clients..."}
                        </h2>
                    </div>
                    <div className="clearfix"></div>
                    <div id="bootstrap-toggle" className="toggle-panel accordionStyles tab-content row justify-content-center">
                        {items.map((item, index) => (
                          <div className="col-lg-5 col-md-12" key={index}>
                              <div className="card">
                                  <div className="card-header" role="tab" id={`heading${index}`}>
                                      <a role="button" 
                                         className={`panel-title text-black ${openIndex !== index ? 'collapsed' : ''}`} 
                                         onClick={(e) => { e.preventDefault(); toggleAccordion(index); }}
                                         href={`#collapse${index}`}
                                      >
                                          <span className={`sign mbr-iconfont mbri-arrow-down ${openIndex !== index ? 'inactive' : ''}`}></span>
                                          <h4 className={`toggle-header mbr-fonts-style display-5 ${openIndex !== index ? 'inactive' : ''}`}>
                                              <span className="toggle-title">
                                                  {item.title}
                                              </span>
                                          </h4>
                                      </a>
                                  </div>
                                  <div id={`collapse${index}`} className={`panel-collapse noScroll collapse ${openIndex === index ? 'show' : ''}`} role="tabpanel">
                                      <div className="panel-body p-4">
                                          <p className="mbr-fonts-style panel-text display-7" dangerouslySetInnerHTML={{ __html: item.content }} />
                                      </div>
                                  </div>
                              </div>
                          </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    </section>
  );
}
