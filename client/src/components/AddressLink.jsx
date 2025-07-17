import { IoLocationOutline } from 'react-icons/io5';

const AddressLink = ({ children, className = null }) => {
  if (!className) {
    className = 'my-3 block';
  };

  className += ' flex gap-1 font-semibold underline';

  return (
    <a
      href={'https://maps.google.com/?q=' + children}
      target='_blank'
      className={className}
    >
      <IoLocationOutline />
      <span>{children}</span>
    </a>
  );
};

export default AddressLink;