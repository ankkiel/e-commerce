import { useState } from 'react';
import Button from '@/components/Button';
import Input from '@/components/Input';
import style from './Search.module.scss';

interface SearchProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
}

const Search = ({ searchTerm, onSearchChange }: SearchProps) => {
  const [inputValue, setInputValue] = useState(searchTerm || '');

  const handleInputChange = (value: string) => {
    setInputValue(value);
  };

  const handleSearch = () => {
    onSearchChange(inputValue);
  };

  return (
    <div className={style.search}>
      <div className={style.search__wrapper}>
        <Input placeholder="Search product" value={inputValue} onChange={handleInputChange} />
        <Button className={style['search__button']} onClick={handleSearch}>
          Find now
        </Button>
      </div>
    </div>
  );
};

export default Search;
