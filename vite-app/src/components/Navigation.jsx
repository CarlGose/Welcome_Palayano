export default function Navigation({
  activeTab,
  handleTabChange,
  searchQuery,
  setSearchQuery,
}) {
  return (
    <div className="sticky-nav" id="stickyNav">
      <div className="tabs">
        <button
          className={`tab-btn ${activeTab === 0 ? "active tab-pop" : ""}`}
          onClick={() => handleTabChange(0)}
        >
          Offices
        </button>
        <button
          className={`tab-btn ${activeTab === 1 ? "active tab-pop" : ""}`}
          onClick={() => handleTabChange(1)}
        >
          Updates
        </button>
        <button
          className={`tab-btn ${activeTab === 2 ? "active tab-pop" : ""}`}
          onClick={() => handleTabChange(2)}
        >
          Explore
        </button>
      </div>
      {activeTab === 0 && (
        <div className="search-container">
          <input
            type="text"
            placeholder="Search departments..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      )}
    </div>
  );
}
