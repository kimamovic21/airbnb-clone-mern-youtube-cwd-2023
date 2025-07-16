const Image = ({ src, ...rest }) => {
  if (!src) return null;

  const cleanedSrc = src.replace(/\\/g, '/');

  const fullSrc = cleanedSrc.startsWith('http')
    ? cleanedSrc
    : `http://localhost:4000/uploads/${cleanedSrc.replace(/^uploads\//, '')}`;

  return (
    <img
      {...rest}
      src={fullSrc}
      alt=''
    />
  );
};

export default Image;