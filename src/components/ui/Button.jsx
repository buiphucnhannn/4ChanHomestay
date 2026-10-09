import { cn } from '@/lib/utils';

const variants = {
  primary: 'bg-amber-500 text-white hover:bg-amber-600 shadow-lg shadow-amber-500/25',
  secondary: 'bg-stone-900 text-white hover:bg-stone-800',
  outline: 'border border-stone-300 bg-white hover:border-stone-900 hover:text-stone-900 text-stone-700',
  ghost: 'text-stone-700 hover:bg-stone-100',
};

const sizes = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-3 text-sm',
  lg: 'px-8 py-4 text-base',
};

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  href,
  ...props
}) {
  const cls = cn(
    'inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-all duration-200 active:scale-[0.98]',
    variants[variant],
    sizes[size],
    className
  );

  if (href) {
    const isAnchor = href.startsWith('#');
    return (
      <a href={href} className={cls} {...props}>
        {children}
      </a>
    );
  }

  return (
    <button className={cls} {...props}>
      {children}
    </button>
  );
}
