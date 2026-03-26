import React, { useState } from "react";

export default function ThreeDCard() {
  const [transform, setTransform] = useState(
    "perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)"
  );

  const handleMouseMove = (e) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateY = (x - centerX) / 12;
    const rotateX = -(y - centerY) / 12;

    setTransform(
      `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05,1.05,1.05)`
    );
  };

  const handleMouseLeave = () => {
    setTransform(
      "perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)"
    );
  };

  return (
    <>
      </style>

      <div className="wrapper">
        <div
          className="card"
          style={{ transform }}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          <div className="content">
            <div>
              <div className="badge">3D Interactive Card</div>
              <h1 className="title">Future UI</h1>
              <p className="desc">
                This is a smooth 3D hover card for your React web app. Move your
                mouse on the card and it will tilt in real time.
              </p>

              <div className="box3d">🚀</div>
            </div>

            <div className="footer">
              <span className="small-text">React + JSX</span>
              <button className="btn">Explore</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}