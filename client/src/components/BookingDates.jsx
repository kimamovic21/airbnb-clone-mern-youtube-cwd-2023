import { differenceInCalendarDays, format } from 'date-fns';
import { IoMoonOutline } from 'react-icons/io5';
import { FaRegCalendarAlt, FaLongArrowAltRight } from 'react-icons/fa';

const BookingDates = ({ booking, className }) => {
  return (
    <div className={'flex gap-1 ' + className}>

      <p className='flex items-center gap-1'>
        <IoMoonOutline />
        <span>
          {differenceInCalendarDays(
            new Date(booking.checkOut),
            new Date(booking.checkIn)
          )}
        </span>
        <span>nights:</span>
      </p>

      <div className='flex items-center gap-2'>
        <div className='flex gap-1 items-center ml-2'>
          <FaRegCalendarAlt />
          {format(new Date(booking.checkIn), 'yyyy-MM-dd')}
        </div>

        <FaLongArrowAltRight />

        <div className='flex gap-1 items-center'>
          <FaRegCalendarAlt />
          {format(new Date(booking.checkOut), 'yyyy-MM-dd')}
        </div>
      </div>
    </div>
  );
};

export default BookingDates;