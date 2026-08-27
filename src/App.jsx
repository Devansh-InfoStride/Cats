import "./App.css";
import Header from "./components/header/header";
import RandomCat from "./components/randomcat/randomcat";
import RandomCatGIF from "./components/catgif/catgif";
import CatTags from "./components/cattags/cattags";
import CatSays from "./components/catsays/catsays";

function App() {
  return (
    <div className="app-container">
      <Header />
      <main className="dashboard-container">
        <h1>Dashboard</h1>
        <div className="dashboard-grid">
          <RandomCat />
          <RandomCatGIF />
          <CatTags />
          <CatSays />
        </div>
      </main>
    </div>
  );
}

export default App;
