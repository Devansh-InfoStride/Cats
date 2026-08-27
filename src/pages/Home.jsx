import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Sparkles,
  Camera,
  Film,
  Tag,
  MessageSquare,
  BookOpen,
  Heart,
  Volume2,
  RefreshCw,
  ArrowRight,
  Check,
  Send,
} from "lucide-react";
import confetti from "canvas-confetti";
import "../styles/pages.css";
import {
  API_BASE,
  catFacts,
  catLanguageTips,
  catBreeds,
  playMeowSound,
  playPurrSound,
  saveFavorite,
} from "../utility/utility";
import Toast from "../components/toast/toast";
import ImageModal from "../components/image-modal/image-modal";

export default function Home() {
  const [spotlightCatUrl, setSpotlightCatUrl] = useState(`${API_BASE}/cat`);
  const [spotlightLoading, setSpotlightLoading] = useState(false);
  const [likesCount, setLikesCount] = useState(142);
  const [hasLiked, setHasLiked] = useState(false);
  const [currentFactIdx, setCurrentFactIdx] = useState(0);
  const [activeModalImage, setActiveModalImage] = useState(null);
  const [toastMessage, setToastMessage] = useState(null);
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [newsletterSent, setNewsletterSent] = useState(false);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleFetchSpotlightCat = () => {
    setSpotlightLoading(true);
    playMeowSound(1.1);
    const newUrl = `${API_BASE}/cat?ts=${Date.now()}`;
    // Preload image
    const img = new Image();
    img.src = newUrl;
    img.onload = () => {
      setSpotlightCatUrl(newUrl);
      setSpotlightLoading(false);
      setHasLiked(false);
      setLikesCount((prev) => prev + Math.floor(Math.random() * 5 + 1));
    };
    img.onerror = () => {
      setSpotlightLoading(false);
    };
  };

  const handleLikeSpotlight = () => {
    if (!hasLiked) {
      setLikesCount((prev) => prev + 1);
      setHasLiked(true);
      playPurrSound();
      confetti({
        particleCount: 40,
        spread: 50,
        origin: { y: 0.6 },
      });
      saveFavorite({
        url: spotlightCatUrl,
        title: "Spotlight Kitty",
        tags: ["spotlight", "cute"],
        type: "photo",
      });
      window.dispatchEvent(new Event("favorites-updated"));
      showToast("Spotlight Kitty saved to favorites! ❤️");
    }
  };

  const handleNextFact = () => {
    setCurrentFactIdx((prev) => (prev + 1) % catFacts.length);
    playPurrSound();
  };

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    if (!newsletterEmail.trim()) return;
    setNewsletterSent(true);
    playMeowSound(1.2);
    confetti({
      particleCount: 90,
      spread: 70,
      origin: { y: 0.8 },
    });
    setTimeout(() => {
      setNewsletterEmail("");
    }, 4000);
  };

  const currentFact = catFacts[currentFactIdx];

  return (
    <div className="home-page-container animate-fade-in">
      <Toast message={toastMessage} onClose={() => setToastMessage(null)} />

      {activeModalImage && (
        <ImageModal
          imageUrl={activeModalImage}
          title="Spotlight Cat"
          tags={["spotlight", "cute"]}
          onClose={() => setActiveModalImage(null)}
          onToast={showToast}
        />
      )}

      {/* ====================================================================
          1. HERO SECTION
          ==================================================================== */}
      <section className="hero-section">
        <div className="hero-content">
          <div className="hero-pill-badge">
            <Sparkles size={15} />
            <span>The Ultimate Feline Sanctuary</span>
          </div>

          <h1 className="hero-title">
            Where Every Day is <span className="gradient-text">Caturday</span> 🐾
          </h1>

          <p className="hero-description">
            Welcome to <strong>PurrfectVerse</strong>! Your all-in-one hub for high-definition cat photography, playful animated GIFs, custom meme creation, and fascinating feline science.
          </p>

          <div className="hero-cta-row">
            <Link to="/photos" className="btn btn-primary btn-lg">
              <Camera size={18} />
              <span>Explore Photos</span>
            </Link>
            <Link to="/meme-generator" className="btn btn-secondary btn-lg">
              <MessageSquare size={18} />
              <span>Create Meme</span>
            </Link>
            <button
              type="button"
              className="btn btn-outline"
              onClick={() => {
                playMeowSound(1.0);
                showToast("Meow! Wishing you a pawsome day! 🐱");
              }}
            >
              <Volume2 size={18} />
              <span>Meow Sound</span>
            </button>
          </div>

          <div className="hero-stats-row">
            <div className="hero-stat-item">
              <span className="hero-stat-number gradient-text">10,000+</span>
              <span className="hero-stat-label">Cats Served</span>
            </div>
            <div className="hero-stat-item">
              <span className="hero-stat-number" style={{ color: "var(--secondary)" }}>99.9%</span>
              <span className="hero-stat-label">Serotonin Boost</span>
            </div>
            <div className="hero-stat-item">
              <span className="hero-stat-number" style={{ color: "var(--accent)" }}>24/7</span>
              <span className="hero-stat-label">Purr Guarantee</span>
            </div>
          </div>
        </div>

        {/* Hero Interactive Spotlight Card */}
        <div className="hero-spotlight-card">
          <div className="spotlight-header">
            <div className="spotlight-title">
              <Sparkles size={16} />
              <span>Cat of the Moment</span>
            </div>
            <span className="badge badge-orange">Live Stream</span>
          </div>

          <div className="spotlight-image-box">
            {spotlightLoading ? (
              <div className="skeleton-loader">
                <div className="spinner"></div>
                <span>Summoning a majestic cat...</span>
              </div>
            ) : (
              <img
                src={spotlightCatUrl}
                alt="Cat of the Moment"
                className="spotlight-image"
                onClick={() => setActiveModalImage(spotlightCatUrl)}
                style={{ cursor: "zoom-in" }}
              />
            )}
          </div>

          <div className="spotlight-footer">
            <button
              type="button"
              className={`btn btn-sm ${hasLiked ? "btn-accent" : "btn-outline"}`}
              onClick={handleLikeSpotlight}
            >
              <Heart size={15} style={{ fill: hasLiked ? "currentColor" : "none" }} />
              <span>{likesCount} Loves</span>
            </button>

            <button
              type="button"
              className="btn btn-primary btn-sm"
              onClick={handleFetchSpotlightCat}
              disabled={spotlightLoading}
            >
              <RefreshCw size={15} className={spotlightLoading ? "animate-spin-slow" : ""} />
              <span>New Kitty</span>
            </button>
          </div>
        </div>
      </section>

      {/* ====================================================================
          2. FEATURE SHOWCASE (BENTO GRID)
          ==================================================================== */}
      <section style={{ marginBottom: "64px" }}>
        <div className="section-header">
          <span className="badge badge-purple">Explore Our Tools</span>
          <h2 className="section-title">Everything a Cat Enthusiast Needs</h2>
          <p className="section-subtitle">
            Navigate through our dedicated suite of feline tools designed to brighten your day and unleash your creativity.
          </p>
        </div>

        <div className="bento-grid">
          {/* Random Photos Card */}
          <Link to="/photos" className="bento-card bento-wide bento-highlight">
            <div className="bento-icon-box bento-icon-orange">
              <Camera size={26} />
            </div>
            <h3 className="bento-card-title">Random Cat Photography Studio</h3>
            <p className="bento-card-desc">
              Generate crisp, high-resolution cat photos on demand. Apply custom filters like Monochrome, Blur, and Negate, save favorites, and download your favorite wallpaper portraits.
            </p>
            <div className="bento-card-action">
              <span>Launch Photo Studio</span>
              <ArrowRight size={16} />
            </div>
          </Link>

          {/* Animated GIFs Card */}
          <Link to="/gifs" className="bento-card">
            <div className="bento-icon-box bento-icon-purple">
              <Film size={26} />
            </div>
            <h3 className="bento-card-title">Animated GIF Station</h3>
            <p className="bento-card-desc">
              Catch cats in motion! Endless loops of 4 AM zoomies, high jumps, silly fails, and cozy snoozes.
            </p>
            <div className="bento-card-action">
              <span>Watch GIFs</span>
              <ArrowRight size={16} />
            </div>
          </Link>

          {/* Tag Explorer Card */}
          <Link to="/tags" className="bento-card">
            <div className="bento-icon-box bento-icon-pink">
              <Tag size={26} />
            </div>
            <h3 className="bento-card-title">Curated Tag Explorer</h3>
            <p className="bento-card-desc">
              Filter cats by mood, color, or shenanigan: Orange, Fluffy, Grumpy, Box, Loaf, Sleeping, and more!
            </p>
            <div className="bento-card-action">
              <span>Filter by Tags</span>
              <ArrowRight size={16} />
            </div>
          </Link>

          {/* Meme Generator Card */}
          <Link to="/meme-generator" className="bento-card bento-wide bento-highlight">
            <div className="bento-icon-box bento-icon-orange">
              <MessageSquare size={26} />
            </div>
            <h3 className="bento-card-title">Cat Meme Creator Studio</h3>
            <p className="bento-card-desc">
              Turn any cat picture or GIF into a hilarious viral meme! Customize typography, font colors, choose from popular pre-made quotes, and download your custom creations instantly.
            </p>
            <div className="bento-card-action">
              <span>Craft a Meme</span>
              <ArrowRight size={16} />
            </div>
          </Link>

          {/* Cat Facts & Breeds Card */}
          <Link to="/facts" className="bento-card">
            <div className="bento-icon-box bento-icon-purple">
              <BookOpen size={26} />
            </div>
            <h3 className="bento-card-title">Feline Encyclopedia & Quiz</h3>
            <p className="bento-card-desc">
              Discover comprehensive breed profiles, decode mysterious body language, and take our interactive vibe quiz.
            </p>
            <div className="bento-card-action">
              <span>Learn Facts</span>
              <ArrowRight size={16} />
            </div>
          </Link>

          {/* Favorites Vault Card */}
          <Link to="/favorites" className="bento-card">
            <div className="bento-icon-box bento-icon-pink">
              <Heart size={26} />
            </div>
            <h3 className="bento-card-title">My Saved Favorites Vault</h3>
            <p className="bento-card-desc">
              Keep your cherished photos, GIFs, and custom memes safely stored locally in your personal sanctuary.
            </p>
            <div className="bento-card-action">
              <span>View Collection</span>
              <ArrowRight size={16} />
            </div>
          </Link>
        </div>
      </section>

      {/* ====================================================================
          3. INTERACTIVE DAILY CAT FACT SPOTLIGHT
          ==================================================================== */}
      <section className="fact-spotlight-box">
        <span className="fact-emoji">{currentFact.icon}</span>
        <span className="badge badge-orange">Did You Know? • {currentFact.category}</span>
        <h3 className="fact-text">&ldquo;{currentFact.fact}&rdquo;</h3>

        <div className="fact-actions">
          <button
            type="button"
            className="btn btn-outline-primary"
            onClick={handleNextFact}
          >
            <RefreshCw size={15} />
            <span>Discover Another Fact</span>
          </button>
          <Link to="/facts" className="btn btn-outline">
            <span>Explore All Facts</span>
            <ArrowRight size={15} />
          </Link>
        </div>
      </section>

      {/* ====================================================================
          4. CAT BODY LANGUAGE & CARE TIPS
          ==================================================================== */}
      <section style={{ marginBottom: "64px" }}>
        <div className="section-header">
          <span className="badge badge-pink">Feline Psychology</span>
          <h2 className="section-title">Decode Your Cat&apos;s Secret Language 🐈</h2>
          <p className="section-subtitle">
            Cats communicate through subtle ear twitches, tail postures, and slow blinks. Here is how to understand what they are telling you.
          </p>
        </div>

        <div className="tips-grid">
          {catLanguageTips.map((tip, index) => (
            <div key={index} className="tip-card">
              <div className="tip-header">
                <span className="tip-sign">{tip.sign}</span>
                <span className="badge badge-purple">{tip.mood}</span>
              </div>
              <p className="tip-meaning">{tip.meaning}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ====================================================================
          5. FEATURED POPULAR BREEDS SPOTLIGHT
          ==================================================================== */}
      <section style={{ marginBottom: "64px" }}>
        <div className="section-header">
          <span className="badge badge-purple">Breed Directory</span>
          <h2 className="section-title">Meet Popular Feline Breeds</h2>
          <p className="section-subtitle">
            From majestic giants to vocal sweethearts, discover the unique temperaments and traits of beloved breeds.
          </p>
        </div>

        <div className="breeds-grid">
          {catBreeds.slice(0, 3).map((breed) => (
            <div key={breed.id} className="breed-card">
              <div className="breed-header">
                <div>
                  <h3 className="breed-name">{breed.name}</h3>
                  <span style={{ fontSize: "0.82rem", color: "var(--text-light)" }}>
                    Origin: {breed.origin}
                  </span>
                </div>
                <span className="badge badge-orange">{breed.badge}</span>
              </div>

              <div className="breed-meta-list">
                <div className="breed-meta-item">
                  <span className="breed-meta-label">Coat Type:</span>
                  <span className="breed-meta-val">{breed.coat}</span>
                </div>
                <div className="breed-meta-item">
                  <span className="breed-meta-label">Lifespan:</span>
                  <span className="breed-meta-val">{breed.lifespan}</span>
                </div>
              </div>

              <p className="breed-desc">{breed.description}</p>

              <Link
                to={`/tags?tag=${breed.tag}`}
                className="btn btn-outline btn-sm"
                style={{ marginTop: "auto" }}
              >
                <span>View {breed.name} Photos</span>
                <ArrowRight size={14} />
              </Link>
            </div>
          ))}
        </div>

        <div style={{ textAlign: "center", marginTop: "12px" }}>
          <Link to="/facts" className="btn btn-secondary">
            <span>View Complete Breed Guide & Take Quiz</span>
            <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      {/* ====================================================================
          6. NEWSLETTER / PURR CLUB BANNER
          ==================================================================== */}
      <section className="newsletter-box">
        <div style={{ fontSize: "40px" }}>💌</div>
        <h3>Join the Purr Club VIP</h3>
        <p>
          Subscribe for curated weekly cat wallpapers, hilarity, and scientific breakthroughs in cat psychology. 100% spam-free, guaranteed purrs.
        </p>

        {newsletterSent ? (
          <div style={{ display: "flex", alignItems: "center", gap: "8px", color: "#86efac", fontWeight: "700", fontSize: "1.1rem" }}>
            <Check size={20} /> Welcome aboard! You are now part of the Purr Club! 🐾
          </div>
        ) : (
          <form className="newsletter-form" onSubmit={handleNewsletterSubmit}>
            <input
              type="email"
              placeholder="Enter your email address..."
              required
              className="newsletter-input"
              value={newsletterEmail}
              onChange={(e) => setNewsletterEmail(e.target.value)}
            />
            <button type="submit" className="btn btn-primary">
              <Send size={16} />
              <span>Join Club</span>
            </button>
          </form>
        )}
      </section>
    </div>
  );
}
