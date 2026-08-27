import { useState } from "react";
import { catTags } from "../../utility/utility";

const apiURL = "https://cataas.com";

export default function CatTags() {
  const [selectedTag, setSelectedTag] = useState(catTags[0] || "");
  const [catImageSrc, setCatImageSrc] = useState("");

  const handleFetchCat = () => {
    if (!selectedTag) return;
    
    // const finalUrl = `${apiURL}/cat/${selectedTag}?${Math.random()}`;
    const finalUrl = `${apiURL}/cat/${selectedTag}`;
    setCatImageSrc(finalUrl);
  };

  return (
    <div>
      <h2>Cat Tags Component</h2>
      
      {/* Dropdown Selection */}
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
