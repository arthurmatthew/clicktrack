import './Layout.css';

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="bg-slate-950" id="background">
      <header className="sticky top-0 p-5 backdrop-blur-md">
        <h1 className="bg-gradient-to-tr from-purple-400 to-purple-600 bg-clip-text text-4xl text-transparent">
          clicktrack
        </h1>
      </header>
      <main>{children}</main>
      <footer></footer>
    </div>
  );
};

export default Layout;
