import { Clicktrack } from '../../models/Clicktrack';
import { ControlWindow } from './ControlWindow';
import { EditSection, IEditSection } from './EditSection';
import { ISequencer, Sequencer } from './Sequencer';
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
  playingDisplay,
}: IControls) => {
  return (
    <div className="grid min-h-0 flex-grow grid-rows-2 gap-2 px-2 lg:grid-cols-2 lg:grid-rows-1">
      <ControlWindow
        className="order-last lg:order-first"
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
            playingDisplay,
            copySection,
            deleteSection,
          }}
        />
      </ControlWindow>
      <ControlWindow
        className="order-first lg:order-last"
        tabs={[{ title: 'Edit' }]}
      >
        <EditSection
          {...{ updateSection, copySection, deleteSection }}
          selected={selected}
        />
      </ControlWindow>
    </div>
  );
};
