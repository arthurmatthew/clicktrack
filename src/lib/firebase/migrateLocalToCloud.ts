import { Clicktrack } from '../../models/Clicktrack';
import { clearLocalClicktracks } from '../../utils/clearLocalClicktracks';
import { loadLocalClicktracks } from '../../utils/loadLocalClicktracks';
import { getUserClicktracks } from './getUserClicktracks';
import { setUserData } from './setUserData';

/**
 * Best-effort migration of local clicktracks into the user's cloud storage.
 * - If there are no local clicktracks, this is a no-op.
 * - Merge strategy: local entries overwrite cloud entries with the same id.
 * - The function is idempotent and should be safe to call once on login.
 */
export const migrateLocalToCloud = async () => {
  try {
    const local = loadLocalClicktracks();
    if (!local || local.length === 0) return;

    const cloud = (await getUserClicktracks()) ?? [];

    const map = new Map<string, Clicktrack>();
    cloud.forEach((clicktrack) => map.set(clicktrack.id, clicktrack));
    local.forEach((clicktrack) => map.set(clicktrack.id, clicktrack));

    const merged = Array.from(map.values());

    await setUserData({
      clicktracks: merged.map((clicktrack) => Clicktrack.encode(clicktrack)),
    });

    clearLocalClicktracks();
  } catch (err) {
    console.error('Error migrating local clicktracks to cloud', err);
    throw err;
  }
};
