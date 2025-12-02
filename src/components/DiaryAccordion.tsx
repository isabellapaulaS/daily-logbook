import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Textarea } from '@/components/ui/textarea';

interface DiaryField {
  id: string;
  icon: string;
  title: string;
  question: string;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
}

interface DiaryAccordionProps {
  fields: DiaryField[];
}

export function DiaryAccordion({ fields }: DiaryAccordionProps) {
  return (
    <Accordion type="multiple" className="space-y-2">
      {fields.map((field) => (
        <AccordionItem
          key={field.id}
          value={field.id}
          className="bg-card border border-border/50 rounded-xl px-4 overflow-hidden data-[state=open]:shadow-card"
        >
          <AccordionTrigger className="py-4 hover:no-underline">
            <div className="flex items-center gap-3">
              <span className="text-lg">{field.icon}</span>
              <span className="text-sm font-medium text-foreground">{field.title}</span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="pb-4">
            <div className="space-y-2">
              <p className="text-xs text-muted-foreground">{field.question}</p>
              <Textarea
                value={field.value}
                onChange={(e) => field.onChange(e.target.value)}
                placeholder={field.placeholder}
                className="min-h-[100px] resize-none bg-secondary/50 border-0 focus-visible:ring-1 focus-visible:ring-primary/30"
              />
            </div>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
