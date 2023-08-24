import { DB_RULE_MAX_CLICKTRACKS } from '../../config';

export const WontSaveWarning = ({ length }: { length: number }) => {
  return (
    <div className="rounded-2xl border-2 border-red-500 p-8 text-xl">
      <p className="text-center">
        <b>Don't lose your data! Read carefully.</b> You currently have {length}{' '}
        clicktracks. This is {length - DB_RULE_MAX_CLICKTRACKS} over the maximum
        for free users. Any changes you make will not save until you delete{' '}
        {length - DB_RULE_MAX_CLICKTRACKS} clicktrack(s).
      </p>
    </div>
  );
};
