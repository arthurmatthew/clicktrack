import { InteractableListItem } from './InteractableListItem';

interface IFooter {
  handleClear: () => void;
}

export const Footer = ({ handleClear }: IFooter) => {
  return (
    <InteractableListItem icon="trash" interaction={handleClear}>
      Clear Storage
    </InteractableListItem>
  );
};
