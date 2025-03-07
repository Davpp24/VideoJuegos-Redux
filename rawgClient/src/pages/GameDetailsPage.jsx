import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { fetchGameDetails } from "../services/api";

const containerStyle = {
  maxWidth: "1000px",
  margin: "auto",
  padding: "25px",
  textAlign: "center"
};

const imageStyle = {
  maxHeight: "450px",
  width: "100%",
  objectFit: "cover",
  borderRadius: "12px",
  boxShadow: "0px 6px 12px rgba(0, 0, 0, 0.3)",
  marginBottom: "20px"
};

const buttonStyle = (isFavorite) => ({
  padding: "12px 22px",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer",
  backgroundColor: isFavorite ? "#ff4757" : "transparent",
  color: isFavorite ? "white" : "#ff4757",
  border: "2px solid #ff4757",
  transition: "0.3s ease",
  fontSize: "1rem",
  fontWeight: "bold",
  marginBottom: "20px"
});

const sectionStyle = {
  textAlign: "left",
  padding: "18px",
  borderRadius: "10px",
  boxShadow: "0px 3px 6px rgba(0, 0, 0, 0.2)",
  marginBottom: "20px",
  backgroundColor: "#2a2a2a",
  color: "white"
};

const badgeStyle = {
  display: "inline-block",
  padding: "6px 12px",
  borderRadius: "12px",
  backgroundColor: "#ff4757",
  color: "white",
  textDecoration: "none",
  marginRight: "6px",
  fontSize: "0.9rem",
  fontWeight: "bold"
};

const GameDetailsPage = () => {
  const [game, setGame] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    const loadGameDetails = async () => {
      const gameDetails = await fetchGameDetails(id);
      setGame(gameDetails);
    };
    loadGameDetails();
  }, [id]);

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  if (!game) {
    return <div style={containerStyle}>Loading...</div>;
  }

  return (
    <div style={containerStyle}>
      <h1 style={{ color: "#ff4757" }}>{game.name}</h1>
      <img src={game.background_image || "/placeholder.svg"} alt={game.name} style={imageStyle} />
      <button onClick={toggleFavorite} style={buttonStyle(isFavorite)}>
        {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
      </button>
      <div style={sectionStyle}>
        <h2>About</h2>
        <p>{game.description_raw || "No description available."}</p>
      </div>
      <div style={sectionStyle}>
        <h2>Details</h2>
        <ul>
          <li><strong>Release Date:</strong> {game.released}</li>
          <li><strong>Rating:</strong> {game.rating}/5</li>
          <li><strong>Platforms:</strong> {game.platforms.map(p => p.platform.name).join(", ")}</li>
          <li>
            <strong>Genres:</strong> {game.genres.map(genre => (
              <Link key={genre.id} to={`/games/genre/${genre.id}`} style={badgeStyle}>{genre.name}</Link>
            ))}
          </li>
          <li>
            <strong>Tags:</strong> {game.tags.map(tag => (
              <Link key={tag.id} to={`/games/tag/${tag.id}`} style={badgeStyle}>{tag.name}</Link>
            ))}
          </li>
          <li>
            <strong>Publishers:</strong> {game.publishers.map(publisher => (
              <Link key={publisher.id} to={`/publisher/${publisher.id}`} style={badgeStyle}>{publisher.name}</Link>
            ))}
          </li>
        </ul>
      </div>
    </div>
  );
};

export default GameDetailsPage;