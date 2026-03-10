import { useState, useRef, useEffect } from 'react';
import Papa from 'papaparse';
import './index.css';

const defaultLogoDataUrl = "https://upload.wikimedia.org/wikipedia/commons/thumb/1/10/Official_Seal_of_Palayan_City.svg/1024px-Official_Seal_of_Palayan_City.svg.png";
const defaultBannerBgUrl = "";

import imgCMO from './assets/Web App/CMO.jpg';
import imgSP from './assets/Web App/SP.jpg';
import imgCAGO from './assets/Web App/CAgO.jpg';
import imgCVO from './assets/Web App/CVO.jpg';
import imgLEPIDO from './assets/Web App/LEPIDO.jpg';
import imgCLEO from './assets/Web App/CLEO.jpg';
import imgCTD from './assets/Web App/DCDH.jpg';
import imgCACO from './assets/Web App/CAccO.jpg';
import imgCASSO from './assets/Web App/CSSAO.jpg';
import imgCBO from './assets/Web App/CBO.jpg';
import imgCCR from './assets/Web App/CCR, BPLC, CAssO, CTO.jpg';
import imgTMPSD from './assets/Web App/TMPSD.jpg';
import imgCEO from './assets/Web App/CEO.jpg';
import imgCPDO from './assets/Web App/CPDO.jpg';
import imgCGSO from './assets/Web App/CGSO.jpg';
import imgCLO from './assets/Web App/CLO.jpg';
import imgCHRMO from './assets/Web App/CHRMO.jpg';
import imgLIB from './assets/Web App/LIB.jpeg';
import imgICT from './assets/Web App/ICT.jpg';
import imgCDRRMO from './assets/Web App/CDRRMO.jpeg';
import imgCHO from './assets/Web App/CHO.jpeg';
import imgCSWD from './assets/Web App/CSWDO.jpeg';

import logoCASSO from './assets/LOGOS/assessor.jpg';
import logoCTO from './assets/LOGOS/Treasure.jpg';
import logoCDRRMO from './assets/LOGOS/cdrrmo.jpg';
import logoCCR from './assets/LOGOS/civil_registrar.jpg';
import logoCSWD from './assets/LOGOS/cswd.jpg';
import logoCEO from './assets/LOGOS/engineering.jpg';
import logoICT from './assets/LOGOS/ict.png';
import logoCPDO from './assets/LOGOS/planning.jpg';
import logoCTD from './assets/LOGOS/tourism.jpg';
import logoTMPSD from './assets/LOGOS/traffic.jpg';
import logoCVO from './assets/LOGOS/veterinary.jpg';
import logoLEPIDO from './assets/LOGOS/Ledipo.png';
import logoSP from './assets/LOGOS/Sangguniang-panglungsod.png';
import logoCAGO from './assets/LOGOS/agriculture.png';
import logoCHO from './assets/LOGOS/city-health.png';
import logoCLEO from './assets/LOGOS/city-labor.png';
import logoLIB from './assets/LOGOS/library.jpg';

// Local image mapping via import
const localImageMap = {
  CMO: imgCMO,
  SP: imgSP,
  CAGO: imgCAGO,
  CVO: imgCVO,
  LEPIDO: imgLEPIDO,
  CLEO: imgCLEO,
  CTD: imgCTD,
  CACO: imgCACO,
  CASSO: imgCASSO,
  CBO: imgCBO,
  BPLD: imgCCR, // Shared image mapping
  CTO: imgCCR,  // Shared image mapping
  TMPSD: imgTMPSD,
  CEO: imgCEO,
  CPDO: imgCPDO,
  CGSO: imgCGSO,
  CLO: imgCLO,
  CHRMO: imgCHRMO,
  LIB: imgLIB,
  ICT: imgICT,
  CDRRMO: imgCDRRMO,
  CHO: imgCHO,
  CSWD: imgCSWD,
  CCR: imgCCR,
};

// Local logo mapping via import
const localLogoMap = {
  CASSO: logoCASSO,
  CTO: logoCTO,
  CDRRMO: logoCDRRMO,
  CCR: logoCCR,
  CSWD: logoCSWD,
  CEO: logoCEO,
  ICT: logoICT,
  CPDO: logoCPDO,
  CTD: logoCTD,
  TMPSD: logoTMPSD,
  CVO: logoCVO,
  LEPIDO: logoLEPIDO,
  SP: logoSP,
  CAGO: logoCAGO,
  CHO: logoCHO,
  CLEO: logoCLEO,
  LIB: logoLIB,
};

