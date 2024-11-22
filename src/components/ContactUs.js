import React, { useState } from 'react';
import Swal from 'sweetalert2';

const ContactUs = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email || !message) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Mohon isi email dan pesan dengan lengkap!',
      });
      return;
    }

    Swal.fire({
      icon: 'success',
      title: 'Pesan Terkirim!',
      text: 'Kami telah menerima pesan Anda dan akan segera merespon.',
    });

    setEmail('');
    setMessage('');
  };

  return (
    <section id="contact" className="contact-section text-center py-5">
      <h3 style={{ fontSize: '1.75rem', fontWeight: '600' }}>Hubungi Saya</h3>
      <p>Silakan hubungi saya melalui platform berikut!</p>

      <form onSubmit={handleSubmit} className="mt-4">
        <div className="mb-3">
          <input
            type="email"
            className="form-control form-control-lg"
            placeholder="Email Anda"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{ maxWidth: '450px', margin: '0 auto' }}
          />
        </div>
        <div className="mb-3">
          <textarea
            className="form-control form-control-lg"
            rows="5"
            placeholder="Pesan Anda"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
            style={{ maxWidth: '450px', margin: '0 auto' }}
          ></textarea>
        </div>
        <button type="submit" className="btn btn-primary btn-lg" style={{ fontSize: '1rem' }}>
          Kirim Pesan
        </button>
      </form>

      <div className="social-buttons mt-4">
        <a href="https://wa.me/6289668547232" className="btn btn-success btn-lg me-2" target="_blank" rel="noopener noreferrer">
          <i className="bi bi-whatsapp"></i>
        </a>
        <a href="https://instagram.com/rrafapras74" className="btn btn-outline-danger btn-lg me-2" target="_blank" rel="noopener noreferrer">
          <i className="bi bi-instagram"></i>
        </a>
        <a href="https://tiktok.com/@mrapaaap74" className="btn btn-dark btn-lg me-2" target="_blank" rel="noopener noreferrer">
          <i className="bi bi-tiktok"></i>
        </a>
        <a href="https://github.com/z4nky074" className="btn btn-dark btn-lg me-2" target="_blank" rel="noopener noreferrer">
          <i className="bi bi-github"></i>
        </a>
        <a href="mailto:rafa24052005@gmail.com" className="btn btn-outline-primary btn-lg" target="_blank" rel="noopener noreferrer">
          <i className="bi bi-envelope"></i>
        </a>
      </div>
    </section>
  );
};

export default ContactUs;

