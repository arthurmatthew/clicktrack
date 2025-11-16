import { reload } from 'vike/client/router';

export const onHydrationEnd = async () => {
  await reload();
};
