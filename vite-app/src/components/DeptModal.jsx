export default function DeptModal({
  selectedDept,
  setSelectedDept,
  logoDataUrl,
  setLightboxImg,
  getDeptImage,
  getDeptLogo,
}) {
  return (
    <div
      className={`modal-overlay ${selectedDept ? "active" : ""}`}
      onClick={() => setSelectedDept(null)}
    >
      <div
        className={`modal-content ${selectedDept ? "modal-animate-in" : ""}`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-hero">
          {(() => {
            const heroImg = selectedDept ? getDeptImage(selectedDept) : null;
            return heroImg ? (
              <img
                src={heroImg}
                alt={selectedDept?.name}
                className="modal-hero-img"
                onClick={() => setLightboxImg(heroImg)}
              />
            ) : (
              <div className="modal-hero-placeholder" />
            );
          })()}
          <div className="modal-hero-gradient" />
          <button
            className="modal-close-btn"
            onClick={() => setSelectedDept(null)}
          >
            &times;
          </button>
        </div>

        <div className="modal-logo-float">
          <img
            src={selectedDept ? getDeptLogo(selectedDept) : logoDataUrl}
            alt="Logo"
            className="modal-logo-img"
          />
        </div>

        <div className="modal-body">
          <div className="modal-title-area">
            <h2 className="modal-dept-name">{selectedDept?.name}</h2>
            <span className="modal-dept-acronym">{selectedDept?.acronym}</span>
          </div>

          <div className="modal-info-grid">
            <div className="modal-info-card">
              <div className="modal-info-icon">
                <svg
                  viewBox="0 0 24 24"
                  width="18"
                  height="18"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
              </div>
              <div>
                <span className="modal-info-label">Department Head</span>
                <span className="modal-info-value">{selectedDept?.head}</span>
              </div>
            </div>

            <div className="modal-info-card">
              <div className="modal-info-icon">
                <svg
                  viewBox="0 0 24 24"
                  width="18"
                  height="18"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
              </div>
              <div>
                <span className="modal-info-label">Location</span>
                <span className="modal-info-value">{selectedDept?.loc}</span>
              </div>
            </div>

            <div className="modal-info-card">
              <div className="modal-info-icon">
                <svg
                  viewBox="0 0 24 24"
                  width="18"
                  height="18"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 16 14" />
                </svg>
              </div>
              <div>
                <span className="modal-info-label">Office Hours</span>
                <span className="modal-info-value">{selectedDept?.time}</span>
              </div>
            </div>
          </div>

          {selectedDept?.services && selectedDept.services.length > 0 && (
            <div className="modal-services">
              <h3 className="modal-services-title">
                <svg
                  viewBox="0 0 24 24"
                  width="16"
                  height="16"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="9 11 12 14 22 4" />
                  <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
                </svg>
                Services Offered
              </h3>
              <div className="modal-services-list">
                {selectedDept.services.map((s, i) => (
                  <div key={i} className="modal-service-chip">
                    {s}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
