import { InteractableListItem } from './InteractableListItem';

interface IHeading {
  handleAdd: () => void;
}

export const Heading = ({ handleAdd }: IHeading) => {
  return (
    <>
      <h1 className="text-3xl font-semibold">Your Clicktracks</h1>
      <h2 className="text-2xl opacity-80">
        View all your clicktracks here. They're saved to your browser
        automatically.
      </h2>
      <div className="flex flex-col gap-2">
        <InteractableListItem icon="plus-square" interaction={handleAdd}>
          Create New
        </InteractableListItem>
      </div>
    </>
  );
};