const initialDepartmentsData = [
  { cat: "EXECUTIVE", name: "City Mayor's Office", acronym: "CMO", logo: null, pic: imgCMO, head: "Olga Rose Manuel - Berdon", loc: "Second Floor - Left", time: "8:00 AM - 5:00 PM", services: ["Issuance of Mayor's Clearance", "Solemnization of Marriage", "Financial Assistance"] },
  { cat: "EXECUTIVE", name: "Sangguniang Panlungsod", acronym: "SP", logo: logoSP, pic: imgSP, head: "Rufo S. Elegado", loc: "Second Floor - Right", time: "8:00 AM - 5:00 PM", services: ["Legislative Services", "Resolutions and Ordinances"] },
  { cat: "ECONOMIC DEVELOPMENT", name: "City Agriculturist's Office", acronym: "CAGO", logo: logoCAGO, pic: imgCAGO, head: "Esmenia S. Lulu", loc: "Ground Floor - Left", time: "8:00 AM - 5:00 PM", services: ["Seed Distribution", "Farming Consultations"] },
  { cat: "ECONOMIC DEVELOPMENT", name: "City Veterinarian's Office", acronym: "CVO", logo: logoCVO, pic: imgCVO, head: "Dr. Celso D. Mananggit", loc: "Ground Floor - Left", time: "8:00 AM - 5:00 PM", services: ["Anti-Rabies Vaccination", "Livestock Health Services"] },
  { cat: "ECONOMIC DEVELOPMENT", name: "Local Economic Development and Investment Promotions Office", acronym: "LEPIDO", logo: logoLEPIDO, pic: imgLEPIDO, head: "Fercilyn Grospe", loc: "Ground Floor - Left", time: "8:00 AM - 5:00 PM", services: ["Business Investment Inquiries"] },
  { cat: "ECONOMIC DEVELOPMENT", name: "City Labor & Employment Office", acronym: "CLEO", logo: logoCLEO, pic: imgCLEO, head: "Mar-Sem S. Mendillo", loc: "Ground Floor - Left", time: "8:00 AM - 5:00 PM", services: ["Job Fairs", "Employment Referrals"] },
  { cat: "ECONOMIC DEVELOPMENT", name: "City Tourism Division", acronym: "CTD", logo: logoCTD, pic: imgCTD, head: "Eunice Nicole Alcantara", loc: "Second Floor", time: "8:00 AM - 5:00 PM", services: ["Tourism Promotions", "Event Coordination"] },
  { cat: "FISCAL MANAGEMENT", name: "City Accountant's Office", acronym: "CACO", logo: null, pic: imgCACO, head: "Christina R. Yambot", loc: "Ground Floor - Right", time: "8:00 AM - 5:00 PM", services: ["Internal Audit", "Financial Reporting"] },
  { cat: "FISCAL MANAGEMENT", name: "City Assessor's Office", acronym: "CASSO", logo: logoCASSO, pic: imgCASSO, head: "Emmanuel A. Aduna", loc: "Ground Floor - Right", time: "8:00 AM - 5:00 PM", services: ["Real Property Assessment", "Tax Declarations"] },
  { cat: "FISCAL MANAGEMENT", name: "City Budget Office", acronym: "CBO", logo: null, pic: imgCBO, head: "Nicky S. Sagnip", loc: "Ground Floor - Right", time: "8:00 AM - 5:00 PM", services: ["Budget Allocation and Review"] },
  { cat: "FISCAL MANAGEMENT", name: "Business Permit & Licensing Division", acronym: "BPLD", logo: null, pic: imgCCR, head: "Maria Raquel Sagnit", loc: "Ground Floor - Right", time: "8:00 AM - 5:00 PM", services: ["New Business Permits", "Business Permit Renewals", "Retirement of Business"] },
  { cat: "FISCAL MANAGEMENT", name: "City Treasurer's Office", acronym: "CTO", logo: logoCTO, pic: imgCCR, head: "Mary Jane F. Villareal", loc: "Ground Floor - Right", time: "8:00 AM - 5:00 PM", services: ["Payment of Real Property Taxes", "Collection of Fees and Charges"] },
  { cat: "INFRASTRUCTURE & SAFETY", name: "Traffic Management & Public Safety Division", acronym: "TMPSD", logo: logoTMPSD, pic: imgTMPSD, head: "Thea Bantegui", loc: "Second Floor - Left", time: "8:00 AM - 5:00 PM", services: ["Traffic Apprehensions", "Road Safety Assistance"] },
  { cat: "INFRASTRUCTURE & SAFETY", name: "City Engineering Office", acronym: "CEO", logo: logoCEO, pic: imgCEO, head: "Engr. Alexander Dela Merced", loc: "Ground Floor - Left", time: "8:00 AM - 5:00 PM", services: ["Building Permits", "Occupancy Permits", "Infrastructure Projects"] },
  { cat: "PUBLIC ADMINISTRATION", name: "City Planning & Development Office", acronym: "CPDO", logo: logoCPDO, pic: imgCPDO, head: "Arch. Margarita A. Angeles", loc: "Second Floor", time: "8:00 AM - 5:00 PM", services: ["Zoning Clearances", "Comprehensive Land Use Plan"] },
  { cat: "PUBLIC ADMINISTRATION", name: "City General Services Office", acronym: "CGSO", logo: null, pic: imgCGSO, head: "Reynaldo C. Alberto", loc: "Second Floor", time: "8:00 AM - 5:00 PM", services: ["Procurement", "Asset Management"] },
  { cat: "PUBLIC ADMINISTRATION", name: "City Legal Office", acronym: "CLO", logo: null, pic: imgCLO, head: "Atty. John Kenner M. Mendoza", loc: "Second Floor", time: "8:00 AM - 5:00 PM", services: ["Legal Counseling", "Contract Review"] },
  { cat: "PUBLIC ADMINISTRATION", name: "City Human Resource & Management Office", acronym: "CHRMO", logo: null, pic: imgCHRMO, head: "Dudley S. Romero", loc: "Second Floor", time: "8:00 AM - 5:00 PM", services: ["Job Vacancies", "Employee Records"] },
  { cat: "PUBLIC ADMINISTRATION", name: "Library Division", acronym: "LIB", logo: logoLIB, pic: imgLIB, head: "Alicia L. Estanislao", loc: "Second Floor", time: "8:00 AM - 5:00 PM", services: ["Public Reading Area", "Research Assistance"] },
  { cat: "PUBLIC ADMINISTRATION", name: "Information & Technology Division", acronym: "ICT", logo: logoICT, pic: imgICT, head: "Feliciano C. Ramos Jr.", loc: "Ground Floor - Left", time: "8:00 AM - 5:00 PM", services: ["System Maintenance", "Tech Support"] },
  { cat: "SOCIAL SERVICES", name: "City Disaster Risk Reduction Office", acronym: "CDRRMO", logo: logoCDRRMO, pic: imgCDRRMO, head: "Ferdinand B. Hilado", loc: "Outside Main Bldg", time: "24/7", services: ["Emergency Rescue", "Disaster Preparedness Training"] },
  { cat: "SOCIAL SERVICES", name: "City Health Office", acronym: "CHO", logo: logoCHO, pic: imgCHO, head: "Dra. Shiela B. Flores", loc: "Outside Main Bldg", time: "8:00 AM - 5:00 PM", services: ["Medical Consultations", "Immunizations", "Issuance of Medical/Health Certificates"] },
  { cat: "SOCIAL SERVICES", name: "City Social Welfare & Development Office", acronym: "CSWD", logo: logoCSWD, pic: imgCSWD, head: "Maria Teresa Ramos", loc: "Outside Main Bldg", time: "8:00 AM - 5:00 PM", services: ["Senior Citizen ID Application", "Solo Parent ID", "Assistance in Crisis Situations (AICS)"] },
  { cat: "SOCIAL SERVICES", name: "City Civil Registrar Office", acronym: "CCR", logo: logoCCR, pic: imgCCR, head: "Loribelle C. De Guzman", loc: "Ground Floor - Right", time: "8:00 AM - 5:00 PM", services: ["Birth Registration", "Marriage License", "Death Registration"] }
];

