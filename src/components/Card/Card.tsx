import cn from 'classnames';
import Text from '../Text';
import style from './Card.module.scss';

export type CardProps = {
  /** Дополнительный classname */
  className?: string;
  /** URL изображения */
  image: string;
  /** Слот над заголовком */
  captionSlot?: React.ReactNode;
  /** Заголовок карточки */
  title: React.ReactNode;
  /** Описание карточки */
  subtitle: React.ReactNode;
  /** Содержимое карточки (футер/боковая часть), может быть пустым */
  contentSlot?: React.ReactNode;
  /** Клик на карточку */
  onClick?: React.MouseEventHandler;
  /** Слот для действия */
  actionSlot?: React.ReactNode;
};

const Card: React.FC<CardProps> = ({
  className = '',
  image,
  captionSlot,
  title,
  subtitle,
  contentSlot,
  onClick,
  actionSlot,
}) => {
  return (
    <div className={cn(style.card, className)} onClick={onClick}>
      <img className={style.card__image} src={image} alt="card" />
      <div className={style.card__content}>
        {captionSlot && (
          <Text view="p-14" tag="span" weight="medium" color="secondary" maxLines={1}>
            {captionSlot}
          </Text>
        )}
        <Text view="p-20" tag="h1" weight="medium" color="primary" maxLines={2}>
          {title}
        </Text>
        <Text className={style.card__subtitle} view="p-16" tag="p" weight="normal" color="secondary" maxLines={3}>
          {subtitle}
        </Text>
        {contentSlot && (
          <div className={style.card__footer}>
            <Text view="p-18" tag="span" weight="bold" color="primary" maxLines={1}>
              {contentSlot}
            </Text>
            {actionSlot}
          </div>
        )}
      </div>
    </div>
  );
};

export default Card;
