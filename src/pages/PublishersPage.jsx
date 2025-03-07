import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { fetchPublishers, searchPublishers } from "../services/api";
import Pagination from "../components/Pagination";

const containerStyle = {
  maxWidth: "1000px",
  margin: "auto",
  padding: "25px",
  textAlign: "center"
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

const listStyle = {
  listStyle: "none",
  padding: 0,
  margin: 0,
  textAlign: "left"
};

const listItemStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "15px 20px",
  border: "1px solid #444",
  borderRadius: "10px",
  marginBottom: "12px",
  backgroundColor: "#2a2a2a",
  transition: "background 0.3s, transform 0.2s",
  textDecoration: "none",
  color: "white",
  fontWeight: "bold",
  fontSize: "1.1rem"
};

const badgeStyle = {
  backgroundColor: "#ff4757",
  color: "white",
  padding: "6px 12px",
  borderRadius: "15px",
  fontSize: "0.9rem",
  fontWeight: "bold"
};

const PublishersPage = () => {
  const [publishers, setPublishers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    const loadPublishers = async () => {
      const result = await fetchPublishers(currentPage);
      setPublishers(result.results);
      setTotalPages(Math.ceil(result.count / 20));
    };
    loadPublishers();
  }, [currentPage]);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (searchTerm) {
      const result = await searchPublishers(searchTerm, 1);
      setPublishers(result.results);
      setTotalPages(Math.ceil(result.count / 20));
      setCurrentPage(1);
    }
  };

  return (
    <div style={containerStyle}>
      <h1 style={{ color: "#ff4757" }}>Explore Publishers</h1>
      <form onSubmit={handleSearch} style={searchContainerStyle}>
        <input
          type="text"
          style={inputStyle}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search for publishers..."
        />
        <button type="submit" style={buttonStyle} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "#e84148"} onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "#ff4757"}>Search</button>
      </form>
      <ul style={listStyle}>
        {publishers.map((publisher) => (
          <Link key={publisher.id} to={`/publisher/${publisher.id}`} style={listItemStyle} onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.05)"} onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"}>
            {publisher.name}
            <span style={badgeStyle}>{publisher.games_count} games</span>
          </Link>
        ))}
      </ul>
      <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
    </div>
  );
};

export default PublishersPage;