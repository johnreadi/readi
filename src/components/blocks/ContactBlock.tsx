'use client';

import React, { useState } from 'react';

export default function ContactBlock({ content }: { content: any }) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    message: ''
  });
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error('Erreur lors de l\'envoi');

      setStatus('success');
      setFormData({ name: '', phone: '', email: '', message: '' });
      // Reset after 5 seconds
      setTimeout(() => setStatus('idle'), 5000);
    } catch (error) {
      console.error(error);
      setStatus('error');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // Note: This modal was originally a popup in Mobirise. 
  // For better UX in Next.js, we can make it a regular section or a controlled modal.
  // Given the structure, I'll render it as a section that can be toggled or just always visible if preferred,
  // BUT the original code shows it as a modal #mbr-popup-12 triggered by the "CONTACT" link.
  // For simplicity in this "convert all" step, I will implement it as a standard Modal component 
  // that is hidden by default but exposed via a context or state if I were building a full app.
  // However, since we are building blocks, I will make this a "Contact Section" that is visible 
  // because relying on Bootstrap JS modals in React can be tricky without the library.
  // BETTER APPROACH: Render it as a visible Contact Section at the bottom of the page, 
  // or a simple React Modal if 'isOpen' prop is passed.
  
  // Let's make it a nice visible section for now, as it's better for SEO and UX than a hidden popup.
  
  return (
    <section className="cid-t06zpToEb3" id="contact-form" style={{ padding: '40px 0', backgroundColor: '#fff' }}>
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-lg-8 col-md-10">
                    <div className="mbr-section-head align-center mb-4">
                        <h3 className="mbr-section-title mbr-fonts-style display-2">
                            {content.title || "Contactez-nous"}
                        </h3>
                    </div>
                    
                    <form onSubmit={handleSubmit} className="mbr-form form-with-styler">
                        {status === 'success' && (
                            <div className="alert alert-success col-12">Merci pour votre message, nous vous répondrons très rapidement.</div>
                        )}
                        {status === 'error' && (
                            <div className="alert alert-danger col-12">Une erreur est survenue. Veuillez réessayer plus tard.</div>
                        )}
                        <div className="dragArea row">
                            <div className="col-md-6 form-group mb-3" data-for="name">
                                <input type="text" name="name" placeholder="Votre Nom" required className="form-control display-7" 
                                    value={formData.name} onChange={handleChange} />
                            </div>
                            <div className="col-md-6 form-group mb-3" data-for="phone">
                                <input type="text" name="phone" placeholder="Votre Téléphone" required className="form-control display-7" 
                                    value={formData.phone} onChange={handleChange} />
                            </div>
                            <div className="col-12 form-group mb-3" data-for="email">
                                <input type="email" name="email" placeholder="Votre adresse Email" required className="form-control display-7" 
                                    value={formData.email} onChange={handleChange} />
                            </div>
                            <div className="col-12 form-group mb-3" data-for="message">
                                <textarea name="message" placeholder="Veuillez saisir votre message" required className="form-control display-7" style={{ height: '180px' }}
                                    value={formData.message} onChange={handleChange}></textarea>
                            </div>
                            <div className="col-12 input-group-btn align-center">
                                <button type="submit" className="btn btn-primary display-4">SOUMETTRE</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </section>
  );
}
