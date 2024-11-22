import React, { useEffect, useRef } from "react";
import ProjectList from "./ProjectList"; // Impor komponen ProjectList
import ContactUs from "./ContactUs"; // Impor komponen ContactUs

// Data untuk modularisasi
const skills = [
  { skill: "HTML", level: "90%", icon: "fab fa-html5", color: "#E44D26" },
  { skill: "CSS", level: "85%", icon: "fab fa-css3-alt", color: "#1572B6" },
  { skill: "JavaScript", level: "80%", icon: "fab fa-js", color: "#F7DF1E" },
  { skill: "React", level: "75%", icon: "fab fa-react", color: "#61DAFB" },
];

const experiences = [
  {
    title: "Web Developer at Company XYZ",
    date: "Jan 2023 - Present",
    description: "Developed and maintained websites using React, CSS, and JavaScript.",
  },
  {
    title: "Frontend Developer Intern",
    date: "June 2022 - Dec 2022",
    description: "Collaborated with the front-end team to create responsive web pages using HTML, CSS, and JavaScript.",
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

  const getSkillBarColor = (level) => {
    const percentage = parseInt(level);
    if (percentage <= 60) {
      return "#E44D26"; // Merah
    } else if (percentage <= 80) {
      return "#F7DF1E"; // Kuning
    } else {
      return "#4CAF50"; // Hijau
    }
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

  <section className="home d-flex align-items-center justify-content-between mb-5">
  <div className="left-content">
    <h1>Hello World, I'm</h1>
    <h2 className="mb-3">Muhammad Rafa Prasetya</h2>
    <h3 ref={typingRef} className="typing-effect mb-3"></h3>
    <p>Welcome to my portfolio website</p>
  </div>
  <div className="right-content">
    <img
      src="/Foto.jpg"  // Path file gambar yang ada di folder public
      alt="Profile"
      className="img-fluid rounded-circle border border-dark"
      style={{ width: "250px", height: "250px" }}
    />
  </div>
</section>

  if (section === "about") {
    return (
      <section className="about-me mb-5">
        <div className="card shadow-sm">
          <div className="card-body">
            <h2 className="text-center mb-4">About Me</h2>
            <div className="row align-items-center">
              <div className="col-md-5 text-center">
                <img
                  src="/Foto.jpg"
                  alt="My Profile"
                  className="img-fluid rounded-circle shadow-sm"
                />
              </div>
              <div className="col-md-7">
                <h3>
                  <span className="typing-text">
                    Hello, I'm <span className="name-typing">Muhammad Rafa Prasetya</span>
                  </span>
                </h3>
                <p className="mt-3">
                  I am a passionate web developer specializing in front-end and back-end technologies.
                </p>
                <p>
                  Besides coding, I thrive on solving complex problems, collaborating with teams, and exploring innovative technologies to make a meaningful impact.
                </p>
                <p>
                  I'm always learning new skills to stay at the cutting edge of web development, and I enjoy building projects that can benefit people and businesses.
                </p>
              </div>
            </div>
          </div>
        </div>
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

  if (section === "experience") {
    return (
      <section className="experience mb-5">
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
