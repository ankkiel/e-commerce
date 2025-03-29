import cn from 'classnames';
import { useState, useEffect, useRef } from 'react';
import Text from 'components/Text';
import Input from '../Input';
import style from './MultiDropdown.module.scss';

export type Option = {
  key: string;
  value: string;
};

export type MultiDropdownProps = {
  className?: string;
  options: Option[];
  value?: Option[];
  disabled?: boolean;
  children?: React.ReactNode;
  getTitle?: (value: Option[]) => string;
};

const MultiDropdown: React.FC<MultiDropdownProps> = ({
  className,
  options,
  value: propValue = [],
  disabled = false,
  getTitle = (values: Option[]) => values.map(({ value }) => value).join(', '),
}) => {
  const [showDropdown, setShowDropdown] = useState<boolean>(false);
  const [selectedOptions, setSelectedOptions] = useState<Option[]>(propValue);
  const [filteredOptions, setFilteredOptions] = useState<Option[]>(options);

  const inputChanged = (inputValue: string) => {
    const filtered = options.filter((option) => option.value.toLowerCase().includes(inputValue.toLowerCase()));
    setFilteredOptions(filtered);
  };

  const inputFocused = () => setShowDropdown(true);

  const selectOption = (option: Option) => {
    const selected = selectedOptions.some((v) => v.key === option.key);
    const newValue = selected ? selectedOptions.filter((v) => v.key !== option.key) : [...selectedOptions, option];
    setSelectedOptions(newValue);
  };

  const optionActive = (option: Option) => selectedOptions.some((v) => v.key === option.key);

  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('mousedown', onClickOutside);

    return () => {
      document.removeEventListener('mousedown', onClickOutside);
    };
  }, []);

  return (
    <div ref={dropdownRef} className={className}>
      <Input
        value={getTitle(selectedOptions)}
        disabled={disabled}
        placeholder={getTitle(selectedOptions)}
        onChange={inputChanged}
        onFocus={inputFocused}
        afterSlot={true}
        onClick={() => setShowDropdown(true)}
      />
      {showDropdown && !disabled && (
        <div className={style.dropdown}>
          {filteredOptions.map((option) => (
            <div
              key={option.key}
              onClick={() => selectOption(option)}
              className={cn(style.option, { [style['option_active']]: optionActive(option) })}
            >
              <Text view="p-16">{option.value}</Text>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MultiDropdown;
