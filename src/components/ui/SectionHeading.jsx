import { cn } from '@/lib/utils';

export default function SectionHeading({
  eyebrow,
  title,
  desc,
  align = 'center',
  dark = false,
}) {
  return (
    <div
      className={cn(
        'max-w-2xl',
        align === 'center' ? 'mx-auto text-center' : 'text-left'
      )}
    >
      {eyebrow && (
        <p className="mb-3 inline-flex items-center gap-2 rounded-full bg-amber-100 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-amber-700">
          <span className="h-1.5 w-1.5 rounded-full bg-amber-500" />
          {eyebrow}
        </p>
      )}
      <h2
        className={cn(
          'text-3xl font-extrabold tracking-tight sm:text-4xl',
          dark ? 'text-white' : 'text-stone-900'
        )}
      >
        {title}
      </h2>
      {desc && (
        <p className={cn('mt-4 text-base leading-relaxed', dark ? 'text-stone-300' : 'text-stone-600')}>
          {desc}
        </p>
      )}
    </div>
  );
}
