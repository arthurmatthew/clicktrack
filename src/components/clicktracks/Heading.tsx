import { InteractableListItem } from './InteractableListItem';
import { Templates } from './Templates';
import { useState } from 'react';
import { ClicktracksTitle } from './ClicktracksTitle';
import { ClicktracksTitleAccount } from './ClicktracksTitleAccount';
import { IImport, Import } from './Import';

interface IHeading extends Omit<IImport, 'showImport'> {
  handleAdd: () => void;
  handleTemplate: (code: string) => void;
}

export const Heading = ({
  handleAdd,
  handleTemplate,
  handleImport,
  importRef,
}: IHeading) => {
  const [showTemplates, setShowTemplates] = useState(false);
  const [showImport, setShowImport] = useState(false);

  return (
    <>
      <div className="mb-5 flex items-center justify-between">
        <ClicktracksTitle />
        <ClicktracksTitleAccount />
      </div>

      <div className="flex flex-col gap-2">
        <InteractableListItem icon="plus-square" interaction={handleAdd}>
          Create New
        </InteractableListItem>
        <InteractableListItem
          icon="download"
          interaction={() =>
            setShowImport((previouslyShowing) => !previouslyShowing)
          }
        >
          Import
        </InteractableListItem>
        <Import {...{ handleImport, importRef, showImport }} />
        <InteractableListItem
          icon="boxes"
          interaction={() =>
            setShowTemplates((previouslyShowing) => !previouslyShowing)
          }
        >
          Use Template{' '}
          <p className=" ml-2 text-base font-normal opacity-50">
            <i className="bi-dot" /> Great for Beginners
          </p>
        </InteractableListItem>
        <Templates
          showTemplates={showTemplates}
          handleTemplate={handleTemplate}
        />
      </div>
    </>
  );
};
