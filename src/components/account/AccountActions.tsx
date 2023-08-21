import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../../firebase';
import { AccountAction } from './AccountAction';
import { signOut } from 'firebase/auth';

export const AccountActions = () => {
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut(auth).catch((error) => {
      console.error(error);
      return;
    });
    navigate('/app/clicktracks');
  };

  return (
    <div className="flex flex-col gap-2">
      <h3 className="text-xl opacity-50">Actions</h3>
      <div className="grid grid-cols-2 gap-2">
        <Link to="/app/subscribe/">
          <AccountAction>Upgrade to Premium</AccountAction>
        </Link>
        <AccountAction onClick={handleSignOut}>Sign Out</AccountAction>
      </div>
    </div>
  );
};
