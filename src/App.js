import React, { useState, useEffect, useRef } from "react";
import Navbar from "./components/NavbarTemp";
import Portfolio from "./components/Portfolio";
import ProjectList from "./components/ProjectList";

function App() {
  const [activeSection, setActiveSection] = useState("home"); // State untuk bagian aktif
  const elementRef = useRef(null); // Ref untuk elemen yang ingin dimodifikasi

  // Menggunakan useEffect untuk memastikan elemen sudah ada di DOM sebelum mengubahnya
  useEffect(() => {
    if (elementRef.current) {
      // Pastikan elemen tersedia sebelum mengubahnya
      console.log(elementRef.current); // Debugging untuk melihat apakah ref sudah terisi
      elementRef.current.innerHTML = "Welcome to My Portfolio!"; // Modifikasi konten
    }
  }, [activeSection]); // Efek ini akan dijalankan saat activeSection berubah

  return (
    <div className="App">
      {/* Navbar */}
      <Navbar setActiveSection={setActiveSection} />

      <div className="container mt-5">
        {/* Render konten berdasarkan activeSection */}
        {activeSection === "home" && (
          <section className="home">
            <div className="row align-items-center">
              {/* Kiri - Teks dan animasi ketikan */}
              <div className="col-md-6">
                <h1>Hello World!</h1>
                <p className="typing-text">
                  <span>I'm Muhammad Rafa Prasetya</span>
                </p>
                <h3>Project Responsi</h3>
                <p className="typing-animation">
                  Welcome to my portfolio website!
                </p>
              </div>

              {/* Kanan - Foto dengan frame bulat */}
              <div className="col-md-6 text-center">
                <img
                  src="/Foto.jpg" // Pastikan gambar Anda ada di path ini
                  alt="My Profile"
                  className="img-fluid rounded-circle shadow-sm"
                  style={{ width: "300px", height: "300px" }}
                />
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
