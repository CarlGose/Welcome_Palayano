export default function UpdatesTab({ activeTab }) {
  return (
    <div
      className="page"
      style={{
        height: activeTab === 1 ? "auto" : "100vh",
        overflow: activeTab === 1 ? "visible" : "hidden",
      }}
    >
      <div className="page-heading">Latest Announcements</div>
      <div className="preview-card">
        <span className="preview-date">Recently Published</span>
        <h3 className="preview-title">Citywide Clean-up Drive Initiated</h3>
        <p className="preview-desc">
          Join our localized initiatives as we promote a cleaner and greener
          Palayan City.
        </p>
      </div>
      <div className="preview-card">
        <span className="preview-date">Announcements</span>
        <h3 className="preview-title">New Business Permits Schedule</h3>
        <p className="preview-desc">
          The BPLD office has adjusted the schedule for the current quarter.
        </p>
      </div>
      <a
        href="https://cityofpalayan.gov.ph/news-and-updates/"
        target="_blank"
        rel="noreferrer"
        className="portal-btn"
      >
        Access Full Updates Portal
      </a>
      <div style={{ height: 100, width: "100%" }}></div>
    </div>
  );
}
