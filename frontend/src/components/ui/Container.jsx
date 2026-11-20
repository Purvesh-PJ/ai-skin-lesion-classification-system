import React from 'react';
import { cn } from '../../lib/utils';

export const Container = ({
  children,
  className,
  size = 'default',
  as: Component = 'div',
  ...props
}) => {
  const sizeMap = {
    sm: 'max-w-[780px]',
    default: 'max-w-[1140px]',
    lg: 'max-w-[1240px]',
    full: 'max-w-full',
  };

  return (
    <Component
      className={cn('mx-auto px-4 sm:px-6 w-full', sizeMap[size] || sizeMap.default, className)}
      {...props}
    >
      {children}
    </Component>
  );
};

export default Container;
