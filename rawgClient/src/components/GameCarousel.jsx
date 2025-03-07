import { Link } from "react-router-dom";
import { useState } from "react";

const GameCarousel = ({ games }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (games.length === 0) {
    return <div style={{ textAlign: "center", fontSize: "18px", color: "#fff" }}>Loading...</div>;
  }

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? games.length - 1 : prevIndex - 1));
  };

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === games.length - 1 ? 0 : prevIndex + 1));
  };

  return (
    <div style={{
      position: "relative",
      width: "100%",
      maxWidth: "900px",
      margin: "auto",
      overflow: "hidden",
      borderRadius: "15px",
      boxShadow: "0 6px 14px rgba(0,0,0,0.4)"
    }}>
      <div style={{
        display: "flex",
        transition: "transform 0.6s ease-in-out",
        transform: `translateX(-${currentIndex * 100}%)`
      }}>
        {games.map((game) => (
          <div key={game.id} style={{
            minWidth: "100%",
            position: "relative"
          }}>
            <img
              src={game.background_image || "/placeholder.svg"}
              alt={game.name}
              style={{
                width: "100%",
                height: "450px",
                objectFit: "cover",
                borderRadius: "15px"
              }}
            />
            <div style={{
              position: "absolute",
              bottom: "25px",
              left: "50%",
              transform: "translateX(-50%)",
              textAlign: "center",
              background: "rgba(0, 0, 0, 0.7)",
              padding: "12px 25px",
              borderRadius: "10px",
              color: "#fff"
            }}>
              <h3 style={{ margin: 0, fontSize: "22px" }}>{game.name}</h3>
              <Link to={`/game/${game.id}`} style={{
                display: "inline-block",
                marginTop: "12px",
                padding: "10px 18px",
                backgroundColor: "#ff4757",
                color: "#fff",
                borderRadius: "8px",
                textDecoration: "none",
                fontWeight: "bold",
                transition: "background 0.3s ease-in-out"
              }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "#e84148"}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "#ff4757"}
              >
                View Details
              </Link>
            </div>
          </div>
        ))}
      </div>
      
      <button onClick={prevSlide} style={{
        position: "absolute",
        top: "50%",
        left: "15px",
        transform: "translateY(-50%)",
        background: "rgba(0, 0, 0, 0.6)",
        color: "#fff",
        border: "none",
        padding: "12px",
        borderRadius: "50%",
        cursor: "pointer",
        fontSize: "22px",
        transition: "background 0.3s ease"
      }}
      onMouseEnter={(e) => e.currentTarget.style.background = "rgba(0, 0, 0, 0.8)"}
      onMouseLeave={(e) => e.currentTarget.style.background = "rgba(0, 0, 0, 0.6)"}
      >
        ‹
      </button>

      <button onClick={nextSlide} style={{
        position: "absolute",
        top: "50%",
        right: "15px",
        transform: "translateY(-50%)",
        background: "rgba(0, 0, 0, 0.6)",
        color: "#fff",
        border: "none",
        padding: "12px",
        borderRadius: "50%",
        cursor: "pointer",
        fontSize: "22px",
        transition: "background 0.3s ease"
      }}
      onMouseEnter={(e) => e.currentTarget.style.background = "rgba(0, 0, 0, 0.8)"}
      onMouseLeave={(e) => e.currentTarget.style.background = "rgba(0, 0, 0, 0.6)"}
      >
        ›
      </button>
    </div>
  );
};

export default GameCarousel;