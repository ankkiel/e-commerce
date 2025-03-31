import axios from 'axios';
import { useState, useEffect } from 'react';
import MultiDropdown from 'components/MultiDropdown';
import { Option } from 'components/MultiDropdown/MultiDropdown';
import style from './Filter.module.scss';

const Filter = () => {
  const [options, setOptions] = useState<Option[]>([]);
  const [selectedOptions, setSelectedOptions] = useState<Option[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get('https://api.escuelajs.co/api/v1/categories');
        setOptions(res.data.map((category: []) => ({ key: category.slug, value: category.name })));
      } catch (error: unknown) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  return (
    <MultiDropdown
      className={style.filter}
      placeholder="Category"
      options={options}
      value={selectedOptions}
      onChange={setSelectedOptions}
    />
  );
};

export default Filter;
