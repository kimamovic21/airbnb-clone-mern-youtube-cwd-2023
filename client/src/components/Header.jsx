import { FaAirbnb } from 'react-icons/fa';
import { CiSearch, CiUser } from 'react-icons/ci';
import { GiHamburgerMenu } from 'react-icons/gi';

const Header = () => {
  return (
    <header className='p-4 flex items-center justify-between'>
      <a href='/' className='flex items-center gap-1'>
        <FaAirbnb />
        <span className='font-bold text-xl'>
          Airbnb
        </span>
      </a>

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

      <div className='flex gap-2 items-center border border-gray-300 rounded-full py-2 px-4 shadow-md shadow-gray-500'>
        <GiHamburgerMenu />
        <div className='bg-gray-500 text-white rounded-full p-1 border border-gray-500'>
          <CiUser />
        </div>
      </div>
    </header>
  );
};

export default Header;