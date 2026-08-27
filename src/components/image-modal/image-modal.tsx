import { useEffect } from "react";
import { X, Download, Copy, Heart, ExternalLink } from "lucide-react";
import { downloadImage, copyToClipboard, saveFavorite, removeFavorite, isFavorite } from "../../utility/utility";

interface ImageModalProps {
  imageUrl: string;
  title?: string;
  tags?: string[];
  type?: "photo" | "gif" | "meme";
  onClose: () => void;
  onToast?: (msg: string) => void;
}

export default function ImageModal({
  imageUrl,
  title = "Cute Cat",
  tags = [],
  type = "photo",
  onClose,
  onToast,
}: ImageModalProps) {
  const favorited = isFavorite(imageUrl);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  const handleCopy = async () => {
    await copyToClipboard(imageUrl);
    if (onToast) onToast("Cat image link copied to clipboard! 📋");
  };

  const handleDownload = () => {
    downloadImage(imageUrl, `purrfect-cat-${Date.now()}.${type === "gif" ? "gif" : "jpg"}`);
    if (onToast) onToast("Downloading cat image! 🐾");
  };

  const handleToggleFavorite = () => {
    if (favorited) {
      removeFavorite(imageUrl);
      if (onToast) onToast("Removed from favorites");
    } else {
      saveFavorite({
        url: imageUrl,
        title,
        tags,
        type,
      });
      if (onToast) onToast("Added to your favorites! ❤️");
    }
    // Trigger update event
    window.dispatchEvent(new Event("favorites-updated"));
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <span style={{ fontSize: "20px" }}>🐱</span>
            <h3 style={{ fontSize: "1.2rem", margin: 0 }}>{title}</h3>
          </div>
          <button
            type="button"
            className="btn-icon"
            onClick={onClose}
            aria-label="Close Lightbox"
          >
            <X size={18} />
          </button>
        </div>

        <div className="modal-body">
          <img
            src={imageUrl}
            alt={title}
            className="modal-image"
          />

          {tags.length > 0 && (
            <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginTop: "16px" }}>
              {tags.map((tag, idx) => (
                <span key={idx} className="badge badge-orange">
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </div>

        <div className="cat-controls-bar">
          <div className="cat-controls-group">
            <button
              type="button"
              className={`btn btn-sm ${favorited ? "btn-secondary" : "btn-outline"}`}
              onClick={handleToggleFavorite}
            >
              <Heart size={15} style={{ fill: favorited ? "currentColor" : "none" }} />
              <span>{favorited ? "Favorited" : "Favorite"}</span>
            </button>
            <button
              type="button"
              className="btn btn-outline btn-sm"
              onClick={handleCopy}
            >
              <Copy size={15} />
              <span>Copy Link</span>
            </button>
          </div>

          <div className="cat-controls-group">
            <a
              href={imageUrl}
              target="_blank"
              rel="noreferrer"
              className="btn btn-outline btn-sm"
            >
              <ExternalLink size={15} />
              <span>Open Original</span>
            </a>
            <button
              type="button"
              className="btn btn-primary btn-sm"
              onClick={handleDownload}
            >
              <Download size={15} />
              <span>Download Image</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
