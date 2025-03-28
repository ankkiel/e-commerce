import cn from 'classnames';
import style from './Text.module.scss';

export type TextProps = {
  /** Дополнительный класс */
  className?: string;
  /** Стиль отображения */
  view?: 'title' | 'button' | 'p-20' | 'p-18' | 'p-16' | 'p-14';
  /** Html-тег */
  tag?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'div' | 'p' | 'span';
  /** Начертание шрифта */
  weight?: 'normal' | 'medium' | 'bold';
  /** Контент */
  children: React.ReactNode;
  /** Цвет */
  color?: 'primary' | 'secondary' | 'accent';
  /** Максимальное кол-во строк */
  maxLines?: number;
};

const Text: React.FC<TextProps> = ({
  className,
  view = 'p-14',
  tag: Tag = 'p',
  weight,
  children,
  color,
  maxLines = 10,
}) => {
  const classes = cn(
    style.text,
    view && style[`text_${view}`],
    weight && style[`text_${weight}`],
    color && style[`text_${color}`],
    className,
  );

  const textProps = maxLines
    ? {
        className: classes,
        style: { WebkitLineClamp: maxLines },
      }
    : { className: classes };

  return <Tag {...textProps}>{children}</Tag>;
};

export default Text;
