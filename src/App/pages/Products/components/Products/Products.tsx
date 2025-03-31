import cn from 'classnames';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import Button from 'components/Button';
import Card from 'components/Card';
import Loader from 'components/Loader';
import Filter from '../Filter';
import Text from 'components/Text';
import { getAllProducts } from 'config/data/getAllProducts';
import Pagination from '../Pagination';
import Search from '../Search';
import style from './Products.module.scss';

interface ProductsType {
  id: number;
  title: string;
  description: string;
  price: number;
  images: string[];
  category: string;
}

const Products = () => {
  const [products, setProducts] = useState<ProductsType[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const itemsPerPage = 10;

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const data = await getAllProducts();
        setProducts(data);
      } catch (error: unknown) {
        console.error('Error fetching products:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const filteredProducts = products.filter((product) =>
    searchTerm ? product.title.toLowerCase().includes(searchTerm.toLowerCase()) : true,
  );

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstItem, indexOfLastItem);

  const handleSearchChange = (term: string) => {
    setSearchTerm(term);
    setCurrentPage(1);
  };

  return (
    <div className="container">
      {isLoading ? (
        <Loader />
      ) : products.length === 0 ? (
        <div>Ошибка: продукты не найдены</div>
      ) : (
        <div className={cn(style.products)}>
          <Search searchTerm={searchTerm} onSearchChange={handleSearchChange} />
          <Filter />
          <Text className={cn(style.products__total)} view="subtitle">
            Total products
            <Text view="p-20" color="accent" tag="span">
              {filteredProducts.length}
            </Text>
          </Text>
          <ul className={cn(style.products__list)}>
            {currentProducts.map((product) => (
              <li key={product.id}>
                <Link to={`/products/${product.id}`}>
                  <Card
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
          <Pagination currentPage={currentPage} totalPages={totalPages} onChange={(page) => setCurrentPage(page)} />
        </div>
      )}
    </div>
  );
};

export default Products;
