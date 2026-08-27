import { useState } from "react";
import { apiURL, catTags } from "../../utility/utility";

export default function CatTags() {
  const [selectedTag, setSelectedTag] = useState(catTags[0] || "cute");
  const [catImageSrc, setCatImageSrc] = useState("");

  const handleFetchCat = () => {
    if (!selectedTag) return;
    const finalUrl = `${apiURL}/cat/${selectedTag}?t=${Date.now()}`;
    setCatImageSrc(finalUrl);
  };

  return (
    <div className="feature-card">
      <h2>Cat Tags Component</h2>
      
      {/* Dropdown Selection */}
      <div className="control-group">
        <select value={selectedTag} onChange={(e) => setSelectedTag(e.target.value)}>
          {catTags.map((tag, index) => (
            <option key={index} value={tag}>
              {tag}
            </option>
          ))}
        </select>

        <button onClick={handleFetchCat}>
          Click me for a tagged cat!
        </button>
      </div>

      <div className="cat-image-container">
        {catImageSrc && (
          <img 
            src={catImageSrc} 
            alt={`A cute cat tagged as ${selectedTag}`} 
            className="cat-image" 
          />
        )}
      </div>
    </div>
  );
}
