import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { MdOutlineAddHomeWork } from 'react-icons/md';
import { FaCloudUploadAlt } from 'react-icons/fa';
import axios from 'axios';
import Perks from '../components/Perks';

const PlacesPage = () => {
  const { action } = useParams();

  const [title, setTitle] = useState('');
  const [address, setAddress] = useState('');
  const [addedPhotos, setAddedPhotos] = useState([]);
  const [photoLink, setPhotoLink] = useState('');
  const [description, setDescription] = useState('');
  const [perks, setPerks] = useState([]);
  const [extraInfo, setExtraInfo] = useState('');
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [maxGuests, setMaxGuests] = useState(2);

  const handleAddPhotoByLink = async (e) => {
    e.preventDefault();
    const { data: filename } = await axios.post('/upload-by-link', { link: photoLink });

    setAddedPhotos((prevValue) => {
      return [...prevValue, filename];
    });

    setPhotoLink('');
  };

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
            <input
              type='text'
              placeholder='Add your title'
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />

            <h2 className='text-2xl mt-4'>
              Address
            </h2>
            <p className='text-gray-500 text-sm'>
              Address to this place
            </p>
            <input
              type='text'
              placeholder='Add your address'
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />

            <h2 className='text-2xl mt-4'>
              Photos
            </h2>
            <p className='text-gray-500 text-sm'>
              Add more photos to this place
            </p>

            <div className='flex gap-2'>
              <input
                type='text'
                placeholder='Add using a link .... jpg'
                value={photoLink}
                onChange={(e) => setPhotoLink(e.target.value)}
              />
              <button
                className='bg-gray-200 px-4 rounded-2xl'
                onClick={handleAddPhotoByLink}
              >
                Add photo
              </button>
            </div>

            <div className='mt-2 grid gap-2 grid-cols-3 md:grid-cols-4 lg:grid-cols-6'>
              {addedPhotos.length > 0 && addedPhotos?.map((imageLink) => (
                <div key={imageLink}>
                  <img
                    src={'http://localhost:4000/uploads/' + imageLink}
                    alt='Image link'
                    className='rounded-2xl'
                  />
                </div>
              ))}
              <button className='flex items-center gap-2 border bg-transparent rounded-2xl p-2 text-2xl text-gray-600'>
                <FaCloudUploadAlt />
                <span>Upload</span>
              </button>
            </div>

            <h2 className='text-2xl mt-4'>
              Description
            </h2>
            <p className='text-gray-500 text-sm'>
              Description of the place
            </p>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />

            <Perks selected={perks} onChange={setPerks} />

            <h2 className='text-2xl mt-4'>
              Extra info
            </h2>
            <p className='text-gray-500 text-sm'>
              house rules, etc...
            </p>
            <textarea
              value={extraInfo}
              onChange={(e) => setExtraInfo(e.target.value)}
            />

            <h2 className='text-2xl mt-4'>
              Check in & out times
            </h2>
            <p className='text-gray-500 text-sm'>
              add check in and out times
            </p>

            <div className='grid gap-2 sm:grid-cols-3'>
              <div>
                <h3 className='mt-2 -mb-1'>
                  Check in time
                </h3>
                <input
                  type='text'
                  placeholder='02:00pm'
                  value={checkIn}
                  onChange={(e) => setCheckIn(e.target.value)}
                />
              </div>

              <div>
                <h3 className='mt-2 -mb-1'>
                  Check out time
                </h3>
                <input
                  type='text'
                  placeholder='12:00am'
                  value={checkOut}
                  onChange={(e) => setCheckOut(e.target.value)}
                />
              </div>

              <div>
                <h3 className='mt-2 -mb-1'>
                  Max number of guests
                </h3>
                <input
                  type='text'
                  placeholder='2,3,4...'
                  value={maxGuests}
                  onChange={(e) => setMaxGuests(e.target.value)}
                />
              </div>
            </div>

            <div className=''>
              <button className='primary my-4'>
                Save
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default PlacesPage;