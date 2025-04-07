import cn from 'classnames';
import { observer } from 'mobx-react-lite';

import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Button from '@/components/Button';
import Loader from '@/components/Loader';
import Text from '@/components/Text';

import ProductsStore from '@/store/ProductsStore';
import { ProductItemModel } from '@/store/models/products/productitem';
import { useLocalStore } from '@/utils/useLocalStore';

import RelatedItems from '../RelatedItems';
import style from './Product.module.scss';

const Product = () => {
  const { id } = useParams();

  const productStore = useLocalStore(() => new ProductsStore());

  const [product, setProduct] = useState<ProductItemModel | null>(null);

  useEffect(() => {
    const fetchProduct = async (id: string) => {
      await productStore.getProduct(id);

      setProduct(productStore.product);
    };

    if (id) {
      fetchProduct(id);
    }
  }, [productStore, id]);

  return productStore.meta === 'loading' ? (
    <Loader />
  ) : (
    <div className={style.product}>
      {product && (
        <>
          <div className={style.product__card}>
            <img
              src={product.images[0]?.match(/\.(png|jpg|jpeg)$/) ? product.images[0] : '/public/default-image.svg'}
              alt={product.title}
              className={style.product__image}
            />
            <div className={style.product__info}>
              <Text view="title" tag="h1" className={style.product__title}>
                {product.title}
              </Text>
              <Text color="secondary" view="p-20" className={style.product__subtitle}>
                {product.description}
              </Text>
              <Text view="title" className={style.product__price}>
                {`$${product.price}`}
              </Text>
              <div className={style.product__actions}>
                <Button className={style.product__action}>Buy now</Button>
                <Button className={cn(style.product__action, style.product__action_secondary)}>Add to cart</Button>
              </div>
            </div>
          </div>
          <RelatedItems categoryID={product.category.id.toString()} />
        </>
      )}
    </div>
  );
};

export default observer(Product);
