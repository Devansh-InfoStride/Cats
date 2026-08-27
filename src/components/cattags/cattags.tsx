import { useState } from "react";
import { Tag, RefreshCw, Heart, Download } from "lucide-react";
import { catTags, API_BASE, playMeowSound, downloadImage, saveFavorite } from "../../utility/utility";

export default function CatTags() {
  const [selectedTag, setSelectedTag] = useState(catTags[0] || "cute");
  const [catImageSrc, setCatImageSrc] = useState(`${API_BASE}/cat/${catTags[0] || "cute"}`);
  const [loading, setLoading] = useState(false);

  const handleFetchCat = () => {
    if (!selectedTag) return;
    setLoading(true);
    playMeowSound(1.05);
    const finalUrl = `${API_BASE}/cat/${selectedTag}?ts=${Date.now()}`;
    const img = new Image();
    img.src = finalUrl;
    img.onload = () => {
      setCatImageSrc(finalUrl);
      setLoading(false);
    };
    img.onerror = () => setLoading(false);
  };

  return (
    <div className="card" style={{ maxWidth: "480px", margin: "0 auto", textAlign: "center" }}>
      <h3 style={{ marginBottom: "12px", display: "flex", alignItems: "center", justifyContent: "center", gap: "8px" }}>
        <Tag size={18} style={{ color: "var(--accent)" }} />
        <span>Tag Filter Widget</span>
      </h3>
      
      <div style={{ display: "flex", gap: "8px", marginBottom: "14px" }}>
        <select
          className="form-select"
          value={selectedTag}
          onChange={(e) => {
            setSelectedTag(e.target.value);
            const nextUrl = `${API_BASE}/cat/${e.target.value}?ts=${Date.now()}`;
            setCatImageSrc(nextUrl);
          }}
        >
          {catTags.map((tag, index) => (
            <option key={index} value={tag}>
              #{tag}
            </option>
          ))}
        </select>

        <button
          type="button"
          className="btn btn-primary"
          onClick={handleFetchCat}
          disabled={loading}
        >
          <RefreshCw size={15} className={loading ? "animate-spin-slow" : ""} />
        </button>
      </div>

      <div className="cat-image-container" style={{ minHeight: "260px", maxHeight: "360px", borderRadius: "12px", marginBottom: "16px" }}>
        {loading ? (
          <div className="spinner"></div>
        ) : (
          <img src={catImageSrc} alt={`Cat tagged ${selectedTag}`} className="cat-image" />
        )}
      </div>

      <div style={{ display: "flex", gap: "10px", justifyContent: "center" }}>
        <button
          type="button"
          className="btn btn-outline"
          onClick={() => {
            saveFavorite({ url: catImageSrc, title: `Cat #${selectedTag}`, tags: [selectedTag], type: "photo" });
            window.dispatchEvent(new Event("favorites-updated"));
          }}
        >
          <Heart size={15} />
          <span>Favorite</span>
        </button>

        <button
          type="button"
          className="btn btn-outline"
          onClick={() => downloadImage(catImageSrc, `cat-${selectedTag}.jpg`)}
        >
          <Download size={15} />
        </button>
      </div>
    </div>
  );
}
