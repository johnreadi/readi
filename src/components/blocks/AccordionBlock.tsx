'use client';
import React, { useState } from 'react';

export default function AccordionBlock({ content }: { content: any }) {
  const [activeTab, setActiveTab] = useState<string | null>(null);

  const toggleTab = (id: string) => {
    setActiveTab(activeTab === id ? null : id);
  };

  const items = content.items || [
    {
      title: "Affichage Dynamique",
      text: "Un écran en vitrine est tout simplement plus pratique que le papier !<br><br>L’écran d’affichage dynamique dans une vitrine de magasin donne une image très esthétique et moderne à votre vitrine."
    },
    {
        title: "Réparation: Electronique & Installation",
        text: "Réparer votre appareil, c’est prolonger sa durée de vie tout en faisant un bon geste pour l’environnement. Pourquoi acheter un nouvel appareil quand la réparation est possible ?<br>Nous installons les antennes parabolique. Nous sommes agréés ORANGE TV"
    },
    {
        title: "Maintenance PC & Périphériques",
        text: "Notre grande expérience dans le domaine de la réparation informatique nous permet de faire face à la plupart des dysfonctionnements & pannes matérielles rencontrés."
    },
    {
        title: "Formation & Création Web",
        text: "Savoir préparer et organiser les contenus prévus pour le site<br>Comprendre comment créer un site Internet<br>Maîtriser les facettes de l'outil de la création des pages"
    }
  ];

  return (
    <section className="toggle1 cid-qMYEyX8lNp mbr-parallax-background" id="toggle1-j" style={{ backgroundImage: `url(${content.bgImage || "/assets/images/mbr-1920x1280.jpg"})`, backgroundAttachment: 'fixed', backgroundPosition: 'top center', backgroundSize: 'cover' }}>
        <div className="mbr-overlay" style={{ opacity: 0.3, backgroundColor: 'rgb(193, 193, 193)' }}></div>
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
                            {content.subtitle || "Nous intervenons sur site s'il y a lieu et par accord avec nos clients, effectuons les travaux sur acceptation du devis préalablement établi d'après nos tarifs et conditions légales de vente."}
                        </h2>
                    </div>
                    <div className="clearfix"></div>
                    <div id="bootstrap-toggle" className="toggle-panel accordionStyles tab-content row justify-content-center">
                        {items.map((item: any, index: number) => (
                            <div className="col-lg-5 col-md-12" key={index}>
                                <div className="card">
                                    <div className="card-header" role="tab" id={`heading${index}`}>
                                        <a 
                                            role="button" 
                                            className={`panel-title text-black ${activeTab === `item-${index}` ? '' : 'collapsed'}`} 
                                            onClick={() => toggleTab(`item-${index}`)}
                                            style={{ cursor: 'pointer', display: 'block' }}
                                        >
                                            <span className={`sign mbr-iconfont mbri-arrow-down ${activeTab === `item-${index}` ? '' : 'inactive'}`}></span>
                                            <h4 className="toggle-header inactive mbr-fonts-style display-5">
                                                <span className="toggle-title">{item.title}</span>
                                            </h4>
                                        </a>
                                    </div>
                                    <div id={`collapse${index}`} className={`panel-collapse noScroll collapse ${activeTab === `item-${index}` ? 'show' : ''}`} role="tabpanel">
                                        <div className="panel-body p-4">
                                            <p className="mbr-fonts-style panel-text display-7" dangerouslySetInnerHTML={{ __html: item.text }}></p>
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
