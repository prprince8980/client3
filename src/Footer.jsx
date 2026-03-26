function Footer() {
  return (
    <footer style={styles.footer}>
      <h2 style={styles.text}>Made by Prince 👑</h2>
      <p style={styles.sub}>Survive. Build. Explore. ⛏️</p>
    </footer>
  );
}

const styles = {
  footer: {
    marginTop: "50px",
    padding: "30px",
    textAlign: "center",
    background: "linear-gradient(to top, #3e2723, #5d4037)", // dirt block style
    borderTop: "6px solid #2e7d32", // grass layer
  },

  text: {
    fontFamily: "'Press Start 2P', cursive",
    fontSize: "16px",
    color: "#d7ccc8",
    textShadow: `
      2px 2px 0 #000,
      4px 4px 0 #1b5e20,
      6px 6px 0 #000
    `,
  },

  sub: {
    marginTop: "15px",
    fontSize: "12px",
    color: "#a5d6a7",
    textShadow: "2px 2px 4px black",
  },
};

export default Footer;