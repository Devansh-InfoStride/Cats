import { useState } from "react";
import { apiURL } from "../../utility/utility";

export default function CatSays() {
  const [text, setText] = useState("");
  const [catImageSrc, setCatImageSrc] = useState("");

  const handleFetchCat = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!text.trim()) return;
    
    const encodedText = encodeURIComponent(text.trim());
    const finalUrl = `${apiURL}/cat/says/${encodedText}?t=${Date.now()}`;
    setCatImageSrc(finalUrl);
  };

  return (
    <div className="feature-card">
      <h2>Cat Says Component</h2>
      
      {/* Text Input Field */}
      <form onSubmit={handleFetchCat} className="control-group">
        <input 
          type="text" 
          placeholder="Type what the cat should say..." 
          value={text} 
          onChange={(e) => setText(e.target.value)} 
        />

        {/* Action Button */}
        <button type="submit">
          Generate Custom Cat
        </button>
      </form>

      {/* Target Image Container */}
      <div className="cat-image-container">
        {catImageSrc && (
          <img 
            src={catImageSrc} 
            alt={`A cute cat saying ${text}`} 
            className="cat-image" 
          />
        )}
      </div>
    </div>
  );
}
