import { DragDropList } from "../../../../components/clicktracks/DragDropList";
import { Heading } from "../../../../components/clicktracks/Heading";
import { SaveLimitAlert } from "../../../../components/clicktracks/SaveLimitAlert";
import { SkeletonLoaderList } from "../../../../components/clicktracks/SkeletonLoaderList";
import { WontSaveWarning } from "../../../../components/clicktracks/WontSaveWarning";
import { DB_RULE_MAX_CLICKTRACKS } from "../../../../config";
import { useClicktracks } from "../../../../hooks/useClicktracks";
import { usePageTitle } from "../../../../hooks/usePageTitle";
import { useUser } from "../../../../hooks/useUser";

/**
 * Webpage that lists metronomes from storage.
 */
export const Page = () => {
  usePageTitle('Your Clicktracks');

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

  /* const limitSaves =
     !premium && (clicktracks?.length ?? 9999) >= DB_RULE_MAX_CLICKTRACKS; */
  const limitSaves =
    (clicktracks?.length ?? 99999999) >= DB_RULE_MAX_CLICKTRACKS; // premium functionality is currently removed, all saves limited at 20

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
            user,
          }}
        />
        {limitSaves && (clicktracks?.length ?? 0) > DB_RULE_MAX_CLICKTRACKS && (
          <WontSaveWarning
            length={clicktracks?.length ?? DB_RULE_MAX_CLICKTRACKS}
          />
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
};
