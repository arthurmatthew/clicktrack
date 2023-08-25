import { SkeletonLoader } from './SkeletonLoader';

export const SkeletonLoaderList = () => {
  return (
    <ul className="flex flex-col">
      {new Array(16).fill('').map((_, index) => (
        <SkeletonLoader key={index} index={index} />
      ))}
    </ul>
  );
};
