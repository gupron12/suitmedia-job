export default function Pagination({ currentPage, totalPages, onPageChange }) {
  const getPaginationButtons = () => {
    const buttons = [];
    const maxButtons = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxButtons / 2));
    let endPage = Math.min(totalPages, startPage + maxButtons - 1);

    if (endPage - startPage + 1 < maxButtons) {
      startPage = Math.max(1, endPage - maxButtons + 1);
    }

    if (startPage > 1) {
      buttons.push(
        <a
          key="first"
          href="#"
          onClick={() => onPageChange(1)}
          className="page-number"
        >
          1
        </a>
      );
      if (startPage > 2) buttons.push(<span key="dots1" className="dots">...</span>);
    }

    for (let i = startPage; i <= endPage; i++) {
      buttons.push(
        <a
          key={i}
          href="#"
          onClick={() => onPageChange(i)}
          className={`page-number ${i === currentPage ? 'active' : ''}`}
        >
          {i}
        </a>
      );
    }

    if (endPage < totalPages) {
      if (endPage < totalPages - 1) buttons.push(<span key="dots2" className="dots">...</span>);
      buttons.push(
        <a
          key="last"
          href="#"
          onClick={() => onPageChange(totalPages)}
          className="page-number"
        >
          {totalPages}
        </a>
      );
    }

    return buttons;
  };

  return (
    <div className="pagination">
      <a href="#" onClick={() => onPageChange(1)} className="arrow">
        &lt;&lt;
      </a>
      <a href="#" onClick={() => onPageChange(currentPage - 1)} className="arrow">
        &lt;
      </a>
      {getPaginationButtons()}
      <a href="#" onClick={() => onPageChange(currentPage + 1)} className="arrow">
        &gt;
      </a>
      <a href="#" onClick={() => onPageChange(totalPages)} className="arrow">
        &gt;&gt;
      </a>
    </div>
  );
}