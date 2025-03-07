import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { fetchPopularGames } from "../services/api";
import GameCarousel from "../components/GameCarousel";

const styles = {
  homeContainer: {
    maxWidth: "1200px",
    margin: "auto",
    padding: "50px 20px",
    textAlign: "center",
    backgroundColor: "#1e1e1e",
    color: "white"
  },
  heroSection: {
    padding: "80px 20px",
    background: "linear-gradient(135deg, #ff4757, #ff6b81)",
    borderRadius: "12px",
    boxShadow: "0px 6px 12px rgba(0, 0, 0, 0.3)",
    marginBottom: "40px"
  },
  heading: {
    fontSize: "2.8rem",
    marginBottom: "25px",
    color: "#ff4757",
    fontWeight: "bold"
  },
  paragraph: {
    fontSize: "1.3rem",
    marginBottom: "25px",
    opacity: "0.9"
  },
  ctaButton: {
    display: "inline-block",
    padding: "15px 30px",
    fontSize: "1.2rem",
    borderRadius: "8px",
    backgroundColor: "#ff4757",
    color: "white",
    textDecoration: "none",
    fontWeight: "bold",
    transition: "background 0.3s ease, transform 0.2s ease"
  },
  ctaButtonHover: {
    transform: "scale(1.05)",
    backgroundColor: "#ff6b81"
  },
  section: {
    marginTop: "50px",
    padding: "30px",
    borderRadius: "12px",
    backgroundColor: "#2a2a2a",
    boxShadow: "0px 6px 12px rgba(0, 0, 0, 0.3)",
    color: "white"
  }
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
    <div style={styles.homeContainer}>
      <h1 style={styles.heading}>Welcome to GameExplorer</h1>
      <GameCarousel games={popularGames} />
      <section style={styles.section}>
        <h2>Explore the World of Games</h2>
        <p style={styles.paragraph}>
          Discover new and exciting games, search for your favorites, and explore detailed information about each title.
        </p>
        <Link 
          to="/games" 
          style={styles.ctaButton} 
          onMouseEnter={(e) => e.currentTarget.style.transform = styles.ctaButtonHover.transform} 
          onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"}>
          Start Exploring
        </Link>
      </section>
    </div>
  );
};

export default HomePage;