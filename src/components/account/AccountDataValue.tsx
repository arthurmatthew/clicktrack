export const AccountDataValue = ({
  children,
}: {
  children: string | undefined | null;
}) => {
  return (
    <p
      className={`${
        children ? '' : 'opacity-50'
      } no-scrollbar flex items-center overflow-x-scroll pl-2`}
    >
      {children ?? 'Not Set'}
    </p>
  );
};
