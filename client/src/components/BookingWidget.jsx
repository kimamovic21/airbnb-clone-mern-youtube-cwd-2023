import { useState, useContext, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { differenceInCalendarDays } from 'date-fns';
import { toast } from 'react-toastify';
import { UserContext } from '../context/UserContext';
import axios from 'axios';

const BookingWidget = ({ place }) => {
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [numberOfGuests, setNumberOfGuests] = useState(1);
  const [guestName, setGuestName] = useState('');
  const [phone, setPhone] = useState('');
  const [redirect, setRedirect] = useState(false);

  const { user } = useContext(UserContext);

  useEffect(() => {
    if (user) {
      setGuestName(user.name);
    };
  }, [user]);

  let numberOfNights = 0;

  if (checkIn && checkOut) {
    numberOfNights = differenceInCalendarDays(
      new Date(checkOut), new Date(checkIn)
    );
  };

  const totalBookingPrice = numberOfNights * place.price;

  const handleBookPlace = async () => {
    const data = {
      place: place._id,
      checkIn,
      checkOut,
      numberOfGuests,
      guestName,
      phone,
      price: totalBookingPrice
    };

    try {
      const response = await axios.post('/bookings', data);

      const bookingId = response.data._id;

      setRedirect(`/account/bookings/${bookingId}`);

      toast.success('Successfully booked.');
    } catch (e) {
      if (e.response && e.response.status === 409) {
        toast.error(e.response.data.message);
      } else {
        console.error(e);
        toast.error('Something went wrong. Please try again.');
      };
    };
  };

  if (redirect) {
    return <Navigate to={redirect} />
  };

  return (
    <div className='bg-white shadow p-4 rounded-2xl'>
      <div className='text-2xl text-center'>
        <span className='mr-1'>Price:</span>
        <span className='mr-1'>{place.price}</span>
        <span>/ per night</span>
      </div>

      <div className='border rounded-2xl mt-4'>
        <div className='flex'>
          <div className='my-4 py-3 px-4'>
            <label>Check in:</label>
            <input
              required
              type='date'
              value={checkIn}
              onChange={(e) => setCheckIn(e.target.value)}
            />
          </div>

          <div className='my-4 py-3 px-4 mb-4 border-l'>
            <label>Check out:</label>
            <input
              required
              type='date'
              value={checkOut}
              onChange={(e) => setCheckOut(e.target.value)}
            />
          </div>
        </div>

        <div className='my-4 py-3 px-4 mb-4 border-t'>
          <label>Number of guests:</label>
          <input
            required
            type='number'
            value={numberOfGuests}
            onChange={(e) => setNumberOfGuests(e.target.value)}
          />
        </div>

        {numberOfNights > 0 && (
          <div className='py-3 px-4 border-t'>
            <label>Your full name:</label>
            <input
              required
              type='text'
              placeholder='John Doe'
              value={guestName}
              onChange={(e) => setGuestName(e.target.value)}
            />
            <label>Phone number:</label>
            <input
              required
              type='tel'
              placeholder='John Doe'
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
        )}
      </div>

      {user ? (
        <button
          className='primary mt-4'
          onClick={handleBookPlace}
        >
          <span>Book this place:</span>
          {numberOfNights > 0 && (
            <>
              <span className='ml-1'>$</span>
              <span>{totalBookingPrice}</span>
            </>
          )}
        </button>
      ) : (
        <div className='mt-4 text-center text-red-500 font-semibold'>
          Please log in to book this place.
        </div>
      )}
    </div>
  );
};

export default BookingWidget;