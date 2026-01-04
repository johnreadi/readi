'use client';

import React from 'react';

interface MaintenanceCard {
  image: string;
  title: string;
  text: string;
}

export default function MaintenanceBlock({ content }: { content: any }) {
  const cards: MaintenanceCard[] = content.cards || [];

  return (
    <section className="features12 cid-ro61FKV3bf" id="features12-x">
        <div className="container-fluid">
            <h2 className="mbr-section-title align-left mbr-fonts-style display-2">
                {content.title || "Maintenance & Installation"}
            </h2>
            <div className="underline align-left pb-3">
                <div className="line"></div>
            </div>
            
            <div className="row justify-content-center align-items-start pt-5">
                {cards.map((card, index) => (
                  <div className="card px-3 py-4 col-12 col-md-6 col-lg-4" key={index}>
                      <div className="card-wrapper flip-card">
                          <div className="card-img">
                              <img src={card.image} alt={card.title} title="" />
                              <div className="img-text mbr-text mbr-fonts-style align-center mbr-white display-7">
                                   {card.title}
                              </div>
                          </div>
                          <div className="card-box">
                              <p className="mbr-card-text mbr-fonts-style align-center display-7">
                                  {card.text}
                              </p>
                          </div>
                      </div>
                  </div>
                ))}
            </div>
        </div>
    </section>
  );
}
