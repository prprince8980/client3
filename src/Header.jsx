function Header() {
  return (
    <div style={styles.container}>
      <h1 style={styles.title}>MINECRAFT WORLD</h1>
      <p style={styles.subtitle}>Enter the Block Universe ⛏️</p>
    </div>
  );
}

const styles = {
  container: {
    textAlign: "center",
    padding: "40px",
    background: "linear-gradient(180deg, #87CEEB, #4CAF50)",
  },

  title: {
    fontFamily: "'Press Start 2P', cursive",
    fontSize: "32px",
    color: "#3b2f1e",
    textShadow: `
      2px 2px 0 #000,
      4px 4px 0 #2e7d32,
      6px 6px 0 #1b5e20
    `,
  },

  subtitle: {
    marginTop: "20px",
    fontSize: "14px",
    color: "#fff",
    textShadow: "2px 2px 5px black",
  },
};

export default Header;