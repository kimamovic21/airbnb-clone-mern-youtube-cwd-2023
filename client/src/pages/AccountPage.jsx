import { useContext, useState } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { UserContext } from '../context/UserContext';
import axios from 'axios';
import PlacesPage from './PlacesPage';
import AccountNav from '../components/AccountNav';

const AccountPage = () => {
  const { ready, user, setUser } = useContext(UserContext);
  let { subpage } = useParams();

  const [redirect, setRedirect] = useState(null);

  if (subpage === undefined) {
    subpage = 'profile';
  };

  if (!ready) {
    return <p>Loading...</p>;
  };

  if (ready && !user && !redirect) {
    return <Navigate to='/login' />
  };

  const handleLogout = async () => {
    await axios.post('/logout');
    setRedirect('/');
    setUser(null);
    toast.success('Successfully logged out.');
  };

  if (redirect) {
    return <Navigate to={redirect} />
  };

  return (
    <div>
      <AccountNav />

      {subpage === 'profile' && (
        <div className='text-center max-w-lg mx-auto'>
          <p>
            <span className='mr-1'>Logged in as</span>
            <span className='mr-1'>{user?.name}</span>
            <span>({user?.email})</span>
          </p>
          <button
            className='primary max-w-sm mt-2'
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      )}

      {subpage === 'places' && (
        <PlacesPage />
      )}
    </div>
  );
};

export default AccountPage;