import { Link } from 'react-router-dom';
import { MdOutlineAddHomeWork } from 'react-icons/md';
import AccountNav from '../components/AccountNav';

const PlacesPage = () => {
  return (
    <div>
      <AccountNav />
      <div>
        <Link
          className='flex items-center w-1/4 gap-2 bg-primary text-white py-2 px-6 rounded-full'
          to='/account/places/new'
        >
          <MdOutlineAddHomeWork />
          <span>Add new place</span>
        </Link>
      </div>
    </div>
  );
};

export default PlacesPage;