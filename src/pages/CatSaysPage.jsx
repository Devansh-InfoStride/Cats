import { useState, useRef } from "react";
import {
  MessageSquare,
  RefreshCw,
  Download,
  Copy,
  Heart,
  Sparkles,
  Film,
  Image as ImageIcon,
} from "lucide-react";
import confetti from "canvas-confetti";
import {
  API_BASE,
  memePresets,
  playMeowSound,
  playPurrSound,
  copyToClipboard,
  saveFavorite,
} from "../utility/utility";
import Toast from "../components/toast/toast";

export default function CatSaysPage() {
  const [topText, setTopText] = useState("I DID NOT KNOCK IT OVER");
  const [bottomText, setBottomText] = useState("GRAVITY TESTED IT");
  const [fontSize, setFontSize] = useState(32);
  const [fontColor, setFontColor] = useState("#ffffff");
  const [textPosition, setTextPosition] = useState("dual");
  const [bgType, setBgType] = useState("photo");
  const [bgUrl, setBgUrl] = useState(`${API_BASE}/cat`);
  const [loading, setLoading] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  const previewImageRef = useRef(null);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const fetchNewBg = (type = bgType) => {
    setLoading(true);
    playMeowSound(1.1);
    const newUrl = type === "gif"
      ? `${API_BASE}/cat/gif?meme_ts=${Date.now()}`
      : `${API_BASE}/cat?meme_ts=${Date.now()}`;

    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = newUrl;
    img.onload = () => {
      setBgUrl(newUrl);
      setLoading(false);
    };
    img.onerror = () => {
      setLoading(false);
      showToast("Background failed to load, trying again...");
    };
  };

  const handleApplyPreset = (preset) => {
    const parts = preset.split("... ");
    if (parts.length > 1) {
      setTopText(parts[0].toUpperCase());
      setBottomText(parts[1].toUpperCase());
      setTextPosition("dual");
    } else {
      setTopText("");
      setBottomText(preset.toUpperCase());
      setTextPosition("bottom");
    }
    playPurrSound();
  };

  // Download Meme using HTML5 Canvas
  const handleDownloadMeme = () => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = bgUrl;
    img.onload = () => {
      canvas.width = img.naturalWidth || 800;
      canvas.height = img.naturalHeight || 600;

      // Draw background
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

      // Setup typography
      const scale = canvas.width / 600;
      const effectiveFontSize = Math.max(24, Math.round(fontSize * scale));
      ctx.font = `900 ${effectiveFontSize}px 'Fredoka', 'Impact', sans-serif`;
      ctx.textAlign = "center";
      ctx.fillStyle = fontColor;
      ctx.strokeStyle = "#000000";
      ctx.lineWidth = Math.max(4, Math.round(6 * scale));
      ctx.lineJoin = "round";

      // Draw captions
      if (textPosition === "dual" || textPosition === "top") {
        if (topText.trim()) {
          const y = effectiveFontSize + 20;
          ctx.strokeText(topText.toUpperCase(), canvas.width / 2, y);
          ctx.fillText(topText.toUpperCase(), canvas.width / 2, y);
        }
      }

      if (textPosition === "dual" || textPosition === "bottom") {
        if (bottomText.trim()) {
          const y = canvas.height - 24;
          ctx.strokeText(bottomText.toUpperCase(), canvas.width / 2, y);
          ctx.fillText(bottomText.toUpperCase(), canvas.width / 2, y);
        }
      }

      if (textPosition === "center") {
        const textToDraw = topText || bottomText;
        if (textToDraw.trim()) {
          const y = canvas.height / 2;
          ctx.strokeText(textToDraw.toUpperCase(), canvas.width / 2, y);
          ctx.fillText(textToDraw.toUpperCase(), canvas.width / 2, y);
        }
      }

      // Convert to download link
      try {
        const dataUrl = canvas.toDataURL("image/jpeg", 0.95);
        const link = document.createElement("a");
        link.download = `purrfect-meme-${Date.now()}.jpg`;
        link.href = dataUrl;
        link.click();

        confetti({
          particleCount: 60,
          spread: 70,
          origin: { y: 0.7 },
        });
        showToast("Meme downloaded successfully! 🎉");
      } catch {
        showToast("Downloaded original template image!");
      }
    };
  };

  const handleSaveMemeFavorite = () => {
    saveFavorite({
      url: bgUrl,
      title: `Meme: ${topText || bottomText}`,
      tags: ["meme", "custom", bgType],
      type: "meme",
    });
    playPurrSound();
    confetti({
      particleCount: 40,
      spread: 50,
      origin: { y: 0.6 },
    });
    showToast("Meme saved to your favorites! ❤️");
    window.dispatchEvent(new Event("favorites-updated"));
  };

  const colors = [
    { label: "White", val: "#ffffff" },
    { label: "Yellow", val: "#facc15" },
    { label: "Neon Green", val: "#4ade80" },
    { label: "Hot Pink", val: "#f472b6" },
    { label: "Cyan", val: "#38bdf8" },
    { label: "Orange", val: "#fb923c" },
    { label: "Red", val: "#ef4444" },
    { label: "Black", val: "#18181b" },
  ];

  return (
    <div className="page-container animate-fade-in">
      <Toast message={toastMessage} onClose={() => setToastMessage(null)} />

      {/* Page Header */}
      <div className="page-header">
        <span className="badge badge-orange">
          <MessageSquare size={14} /> Viral Meme Studio
        </span>
        <h1>Cat Meme &amp; Says Creator 🎨</h1>
        <p>
          Express feline thoughts and humor. Add custom typography, choose color palettes, pick funny preset cat quotes, and export your memes.
        </p>
      </div>

      {/* Studio Layout Grid */}
      <div className="meme-studio-layout">
        {/* Left Side: Live Preview Stage */}
        <div className="meme-preview-card">
          <div className="meme-canvas-wrapper">
            {loading ? (
              <div className="skeleton-loader">
                <div className="spinner"></div>
                <span>Preparing your meme canvas...</span>
              </div>
            ) : (
              <>
                <img
                  ref={previewImageRef}
                  src={bgUrl}
                  alt="Cat Meme Template"
                  className="meme-image"
                />

                {/* Top Caption Overlay */}
                {(textPosition === "dual" || textPosition === "top") && topText.trim() && (
                  <div
                    className="meme-caption-overlay meme-caption-top"
                    style={{
                      fontSize: `${fontSize}px`,
                      color: fontColor,
                      textShadow:
                        "2px 2px 0 #000, -2px -2px 0 #000, 2px -2px 0 #000, -2px 2px 0 #000, 0 4px 8px rgba(0,0,0,0.8)",
                    }}
                  >
                    {topText}
                  </div>
                )}

                {/* Center Caption Overlay */}
                {textPosition === "center" && (topText || bottomText).trim() && (
                  <div
                    className="meme-caption-overlay meme-caption-center"
                    style={{
                      fontSize: `${fontSize}px`,
                      color: fontColor,
                      textShadow:
                        "2px 2px 0 #000, -2px -2px 0 #000, 2px -2px 0 #000, -2px 2px 0 #000, 0 4px 8px rgba(0,0,0,0.8)",
                    }}
                  >
                    {topText || bottomText}
                  </div>
                )}

                {/* Bottom Caption Overlay */}
                {(textPosition === "dual" || textPosition === "bottom") && bottomText.trim() && (
                  <div
                    className="meme-caption-overlay meme-caption-bottom"
                    style={{
                      fontSize: `${fontSize}px`,
                      color: fontColor,
                      textShadow:
                        "2px 2px 0 #000, -2px -2px 0 #000, 2px -2px 0 #000, -2px 2px 0 #000, 0 4px 8px rgba(0,0,0,0.8)",
                    }}
                  >
                    {bottomText}
                  </div>
                )}
              </>
            )}
          </div>

          {/* Quick Canvas Actions */}
          <div className="cat-controls-bar">
            <div className="cat-controls-group">
              <button
                type="button"
                className="btn btn-outline btn-sm"
                onClick={handleSaveMemeFavorite}
                disabled={loading}
              >
                <Heart size={15} />
                <span>Save Meme</span>
              </button>
              <button
                type="button"
                className="btn btn-outline btn-sm"
                onClick={async () => {
                  await copyToClipboard(bgUrl);
                  showToast("Image template link copied! 📋");
                }}
                disabled={loading}
              >
                <Copy size={15} />
                <span>Copy Link</span>
              </button>
            </div>

            <div className="cat-controls-group">
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleDownloadMeme}
                disabled={loading}
              >
                <Download size={16} />
                <span>Export Meme</span>
              </button>
            </div>
          </div>
        </div>

        {/* Right Side: Controls & Customization Panel */}
        <div className="meme-controls-panel">
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <h3 style={{ fontSize: "1.25rem", display: "flex", alignItems: "center", gap: "8px" }}>
              <Sparkles size={18} style={{ color: "var(--primary)" }} />
              <span>Customize Captions</span>
            </h3>

            {/* Switch Background Image vs GIF */}
            <div style={{ display: "flex", gap: "6px" }}>
              <button
                type="button"
                className={`btn btn-sm ${bgType === "photo" ? "btn-secondary" : "btn-outline"}`}
                onClick={() => {
                  setBgType("photo");
                  fetchNewBg("photo");
                }}
              >
                <ImageIcon size={14} /> Photo
              </button>
              <button
                type="button"
                className={`btn btn-sm ${bgType === "gif" ? "btn-secondary" : "btn-outline"}`}
                onClick={() => {
                  setBgType("gif");
                  fetchNewBg("gif");
                }}
              >
                <Film size={14} /> GIF
              </button>
            </div>
          </div>

          {/* Top Caption Input */}
          <div className="form-group">
            <label className="form-label">Top Caption Text</label>
            <input
              type="text"
              className="form-input"
              placeholder="e.g. I DID NOT KNOCK IT OVER"
              value={topText}
              onChange={(e) => setTopText(e.target.value)}
            />
          </div>

          {/* Bottom Caption Input */}
          <div className="form-group">
            <label className="form-label">Bottom Caption Text</label>
            <input
              type="text"
              className="form-input"
              placeholder="e.g. GRAVITY TESTED IT"
              value={bottomText}
              onChange={(e) => setBottomText(e.target.value)}
            />
          </div>

          {/* Text Position Selector */}
          <div className="form-group">
            <label className="form-label">Text Layout</label>
            <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
              {[
                { id: "dual", label: "Top & Bottom" },
                { id: "top", label: "Top Only" },
                { id: "bottom", label: "Bottom Only" },
                { id: "center", label: "Center" },
              ].map((pos) => (
                <button
                  key={pos.id}
                  type="button"
                  className={`btn btn-sm ${textPosition === pos.id ? "btn-primary" : "btn-outline"}`}
                  onClick={() => setTextPosition(pos.id)}
                >
                  {pos.label}
                </button>
              ))}
            </div>
          </div>

          {/* Font Size Slider */}
          <div className="form-group">
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <label className="form-label">Font Size: {fontSize}px</label>
            </div>
            <input
              type="range"
              min="20"
              max="56"
              value={fontSize}
              onChange={(e) => setFontSize(Number(e.target.value))}
              style={{ width: "100%", accentColor: "var(--primary)" }}
            />
          </div>

          {/* Font Color Swatches */}
          <div className="form-group">
            <label className="form-label">Text Color</label>
            <div className="color-swatches">
              {colors.map((c) => (
                <div
                  key={c.val}
                  className={`color-swatch ${fontColor === c.val ? "active" : ""}`}
                  style={{ backgroundColor: c.val }}
                  onClick={() => setFontColor(c.val)}
                  title={c.label}
                />
              ))}
            </div>
          </div>

          {/* Preset Viral Quotes */}
          <div className="form-group">
            <label className="form-label">Funny Cat Meme Presets (Click to apply)</label>
            <div className="meme-preset-chips">
              {memePresets.map((preset, idx) => (
                <button
                  key={idx}
                  type="button"
                  className="preset-chip"
                  onClick={() => handleApplyPreset(preset)}
                >
                  &ldquo;{preset}&rdquo;
                </button>
              ))}
            </div>
          </div>

          {/* New Background Button */}
          <div style={{ marginTop: "10px" }}>
            <button
              type="button"
              className="btn btn-outline-primary"
              onClick={() => fetchNewBg(bgType)}
              disabled={loading}
              style={{ width: "100%" }}
            >
              <RefreshCw size={16} className={loading ? "animate-spin-slow" : ""} />
              <span>Fetch Another Cat Background</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
