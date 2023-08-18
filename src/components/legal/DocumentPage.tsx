import { IComponent } from '../IComponent';

interface IDocumentPage extends IComponent {
  title: string;
}

export const DocumentPage = ({ title, children }: IDocumentPage) => {
  return (
    <div className="flex items-center justify-center sm:my-20 sm:px-6">
      <div className="lora flex h-screen w-full max-w-5xl flex-col gap-6 bg-white p-10 indent-6 text-xl dark:bg-black">
        <h1 className="text-center indent-0 text-3xl font-semibold">{title}</h1>
        {children}
      </div>
    </div>
  );
};
