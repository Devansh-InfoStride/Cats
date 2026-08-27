import "../../styles/header/header.css";
import Logo from "../logo/logo";
import { navLinks } from "../../utility/utility";
import Dropdown from "../dropdown/dropdown";
import SearchBar from "../searchbar/searchbar";

export default function Header() {
  return (
    <header className="header">
      {/* Logo */}
      <Logo />

      {/* Navigation */}
      <nav>
        <ul>
          {navLinks.map((link) => (
            <li key={link.id}>
              <a href={link.path}>{link.name}</a>
            </li>
          ))}
        </ul>
      </nav>

      {/* Search Bar */}
      <SearchBar />

      {/* Dropdown */}
      <Dropdown />
    </header>
  );
}
