import cn from 'classnames';
import styleText from '@/components/Text/Text.module.scss';
import ArrowDownIcon from '@/components/icons/ArrowDownIcon';
import style from './Input.module.scss';

export type InputProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'value'> & {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  afterSlot?: boolean;
  className?: string;
};

const Input: React.FC<InputProps> = ({ value, onChange, placeholder, disabled, afterSlot, className }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  return (
    <div className={cn(className, style['input-wrapper'])}>
      <input
        type="text"
        onChange={handleChange}
        value={value}
        placeholder={placeholder}
        disabled={disabled}
        className={cn(style.input, className, styleText['text_p-16'])}
      />
      {afterSlot && (
        <div className={style['input__icon']}>
          <ArrowDownIcon color="secondary" />
        </div>
      )}
    </div>
  );
};

export default Input;
