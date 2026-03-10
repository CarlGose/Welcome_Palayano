export default function Header({
  setMenuOpen,
  headerOpacity,
  logoDataUrl,
  bannerBgUrl,
}) {
  return (
    <div
      className="header-wrapper"
      id="mainHeader"
      style={{
        backgroundImage: `linear-gradient(135deg, rgba(10,54,22,0.85) 0%, rgba(5,35,12,0.95) 100%)${bannerBgUrl ? `, url('${bannerBgUrl}')` : ""}`,
      }}
    >
      <header id="headerContent" style={{ opacity: headerOpacity }}>
        <button className="menu-btn" onClick={() => setMenuOpen(true)}>
          <svg
            viewBox="0 0 24 24"
            width="30"
            height="30"
            stroke="white"
            strokeWidth="2.5"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="3" y1="12" x2="21" y2="12"></line>
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <line x1="3" y1="18" x2="21" y2="18"></line>
          </svg>
        </button>
        <img src={logoDataUrl} className="logo-img" alt="Logo" />
        <div className="header-title-group">
          <div className="rep-phil">Republic of the Philippines</div>
          <h1>PALAYAN CITY</h1>
          <div className="sub-title">
            City Government of Palayan City &bull; Nueva Ecija
          </div>
        </div>
        <div className="mabuhay-btn-container">
          <div className="mabuhay-btn">MABUHAY!</div>
        </div>
      </header>
    </div>
  );
}
