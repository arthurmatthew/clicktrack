import { InteractableListItem } from './InteractableListItem';

interface IHeading {
  handleAdd: () => void;
}

export const Heading = ({ handleAdd }: IHeading) => {
  return (
    <>
      <h1 className="text-3xl  ">Your Clicktracks</h1>
      <div className="flex flex-col gap-2">
        <InteractableListItem icon="plus-square" interaction={handleAdd}>
          Create New
        </InteractableListItem>
      </div>
    </>
  );
};
