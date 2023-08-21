import { DragDropList } from '../../../components/clicktracks/DragDropList';
import { Footer } from '../../../components/clicktracks/Footer';
import { Heading } from '../../../components/clicktracks/Heading';
import { SkeletonLoaderList } from '../../../components/clicktracks/SkeletonLoaderList';

import { useClicktracks } from '../../../hooks/useClicktracks';
import { useUser } from '../../../hooks/useUser';

/**
 * Webpage that lists metronomes from storage.
 */
const ClicktracksIndex = () => {
  const { user } = useUser('/app/account/login');

  const {
    clicktracks,
    importRef,
    handleAdd,
    handleImport,
    handleTemplate,
    handleRemove,
    handleNameChange,
    handleOnDragEnd,
    handleCopy,
  } = useClicktracks();

  if (user)
    return (
      <div className="mx-4 my-10 flex flex-grow flex-col">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-4">
          <Heading {...{ handleAdd, handleTemplate }} />
          {clicktracks ? (
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
          ) : (
            <SkeletonLoaderList />
          )}
          <Footer />
        </div>
      </div>
    );
};

export default ClicktracksIndex;
