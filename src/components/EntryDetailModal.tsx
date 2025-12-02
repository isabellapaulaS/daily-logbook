import { X } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { DailyEntry, FEELINGS, CHALLENGE_LEVELS, TIME_FOCUS_OPTIONS } from '@/types';
import { cn } from '@/lib/utils';

interface EntryDetailModalProps {
  entry: DailyEntry | null;
  open: boolean;
  onClose: () => void;
}

const challengeColors: Record<string, string> = {
  conforto: 'bg-challenge-conforto/15 text-challenge-conforto',
  aprendizado: 'bg-challenge-aprendizado/15 text-challenge-aprendizado',
  panico: 'bg-challenge-panico/15 text-challenge-panico',
};

export function EntryDetailModal({ entry, open, onClose }: EntryDetailModalProps) {
  if (!entry) return null;

  const date = new Date(entry.date + 'T12:00:00');
  const formattedDate = date.toLocaleDateString('pt-BR', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  });

  const sections = [
    { icon: '📝', title: 'Resumo', content: entry.resumoLivre },
    { icon: '🚀', title: 'Execução & Técnica', content: entry.execucaoTecnica },
    { icon: '📅', title: 'Gestão & Organização', content: entry.gestaoOrganizacao },
    { icon: '🤝', title: 'Pessoas & Cliente', content: entry.pessoasCliente },
    { icon: '💡', title: 'Inovação & Extra', content: entry.inovacaoExtra },
  ].filter((s) => s.content);

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-lg max-h-[85vh] p-0 gap-0 bg-card border-border overflow-hidden">
        <DialogHeader className="px-5 pt-5 pb-4 border-b border-border/50">
          <DialogTitle className="text-left">
            <span className="capitalize text-base font-semibold text-foreground">
              {formattedDate}
            </span>
            <span className="block text-sm font-normal text-muted-foreground mt-1">
              {entry.project}
            </span>
          </DialogTitle>
        </DialogHeader>

        <ScrollArea className="max-h-[60vh]">
          <div className="px-5 py-4 space-y-5">
            {/* Metrics Summary */}
            <div className="flex items-center gap-4 p-4 bg-secondary/50 rounded-xl">
              <div className="flex flex-col items-center">
                <span className="text-3xl">{FEELINGS[entry.feeling].emoji}</span>
                <span className="text-[10px] text-muted-foreground mt-1">
                  {FEELINGS[entry.feeling].label}
                </span>
              </div>
              <div className="h-10 w-px bg-border" />
              <div className="flex-1 space-y-2">
                <div className="flex items-center gap-2">
                  <span
                    className={cn(
                      'px-2 py-1 rounded-md text-xs font-semibold',
                      challengeColors[entry.challengeLevel]
                    )}
                  >
                    {CHALLENGE_LEVELS[entry.challengeLevel].label}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    Valor: {entry.valueScore}/5
                  </span>
                </div>
                <div className="flex flex-wrap gap-1">
                  {entry.timeFocus.map((focus) => (
                    <span
                      key={focus}
                      className="px-2 py-0.5 bg-tag-bg text-tag-text rounded text-[10px] font-medium"
                    >
                      {TIME_FOCUS_OPTIONS[focus]}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Text Sections */}
            {sections.map((section) => (
              <div key={section.title} className="space-y-2">
                <div className="flex items-center gap-2">
                  <span>{section.icon}</span>
                  <h4 className="text-sm font-semibold text-foreground">{section.title}</h4>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed pl-6">
                  {section.content}
                </p>
              </div>
            ))}

            {sections.length === 0 && (
              <p className="text-sm text-muted-foreground text-center py-4">
                Nenhuma anotação registrada neste dia.
              </p>
            )}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
