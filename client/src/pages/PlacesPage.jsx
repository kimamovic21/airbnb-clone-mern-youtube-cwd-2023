import { Link, useParams } from 'react-router-dom';
import { MdOutlineAddHomeWork } from 'react-icons/md';

const PlacesPage = () => {
  const { action } = useParams();

  return (
    <div>
      {action !== 'new' && (
        <div>
          <Link
            className='flex items-center w-1/4 gap-2 bg-primary text-white py-2 px-6 rounded-full'
            to='/account/places/new'
          >
            <MdOutlineAddHomeWork />
            <span>Add new place</span>
          </Link>
        </div>
      )}
      {action === 'new' && (
        <div>
          <form>
            <h2 className='text-2xl mt-4'>
              Title
            </h2>
            <p className='text-gray-500 text-sm'>
              Title for your place
            </p>
            <input type='text' placeholder='Add your title' />

            <h2 className='text-2xl mt-4'>
              Address
            </h2>
            <p className='text-gray-500 text-sm'>
              Address to this place
            </p>
            <input type='text' placeholder='Add your address' />

            <h2 className='text-2xl mt-4'>
              Photos
            </h2>
            <p className='text-gray-500 text-sm'>
              Add more photos to this place
            </p>
            <div className='mt-2 grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6'>
              <button className='border bg-transparent rounded-2xl p-8 text-2xl text-gray-600'>
                +
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default PlacesPage;