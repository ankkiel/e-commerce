import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import Button from '@/components/Button';
import Card from '@/components/Card';
import Loader from '@/components/Loader';
import MultiDropdown, { Option } from '@/components/MultiDropdown';
import Text from '@/components/Text';
import { getAllProducts } from '@/config/data/getAllProducts';
import { getProductsCategory } from '@/config/data/getProductsCategory';
import Pagination from '../Pagination';
import Search from '../Search';
import style from './Products.module.scss';

interface ProductsType {
  id: number;
  title: string;
  description: string;
  price: number;
  images: string[];
  category: {
    id: string;
    name: string;
  };
}

const Products = () => {
  const [products, setProducts] = useState<ProductsType[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredProducts, setFilteredProducts] = useState<ProductsType[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<Option[]>([]);
  const itemsPerPage = 10;

  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      try {
        const data = await getAllProducts();
        setProducts(data);
        setFilteredProducts(data);
      } catch (error: unknown) {
        setError(`Error fetching products: ${error instanceof Error ? error.message : String(error)}`);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleSearchChange = (term: string) => {
    setSearchTerm(term);
    setCurrentPage(1);
  };

  const handleFilterChange = (options: Option[]) => {
    setSelectedCategories(options);
    const selectedCategoryKeys = options.map((option) => option.key);
    const newFilteredProducts = products.filter((product) =>
      selectedCategoryKeys.length === 0 ? true : selectedCategoryKeys.includes(product.category.id),
    );
    setFilteredProducts(newFilteredProducts);
    setCurrentPage(1);
  };

  const searchedProducts = filteredProducts.filter((product) =>
    searchTerm ? product.title.toLowerCase().includes(searchTerm.toLowerCase()) : true,
  );

  const totalPages = Math.ceil(searchedProducts.length / itemsPerPage);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentProducts = searchedProducts.slice(indexOfFirstItem, indexOfLastItem);

  const [options, setOptions] = useState<Option[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const categories = await getProductsCategory();
        setOptions(
          categories.map((category: { id: string; name: string }) => ({
            key: category.id,
            value: category.name,
          })),
        );
      } catch (error: unknown) {
        setError(`Error fetching categories: ${error instanceof Error ? error.message : String(error)}`);
      }
    };

    fetchCategories();
  }, []);

  return (
    <div className="container">
      {isLoading ? (
        <Loader />
      ) : error && products.length === 0 ? (
        <div>Ошибка: продукты не найдены</div>
      ) : (
        <div className={style.products}>
          <Search searchTerm={searchTerm} onSearchChange={handleSearchChange} />
          <MultiDropdown
            placeholder="Filter"
            className={style.products__filter}
            options={options}
            value={selectedCategories}
            onChange={handleFilterChange}
          />
          <Text className={style.products__total} view="subtitle">
            Total products
            <Text view="p-20" color="accent" tag="span">
              {searchedProducts.length}
            </Text>
          </Text>
          <ul className={style.products__list}>
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
          {searchedProducts.length > 0 && (
            <Pagination currentPage={currentPage} totalPages={totalPages} onChange={(page) => setCurrentPage(page)} />
          )}
        </div>
      )}
    </div>
  );
};

export default Products;
