import { Link } from 'react-router';
import { usePageTitle } from '../../hooks/usePageTitle';

export const WriteupIndex = () => {
  usePageTitle('Home');

  return (
    <div className="my-32 flex flex-col items-center justify-center gap-2">
      <Link to="/" className="w-full max-w-7xl text-lg">
        <i className="bi-arrow-left pr-2" />
        Return home
      </Link>
      <div className="roboto max-w-7xl border-2 border-zinc-200 p-28 text-2xl">
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae
          reprehenderit error, voluptate architecto, quibusdam cum sequi magnam
          nulla assumenda, praesentium blanditiis. Incidunt eligendi vero hic
          eos deleniti? Iure, praesentium incidunt.
        </p>
      </div>
    </div>
  );
};
