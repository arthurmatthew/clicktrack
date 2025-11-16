import {
  GoogleAuthProvider,
  signInWithPopup,
  signInWithRedirect,
} from 'firebase/auth';
import { auth } from '../../firebase';
import { STORAGE_KEYS_GOOGLE_AUTH } from '../../config';

const isMobile = () => {
  const hasTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
  const isSmallScreen = window.matchMedia('(max-width: 768px)').matches;
  return hasTouch && isSmallScreen;
};

export const authenticateUserWithGoogle = async () => {
  const provider = new GoogleAuthProvider();

  if (isMobile()) {
    sessionStorage.setItem(STORAGE_KEYS_GOOGLE_AUTH, 'true');
    return signInWithRedirect(auth, provider);
  } else {
    return signInWithPopup(auth, provider);
  }
};
