// import { Link } from 'react-router';
import { DB_RULE_MAX_CLICKTRACKS } from '../../config';

interface ISaveLimitAlert {
  limitSaves: boolean;
}

// export const SaveLimitAlert = ({ limitSaves }: ISaveLimitAlert) => {
//   if (limitSaves)
//     return (
//       <div className="w-full select-none rounded-md border-2 border-dashed border-zinc-200 bg-white/50 px-3 py-2 duration-75 dark:border-zinc-800 dark:bg-zinc-900/50">
//         <p className="p-4 text-center text-xl sm:p-8 sm:text-2xl">
//           Want to save more than {DB_RULE_MAX_CLICKTRACKS} clicktracks?{' '}
//           <Link to="/app/premium" className="underline">
//             Upgrade to premium
//           </Link>{' '}
//           to save as many as you want.
//         </p>
//       </div>
//     );
// };

export const SaveLimitAlert = ({ limitSaves }: ISaveLimitAlert) => {
  if (limitSaves)
    return (
      <div className="w-full select-none rounded-md border-2 border-dashed border-zinc-200 bg-white/50 px-3 py-2 duration-75 dark:border-zinc-800 dark:bg-zinc-900/50">
        <p className="p-4 text-center text-xl sm:p-8 sm:text-2xl">
          You can only save up to {DB_RULE_MAX_CLICKTRACKS} clicktracks!
        </p>
      </div>
    );
};
