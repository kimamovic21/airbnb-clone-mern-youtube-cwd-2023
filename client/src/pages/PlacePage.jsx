import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { IoMdPhotos, IoIosClose } from 'react-icons/io';
import { IoLocationOutline } from 'react-icons/io5';

import axios from 'axios';
import BookingWidget from '../components/BookingWidget';

const PlacePage = () => {
  const { id } = useParams();

  const [place, setPlace] = useState([]);
  const [showAllPhotos, setShowAllPhotos] = useState(false);

  useEffect(() => {
    if (!id) {
      return;
    };

    axios.get(`/places/${id}`)
      .then((res) => {
        setPlace(res.data);
      });
  }, [id]);

  if (!place) return null;

  const getImageUrl = (imagePath) => {
    const cleaned = imagePath.replace(/\\/g, '/').replace(/^uploads\//, '');
    return `http://localhost:4000/uploads/${cleaned}`;
  };

  if (showAllPhotos) {
    return (
      <div className='absolute inset-0 text-white bg-black min-h-screen'>
        <div className='bg-black p-8 grid gap-4'>
          <div>
            <h2 className='text-3xl mr-64'>
              Photos of {place.title}
            </h2>
            <button
              className='fixed right-12 top-8 flex items-center gap-1 py-2 px-4 rounded-2xl shadow-black text-black bg-white'
              onClick={() => setShowAllPhotos(false)}
            >
              <IoIosClose className='text-2xl' />
              <span>Close photos</span>
            </button>
          </div>
          {place?.photos?.length > 0 && place?.photos?.map(photo => {
            return (
              <div>
                <img
                  src={getImageUrl(photo)}
                  alt={place.title}
                  className='aspect-square object-cover w-full'
                />
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div className='mt-4 bg-gray-200 -mx-8 px-8 pt-8'>
      <h2 className='text-3xl'>
        {place.title}
      </h2>

      <a
        href={`https://maps.google.com/?q=${place.address}`}
        target='_blank'
        className='flex items-center gap-1 my-2 font-semibold underline'
      >
        <IoLocationOutline />
        <span>{place.address}</span>
      </a>

      <div className='relative'>
        <div className='grid gap-2 md:grid-cols-[2fr_1fr] rounded-3xl overflow-hidden'>
          <div>
            {place.photos?.[0] && (
              <div>
                <img
                  src={getImageUrl(place.photos[0])}
                  alt={place.title}
                  className='aspect-square object-cover'
                />

              </div>
            )}
          </div>
          <div className='grid'>
            {place.photos?.[1] && (
              <img
                src={getImageUrl(place.photos[1])}
                alt={place.title}
                className='aspect-square object-cover'
              />
            )}
            {place.photos?.[2] && (
              <div className='border overflow-hidden'>
                <img
                  src={getImageUrl(place.photos[2])}
                  alt={place.title}
                  className='aspect-square object-cover relative top-2'
                />
              </div>
            )}
          </div>
        </div>

        <button
          className='flex gap-1 items-center absolute bottom-2 right-2 py-2 px-4 bg-white rounded-2xl shadow-md shadow-gray-500'
          onClick={() => setShowAllPhotos(true)}
        >
          <span>Show more photos</span>
          <IoMdPhotos />
        </button>
      </div>

      <div className='mt-8 mb-8 grid md:grid-cols-[2fr_1fr]'>
        <div className='flex flex-col gap-2 mr-4'>
          <div className='mb-1'>
            <h2 className='font-semibold text-2xl'>
              Description
            </h2>
            <p className='text-justify'>
              {place.description}
            </p>
          </div>

          <div className='mb-2'>
            <span className='mr-1'>Check-in:</span>
            <span>{place.checkIn}</span>
            <br />
            <span className='mr-1'>Check-out:</span>
            <span>{place.checkOut}</span>
            <br />
            <span className='mr-1'>Max number of guests:</span>
            <span>{place.maxGuests}</span>
          </div>
        </div>

        <div>
          <BookingWidget place={place} />
        </div>
      </div>

      <div className='bg-white -mx-8 p-8 border-t'>
        <div>
          <h2 className='font-semibold text-2xl'>Extra info</h2>
        </div>
        <div className='mb-4 mt-2 text-sm text-gray-700 leading-4'>
          {place.extraInfo}
        </div>
      </div>
    </div>
  );
};

export default PlacePage;