const paginationContainer = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  marginTop: "25px"
};

const paginationList = {
  listStyle: "none",
  display: "flex",
  gap: "12px",
  padding: 0,
  margin: 0
};

const pageItem = (isActive, isDisabled) => ({
  padding: "10px 14px",
  borderRadius: "6px",
  cursor: isDisabled ? "not-allowed" : "pointer",
  backgroundColor: isActive ? "#ff4757" : "#2a2a2a",
  color: isActive ? "white" : "#bbb",
  border: "1px solid #444",
  transition: "background 0.3s ease, transform 0.2s ease",
  pointerEvents: isDisabled ? "none" : "auto",
  fontWeight: "bold"
});

const buttonStyle = {
  background: "none",
  border: "none",
  color: "inherit",
  fontSize: "1rem",
  fontWeight: "bold",
  cursor: "pointer",
  transition: "color 0.3s ease, transform 0.2s ease"
};

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const getPageNumbers = () => {
    const pages = [];
    const startPage = Math.max(2, currentPage - 1);
    const endPage = Math.min(totalPages - 1, currentPage + 5);

    if (currentPage > 4) {
      pages.push(1, "...");
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    if (endPage < totalPages - 1) {
      pages.push("...");
    }

    if (endPage < totalPages) {
      pages.push(totalPages);
    }

    return pages;
  };

  return (
    <nav aria-label="Page navigation" style={paginationContainer}>
      <ul style={paginationList}>
        <li style={pageItem(false, currentPage === 1)}>
          <button
            style={buttonStyle}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#ff4757")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "inherit")}
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            ‹
          </button>
        </li>
        {getPageNumbers().map((number, index) => (
          <li key={index} style={pageItem(currentPage === number, number === "...")}> 
            {number === "..." ? (
              <span>...</span>
            ) : (
              <button
                style={buttonStyle}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#ff4757")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "inherit")}
                onClick={() => onPageChange(number)}
              >
                {number}
              </button>
            )}
          </li>
        ))}
        <li style={pageItem(false, currentPage === totalPages)}>
          <button
            style={buttonStyle}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#ff4757")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "inherit")}
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            ›
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;