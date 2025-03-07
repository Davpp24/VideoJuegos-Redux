import { Link } from "react-router-dom";

const headerStyle = {
  backgroundColor: "#181818",
  color: "white",
  padding: "18px 0",
  boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.4)",
  position: "sticky",
  top: 0,
  width: "100%",
  zIndex: 1000
};

const navContainerStyle = {
  width: "90%",
  maxWidth: "1300px",
  margin: "0 auto",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center"
};

const titleStyle = {
  textDecoration: "none",
  color: "white",
  fontSize: "1.8rem",
  fontWeight: "bold",
  letterSpacing: "1px",
  transition: "color 0.3s ease"
};

const navListStyle = {
  listStyle: "none",
  display: "flex",
  gap: "25px",
  margin: 0,
  padding: 0
};

const navItemStyle = {
  display: "inline-block"
};

const navLinkStyle = {
  textDecoration: "none",
  color: "#bbb",
  fontSize: "1.1rem",
  fontWeight: "500",
  transition: "color 0.3s ease"
};

const navLinkHover = {
  color: "#f39c12"
};

const Header = () => {
  return (
    <header style={headerStyle}>
      <nav style={navContainerStyle}>
        <Link to="/" style={titleStyle} onMouseEnter={(e) => e.currentTarget.style.color = "#f39c12"} onMouseLeave={(e) => e.currentTarget.style.color = "white"}>GameExplorer</Link>
        <ul style={navListStyle}>
          {[
            { to: "/", label: "Home" },
            { to: "/games", label: "Games" },
            { to: "/publishers", label: "Publishers" },
            { to: "/tags", label: "Tags" }
          ].map(({ to, label }) => (
            <li key={to} style={navItemStyle}>
              <Link to={to} style={navLinkStyle} onMouseEnter={(e) => e.currentTarget.style.color = "#f39c12"} onMouseLeave={(e) => e.currentTarget.style.color = "#bbb"}>{label}</Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
