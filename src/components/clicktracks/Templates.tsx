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
    code: 'eyJuIjoiTmV3IE1ldHJvbm9tZSAxIiwiZCI6eyJzIjpbeyJ0IjoibSIsImIiOjEyMCwidFMiOls0LDRdLCJsSUIiOjEsInYiOjEwMCwibSI6ZmFsc2V9LHsidCI6InIiLCJ0aSI6MSwiaSI6dHJ1ZX1dLCJuIjpbIkMiLDVdLCJ2IjoxMDAsIm5EIjoxLCJtIjpmYWxzZSwicEVCIjp0cnVlLCJmT1MiOnRydWV9fQ==',
  },
  {
    name: 'Tempo Tester',
    description: `This clicktrack tests your ability to stay on time. It's a constant loop 
    of one metronome bar, and one silent bar. You can adjust the silent bars length to 
    increase difficulty.`,
    code: 'eyJuIjoiVGVtcG8gVGVzdGVyIiwiZCI6eyJzIjpbeyJ0IjoibSIsImIiOjEwMCwidFMiOls0LDRdLCJsSUIiOjEsInYiOjEwMCwibSI6ZmFsc2V9LHsidCI6Im0iLCJiIjoxMDAsInRTIjpbNCw0XSwibElCIjoyLCJ2IjoxMDAsIm0iOnRydWV9LHsidCI6InIiLCJ0aSI6MSwiaSI6dHJ1ZX1dLCJuIjpbIkMiLDVdLCJ2IjoxMDAsIm5EIjoxLCJtIjpmYWxzZSwicEVCIjp0cnVlLCJmT1MiOnRydWV9fQ==',
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
