import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '@/components/Button';
import Card from '@/components/Card';
import Text from '@/components/Text';
import { getAllProducts } from '@/config/data/getAllProducts';
import style from './RelatedItems.module.scss';

interface ProductType {
  id: string;
  title: string;
  description: string;
  price: number;
  images: string[];
  category: {
    id: number;
    name: string;
  };
}

const RelatedItems = ({ categoryID }: { categoryID: string }) => {
  const [relatedItems, setRelatedItems] = useState<ProductType[]>([]);

  useEffect(() => {
    const fetchRelatedItems = async () => {
      const allItems: ProductType[] = await getAllProducts();
      const items = allItems.filter((item) => item.category.id === +categoryID);
      setRelatedItems(items.slice(0, 3));
    };

    fetchRelatedItems();
  }, [categoryID]);

  return (
    <div className={style.relatedItems}>
      <Text className={style.relatedItems__title} view="p-20" weight="bold" color="primary" maxLines={1}>
        Related Items
      </Text>
      <ul className={style.relatedItems__list}>
        {relatedItems.map((product) => (
          <li key={product.id}>
            <Link to={`/products/${product.id}`}>
              <Card
                captionSlot={product.category.name}
                image={product.images[0]}
                title={product.title}
                subtitle={product.description}
                contentSlot={`$${product.price}`}
                actionSlot={
                  <Button
                    onClick={(e) => {
                      e.preventDefault();
                    }}
                  >
                    Add to cart
                  </Button>
                }
              />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RelatedItems;
