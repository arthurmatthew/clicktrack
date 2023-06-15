import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="bg-gradient-radial to-slate-950 sticky top-0 z-10 shrink grow-0 basis-auto from-slate-800 bg-[length:100%_200%] bg-[100%_0] p-5">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between">
        <Link to="/" className="text-4xl text-slate-200">
          clicktrack
        </Link>
        <div>
          <i className="bi-person-circle text-3xl text-slate-200 hover:text-purple-400" />
        </div>
      </div>
    </header>
  );
};

export default Header;
