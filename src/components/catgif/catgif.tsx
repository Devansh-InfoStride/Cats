import { useState } from 'react';

const apiURL = 'https://cataas.com';

export default function RandomCatGIF() {
  const [catUrl, setCatUrl] = useState('');

  const getRandomCat = () => {
    // setCatUrl(`${apiURL}/cat/gif?${Math.random()}`);
    setCatUrl(`${apiURL}/cat/gif`);
  };

  return (
    <div>
      <h2>Random Cat Component</h2>

      <button onClick={getRandomCat}>
        Click me for a random cat!
      </button>

      <div className="cat-gif-container">
        {catUrl && (
          <img
            src={catUrl}
            alt="Random Cat"
            className="cat-gif"
          />
        )}
      </div>
    </div>
  );
}
