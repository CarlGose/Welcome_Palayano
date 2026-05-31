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
        <span className="preview-date">Nature & Adventure</span>
        <h3 className="preview-title">Aulo Dam</h3>
        <p className="preview-desc">
          A significant reservoir spanning over 86 hectares, perfect for nature lovers and serenity.
        </p>
      </div>
      <div className="preview-card">
        <span className="preview-date">Nature & Adventure</span>
        <h3 className="preview-title">Kukwit Falls</h3>
        <p className="preview-desc">
          Located at the foot of the Sierra Madre, a great destination to enjoy nature and take a refreshing dip.
        </p>
      </div>
      <div className="preview-card">
        <span className="preview-date">Nature & Adventure</span>
        <h3 className="preview-title">Mount Mapait</h3>
        <p className="preview-desc">
          A challenging trekking destination in the Sierra Madre range, known for its steep trails and rewarding scenic views.
        </p>
      </div>
      <div className="preview-card">
        <span className="preview-date">Nature & Adventure</span>
        <h3 className="preview-title">Mt. Taklang Damulag</h3>
        <p className="preview-desc">
          Situated within the Fort Magsaysay military reservation, offering a unique combination of natural landscapes and military history.
        </p>
      </div>
      <div className="preview-card">
        <span className="preview-date">Nature & Adventure</span>
        <h3 className="preview-title">Langka Viewdeck</h3>
        <p className="preview-desc">
          A spot in Barangay Langka offering breathtaking panoramic views of the city's rice fields, surrounding mountains, and the sky.
        </p>
      </div>
      <div className="preview-card">
        <span className="preview-date">Parks & Leisure</span>
        <h3 className="preview-title">Palayan City Park</h3>
        <p className="preview-desc">
          A central hub for relaxation featuring lush greenery, walking paths, and spaces for family picnics and events.
        </p>
      </div>
      <div className="preview-card">
        <span className="preview-date">Historical & Military Sites</span>
        <h3 className="preview-title">Fort Magsaysay</h3>
        <p className="preview-desc">
          A prominent landmark featuring the Aquino-Diokno Memorial and Pahingahan Lake with kayaking opportunities.
        </p>
      </div>
      <a
        href="https://cityofpalayan.gov.ph/citytourismdivision/?fbclid=IwY2xjawSGIcBleHRuA2FlbQIxMABicmlkETE0Y082bk13MmNTQXRDeWxFc3J0YwZhcHBfaWQQMjIyMDM5MTc4ODIwMDg5MgABHid2BCcXQOSSx9UZjF8v1kjBZ2kXFKM4jwPR7gwTMG1tiQx7ickaQMa3AHJg_aem_kjcDzLAIrsWn29za0SJ1IQ"
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
