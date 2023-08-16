import { DragDropList } from '../../../components/clicktracks/DragDropList';
import { Footer } from '../../../components/clicktracks/Footer';
import { Heading } from '../../../components/clicktracks/Heading';

import { useClicktracks } from '../../../hooks/useClicktracks';
import { STORAGE_KEYS_CLICKTRACK } from '../../../config';

/**
 * Webpage that lists metronomes from storage.
 */
const ClicktracksIndex = () => {
  const {
    clicktracks,
    importRef,
    handleAdd,
    handleImport,
    handleClear,
    handleRemove,
    handleNameChange,
    handleOnDragEnd,
    handleCopy,
  } = useClicktracks(STORAGE_KEYS_CLICKTRACK);

  return (
    <div className="mx-4 my-10 flex flex-grow flex-col">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-4">
        <Heading {...{ handleAdd }} />
        <DragDropList
          {...{
            clicktracks,
            handleNameChange,
            handleImport,
            handleRemove,
            handleOnDragEnd,
            importRef,
            handleCopy,
          }}
        />
        <Footer {...{ handleClear }} />
      </div>
    </div>
  );
};

export default ClicktracksIndex;
