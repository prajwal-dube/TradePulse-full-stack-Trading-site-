import React from "react";

function Team() {
  return (
    <div className="container border-top ">
      <br></br>
      <div className="row ">
        <h1 className="fs-3 text-center" style={{ color: "#3e3f42ff" }}>
          About Me
        </h1>
      </div>

      <div className="row p-5 mt-5 fs-6" style={{ lineHeight: "1.8" }}>
        <div className="col-6 pt-2 text-center" style={{ color: "#333334ff" }}>
          <img
            src="media/images/prajwal.jpg"
            alt="Student"
            style={{ borderRadius: "100%" }}
          />
          <p className="mt-4 text-center"> 3rd Year, B.Tech – CSE (AIML) <br></br>
             Manipal Institute of Technology, Manipal</p>
        </div>

        <div className="col-6" style={{ color: "#333334ff", textDecoration: "none" }}>
          <p>
            <strong>Prajwal Manoj Dube</strong>
            <br />
            B.Tech, Manipal Institute of Technology (CSE – AIML)
          </p>

          <p>
            Prajwal is a passionate technologist who loves exploring how things work and creating digital experiences that make an impact. He is currently building this website to demonstrate his full-stack web development and design skills.
          </p>

          <p>
            In his spare time, he enjoys playing badminton and table tennis, running marathons, and practicing martial arts. He also finds joy in dancing and singing — creative outlets that keep his energy and imagination alive.
          </p>

          <p>
            Connect on
             &nbsp;
             &nbsp;
            <i class="fa fa-github fs-5" aria-hidden="true"></i>
            <a href="https://github.com/prajwal-dube" style={{ textDecoration: "none" }} >
            &nbsp; GitHub
            </a>{" "}
             &nbsp;
             &nbsp;
            <i class="fa fa-linkedin" aria-hidden="true"></i>
            <a href="www.linkedin.com/in/prajwal-dube-23997524b" target="_blank" rel="noreferrer" style={{ textDecoration: "none" }}>
            &nbsp;  LinkedIn
            </a>{" "}
             &nbsp;
             &nbsp;
            <i class="fa fa-instagram" aria-hidden="true"></i>
            <a href="https://www.instagram.com/prajwal_dube02" target="_blank" rel="noreferrer" style={{ textDecoration: "none" }}>
            &nbsp;  Instagram
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Team;
