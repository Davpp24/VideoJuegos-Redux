import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { fetchPopularGames } from "../services/api";
import GameCarousel from "../components/GameCarousel";

const containerStyle = {
  maxWidth: "1200px",
  margin: "auto",
  padding: "50px 20px",
  textAlign: "center"
};

const headingStyle = {
  fontSize: "2.8rem",
  marginBottom: "25px",
  color: "#ff4757",
  fontWeight: "bold"
};

const sectionStyle = {
  marginTop: "50px",
  padding: "30px",
  borderRadius: "12px",
  backgroundColor: "#2a2a2a",
  boxShadow: "0px 6px 12px rgba(0, 0, 0, 0.3)",
  color: "white"
};

const paragraphStyle = {
  fontSize: "1.3rem",
  marginBottom: "25px",
  opacity: "0.9"
};

const buttonStyle = {
  display: "inline-block",
  padding: "15px 30px",
  fontSize: "1.2rem",
  borderRadius: "8px",
  backgroundColor: "#ff4757",
  color: "white",
  textDecoration: "none",
  fontWeight: "bold",
  transition: "background 0.3s ease, transform 0.2s ease"
};

const HomePage = () => {
  const [popularGames, setPopularGames] = useState([]);

  useEffect(() => {
    const loadPopularGames = async () => {
      const games = await fetchPopularGames(5);
      setPopularGames(games);
    };
    loadPopularGames();
  }, []);

  return (
    <div style={containerStyle}>
      <h1 style={headingStyle}>Welcome to GameExplorer</h1>
      <GameCarousel games={popularGames} />
      <section style={sectionStyle}>
        <h2>Explore the World of Games</h2>
        <p style={paragraphStyle}>
          Discover new and exciting games, search for your favorites, and explore detailed information about each title.
        </p>
        <Link to="/games" style={buttonStyle} onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.05)"} onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"}>
          Start Exploring
        </Link>
      </section>
    </div>
  );
};

export default HomePage;