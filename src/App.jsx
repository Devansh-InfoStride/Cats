import { Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import Header from "./components/header/header";
import Footer from "./components/footer/footer";

// Dedicated Pages
import Home from "./pages/Home";
import RandomCatPage from "./pages/RandomCatPage";
import CatGifPage from "./pages/CatGifPage";
import CatTagsPage from "./pages/CatTagsPage";
import CatSaysPage from "./pages/CatSaysPage";
import CatFactsPage from "./pages/CatFactsPage";
import FavoritesPage from "./pages/FavoritesPage";
import AboutPage from "./pages/AboutPage";

function App() {
  return (
    <div className="app-root">
      {/* Navigation Header */}
      <Header />

      {/* Main Routed Page Content */}
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/photos" element={<RandomCatPage />} />
          <Route path="/gifs" element={<CatGifPage />} />
          <Route path="/tags" element={<CatTagsPage />} />
          <Route path="/meme-generator" element={<CatSaysPage />} />
          <Route path="/facts" element={<CatFactsPage />} />
          <Route path="/favorites" element={<FavoritesPage />} />
          <Route path="/about" element={<AboutPage />} />
          {/* Catch-all redirect to Home */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>

      {/* Global Aesthetic Footer */}
      <Footer />
    </div>
  );
}

export default App;
