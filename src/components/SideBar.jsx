import React from 'react';

function Sidebar({ onFilterChange }) {
  return (
    <aside className="sidebar">
      <h3>Filter Options</h3>
      <div className="filter-group">
        <label htmlFor="reviews">Minimum Reviews:</label>
        <input
          type="number"
          id="reviews"
          name="reviews"
          min="0"
          defaultValue="0"
          onChange={(e) => onFilterChange('reviews', e.target.value)}
        />
      </div>
      <div className="filter-group">
        <label htmlFor="budget">Maximum Budget:</label>
        <input
          type="number"
          id="budget"
          name="budget"
          min="0"
          defaultValue="1000"
          onChange={(e) => onFilterChange('budget', e.target.value)}
        />
      </div>
    </aside>
  );
}

export default Sidebar;
