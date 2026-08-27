import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Search, Sparkles, Tag, Film, Image as ImageIcon } from "lucide-react";
import { catTags } from "../../utility/utility";

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const searchRef = useRef<HTMLDivElement>(null);

  // Filter tag suggestions based on user query
  const filteredTags = query.trim()
    ? catTags.filter((t) => t.toLowerCase().includes(query.toLowerCase())).slice(0, 4)
    : [];

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    const term = query.trim().toLowerCase();
    setIsOpen(false);
    
    // Check specific navigation shortcuts
    if (term.includes("gif") || term.includes("animation")) {
      navigate("/gifs");
    } else if (term.includes("meme") || term.includes("says") || term.includes("text")) {
      navigate("/meme-generator");
    } else if (term.includes("fact") || term.includes("breed") || term.includes("trivia")) {
      navigate("/facts");
    } else if (term.includes("fav") || term.includes("save")) {
      navigate("/favorites");
    } else {
      navigate(`/tags?tag=${encodeURIComponent(term)}`);
    }
  };

  const handleSelectSuggestion = (path: string) => {
    navigate(path);
    setQuery("");
    setIsOpen(false);
  };

  // Close search suggestions on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="search-bar-container" ref={searchRef}>
      <form className="search-bar-form" onSubmit={handleSearchSubmit}>
        <input
          type="text"
          className="search-bar-input"
          placeholder="Search tags, memes, GIFs..."
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
        />
        <button type="submit" className="search-bar-icon-btn" title="Search">
          <Search size={16} />
        </button>
      </form>

      {isOpen && query.trim().length > 0 && (
        <div className="search-suggestions-popup animate-fade-in">
          <div className="search-suggestions-title">Matching Cat Tags</div>
          {filteredTags.length > 0 ? (
            filteredTags.map((tag) => (
              <div
                key={tag}
                className="search-suggestion-item"
                onClick={() => handleSelectSuggestion(`/tags?tag=${tag}`)}
              >
                <span style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                  <Tag size={13} style={{ color: "var(--primary)" }} /> #{tag}
                </span>
                <span style={{ fontSize: "0.75rem", color: "var(--text-light)" }}>Explore</span>
              </div>
            ))
          ) : (
            <div
              className="search-suggestion-item"
              onClick={() => handleSelectSuggestion(`/tags?tag=${encodeURIComponent(query.trim())}`)}
            >
              <span>Search &ldquo;{query}&rdquo; in tags</span>
              <Sparkles size={13} style={{ color: "var(--primary)" }} />
            </div>
          )}

          <div className="search-suggestions-title" style={{ marginTop: "8px" }}>
            Quick Destinations
          </div>
          <div
            className="search-suggestion-item"
            onClick={() => handleSelectSuggestion("/gifs")}
          >
            <span style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              <Film size={13} /> Animated Cat GIFs
            </span>
          </div>
          <div
            className="search-suggestion-item"
            onClick={() => handleSelectSuggestion("/photos")}
          >
            <span style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              <ImageIcon size={13} /> Random Cat Photos
            </span>
          </div>
        </div>
      )}
    </div>
  );
}