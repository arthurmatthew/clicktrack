import { InteractableListItem } from './InteractableListItem';
import { Templates } from './Templates';
import { useState } from 'react';
import { ClicktracksTitle } from './ClicktracksTitle';
import { ClicktracksTitleAccount } from './ClicktracksTitleAccount';
import { IImport, Import } from './Import';
import { User } from 'firebase/auth';

interface IHeading extends Omit<IImport, 'showImport'> {
  limitSaves: boolean;
  handleAdd: () => void;
  handleTemplate: (code: string) => void;
  user: User | null;
}

export const Heading = ({
  limitSaves,
  handleAdd,
  handleTemplate,
  handleImport,
  importRef,
  user,
}: IHeading) => {
  const [showTemplates, setShowTemplates] = useState(false);
  const [showImport, setShowImport] = useState(false);

  return (
    <>
      <div className="mb-5 flex items-center justify-between">
        <ClicktracksTitle loggedIn={user !== null} />
        {user && <ClicktracksTitleAccount />}
      </div>

      <div className="flex flex-col gap-2">
        <InteractableListItem
          disabled={limitSaves}
          icon="plus-square"
          onClick={handleAdd}
        >
          Create New
        </InteractableListItem>
        <InteractableListItem
          disabled={limitSaves}
          icon="download"
          onClick={() =>
            setShowImport((previouslyShowing) => !previouslyShowing)
          }
        >
          Import
        </InteractableListItem>
        <Import
          disabled={limitSaves}
          {...{ handleImport, importRef, showImport }}
        />
        <InteractableListItem
          icon="boxes"
          disabled={limitSaves}
          onClick={() =>
            setShowTemplates((previouslyShowing) => !previouslyShowing)
          }
        >
          Use Template{' '}
          <p className=" ml-2 text-base font-normal opacity-50">
            <i className="bi-dot" /> Great for Beginners
          </p>
        </InteractableListItem>
        {!limitSaves && (
          <Templates
            showTemplates={showTemplates}
            handleTemplate={handleTemplate}
          />
        )}
      </div>
    </>
  );
};
