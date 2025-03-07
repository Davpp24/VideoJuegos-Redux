import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { fetchTags, searchTags } from "../services/api";
import Pagination from "../components/Pagination";

const containerStyle = {
  maxWidth: "1200px",
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

const gridStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
  gap: "20px",
  justifyContent: "center",
  marginBottom: "25px"
};

const cardStyle = {
  padding: "20px",
  border: "1px solid #444",
  borderRadius: "12px",
  backgroundColor: "#2a2a2a",
  transition: "background 0.3s, transform 0.2s",
  textDecoration: "none",
  color: "white",
  boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.3)",
  textAlign: "center",
  fontWeight: "bold"
};

const TagsPage = () => {
  const [tags, setTags] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    const loadTags = async () => {
      const result = await fetchTags(currentPage);
      setTags(result.results);
      setTotalPages(Math.ceil(result.count / 20));
    };
    loadTags();
  }, [currentPage]);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (searchTerm) {
      const result = await searchTags(searchTerm, 1);
      setTags(result.results);
      setTotalPages(Math.ceil(result.count / 20));
      setCurrentPage(1);
    }
  };

  return (
    <div style={containerStyle}>
      <h1 style={{ color: "#ff4757" }}>Explore Tags</h1>
      <form onSubmit={handleSearch} style={searchContainerStyle}>
        <input
          type="text"
          style={inputStyle}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search for tags..."
        />
        <button type="submit" style={buttonStyle} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "#e84148"} onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "#ff4757"}>Search</button>
      </form>
      <div style={gridStyle}>
        {tags.map((tag) => (
          <Link key={tag.id} to={`/games/tag/${tag.id}`} style={cardStyle} onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.05)"} onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"}>
            <h5>{tag.name}</h5>
            <p>Games count: {tag.games_count}</p>
          </Link>
        ))}
      </div>
      <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
    </div>
  );
};

export default TagsPage;
