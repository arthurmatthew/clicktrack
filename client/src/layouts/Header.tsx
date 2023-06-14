import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="bg-gradient-radial from-slate-950 sticky top-0 z-10 shrink grow-0 basis-auto to-slate-800 bg-[length:100%_200%] bg-[100%_100%] p-5">
      <Link to="/" className="text-4xl text-purple-500">
        clicktrack
      </Link>
    </header>
  );
};

export default Header;