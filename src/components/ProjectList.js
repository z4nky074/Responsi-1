import React from 'react';

const ProjectList = () => {
  const projects = [
    { image: 'tasklist.jpg', description: 'Di Projek kali ini saya membuat tampilan task list yang berfungsi untuk mengatur jadwal' },
    { image: '/images/project2.jpg', description: 'Deskripsi proyek 2' },
    { image: '/images/project3.jpg', description: 'Deskripsi proyek 3' },
  ];

  return (
    <div className="container mt-4">
      {/* Judul Project List */}
      <section className="projects mb-5">
        <h3 className="text-center mb-4">My Projects</h3>

        <div className="row justify-content-center">
          {/* Menggunakan .col-md-4 untuk menampilkan 3 proyek dalam satu baris */}
          {projects.map((project, index) => (
            <div key={index} className="col-md-4 mb-4">
              <div className="card">
                <div className="card-body text-center">
                  <img
                    src={project.image}
                    className="img-fluid rounded mb-3"
                    alt="Project"
                  />
                  <p className="card-text" style={{ fontSize: '1rem' }}>
                    {project.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default ProjectList;
