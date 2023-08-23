import { DragDropList } from '../../../components/clicktracks/DragDropList';
import { Footer } from '../../../components/clicktracks/Footer';
import { Heading } from '../../../components/clicktracks/Heading';
import { SkeletonLoaderList } from '../../../components/clicktracks/SkeletonLoaderList';
import { useClicktracks } from '../../../hooks/useClicktracks';
import { useRedirectToLogin } from '../../../hooks/useRedirectToLogin';
import { useUser } from '../../../hooks/useUser';

/**
 * Webpage that lists metronomes from storage.
 */
const ClicktracksIndex = () => {
  useRedirectToLogin();
  const { user } = useUser();

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

  if (user) {
    return (
      <div className="mx-4 my-10 flex flex-grow flex-col">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-4">
          <Heading
            {...{ handleAdd, handleTemplate, handleImport, importRef }}
          />
          {clicktracks ? (
            <DragDropList
              {...{
                clicktracks,
                handleNameChange,
                handleRemove,
                handleOnDragEnd,
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
  }
};

export default ClicktracksIndex;
