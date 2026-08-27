// Base API URL for Cat As A Service
export const API_BASE = "https://cataas.com";
export const apiURL = "https://cataas.com";

export const getCacheBuster = () => String(Date.now());

// Navigation Links
export const navLinks = [
  { id: 1, name: "Home", path: "/" },
  { id: 2, name: "Photos", path: "/photos" },
  { id: 3, name: "GIFs", path: "/gifs" },
  { id: 4, name: "Tag Explorer", path: "/tags" },
  { id: 5, name: "Meme Studio", path: "/meme-generator" },
  { id: 6, name: "Cat Facts & Breeds", path: "/facts" },
  { id: 7, name: "Favorites", path: "/favorites" },
];

// Curated Cat Tags by Category
export const catTagCategories = {
  moods: [
    "cute", "funny", "sleepy", "grumpy", "playful",
    "silly", "adorable", "happy", "angry", "curious", "lazy"
  ],
  appearances: [
    "orange", "black", "white", "calico", "fluffy",
    "tabby", "tuxedo", "eyes", "big", "tiny", "chubby"
  ],
  accessories: [
    "hat", "box", "glasses", "tie", "bed",
    "christmas", "hoodie", "blanket", "sunglasses"
  ],
  actions: [
    "loaf", "sleeping", "jumping", "eating", "yawn",
    "stretch", "climbing", "looking", "drinking"
  ]
};

// Flat list of tags for quick access
export const catTags = [
  "cute", "funny", "sleepy", "grumpy", "playful", "silly", "adorable",
  "happy", "curious", "orange", "black", "white", "calico", "fluffy",
  "tabby", "tuxedo", "hat", "box", "loaf", "kitten", "sleeping"
];

// Curated Cat Facts for Hero & Facts Page
export const catFacts = [
  {
    id: 1,
    fact: "Cats spend roughly 70% of their entire lives sleeping, which equates to about 13-16 hours per day.",
    category: "Habits",
    icon: "😴"
  },
  {
    id: 2,
    fact: "A cat's purr vibrates at a frequency between 20 and 140 Hz, which is medically proven to promote tissue healing and bone density.",
    category: "Superpowers",
    icon: "✨"
  },
  {
    id: 3,
    fact: "Cats have over 20 distinct muscles that control their ears independently and can rotate their ears 180 degrees.",
    category: "Anatomy",
    icon: "👂"
  },
  {
    id: 4,
    fact: "A group of cats is called a 'clowder', while a group of kittens is called a 'kindle'.",
    category: "Trivia",
    icon: "🐾"
  },
  {
    id: 5,
    fact: "Cats can jump up to 6 times their body length in a single bound thanks to their powerful back legs and flexible spine.",
    category: "Agility",
    icon: "🦘"
  },
  {
    id: 6,
    fact: "A cat's nose print is unique to each individual cat, just like human fingerprints!",
    category: "Anatomy",
    icon: "👃"
  },
  {
    id: 7,
    fact: "Adult cats only meow to communicate with humans, not with other cats. With each other, they use scent, body language, and chirps.",
    category: "Communication",
    icon: "🗣️"
  },
  {
    id: 8,
    fact: "When cats knead their paws ('making biscuits'), it is a comfort behavior carried over from kittenhood when they nursed.",
    category: "Behavior",
    icon: "🍞"
  },
  {
    id: 9,
    fact: "Whiskers are not just hairs—they are sensitive radar organs called vibrissae, packed with nerve endings that help cats detect air currents and navigate in pitch darkness.",
    category: "Senses",
    icon: "🔍"
  },
  {
    id: 10,
    fact: "The slow blink from a cat is known in feline psychology as a 'cat kiss'. It signals complete trust, love, and relaxation.",
    category: "Affection",
    icon: "😽"
  },
  {
    id: 11,
    fact: "Cats have a specialized organ on the roof of their mouth called the Jacobson's organ, which lets them 'taste' scents in the air.",
    category: "Senses",
    icon: "👅"
  },
  {
    id: 12,
    fact: "Ancient Egyptians revered cats so much that anyone caught harming a cat faced severe punishment, and cats were often mummified with their owners.",
    category: "History",
    icon: "🏛️"
  }
];

