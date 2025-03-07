import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchGamesByTagOrGenre } from "../services/api";
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
  justifyContent: "center",
  marginBottom: "25px"
};

const titleStyle = {
  fontSize: "2.2rem",
  marginBottom: "20px",
  color: "#ff4757",
  fontWeight: "bold"
};

const GamesByTagOrGenrePage = () => {
  const [games, setGames] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const { type, id } = useParams();

  useEffect(() => {
    const loadGames = async () => {
      const result = await fetchGamesByTagOrGenre(type, id, currentPage);
      setGames(result.results);
      setTotalPages(Math.ceil(result.count / 20));
    };
    loadGames();
  }, [type, id, currentPage]);

  return (
    <div style={containerStyle}>
      <h1 style={titleStyle}>Games by {type === "tag" ? "Tag" : "Genre"}</h1>
      <div style={gridStyle}>
        {games.map((game) => (
          <GameCard key={game.id} game={game} />
        ))}
      </div>
      <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
    </div>
  );
};

export default GamesByTagOrGenrePage;
