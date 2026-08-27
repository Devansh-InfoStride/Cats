import { useState } from "react";
import { apiURL } from "../../utility/utility";

export default function RandomCat() {
  const [catImageSrc, setCatImageSrc] = useState("");

  const handleFetchCat = () => {
    setCatImageSrc(`${apiURL}/cat?t=${Date.now()}`);
  };

  return (
    <div className="feature-card">
      <h2>Random Cat Component</h2>
      <button onClick={handleFetchCat}>
        Click me for a random cat!
      </button>
      <div className="cat-image-container">
        {catImageSrc && (
          <img
            src={catImageSrc}
            alt="Random Cat"
            className="cat-image"
          />
        )}
      </div>
    </div>
  );
}