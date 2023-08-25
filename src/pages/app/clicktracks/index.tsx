import { DragDropList } from '../../../components/clicktracks/DragDropList';
import { Heading } from '../../../components/clicktracks/Heading';
import { SaveLimitAlert } from '../../../components/clicktracks/SaveLimitAlert';
import { SkeletonLoaderList } from '../../../components/clicktracks/SkeletonLoaderList';
import { WontSaveWarning } from '../../../components/clicktracks/WontSaveWarning';
import { DB_RULE_MAX_CLICKTRACKS } from '../../../config';
import { useClicktracks } from '../../../hooks/useClicktracks';
import { usePageTitle } from '../../../hooks/usePageTitle';
import { useRedirectToLogin } from '../../../hooks/useRedirectToLogin';
import { useUser } from '../../../hooks/useUser';

/**
 * Webpage that lists metronomes from storage.
 */
const ClicktracksIndex = () => {
  usePageTitle('Your Clicktracks');

  useRedirectToLogin();
  const { user, premium } = useUser();

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

  const limitSaves =
    !premium && (clicktracks?.length ?? 9999) >= DB_RULE_MAX_CLICKTRACKS;

  if (user) {
    return (
      <div className="mx-4 my-10 flex flex-grow flex-col">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-4">
          <Heading
            {...{
              handleAdd,
              limitSaves,
              handleTemplate,
              handleImport,
              importRef,
            }}
          />
          {limitSaves && (clicktracks?.length ?? 0) > 3 && (
            <WontSaveWarning length={clicktracks?.length ?? 3} />
          )}
          {clicktracks ? (
            <>
              <DragDropList
                {...{
                  limitSaves,
                  clicktracks,
                  handleNameChange,
                  handleRemove,
                  handleOnDragEnd,
                  handleCopy,
                }}
              />
              <SaveLimitAlert limitSaves={limitSaves} />
            </>
          ) : (
            <SkeletonLoaderList />
          )}
        </div>
      </div>
    );
  }
};

export default ClicktracksIndex;
