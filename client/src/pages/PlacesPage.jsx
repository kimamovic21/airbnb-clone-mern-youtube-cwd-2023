import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MdOutlineAddHomeWork } from 'react-icons/md';
import AccountNav from '../components/AccountNav';
import axios from 'axios';

const PlacesPage = () => {
  const [places, setPlaces] = useState([]);

  useEffect(() => {
    axios.get('/user-places').then(({ data }) => {
      setPlaces(data);
    });
  }, []);

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

      <div className='mt-4'>
        {places.length > 0 && places?.map((place) => {
          return (
            <Link
              to={`/account/places/${place._id}`}
              key={place._id}
              className='flex flex-col md:flex-row cursor-pointer gap-4 bg-gray-100 p-4 rounded-2xl'
            >
              <div className='flex bg-gray-300'>
                {place.photos.length > 0 && (
                  <img
                    src={'http://localhost:4000/' + place.photos[0].replace(/\\/g, '/')}
                    alt={place.title}
                    className='object-cover rounded-sm'
                  />
                )}
              </div>

              <div>
                <h2 className='text-xl font-bold'>
                  {place.title}
                </h2>
                <p className='mt-2 text-sm text-justify'>
                  {place.description}
                </p>
              </div>
            </Link>
          )
        })}
      </div>
    </div>
  );
};

export default PlacesPage;