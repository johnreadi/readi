'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useSession } from 'next-auth/react';

export default function MenuBlock({ content }: { content: any }) {
  const [isCollapsed, setIsCollapsed] = useState(true);
  const { data: session } = useSession();

  const toggleNavbar = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <section className="menu cid-qMS9PHDoF2" id="menu1-2" suppressHydrationWarning>
      <nav className="navbar navbar-dropdown navbar-fixed-top navbar-expand-lg" suppressHydrationWarning>
        <div className="navbar-brand">
          <span className="navbar-logo">
            <Link href="/">
               <img src={content.logo || "/assets/images/readi27-140x43.png"} alt="Readi" title="READI.fr" style={{ height: '4rem' }} />
            </Link>
          </span>
          <span className="navbar-caption-wrap">
            <a className="navbar-caption text-black display-5" href="#">
              {content.brandName || "Pro depuis 1994"}
            </a>
          </span>
        </div>
        <button 
          className="navbar-toggler" 
          type="button" 
          onClick={toggleNavbar}
          aria-expanded={!isCollapsed} 
          aria-label="Toggle navigation"
        >
          <div className="hamburger">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </button>
        <div className={`collapse navbar-collapse ${!isCollapsed ? 'show' : ''}`} id="navbarSupportedContent">
          <ul className="navbar-nav nav-dropdown">
            {content.items ? content.items.map((item: any, index: number) => (
              <li className="nav-item" key={index}>
                <Link className="nav-link link text-black display-4" href={item.link || "#"}>
                  {item.label}
                </Link>
              </li>
            )) : (
              // Default items if no content provided
              <>
                <li className="nav-item">
                    <a className="nav-link link text-black display-4" href="#features1-v">AFFICHAGE DYNAMIQUE</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link link text-black display-4" href="#features12-x">INFORMATIQUE & MAINTENANCE</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link link text-black display-4" href="#content7-z">PIECES DETACHEES</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link link text-black text-primary display-4" href="#">CONTACT</a>
                </li>
              </>
            )}
            {/* Admin Link */}
            <li className="nav-item">
                <Link className="nav-link link text-black display-4" href={session ? "/admin" : "/login"}>
                    {session ? (
                        <span style={{ color: '#2563eb', fontWeight: 'bold' }}>ADMIN</span>
                    ) : (
                        <span className="sli-lock" title="Connexion Admin" style={{ fontSize: '0.8rem', opacity: 0.5 }}></span>
                    )}
                </Link>
            </li>
          </ul>
          <div className="navbar-buttons mbr-section-btn">
            <a className="btn btn-sm btn-black-outline display-4" href={`tel:${content.phone || "02-35-62-40-46"}`}>
              <span className="sli-phone mbr-iconfont mbr-iconfont-btn" style={{ color: 'rgb(19, 250, 15)' }}></span>
              {content.phone || "02.35.62.40.46"}
            </a>
          </div>
        </div>
      </nav>
    </section>
  );
}
