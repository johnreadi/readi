'use client';

import React from 'react';

export default function FooterBlock({ content }: { content: any }) {
  // Simple footer based on Mobirise structure (often just scripts, but we add a real visual footer)
  return (
    <section className="cid-qMS9PHDoF2" id="footer1-2" style={{ backgroundColor: '#fff', padding: '2rem 0' }}>
        <div className="container">
            <div className="media-container-row align-center mbr-white">
                <div className="col-12">
                    <p className="mbr-text mb-0 mbr-fonts-style display-7 text-black">
                        © Copyright {new Date().getFullYear()} Readi.fr - Tous droits réservés
                    </p>
                </div>
            </div>
        </div>
    </section>
  );
}
