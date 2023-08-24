import { InteractableListItem } from './InteractableListItem';
import { Templates } from './Templates';
import { useState } from 'react';
import { ClicktracksTitle } from './ClicktracksTitle';
import { ClicktracksTitleAccount } from './ClicktracksTitleAccount';
import { IImport, Import } from './Import';
import { DB_RULE_MAX_CLICKTRACKS } from '../../config';

interface IHeading extends Omit<IImport, 'showImport'> {
  length: number;
  handleAdd: () => void;
  handleTemplate: (code: string) => void;
}

export const Heading = ({
  length,
  handleAdd,
  handleTemplate,
  handleImport,
  importRef,
}: IHeading) => {
  const [showTemplates, setShowTemplates] = useState(false);
  const [showImport, setShowImport] = useState(false);

  const exceedsMaxClicktracks = length >= DB_RULE_MAX_CLICKTRACKS;

  return (
    <>
      <div className="mb-5 flex items-center justify-between">
        <ClicktracksTitle />
        <ClicktracksTitleAccount />
      </div>

      <div className="flex flex-col gap-2">
        <InteractableListItem
          disabled={exceedsMaxClicktracks}
          icon="plus-square"
          onClick={handleAdd}
        >
          Create New
        </InteractableListItem>
        <InteractableListItem
          disabled={exceedsMaxClicktracks}
          icon="download"
          onClick={() =>
            setShowImport((previouslyShowing) => !previouslyShowing)
          }
        >
          Import
        </InteractableListItem>
        <Import
          disabled={exceedsMaxClicktracks}
          {...{ handleImport, importRef, showImport }}
        />
        <InteractableListItem
          icon="boxes"
          disabled={exceedsMaxClicktracks}
          onClick={() =>
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
