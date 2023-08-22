import { addDoc, collection, doc, onSnapshot } from 'firebase/firestore';
import { auth, db } from '../../firebase';

export const getSubscriptionCheckout = async (
  successUrl?: string,
  cancelUrl?: string
) => {
  const user = auth.currentUser;

  if (user) {
    const customerDocumentRef = doc(db, 'customers', user.uid);
    const checkoutSessionRef = await addDoc(
      collection(customerDocumentRef, 'checkout_sessions'),
      {
        price: 'price_1NAd5ODC0LsrQ16H5YllP3gE',
        success_url: successUrl ?? window.location.origin,
        cancel_url: cancelUrl ?? window.location.origin,
      }
    );
    // wait for extension to register the session
    onSnapshot(checkoutSessionRef, (snapshot) => {
      if (snapshot.exists()) {
        const { error, url } = snapshot.data();
        if (error) {
          console.error(error);
        }
        if (url) {
          window.location.assign(url);
        }
      }
    });
  }
};
