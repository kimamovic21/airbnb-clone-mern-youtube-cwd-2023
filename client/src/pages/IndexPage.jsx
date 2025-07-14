import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const IndexPage = () => {
  const [places, setPlaces] = useState([]);

  useEffect(() => {
    axios.get('/places').then((res) => {
      setPlaces(res.data);
    })
  }, []);

  const getImageUrl = (imagePath) => {
    const cleaned = imagePath.replace(/\\/g, '/').replace(/^uploads\//, '');
    return `http://localhost:4000/uploads/${cleaned}`;
  };

  return (
    <div className='mt-8 grid gap-x-6 gap-y-8 grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
      {places.length > 0 && places?.map(place => {
        return (
          <Link
            key={place._id}
            to={`/place/${place._id}`}
            className='bg-gray-200 px-1 rounded-xl'
          >
            <div className='bg-gray-500 mb-2 rounded-2xl flex'>
              {place.photos?.[0] && (
                <img
                  src={getImageUrl(place.photos[0])}
                  alt={place.title}
                  className='rounded-2xl object-cover aspect-square'
                />
              )}
            </div>

            <h2 className='font-bold'>
              {place.address}
            </h2>

            <h3 className='text-sm text-gray-500 '>
              {place.title}
            </h3>

            <div className='mt-2'>
              <span className='font-bold mr-1'>${place.price}</span>
              <span>per night</span>
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export default IndexPage;