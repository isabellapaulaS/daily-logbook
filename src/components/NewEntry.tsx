import { useState } from 'react';
import { Calendar, ChevronDown, Save } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { FeelingSelector } from './FeelingSelector';
import { ChallengeLevelSelector } from './ChallengeLevelSelector';
import { TimeFocusSelector } from './TimeFocusSelector';
import { ValueSlider } from './ValueSlider';
import { DiaryAccordion } from './DiaryAccordion';
import { toast } from '@/hooks/use-toast';
import { Feeling, ChallengeLevel, TimeFocus, PROJECTS } from '@/types';

export function NewEntry() {
  const [project, setProject] = useState<string>('');
  const [feeling, setFeeling] = useState<Feeling | null>(null);
  const [challengeLevel, setChallengeLevel] = useState<ChallengeLevel | null>(null);
  const [timeFocus, setTimeFocus] = useState<TimeFocus[]>([]);
  const [valueScore, setValueScore] = useState(3);
  
  const [resumoLivre, setResumoLivre] = useState('');
  const [execucaoTecnica, setExecucaoTecnica] = useState('');
  const [gestaoOrganizacao, setGestaoOrganizacao] = useState('');
  const [pessoasCliente, setPessoasCliente] = useState('');
  const [inovacaoExtra, setInovacaoExtra] = useState('');

  const today = new Date();
  const formattedDate = today.toLocaleDateString('pt-BR', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  const diaryFields = [
    {
      id: 'resumo',
      icon: '📝',
      title: 'Resumo Livre',
      question: 'Resumo do dia: O que aconteceu?',
      placeholder: 'Desabafe aqui... O dia começou bem mas tive imprevistos com...',
      value: resumoLivre,
      onChange: setResumoLivre,
    },
    {
      id: 'execucao',
      icon: '🚀',
      title: 'Execução & Técnica',
      question: 'O que foi entregue? Ferramentas? Erros?',
      placeholder: 'Ex: Finalizei o painel X no Power BI; Tive que corrigir um bug de SQL...',
      value: execucaoTecnica,
      onChange: setExecucaoTecnica,
    },
    {
      id: 'gestao',
      icon: '📅',
      title: 'Gestão & Organização',
      question: 'Planejamento vs Imprevistos. Como organizou?',
      placeholder: 'Ex: Segui a agenda; Tive que priorizar uma urgência; Organizei o backlog...',
      value: gestaoOrganizacao,
      onChange: setGestaoOrganizacao,
    },
    {
      id: 'pessoas',
      icon: '🤝',
      title: 'Pessoas & Cliente',
      question: 'Interações (Ensinou / Aprendeu / Validou)?',
      placeholder: 'Ex: Validei regra com o cliente; Ensinei o estagiário; Resolvi um conflito...',
      value: pessoasCliente,
      onChange: setPessoasCliente,
    },
    {
      id: 'inovacao',
      icon: '💡',
      title: 'Inovação & Extra',
      question: 'Fez algo além do escopo ou estudou algo?',
      placeholder: 'Ex: Automatizei uma planilha manual; Li um artigo sobre IA...',
      value: inovacaoExtra,
      onChange: setInovacaoExtra,
    },
  ];

  const handleSave = () => {
    if (!feeling || !challengeLevel || !project) {
      toast({
        title: 'Campos obrigatórios',
        description: 'Por favor, preencha o projeto, sentimento e nível de desafio.',
        variant: 'destructive',
      });
      return;
    }

    // Clear form
    setProject('');
    setFeeling(null);
    setChallengeLevel(null);
    setTimeFocus([]);
    setValueScore(3);
    setResumoLivre('');
    setExecucaoTecnica('');
    setGestaoOrganizacao('');
    setPessoasCliente('');
    setInovacaoExtra('');

    toast({
      title: '✅ Dia salvo com sucesso!',
      description: 'Seu registro foi armazenado.',
    });
  };

  return (
    <div className="min-h-full pb-24">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-background/95 backdrop-blur-sm border-b border-border/50 px-4 py-4">
        <div className="flex items-center gap-2 text-muted-foreground mb-3">
          <Calendar className="w-4 h-4" />
          <span className="text-sm font-medium capitalize">{formattedDate}</span>
        </div>
        <Select value={project} onValueChange={setProject}>
          <SelectTrigger className="w-full bg-card border-border/50 h-11">
            <SelectValue placeholder="Selecione o projeto" />
          </SelectTrigger>
          <SelectContent className="bg-popover border-border">
            {PROJECTS.map((p) => (
              <SelectItem key={p} value={p}>
                {p}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </header>

      <div className="px-4 py-6 space-y-8">
        {/* Section A: Quick Check-in */}
        <section className="space-y-6">
          <div className="flex items-center gap-2">
            <div className="h-1 w-1 rounded-full bg-primary" />
            <h2 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Check-in Rápido
            </h2>
          </div>

          <div className="space-y-6 animate-fade-in">
            <FeelingSelector value={feeling} onChange={setFeeling} />
            <ChallengeLevelSelector value={challengeLevel} onChange={setChallengeLevel} />
            <TimeFocusSelector value={timeFocus} onChange={setTimeFocus} />
            <ValueSlider value={valueScore} onChange={setValueScore} />
          </div>
        </section>

        {/* Section B: Guided Diary */}
        <section className="space-y-6">
          <div className="flex items-center gap-2">
            <div className="h-1 w-1 rounded-full bg-primary" />
            <h2 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Diário Guiado
            </h2>
          </div>

          <DiaryAccordion fields={diaryFields} />
        </section>

        {/* Save Button */}
        <Button
          onClick={handleSave}
          size="lg"
          className="w-full h-14 text-base font-semibold rounded-xl shadow-medium"
        >
          <Save className="w-5 h-5 mr-2" />
          Salvar Dia
        </Button>
      </div>
    </div>
  );
}
