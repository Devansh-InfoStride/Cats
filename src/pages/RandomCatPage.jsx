import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Camera,
  RefreshCw,
  Heart,
  Download,
  Copy,
  Maximize2,
  Sliders,
  Tag,
} from "lucide-react";
import confetti from "canvas-confetti";
import {
  API_BASE,
  getCacheBuster,
  playMeowSound,
  playPurrSound,
  downloadImage,
  copyToClipboard,
  saveFavorite,
  removeFavorite,
  isFavorite,
} from "../utility/utility";
import Toast from "../components/toast/toast";
import ImageModal from "../components/image-modal/image-modal";

export default function RandomCatPage() {
  const [filter, setFilter] = useState("none");
  const [type, setType] = useState("all");
  const [currentUrl, setCurrentUrl] = useState(`${API_BASE}/cat`);
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState([]);
  const [modalImage, setModalImage] = useState(null);
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const fetchCat = (f = filter, t = type) => {
    setLoading(true);
    playMeowSound(0.95);
    const params = new URLSearchParams();
    if (f !== "none") params.append("filter", f);
    if (t !== "all") params.append("type", t);
    params.append("ts", getCacheBuster());

    const queryString = params.toString();
    const newUrl = `${API_BASE}/cat${queryString ? `?${queryString}` : ""}`;

    const img = new Image();
    img.src = newUrl;
    img.onload = () => {
      setCurrentUrl(newUrl);
      setLoading(false);
      setHistory((prev) => [newUrl, ...prev.slice(0, 7)]);
    };
    img.onerror = () => {
      setLoading(false);
      showToast("Could not load image, please try again!");
    };
  };

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
    fetchCat(newFilter, type);
  };

  const handleTypeChange = (newType) => {
    setType(newType);
    fetchCat(filter, newType);
  };

  const favorited = isFavorite(currentUrl);

  const handleToggleFavorite = () => {
    if (favorited) {
      removeFavorite(currentUrl);
      showToast("Removed from favorites");
    } else {
      saveFavorite({
        url: currentUrl,
        title: `Random Cat (${filter !== "none" ? filter : "standard"})`,
        tags: [filter !== "none" ? filter : "photo", "random"],
        type: "photo",
      });
      playPurrSound();
      confetti({
        particleCount: 40,
        spread: 50,
        origin: { y: 0.6 },
      });
      showToast("Saved to your favorites! ❤️");
    }
    window.dispatchEvent(new Event("favorites-updated"));
  };

  const handleCopyLink = async () => {
    await copyToClipboard(currentUrl);
    showToast("Direct image link copied to clipboard! 📋");
  };

  const handleDownload = () => {
    downloadImage(currentUrl, `cat-photo-${Date.now()}.jpg`);
    showToast("Downloading high-res photo! 🐾");
  };

  return (
    <div className="page-container animate-fade-in">
      <Toast message={toastMessage} onClose={() => setToastMessage(null)} />

      {modalImage && (
        <ImageModal
          imageUrl={modalImage}
          title="Random Cat Photo"
          tags={["photo", filter !== "none" ? filter : "standard"]}
          onClose={() => setModalImage(null)}
          onToast={showToast}
        />
      )}

      {/* Page Header */}
      <div className="page-header">
        <span className="badge badge-orange">
          <Camera size={14} /> High-Res Photography
        </span>
        <h1>Random Cat Photo Studio</h1>
        <p>
          Generate endless stunning feline portraits from the global catalog. Apply visual filters, switch aspect ratios, and download your favorites.
        </p>
      </div>

      {/* Controls & Filter Bar */}
      <div className="card" style={{ marginBottom: "24px", padding: "18px 24px" }}>
        <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: "16px" }}>
          {/* Visual Filters */}
          <div style={{ display: "flex", alignItems: "center", gap: "10px", flexWrap: "wrap" }}>
            <span style={{ fontSize: "0.88rem", fontWeight: "700", color: "var(--text-main)", display: "flex", alignItems: "center", gap: "6px" }}>
              <Sliders size={16} /> Filters:
            </span>
            {[
              { id: "none", label: "Original" },
              { id: "mono", label: "Monochrome / B&W" },
              { id: "blur", label: "Soft Blur" },
              { id: "negate", label: "Inverted / Negate" },
            ].map((item) => (
              <button
                key={item.id}
                type="button"
                className={`tag-pill-btn ${filter === item.id ? "active" : ""}`}
                onClick={() => handleFilterChange(item.id)}
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Aspect Ratio / Type */}
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <span style={{ fontSize: "0.88rem", fontWeight: "700", color: "var(--text-main)" }}>
              Size:
            </span>
            {[
              { id: "all", label: "Auto" },
              { id: "square", label: "Square" },
              { id: "medium", label: "Medium" },
              { id: "small", label: "Small" },
            ].map((item) => (
              <button
                key={item.id}
                type="button"
                className={`btn btn-sm ${type === item.id ? "btn-secondary" : "btn-outline"}`}
                onClick={() => handleTypeChange(item.id)}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Cat Display Card */}
      <div className="cat-display-card">
        <div className="cat-image-container">
          {loading ? (
            <div className="skeleton-loader">
              <div className="spinner"></div>
              <span>Finding a delightful kitty...</span>
            </div>
          ) : (
            <>
              <img
                src={currentUrl}
                alt="Random Cat"
                className="cat-image"
                onClick={() => setModalImage(currentUrl)}
                style={{ cursor: "zoom-in" }}
              />
              <div className="cat-image-overlay-tags">
                <span className="badge badge-orange">
                  {filter !== "none" ? filter.toUpperCase() : "ORIGINAL"}
                </span>
                {type !== "all" && (
                  <span className="badge badge-purple">{type.toUpperCase()}</span>
                )}
              </div>
              <div className="cat-image-overlay-actions">
                <button
                  type="button"
                  className="btn-icon"
                  onClick={() => setModalImage(currentUrl)}
                  title="Expand to Fullscreen"
                >
                  <Maximize2 size={16} />
                </button>
              </div>
            </>
          )}
        </div>

        {/* Action Controls Bar */}
        <div className="cat-controls-bar">
          <div className="cat-controls-group">
            <button
              type="button"
              className={`btn ${favorited ? "btn-accent" : "btn-outline"}`}
              onClick={handleToggleFavorite}
              disabled={loading}
            >
              <Heart size={16} style={{ fill: favorited ? "currentColor" : "none" }} />
              <span>{favorited ? "Saved to Favorites" : "Add to Favorites"}</span>
            </button>

            <button
              type="button"
              className="btn btn-outline"
              onClick={handleCopyLink}
              disabled={loading}
            >
              <Copy size={16} />
              <span>Copy Link</span>
            </button>
          </div>

          <div className="cat-controls-group">
            <button
              type="button"
              className="btn btn-outline"
              onClick={handleDownload}
              disabled={loading}
            >
              <Download size={16} />
              <span>Download</span>
            </button>

            <button
              type="button"
              className="btn btn-primary btn-lg"
              onClick={() => fetchCat(filter, type)}
              disabled={loading}
            >
              <RefreshCw size={18} className={loading ? "animate-spin-slow" : ""} />
              <span>Fetch New Cat</span>
            </button>
          </div>
        </div>
      </div>

      {/* Quick Tag Jump Chips */}
      <div style={{ marginTop: "28px", textAlign: "center" }}>
        <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", flexWrap: "wrap", justifyContent: "center" }}>
          <span style={{ fontSize: "0.88rem", fontWeight: "700", color: "var(--text-light)" }}>
            Explore specific cat vibes:
          </span>
          {["cute", "orange", "fluffy", "kitten", "black", "sleeping", "box", "hat"].map((tag) => (
            <Link key={tag} to={`/tags?tag=${tag}`} className="preset-chip">
              <Tag size={12} /> #{tag}
            </Link>
          ))}
        </div>
      </div>

      {/* Session History Strip */}
      {history.length > 1 && (
        <div className="history-section">
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "12px" }}>
            <h3 style={{ fontSize: "1.1rem" }}>Recently Viewed This Session</h3>
            <span style={{ fontSize: "0.82rem", color: "var(--text-light)" }}>
              Click any thumbnail to inspect
            </span>
          </div>

          <div className="history-strip">
            {history.map((url, idx) => (
              <img
                key={idx}
                src={url}
                alt={`Cat ${idx + 1}`}
                className="history-thumb"
                onClick={() => setModalImage(url)}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
