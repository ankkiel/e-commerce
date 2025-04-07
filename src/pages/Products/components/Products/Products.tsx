import { observer } from 'mobx-react-lite';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import Button from '@/components/Button';
import Card from '@/components/Card';
import Loader from '@/components/Loader';
import MultiDropdown, { Option } from '@/components/MultiDropdown';
import Text from '@/components/Text';

import CategoryStore from '@/store/CategoryStore';
import ProductsStore from '@/store/ProductsStore';
import { ProductItemModel } from '@/store/models/products/productitem';
import { useLocalStore } from '@/utils/useLocalStore';

import Pagination from '../Pagination';
import Search from '../Search';

import style from './Products.module.scss';

const Products = () => {
  const productsStore = useLocalStore(() => new ProductsStore());
  const categoryStore = useLocalStore(() => new CategoryStore());

  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    productsStore
      .getProductsList()
      .then(() => setFilteredProducts(productsStore.list))
      .catch(setError);
  }, [productsStore]);

  useEffect(() => {
    categoryStore.getCategoryList().then(() => {
      setOptions(categoryStore.list.map(({ id, name }) => ({ key: id, value: name })));
    });
  }, [categoryStore]);

  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredProducts, setFilteredProducts] = useState<ProductItemModel[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<Option[]>([]);
  const itemsPerPage = 10;

  const searchedProducts = filteredProducts.filter((product) =>
    searchTerm ? product.title.toLowerCase().includes(searchTerm.toLowerCase()) : true,
  );

  const handleSearchChange = (term: string) => {
    setSearchTerm(term);
    setCurrentPage(1);
  };

  const handleFilterChange = (options: Option[]) => {
    setSelectedCategories(options);
    const selectedCategoryKeys = options.map((option) => option.key);
    const newFilteredProducts = productsStore.list.filter((product) =>
      selectedCategoryKeys.length === 0 ? true : selectedCategoryKeys.includes(product.category.id),
    );
    setFilteredProducts(newFilteredProducts);
    setCurrentPage(1);
  };

  const totalPages = Math.ceil(searchedProducts.length / itemsPerPage);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentProducts = searchedProducts.slice(indexOfFirstItem, indexOfLastItem);

  const [options, setOptions] = useState<Option[]>([]);

  return (
    <div className="container">
      {error ? (
        <div>Ошибка: {error}</div>
      ) : productsStore.meta === 'loading' ? (
        <Loader />
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
                    image={
                      product.images[0]?.match(/\.(png|jpg|jpeg)$/) ? product.images[0] : '/public/default-image.svg'
                    }
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

export default observer(Products);
