// i want to generate random cat image from - https://cataas.com/cat 

const apiURL = 'https://cataas.com';

export default function RandomCat() {
  return (
    <div>
      <h2>Random Cat Component</h2>
      <button onClick={() => {
        const randomCatImage = document.createElement('img');
        randomCatImage.src = `${apiURL}/cat`;
        randomCatImage.alt = 'Random Cat';
        randomCatImage.className = 'cat-image';
        const catImageContainer = document.querySelector('.cat-image-container');
        if (catImageContainer) {
          catImageContainer.innerHTML = '';
          catImageContainer.appendChild(randomCatImage);
        }
      }}>
        Click me for a random cat!
      </button>
      <div className="cat-image-container"></div>
    </div>
  );
}