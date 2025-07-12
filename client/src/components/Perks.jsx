import {
  FaWifi,
  FaParking,
  FaTv,
} from 'react-icons/fa';
import {
  MdOutlinePets,
  MdDoorSliding
} from 'react-icons/md';
import { FaRadio } from 'react-icons/fa6';

const Perks = ({ perks, setPerks }) => {
  const handleCheckboxClick = (e) => {
    const { checked, name } = e.target;
    if (checked) {
      setPerks([...perks, name]);
    } else {
      setPerks([...perks.filter(selectedName => selectedName !== name)]);
    };
  };

  return (
    <>
      <h2 className='text-2xl mt-4'>
        Perks
      </h2>

      <p className='text-gray-500 text-sm'>
        Select all the perks of your place
      </p>

      <div className='mt-2 grid gap-2 grid-cols-2 md:grid-cols-3 lg:grid-cols-6'>
        <label className='border p-4 flex rounded-2xl gap-2 items-center'>
          <input
            name='wifi'
            type='checkbox'
            onChange={handleCheckboxClick}
          />
          <FaWifi />
          <span>WiFi</span>
        </label>

        <label className='border p-4 flex rounded-2xl gap-2 items-center'>
          <input
            name='parking'
            type='checkbox' />
          <FaParking />
          <span>Free parking spot</span>
        </label>

        <label className='border p-4 flex rounded-2xl gap-2 items-center'>
          <input
            name='tv'
            type='checkbox'
          />
          <FaTv />
          <span>TV</span>
        </label>

        <label className='border p-4 flex rounded-2xl gap-2 items-center'>
          <input
            name='radio'
            type='checkbox'
          />
          <FaRadio />
          <span>Radio</span>
        </label>

        <label className='border p-4 flex rounded-2xl gap-2 items-center'>
          <input
            name='pets'
            type='checkbox'
          />
          <MdOutlinePets />
          <span>Pets</span>
        </label>

        <label className='border p-4 flex rounded-2xl gap-2 items-center'>
          <input
            name='entrance'
            type='checkbox'
          />
          <MdDoorSliding />
          <span>Private entrance</span>
        </label>
      </div>
    </>
  );
};

export default Perks;