import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { CiCreditCard1 } from 'react-icons/ci';
import axios from 'axios';
import AccountNav from '../components/AccountNav';
import PlaceImg from '../components/PlaceImg';
import BookingDates from '../components/BookingDates';

const BookingsPage = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    axios.get('/bookings').then(response => {
      setBookings(response.data);
    });
  }, []);

  return (
    <div>
      <AccountNav />

      <div>
        {bookings?.length > 0 && bookings?.map(booking => (
          <Link
            key={booking._id}
            to={`/account/bookings/${booking._id}`} className='flex gap-4 bg-gray-200 rounded-2xl overflow-hidden'
          >
            <div className='w-48'>
              <PlaceImg place={booking.place} />
            </div>

            <div className='py-3 pr-3 grow'>
              <h2 className='text-xl'>
                {booking.place.title}
              </h2>

              <div className='text-xl'>
                <BookingDates
                  booking={booking}
                  className='mb-2 mt-4 text-gray-500'
                />

                <div className='flex items-center gap-1'>
                  <CiCreditCard1 />
                  <span className='text-2xl'>
                    Total price: ${booking.price}
                  </span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default BookingsPage;