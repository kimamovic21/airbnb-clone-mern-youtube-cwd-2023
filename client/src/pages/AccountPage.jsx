import { useContext, useState } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { CgProfile } from 'react-icons/cg';
import { CiCircleList } from 'react-icons/ci';
import { HiHomeModern } from 'react-icons/hi2';
import { UserContext } from '../context/UserContext';
import axios from 'axios';
import PlacesPage from './PlacesPage';

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
    let classes = 'flex items-center gap-1 py-2 px-6 rounded-full';

    if (type === subpage) {
      classes += ' bg-primary text-white';
    } else {
      classes += ' bg-gray-200';
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
          <CgProfile />
          <span>My profile</span>
        </Link>

        <Link
          to='/account/bookings'
          className={linkClasses('bookings')}
        >
          <CiCircleList />
          <span>My bookings</span>
        </Link>

        <Link
          to='/account/places'
          className={linkClasses('places')}
        >
          < HiHomeModern />
          <span>My accommodations</span>
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

      {subpage === 'places' && (
        <PlacesPage />
      )}
    </div>
  );
};

export default AccountPage;