const Footer = () => {
  return (
    <footer style={{
      backgroundColor: "#1a1a1a",
      color: "#fff",
      padding: "20px 0",
      marginTop: "auto",
      textAlign: "center",
      boxShadow: "0 -4px 10px rgba(0, 0, 0, 0.3)",
      fontFamily: "'Poppins', sans-serif"
    }}>
      <div style={{
        maxWidth: "1200px",
        margin: "0 auto",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "10px"
      }}>
        <p style={{ margin: 0, fontSize: "14px" }}>
          &copy; {new Date().getFullYear()} GameExplorer. All rights reserved.
        </p>
        <div style={{ display: "flex", gap: "15px" }}>
          <a href="#" style={{ color: "#bbb", textDecoration: "none", fontSize: "14px" }}>Privacy Policy</a>
          <a href="#" style={{ color: "#bbb", textDecoration: "none", fontSize: "14px" }}>Terms of Service</a>
          <a href="#" style={{ color: "#bbb", textDecoration: "none", fontSize: "14px" }}>Contact</a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
