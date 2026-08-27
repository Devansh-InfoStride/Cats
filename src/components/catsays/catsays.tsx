import { useState } from "react";

const apiURL = "https://cataas.com";

export default function CatSays() {
  const [text, setText] = useState("");
  const [catImageSrc, setCatImageSrc] = useState("");

  const handleFetchCat = () => {
    // Prevent fetching if the input is completely empty or just spaces
    if (!text.trim()) return;
    
    // Encodes characters like spaces or question marks safely for the URL path
    const encodedText = encodeURIComponent(text.trim());
    
    // Generates a direct path to the custom text endpoint with a cache-buster
    const finalUrl = `${apiURL}/cat/says/${encodedText}?${Math.random()}`;
    setCatImageSrc(finalUrl);
  };

  return (
    <div>
      <h2>Cat Says Component</h2>
      
      {/* Text Input Field */}
      <input 
        type="text" 
        placeholder="Type what the cat should say..." 
        value={text} 
        onChange={(e) => setText(e.target.value)} 
      />

      {/* Action Button */}
      <button onClick={handleFetchCat}>
        Generate Custom Cat
      </button>

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
