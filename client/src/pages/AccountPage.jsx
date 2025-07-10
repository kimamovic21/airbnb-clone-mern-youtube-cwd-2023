import { useContext, useState } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { UserContext } from '../context/UserContext';
import axios from 'axios';

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

  const linkClasses = (type = null) => {
    let classes = 'py-2 px-6';

    if (type === subpage) {
      classes += ' bg-primary text-white rounded-full';
    };

    return classes;
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
      <nav className='w-full flex justify-center mt-8 gap-2 mb-8'>
        <Link
          to='/account'
          className={linkClasses('profile')}
        >
          My profile
        </Link>

        <Link
          to='/account/bookings'
          className={linkClasses('bookings')}
        >
          My bookings
        </Link>

        <Link
          to='/account/places'
          className={linkClasses('places')}
        >
          My accommodations
        </Link>
      </nav>

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
    </div>
  );
};

export default AccountPage;