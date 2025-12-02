import { PenLine, History } from 'lucide-react';
import { cn } from '@/lib/utils';

type Tab = 'novo' | 'historico';

interface BottomNavProps {
  activeTab: Tab;
  onTabChange: (tab: Tab) => void;
}

export function BottomNav({ activeTab, onTabChange }: BottomNavProps) {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-card/95 backdrop-blur-lg border-t border-border/50 safe-area-bottom">
      <div className="flex items-center justify-around h-16 max-w-lg mx-auto">
        <button
          onClick={() => onTabChange('novo')}
          className={cn(
            'flex flex-col items-center gap-1 px-6 py-2 rounded-xl transition-all duration-200',
            activeTab === 'novo'
              ? 'text-primary'
              : 'text-muted-foreground hover:text-foreground'
          )}
        >
          <PenLine
            className={cn(
              'w-5 h-5 transition-transform duration-200',
              activeTab === 'novo' && 'scale-110'
            )}
          />
          <span className="text-[10px] font-semibold">Novo Registro</span>
          {activeTab === 'novo' && (
            <div className="absolute bottom-2 w-1 h-1 rounded-full bg-primary animate-pulse-soft" />
          )}
        </button>

        <button
          onClick={() => onTabChange('historico')}
          className={cn(
            'flex flex-col items-center gap-1 px-6 py-2 rounded-xl transition-all duration-200',
            activeTab === 'historico'
              ? 'text-primary'
              : 'text-muted-foreground hover:text-foreground'
          )}
        >
          <History
            className={cn(
              'w-5 h-5 transition-transform duration-200',
              activeTab === 'historico' && 'scale-110'
            )}
          />
          <span className="text-[10px] font-semibold">Histórico</span>
          {activeTab === 'historico' && (
            <div className="absolute bottom-2 w-1 h-1 rounded-full bg-primary animate-pulse-soft" />
          )}
        </button>
      </div>
    </nav>
  );
}
