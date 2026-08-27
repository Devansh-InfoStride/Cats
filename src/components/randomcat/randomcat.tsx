import { useState, useEffect } from "react";
import { RefreshCw, Heart, Download } from "lucide-react";
import { API_BASE, playMeowSound, downloadImage, saveFavorite } from "../../utility/utility";

export default function RandomCat() {
  const [catUrl, setCatUrl] = useState(`${API_BASE}/cat?ts=${Date.now()}`);
  const [loading, setLoading] = useState(false);

  const fetchRandomCat = () => {
    setLoading(true);
    playMeowSound(1.0);
    const newUrl = `${API_BASE}/cat?ts=${Date.now()}`;
    const img = new Image();
    img.src = newUrl;
    img.onload = () => {
      setCatUrl(newUrl);
      setLoading(false);
    };
    img.onerror = () => setLoading(false);
  };

  return (
    <div className="card" style={{ maxWidth: "480px", margin: "0 auto", textAlign: "center" }}>
      <h3 style={{ marginBottom: "12px" }}>Random Cat Snapshot 🐱</h3>
      
      <div className="cat-image-container" style={{ minHeight: "260px", maxHeight: "360px", borderRadius: "12px", marginBottom: "16px" }}>
        {loading ? (
          <div className="spinner"></div>
        ) : (
          <img src={catUrl} alt="Random Cat" className="cat-image" />
        )}
      </div>

      <div style={{ display: "flex", gap: "10px", justifyContent: "center" }}>
        <button
          type="button"
          className="btn btn-primary"
          onClick={fetchRandomCat}
          disabled={loading}
        >
          <RefreshCw size={15} className={loading ? "animate-spin-slow" : ""} />
          <span>New Cat</span>
        </button>

        <button
          type="button"
          className="btn btn-outline"
          onClick={() => {
            saveFavorite({ url: catUrl, title: "Random Cat", tags: ["photo"], type: "photo" });
            window.dispatchEvent(new Event("favorites-updated"));
          }}
        >
          <Heart size={15} />
          <span>Favorite</span>
        </button>

        <button
          type="button"
          className="btn btn-outline"
          onClick={() => downloadImage(catUrl, "random-cat.jpg")}
        >
          <Download size={15} />
        </button>
      </div>
    </div>
  );
}