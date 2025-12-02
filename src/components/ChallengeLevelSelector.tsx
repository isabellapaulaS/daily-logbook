import { cn } from '@/lib/utils';
import { ChallengeLevel, CHALLENGE_LEVELS } from '@/types';

interface ChallengeLevelSelectorProps {
  value: ChallengeLevel | null;
  onChange: (level: ChallengeLevel) => void;
}

const levelStyles: Record<ChallengeLevel, string> = {
  conforto: 'hover:bg-challenge-conforto/10 data-[selected=true]:bg-challenge-conforto/15 data-[selected=true]:border-challenge-conforto data-[selected=true]:text-challenge-conforto',
  aprendizado: 'hover:bg-challenge-aprendizado/10 data-[selected=true]:bg-challenge-aprendizado/15 data-[selected=true]:border-challenge-aprendizado data-[selected=true]:text-challenge-aprendizado',
  panico: 'hover:bg-challenge-panico/10 data-[selected=true]:bg-challenge-panico/15 data-[selected=true]:border-challenge-panico data-[selected=true]:text-challenge-panico',
};

export function ChallengeLevelSelector({ value, onChange }: ChallengeLevelSelectorProps) {
  return (
    <div className="space-y-3">
      <h3 className="text-sm font-medium text-muted-foreground">Nível de Desafio</h3>
      <div className="grid grid-cols-3 gap-2">
        {(Object.keys(CHALLENGE_LEVELS) as ChallengeLevel[]).map((level) => (
          <button
            key={level}
            type="button"
            data-selected={value === level}
            onClick={() => onChange(level)}
            className={cn(
              'flex flex-col items-center gap-1.5 p-4 rounded-xl',
              'bg-card border-2 border-border/50',
              'transition-all duration-200 ease-out',
              'active:scale-95',
              levelStyles[level]
            )}
          >
            <span className="text-lg">{CHALLENGE_LEVELS[level].emoji}</span>
            <span className="text-xs font-semibold">
              {CHALLENGE_LEVELS[level].label}
            </span>
            <span className="text-[10px] text-muted-foreground">
              {level === 'conforto' ? 'Fácil' : level === 'aprendizado' ? 'Médio' : 'Difícil'}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
