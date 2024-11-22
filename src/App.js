import React, { useState } from "react";
import Navbar from "./components/NavbarTemp"; // Pastikan file NavbarTemp ada
import Portfolio from "./components/Portfolio";
import ProjectList from "./components/ProjectList";
import "./App.css"; // Pastikan file CSS terhubung

function App() {
  const [activeSection, setActiveSection] = useState("home"); // State untuk menentukan bagian aktif

  // Fungsi untuk navigasi langsung ke bagian tertentu
  const handleNavigate = (section) => {
    setActiveSection(section);
  };

  // Komponen utama
  return (
    <div className="App">
      {/* Navbar */}
      <Navbar setActiveSection={setActiveSection} />

      <div className="container mt-5">
        {/* Render konten berdasarkan activeSection */}
        {activeSection === "home" && (
          <section className="home">
            <div className="row align-items-center">
              {/* Kolom Kiri - Teks dan animasi */}
              <div className="col-md-6">
                <h1>Hello World!</h1>
                <p className="typing-text">
                  <span>Project Responsi</span>
                </p>
                <p className="typing-animation">
                  Welcome to my portfolio website!
                </p>
                {/* Tombol About Me */}
                <button 
                  className="btn btn-primary mt-3"
                  onClick={() => handleNavigate("about")}
                >
                  About Me
                </button>
              </div>

              {/* Kolom Kanan - Foto profil dengan frame bercahaya */}
              <div className="col-md-6 text-center">
                <div className="profile-image-wrapper">
                  <img
                    src="/test.jpg" // Pastikan path gambar benar
                    alt="My Profile"
                    className="profile-image"
                  />
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Section lainnya */}
        {activeSection === "about" && <Portfolio section="about" />}
        {activeSection === "skills" && <Portfolio section="skills" />}
        {activeSection === "project" && <ProjectList />}
        {activeSection === "contact" && <Portfolio section="contact" />}
      </div>
    </div>
  );
}

export default App;
