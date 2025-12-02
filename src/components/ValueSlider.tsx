import { cn } from '@/lib/utils';
import { Slider } from '@/components/ui/slider';

interface ValueSliderProps {
  value: number;
  onChange: (value: number) => void;
}

const valueLabels = ['', 'Pouco', 'Algum', 'Moderado', 'Bastante', 'Muito'];

export function ValueSlider({ value, onChange }: ValueSliderProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium text-muted-foreground">Quanto valor agreguei hoje?</h3>
        <span className="text-sm font-semibold text-primary">
          {value}/5 · {valueLabels[value]}
        </span>
      </div>
      <div className="px-1">
        <Slider
          value={[value]}
          onValueChange={([v]) => onChange(v)}
          min={1}
          max={5}
          step={1}
          className="w-full"
        />
        <div className="flex justify-between mt-2 text-[10px] text-muted-foreground">
          <span>1</span>
          <span>2</span>
          <span>3</span>
          <span>4</span>
          <span>5</span>
        </div>
      </div>
    </div>
  );
}
