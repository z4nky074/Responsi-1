import React from 'react';

const CVDownload = () => {
  return (
    <div className="text-center">
      <h2>Download My CV</h2>
      {/* Link untuk membuka atau mendownload CV */}
      <a href="/cv-ats.pdf" target="_blank" rel="noopener noreferrer" className="btn btn-primary">
        Lihat CV
      </a>
      <a href="/cv-ats.pdf" download className="btn btn-secondary mt-2">
        Download CV
      </a>
    </div>
  );
};

export default CVDownload;
