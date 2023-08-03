import { Routes, Route, Outlet } from 'react-router-dom';
import { ControlWindow } from './ControlWindow';
import { EditSection } from './EditSection';
import { Sequencer } from './Sequencer';
import { Clicktrack, Metronome, Repeat } from '../../clicktrack';

interface IControls {
  clicktrack: Clicktrack;
  selectedId: string;
  setSelectedId: React.Dispatch<React.SetStateAction<string>>;
  addSection: (newSection: Metronome | Repeat) => void;
  updateSection: <T extends Metronome | Repeat>(
    section: T,
    update: Partial<Omit<T, 'id' | 'type'>>
  ) => void;
  deleteListedMetronome: (id: string) => void;
  copyListedMetronome: (id: string) => void;
}

export const Controls = ({
  clicktrack,
  selectedId,
  setSelectedId,
  addSection,
  updateSection,
  deleteListedMetronome,
  copyListedMetronome,
}: IControls) => {
  return (
    <div className="grid gap-2 px-2 lg:grid-cols-2">
      <ControlWindow
        tabs={[
          { title: 'Sequencer', to: 'sequencer' },
          { title: 'Settings', to: 'settings' },
        ]}
      >
        <Routes>
          <Route path="/" element={<Outlet />}>
            <Route element={<h1>Settings</h1>} path="/settings" />
            <Route
              element={
                <Sequencer
                  selectedId={selectedId}
                  setSelectedId={setSelectedId}
                  add={addSection}
                  sequence={clicktrack.data.children}
                />
              }
              path="/sequencer"
            />
          </Route>
        </Routes>
      </ControlWindow>
      <ControlWindow tabs={[{ title: 'Edit' }]}>
        <EditSection
          deleteMetronome={deleteListedMetronome}
          copyMetronome={copyListedMetronome}
          updateSection={updateSection}
          selected={clicktrack.data.children.find(
            (metronome) => metronome.id === selectedId
          )}
        />
      </ControlWindow>
    </div>
  );
};
