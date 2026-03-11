export default function ExploreTab({ activeTab }) {
  return (
    <div
      className="page"
      style={{
        height: activeTab === 2 ? "auto" : "100vh",
        overflow: activeTab === 2 ? "visible" : "hidden",
      }}
    >
      <div className="page-heading">Discover Palayan</div>
      <div className="preview-card">
        <span className="preview-date">Nature</span>
        <h3 className="preview-title">Aulo Dam</h3>
        <p className="preview-desc">
          Breathtaking views, perfect for serenity and nature photography.
        </p>
      </div>
      <div className="preview-card">
        <span className="preview-date">Recreation</span>
        <h3 className="preview-title">People's Park</h3>
        <p className="preview-desc">
          Family-friendly open spaces in the heart of the city.
        </p>
      </div>
      <a
        href="https://cityofpalayan.gov.ph/ctd"
        target="_blank"
        rel="noreferrer"
        className="portal-btn"
      >
        Visit City Tourism Portal
      </a>
      <div style={{ height: 100, width: "100%" }}></div>
    </div>
  );
}
