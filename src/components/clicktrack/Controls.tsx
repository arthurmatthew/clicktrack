import { ControlWindow } from './ControlWindow';
import { EditSection } from './EditSection';
import { Sequencer } from './Sequencer';
import { Clicktrack } from '../../models/clicktrack/Clicktrack';
import { Repeat } from '../../models/clicktrack/Repeat';
import { Metronome } from '../../models/clicktrack/Metronome';

interface IControls {
  clicktrack: Clicktrack;
  selectedId: string;
  setSelectedId: React.Dispatch<React.SetStateAction<string>>;
  addSection: (newSection: Metronome | Repeat) => void;
  updateSection: <T extends Metronome | Repeat>(
    section: T,
    update: Partial<Omit<T, 'id' | 'type'>>
  ) => void;
  deleteSection: (id: string) => void;
  copySection: (id: string) => void;
}

export const Controls = ({
  clicktrack,
  selectedId,
  setSelectedId,
  addSection,
  updateSection,
  deleteSection,
  copySection,
}: IControls) => {
  return (
    <div className="grid gap-2 px-2 lg:grid-cols-2">
      <ControlWindow
        tabs={[
          { title: 'Sequencer', to: 'sequencer' },
          // { title: 'Settings', to: 'settings' },
        ]}
      >
        <Sequencer
          selectedId={selectedId}
          setSelectedId={setSelectedId}
          add={addSection}
          sequence={clicktrack.data.sections}
        />
        {/* <Routes>
          <Route path="/" element={<Outlet />}>
            <Route element={<h1>Settings</h1>} path="/settings" />
            <Route
              element={
                <Sequencer
                  selectedId={selectedId}
                  setSelectedId={setSelectedId}
                  add={addSection}
                  sequence={clicktrack.data.sections}
                />
              }
              path="/sequencer"
            />
          </Route>
        </Routes> */}
      </ControlWindow>
      <ControlWindow tabs={[{ title: 'Edit' }]}>
        <EditSection
          {...{ updateSection, copySection, deleteSection }}
          selected={clicktrack.data.sections.find(
            (section) => section.id === selectedId
          )}
        />
      </ControlWindow>
    </div>
  );
};
