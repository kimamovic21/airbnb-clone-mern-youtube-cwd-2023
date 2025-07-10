import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { FaAirbnb } from 'react-icons/fa';
import { CiSearch, CiUser } from 'react-icons/ci';
import { GiHamburgerMenu } from 'react-icons/gi';
import { UserContext } from '../context/UserContext';

const Header = () => {
  const { user } = useContext(UserContext);

  return (
    <header className='flex items-center justify-between'>
      <Link to='/' className='flex items-center gap-1'>
        <FaAirbnb />
        <span className='font-bold text-xl'>
          Airbnb
        </span>
      </Link>

      <div className='flex gap-2 border border-gray-300 rounded-full py-2 px-4 shadow-md shadow-gray-500'>
        <div>Anywhere</div>

        <div className='border border-l border-gray-300' />

        <div>Any week</div>

        <div className='border border-l border-gray-300' />

        <div>Add guests</div>

        <button className='bg-primary text-white p-2 rounded-full'>
          <CiSearch />
        </button>
      </div>

      <Link
        to={user ? '/account' : '/login'}
        className='flex gap-2 items-center border border-gray-300 rounded-full py-2 px-4 shadow-md shadow-gray-500'
      >
        <GiHamburgerMenu />
        <div className='bg-gray-500 text-white rounded-full p-1 border border-gray-500'>
          <CiUser />
        </div>

        {!!user && (
          <div>
            {user.name}
          </div>
        )}
      </Link>
    </header>
  );
};

export default Header;