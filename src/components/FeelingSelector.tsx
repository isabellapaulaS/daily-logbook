import { cn } from '@/lib/utils';
import { Feeling, FEELINGS } from '@/types';

interface FeelingSelectorProps {
  value: Feeling | null;
  onChange: (feeling: Feeling) => void;
}

const feelingStyles: Record<Feeling, string> = {
  empolgada: 'hover:bg-feeling-empolgada/10 data-[selected=true]:bg-feeling-empolgada/15 data-[selected=true]:ring-feeling-empolgada',
  bem: 'hover:bg-feeling-bem/10 data-[selected=true]:bg-feeling-bem/15 data-[selected=true]:ring-feeling-bem',
  neutra: 'hover:bg-feeling-neutra/10 data-[selected=true]:bg-feeling-neutra/20 data-[selected=true]:ring-feeling-neutra',
  sobrecarregada: 'hover:bg-feeling-sobrecarregada/10 data-[selected=true]:bg-feeling-sobrecarregada/15 data-[selected=true]:ring-feeling-sobrecarregada',
  frustrada: 'hover:bg-feeling-frustrada/10 data-[selected=true]:bg-feeling-frustrada/15 data-[selected=true]:ring-feeling-frustrada',
};

export function FeelingSelector({ value, onChange }: FeelingSelectorProps) {
  return (
    <div className="space-y-3">
      <h3 className="text-sm font-medium text-muted-foreground">Como você se sentiu hoje?</h3>
      <div className="grid grid-cols-5 gap-2">
        {(Object.keys(FEELINGS) as Feeling[]).map((feeling) => (
          <button
            key={feeling}
            type="button"
            data-selected={value === feeling}
            onClick={() => onChange(feeling)}
            className={cn(
              'flex flex-col items-center gap-1.5 p-3 rounded-xl',
              'bg-card border border-border/50',
              'transition-all duration-200 ease-out',
              'ring-2 ring-transparent',
              'active:scale-95',
              feelingStyles[feeling]
            )}
          >
            <span className="text-2xl">{FEELINGS[feeling].emoji}</span>
            <span className="text-[10px] font-medium text-muted-foreground leading-tight text-center">
              {FEELINGS[feeling].label}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
