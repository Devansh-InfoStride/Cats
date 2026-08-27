import { useState } from "react";
import { Link } from "react-router-dom";
import {
  BookOpen,
  ArrowRight,
  RefreshCw,
  Search,
} from "lucide-react";
import confetti from "canvas-confetti";
import {
  catFacts,
  catBreeds,
  catLanguageTips,
  playPurrSound,
  playMeowSound,
} from "../utility/utility";

export default function CatFactsPage() {
  const [activeTab, setActiveTab] = useState("breeds");
  const [breedSearch, setBreedSearch] = useState("");
  const [factFilter, setFactFilter] = useState("all");

  // Quiz State
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [quizScore, setQuizScore] = useState({
    "maine-coon": 0,
    siamese: 0,
    ragdoll: 0,
    bengal: 0,
    "scottish-fold": 0,
  });
  const [quizFinished, setQuizFinished] = useState(false);
  const [matchedBreed, setMatchedBreed] = useState(null);

  const quizQuestions = [
    {
      question: "How would your best friend describe your ideal weekend?",
      options: [
        { text: "Lounging comfortably under warm blankets reading or snoozing 🛋️", breed: "ragdoll" },
        { text: "Hiking outdoors, climbing trees, or energetic sports 🏃‍♂️", breed: "bengal" },
        { text: "Hosting a fun gathering and chatting with everyone for hours 🗣️", breed: "siamese" },
        { text: "Chilling in the living room being quietly adorable and observing 👀", breed: "scottish-fold" },
        { text: "Exploring the backyard or playing in water fearlessly 💧", breed: "maine-coon" },
      ],
    },
    {
      question: "What is your typical communication style?",
      options: [
        { text: "Very expressive, vocal, and tell people exactly how I feel 📢", breed: "siamese" },
        { text: "Calm, peaceful, gentle, and never aggressive 🕊️", breed: "ragdoll" },
        { text: "Playful, mischievous, and always ready for high-energy fun ⚡", breed: "bengal" },
        { text: "Quiet, sweet, polite, and sitting comfortably 🧸", breed: "scottish-fold" },
        { text: "Warm, giant-hearted, majestic, and loyal 👑", breed: "maine-coon" },
      ],
    },
    {
      question: "Pick your superpower:",
      options: [
        { text: "Super agility and acrobatic ninja reflexes 🥷", breed: "bengal" },
        { text: "Supreme cuteness and melting every heart in the room 💖", breed: "scottish-fold" },
        { text: "Master of cozy cuddles and stress elimination 🧘", breed: "ragdoll" },
        { text: "Legendary charisma and majestic beauty 🦁", breed: "maine-coon" },
        { text: "Deep wisdom, intelligence, and charming conversation 🧠", breed: "siamese" },
      ],
    },
    {
      question: "What is your favorite type of weather?",
      options: [
        { text: "Crisp snowy winter with a thick cozy fur coat ❄️", breed: "maine-coon" },
        { text: "Warm sunny spots on the rug for endless sunbathing ☀️", breed: "ragdoll" },
        { text: "Mild tropical breeze where I can leap around 🌴", breed: "bengal" },
        { text: "Pleasant indoor climate with zero drafts ☕", breed: "scottish-fold" },
        { text: "Cozy warm room where my friends are gathered 🛋️", breed: "siamese" },
      ],
    },
  ];

  const handleSelectOption = (breedKey) => {
    playMeowSound(1.0 + currentQuestion * 0.1);
    const updated = {
      ...quizScore,
      [breedKey]: (quizScore[breedKey] || 0) + 1,
    };
    setQuizScore(updated);

    if (currentQuestion + 1 < quizQuestions.length) {
      setCurrentQuestion((prev) => prev + 1);
    } else {
      // Calculate winner
      let highestBreed = "maine-coon";
      let maxScore = -1;
      Object.entries(updated).forEach(([k, score]) => {
        if (score > maxScore) {
          maxScore = score;
          highestBreed = k;
        }
      });

      const matched = catBreeds.find((b) => b.id === highestBreed) || catBreeds[0];
      setMatchedBreed(matched);
      setQuizFinished(true);
      playPurrSound();
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
      });
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setQuizScore({
      "maine-coon": 0,
      siamese: 0,
      ragdoll: 0,
      bengal: 0,
      "scottish-fold": 0,
    });
    setQuizFinished(false);
    setMatchedBreed(null);
  };

  const filteredBreeds = breedSearch.trim()
    ? catBreeds.filter((b) =>
        b.name.toLowerCase().includes(breedSearch.toLowerCase()) ||
        b.temperament.toLowerCase().includes(breedSearch.toLowerCase()) ||
        b.origin.toLowerCase().includes(breedSearch.toLowerCase())
      )
    : catBreeds;

  const categories = ["all", "Habits", "Superpowers", "Anatomy", "Trivia", "Agility", "Behavior"];
  const filteredFacts = factFilter === "all"
    ? catFacts
    : catFacts.filter((f) => f.category === factFilter);

  return (
    <div className="page-container animate-fade-in">
      {/* Page Header */}
      <div className="page-header">
        <span className="badge badge-purple">
          <BookOpen size={14} /> Feline Encyclopedia &amp; Science
        </span>
        <h1>Cat Facts, Breeds &amp; Psychology 📚</h1>
        <p>
          Deep dive into the captivating world of feline history, biological superpowers, comprehensive breed profiles, and decode their secret behaviors.
        </p>
      </div>

      {/* Encyclopedia Navigation Tabs */}
      <div style={{ display: "flex", justifyContent: "center", gap: "10px", flexWrap: "wrap", marginBottom: "36px" }}>
        {[
          { id: "breeds", label: "🐈 Breed Directory", badge: "6 Breeds" },
          { id: "facts", label: "✨ Feline Science & Trivia", badge: "12 Facts" },
          { id: "behavior", label: "🍞 Body Language Guide", badge: "6 Signs" },
          { id: "quiz", label: "🎯 Personality Quiz", badge: "Find Vibe" },
        ].map((tab) => (
          <button
            key={tab.id}
            type="button"
            className={`btn btn-lg ${activeTab === tab.id ? "btn-primary" : "btn-outline"}`}
            onClick={() => {
              setActiveTab(tab.id);
              playPurrSound();
            }}
          >
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* ====================================================================
          TAB 1: BREED DIRECTORY
          ==================================================================== */}
      {activeTab === "breeds" && (
        <div className="animate-fade-in">
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "16px", marginBottom: "24px", flexWrap: "wrap" }}>
            <div>
              <h2 style={{ fontSize: "1.5rem" }}>Feline Breed Compendium</h2>
              <p style={{ fontSize: "0.9rem" }}>Explore distinct personalities, coats, and origins.</p>
            </div>

            <div style={{ position: "relative", minWidth: "260px" }}>
              <input
                type="text"
                className="form-input"
                placeholder="Search breed, trait, or origin..."
                value={breedSearch}
                onChange={(e) => setBreedSearch(e.target.value)}
                style={{ paddingLeft: "36px" }}
              />
              <Search size={16} style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", color: "var(--text-light)" }} />
            </div>
          </div>

          <div className="breeds-grid">
            {filteredBreeds.map((breed) => (
              <div key={breed.id} className="breed-card">
                <div className="breed-header">
                  <div>
                    <h3 className="breed-name">{breed.name}</h3>
                    <span style={{ fontSize: "0.82rem", color: "var(--text-light)" }}>
                      Origin: {breed.origin}
                    </span>
                  </div>
                  <span className="badge badge-purple">{breed.badge}</span>
                </div>

                <div className="breed-meta-list">
                  <div className="breed-meta-item">
                    <span className="breed-meta-label">Temperament:</span>
                    <span className="breed-meta-val" style={{ textAlign: "right" }}>{breed.temperament}</span>
                  </div>
                  <div className="breed-meta-item">
                    <span className="breed-meta-label">Coat Style:</span>
                    <span className="breed-meta-val">{breed.coat}</span>
                  </div>
                  <div className="breed-meta-item">
                    <span className="breed-meta-label">Typical Lifespan:</span>
                    <span className="breed-meta-val">{breed.lifespan}</span>
                  </div>
                </div>

                <p className="breed-desc">{breed.description}</p>

                <Link
                  to={`/tags?tag=${breed.tag}`}
                  className="btn btn-outline-primary btn-sm"
                  style={{ marginTop: "auto" }}
                >
                  <span>Explore #{breed.tag} Cat Photos</span>
                  <ArrowRight size={14} />
                </Link>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ====================================================================
          TAB 2: FELINE SCIENCE & TRIVIA
          ==================================================================== */}
      {activeTab === "facts" && (
        <div className="animate-fade-in">
          {/* Fact Filter Chips */}
          <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginBottom: "28px", justifyContent: "center" }}>
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                className={`tag-pill-btn ${factFilter === cat ? "active" : ""}`}
                onClick={() => setFactFilter(cat)}
              >
                {cat === "all" ? "All Science & Trivia" : cat}
              </button>
            ))}
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "20px" }}>
            {filteredFacts.map((fact) => (
              <div key={fact.id} className="card" style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <span style={{ fontSize: "28px" }}>{fact.icon}</span>
                  <span className="badge badge-orange">{fact.category}</span>
                </div>
                <p style={{ fontSize: "1.05rem", fontWeight: "600", color: "var(--text-main)", lineHeight: "1.5" }}>
                  &ldquo;{fact.fact}&rdquo;
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ====================================================================
          TAB 3: BODY LANGUAGE & BEHAVIOR GUIDE
          ==================================================================== */}
      {activeTab === "behavior" && (
        <div className="animate-fade-in">
          <div className="section-header" style={{ marginBottom: "28px" }}>
            <span className="badge badge-pink">Cat Decoder</span>
            <h2 className="section-title">Understand What Your Cat Is Saying</h2>
            <p className="section-subtitle">
              Learn how to interpret subtle body movements, tail curves, facial rubbing, and purr frequencies.
            </p>
          </div>

          <div className="tips-grid">
            {catLanguageTips.map((tip, idx) => (
              <div key={idx} className="tip-card">
                <div className="tip-header">
                  <span className="tip-sign">{tip.sign}</span>
                  <span className="badge badge-purple">{tip.mood}</span>
                </div>
                <p className="tip-meaning">{tip.meaning}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ====================================================================
          TAB 4: INTERACTIVE QUIZ ("WHAT CAT BREED ARE YOU?")
          ==================================================================== */}
      {activeTab === "quiz" && (
        <div className="animate-fade-in">
          {!quizFinished ? (
            <div className="quiz-card">
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <span className="badge badge-orange">
                  Question {currentQuestion + 1} of {quizQuestions.length}
                </span>
                <span style={{ fontSize: "0.85rem", color: "var(--text-light)", fontWeight: "600" }}>
                  Feline Personality Matcher
                </span>
              </div>

              <h2 style={{ fontSize: "1.45rem", lineHeight: "1.3" }}>
                {quizQuestions[currentQuestion].question}
              </h2>

              <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                {quizQuestions[currentQuestion].options.map((option, idx) => (
                  <button
                    key={idx}
                    type="button"
                    className="quiz-option-btn"
                    onClick={() => handleSelectOption(option.breed)}
                  >
                    <span>{option.text}</span>
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="quiz-card" style={{ textAlign: "center", alignItems: "center" }}>
              <div style={{ fontSize: "48px" }}>🎉🐱</div>
              <span className="badge badge-orange">Your Perfect Feline Match</span>
              <h2 style={{ fontSize: "2rem" }}>
                You are a <span className="gradient-text">{matchedBreed?.name}</span>!
              </h2>

              <div className="badge badge-purple" style={{ fontSize: "0.9rem", padding: "6px 16px" }}>
                {matchedBreed?.badge}
              </div>

              <p style={{ fontSize: "1.1rem", maxWidth: "520px", color: "var(--text-muted)", lineHeight: "1.6" }}>
                {matchedBreed?.description}
              </p>

              <div className="breed-meta-list" style={{ width: "100%", maxWidth: "420px" }}>
                <div className="breed-meta-item">
                  <span className="breed-meta-label">Personality:</span>
                  <span className="breed-meta-val">{matchedBreed?.temperament}</span>
                </div>
                <div className="breed-meta-item">
                  <span className="breed-meta-label">Origin:</span>
                  <span className="breed-meta-val">{matchedBreed?.origin}</span>
                </div>
              </div>

              <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", marginTop: "12px" }}>
                <button type="button" className="btn btn-outline" onClick={resetQuiz}>
                  <RefreshCw size={15} />
                  <span>Retake Quiz</span>
                </button>
                <Link to={`/tags?tag=${matchedBreed?.tag}`} className="btn btn-primary">
                  <span>View {matchedBreed?.name} Photos</span>
                  <ArrowRight size={15} />
                </Link>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
