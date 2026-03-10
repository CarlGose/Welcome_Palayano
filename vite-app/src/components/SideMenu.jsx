export default function SideMenu({
  menuOpen,
  setMenuOpen,
  openAccordions,
  toggleAccordion,
}) {
  return (
    <>
      <div
        className={`side-menu-overlay ${menuOpen ? "open" : ""}`}
        onClick={() => setMenuOpen(false)}
      ></div>
      <div className={`side-menu ${menuOpen ? "open" : ""}`}>
        <div className="side-menu-header">
          <h2 className="menu-title">About Palayan</h2>
          <button className="close-menu-btn" onClick={() => setMenuOpen(false)}>
            ×
          </button>
        </div>

        <button
          className={`accordion-btn ${openAccordions["about"] ? "active" : ""}`}
          onClick={() => toggleAccordion("about")}
        >
          History & Growth <span className="icon">▼</span>
        </button>
        <div
          className="accordion-content"
          style={{ maxHeight: openAccordions["about"] ? "500px" : "0" }}
        >
          <div className="accordion-inner">
            <p>
              Established in 1965 by RA 4475, Palayan City transitioned from a
              government stock farm to become the capital of Nueva Ecija.
            </p>
            <p>
              Today, it is evolving into a modern hub with the Palayan City
              Business Hub leading the way in jobs and investment.
            </p>
          </div>
        </div>

        <button
          className={`accordion-btn ${openAccordions["vision"] ? "active" : ""}`}
          onClick={() => toggleAccordion("vision")}
        >
          Vision <span className="icon">▼</span>
        </button>
        <div
          className="accordion-content"
          style={{ maxHeight: openAccordions["vision"] ? "500px" : "0" }}
        >
          <div className="accordion-inner">
            <p>
              The vibrant Capital City and employment center of Nueva Ecija;
              thriving through an agro-industrial and Information Technology
              economy; enabled by disaster-resilient and organized urban growth.
            </p>
            <p style={{ fontWeight: 800, color: "var(--yellow-green-dark)" }}>
              Tungo sa Bagong Palayan, Now Na!
            </p>
          </div>
        </div>

        <button
          className={`accordion-btn ${openAccordions["mission"] ? "active" : ""}`}
          onClick={() => toggleAccordion("mission")}
        >
          Mission <span className="icon">▼</span>
        </button>
        <div
          className="accordion-content"
          style={{ maxHeight: openAccordions["mission"] ? "500px" : "0" }}
        >
          <div className="accordion-inner">
            <p>
              As the steward of the vision, the City Government shall transform
              Palayan into a modern, sustainable and resilient city that
              espouses the balanced management of the built and unbuilt
              environment to ensure equitable growth.
            </p>
          </div>
        </div>

        <button
          className={`accordion-btn ${openAccordions["mandate"] ? "active" : ""}`}
          onClick={() => toggleAccordion("mandate")}
        >
          Mandate <span className="icon">▼</span>
        </button>
        <div
          className="accordion-content"
          style={{ maxHeight: openAccordions["mandate"] ? "500px" : "0" }}
        >
          <div className="accordion-inner">
            <p>
              To plan and implement programs, projects, and activities to
              alleviate poverty, to promote and ensure the general welfare and
              interest of its people.
            </p>
          </div>
        </div>

        <button
          className={`accordion-btn ${openAccordions["pledge"] ? "active" : ""}`}
          onClick={() => toggleAccordion("pledge")}
        >
          Service Pledge <span className="icon">▼</span>
        </button>
        <div
          className="accordion-content"
          style={{ maxHeight: openAccordions["pledge"] ? "500px" : "0" }}
        >
          <div className="accordion-inner">
            <p>
              We pledge to serve our people with utmost diligence, dignity,
              integrity, respect, and with the highest degree of
              professionalism.
            </p>
            <p>
              We commit to provide accessible, accurate, and reasonable
              information at all times.
            </p>
          </div>
        </div>

        <div style={{ height: 60, width: "100%", flexShrink: 0 }}></div>
      </div>
    </>
  );
}
