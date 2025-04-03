import cn from 'classnames';
import Loader from '../Loader';
import Text from '../Text';
import style from './Button.module.scss';

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  /** Состояние загрузки */
  loading?: boolean;
  /** Текст кнопки */
  children: React.ReactNode;
  className?: string;
};

const Button: React.FC<ButtonProps> = ({ loading = false, children, className, disabled = false, ...props }) => {
  return (
    <button
      {...props}
      className={cn(
        style.button,
        {
          [style[`button_default`]]: !disabled,
          [style[`button_loading`]]: loading,
        },
        className,
      )}
      disabled={disabled}
    >
      {loading && <Loader size="s" type="static" />}
      <Text view="button">{children}</Text>
    </button>
  );
};

export default Button;
