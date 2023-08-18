import { Clicktrack } from '../../models/Clicktrack';
import { ControlWindow } from './ControlWindow';
import { EditSection, IEditSection } from './EditSection';
import { ISequencer, Sequencer } from './Sequencer';
interface IControls extends ISequencer, IEditSection {
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
  playingDisplay,
}: IControls) => {
  return (
    <div className="grid gap-2 px-2 lg:grid-cols-2">
      <ControlWindow
        tabs={[
          { title: 'Sequencer' },
          // { title: 'Settings', to: 'settings' },
        ]}
      >
        <Sequencer
          sequencerOnDragEnd={sequencerOnDragEnd}
          selectedId={selectedId}
          setSelectedId={setSelectedId}
          addSection={addSection}
          sequence={sequence}
          playingDisplay={playingDisplay}
        />
      </ControlWindow>
      <ControlWindow tabs={[{ title: 'Edit' }]}>
        <EditSection
          {...{ updateSection, copySection, deleteSection }}
          selected={selected}
        />
      </ControlWindow>
    </div>
  );
};
