import cn from 'classnames';
import { Link } from 'react-router-dom';
import Text from 'components/Text';
import ArrowRightIcon from 'components/icons/ArrowRightIcon';
import style from './BackToProducts.module.scss';
const Preview = () => {
  return (
    <div className={cn(style.backToProducts)}>
      <div className={cn(style.backToProducts__wrapper)}>
        <Link to="/products" className={cn(style.backToProducts__link)}>
          <ArrowRightIcon color="primary" style={{ transform: 'rotate(180deg)' }} />
          <Text view="p-20">Назад</Text>
        </Link>
      </div>
    </div>
  );
};

export default Preview;
