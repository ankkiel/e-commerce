import cn from 'classnames';
import * as React from 'react';
import style from './Icon.module.scss';

export type IconProps = React.SVGAttributes<SVGElement> & {
  className?: string;
  color?: 'primary' | 'secondary' | 'accent';
};

const Icon: React.FC<React.PropsWithChildren<IconProps>> = ({
  className,
  color,
  children,
  width = '24',
  height = '24',
  viewBox = `0 0 24 24`,
  ...props
}) => {
  const strokeColor = color ? style[`icon_stroke-${color}`] : style['icon_stroke-primary'];

  return (
    <svg
      className={cn(className, style.icon, strokeColor)}
      width={width}
      height={height}
      viewBox={viewBox}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      {...props}
    >
      {children}
    </svg>
  );
};

export default Icon;
