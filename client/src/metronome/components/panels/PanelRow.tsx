const PanelRow = ({ children }: { children?: React.ReactNode }) => {
  return (
    <div className="grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-4">
      {children}
    </div>
  );
};

export default PanelRow;
