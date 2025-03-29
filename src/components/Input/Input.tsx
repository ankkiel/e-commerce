import cn from 'classnames';
import { forwardRef } from 'react';
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

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ value, onChange, disabled, placeholder, afterSlot, className, ...props }, ref) => {
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      if (onChange) {
        onChange(event.target.value);
      }
    };

    return (
      <div ref={ref} className={cn(className, style['input-wrapper'])}>
        <input
          {...props}
          type="text"
          onChange={handleChange}
          value={value}
          placeholder={placeholder}
          disabled={disabled}
          className={cn(style.input, styleText['text_p-16'])}
          ref={ref}
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
