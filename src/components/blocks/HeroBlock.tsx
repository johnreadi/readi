'use client';

import React, { useEffect, useRef } from 'react';

// Note: In a real implementation, we would import Typed.js or a similar library.
// Since we want to keep it simple and dependency-free if possible, 
// or use the existing Mobirise scripts, we might need to adjust.
// For now, I will implement a simple typing effect in React or assume the global script handles it if classes match.
// However, React handles DOM differently. I'll implement a simple typing effect for "La Compétence", etc.

export default function HeroBlock({ content }: { content: any }) {
  const [textIndex, setTextIndex] = React.useState(0);
  const words = content.animatedWords || ["La Compétence", "La Rapidité", "L'Expérience"];
  
  // Simple typing effect simulation (simplified for MVP)
  // In a full version, we'd use a library like 'react-typed'
  useEffect(() => {
    const interval = setInterval(() => {
      setTextIndex((prev) => (prev + 1) % words.length);
    }, 2000);
    return () => clearInterval(interval);
  }, [words]);

  return (
    <section className="header10 cid-qMYCdvTNSz mbr-parallax-background" id="header10-h" style={{ backgroundImage: `url(${content.backgroundImage || "assets/images/mbr-1920x1280.jpg"})` }} suppressHydrationWarning>
        <div className="mbr-overlay" style={{ opacity: 0.2, backgroundColor: 'rgb(204, 204, 204)' }}>
        </div>

        <div className="container-fluid">
            <div className="row justify-content-center">
                <div className="mbr-white col-md-12 col-lg-10">
                    <h1 className="mbr-section-title mbr-bold mbr-fonts-style align-center display-1">
                        {content.title || "SERVICE DU PRO ..."}
                    </h1>
                    <div className="typing-text-container pb-3 align-center display-2">
                        <span className="mbr-section-subtitle mbr-fonts-style display-2">
                              {content.subtitle || "READI.FR c'est :"}
                        </span>
                        <span style={{ marginLeft: '10px' }}>
                          <span className="mbr-bold animated-element">
                            {words[textIndex]}
                          </span>
                        </span>
                    </div>
                </div>
            </div>
        </div>
    </section>
  );
}
