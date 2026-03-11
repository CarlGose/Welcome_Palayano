export default function Lightbox({ lightboxImg, setLightboxImg }) {
  if (!lightboxImg) return null;

  return (
    <div
      className={`lightbox-overlay ${lightboxImg ? "show" : ""}`}
      onClick={() => setLightboxImg(null)}
    >
      <span className="lightbox-close">&times;</span>
      {lightboxImg && (
        <img src={lightboxImg} className="lightbox-content" alt="Enlarged" />
      )}
    </div>
  );
}