// Curated Cat Breeds Database
export const catBreeds = [
  {
    id: "maine-coon",
    name: "Maine Coon",
    origin: "United States",
    temperament: "Gentle Giant, Friendly, Playful, Intelligent",
    lifespan: "12 - 15 years",
    coat: "Long & Fluffy",
    tag: "fluffy",
    description: "Known as the dogs of the cat world, Maine Coons are affectionate, huge, water-loving beauties with tufted ears and majestic bushy tails.",
    badge: "Most Majestic"
  },
  {
    id: "siamese",
    name: "Siamese",
    origin: "Thailand",
    temperament: "Vocal, Affectionate, Highly Social, Curious",
    lifespan: "15 - 20 years",
    coat: "Short & Sleek",
    tag: "cute",
    description: "Famous for striking blue almond eyes and color-point coats, Siamese cats love chatting with their humans and forming deep loyal bonds.",
    badge: "Chatterbox"
  },
  {
    id: "ragdoll",
    name: "Ragdoll",
    origin: "United States",
    temperament: "Docile, Calm, Cuddly, Sweet-natured",
    lifespan: "13 - 18 years",
    coat: "Semi-long & Silky",
    tag: "sleepy",
    description: "Ragdolls get their name because they tend to go completely limp and relax like a plush toy when held in loving arms.",
    badge: "Ultimate Lap Cat"
  },
  {
    id: "bengal",
    name: "Bengal",
    origin: "United States",
    temperament: "High Energy, Athletic, Wild-looking, Bold",
    lifespan: "12 - 16 years",
    coat: "Short with Rosette Spots",
    tag: "playful",
    description: "A breathtaking breed with a leopard-like spotted coat, Bengals are acrobatic climbers who love games, puzzles, and even playing in water.",
    badge: "Little Leopard"
  },
  {
    id: "scottish-fold",
    name: "Scottish Fold",
    origin: "Scotland",
    temperament: "Sweet, Quiet, Easygoing, Expressive",
    lifespan: "11 - 15 years",
    coat: "Short or Long",
    tag: "adorable",
    description: "Instantly recognizable by their distinctive forward-folded ears and large round owl-like eyes, Scottish Folds love sitting like humans.",
    badge: "Cutest Ears"
  },
  {
    id: "british-shorthair",
    name: "British Shorthair",
    origin: "United Kingdom",
    temperament: "Dignified, Calm, Independent, Loyal",
    lifespan: "14 - 20 years",
    coat: "Dense Plush",
    tag: "chubby",
    description: "With chunky cheeks, round copper eyes, and a teddy-bear demeanor, this historic breed was the inspiration for the Cheshire Cat.",
    badge: "Aristocrat"
  }
];

// Cat Language & Body Behavior Guide
export const catLanguageTips = [
  {
    sign: "Tail straight up with a curved tip",
    meaning: "Happy, friendly, and welcoming you warmly! Like a kitty greeting handshake.",
    mood: "Friendly 😊"
  },
  {
    sign: "Slow deliberate blinking while looking at you",
    meaning: "Feline for 'I love you and feel completely safe around you.' Blink back slowly!",
    mood: "Pure Love ❤️"
  },
  {
    sign: "Rhythmic paw kneading on blankets or your lap",
    meaning: "'Making biscuits' is an instinctive sign of profound comfort, nursing memory, and contentment.",
    mood: "Cozy Bliss 🍞"
  },
  {
    sign: "Rubbing cheeks and chin on furniture or your leg",
    meaning: "Scent-marking with facial pheromones: 'You are mine, this is safe territory!'",
    mood: "Affectionate 😻"
  },
  {
    sign: "Twitching tail tip or thumping tail",
    meaning: "Growing agitation, intense hunting focus, or overstimulation. Give some space.",
    mood: "Alert / Annoyed ⚡"
  },
  {
    sign: "Purring while curled in a ball",
    meaning: "Deep relaxation, inner peace, and self-soothing vibrational therapy.",
    mood: "Zen Master 🧘"
  }
];

