import { useState } from "react";
import {
  Info,
  Send,
  HelpCircle,
  Code,
} from "lucide-react";
import confetti from "canvas-confetti";
import { playMeowSound, playPurrSound } from "../utility/utility";
import Toast from "../components/toast/toast";

export default function AboutPage() {
  const [pawRating, setPawRating] = useState(5);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleContactSubmit = (e) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) return;

    setSubmitted(true);
    playPurrSound();
    playMeowSound(1.2);
    confetti({
      particleCount: 75,
      spread: 60,
      origin: { y: 0.7 },
    });
    showToast("Feedback sent with a gentle kitty headbonk! 🐾");
  };

  const faqs = [
    {
      q: "Where do all the awesome cat pictures come from?",
      a: "Our website connects dynamically with the open-source CATAAS (Cat as a Service) API, an incredible community project that indexes tens of thousands of joyful feline photos and GIFs.",
    },
    {
      q: "How does the custom Cat Meme Studio work?",
      a: "The Meme Studio renders real-time typography onto high-resolution cat photos and animations using HTML5 Canvas technology, allowing instant export and downloads with zero watermark.",
    },
    {
      q: "Is PurrfectVerse free to use?",
      a: "Yes! 100% free and open for all feline enthusiasts, students, and meme connoisseurs worldwide.",
    },
    {
      q: "Are favorites stored securely?",
      a: "Yes, all your favorited photos, GIFs, and custom memes are stored locally in your browser's private storage, meaning only you have access to your personal sanctuary.",
    },
  ];

  return (
    <div className="page-container animate-fade-in">
      <Toast message={toastMessage} onClose={() => setToastMessage(null)} />

      {/* Page Header */}
      <div className="page-header">
        <span className="badge badge-purple">
          <Info size={14} /> Mission &amp; Community
        </span>
        <h1>About PurrfectVerse 🐾</h1>
        <p>
          Dedicated to spreading daily joy, unconditional comfort, and fascinating feline science to cat lovers around the globe.
        </p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "36px", marginBottom: "56px" }}>
        {/* Story Card */}
        <div className="card" style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <span style={{ fontSize: "28px" }}>🏰</span>
            <h2 style={{ fontSize: "1.4rem" }}>Our Feline Story</h2>
          </div>
          <p style={{ lineHeight: "1.6" }}>
            Cats have lived alongside humans for over 9,500 years, offering calming companionship, boundless entertainment, and mysterious wisdom.
          </p>
          <p style={{ lineHeight: "1.6" }}>
            <strong>PurrfectVerse</strong> was crafted to bring all aspects of feline admiration together into one seamless, delightful interface. Whether you need a quick serotonin boost, want to create a viral meme, or seek to understand what your cat&apos;s tail twitch means, you have a cozy home here.
          </p>

          <div style={{ padding: "14px 18px", background: "var(--primary-light)", borderRadius: "var(--radius-md)", border: "1px solid rgba(249, 115, 22, 0.2)" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", fontWeight: "700", color: "var(--primary)" }}>
              <Code size={16} /> Open Technology
            </div>
            <p style={{ fontSize: "0.88rem", marginTop: "4px", color: "var(--text-main)" }}>
              Built with React 19, Vite, React Router, Canvas, Web Audio API, and the open Cat as a Service (CATAAS) platform.
            </p>
          </div>
        </div>

        {/* Contact Form */}
        <div className="card">
          <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "16px" }}>
            <span style={{ fontSize: "28px" }}>💌</span>
            <h2 style={{ fontSize: "1.4rem" }}>Send Kitty Feedback</h2>
          </div>

          {submitted ? (
            <div style={{ textAlign: "center", padding: "32px 16px" }}>
              <div style={{ fontSize: "48px", marginBottom: "12px" }}>😻</div>
              <h3 style={{ fontSize: "1.3rem", color: "var(--emerald)", marginBottom: "8px" }}>
                Thank You for Your Feedback!
              </h3>
              <p style={{ color: "var(--text-muted)" }}>
                Your message has been delivered to our feline council with {pawRating} paws of approval!
              </p>
              <button
                type="button"
                className="btn btn-outline btn-sm"
                onClick={() => setSubmitted(false)}
                style={{ marginTop: "16px" }}
              >
                Send Another Note
              </button>
            </div>
          ) : (
            <form onSubmit={handleContactSubmit} style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
              <div className="form-group">
                <label className="form-label">Your Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Whiskers Lover"
                  className="form-input"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Your Email</label>
                <input
                  type="email"
                  required
                  placeholder="kitty@example.com"
                  className="form-input"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Paw Rating: {pawRating} / 5 Paws 🐾</label>
                <div style={{ display: "flex", gap: "8px" }}>
                  {[1, 2, 3, 4, 5].map((num) => (
                    <button
                      key={num}
                      type="button"
                      onClick={() => {
                        setPawRating(num);
                        playMeowSound(0.8 + num * 0.1);
                      }}
                      style={{
                        fontSize: "22px",
                        cursor: "pointer",
                        opacity: num <= pawRating ? 1 : 0.3,
                        transition: "transform 0.15s ease",
                      }}
                    >
                      🐾
                    </button>
                  ))}
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Your Message or Cat Story</label>
                <textarea
                  required
                  rows={3}
                  placeholder="Share your thoughts, suggestions, or tell us about your furry companion..."
                  className="form-textarea"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
              </div>

              <button type="submit" className="btn btn-primary" style={{ width: "100%", marginTop: "4px" }}>
                <Send size={16} />
                <span>Submit Feedback</span>
              </button>
            </form>
          )}
        </div>
      </div>

      {/* FAQ Section */}
      <section style={{ marginBottom: "36px" }}>
        <div className="section-header">
          <span className="badge badge-orange">FAQ</span>
          <h2 className="section-title">Frequently Asked Questions</h2>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "18px" }}>
          {faqs.map((faq, idx) => (
            <div key={idx} className="card" style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              <h3 style={{ fontSize: "1.1rem", display: "flex", alignItems: "flex-start", gap: "8px" }}>
                <HelpCircle size={18} style={{ color: "var(--primary)", flexShrink: 0, marginTop: "2px" }} />
                <span>{faq.q}</span>
              </h3>
              <p style={{ fontSize: "0.92rem", color: "var(--text-muted)", lineHeight: "1.5" }}>
                {faq.a}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
