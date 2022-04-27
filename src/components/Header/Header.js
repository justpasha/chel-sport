import { Link, NavLink, useMatch } from 'react-router-dom';
import './Header.css';

function Header() {
  const activeStyle = ({ isActive }) =>
    isActive ? 'header__nav-link header__nav-link_active' : 'header__nav-link';

  const isMain = useMatch('/');
  const isSchools = useMatch('/schools');
  const isDistrict = useMatch('/districts/:id');
  const page = isMain || isSchools || isDistrict;

  return (
    <header className={`header ${page ? 'header_main' : ''}`}>
      <div className="header__container">
        <p className="header__logo">ЧелСпорт</p>
        <div className="header__links-container">
          <nav className="header__nav">
            <NavLink className={activeStyle} to="/">
              Главная
            </NavLink>
            <NavLink className={activeStyle} to="/about">
              О нас
            </NavLink>
          </nav>
          {/* <Link className="header__nav-link" to="/signin">
            Вход
          </Link> */}
        </div>
      </div>
    </header>
  );
}

export default Header;
