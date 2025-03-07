import { useState, useEffect } from "react";
import { fetchGames, searchGames } from "../services/api";
import GameCard from "../components/GameCard";
import Pagination from "../components/Pagination";

const containerStyle = {
  maxWidth: "1200px",
  margin: "auto",
  padding: "25px",
  textAlign: "center"
};

const gridStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
  gap: "20px",
  justifyContent: "center"
};

const searchContainerStyle = {
  display: "flex",
  justifyContent: "center",
  gap: "10px",
  marginBottom: "25px"
};

const inputStyle = {
  padding: "12px",
  width: "320px",
  borderRadius: "8px",
  border: "1px solid #555",
  backgroundColor: "#222",
  color: "white",
  fontSize: "1rem"
};

const buttonStyle = {
  padding: "12px 18px",
  borderRadius: "8px",
  border: "none",
  backgroundColor: "#ff4757",
  color: "white",
  cursor: "pointer",
  fontSize: "1rem",
  transition: "background 0.3s ease"
};

const GamesPage = () => {
  const [games, setGames] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    const loadGames = async () => {
      const result = await fetchGames(currentPage);
      setGames(result.results);
      setTotalPages(Math.ceil(result.count / 20));
    };
    loadGames();
  }, [currentPage]);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (searchTerm) {
      const result = await searchGames(searchTerm, 1);
      setGames(result.results);
      setTotalPages(Math.ceil(result.count / 20));
      setCurrentPage(1);
    }
  };

  return (
    <div style={containerStyle}>
      <h1 style={{ color: "#ff4757" }}>Explore Games</h1>
      <form onSubmit={handleSearch} style={searchContainerStyle}>
        <input
          type="text"
          style={inputStyle}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search for games..."
        />
        <button type="submit" style={buttonStyle} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "#e84148"} onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "#ff4757"}>Search</button>
      </form>
      <div style={gridStyle}>
        {games.map((game) => (
          <GameCard key={game.id} game={game} />
        ))}
      </div>
      <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
    </div>
  );
};

export default GamesPage;