function getDirectDriveUrl(url) {
  return url; // Bypassed
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
    // Fetch CSV data from Google Sheets strictly for locations and services
    const sheetId = "1BaKZiL3g7E5bqwjgfp7Gr5e-2OFQKYYoJ6qtIhfpu7M";
    const csvUrl = `https://docs.google.com/spreadsheets/d/${sheetId}/export?format=csv`;

    Papa.parse(csvUrl, {
      download: true,
      header: false,
      complete: (results) => {
        const data = results.data;
        const locationMap = {};

        for (let i = 0; i < data.length; i++) {
          const row = data[i];
          const identifier = row[0] ? row[0].toString().trim() : "";
          if (identifier && identifier !== "1.1") {
            if (row[3]) {
              locationMap[identifier] = row[3].toString().trim();
            }
          }
        }

        // Update departments array
        // Strictly use locally imported assets from the public map! No Google Drive URLs.
        const updatedDepts = initialDepartmentsData.map(dept => {
          return {
            ...dept,
            logo: localLogoMap[dept.acronym] || dept.logo || null,
            pic: localImageMap[dept.acronym] || dept.pic || null,
            loc: locationMap[dept.acronym] || dept.loc, // Keep Google sheet text for location updates
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

  // Helper: get the local image for a department
  const getDeptImage = (dept) => {
    return dept.pic || localImageMap[dept.acronym] || null;
  };

  // Helper: get the logo for a department
  const getDeptLogo = (dept) => {
    return dept.logo || localLogoMap[dept.acronym] || logoDataUrl;
  };

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
            {filteredDepts.map((d, index) => {
              const deptImg = getDeptImage(d);
              const deptLogo = getDeptLogo(d);
              return (
                <div
                  key={index}
                  className="dept-card"
                  onClick={() => setSelectedDept(d)}
                >
                  <div className="dept-card-thumb" style={{ background: '#f8fafc', padding: '6px', border: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <img src={deptLogo} alt={d.acronym + ' logo'} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                  </div>
                  <div className="dept-text" style={{ flex: 1, paddingLeft: '15px' }}>
                    <p style={{ fontWeight: 800, fontSize: '0.95rem', margin: 0, color: 'var(--text-dark)' }}>{d.name}</p>
                    <p style={{ fontWeight: 800, color: 'var(--yellow-green-dark)', fontSize: '0.75rem', margin: 0 }}>{d.acronym}</p>
                  </div>
                </div>
              );
            })}
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

      {/* Dept Modal - Redesigned */}
      <div
        className={`modal-overlay ${selectedDept ? 'active' : ''}`}
        onClick={() => setSelectedDept(null)}
      >
        <div className={`modal-content ${selectedDept ? 'modal-animate-in' : ''}`} onClick={e => e.stopPropagation()}>
          {/* Hero Image Banner */}
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
            <button className="modal-close-btn" onClick={() => setSelectedDept(null)}>&times;</button>
          </div>

          {/* Logo floating on hero edge */}
          <div className="modal-logo-float">
            <img src={selectedDept ? getDeptLogo(selectedDept) : logoDataUrl} alt="Logo" className="modal-logo-img" />
          </div>

          <div className="modal-body">
            {/* Title area */}
            <div className="modal-title-area">
              <h2 className="modal-dept-name">{selectedDept?.name}</h2>
              <span className="modal-dept-acronym">{selectedDept?.acronym}</span>
            </div>

            {/* Info Cards */}
            <div className="modal-info-grid">
              <div className="modal-info-card">
                <div className="modal-info-icon">
                  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>
                </div>
                <div>
                  <span className="modal-info-label">Department Head</span>
                  <span className="modal-info-value">{selectedDept?.head}</span>
                </div>
              </div>

              <div className="modal-info-card">
                <div className="modal-info-icon">
                  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></svg>
                </div>
                <div>
                  <span className="modal-info-label">Location</span>
                  <span className="modal-info-value">{selectedDept?.loc}</span>
                </div>
              </div>

              <div className="modal-info-card">
                <div className="modal-info-icon">
                  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>
                </div>
                <div>
                  <span className="modal-info-label">Office Hours</span>
                  <span className="modal-info-value">{selectedDept?.time}</span>
                </div>
              </div>
            </div>

            {/* Services Section */}
            {selectedDept?.services && selectedDept.services.length > 0 && (
              <div className="modal-services">
                <h3 className="modal-services-title">
                  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 11 12 14 22 4" /><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" /></svg>
                  Services Offered
                </h3>
                <div className="modal-services-list">
                  {selectedDept.services.map((s, i) => (
                    <div key={i} className="modal-service-chip">{s}</div>
                  ))}
                </div>
              </div>
            )}
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
