import React, { useEffect, useRef } from "react";
import ProjectList from "./ProjectList"; // Impor komponen ProjectList
import ContactUs from "./ContactUs"; // Impor komponen ContactUs

// Data untuk modularisasi
const skills = [
  { skill: "HTML", level: "75%", icon: "fab fa-html5", color: "#000000" },
  { skill: "CSS", level: "70%", icon: "fab fa-css3-alt", color: "#000000" },
  { skill: "JavaScript", level: "55%", icon: "fab fa-js", color: "#000000" },
  { skill: "React", level: "50%", icon: "fab fa-react", color: "#000000" },
];

const experiences = [
  {
    title: "PKL Di Rumah Mesin Sebagai SEO Engineer.",
    date: "April 2022 - September 2022",
    description: "Bekerja di bidang SEO Engineer.",
  },
  {
    title: "Sekolah di Jurusan RPL.",
    date: "Juni 2019 - Mei 2022",
    description: "Membuat Tampilan Pengaduan Masyarakat.",
  },
];

const Portfolio = ({ section }) => {
  const skillBarsRef = useRef([]);
  const timelineItemsRef = useRef([]);
  const typingRef = useRef(null);

  useEffect(() => {
    const observerOptions = { threshold: 0.5 };

    const skillObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.target && entry.isIntersecting) {
          entry.target.classList.add("animate");
        } else if (entry.target) {
          entry.target.classList.remove("animate");
        }
      });
    }, observerOptions);

    const timelineObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.target && entry.isIntersecting) {
          entry.target.classList.add("animate");
        } else if (entry.target) {
          entry.target.classList.remove("animate");
        }
      });
    }, observerOptions);

    skillBarsRef.current.forEach((bar) => {
      if (bar) {
        skillObserver.observe(bar);
      }
    });

    timelineItemsRef.current.forEach((item) => {
      if (item) {
        timelineObserver.observe(item);
      }
    });

    return () => {
      skillBarsRef.current.forEach((bar) => {
        if (bar) {
          skillObserver.unobserve(bar);
        }
      });

      timelineItemsRef.current.forEach((item) => {
        if (item) {
          timelineObserver.unobserve(item);
        }
      });
    };
  }, []);

  const getSkillBarColor = () => {
    return "#000000"; // Hitam
  };
  
  const animateTyping = () => {
    const typingText = "Project Responsi";
    let index = 0;

    const interval = setInterval(() => {
      if (index < typingText.length) {
        typingRef.current.innerHTML += typingText[index];
        index++;
      } else {
        clearInterval(interval);
      }
    }, 150);
  };

  useEffect(() => {
    if (typingRef.current) {
      animateTyping();
    }
  }, []);

  // **Updated Home Section**
  if (section === "home") {
    return (
      <section className="home d-flex align-items-center justify-content-between mb-5">
        <div className="left-content">
          <h1 className="display-4 fw-bold text-primary">Hello World, I'm</h1>
          <h2 className="mb-3 text-secondary">Muhammad Rafa Prasetya</h2>
          <h3 ref={typingRef} className="typing-effect mb-3 text-success"></h3>
          <p className="text-muted">Welcome to my portfolio website</p>
        </div>
        <div className="right-content text-center">
          <div className="photo-wrapper">
            <img
              src="/Foto.jpg" // Path file gambar yang ada di folder public
              alt="Profile"
              className="img-fluid profile-image"
            />
          </div>
        </div>
      </section>
    );
  }

  if (section === "about") {
    return (
      <section className="about-me mb-5">
        <div className="card shadow-sm">
          <div className="card-body">
            <h2 className="text-center mb-4">About Me</h2>
            <div className="row align-items-center">
              {/* Kolom Kiri - Foto */}
              <div className="col-md-6 text-center">
                <div className="profile-image-wrapper">
                  <img
                    src="/test.jpg" // Sama dengan yang digunakan di Home
                    alt="My Profile"
                    className="profile-image"
                  />
                </div>
              </div>

              {/* Kolom Kanan - Teks */}
              <div className="col-md-6" style={{ marginLeft: '-85px' }}>
                <h3>
                  <span className="typing-text">
                    Hello, I'm <span className="name-typing">Muhammad Rafa Prasetya</span>
                  </span>
                </h3>
                <p className="mt-3">
                  Saya adalah mahasiswa yang sedang mendalami pengembangan web, khususnya di bagian front-end.
                </p>
                <p>
                  Selain belajar coding, saya senang memecahkan masalah, bekerja sama dalam tim, dan terus mengeksplorasi teknologi terbaru untuk menciptakan dampak yang positif.
                </p>
                <p>
                  Saya selalu berusaha untuk terus belajar dan mengembangkan kemampuan agar bisa mengikuti perkembangan dunia web yang terus berubah.
                </p>

                {/* Tombol Download CV */}
                {/* Tombol Download CV */}
<div className="text-center mt-4">
  <a
    href="/cvats.pdf"
    download
    className="btn btn-primary"
    style={{ marginRight: "10px" }}
  >
    Download CV
  </a>
</div>

              </div>
            </div>
          </div>
        </div>
        {/* Bagian Experience */}
        <section className="experience mt-5">
          <h3 className="text-center mb-4">Experience</h3>
          <div className="timeline">
            {experiences.map((exp, index) => (
              <div
                className="timeline-item mb-4"
                key={index}
                ref={(el) => (timelineItemsRef.current[index] = el)}
              >
                <div className="timeline-icon bg-primary text-white rounded-circle d-flex align-items-center justify-content-center">
                  <i className="fas fa-briefcase"></i>
                </div>
                <div className="timeline-content p-3 shadow-sm rounded">
                  <h5>{exp.title}</h5>
                  <p className="text-muted mb-2">{exp.date}</p>
                  <p>{exp.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </section>
    );
  }

  if (section === "skills") {
    return (
      <section className="skills mb-5">
        <h3 className="text-center mb-4">Skills</h3>
        <div className="row text-center">
          {skills.map((item, index) => (
            <div className="col-md-3 mb-4" key={index}>
              <div className="skill-box p-4 border rounded shadow-sm">
                <h5>{item.skill}</h5>

                {/* Ikon skill */}
                <div className="mb-3">
                  <i
                    className={`${item.icon} fa-3x skill-icon`}
                    style={{ color: item.color, fontSize: "3rem" }}
                    title={item.skill}
                  ></i>
                </div>

                {/* Kontainer skill bar */}
                <div
                  className="skill-bar-container bg-light rounded-pill mt-3 position-relative"
                  style={{ height: "12px" }}
                >
                  {/* Label level skill */}
                  <span
                    className="skill-level-label position-absolute"
                    style={{
                      left: item.level,
                      top: "-25px",
                      fontSize: "0.75rem",
                      fontWeight: "bold",
                      transform: "translateX(-50%)",
                      color: getSkillBarColor(item.level),
                    }}
                  >
                    {item.level}
                  </span>

                  {/* Skill bar */}
                  <div
                    ref={(el) => (skillBarsRef.current[index] = el)}
                    className="skill-bar rounded-pill"
                    style={{
                      "--skill-width": item.level,
                      backgroundColor: getSkillBarColor(item.level),
                    }}
                  ></div>
                </div>

                {/* Deskripsi level */}
                <small className="text-muted mt-2 d-block">{item.level}</small>
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  }

  if (section === "project") {
    return <ProjectList />;
  }

  if (section === "contact") {
    return <ContactUs />;
  }

  return null;
};

export default Portfolio;
