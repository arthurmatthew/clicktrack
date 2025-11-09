import { HttpsCallableResult, httpsCallable } from 'firebase/functions';
import { functions } from '../../firebase';
import { TCustomerPortalResult } from '../../types';

export const getCustomerPortal = async (callback?: () => void) => {
  const customerPortalFunctionRef = httpsCallable(
    functions,
    'ext-firestore-stripe-payments-createPortalLink'
  );
  const results = (await customerPortalFunctionRef({
    returnUrl: window.location.href,
  }).catch((error) => {
    console.error(error);
    if (callback) callback();
    return undefined;
  })) as HttpsCallableResult<TCustomerPortalResult> | undefined;

  if (callback) callback();
  if (results?.data.url) window.location.assign(results.data.url);
};
