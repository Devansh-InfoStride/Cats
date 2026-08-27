import { useState } from "react";
import { Film, RefreshCw, Heart, Download } from "lucide-react";
import { API_BASE, playMeowSound, downloadImage, saveFavorite } from "../../utility/utility";

export default function RandomCatGIF() {
  const [catUrl, setCatUrl] = useState(`${API_BASE}/cat/gif?ts=${Date.now()}`);
  const [loading, setLoading] = useState(false);

  const getRandomCat = () => {
    setLoading(true);
    playMeowSound(1.2);
    const newUrl = `${API_BASE}/cat/gif?ts=${Date.now()}`;
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
      <h3 style={{ marginBottom: "12px", display: "flex", alignItems: "center", justifyContent: "center", gap: "8px" }}>
        <Film size={18} style={{ color: "var(--secondary)" }} />
        <span>Animated Cat GIF</span>
      </h3>

      <div className="cat-image-container cat-image-contain" style={{ minHeight: "260px", maxHeight: "360px", borderRadius: "12px", marginBottom: "16px" }}>
        {loading ? (
          <div className="spinner"></div>
        ) : (
          <img src={catUrl} alt="Random Cat GIF" className="cat-image cat-image-contain" />
        )}
      </div>

      <div style={{ display: "flex", gap: "10px", justifyContent: "center" }}>
        <button
          type="button"
          className="btn btn-secondary"
          onClick={getRandomCat}
          disabled={loading}
        >
          <RefreshCw size={15} className={loading ? "animate-spin-slow" : ""} />
          <span>New GIF</span>
        </button>

        <button
          type="button"
          className="btn btn-outline"
          onClick={() => {
            saveFavorite({ url: catUrl, title: "Cat GIF", tags: ["gif"], type: "gif" });
            window.dispatchEvent(new Event("favorites-updated"));
          }}
        >
          <Heart size={15} />
        </button>

        <button
          type="button"
          className="btn btn-outline"
          onClick={() => downloadImage(catUrl, "cat-gif.gif")}
        >
          <Download size={15} />
        </button>
      </div>
    </div>
  );
}
