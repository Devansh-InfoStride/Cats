import { useState } from "react";
import {
  Film,
  RefreshCw,
  Heart,
  Download,
  Copy,
  Maximize2,
  Zap,
} from "lucide-react";
import confetti from "canvas-confetti";
import {
  API_BASE,
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

export default function CatGifPage() {
  const [currentGifUrl, setCurrentGifUrl] = useState(`${API_BASE}/cat/gif`);
  const [loading, setLoading] = useState(false);
  const [modalImage, setModalImage] = useState(null);
  const [toastMessage, setToastMessage] = useState(null);
  const [gifStream, setGifStream] = useState(() =>
    Array.from({ length: 6 }, (_, i) => `${API_BASE}/cat/gif?stream_init=${i}`)
  );
  const [streamLoading, setStreamLoading] = useState(false);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const fetchMainGif = () => {
    setLoading(true);
    playMeowSound(1.15);
    const newUrl = `${API_BASE}/cat/gif?ts=${Date.now()}`;

    const img = new Image();
    img.src = newUrl;
    img.onload = () => {
      setCurrentGifUrl(newUrl);
      setLoading(false);
    };
    img.onerror = () => {
      setLoading(false);
      showToast("Failed to load GIF, please try again!");
    };
  };

  const loadMoreStream = () => {
    setStreamLoading(true);
    const newGifs = Array.from({ length: 6 }, (_, i) => `${API_BASE}/cat/gif?stream_ts=${Date.now()}_${i}`);
    setGifStream((prev) => [...prev, ...newGifs]);
    setTimeout(() => setStreamLoading(false), 800);
  };

  const favorited = isFavorite(currentGifUrl);

  const handleToggleFavorite = (url = currentGifUrl) => {
    if (isFavorite(url)) {
      removeFavorite(url);
      showToast("Removed GIF from favorites");
    } else {
      saveFavorite({
        url,
        title: "Animated Cat GIF",
        tags: ["gif", "animated", "funny"],
        type: "gif",
      });
      playPurrSound();
      confetti({
        particleCount: 45,
        spread: 60,
        origin: { y: 0.6 },
      });
      showToast("GIF saved to favorites! 🎬❤️");
    }
    window.dispatchEvent(new Event("favorites-updated"));
  };

  return (
    <div className="page-container animate-fade-in">
      <Toast message={toastMessage} onClose={() => setToastMessage(null)} />

      {modalImage && (
        <ImageModal
          imageUrl={modalImage}
          title="Animated Cat GIF"
          tags={["gif", "animated", "funny"]}
          type="gif"
          onClose={() => setModalImage(null)}
          onToast={showToast}
        />
      )}

      {/* Page Header */}
      <div className="page-header">
        <span className="badge badge-purple">
          <Film size={14} /> Motion & Shenanigans
        </span>
        <h1>Animated Cat GIF Station 🎬</h1>
        <p>
          Endless hilarious loops of zoomies, mid-air acrobatics, goofy fails, and heart-melting purrs captured in animated GIFs.
        </p>
      </div>

      {/* Main Spotlight GIF Card */}
      <div className="cat-display-card" style={{ marginBottom: "48px" }}>
        <div className="cat-image-container cat-image-contain">
          {loading ? (
            <div className="skeleton-loader">
              <div className="spinner"></div>
              <span>Summoning an animated kitty...</span>
            </div>
          ) : (
            <>
              <img
                src={currentGifUrl}
                alt="Animated Cat GIF"
                className="cat-image cat-image-contain"
                onClick={() => setModalImage(currentGifUrl)}
                style={{ cursor: "zoom-in" }}
              />
              <div className="cat-image-overlay-tags">
                <span className="badge badge-pink">ANIMATED GIF</span>
                <span className="badge badge-purple">LOOPING</span>
              </div>
              <div className="cat-image-overlay-actions">
                <button
                  type="button"
                  className="btn-icon"
                  onClick={() => setModalImage(currentGifUrl)}
                  title="Expand Fullscreen"
                >
                  <Maximize2 size={16} />
                </button>
              </div>
            </>
          )}
        </div>

        {/* Action Controls */}
        <div className="cat-controls-bar">
          <div className="cat-controls-group">
            <button
              type="button"
              className={`btn ${favorited ? "btn-accent" : "btn-outline"}`}
              onClick={() => handleToggleFavorite(currentGifUrl)}
              disabled={loading}
            >
              <Heart size={16} style={{ fill: favorited ? "currentColor" : "none" }} />
              <span>{favorited ? "Saved to Favorites" : "Add to Favorites"}</span>
            </button>

            <button
              type="button"
              className="btn btn-outline"
              onClick={async () => {
                await copyToClipboard(currentGifUrl);
                showToast("GIF link copied to clipboard! 📋");
              }}
              disabled={loading}
            >
              <Copy size={16} />
              <span>Copy GIF Link</span>
            </button>
          </div>

          <div className="cat-controls-group">
            <button
              type="button"
              className="btn btn-outline"
              onClick={() => {
                downloadImage(currentGifUrl, `cat-animation-${Date.now()}.gif`);
                showToast("Downloading GIF animation! 🐾");
              }}
              disabled={loading}
            >
              <Download size={16} />
              <span>Download GIF</span>
            </button>

            <button
              type="button"
              className="btn btn-secondary btn-lg"
              onClick={fetchMainGif}
              disabled={loading}
            >
              <RefreshCw size={18} className={loading ? "animate-spin-slow" : ""} />
              <span>Fetch Next GIF</span>
            </button>
          </div>
        </div>
      </div>

      {/* GIF Stream Grid */}
      <div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "20px" }}>
          <div>
            <h2 style={{ fontSize: "1.5rem" }}>Infinite GIF Stream ⚡</h2>
            <p style={{ fontSize: "0.9rem" }}>Browse multiple animated reactions and moments simultaneously.</p>
          </div>
          <button
            type="button"
            className="btn btn-outline-primary btn-sm"
            onClick={loadMoreStream}
            disabled={streamLoading}
          >
            <Zap size={15} />
            <span>{streamLoading ? "Loading..." : "Load 6 More GIFs"}</span>
          </button>
        </div>

        <div className="cats-gallery-grid">
          {gifStream.map((url, idx) => {
            const isFav = isFavorite(url);
            return (
              <div key={idx} className="gallery-card">
                <div className="gallery-image-box">
                  <img
                    src={url}
                    alt={`Cat GIF ${idx + 1}`}
                    className="gallery-image"
                    loading="lazy"
                    onClick={() => setModalImage(url)}
                    style={{ cursor: "zoom-in" }}
                  />
                  <div style={{ position: "absolute", top: "8px", left: "8px" }}>
                    <span className="badge badge-purple" style={{ fontSize: "0.7rem", padding: "2px 8px" }}>
                      GIF #{idx + 1}
                    </span>
                  </div>
                </div>

                <div className="gallery-card-footer">
                  <button
                    type="button"
                    className="btn btn-sm btn-outline"
                    onClick={() => setModalImage(url)}
                  >
                    <Maximize2 size={13} />
                    <span>View</span>
                  </button>

                  <div style={{ display: "flex", gap: "6px" }}>
                    <button
                      type="button"
                      className={`btn-icon ${isFav ? "favorited" : ""}`}
                      style={{ width: "32px", height: "32px" }}
                      onClick={() => handleToggleFavorite(url)}
                      title="Favorite"
                    >
                      <Heart size={14} style={{ fill: isFav ? "currentColor" : "none" }} />
                    </button>
                    <button
                      type="button"
                      className="btn-icon"
                      style={{ width: "32px", height: "32px" }}
                      onClick={() => {
                        downloadImage(url, `cat-${idx + 1}.gif`);
                        showToast("Downloading GIF! 🐾");
                      }}
                      title="Download"
                    >
                      <Download size={14} />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div style={{ textAlign: "center", marginTop: "36px" }}>
          <button
            type="button"
            className="btn btn-primary btn-lg"
            onClick={loadMoreStream}
            disabled={streamLoading}
          >
            <RefreshCw size={18} className={streamLoading ? "animate-spin-slow" : ""} />
            <span>Load More Animated GIFs</span>
          </button>
        </div>
      </div>
    </div>
  );
}
