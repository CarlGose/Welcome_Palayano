import { useState, useRef, useEffect } from 'react';
import Papa from 'papaparse';
import './index.css';

const defaultLogoDataUrl = "https://upload.wikimedia.org/wikipedia/commons/thumb/1/10/Official_Seal_of_Palayan_City.svg/1024px-Official_Seal_of_Palayan_City.svg.png";
const defaultBannerBgUrl = "";

const initialDepartmentsData = [
  { cat: "EXECUTIVE", name: "City Mayor's Office", acronym: "CMO", head: "Olga Rose Manuel - Berdon", loc: "Second Floor - Left", time: "8:00 AM - 5:00 PM", services: ["Issuance of Mayor's Clearance", "Solemnization of Marriage", "Financial Assistance"] },
  { cat: "EXECUTIVE", name: "Sangguniang Panlungsod", acronym: "SP", head: "Rufo S. Elegado", loc: "Second Floor - Right", time: "8:00 AM - 5:00 PM", services: ["Legislative Services", "Resolutions and Ordinances"] },
  { cat: "ECONOMIC DEVELOPMENT", name: "City Agriculturist's Office", acronym: "CAGO", head: "Esmenia S. Lulu", loc: "Ground Floor - Left", time: "8:00 AM - 5:00 PM", services: ["Seed Distribution", "Farming Consultations"] },
  { cat: "ECONOMIC DEVELOPMENT", name: "City Veterinarian's Office", acronym: "CVO", head: "Dr. Celso D. Mananggit", loc: "Ground Floor - Left", time: "8:00 AM - 5:00 PM", services: ["Anti-Rabies Vaccination", "Livestock Health Services"] },
  { cat: "ECONOMIC DEVELOPMENT", name: "Local Economic Development and Investment Promotions Office", acronym: "LEPIDO", head: "Fercilyn Grospe", loc: "Ground Floor - Left", time: "8:00 AM - 5:00 PM", services: ["Business Investment Inquiries"] },
  { cat: "ECONOMIC DEVELOPMENT", name: "City Labor & Employment Office", acronym: "CLEO", head: "Mar-Sem S. Mendillo", loc: "Ground Floor - Left", time: "8:00 AM - 5:00 PM", services: ["Job Fairs", "Employment Referrals"] },
  { cat: "ECONOMIC DEVELOPMENT", name: "City Tourism Division", acronym: "CTD", head: "Eunice Nicole Alcantara", loc: "Second Floor", time: "8:00 AM - 5:00 PM", services: ["Tourism Promotions", "Event Coordination"] },
  { cat: "FISCAL MANAGEMENT", name: "City Accountant's Office", acronym: "CACO", head: "Christina R. Yambot", loc: "Ground Floor - Right", time: "8:00 AM - 5:00 PM", services: ["Internal Audit", "Financial Reporting"] },
  { cat: "FISCAL MANAGEMENT", name: "City Assessor's Office", acronym: "CASSO", head: "Emmanuel A. Aduna", loc: "Ground Floor - Right", time: "8:00 AM - 5:00 PM", services: ["Real Property Assessment", "Tax Declarations"] },
  { cat: "FISCAL MANAGEMENT", name: "City Budget Office", acronym: "CBO", head: "Nicky S. Sagnip", loc: "Ground Floor - Right", time: "8:00 AM - 5:00 PM", services: ["Budget Allocation and Review"] },
  { cat: "FISCAL MANAGEMENT", name: "Business Permit & Licensing Division", acronym: "BPLD", head: "Maria Raquel Sagnit", loc: "Ground Floor - Right", time: "8:00 AM - 5:00 PM", services: ["New Business Permits", "Business Permit Renewals", "Retirement of Business"] },
  { cat: "FISCAL MANAGEMENT", name: "City Treasurer's Office", acronym: "CTO", head: "Mary Jane F. Villareal", loc: "Ground Floor - Right", time: "8:00 AM - 5:00 PM", services: ["Payment of Real Property Taxes", "Collection of Fees and Charges"] },
  { cat: "INFRASTRUCTURE & SAFETY", name: "Traffic Management & Public Safety Division", acronym: "TMPSD", head: "Thea Bantegui", loc: "Second Floor - Left", time: "8:00 AM - 5:00 PM", services: ["Traffic Apprehensions", "Road Safety Assistance"] },
  { cat: "INFRASTRUCTURE & SAFETY", name: "City Engineering Office", acronym: "CEO", head: "Engr. Alexander Dela Merced", loc: "Ground Floor - Left", time: "8:00 AM - 5:00 PM", services: ["Building Permits", "Occupancy Permits", "Infrastructure Projects"] },
  { cat: "PUBLIC ADMINISTRATION", name: "City Planning & Development Office", acronym: "CPDO", head: "Arch. Margarita A. Angeles", loc: "Second Floor", time: "8:00 AM - 5:00 PM", services: ["Zoning Clearances", "Comprehensive Land Use Plan"] },
  { cat: "PUBLIC ADMINISTRATION", name: "City General Services Office", acronym: "CGSO", head: "Reynaldo C. Alberto", loc: "Second Floor", time: "8:00 AM - 5:00 PM", services: ["Procurement", "Asset Management"] },
  { cat: "PUBLIC ADMINISTRATION", name: "City Legal Office", acronym: "CLO", head: "Atty. John Kenner M. Mendoza", loc: "Second Floor", time: "8:00 AM - 5:00 PM", services: ["Legal Counseling", "Contract Review"] },
  { cat: "PUBLIC ADMINISTRATION", name: "City Human Resource & Management Office", acronym: "CHRMO", head: "Dudley S. Romero", loc: "Second Floor", time: "8:00 AM - 5:00 PM", services: ["Job Vacancies", "Employee Records"] },
  { cat: "PUBLIC ADMINISTRATION", name: "Library Division", acronym: "LIB", head: "Alicia L. Estanislao", loc: "Second Floor", time: "8:00 AM - 5:00 PM", services: ["Public Reading Area", "Research Assistance"] },
  { cat: "PUBLIC ADMINISTRATION", name: "Information & Technology Division", acronym: "ICT", head: "Feliciano C. Ramos Jr.", loc: "Ground Floor - Left", time: "8:00 AM - 5:00 PM", services: ["System Maintenance", "Tech Support"] },
  { cat: "SOCIAL SERVICES", name: "City Disaster Risk Reduction Office", acronym: "CDRRMO", head: "Ferdinand B. Hilado", loc: "Outside Main Bldg", time: "24/7", services: ["Emergency Rescue", "Disaster Preparedness Training"] },
  { cat: "SOCIAL SERVICES", name: "City Health Office", acronym: "CHO", head: "Dra. Shiela B. Flores", loc: "Outside Main Bldg", time: "8:00 AM - 5:00 PM", services: ["Medical Consultations", "Immunizations", "Issuance of Medical/Health Certificates"] },
  { cat: "SOCIAL SERVICES", name: "City Social Welfare & Development Office", acronym: "CSWD", head: "Maria Teresa Ramos", loc: "Outside Main Bldg", time: "8:00 AM - 5:00 PM", services: ["Senior Citizen ID Application", "Solo Parent ID", "Assistance in Crisis Situations (AICS)"] },
  { cat: "SOCIAL SERVICES", name: "City Civil Registrar Office", acronym: "CCR", head: "Loribelle C. De Guzman", loc: "Ground Floor - Right", time: "8:00 AM - 5:00 PM", services: ["Birth Registration", "Marriage License", "Death Registration"] }
];

