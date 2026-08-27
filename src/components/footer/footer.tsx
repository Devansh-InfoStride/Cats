import { useState } from "react";
import { Link } from "react-router-dom";
import { Heart, ArrowUp, Send, Check } from "lucide-react";
import confetti from "canvas-confetti";
import { catFacts, playPurrSound, playMeowSound } from "../../utility/utility";

export default function Footer() {
  const [randomFactIndex, setRandomFactIndex] = useState(0);
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const currentFact = catFacts[randomFactIndex] || catFacts[0];

  const handleShuffleQuote = () => {
    const nextIdx = (randomFactIndex + 1) % catFacts.length;
    setRandomFactIndex(nextIdx);
    playPurrSound();
  };

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSubscribed(true);
    playMeowSound(1.2);
    confetti({
      particleCount: 80,
      spread: 60,
      origin: { y: 0.85 }
    });
    setTimeout(() => {
      setEmail("");
    }, 4000);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <div className="footer-grid">
          {/* Brand Info Column */}
          <div className="footer-brand-col">
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <span style={{ fontSize: "28px" }}>🐾</span>
              <span className="logo-brand-title" style={{ fontSize: "1.4rem" }}>
                PurrfectVerse
              </span>
            </div>
            <p style={{ fontSize: "0.92rem", lineHeight: "1.6" }}>
              The digital sanctuary for feline lovers worldwide. Discover adorable high-resolution cat photography, animated GIFs, viral meme creators, and fascinating cat trivia.
            </p>

            <div className="footer-quote-box">
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <span style={{ fontSize: "0.8rem", fontWeight: "700", color: "var(--primary)" }}>
                  Cat Fact of the Moment {currentFact.icon}
                </span>
                <button
                  type="button"
                  onClick={handleShuffleQuote}
                  style={{ fontSize: "0.75rem", color: "var(--primary)", fontWeight: "600", cursor: "pointer" }}
                  title="Next random fact"
                >
                  Shuffle 🔄
                </button>
              </div>
              <p className="footer-quote-text">&ldquo;{currentFact.fact}&rdquo;</p>
            </div>
          </div>

          {/* Explore Links */}
          <div className="footer-nav-col">
            <h4 className="footer-nav-title">Explore Hub</h4>
            <ul className="footer-links-list">
              <li><Link to="/" className="footer-link">Home Sanctuary</Link></li>
              <li><Link to="/photos" className="footer-link">Random Cat Photos</Link></li>
              <li><Link to="/gifs" className="footer-link">Animated GIFs</Link></li>
              <li><Link to="/tags" className="footer-link">Tag Explorer</Link></li>
              <li><Link to="/meme-generator" className="footer-link">Cat Meme Studio</Link></li>
              <li><Link to="/favorites" className="footer-link">Saved Collection</Link></li>
            </ul>
          </div>

          {/* Feline Science & Guides */}
          <div className="footer-nav-col">
            <h4 className="footer-nav-title">Cat Knowledge</h4>
            <ul className="footer-links-list">
              <li><Link to="/facts" className="footer-link">Cat Breeds Guide</Link></li>
              <li><Link to="/facts" className="footer-link">Body Language 101</Link></li>
              <li><Link to="/facts" className="footer-link">Feline Trivia</Link></li>
              <li><Link to="/about" className="footer-link">About Project</Link></li>
              <li><Link to="/about" className="footer-link">Contact & Feedback</Link></li>
            </ul>
          </div>

          {/* Purr Club Newsletter */}
          <div className="footer-nav-col">
            <h4 className="footer-nav-title">Join Purr Club VIP 💌</h4>
            <p style={{ fontSize: "0.88rem" }}>
              Get weekly doses of curated cat memes, cute wallpapers, and feline science directly to your inbox.
            </p>
            {subscribed ? (
              <div style={{ display: "flex", alignItems: "center", gap: "8px", color: "var(--emerald)", fontWeight: "600", fontSize: "0.9rem", padding: "8px 0" }}>
                <Check size={18} /> You are now subscribed! Meow! 🎉
              </div>
            ) : (
              <form onSubmit={handleSubscribe} style={{ display: "flex", gap: "6px" }}>
                <input
                  type="email"
                  placeholder="kitty@example.com"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="form-input"
                  style={{ fontSize: "0.85rem", padding: "8px 12px" }}
                />
                <button type="submit" className="btn btn-primary btn-sm" title="Subscribe">
                  <Send size={14} />
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Footer Bottom Strip */}
        <div className="footer-bottom">
          <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            <span>Made with</span>
            <Heart size={14} style={{ color: "#ef4444", fill: "#ef4444" }} />
            <span>for cat lovers everywhere. Powered by</span>
            <a href="https://cataas.com" target="_blank" rel="noreferrer" style={{ fontWeight: "700" }}>
              CATAAS API
            </a>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <button
              type="button"
              onClick={scrollToTop}
              className="btn btn-outline btn-sm"
              style={{ display: "flex", alignItems: "center", gap: "6px" }}
            >
              <ArrowUp size={14} /> Back to top
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
