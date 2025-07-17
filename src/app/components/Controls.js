'use client';

import { useState } from 'react';

export default function Controls({
  startItem,
  endItem,
  totalItems,
  itemsPerPage,
  sortOrder,
  onItemsPerPageChange,
  onSortChange,
}) {
  const [showPerPageActive, setShowPerPageActive] = useState(false);
  const [sortByActive, setSortByActive] = useState(false);

  return (
    <div className="controls">
      <div className="showing-info">
        Showing <span className="highlight">{startItem} - {endItem}</span> of{' '}
        <span className="highlight">{totalItems}</span>
      </div>
      <div className="filter-options">
        <div className={`dropdown ${showPerPageActive ? 'active' : ''}`}>
          <label htmlFor="show-per-page">Show per page:</label>
          <select
            id="show-per-page"
            value={itemsPerPage}
            onChange={onItemsPerPageChange}
            onFocus={() => setShowPerPageActive(true)}
            onBlur={() => setShowPerPageActive(false)}
          >
            {[10, 20, 50].map((size) => (
              <option key={size} value={size}>{size}</option>
            ))}
          </select>
          <i className="fa-solid fa-caret-down"></i>
        </div>
        <div className={`dropdown ${sortByActive ? 'active' : ''}`}>
          <label htmlFor="sort-by">Sort by:</label>
          <select
            id="sort-by"
            value={sortOrder}
            onChange={onSortChange}
            onFocus={() => setSortByActive(true)}
            onBlur={() => setSortByActive(false)}
          >
            <option value="-published_at">Newest</option>
            <option value="published_at">Oldest</option>
          </select>
          <i className="fa-solid fa-caret-down"></i>
        </div>
      </div>
    </div>
  );
}