// Preset Meme Quotes for Cat Meme Studio
export const memePresets = [
  "I did not knock it over. Gravity tested it.",
  "Feed me right meow!",
  "If it fits, I sits.",
  "Working from home (sleeping on keyboard).",
  "I see your glass of water... it would be a shame if something happened to it.",
  "4:00 AM Zoomies have been scheduled.",
  "I'm not chubby, I'm just full of love and fluff.",
  "Did somebody say tuna?",
  "Human, fetch the treat canister immediately.",
  "I judged you, and you failed.",
  "I woke up like this: gorgeous and unbothered.",
  "No thoughts, head empty, only treats."
];

// Web Audio API Synthesizer: Cute synthesized "Meow" & "Purr" sounds
export const playMeowSound = (pitch = 1) => {
  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;
    const ctx = new AudioContext();

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = "sine";
    const now = ctx.currentTime;

    // Frequencies resembling a cute cat meow (rising then sliding down)
    osc.frequency.setValueAtTime(450 * pitch, now);
    osc.frequency.exponentialRampToValueAtTime(800 * pitch, now + 0.15);
    osc.frequency.exponentialRampToValueAtTime(320 * pitch, now + 0.45);

    // Gain envelope
    gain.gain.setValueAtTime(0.01, now);
    gain.gain.linearRampToValueAtTime(0.25, now + 0.08);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.45);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.5);
  } catch (err) {
    console.warn("Audio playback not supported or blocked", err);
  }
};

export const playPurrSound = () => {
  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;
    const ctx = new AudioContext();

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = "triangle";
    const now = ctx.currentTime;

    osc.frequency.setValueAtTime(35, now);
    osc.frequency.setValueAtTime(40, now + 0.2);
    osc.frequency.setValueAtTime(30, now + 0.4);

    gain.gain.setValueAtTime(0.01, now);
    gain.gain.linearRampToValueAtTime(0.2, now + 0.1);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.6);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.65);
  } catch (err) {
    console.warn("Audio playback not supported or blocked", err);
  }
};

// Favorites Management in LocalStorage
const FAVORITES_KEY = "purrfect_favorites_v1";

export const getFavorites = () => {
  try {
    const data = localStorage.getItem(FAVORITES_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
};

export const saveFavorite = (item) => {
  try {
    const list = getFavorites();
    if (!list.some((fav) => fav.url === item.url)) {
      const updated = [{ ...item, savedAt: new Date().toISOString() }, ...list];
      localStorage.setItem(FAVORITES_KEY, JSON.stringify(updated));
      return updated;
    }
    return list;
  } catch {
    return [];
  }
};

export const removeFavorite = (url) => {
  try {
    const list = getFavorites();
    const updated = list.filter((item) => item.url !== url);
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(updated));
    return updated;
  } catch {
    return [];
  }
};

export const isFavorite = (url) => {
  const list = getFavorites();
  return list.some((fav) => fav.url === url);
};

// Helper to copy text to clipboard
export const copyToClipboard = async (text) => {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    // fallback
    const textarea = document.createElement("textarea");
    textarea.value = text;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand("copy");
    document.body.removeChild(textarea);
    return true;
  }
};

// Helper to download image
export const downloadImage = async (imageUrl, filename = "cat-image.jpg") => {
  try {
    const response = await fetch(imageUrl);
    const blob = await response.blob();
    const blobUrl = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = blobUrl;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(blobUrl);
    return true;
  } catch {
    // Fallback direct download link
    const link = document.createElement("a");
    link.href = imageUrl;
    link.target = "_blank";
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    return true;
  }
};