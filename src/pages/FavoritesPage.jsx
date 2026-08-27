import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Heart,
  Trash2,
  Download,
  Maximize2,
  Camera,
  Film,
} from "lucide-react";
import {
  getFavorites,
  removeFavorite,
  downloadImage,
} from "../utility/utility";
import Toast from "../components/toast/toast";
import ImageModal from "../components/image-modal/image-modal";

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState(getFavorites);
  const [filterType, setFilterType] = useState("all");
  const [modalImage, setModalImage] = useState(null);
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  useEffect(() => {
    const handleUpdate = () => {
      setFavorites(getFavorites());
    };
    window.addEventListener("favorites-updated", handleUpdate);
    window.addEventListener("storage", handleUpdate);
    return () => {
      window.removeEventListener("favorites-updated", handleUpdate);
      window.removeEventListener("storage", handleUpdate);
    };
  }, []);

  const handleRemove = (url) => {
    const updated = removeFavorite(url);
    setFavorites(updated);
    window.dispatchEvent(new Event("favorites-updated"));
    showToast("Removed from saved favorites");
  };

  const handleClearAll = () => {
    if (window.confirm("Are you sure you want to clear all your saved favorites?")) {
      localStorage.removeItem("purrfect_favorites_v1");
      setFavorites([]);
      window.dispatchEvent(new Event("favorites-updated"));
      showToast("Cleared all favorites");
    }
  };

  const filtered = filterType === "all"
    ? favorites
    : favorites.filter((item) => item.type === filterType);

  return (
    <div className="page-container animate-fade-in">
      <Toast message={toastMessage} onClose={() => setToastMessage(null)} />

      {modalImage && (
        <ImageModal
          imageUrl={modalImage}
          title="Saved Favorite"
          onClose={() => setModalImage(null)}
          onToast={showToast}
        />
      )}

      {/* Page Header */}
      <div className="page-header">
        <span className="badge badge-pink">
          <Heart size={14} /> My Personal Sanctuary
        </span>
        <h1>Saved Cats &amp; Memes Vault ❤️</h1>
        <p>
          Your curated collection of favorite photos, animated GIFs, and custom generated memes saved securely across your sessions.
        </p>
      </div>

      {favorites.length > 0 ? (
        <div>
          {/* Filter Bar */}
          <div className="card" style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: "16px", marginBottom: "28px", padding: "14px 20px" }}>
            <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
              {[
                { id: "all", label: `All Saved (${favorites.length})` },
                { id: "photo", label: "Photos 📸" },
                { id: "gif", label: "GIFs 🎬" },
                { id: "meme", label: "Memes 🎨" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  className={`tag-pill-btn ${filterType === tab.id ? "active" : ""}`}
                  onClick={() => setFilterType(tab.id)}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            <button
              type="button"
              className="btn btn-outline btn-sm"
              onClick={handleClearAll}
              style={{ color: "#ef4444" }}
            >
              <Trash2 size={14} />
              <span>Clear All</span>
            </button>
          </div>

          {/* Gallery Grid of Saved Items */}
          <div className="cats-gallery-grid">
            {filtered.map((item, idx) => (
              <div key={item.url || idx} className="gallery-card">
                <div className="gallery-image-box">
                  <img
                    src={item.url}
                    alt={item.title || "Saved Cat"}
                    className="gallery-image"
                    loading="lazy"
                    onClick={() => setModalImage(item.url)}
                    style={{ cursor: "zoom-in" }}
                  />
                  <div style={{ position: "absolute", top: "8px", left: "8px" }}>
                    <span className="badge badge-purple" style={{ fontSize: "0.7rem", padding: "2px 8px" }}>
                      {item.type?.toUpperCase() || "PHOTO"}
                    </span>
                  </div>
                </div>

                <div className="gallery-card-footer">
                  <span style={{ fontSize: "0.82rem", fontWeight: "600", color: "var(--text-main)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", maxWidth: "120px" }}>
                    {item.title || "Cute Cat"}
                  </span>

                  <div style={{ display: "flex", gap: "6px" }}>
                    <button
                      type="button"
                      className="btn-icon"
                      style={{ width: "32px", height: "32px" }}
                      onClick={() => setModalImage(item.url)}
                      title="Inspect"
                    >
                      <Maximize2 size={13} />
                    </button>
                    <button
                      type="button"
                      className="btn-icon"
                      style={{ width: "32px", height: "32px" }}
                      onClick={() => {
                        downloadImage(item.url, `favorite-cat-${idx + 1}.jpg`);
                        showToast("Downloading image! 🐾");
                      }}
                      title="Download"
                    >
                      <Download size={13} />
                    </button>
                    <button
                      type="button"
                      className="btn-icon"
                      style={{ width: "32px", height: "32px", color: "#ef4444" }}
                      onClick={() => handleRemove(item.url)}
                      title="Remove from favorites"
                    >
                      <Trash2 size={13} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        /* Empty State */
        <div className="card" style={{ textAlign: "center", padding: "64px 24px", maxWidth: "560px", margin: "0 auto" }}>
          <div style={{ fontSize: "64px", marginBottom: "16px" }}>😿</div>
          <h2 style={{ fontSize: "1.6rem", marginBottom: "8px" }}>No Saved Cats Yet!</h2>
          <p style={{ color: "var(--text-muted)", marginBottom: "24px" }}>
            When you discover cute photos, funny GIFs, or make custom memes, click the heart icon to save them to your personal collection.
          </p>

          <div style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap" }}>
            <Link to="/photos" className="btn btn-primary">
              <Camera size={16} />
              <span>Explore Photos</span>
            </Link>
            <Link to="/gifs" className="btn btn-secondary">
              <Film size={16} />
              <span>Browse GIFs</span>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
