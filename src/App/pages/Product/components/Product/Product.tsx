import cn from 'classnames';

import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Button from 'components/Button';
import Loader from 'components/Loader';
import Text from 'components/Text';
import { getProduct } from 'config/data/getProduct';

import style from './Product.module.scss';
import RelatedItems from '../RelatedItems';

interface ProductType {
  id: number;
  title: string;
  description: string;
  price: number;
  images: string[];
  category: string;
}

const Product = () => {
  const { id } = useParams<{ id: string }>();

  const [product, setProduct] = useState<ProductType | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const data = await getProduct(Number(id));
        setProduct(data);
      } catch (error: unknown) {
        return <div>Ошибка: {String(error)}</div>;
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [id]);

  return (
    <div className={cn(style.product)}>
      {isLoading ? (
        <Loader />
      ) : product ? (
        <div className="product__wrapper">
          <div className={cn(style.product__card)}>
            <img
              src={product.images[0] ?? '/public/default-image.svg'}
              alt={product.title}
              className={cn(style.product__image)}
            />
            <div className={cn(style.product__info)}>
              <Text view="title" tag="h1" className={cn(style.product__title)}>
                {product.title}
              </Text>
              <Text color="secondary" view="p-20" className={cn(style.product__subtitle)}>
                {product.description}
              </Text>
              <Text view="title">
                <p className={cn(style.product__price)}>{`$${product.price}`}</p>
              </Text>
              <div className={cn(style.product__actions)}>
                <Button className={cn(style.product__action)}>Buy now</Button>
                <Button className={cn(style.product__action, style['product__action_secondary'])}>Add to cart</Button>
              </div>
            </div>
          </div>
          <RelatedItems categoryID={product?.category.id} />
        </div>
      ) : (
        <div>Ошибка: Товар не найден</div>
      )}
    </div>
  );
};

export default Product;
