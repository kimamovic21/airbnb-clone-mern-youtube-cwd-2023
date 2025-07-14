import { useEffect, useState } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
import Perks from '../components/Perks';
import PhotosUploader from '../components/PhotosUploader';
import AccountNav from '../components/AccountNav';

const PlacesFormPage = () => {
  const { id } = useParams();

  const [title, setTitle] = useState('');
  const [address, setAddress] = useState('');
  const [addedPhotos, setAddedPhotos] = useState([]);
  const [description, setDescription] = useState('');
  const [perks, setPerks] = useState([]);
  const [extraInfo, setExtraInfo] = useState('');
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [maxGuests, setMaxGuests] = useState(2);
  const [price, setPrice] = useState(0);
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    if (!id) {
      return;
    };

    axios.get(`/places/${id}`)
      .then((res) => {
        const { data } = res;

        setTitle(data.title);
        setAddress(data.address);
        setAddedPhotos(data.photos);
        setDescription(data.description);
        setPerks(data.perks);
        setExtraInfo(data.extraInfo);
        setCheckIn(data.checkIn);
        setCheckOut(data.checkOut);
        setMaxGuests(data.maxGuests);
        setPrice(data.price);
      })
  }, [id]);

  const handleSavePlace = async (e) => {
    e.preventDefault();

    const placeData = {
      title,
      address,
      addedPhotos,
      description,
      perks,
      extraInfo,
      checkIn,
      checkOut,
      maxGuests,
      price
    };

    if (id) {
      try {
        await axios.put('/places', {
          id,
          ...placeData
        });

        toast.success('Property updated successfully.');

        setRedirect(true);
      } catch (e) {
        console.error(e);
        toast.error(e);
      };
    } else {
      try {
        await axios.post('/places', placeData);

        toast.success('Property created successfully.');

        setRedirect(true);
      } catch (e) {
        console.error(e);
        toast.error(e);
      };
    };
  };

  if (redirect) {
    return <Navigate to='/account/places' />
  };

  return (
    <div>
      <AccountNav />
      <form onSubmit={handleSavePlace}>
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

        <PhotosUploader
          addedPhotos={addedPhotos}
          setAddedPhotos={setAddedPhotos}
        />

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

        <Perks
          perks={perks}
          setPerks={setPerks}
        />

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

        <div className='grid gap-2 grid-cols-2 md:grid-cols-4'>
          <div>
            <h3 className='mt-2 -mb-1'>
              Check in time
            </h3>
            <input
              type='number'
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
              type='number'
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
              type='number'
              placeholder='2,3,4...'
              value={maxGuests}
              onChange={(e) => setMaxGuests(e.target.value)}
            />
          </div>

          <div>
            <h3 className='mt-2 -mb-1'>
              Price per night
            </h3>
            <input
              type='number'
              placeholder='$99'
              value={price}
              onChange={(e) => setPrice(e.target.value)}
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
  );
};

export default PlacesFormPage;