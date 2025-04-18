import cn from 'classnames';
import { useState, useEffect, useRef } from 'react';
import styleInput from '@/components/Input/Input.module.scss';
import Text from '@/components/Text';
import styleText from '@/components/Text/Text.module.scss';
import ArrowDownIcon from '@/components/icons/ArrowDownIcon';
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
  placeholder?: string;
  getTitle?: (value: Option[]) => string;
  onChange?: (value: Option[]) => void;
  afterSlot?: boolean;
};

const MultiDropdown: React.FC<MultiDropdownProps> = ({
  className,
  options,
  placeholder,
  value: propValue = [],
  disabled = false,
  getTitle = (values: Option[]) => values.map(({ value }) => value).join(', '),
  onChange = () => {},
}) => {
  const [showDropdown, setShowDropdown] = useState<boolean>(false);
  const [selectedOptions, setSelectedOptions] = useState<Option[]>(propValue);
  const [filteredOptions, setFilteredOptions] = useState<Option[]>(options);

  const inputChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;
    const filtered = options.filter((option) => option.value.toLowerCase().includes(inputValue.toLowerCase()));
    setFilteredOptions(filtered);
  };

  const toggleDropdown = () => {
    if (!disabled) {
      setShowDropdown((prev) => !prev);
    }
  };

  const selectOption = (option: Option) => {
    const selected = selectedOptions.some((v) => v.key === option.key);
    const newValue = selected ? selectedOptions.filter((v) => v.key !== option.key) : [...selectedOptions, option];

    setSelectedOptions(newValue);
    onChange(newValue);
    setShowDropdown(false);
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
    <div ref={dropdownRef} className={cn(styleInput['input-wrapper'], className)}>
      <input
        value={getTitle(selectedOptions)}
        disabled={disabled}
        placeholder={placeholder}
        onChange={inputChanged}
        className={cn(styleInput.input, styleText['text_p-16'])}
        onClick={toggleDropdown}
      />

      <div className={styleInput['input__icon']} onClick={toggleDropdown}>
        <ArrowDownIcon color="secondary" />
      </div>

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
