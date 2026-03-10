export default function OfficesTab({ activeTab, renderDepartments }) {
  return (
    <div
      className="page"
      style={{
        height: activeTab === 0 ? "auto" : "100vh",
        overflow: activeTab === 0 ? "visible" : "hidden",
      }}
    >
      {renderDepartments()}
      <div style={{ height: 100, width: "100%" }}></div>
    </div>
  );
}
