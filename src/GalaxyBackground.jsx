import React, { useMemo } from "react";

export default function GalaxyBackground() {
  const stars1 = useMemo(() => createStars(120), []);
  const stars2 = useMemo(() => createStars(80), []);
  const stars3 = useMemo(() => createStars(50), []);

  return (
    <div className="galaxy-container">
      <div className="nebula one"></div>
      <div className="nebula two"></div>
      <div className="nebula three"></div>

      <div className="star-layer layer-1">
        {stars1.map((star) => (
          <span
            key={star.id}
            className="star"
            style={{
              left: `${star.left}%`,
              top: `${star.top}%`,
              width: `${star.size}px`,
              height: `${star.size}px`,
              animationDelay: `${star.delay}s`,
            }}
          />
        ))}
      </div>

      <div className="star-layer layer-2">
        {stars2.map((star) => (
          <span
            key={star.id}
            className="star"
            style={{
              left: `${star.left}%`,
              top: `${star.top}%`,
              width: `${star.size}px`,
              height: `${star.size}px`,
              animationDelay: `${star.delay}s`,
              opacity: 0.7,
            }}
          />
        ))}
      </div>

      <div className="star-layer layer-3">
        {stars3.map((star) => (
          <span
            key={star.id}
            className="star"
            style={{
              left: `${star.left}%`,
              top: `${star.top}%`,
              width: `${star.size}px`,
              height: `${star.size}px`,
              animationDelay: `${star.delay}s`,
              opacity: 0.5,
            }}
          />
        ))}
      </div>

      <div className="center-glow"></div>
    </div>
  );
}

function createStars(count) {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    top: Math.random() * 200,
    size: Math.random() * 3 + 1,
    delay: Math.random() * 3,
  }));
}