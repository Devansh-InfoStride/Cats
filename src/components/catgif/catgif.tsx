import { useState } from "react";
import { apiURL } from "../../utility/utility";

export default function RandomCatGIF() {
  const [catUrl, setCatUrl] = useState("");

  const getRandomCat = () => {
    setCatUrl(`${apiURL}/cat/gif?t=${Date.now()}`);
  };

  return (
    <div className="feature-card">
      <h2>Random Cat GIF Component</h2>

      <button onClick={getRandomCat}>
        Click me for a random cat GIF!
      </button>

      <div className="cat-image-container">
        {catUrl && (
          <img
            src={catUrl}
            alt="Random Cat GIF"
            className="cat-image"
          />
        )}
      </div>
    </div>
  );
}
