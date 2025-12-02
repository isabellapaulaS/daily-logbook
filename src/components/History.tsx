import { useState, useMemo } from 'react';
import { Copy, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { EntryCard } from './EntryCard';
import { EntryDetailModal } from './EntryDetailModal';
import { mockEntries } from '@/data/mockData';
import { DailyEntry, FEELINGS, CHALLENGE_LEVELS, TIME_FOCUS_OPTIONS } from '@/types';
import { toast } from '@/hooks/use-toast';

export function History() {
  const [selectedEntry, setSelectedEntry] = useState<DailyEntry | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  // Group entries by month
  const groupedEntries = useMemo(() => {
    const groups: Record<string, DailyEntry[]> = {};
    
    mockEntries.forEach((entry) => {
      const date = new Date(entry.date + 'T12:00:00');
      const monthYear = date.toLocaleDateString('pt-BR', {
        month: 'long',
        year: 'numeric',
      });
      
      if (!groups[monthYear]) {
        groups[monthYear] = [];
      }
      groups[monthYear].push(entry);
    });

    // Sort entries within each group by date (newest first)
    Object.keys(groups).forEach((key) => {
      groups[key].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    });

    return groups;
  }, []);

  const handleExport = () => {
    const currentMonth = Object.keys(groupedEntries)[0];
    const entries = groupedEntries[currentMonth] || [];

    const exportText = entries
      .map((entry) => {
        const date = new Date(entry.date + 'T12:00:00').toLocaleDateString('pt-BR');
        return `
📅 ${date} - ${entry.project}
Sentimento: ${FEELINGS[entry.feeling].emoji} ${FEELINGS[entry.feeling].label}
Desafio: ${CHALLENGE_LEVELS[entry.challengeLevel].label}
Foco: ${entry.timeFocus.map((f) => TIME_FOCUS_OPTIONS[f]).join(', ')}
Valor agregado: ${entry.valueScore}/5

${entry.resumoLivre ? `📝 Resumo: ${entry.resumoLivre}` : ''}
${entry.execucaoTecnica ? `🚀 Execução: ${entry.execucaoTecnica}` : ''}
${entry.gestaoOrganizacao ? `📅 Gestão: ${entry.gestaoOrganizacao}` : ''}
${entry.pessoasCliente ? `🤝 Pessoas: ${entry.pessoasCliente}` : ''}
${entry.inovacaoExtra ? `💡 Inovação: ${entry.inovacaoExtra}` : ''}
-------------------`;
      })
      .join('\n');

    navigator.clipboard.writeText(exportText);
    toast({
      title: '📋 Copiado para área de transferência!',
      description: `${entries.length} registros de ${currentMonth} prontos para colar.`,
    });
  };

  const handleCardClick = (entry: DailyEntry) => {
    setSelectedEntry(entry);
    setModalOpen(true);
  };

  return (
    <div className="min-h-full pb-24">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-background/95 backdrop-blur-sm border-b border-border/50 px-4 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-lg font-semibold text-foreground">Histórico</h1>
            <p className="text-xs text-muted-foreground">
              {mockEntries.length} registros salvos
            </p>
          </div>
          <Button
            onClick={handleExport}
            variant="outline"
            size="sm"
            className="gap-2"
          >
            <Copy className="w-4 h-4" />
            <span className="hidden sm:inline">Exportar para IA</span>
            <span className="sm:hidden">Exportar</span>
          </Button>
        </div>
      </header>

      <div className="px-4 py-6 space-y-6">
        {Object.entries(groupedEntries).map(([monthYear, entries]) => (
          <section key={monthYear} className="space-y-3">
            <h2 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground capitalize">
              {monthYear}
            </h2>
            <div className="space-y-2">
              {entries.map((entry) => (
                <EntryCard
                  key={entry.id}
                  entry={entry}
                  onClick={() => handleCardClick(entry)}
                />
              ))}
            </div>
          </section>
        ))}

        {Object.keys(groupedEntries).length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Nenhum registro encontrado.</p>
            <p className="text-sm text-muted-foreground mt-1">
              Comece salvando seu primeiro dia!
            </p>
          </div>
        )}
      </div>

      <EntryDetailModal
        entry={selectedEntry}
        open={modalOpen}
        onClose={() => setModalOpen(false)}
      />
    </div>
  );
}
