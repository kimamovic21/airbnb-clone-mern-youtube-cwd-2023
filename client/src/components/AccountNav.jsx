import { CiCircleList } from 'react-icons/ci';
import { CgProfile } from 'react-icons/cg';
import { HiHomeModern } from 'react-icons/hi2';
import { Link, useLocation } from 'react-router-dom';

const AccountNav = () => {
  const { pathname } = useLocation();

  let subpage = pathname.split('/')?.[2];
  if (subpage === undefined) {
    subpage = 'profile';
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

  return (
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
        <HiHomeModern />
        <span>My accommodations</span>
      </Link>
    </nav>
  );
};

export default AccountNav;