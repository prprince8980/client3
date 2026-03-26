import React, { useState } from "react";

function Card3D({ image, title, description, buttonText }) {
  const [transform, setTransform] = useState(
    "perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)"
  );

  const handleMouseMove = (e) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateY = (x - centerX) / 15;
    const rotateX = (centerY - y) / 15;

    setTransform(
      `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`
    );
  };

  const handleMouseLeave = () => {
    setTransform(
      "perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)"
    );
  };

  return (
    <div style={styles.wrapper}>
      <div
        style={{ ...styles.card, transform }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <img src={image} alt={title} style={styles.image} />

        <div style={styles.content}>
          <h2 style={styles.title}>{title}</h2>
          <p style={styles.description}>{description}</p>
          <button style={styles.button}>{buttonText}</button>
        </div>
      </div>
    </div>
  );
}

export default Card3D;

const styles = {
  wrapper: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "30px",
  },
  card: {
    width: "300px",
    borderRadius: "20px",
    overflow: "hidden",
    background: "linear-gradient(135deg, #1e293b, #334155)",
    color: "white",
    boxShadow: "0 20px 40px rgba(0,0,0,0.3)",
    transition: "transform 0.2s ease",
    transformStyle: "preserve-3d",
    cursor: "pointer",
  },
  image: {
    width: "100%",
    height: "200px",
    objectFit: "cover",
  },
  content: {
    padding: "20px",
  },
  title: {
    margin: "0 0 10px 0",
    fontSize: "24px",
  },
  description: {
    fontSize: "14px",
    color: "#cbd5e1",
    marginBottom: "15px",
    lineHeight: "1.5",
  },
  button: {
    padding: "10px 16px",
    border: "none",
    borderRadius: "10px",
    background: "#38bdf8",
    color: "white",
    fontWeight: "bold",
    cursor: "pointer",
  },
};