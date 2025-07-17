'use client';

import { useState } from 'react';

export default function IdeaCard({ image, date, title }) {
  const [imgSrc, setImgSrc] = useState(image);

  // Handle image loading errors by falling back to /bg1.png
  const handleImageError = () => {
    setImgSrc('/bg1.png');
  };

  return (
    <div className="idea-card">
      <img
        src={imgSrc}
        alt="Idea Thumbnail"
        loading="lazy"
        onError={handleImageError}
        className="w-full h-[200px] object-cover"
      />
      <div className="card-content">
        <span className="date">{date}</span>
        <h3>{title}</h3>
      </div>
    </div>
  );
}