import { ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { DailyEntry, FEELINGS, CHALLENGE_LEVELS } from '@/types';

interface EntryCardProps {
  entry: DailyEntry;
  onClick: () => void;
}

const challengeColors: Record<string, string> = {
  conforto: 'bg-challenge-conforto/15 text-challenge-conforto',
  aprendizado: 'bg-challenge-aprendizado/15 text-challenge-aprendizado',
  panico: 'bg-challenge-panico/15 text-challenge-panico',
};

export function EntryCard({ entry, onClick }: EntryCardProps) {
  const date = new Date(entry.date + 'T12:00:00');
  const day = date.getDate();
  const weekday = date.toLocaleDateString('pt-BR', { weekday: 'short' });

  return (
    <button
      onClick={onClick}
      className={cn(
        'w-full flex items-center gap-4 p-4 rounded-xl',
        'bg-card border border-border/50 shadow-card',
        'transition-all duration-200 ease-out',
        'hover:shadow-card-hover hover:border-border',
        'active:scale-[0.98]'
      )}
    >
      {/* Date */}
      <div className="flex flex-col items-center min-w-[48px]">
        <span className="text-2xl font-bold text-foreground">{day}</span>
        <span className="text-[10px] font-medium text-muted-foreground uppercase">
          {weekday}
        </span>
      </div>

      {/* Divider */}
      <div className="h-10 w-px bg-border/50" />

      {/* Content */}
      <div className="flex-1 flex items-center gap-3">
        <span className="text-2xl">{FEELINGS[entry.feeling].emoji}</span>
        <span
          className={cn(
            'px-2 py-1 rounded-md text-xs font-semibold',
            challengeColors[entry.challengeLevel]
          )}
        >
          {CHALLENGE_LEVELS[entry.challengeLevel].label}
        </span>
      </div>

      {/* Arrow */}
      <ChevronRight className="w-5 h-5 text-muted-foreground" />
    </button>
  );
}
