import { addDoc, collection, doc, onSnapshot } from 'firebase/firestore';
import { auth, db } from '../../firebase';
import { CLICKTRACK_PREMIUM_PRODUCT_ID } from '../../stripe';

export const getSubscriptionCheckout = async (
  callback?: () => void,
  successUrl?: string,
  cancelUrl?: string
) => {
  const user = auth.currentUser;

  if (user) {
    const customerDocumentRef = doc(db, 'customers', user.uid);
    const checkoutSessionRef = await addDoc(
      collection(customerDocumentRef, 'checkout_sessions'),
      {
        price: CLICKTRACK_PREMIUM_PRODUCT_ID,
        success_url: successUrl ?? window.location.href,
        cancel_url: cancelUrl ?? window.location.href,
      }
    );
    // wait for extension to register the session
    onSnapshot(checkoutSessionRef, (snapshot) => {
      if (snapshot.exists()) {
        const { error, url } = snapshot.data();
        if (error) {
          console.error(error);
          if (callback) callback();
        }
        if (url) {
          window.location.assign(url);
          if (callback) callback();
        }
      }
    });
  }
};
