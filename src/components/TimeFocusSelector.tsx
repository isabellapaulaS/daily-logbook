import { cn } from '@/lib/utils';
import { TimeFocus, TIME_FOCUS_OPTIONS } from '@/types';

interface TimeFocusSelectorProps {
  value: TimeFocus[];
  onChange: (focus: TimeFocus[]) => void;
}

export function TimeFocusSelector({ value, onChange }: TimeFocusSelectorProps) {
  const toggleFocus = (focus: TimeFocus) => {
    if (value.includes(focus)) {
      onChange(value.filter((f) => f !== focus));
    } else {
      onChange([...value, focus]);
    }
  };

  return (
    <div className="space-y-3">
      <h3 className="text-sm font-medium text-muted-foreground">Onde gastou energia?</h3>
      <div className="flex flex-wrap gap-2">
        {(Object.keys(TIME_FOCUS_OPTIONS) as TimeFocus[]).map((focus) => (
          <button
            key={focus}
            type="button"
            data-selected={value.includes(focus)}
            onClick={() => toggleFocus(focus)}
            className={cn(
              'px-3 py-2 rounded-lg text-sm font-medium',
              'transition-all duration-200 ease-out',
              'active:scale-95',
              'bg-tag-bg text-tag-text',
              'data-[selected=true]:bg-tag-bg-active data-[selected=true]:text-tag-text-active',
              'hover:opacity-80'
            )}
          >
            {TIME_FOCUS_OPTIONS[focus]}
          </button>
        ))}
      </div>
    </div>
  );
}
