import { useState } from "react";
import { MessageSquare, RefreshCw, Download } from "lucide-react";
import { API_BASE, playMeowSound, downloadImage } from "../../utility/utility";

export default function CatSays() {
  const [text, setText] = useState("Hello Human");
  const [catImageSrc, setCatImageSrc] = useState(`${API_BASE}/cat?meme_sample=1`);
  const [loading, setLoading] = useState(false);

  const handleFetchCat = () => {
    if (!text.trim()) return;
    setLoading(true);
    playMeowSound(1.1);
    const newUrl = `${API_BASE}/cat?ts=${Date.now()}`;
    const img = new Image();
    img.src = newUrl;
    img.onload = () => {
      setCatImageSrc(newUrl);
      setLoading(false);
    };
    img.onerror = () => setLoading(false);
  };

  return (
    <div className="card" style={{ maxWidth: "480px", margin: "0 auto", textAlign: "center" }}>
      <h3 style={{ marginBottom: "12px", display: "flex", alignItems: "center", justifyContent: "center", gap: "8px" }}>
        <MessageSquare size={18} style={{ color: "var(--primary)" }} />
        <span>Cat Says Quick Widget</span>
      </h3>
      
      <div style={{ display: "flex", gap: "8px", marginBottom: "14px" }}>
        <input 
          type="text" 
          className="form-input"
          placeholder="Type what the cat should say..." 
          value={text} 
          onChange={(e) => setText(e.target.value)} 
        />
        <button
          type="button"
          className="btn btn-primary"
          onClick={handleFetchCat}
          disabled={loading}
        >
          <RefreshCw size={15} className={loading ? "animate-spin-slow" : ""} />
        </button>
      </div>

      <div className="cat-image-container" style={{ minHeight: "260px", maxHeight: "360px", borderRadius: "12px", marginBottom: "16px", position: "relative" }}>
        {loading ? (
          <div className="spinner"></div>
        ) : (
          <>
            <img src={catImageSrc} alt={`Cat saying ${text}`} className="cat-image" />
            {text.trim() && (
              <div
                style={{
                  position: "absolute",
                  bottom: "16px",
                  left: "0",
                  right: "0",
                  color: "white",
                  fontSize: "22px",
                  fontWeight: "800",
                  textTransform: "uppercase",
                  textShadow: "2px 2px 0 #000, -2px -2px 0 #000, 2px -2px 0 #000, -2px 2px 0 #000",
                  padding: "0 14px",
                }}
              >
                {text}
              </div>
            )}
          </>
        )}
      </div>

      <button
        type="button"
        className="btn btn-outline"
        onClick={() => downloadImage(catImageSrc, "cat-says.jpg")}
      >
        <Download size={15} />
        <span>Download</span>
      </button>
    </div>
  );
}
