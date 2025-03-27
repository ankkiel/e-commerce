import { Link } from 'react-router';

const Header = () => (
  <header>
    <Link to="/products">Все товары</Link>
    <Link to="/products/1">Один товар</Link>
  </header>
);

export default Header;
