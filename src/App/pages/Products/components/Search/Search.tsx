import cn from 'classnames';
import { ChangeEvent } from 'react';
import Button from 'components/Button';
import Input from 'components/Input';
import style from './Search.module.scss';

interface SearchProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
}

const Search = ({ searchTerm, onSearchChange }: SearchProps) => {
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    onSearchChange(e.target.value);
  };

  return (
    <div className={cn(style.search)}>
      <div className={cn(style['search__wrapper'])}>
        <Input placeholder="Search product" value={searchTerm || ''} onChange={handleInputChange} />
        <Button className={cn(style['search__button'])} onClick={() => onSearchChange(searchTerm)}>
          Find now
        </Button>
      </div>
    </div>
  );
};

export default Search;
