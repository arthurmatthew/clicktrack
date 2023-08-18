import { TTemplate } from '../../types';
import { Template } from './Template';

interface ITemplates {
  handleTemplate: (code: string) => void;
  showTemplates: boolean;
}

const TEMPLATES: TTemplate[] = [
  {
    name: 'Basic Metronome',
    description: `A classic metronome. It's nothing fancy, really. Just a metronome to
    help you keep time. This is perfect for people who don't need anything
    advanced.`,
    code: 'eyJuYW1lIjoiQmFzaWMgTWV0cm9ub21lIiwiaWQiOiJmOWIwNGZkZS1jMTQwLTRjN2QtODE5OS02YzQyNTliNGU1N2QiLCJwZXJtYW5hbnQiOmZhbHNlLCJvcGVuZWQiOmZhbHNlLCJkYXRhIjp7InNlY3Rpb25zIjpbeyJpZCI6IjllOTk1Zjg4LTFhYmQtNDdmYi1hZjUyLWQyYTkwNTkzNzM0MiIsInR5cGUiOiJtZXRyb25vbWUiLCJicG0iOjEyMCwidGltZVNpZ25hdHVyZSI6WzQsNF0sImxlbmd0aEluQmFycyI6MSwidm9sdW1lIjoxMDAsIm11dGVkIjpmYWxzZX0seyJpZCI6ImVjOGNhNzdmLTlkOTAtNGVjOC1iMTU4LWM2ZDY0ZTY4ZmI0OSIsInR5cGUiOiJyZXBlYXQiLCJ0aW1lcyI6MSwiaW5maW5pdGUiOnRydWV9XSwibm90ZSI6WyJDIiw1XSwidm9sdW1lIjoxMDAsIm5vdGVEdXJhdGlvbiI6MSwibXV0ZWQiOmZhbHNlLCJwbGF5RXh0cmFCZWF0Ijp0cnVlLCJmYWRlT3V0U291bmQiOnRydWV9fQ==',
  },
  {
    name: 'Tempo Tester',
    description: `This clicktrack tests your ability to stay on time. It's a constant loop 
    of one metronome bar, and one silent bar. You can adjust the silent bars length to 
    increase difficulty.`,
    code: 'eyJuYW1lIjoiTmV3IE1ldHJvbm9tZSAyIiwiaWQiOiJhMGQ3YzY2Yy1lZjU1LTQzNmUtOTAzNi1kYjQyYTI5MDA5MGUiLCJwZXJtYW5hbnQiOmZhbHNlLCJvcGVuZWQiOmZhbHNlLCJkYXRhIjp7InNlY3Rpb25zIjpbeyJpZCI6ImJkZTU1YjEyLWEzZTItNGY4MC1iMDI5LTc5YzZiMDMzOWNlMiIsInR5cGUiOiJtZXRyb25vbWUiLCJicG0iOjEyMCwidGltZVNpZ25hdHVyZSI6WzQsNF0sImxlbmd0aEluQmFycyI6MSwidm9sdW1lIjoxMDAsIm11dGVkIjpmYWxzZX0seyJpZCI6ImQ5ZDU4OTBkLTFhNzUtNDM4Zi04MWI4LThjMjkxZTg5NTM4ZCIsInR5cGUiOiJtZXRyb25vbWUiLCJicG0iOjEyMCwidGltZVNpZ25hdHVyZSI6WzQsNF0sImxlbmd0aEluQmFycyI6MSwidm9sdW1lIjowLCJtdXRlZCI6ZmFsc2V9LHsiaWQiOiJiMzQ1MmY1MC0wN2ZlLTQ0OTQtYTFlMC03NTI1N2VkZTJhM2UiLCJ0eXBlIjoicmVwZWF0IiwidGltZXMiOjEsImluZmluaXRlIjp0cnVlfV0sIm5vdGUiOlsiQyIsNV0sInZvbHVtZSI6MTAwLCJub3RlRHVyYXRpb24iOjEsIm11dGVkIjpmYWxzZSwicGxheUV4dHJhQmVhdCI6dHJ1ZSwiZmFkZU91dFNvdW5kIjp0cnVlfX0=',
  },
  {
    name: 'Coming Soon',
    description: ``,
    code: '',
  },
];

export const Templates = ({ handleTemplate, showTemplates }: ITemplates) => {
  return (
    <div
      style={{ transition: 'max-height 1s' }}
      className={`gap-2 overflow-hidden rounded-md bg-neutral-200 p-4 duration-100 dark:bg-neutral-900 sm:grid-cols-2 md:grid-cols-3 ${
        showTemplates ? 'grid' : 'hidden'
      }`}
    >
      {TEMPLATES.map((template) => (
        <Template
          onClick={() => {
            handleTemplate(template.code);
          }}
          title={template.name}
        >
          {template.description}
        </Template>
      ))}
    </div>
  );
};
