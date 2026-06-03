import { useState, useEffect } from "react";

const fallbackAnnouncements = [
  {
    title: "Palayan Classroom Chair Donation Supports Schools",
    link: "https://cityofpalayan.gov.ph/2026/06/03/palayan-city-school-chairs-donation-2026/",
    pubDate: new Date("2026-06-03"),
    description: "The Palayan classroom chair donation program provided new chairs to public schools in Palayan City. The initiative aimed to improve classroom conditions and address shortages.",
  },
  {
    title: "Palayan Night Market Application Now Open",
    link: "https://cityofpalayan.gov.ph/2026/06/01/palayan-night-market-application-2026/",
    pubDate: new Date("2026-06-01"),
    description: "The application period for the Palayan Night Market is now officially open. Interested vendors and entrepreneurs may submit their applications from June 1 to June 15, 2026.",
  },
  {
    title: "Palayan City Recognized as One of Central Luzon’s Regional Top Performers",
    link: "https://cityofpalayan.gov.ph/2026/05/29/palayan-city-regional-top-performer-2025/",
    pubDate: new Date("2026-05-29"),
    description: "Palayan LGU received the regional top performer recognition after earning 3rd Place in the 2025 Local Government Unit Compliance Assessment (LGUCA).",
  },
  {
    title: "Palayan City Observes National Flag Day with Pride and Patriotism",
    link: "https://cityofpalayan.gov.ph/2026/05/28/palayan-city-national-flag-day-2026/",
    pubDate: new Date("2026-05-28"),
    description: "In preparation for Independence Day, Palayan City proudly displays Philippine flags across major roads, government offices, and public spaces.",
  }
];

export default function UpdatesTab({ activeTab }) {
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLiveUpdates = async () => {
      try {
        const response = await fetch(
          "https://api.allorigins.win/raw?url=" + encodeURIComponent("https://cityofpalayan.gov.ph/feed/")
        );
        if (!response.ok) throw new Error("Failed to fetch RSS feed");
        const xmlText = await response.text();
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(xmlText, "text/xml");
        const items = xmlDoc.querySelectorAll("item");

        if (items.length === 0) throw new Error("No items found in feed");

        const parsed = Array.from(items).map((item) => {
          const title = item.querySelector("title")?.textContent || "";
          const link = item.querySelector("link")?.textContent || "";
          const pubDateStr = item.querySelector("pubDate")?.textContent || "";
          const descriptionHtml = item.querySelector("description")?.textContent || "";

          // Clean HTML tags from description
          const tempDiv = document.createElement("div");
          tempDiv.innerHTML = descriptionHtml;
          let description = tempDiv.textContent || tempDiv.innerText || "";

          // Remove standard WordPress RSS post suffix
          const postIndex = description.indexOf("The post");
          if (postIndex !== -1) {
            description = description.substring(0, postIndex).trim();
          }

          if (description.length > 150) {
            description = description.substring(0, 150) + "...";
          }

          return {
            title,
            link,
            pubDate: new Date(pubDateStr),
            description,
          };
        });

        // Filter: only announcements within the past 14 days (2 weeks)
        const now = new Date();
        const twoWeeksAgo = new Date(now.getTime() - 14 * 24 * 60 * 60 * 1000);
        const filtered = parsed.filter((ann) => ann.pubDate >= twoWeeksAgo && ann.pubDate <= now);

        setAnnouncements(filtered);
      } catch (err) {
        console.warn("Could not fetch live feed, using filtered fallback data:", err);
        // Apply 2-week filter to fallback data
        const now = new Date();
        const twoWeeksAgo = new Date(now.getTime() - 14 * 24 * 60 * 60 * 1000);
        const filteredFallbacks = fallbackAnnouncements.filter(
          (ann) => ann.pubDate >= twoWeeksAgo && ann.pubDate <= now
        );
        
        setAnnouncements(filteredFallbacks);
      } finally {
        setLoading(false);
      }
    };

    fetchLiveUpdates();
  }, []);

  const formatDate = (dateObj) => {
    return dateObj.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <div
      className="page"
      style={{
        height: activeTab === 1 ? "auto" : "100vh",
        overflow: activeTab === 1 ? "visible" : "hidden",
      }}
    >
      <div className="page-heading">Latest Announcements</div>

      {loading ? (
        <div style={{ textAlign: "center", padding: "40px 20px", color: "var(--text-muted)" }}>
          <p>Checking for latest announcements...</p>
        </div>
      ) : announcements.length > 0 ? (
        announcements.map((ann, idx) => (
          <div className="preview-card" key={idx}>
            <span className="preview-date">{formatDate(ann.pubDate)}</span>
            <h3 className="preview-title">{ann.title}</h3>
            <p className="preview-desc">{ann.description}</p>
            {ann.link && (
              <a
                href={ann.link}
                target="_blank"
                rel="noreferrer"
                style={{
                  display: "inline-block",
                  marginTop: "10px",
                  fontSize: "0.8rem",
                  color: "var(--yellow-green-dark)",
                  fontWeight: "800",
                  textDecoration: "none",
                }}
              >
                Read More &rarr;
              </a>
            )}
          </div>
        ))
      ) : (
        <div
          className="preview-card"
          style={{
            textAlign: "center",
            padding: "30px 20px",
            background: "rgba(255, 255, 255, 0.15)",
          }}
        >
          <span className="preview-date" style={{ color: "var(--text-muted)" }}>
            Up to date
          </span>
          <h3 className="preview-title" style={{ fontSize: "1.1rem", margin: "8px 0" }}>
            No Recent Announcements
          </h3>
          <p className="preview-desc">
            There are no announcements published in the last 2 weeks.
          </p>
        </div>
      )}

      <a
        href="https://cityofpalayan.gov.ph/announcements/"
        target="_blank"
        rel="noreferrer"
        className="portal-btn"
      >
        Access Full Announcements Portal
      </a>
      <div style={{ height: 100, width: "100%" }}></div>
    </div>
  );
}