function getDirectDriveUrl(url) {
  if (url && typeof url === 'string' && url.includes('drive.google.com')) {
    let id = "";
    if (url.includes('id=')) { id = url.split('id=')[1].split('&')[0]; }
    else { let parts = url.split('/d/'); if (parts.length > 1) { id = parts[1].split('/')[0]; } }
    // Using lh3.googleusercontent.com to return image file without auth walls natively
    return id ? "https://lh3.googleusercontent.com/d/" + id : url;
  }
  return url;
}

export default function App() {
  const [activeTab, setActiveTab] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDept, setSelectedDept] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [headerOpacity, setHeaderOpacity] = useState(1);
  const [lightboxImg, setLightboxImg] = useState(null);
  const [openAccordions, setOpenAccordions] = useState({});

  const [departments, setDepartments] = useState(initialDepartmentsData);
  const [logoDataUrl, setLogoDataUrl] = useState(defaultLogoDataUrl);
  const [bannerBgUrl, setBannerBgUrl] = useState(defaultBannerBgUrl);

  const scrollContainerRef = useRef(null);

  useEffect(() => {
    // Fetch CSV data from Google Sheets
    const sheetId = "1BaKZiL3g7E5bqwjgfp7Gr5e-2OFQKYYoJ6qtIhfpu7M";
    const csvUrl = `https://docs.google.com/spreadsheets/d/${sheetId}/export?format=csv`;

    Papa.parse(csvUrl, {
      download: true,
      header: false,
      complete: (results) => {
        const data = results.data;
        let pLogo = defaultLogoDataUrl;
        let pBanner = defaultBannerBgUrl;
        const logoMap = {};
        const pictureMap = {};
        const locationMap = {};

        for (let i = 0; i < data.length; i++) {
          const row = data[i];
          const identifier = row[0] ? row[0].toString().trim() : "";
          if (identifier === "1.1") {
            if (row[1]) pLogo = getDirectDriveUrl(row[1].toString());
            if (row[2]) pBanner = getDirectDriveUrl(row[2].toString());
          } else if (identifier) {
            if (row[1]) logoMap[identifier] = getDirectDriveUrl(row[1].toString());
            if (row[2]) pictureMap[identifier] = getDirectDriveUrl(row[2].toString());
            if (row[3]) {
              locationMap[identifier] = row[3].toString().trim();
            }
          }
        }

        setLogoDataUrl(pLogo);
        setBannerBgUrl(pBanner);

        // Update departments array based on fetched mapping
        const updatedDepts = initialDepartmentsData.map(dept => {
          return {
            ...dept,
            logo: logoMap[dept.acronym] || null,
            pic: pictureMap[dept.acronym] || null,
            loc: locationMap[dept.acronym] || dept.loc, // Override location if present
          };
        });

        setDepartments(updatedDepts);
      },
      error: (err) => {
        console.error("Failed to parse Google Sheet CSV:", err);
      }
    });
  }, []);

  const handleScroll = (e) => {
    let scrollTop = e.target.scrollTop;
    let p = Math.max(0, Math.min(1, scrollTop / 155));
    setHeaderOpacity(Math.max(0, 1 - (p * 1.5)));
  };

  const handleTabChange = (idx) => {
    setActiveTab(idx);
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo(0, 0);
    }
  };

  const toggleAccordion = (id) => {
    setOpenAccordions(prev => {
      const next = { ...prev };
      Object.keys(next).forEach(k => next[k] = false);
      next[id] = !prev[id];
      return next;
    });
  };

  const groupedDepts = {};
  departments.forEach(d => {
    if (!groupedDepts[d.cat]) groupedDepts[d.cat] = [];
    groupedDepts[d.cat].push(d);
  });

  const renderDepartments = () => {
    let result = [];
    const val = searchQuery.toLowerCase().trim();

    Object.keys(groupedDepts).forEach((cat) => {
      const filteredDepts = groupedDepts[cat].filter(d =>
        d.name.toLowerCase().includes(val) || d.acronym.toLowerCase().includes(val)
      );

      if (filteredDepts.length > 0) {
        result.push(
          <div className="category-section" key={cat}>
            <span className="category-label">{cat}</span>
            {filteredDepts.map((d, index) => (
              <div
                key={index}
                className="dept-card"
                onClick={() => setSelectedDept(d)}
              >
                <img src={d.logo || logoDataUrl} className="dept-logo" alt={d.name} />
                <div className="dept-text">
                  <p style={{ fontWeight: 800, fontSize: '0.95rem', margin: 0, color: 'var(--text-dark)' }}>{d.name}</p>
                  <p style={{ fontWeight: 800, color: 'var(--yellow-green-dark)', fontSize: '0.75rem', margin: 0 }}>{d.acronym}</p>
                </div>
              </div>
            ))}
          </div>
        );
      }
    });

    return result;
  };

  return (
    <div className="app-shell">
      <div className="scroll-viewport" id="scrollContainer" ref={scrollContainerRef} onScroll={handleScroll}>
        <div className="header-wrapper" id="mainHeader" style={{
          backgroundImage: `linear-gradient(135deg, rgba(10,54,22,0.85) 0%, rgba(5,35,12,0.95) 100%)${bannerBgUrl ? `, url('${bannerBgUrl}')` : ''}`
        }}>
          <header id="headerContent" style={{ opacity: headerOpacity }}>
            <button className="menu-btn" onClick={() => setMenuOpen(true)}>
              <svg viewBox="0 0 24 24" width="30" height="30" stroke="white" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
                <line x1="3" y1="12" x2="21" y2="12"></line>
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <line x1="3" y1="18" x2="21" y2="18"></line>
              </svg>
            </button>
            <img src={logoDataUrl} className="logo-img" alt="Logo" />
            <div className="header-title-group">
              <div className="rep-phil">Republic of the Philippines</div>
              <h1>PALAYAN CITY</h1>
              <div className="sub-title">City Government of Palayan City &bull; Nueva Ecija</div>
            </div>
            <div className="mabuhay-btn-container">
              <div className="mabuhay-btn">MABUHAY!</div>
            </div>
          </header>
        </div>

        <div className="sticky-nav" id="stickyNav">
          <div className="tabs">
            <button className={`tab-btn ${activeTab === 0 ? 'active tab-pop' : ''}`} onClick={() => handleTabChange(0)}>Offices</button>
            <button className={`tab-btn ${activeTab === 1 ? 'active tab-pop' : ''}`} onClick={() => handleTabChange(1)}>Updates</button>
            <button className={`tab-btn ${activeTab === 2 ? 'active tab-pop' : ''}`} onClick={() => handleTabChange(2)}>Explore</button>
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

        <div className="track-wrapper">
          <div className="track" style={{ transform: `translateX(-${activeTab * 33.333}%)` }}>

            {/* Page 0: Offices */}
            <div className="page" style={{ height: activeTab === 0 ? 'auto' : '100vh', overflow: activeTab === 0 ? 'visible' : 'hidden' }}>
              {renderDepartments()}
              <div style={{ height: 100, width: '100%' }}></div>
            </div>

            {/* Page 1: Updates */}
            <div className="page" style={{ height: activeTab === 1 ? 'auto' : '100vh', overflow: activeTab === 1 ? 'visible' : 'hidden' }}>
              <div className="page-heading">Latest Announcements</div>
              <div className="preview-card">
                <span className="preview-date">Recently Published</span>
                <h3 className="preview-title">Citywide Clean-up Drive Initiated</h3>
                <p className="preview-desc">Join our localized initiatives as we promote a cleaner and greener Palayan City.</p>
              </div>
              <div className="preview-card">
                <span className="preview-date">Announcements</span>
                <h3 className="preview-title">New Business Permits Schedule</h3>
                <p className="preview-desc">The BPLD office has adjusted the schedule for the current quarter.</p>
              </div>
              <a href="https://cityofpalayan.gov.ph/news-and-updates/" target="_blank" rel="noreferrer" className="portal-btn">Access Full Updates Portal</a>
              <div style={{ height: 100, width: '100%' }}></div>
            </div>

            {/* Page 2: Explore */}
            <div className="page" style={{ height: activeTab === 2 ? 'auto' : '100vh', overflow: activeTab === 2 ? 'visible' : 'hidden' }}>
              <div className="page-heading">Discover Palayan</div>
              <div className="preview-card">
                <span className="preview-date">Nature</span>
                <h3 className="preview-title">Aulo Dam</h3>
                <p className="preview-desc">Breathtaking views, perfect for serenity and nature photography.</p>
              </div>
              <div className="preview-card">
                <span className="preview-date">Recreation</span>
                <h3 className="preview-title">People's Park</h3>
                <p className="preview-desc">Family-friendly open spaces in the heart of the city.</p>
              </div>
              <a href="https://cityofpalayan.gov.ph/ctd" target="_blank" rel="noreferrer" className="portal-btn">Visit City Tourism Portal</a>
              <div style={{ height: 100, width: '100%' }}></div>
            </div>

          </div>
        </div>
      </div>

      <footer>GOVPH © 2026 CITY OF PALAYAN</footer>

      {/* Dept Modal */}
      <div
        className="modal-overlay"
        style={{ opacity: selectedDept ? 1 : 0, pointerEvents: selectedDept ? 'auto' : 'none' }}
        onClick={() => setSelectedDept(null)}
      >
        <div className="modal-content" onClick={e => e.stopPropagation()}>
          <div className="modal-header">
            <button className="modal-close-btn" onClick={() => setSelectedDept(null)}>&times;</button>
          </div>
          <div className="modal-body" style={{ padding: 32 }}>
            <div style={{ textAlign: 'center' }}>
              <img src={selectedDept?.logo || logoDataUrl} alt="Logo" style={{ width: 75, height: 75, borderRadius: 20, objectFit: 'contain', background: '#f8fafc', padding: 8, border: '1px solid #e2e8f0' }} />
              <h2 style={{ fontSize: '1.15rem', fontWeight: 800, margin: '16px 0 4px', color: 'var(--text-dark)' }}>{selectedDept?.name}</h2>
              <p style={{ color: 'var(--yellow-green-dark)', fontWeight: 800, margin: '0 0 24px', fontSize: '0.9rem' }}>{selectedDept?.acronym}</p>
            </div>

            {selectedDept?.pic && (
              <img
                src={selectedDept.pic}
                alt="Dept"
                style={{ width: '100%', height: 160, objectFit: 'cover', borderRadius: 16, marginBottom: 20, border: '1px solid #e2e8f0', cursor: 'pointer' }}
                onClick={() => setLightboxImg(selectedDept.pic)}
              />
            )}

            <div style={{ background: '#f8fafc', borderRadius: 16, padding: 18, fontSize: '0.9rem', border: '1px solid #e2e8f0' }}>
              <p style={{ margin: '0 0 10px' }}><strong>Head:</strong> <br /><span style={{ color: '#475569' }}>{selectedDept?.head}</span></p>
              <p style={{ margin: '0 0 10px' }}><strong>Location:</strong> <br /><span style={{ color: '#475569' }}>{selectedDept?.loc}</span></p>
              <p style={{ margin: 0 }}><strong>Hours:</strong> <br /><span style={{ color: '#475569' }}>{selectedDept?.time}</span></p>

              {selectedDept?.services && selectedDept.services.length > 0 && (
                <div style={{ marginTop: 15, paddingTop: 15, borderTop: '1px dashed #cbd5e1' }}>
                  <strong style={{ color: 'var(--text-dark)' }}>Services Offered:</strong>
                  <ul style={{ margin: '8px 0 0 0', paddingLeft: 20, color: '#475569', fontSize: '0.85rem', lineHeight: 1.4 }}>
                    {selectedDept.services.map((s, i) => <li key={i}>{s}</li>)}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Side Menu */}
      <div className={`side-menu-overlay ${menuOpen ? 'open' : ''}`} onClick={() => setMenuOpen(false)}></div>
      <div className={`side-menu ${menuOpen ? 'open' : ''}`}>
        <div className="side-menu-header">
          <h2 className="menu-title">About Palayan</h2>
          <button className="close-menu-btn" onClick={() => setMenuOpen(false)}>×</button>
        </div>

        <button className={`accordion-btn ${openAccordions['about'] ? 'active' : ''}`} onClick={() => toggleAccordion('about')}>
          History & Growth <span className="icon">▼</span>
        </button>
        <div className="accordion-content" style={{ maxHeight: openAccordions['about'] ? '500px' : '0' }}>
          <div className="accordion-inner">
            <p>Established in 1965 by RA 4475, Palayan City transitioned from a government stock farm to become the capital of Nueva Ecija.</p>
            <p>Today, it is evolving into a modern hub with the Palayan City Business Hub leading the way in jobs and investment.</p>
          </div>
        </div>

        <button className={`accordion-btn ${openAccordions['vision'] ? 'active' : ''}`} onClick={() => toggleAccordion('vision')}>
          Vision <span className="icon">▼</span>
        </button>
        <div className="accordion-content" style={{ maxHeight: openAccordions['vision'] ? '500px' : '0' }}>
          <div className="accordion-inner">
            <p>The vibrant Capital City and employment center of Nueva Ecija; thriving through an agro-industrial and Information Technology economy; enabled by disaster-resilient and organized urban growth.</p>
            <p style={{ fontWeight: 800, color: 'var(--yellow-green-dark)' }}>Tungo sa Bagong Palayan, Now Na!</p>
          </div>
        </div>

        <button className={`accordion-btn ${openAccordions['mission'] ? 'active' : ''}`} onClick={() => toggleAccordion('mission')}>
          Mission <span className="icon">▼</span>
        </button>
        <div className="accordion-content" style={{ maxHeight: openAccordions['mission'] ? '500px' : '0' }}>
          <div className="accordion-inner">
            <p>As the steward of the vision, the City Government shall transform Palayan into a modern, sustainable and resilient city that espouses the balanced management of the built and unbuilt environment to ensure equitable growth.</p>
          </div>
        </div>

        <button className={`accordion-btn ${openAccordions['mandate'] ? 'active' : ''}`} onClick={() => toggleAccordion('mandate')}>
          Mandate <span className="icon">▼</span>
        </button>
        <div className="accordion-content" style={{ maxHeight: openAccordions['mandate'] ? '500px' : '0' }}>
          <div className="accordion-inner">
            <p>To plan and implement programs, projects, and activities to alleviate poverty, to promote and ensure the general welfare and interest of its people.</p>
          </div>
        </div>

        <button className={`accordion-btn ${openAccordions['pledge'] ? 'active' : ''}`} onClick={() => toggleAccordion('pledge')}>
          Service Pledge <span className="icon">▼</span>
        </button>
        <div className="accordion-content" style={{ maxHeight: openAccordions['pledge'] ? '500px' : '0' }}>
          <div className="accordion-inner">
            <p>We pledge to serve our people with utmost diligence, dignity, integrity, respect, and with the highest degree of professionalism.</p>
            <p>We commit to provide accessible, accurate, and reasonable information at all times.</p>
          </div>
        </div>

        <div style={{ height: 60, width: '100%', flexShrink: 0 }}></div>
      </div>

      {/* Lightbox */}
      <div className={`lightbox-overlay ${lightboxImg ? 'show' : ''}`} onClick={() => setLightboxImg(null)}>
        <span className="lightbox-close">&times;</span>
        {lightboxImg && <img src={lightboxImg} className="lightbox-content" alt="Enlarged" />}
      </div>
    </div>
  );
}
