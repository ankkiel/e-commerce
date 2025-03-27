import { Link } from 'react-router-dom';
import { PRODUCTS } from '../../config/products';

const ProductsPage = () => {
  return (
    <ul>
      {PRODUCTS.map((product: { id: string; name: string }) => (
        <li key={product.id}>
          <Link to={`/products/${product.id}`}>{product.name}</Link>
        </li>
      ))}
    </ul>
  );
};

export default ProductsPage;
