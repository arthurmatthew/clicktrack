import { useState } from 'react';
import { Clicktrack } from '../../models/Clicktrack';
import { ControlWindow } from './ControlWindow';
import { EditSection, IEditSection } from './EditSection';
import { ISequencer, Sequencer } from './Sequencer';
import { useIsMobile } from '../../hooks/useIsMobile';
export interface IControls extends ISequencer, IEditSection {
  clicktrack: Clicktrack;
}

export const Controls = ({
  sequence,
  selected,
  selectedId,
  setSelectedId,
  addSection,
  updateSection,
  deleteSection,
  copySection,
  sequencerOnDragEnd,
  isPlaying,
}: IControls) => {
  const { isMobile } = useIsMobile();
  const [tab, setTab] = useState<'sequencer' | 'edit'>('sequencer');

  if (isMobile) {
    return (
      <div className="flex min-h-0 flex-1 flex-col justify-between">
        {tab === 'edit' ? (
          <EditSection
            {...{
              updateSection,
              copySection,
              deleteSection,
              setSelectedId,
              sequence,
            }}
            selected={selected}
          />
        ) : (
          <Sequencer
            {...{
              sequence,
              selectedId,
              setSelectedId,
              addSection,
              sequencerOnDragEnd,
              isPlaying,
              copySection,
              deleteSection,
            }}
          />
        )}
        <nav className="grid grid-cols-2 border-t-2 border-t-zinc-200 text-xl dark:border-t-zinc-800">
          <button
            onClick={() => setTab('sequencer')}
            className={`py-3 ${
              tab === 'sequencer'
                ? 'bg-zinc-200 font-semibold dark:bg-zinc-800'
                : ''
            }`}
          >
            Arrange
          </button>
          <button
            onClick={() => setTab('edit')}
            className={`py-3 ${
              tab === 'edit' ? 'bg-zinc-200 font-semibold dark:bg-zinc-800' : ''
            }`}
          >
            Edit
          </button>
        </nav>
      </div>
    );
  }

  return (
    <div className="grid min-h-0 grow grid-rows-2 gap-2 px-2 pb-2 lg:grid-cols-2 lg:grid-rows-1">
      <ControlWindow
        className="order-first"
        tabs={[
          { title: 'Sequencer' },
          // { title: 'Settings', to: 'settings' },
        ]}
      >
        <Sequencer
          {...{
            sequence,
            selectedId,
            setSelectedId,
            addSection,
            sequencerOnDragEnd,
            isPlaying,
            copySection,
            deleteSection,
          }}
        />
      </ControlWindow>
      <ControlWindow className="order-last" tabs={[{ title: 'Edit' }]}>
        <EditSection
          {...{
            updateSection,
            copySection,
            deleteSection,
            setSelectedId,
            sequence,
          }}
          selected={selected}
        />
      </ControlWindow>
    </div>
  );
};
