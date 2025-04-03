import cn from 'classnames';
import { Link } from 'react-router-dom';
import Text from '../Text';
import BagIcon from '../icons/BagIcon';
import UserIcon from '../icons/UserIcon';
import style from './Header.module.scss';

const Header = () => {
  return (
    <header className={style.header}>
      <div className={cn(style.header__wrapper, 'container')}>
        <nav className={style.nav}>
          <Link to="/products" className={style.nav__logo}>
            <img src="/logo.png" alt="logo" />
          </Link>
          <div className={style.nav__links}>
            <Link className={cn(style.nav__link, [style.nav__link_active])} to="/products">
              <Text view="p-18">Products</Text>
            </Link>
            <Link className={style.nav__link} to="/">
              <Text view="p-18">Categories</Text>
            </Link>
            <Link className={style.nav__link} to="/">
              <Text view="p-18">About us</Text>
            </Link>
          </div>
          <div className={style.nav__actions}>
            <Link className={style.nav__action} to="/">
              <BagIcon />
            </Link>
            <Link className={style.nav__action} to="/">
              <UserIcon />
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
