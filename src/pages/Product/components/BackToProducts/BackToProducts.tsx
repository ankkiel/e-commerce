import { Link } from 'react-router-dom';
import Text from '@/components/Text';
import ArrowRightIcon from '@/components/icons/ArrowRightIcon';
import style from './BackToProducts.module.scss';

const BackToProducts = () => {
  return (
    <div className={style.backToProducts}>
      <div className={style.backToProducts__wrapper}>
        <Link to="/products" className={style.backToProducts__link}>
          <ArrowRightIcon color="primary" style={{ transform: 'rotate(180deg)' }} />
          <Text view="p-20">Назад</Text>
        </Link>
      </div>
    </div>
  );
};

export default BackToProducts;
