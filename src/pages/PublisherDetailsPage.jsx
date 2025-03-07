import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchPublisherDetails, fetchPublisherGames } from "../services/api";
import GameCard from "../components/GameCard";
import Pagination from "../components/Pagination";

const containerStyle = {
  maxWidth: "1200px",
  margin: "auto",
  padding: "25px",
  textAlign: "center",
  color: "white"
};

const imageStyle = {
  maxHeight: "320px",
  width: "100%",
  objectFit: "cover",
  borderRadius: "12px",
  boxShadow: "0px 5px 12px rgba(0, 0, 0, 0.4)",
  marginBottom: "25px"
};

const descriptionStyle = {
  fontSize: "1.2rem",
  marginBottom: "25px",
  lineHeight: "1.6",
  backgroundColor: "rgba(255, 255, 255, 0.2)",
  padding: "15px",
  borderRadius: "10px",
  color: "#000000"
};

const gridStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
  gap: "20px",
  justifyContent: "center",
  marginBottom: "25px"
};

const PublisherDetailsPage = () => {
  const [publisher, setPublisher] = useState(null);
  const [games, setGames] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const { id } = useParams();

  useEffect(() => {
    const loadPublisherDetails = async () => {
      const details = await fetchPublisherDetails(id);
      setPublisher(details);
    };
    loadPublisherDetails();
  }, [id]);

  useEffect(() => {
    const loadPublisherGames = async () => {
      const result = await fetchPublisherGames(id, currentPage);
      setGames(result.results);
      setTotalPages(Math.ceil(result.count / 20));
    };
    loadPublisherGames();
  }, [id, currentPage]);

  if (!publisher) {
    return <div style={containerStyle}>Loading...</div>;
  }

  return (
    <div style={containerStyle}>
      <h1 style={{ color: "#ff4757" }}>{publisher.name}</h1>
      {publisher.image_background && (
        <img src={publisher.image_background || "/placeholder.svg"} alt={publisher.name} style={imageStyle} />
      )}
      <p style={descriptionStyle}>{publisher.description || "No description available."}</p>
      <h2 style={{ marginBottom: "20px", color: "#ff4757" }}>Games by {publisher.name}</h2>
      <div style={gridStyle}>
        {games.map((game) => (
          <GameCard key={game.id} game={game} />
        ))}
      </div>
      <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
    </div>
  );
};

export default PublisherDetailsPage;
