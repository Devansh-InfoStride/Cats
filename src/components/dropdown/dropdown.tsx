import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Sparkles, Image, Film, Tag, MessageSquare, BookOpen, Heart, Volume2, ChevronDown, Info } from "lucide-react";
import { playPurrSound, playMeowSound } from "../../utility/utility";

export default function Dropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const toggleDropdown = () => setIsOpen((prev) => !prev);

  const menuItems = [
    { label: "Random Photos", path: "/photos", icon: <Image size={15} /> },
    { label: "Animated GIFs", path: "/gifs", icon: <Film size={15} /> },
    { label: "Tag Explorer", path: "/tags", icon: <Tag size={15} /> },
    { label: "Meme Studio", path: "/meme-generator", icon: <MessageSquare size={15} /> },
    { label: "Cat Encyclopedia", path: "/facts", icon: <BookOpen size={15} /> },
    { label: "Saved Favorites", path: "/favorites", icon: <Heart size={15} /> },
    { label: "About & Contact", path: "/about", icon: <Info size={15} /> },
  ];

  const handleNavigate = (path: string) => {
    navigate(path);
    setIsOpen(false);
  };

  const handlePlayPurr = () => {
    playPurrSound();
    playMeowSound(1.2);
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="dropdown-container" ref={dropdownRef}>
      <button
        type="button"
        className={`dropdown-trigger ${isOpen ? "open" : ""}`}
        onClick={toggleDropdown}
        aria-expanded={isOpen}
        title="Quick Actions Menu"
      >
        <Sparkles size={14} style={{ color: "var(--primary)" }} />
        <span>Quick Jump</span>
        <ChevronDown size={14} className="arrow-icon" />
      </button>

      {isOpen && (
        <ul className="dropdown-menu animate-fade-in">
          {menuItems.map((item) => (
            <li
              key={item.path}
              className="dropdown-item"
              onClick={() => handleNavigate(item.path)}
            >
              {item.icon}
              <span>{item.label}</span>
            </li>
          ))}

          <li
            className="dropdown-item"
            onClick={handlePlayPurr}
            style={{ borderTop: "1px solid var(--border)", marginTop: "4px", paddingTop: "8px", color: "var(--primary)" }}
          >
            <Volume2 size={15} />
            <span>Play Purr Sound 🐾</span>
          </li>
        </ul>
      )}
    </div>
  );
}
