import { Link } from "react-router-dom";
import "../../styles/header/header.css";

export default function Logo() {
  return (
    <Link to="/" className="header-logo-link" title="PurrfectVerse Home">
      <div className="logo-icon-wrapper animate-float">
        <img
          src="/src/assets/cool.png"
          alt="PurrfectVerse Cat Logo"
          onError={(e) => {
            // Fallback if image fails
            (e.target as HTMLElement).style.display = "none";
          }}
        />
        <span className="logo-icon-emoji" style={{ display: "none" }}>🐱</span>
      </div>
      <div className="logo-text-group">
        <span className="logo-brand-title">
          PurrfectVerse <span>🐾</span>
        </span>
        <span className="logo-brand-subtitle">The Feline Haven</span>
      </div>
    </Link>
  );
}