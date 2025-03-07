import { Link } from "react-router-dom";

const GameCard = ({ game }) => {
  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      backgroundColor: "#2a2a2a",
      color: "#fff",
      borderRadius: "15px",
      overflow: "hidden",
      boxShadow: "0 6px 12px rgba(0, 0, 0, 0.4)",
      transition: "transform 0.3s ease, box-shadow 0.3s ease",
      cursor: "pointer",
      maxWidth: "320px"
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.transform = "scale(1.07)";
      e.currentTarget.style.boxShadow = "0 10px 20px rgba(0, 0, 0, 0.5)";
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.transform = "scale(1)";
      e.currentTarget.style.boxShadow = "0 6px 12px rgba(0, 0, 0, 0.4)";
    }}
    >
      <img
        src={game.background_image || "/placeholder.svg"}
        alt={game.name}
        style={{
          height: "220px",
          objectFit: "cover",
          borderTopLeftRadius: "15px",
          borderTopRightRadius: "15px"
        }}
      />
      <div style={{ padding: "20px", textAlign: "center" }}>
        <h5 style={{ margin: "0 0 12px", fontSize: "20px", fontWeight: "bold" }}>{game.name}</h5>
        <p style={{ fontSize: "15px", opacity: "0.85" }}>Rating: {game.rating}/5</p>
        <Link to={`/game/${game.id}`} style={{
          display: "inline-block",
          marginTop: "12px",
          padding: "10px 18px",
          backgroundColor: "#ff4757",
          color: "#fff",
          borderRadius: "8px",
          textDecoration: "none",
          fontWeight: "bold",
          transition: "background 0.3s ease-in-out, transform 0.2s ease-in-out"
        }}
        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "#e84148"}
        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "#ff4757"}
        >
          View Details
        </Link>
      </div>
    </div>
  );
}

export default GameCard;