import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import {
  Tag,
  RefreshCw,
  Heart,
  Download,
  Copy,
  Maximize2,
  Search,
} from "lucide-react";
import confetti from "canvas-confetti";
import {
  API_BASE,
  getCacheBuster,
  catTagCategories,
  catTags,
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

export default function CatTagsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialTag = searchParams.get("tag") || "cute";

  const [selectedTag, setSelectedTag] = useState(initialTag);
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [featuredUrl, setFeaturedUrl] = useState(`${API_BASE}/cat/${initialTag}`);
  const [loadingFeatured, setLoadingFeatured] = useState(false);
  const [galleryCats, setGalleryCats] = useState(() =>
    Array.from({ length: 8 }, (_, i) => ({
      id: `cat_${initialTag}_${i}`,
      url: `${API_BASE}/cat/${initialTag}?stream_init=${i}`,
      tags: [initialTag],
    }))
  );
  const [loadingGallery, setLoadingGallery] = useState(false);
  const [modalImage, setModalImage] = useState(null);
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const fetchTaggedCats = async (tag) => {
    setSelectedTag(tag);
    setSearchParams({ tag });
    playMeowSound(1.05);

    // 1. Featured single cat
    setLoadingFeatured(true);
    const newFeaturedUrl = `${API_BASE}/cat/${tag}?ts=${getCacheBuster()}`;
    const img = new Image();
    img.src = newFeaturedUrl;
    img.onload = () => {
      setFeaturedUrl(newFeaturedUrl);
      setLoadingFeatured(false);
    };
    img.onerror = () => {
      setFeaturedUrl(`${API_BASE}/cat?ts=${getCacheBuster()}`);
      setLoadingFeatured(false);
    };

    // 2. Fetch gallery cats from API
    setLoadingGallery(true);
    try {
      const res = await fetch(`${API_BASE}/api/cats?tags=${encodeURIComponent(tag)}&limit=12`);
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data) && data.length > 0) {
          setGalleryCats(data.map((c) => ({
            id: c.id || c._id,
            url: `${API_BASE}/cat/${c.id || c._id}`,
            tags: c.tags || [tag],
          })));
        } else {
          // Fallback to generated items if API returns empty
          const fallback = Array.from({ length: 8 }, (_, i) => ({
            id: `cat_${tag}_${i}`,
            url: `${API_BASE}/cat/${tag}?tag_ts=${Date.now()}_${i}`,
            tags: [tag],
          }));
          setGalleryCats(fallback);
        }
      } else {
        throw new Error("Failed to fetch");
      }
    } catch {
      const fallback = Array.from({ length: 8 }, (_, i) => ({
        id: `cat_${tag}_${i}`,
        url: `${API_BASE}/cat/${tag}?tag_ts=${Date.now()}_${i}`,
        tags: [tag],
      }));
      setGalleryCats(fallback);
    } finally {
      setLoadingGallery(false);
    }
  };

  const handleTagClick = (tag) => {
    fetchTaggedCats(tag);
  };

  // Filter tags list by category and search
  let availableTags = catTags;
  if (activeCategory === "moods") availableTags = catTagCategories.moods;
  else if (activeCategory === "appearances") availableTags = catTagCategories.appearances;
  else if (activeCategory === "accessories") availableTags = catTagCategories.accessories;
  else if (activeCategory === "actions") availableTags = catTagCategories.actions;

  if (searchQuery.trim()) {
    availableTags = availableTags.filter((t) =>
      t.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }

  const isFeaturedFav = isFavorite(featuredUrl);

  const handleToggleFavorite = (url, tag) => {
    if (isFavorite(url)) {
      removeFavorite(url);
      showToast("Removed from favorites");
    } else {
      saveFavorite({
        url,
        title: `Cat tagged #${tag}`,
        tags: [tag],
        type: "photo",
      });
      playPurrSound();
      confetti({
        particleCount: 35,
        spread: 50,
        origin: { y: 0.6 },
      });
      showToast(`Added #${tag} cat to favorites! ❤️`);
    }
    window.dispatchEvent(new Event("favorites-updated"));
  };

  return (
    <div className="page-container animate-fade-in">
      <Toast message={toastMessage} onClose={() => setToastMessage(null)} />

      {modalImage && (
        <ImageModal
          imageUrl={modalImage}
          title={`Cat #${selectedTag}`}
          tags={[selectedTag]}
          onClose={() => setModalImage(null)}
          onToast={showToast}
        />
      )}

      {/* Page Header */}
      <div className="page-header">
        <span className="badge badge-pink">
          <Tag size={14} /> Curated Taxonomy
        </span>
        <h1>Cat Tag &amp; Mood Explorer 🏷️</h1>
        <p>
          Find cats matching your exact vibe: playful antics, orange fluffballs, cozy loafs, grumpy faces, and silly hats.
        </p>
      </div>

      {/* Category Tabs & Search Bar */}
      <div className="card" style={{ marginBottom: "28px" }}>
        <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: "16px", marginBottom: "16px" }}>
          {/* Category Tabs */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
            {[
              { id: "all", label: "🌟 All Tags" },
              { id: "moods", label: "😸 Moods & Smiles" },
              { id: "appearances", label: "🎨 Colors & Coats" },
              { id: "accessories", label: "🎩 Costumes & Items" },
              { id: "actions", label: "🍞 Loafs & Zoomies" },
            ].map((cat) => (
              <button
                key={cat.id}
                type="button"
                className={`tag-pill-btn ${activeCategory === cat.id ? "active" : ""}`}
                onClick={() => setActiveCategory(cat.id)}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Quick Tag Filter Input */}
          <div style={{ position: "relative", minWidth: "220px" }}>
            <input
              type="text"
              className="form-input"
              placeholder="Filter tags..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{ paddingLeft: "34px", height: "38px" }}
            />
            <Search size={15} style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", color: "var(--text-light)" }} />
          </div>
        </div>

        {/* Tag Pills List */}
        <div className="tag-pills-row">
          {availableTags.map((tag) => (
            <button
              key={tag}
              type="button"
              className={`tag-pill-btn ${selectedTag === tag ? "active" : ""}`}
              onClick={() => handleTagClick(tag)}
            >
              #{tag}
            </button>
          ))}
          {searchQuery && !availableTags.includes(searchQuery.toLowerCase()) && (
            <button
              type="button"
              className="tag-pill-btn active"
              onClick={() => handleTagClick(searchQuery.toLowerCase().trim())}
            >
              Search #{searchQuery.toLowerCase().trim()}
            </button>
          )}
        </div>
      </div>

      {/* Featured Tag Spotlight */}
      <div className="cat-display-card" style={{ marginBottom: "48px" }}>
        <div className="cat-image-container">
          {loadingFeatured ? (
            <div className="skeleton-loader">
              <div className="spinner"></div>
              <span>Searching for #{selectedTag} cat...</span>
            </div>
          ) : (
            <>
              <img
                src={featuredUrl}
                alt={`Cat tagged ${selectedTag}`}
                className="cat-image"
                onClick={() => setModalImage(featuredUrl)}
                style={{ cursor: "zoom-in" }}
              />
              <div className="cat-image-overlay-tags">
                <span className="badge badge-orange">FEATURED</span>
                <span className="badge badge-purple">#{selectedTag.toUpperCase()}</span>
              </div>
              <div className="cat-image-overlay-actions">
                <button
                  type="button"
                  className="btn-icon"
                  onClick={() => setModalImage(featuredUrl)}
                  title="Expand Image"
                >
                  <Maximize2 size={16} />
                </button>
              </div>
            </>
          )}
        </div>

        <div className="cat-controls-bar">
          <div className="cat-controls-group">
            <button
              type="button"
              className={`btn ${isFeaturedFav ? "btn-accent" : "btn-outline"}`}
              onClick={() => handleToggleFavorite(featuredUrl, selectedTag)}
              disabled={loadingFeatured}
            >
              <Heart size={16} style={{ fill: isFeaturedFav ? "currentColor" : "none" }} />
              <span>{isFeaturedFav ? "Favorited" : "Favorite"}</span>
            </button>

            <button
              type="button"
              className="btn btn-outline"
              onClick={async () => {
                await copyToClipboard(featuredUrl);
                showToast("Image link copied to clipboard! 📋");
              }}
              disabled={loadingFeatured}
            >
              <Copy size={16} />
              <span>Copy Link</span>
            </button>
          </div>

          <div className="cat-controls-group">
            <button
              type="button"
              className="btn btn-outline"
              onClick={() => {
                downloadImage(featuredUrl, `cat-${selectedTag}-${Date.now()}.jpg`);
                showToast("Downloading cat photo! 🐾");
              }}
              disabled={loadingFeatured}
            >
              <Download size={16} />
              <span>Download</span>
            </button>

            <button
              type="button"
              className="btn btn-primary btn-lg"
              onClick={() => fetchTaggedCats(selectedTag)}
              disabled={loadingFeatured}
            >
              <RefreshCw size={18} className={loadingFeatured ? "animate-spin-slow" : ""} />
              <span>New #{selectedTag} Cat</span>
            </button>
          </div>
        </div>
      </div>

      {/* Tagged Cats Gallery Grid */}
      <div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "20px" }}>
          <div>
            <h2 style={{ fontSize: "1.5rem" }}>
              More Cats with Tag <span className="gradient-text">#{selectedTag}</span>
            </h2>
            <p style={{ fontSize: "0.9rem" }}>Browse matching cats from the catalog.</p>
          </div>

          <button
            type="button"
            className="btn btn-outline btn-sm"
            onClick={() => fetchTaggedCats(selectedTag)}
          >
            <RefreshCw size={14} />
            <span>Refresh Gallery</span>
          </button>
        </div>

        {loadingGallery ? (
          <div className="skeleton-loader" style={{ height: "300px", borderRadius: "16px" }}>
            <div className="spinner"></div>
            <span>Fetching #{selectedTag} collection...</span>
          </div>
        ) : (
          <div className="cats-gallery-grid">
            {galleryCats.map((cat, idx) => {
              const isFav = isFavorite(cat.url);
              return (
                <div key={cat.id || idx} className="gallery-card">
                  <div className="gallery-image-box">
                    <img
                      src={cat.url}
                      alt={`Cat #${selectedTag}`}
                      className="gallery-image"
                      loading="lazy"
                      onClick={() => setModalImage(cat.url)}
                      style={{ cursor: "zoom-in" }}
                    />
                    <div style={{ position: "absolute", top: "8px", left: "8px" }}>
                      <span className="badge badge-orange" style={{ fontSize: "0.7rem", padding: "2px 8px" }}>
                        #{selectedTag}
                      </span>
                    </div>
                  </div>

                  <div className="gallery-card-footer">
                    <button
                      type="button"
                      className="btn btn-sm btn-outline"
                      onClick={() => setModalImage(cat.url)}
                    >
                      <Maximize2 size={13} />
                      <span>Zoom</span>
                    </button>

                    <div style={{ display: "flex", gap: "6px" }}>
                      <button
                        type="button"
                        className={`btn-icon ${isFav ? "favorited" : ""}`}
                        style={{ width: "32px", height: "32px" }}
                        onClick={() => handleToggleFavorite(cat.url, selectedTag)}
                        title="Favorite"
                      >
                        <Heart size={14} style={{ fill: isFav ? "currentColor" : "none" }} />
                      </button>
                      <button
                        type="button"
                        className="btn-icon"
                        style={{ width: "32px", height: "32px" }}
                        onClick={() => {
                          downloadImage(cat.url, `cat-${selectedTag}-${idx + 1}.jpg`);
                          showToast("Downloading cat! 🐾");
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
        )}
      </div>
    </div>
  );
}
