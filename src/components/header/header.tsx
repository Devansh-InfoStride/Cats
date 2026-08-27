import { useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { Menu, X, Volume2, Sparkles } from "lucide-react";
import "../../styles/header/header.css";
import Logo from "../logo/logo";
import Dropdown from "../dropdown/dropdown";
import SearchBar from "../searchbar/searchbar";
import { navLinks, playMeowSound, getFavorites } from "../../utility/utility";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [favCount, setFavCount] = useState(0);
  const location = useLocation();

  // Close mobile drawer on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  // Update favorites count
  useEffect(() => {
    const updateFavs = () => {
      const favs = getFavorites();
      setFavCount(favs.length);
    };

    updateFavs();
    window.addEventListener("storage", updateFavs);
    // Custom event for immediate UI update within same window
    window.addEventListener("favorites-updated", updateFavs);
    return () => {
      window.removeEventListener("storage", updateFavs);
      window.removeEventListener("favorites-updated", updateFavs);
    };
  }, []);

  const handleMeowClick = () => {
    // Randomize pitch slightly for fun variation
    const pitch = 0.85 + Math.random() * 0.4;
    playMeowSound(pitch);
  };

  return (
    <div className="header-wrapper">
      <header className="header">
        {/* Brand Logo */}
        <Logo />

        {/* Desktop Navigation Links */}
        <nav className="header-nav" aria-label="Main Navigation">
          <ul className="header-nav-list">
            {navLinks.map((link) => (
              <li key={link.id} className="header-nav-item">
                <NavLink
                  to={link.path}
                  end={link.path === "/"}
                  className={({ isActive }) =>
                    `header-nav-link ${isActive ? "active" : ""}`
                  }
                >
                  {link.name}
                  {link.path === "/favorites" && favCount > 0 && (
                    <span className="nav-badge-count" title={`${favCount} saved items`}>
                      {favCount}
                    </span>
                  )}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        {/* Right Section: Search, Meow Audio Button, Dropdown, Mobile Toggle */}
        <div className="header-actions">
          {/* Quick Search */}
          <SearchBar />

          {/* Interactive Synthesized Meow Button */}
          <button
            type="button"
            className="btn-meow-sound"
            onClick={handleMeowClick}
            title="Click to hear a cute meow!"
          >
            <Volume2 size={16} />
            <span>Meow!</span>
          </button>

          {/* Quick Jump Dropdown */}
          <Dropdown />

          {/* Mobile Menu Hamburger Toggle */}
          <button
            type="button"
            className="mobile-menu-toggle"
            onClick={() => setMobileMenuOpen(true)}
            aria-label="Open Navigation Menu"
          >
            <Menu size={20} />
          </button>
        </div>
      </header>

      {/* Mobile Slide-in Drawer */}
      <div
        className={`mobile-nav-drawer ${mobileMenuOpen ? "open" : ""}`}
        onClick={() => setMobileMenuOpen(false)}
      >
        <div
          className="mobile-nav-content"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="mobile-nav-header">
            <div style={{ display: "flex", alignItems: "center", gap: "8px", fontWeight: "700" }}>
              <Sparkles size={18} style={{ color: "var(--primary)" }} />
              <span>PurrfectVerse Menu</span>
            </div>
            <button
              type="button"
              className="btn-icon"
              onClick={() => setMobileMenuOpen(false)}
              aria-label="Close Menu"
            >
              <X size={18} />
            </button>
          </div>

          <ul className="mobile-nav-list">
            {navLinks.map((link) => (
              <li key={link.id}>
                <NavLink
                  to={link.path}
                  end={link.path === "/"}
                  className={({ isActive }) =>
                    `mobile-nav-link ${isActive ? "active" : ""}`
                  }
                >
                  <span>{link.name}</span>
                  {link.path === "/favorites" && favCount > 0 && (
                    <span className="nav-badge-count">{favCount}</span>
                  )}
                </NavLink>
              </li>
            ))}
          </ul>

          <div style={{ marginTop: "auto", display: "flex", flexDirection: "column", gap: "10px" }}>
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleMeowClick}
              style={{ width: "100%" }}
            >
              <Volume2 size={16} /> Play Meow Sound 🐾
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
