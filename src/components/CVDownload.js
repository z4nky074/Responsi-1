import React from 'react';

const CVDownload = () => {
  return (
    <div className="text-center">
      <h2>Download My CV</h2>
      {/* Link untuk mendownload CV */}
      <a href="/cv-ats.pdf" download className="btn btn-primary mt-2">
        Download CV
      </a>
    </div>
  );
};

export default CVDownload;
