import { Clicktrack } from '../../models/Clicktrack';
import { getUserData } from './getUserData';

export const getUserClicktracks = async () => {
  const userData = await getUserData();

  if (userData) {
    const minifiedCloudClicktracks = JSON.parse(
      userData.clicktracks
    ) as string[]; // each encoded to MinifiedClicktrack then Base64
    const cloudClicktracks = minifiedCloudClicktracks.map(
      (minifiedClicktrack) => Clicktrack.decode(minifiedClicktrack)
    );

    return cloudClicktracks;
  }
};
