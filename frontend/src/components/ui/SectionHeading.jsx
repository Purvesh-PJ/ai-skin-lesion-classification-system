import React from 'react';
import { cn } from '../../lib/utils';

export const SectionHeading = ({
  badge,
  badgeIcon: BadgeIcon,
  title,
  description,
  className,
  titleClassName,
  descriptionClassName,
  badgeClassName,
  align = 'center',
  children,
}) => {
  const isCenter = align === 'center';

  return (
    <div
      className={cn(
        'max-w-[780px] mb-10',
        isCenter ? 'text-center mx-auto' : 'text-left',
        className
      )}
    >
      {badge && (
        <div
          className={cn(
            'inline-flex items-center gap-1.5 px-3.5 py-1 bg-slate-100 dark:bg-[#1e1e1e] border border-slate-200 dark:border-[#2e2e2e] rounded-full text-slate-600 dark:text-slate-400 text-[0.8125rem] font-semibold mb-3',
            badgeClassName
          )}
        >
          {BadgeIcon && <BadgeIcon size={14} />}
          <span>{badge}</span>
        </div>
      )}

      {title && (
        <h2
          className={cn(
            'text-2xl sm:text-[2.25rem] font-extrabold tracking-tight text-slate-900 dark:text-slate-100 mb-3',
            titleClassName
          )}
        >
          {title}
        </h2>
      )}

      {description && (
        <p
          className={cn(
            'text-[1.05rem] text-slate-600 dark:text-slate-400 leading-[1.65]',
            descriptionClassName
          )}
        >
          {description}
        </p>
      )}

      {children}
    </div>
  );
};

export default SectionHeading;
