import cn from 'classnames';
import { useState } from 'react';
import Icon from '../icons/CheckIcon';
import style from './CheckBox.module.scss';

export type CheckBoxProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'> & {
  /** Вызывается при клике на чекбокс */
  onChange: (checked: boolean) => void;
};

const CheckBox: React.FC<CheckBoxProps> = ({ onChange, checked = false, disabled = false, className, ...props }) => {
  const [isChecked, setIsChecked] = useState(checked);

  const handleCheckChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsChecked(event.target.checked);
    onChange(event.target.checked);
  };

  return (
    <div className={style.checkbox}>
      <label className={style.checkbox__label}>
        <input
          className={cn(style.checkbox__input, className)}
          type="checkbox"
          disabled={disabled}
          checked={isChecked}
          onChange={handleCheckChange}
          {...props}
        />
        <span
          className={cn(style['checkbox__indicator'], {
            [style.checkbox_default]: !isChecked && !disabled,
            [style.checkbox_disabled]: disabled,
            [style.checkbox_checked]: isChecked && !disabled,
          })}
        >
          {isChecked && !disabled && <Icon width={40} height={40} color="accent" />}
          {isChecked && disabled && <Icon width={40} height={40} color="primary" opacity={0.2} />}
        </span>
      </label>
    </div>
  );
};

export default CheckBox;
