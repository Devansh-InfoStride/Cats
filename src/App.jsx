import './App.css'
import RandomCatGIF from './components/catgif/catgif'
import CatSays from './components/catsays/catsays'
import CatTags from './components/cattags/cattags'
import Header from './components/header/header'
import RandomCat from './components/randomcat/randomcat'

function App() {

  return (
    <>
    <Header />
    <h1>Dashboard</h1>
    <RandomCat />
    <RandomCatGIF />
    <CatTags />
    <CatSays />
    </>
  )
}

export default App
