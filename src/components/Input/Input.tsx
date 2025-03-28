import cn from 'classnames';
import react, { useState } from 'react';
import Icon from 'components/icons/ArrowDownIcon';
import styleText from '../Text/Text.module.scss';
import style from './Input.module.scss';

export type InputProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'value'> & {
  /** Значение поля */
  value?: string;
  /** Callback, вызываемый при вводе данных в поле */
  onChange?: (value: string) => void;
  /** Слот для иконки справа */
  afterSlot?: React.ReactNode;
};

const Input = react.forwardRef<HTMLInputElement, InputProps>(
  ({ value: initialValue, onChange: onChangeProp, className, placeholder, disabled, afterSlot, ...props }, ref) => {
    const [value, setValue] = useState(initialValue || '');

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.value;
      setValue(newValue);
      onChangeProp?.(newValue);
    };

    return (
      <div ref={ref} className={cn(className, style['input-wrapper'])}>
        <input
          {...props}
          type="text"
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          disabled={disabled}
          className={cn(style.input, styleText['text_p-16'])}
        />
        {afterSlot && (
          <div className={style['input__icon']}>
            <Icon color="secondary" />
          </div>
        )}
      </div>
    );
  },
);

export default Input;
