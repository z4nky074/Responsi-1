import React, { useState } from 'react';
import Swal from 'sweetalert2';

const ContactUs = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]); // Array untuk menyimpan pesan
  const [editing, setEditing] = useState(null); // Untuk menyimpan pesan yang sedang diedit

  const handleSubmit = (e) => {
    e.preventDefault();

    // Cek jika email atau pesan kosong
    if (!email || !message) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Mohon isi email dan pesan dengan lengkap!',
      });
      return;
    }

    // Jika sedang mengedit pesan, perbarui pesan tersebut
    if (editing) {
      setMessages(
        messages.map((msg) =>
          msg.id === editing.id ? { ...msg, email, message } : msg
        )
      );
      setEditing(null);
      Swal.fire({
        icon: 'success',
        title: 'Pesan Diperbarui!',
        text: 'Pesan Anda telah diperbarui.',
      });
    } else {
      // Jika tidak sedang mengedit, tambahkan pesan baru
      const newMessage = {
        id: Date.now(), // ID unik menggunakan timestamp
        email,
        message,
      };
      setMessages([...messages, newMessage]);

      Swal.fire({
        icon: 'success',
        title: 'Pesan Terkirim!',
        text: 'Kami telah menerima pesan Anda dan akan segera merespon.',
      });
    }

    // Reset form setelah pengiriman
    setEmail('');
    setMessage('');
  };

  const handleEdit = (msg) => {
    setEmail(msg.email);
    setMessage(msg.message);
    setEditing(msg);
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: 'Apakah Anda yakin?',
      text: 'Pesan ini akan dihapus!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Hapus',
      cancelButtonText: 'Batal',
    }).then((result) => {
      if (result.isConfirmed) {
        setMessages(messages.filter((msg) => msg.id !== id));
        Swal.fire('Dihapus!', 'Pesan telah dihapus.', 'success');
      }
    });
  };

  return (
    <section id="contact" className="contact-section text-center py-5">
      <h3 style={{ fontSize: '1.75rem', fontWeight: '600' }}>Hubungi Saya</h3>
      <p>Silakan hubungi saya melalui platform berikut!</p>

      {/* Form untuk mengirim email dan pesan */}
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
          {editing ? 'Update Pesan' : 'Kirim Pesan'}
        </button>
      </form>

      {/* Daftar pesan yang terkirim, hanya tampil jika ada pesan */}
      {messages.length > 0 && (
        <div className="mt-5">
          <h4>Pesan Terkirim:</h4>
          <ul className="list-group">
            {messages.map((msg) => (
              <li key={msg.id} className="list-group-item">
                <p><strong>Email:</strong> {msg.email}</p>
                <p><strong>Pesan:</strong> {msg.message}</p>
                <button onClick={() => handleEdit(msg)} className="btn btn-warning btn-sm me-2">
                  Edit
                </button>
                <button onClick={() => handleDelete(msg.id)} className="btn btn-danger btn-sm">
                  Hapus
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
      
      {/* Tombol Sosial dengan Ikon */}
      <div className="social-buttons mt-4">
        <a href="https://wa.me/6289668547232" className="btn btn-success btn-lg me-2" target="_blank" rel="noopener noreferrer">
          <i className="fab fa-whatsapp"></i> {/* Hanya Ikon */}
        </a>
        <a href="https://instagram.com/rrafapras74" className="btn btn-outline-danger btn-lg me-2" target="_blank" rel="noopener noreferrer">
          <i className="fab fa-instagram"></i> {/* Hanya Ikon */}
        </a>
        <a href="https://tiktok.com/@mrapaaap74" className="btn btn-dark btn-lg me-2" target="_blank" rel="noopener noreferrer">
          <i className="fab fa-tiktok"></i> {/* Hanya Ikon */}
        </a>
        <a href="https://github.com/z4nky074" className="btn btn-dark btn-lg me-2" target="_blank" rel="noopener noreferrer">
          <i className="fab fa-github"></i> {/* Hanya Ikon */}
        </a>
        <a href="mailto:rafa24052005@gmail.com" className="btn btn-outline-primary btn-lg" target="_blank" rel="noopener noreferrer">
          <i className="fas fa-envelope"></i> {/* Hanya Ikon */}
        </a>
      </div>
    </section>
  );
};

export default ContactUs;
