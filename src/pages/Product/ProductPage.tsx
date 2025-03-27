import { useParams } from 'react-router-dom';

import { PRODUCTS } from 'config/products';

const ProductPage = () => {
  const { id } = useParams();

  const product = PRODUCTS.find((product) => product.id === id);

  if (!product) {
    return <div>Продукт не найден</div>;
  }

  return <div>{product.name}</div>;
};

export default ProductPage;
