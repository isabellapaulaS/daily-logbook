export type Feeling = 'empolgada' | 'bem' | 'neutra' | 'sobrecarregada' | 'frustrada';

export type ChallengeLevel = 'conforto' | 'aprendizado' | 'panico';

export type TimeFocus = 
  | 'execucao-tecnica' 
  | 'reunioes' 
  | 'apagando-incendio' 
  | 'estudo' 
  | 'ociosidade';

export interface DailyEntry {
  id: string;
  date: string;
  project: string;
  feeling: Feeling;
  challengeLevel: ChallengeLevel;
  timeFocus: TimeFocus[];
  valueScore: number;
  resumoLivre: string;
  execucaoTecnica: string;
  gestaoOrganizacao: string;
  pessoasCliente: string;
  inovacaoExtra: string;
}

export const FEELINGS: Record<Feeling, { emoji: string; label: string }> = {
  empolgada: { emoji: '🤩', label: 'Empolgada' },
  bem: { emoji: '🙂', label: 'Bem' },
  neutra: { emoji: '😐', label: 'Neutra' },
  sobrecarregada: { emoji: '🤯', label: 'Sobrecarregada' },
  frustrada: { emoji: '😡', label: 'Frustrada' },
};

export const CHALLENGE_LEVELS: Record<ChallengeLevel, { color: string; label: string; emoji: string }> = {
  conforto: { color: 'challenge-conforto', label: 'Conforto', emoji: '🔵' },
  aprendizado: { color: 'challenge-aprendizado', label: 'Aprendizado', emoji: '🟢' },
  panico: { color: 'challenge-panico', label: 'Pânico', emoji: '🔴' },
};

export const TIME_FOCUS_OPTIONS: Record<TimeFocus, string> = {
  'execucao-tecnica': 'Execução Técnica',
  'reunioes': 'Reuniões',
  'apagando-incendio': 'Apagando Incêndio',
  'estudo': 'Estudo',
  'ociosidade': 'Ociosidade',
};

export const PROJECTS = [
  'Projeto Alpha',
  'Projeto Beta',
  'Projeto Gamma',
  'Projeto Delta',
];
