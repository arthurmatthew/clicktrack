import { InteractableListItem } from './InteractableListItem';
import { Templates } from './Templates';
import { useState } from 'react';
import { ClicktracksTitle } from './Title';
import { ClicktracksTitleAccount } from './ClicktracksTitleAccount';

interface IHeading {
  handleAdd: () => void;
  handleTemplate: (code: string) => void;
}

export const Heading = ({ handleAdd, handleTemplate }: IHeading) => {
  const [showTemplates, setShowTemplates] = useState(false);

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
