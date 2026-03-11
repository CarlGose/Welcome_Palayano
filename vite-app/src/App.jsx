import { useState, useRef, useEffect } from "react";
import Papa from "papaparse";
import "./index.css";
import {
  initialDepartmentsData,
  localImageMap,
  localLogoMap,
} from "./data/departmentsData";

import Header from "./components/Header";
import Navigation from "./components/Navigation";
import OfficesTab from "./components/OfficesTab";
import UpdatesTab from "./components/UpdatesTab";
import ExploreTab from "./components/ExploreTab";
import DeptModal from "./components/DeptModal";
import SideMenu from "./components/SideMenu";
import Lightbox from "./components/Lightbox";

const defaultLogoDataUrl = "/logos/default_logo.jpg";
const defaultBannerBgUrl = "";

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

        const updatedDepts = initialDepartmentsData.map((dept) => {
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
      },
    });
  }, []);

  const handleScroll = (e) => {
    let scrollTop = e.target.scrollTop;
    let p = Math.max(0, Math.min(1, scrollTop / 155));
    setHeaderOpacity(Math.max(0, 1 - p * 1.5));
  };

  const handleTabChange = (idx) => {
    setActiveTab(idx);
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo(0, 0);
    }
  };

  const toggleAccordion = (id) => {
    setOpenAccordions((prev) => {
      const next = { ...prev };
      Object.keys(next).forEach((k) => (next[k] = false));
      next[id] = !prev[id];
      return next;
    });
  };

  const groupedDepts = {};
  departments.forEach((d) => {
    if (!groupedDepts[d.cat]) groupedDepts[d.cat] = [];
    groupedDepts[d.cat].push(d);
  });

  const getDeptImage = (dept) => {
    return dept.pic || localImageMap[dept.acronym] || null;
  };

  const getDeptLogo = (dept) => {
    return dept.logo || localLogoMap[dept.acronym] || logoDataUrl;
  };

  const renderDepartments = () => {
    let result = [];
    const val = searchQuery.toLowerCase().trim();

    Object.keys(groupedDepts).forEach((cat) => {
      const filteredDepts = groupedDepts[cat].filter(
        (d) =>
          d.name.toLowerCase().includes(val) ||
          d.acronym.toLowerCase().includes(val),
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
                  <div
                    className="dept-card-thumb"
                    style={{
                      background: "#f8fafc",
                      padding: "6px",
                      border: "1px solid #e2e8f0",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <img
                      src={deptLogo}
                      alt={d.acronym + " logo"}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "contain",
                      }}
                    />
                  </div>
                  <div
                    className="dept-text"
                    style={{ flex: 1, paddingLeft: "15px" }}
                  >
                    <p
                      style={{
                        fontWeight: 800,
                        fontSize: "0.95rem",
                        margin: 0,
                        color: "var(--text-dark)",
                      }}
                    >
                      {d.name}
                    </p>
                    <p
                      style={{
                        fontWeight: 800,
                        color: "var(--yellow-green-dark)",
                        fontSize: "0.75rem",
                        margin: 0,
                      }}
                    >
                      {d.acronym}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>,
        );
      }
    });

    return result;
  };

  return (
    <div className="app-shell">
      <div
        className="scroll-viewport"
        id="scrollContainer"
        ref={scrollContainerRef}
        onScroll={handleScroll}
      >
        <Header
          setMenuOpen={setMenuOpen}
          headerOpacity={headerOpacity}
          logoDataUrl={logoDataUrl}
          bannerBgUrl={bannerBgUrl}
        />

        <Navigation
          activeTab={activeTab}
          handleTabChange={handleTabChange}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />

        <div className="track-wrapper">
          <div
            className="track"
            style={{ transform: `translateX(-${activeTab * 33.333}%)` }}
          >
            <OfficesTab
              activeTab={activeTab}
              renderDepartments={renderDepartments}
            />
            <UpdatesTab activeTab={activeTab} />
            <ExploreTab activeTab={activeTab} />
          </div>
        </div>
      </div>

      <footer>
        <img src={logoDataUrl} alt="Palayan City Logo" className="footer-logo" />
        <span>GOVPH © 2026 CITY OF PALAYAN</span>
        <img src="/logos/ict.png" alt="ICT Logo" className="footer-logo" />
      </footer>

      <DeptModal
        selectedDept={selectedDept}
        setSelectedDept={setSelectedDept}
        logoDataUrl={logoDataUrl}
        setLightboxImg={setLightboxImg}
        getDeptImage={getDeptImage}
        getDeptLogo={getDeptLogo}
      />

      <SideMenu
        menuOpen={menuOpen}
        setMenuOpen={setMenuOpen}
        openAccordions={openAccordions}
        toggleAccordion={toggleAccordion}
      />

      <Lightbox lightboxImg={lightboxImg} setLightboxImg={setLightboxImg} />
    </div>
  );
}
