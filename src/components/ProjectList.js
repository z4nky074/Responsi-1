import React, { useState, useEffect, useRef } from 'react';
import Swal from 'sweetalert2';
import '../App.css'; // Mengimpor file CSS dari luar folder components

const ProjectList = () => {
  const [projects, setProjects] = useState([
    {
      image: '/images/tasklist.jpg',
      description: 'Di Projek kali ini saya membuat tampilan task list yang berfungsi untuk mengatur jadwal',
    },
    {
      image: '/images/airnb.jpg',
      description: 'Dan untuk Projek ini saya membuat web dengan khas masing" mahasiswa dengan meniru web airnb',
    },
    {
      image: '/images/rapsshop.jpg',
      description: 'Untuk Projek ini saya hanya membuat sebuah tampilan yang sudah di berikan tamplate oleh asprak',
    },
  ]);

  const [newProject, setNewProject] = useState({ image: '', description: '' });
  const [editIndex, setEditIndex] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [uploadMode, setUploadMode] = useState('url'); // Default ke URL
  const [modalProject, setModalProject] = useState(null); // State untuk menyimpan proyek yang diklik untuk modal

  const projectCardsRef = useRef([]);

  useEffect(() => {
    // IntersectionObserver untuk card proyek
    const projectObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate');
          }
        });
      },
      { threshold: 0.5 }
    );

    // Mengamati setiap card proyek
    projectCardsRef.current.forEach((card) => {
      if (card) {
        projectObserver.observe(card);
      }
    });

    return () => {
      projectCardsRef.current.forEach((card) => {
        if (card) {
          projectObserver.unobserve(card);
        }
      });
    };
  }, []);

  const handleAddOrUpdate = (e) => {
    e.preventDefault();

    if (!newProject.image || !newProject.description) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Mohon isi gambar dan deskripsi proyek dengan lengkap!',
      });
      return;
    }

    const emptyIndex = projects.findIndex((project) => project.description === '');

    if (emptyIndex !== -1) {
      const updatedProjects = [...projects];
      updatedProjects[emptyIndex] = newProject;
      setProjects(updatedProjects);
      Swal.fire('Berhasil!', 'Proyek berhasil ditambahkan.', 'success');
    } else {
      setProjects([...projects, newProject]);
      Swal.fire('Berhasil!', 'Proyek berhasil ditambahkan.', 'success');
    }

    setNewProject({ image: '', description: '' });
    setEditIndex(null);
    setShowPopup(false);
  };

  const handleEdit = (index) => {
    setNewProject(projects[index]);
    setEditIndex(index);
    setShowPopup(true);
  };

  const handleDelete = (index) => {
    Swal.fire({
      title: 'Apakah Anda yakin?',
      text: 'Proyek yang dihapus tidak dapat dikembalikan!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Ya, hapus!',
      cancelButtonText: 'Batal',
    }).then((result) => {
      if (result.isConfirmed) {
        setProjects(projects.filter((_, i) => i !== index));
        Swal.fire('Dihapus!', 'Proyek berhasil dihapus.', 'success');
      }
    });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const img = new Image();
        img.onload = () => {
          const maxWidth = 800;
          const maxHeight = 600;
          let width = img.width;
          let height = img.height;

          if (width > maxWidth) {
            height = (maxWidth / width) * height;
            width = maxWidth;
          }

          if (height > maxHeight) {
            width = (maxHeight / height) * width;
            height = maxHeight;
          }

          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d');
          canvas.width = width;
          canvas.height = height;
          ctx.drawImage(img, 0, 0, width, height);

          const resizedImage = canvas.toDataURL(file.type);
          setNewProject({ ...newProject, image: resizedImage });
        };
        img.src = reader.result;
      };
      reader.readAsDataURL(file);
    }
  };

  const closePopup = () => {
    setShowPopup(false);
    setNewProject({ image: '', description: '' });
    setEditIndex(null);
  };

  const openModal = (project) => {
    setModalProject(project);
  };

  const closeModal = () => {
    setModalProject(null);
  };

  return (
    <div className="container mt-4">
      <section className="projects mb-5">
        <h3 className="text-center mb-4">My Projects</h3>

        <div className="row justify-content-center">
          {projects.map((project, index) => (
            <div
              key={index}
              className="col-md-4 mb-4"
              ref={(el) => (projectCardsRef.current[index] = el)}
            >
              <div className="card">
                <div className="card-body text-center">
                  <img
                    src={project.image}
                    className="img-fluid rounded mb-3"
                    alt="Project"
                    style={{ maxWidth: '100%', maxHeight: '400px', cursor: 'pointer' }}
                    onClick={() => openModal(project)}
                  />
                  <p className="card-text" style={{ fontSize: '1rem' }}>
                    {project.description || 'Belum ada deskripsi'}
                  </p>
                  <button className="btn btn-warning me-2" onClick={() => handleEdit(index)}>
                    Edit
                  </button>
                  <button className="btn btn-danger" onClick={() => handleDelete(index)}>
                    Hapus
                  </button>
                </div>
              </div>
            </div>
          ))}
          <div className="col-md-4 mb-4">
            <div
              className="card add-card"
              onClick={() => setShowPopup(true)}
              style={{ cursor: 'pointer', border: '2px dashed #ddd' }}
            >
              <div className="card-body text-center">
                <i className="fas fa-plus fa-3x text-muted"></i>
                <p className="text-muted">Tambah Proyek</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {modalProject && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content">
            <span className="close-modal" onClick={closeModal}>
              &times;
            </span>
            <img
              src={modalProject.image}
              alt="Zoomed"
              className="zoomed-img"
              style={{ maxWidth: '80%', maxHeight: '80%' }}
            />
            <p>{modalProject.description}</p>
          </div>
        </div>
      )}

      {showPopup && (
        <div className="popup-overlay">
          <div className="popup-content animate-popup">
            <h4 className="text-center mb-4">
              {editIndex !== null ? 'Edit Proyek' : 'Tambah Proyek'}
            </h4>
            <form onSubmit={handleAddOrUpdate}>
              <div className="mb-3">
                <label>
                  <input
                    type="radio"
                    name="uploadMode"
                    value="url"
                    checked={uploadMode === 'url'}
                    onChange={() => setUploadMode('url')}
                  />{' '}
                  Tambah dari URL
                </label>
                <label className="ms-3">
                  <input
                    type="radio"
                    name="uploadMode"
                    value="file"
                    checked={uploadMode === 'file'}
                    onChange={() => setUploadMode('file')}
                  />{' '}
                  Unggah File
                </label>
              </div>

              {uploadMode === 'url' ? (
                <div className="mb-3">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="URL Gambar"
                    value={newProject.image}
                    onChange={(e) =>
                      setNewProject({ ...newProject, image: e.target.value })
                    }
                  />
                </div>
              ) : (
                <div className="mb-3">
                  <input
                    type="file"
                    accept="image/*"
                    className="form-control"
                    onChange={handleImageUpload}
                  />
                  {newProject.image && (
                    <img
                      src={newProject.image}
                      alt="Preview"
                      className="img-fluid mt-3"
                      style={{ maxHeight: '200px' }}
                    />
                  )}
                </div>
              )}

              <div className="mb-3">
                <textarea
                  className="form-control"
                  rows="3"
                  placeholder="Deskripsi Proyek"
                  value={newProject.description}
                  onChange={(e) =>
                    setNewProject({ ...newProject, description: e.target.value })
                  }
                ></textarea>
              </div>
              <div className="text-center">
                <button type="submit" className="btn btn-primary me-2">
                  {editIndex !== null ? 'Update Proyek' : 'Tambah Proyek'}
                </button>
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={closePopup}
                >
                  Batal
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectList;
