import { useState } from 'react';
import { FaCloudUploadAlt } from 'react-icons/fa';
import axios from 'axios';

const PhotosUploader = ({ addedPhotos, setAddedPhotos }) => {
  const [photoLink, setPhotoLink] = useState('');

  const handleAddPhotoByLink = async (e) => {
    e.preventDefault();
    const { data: filename } = await axios.post('/upload-by-link', { link: photoLink });

    setAddedPhotos((prevValue) => {
      return [...prevValue, filename];
    });

    setPhotoLink('');
  };

  const handleUploadPhoto = (e) => {
    const files = e.target.files;

    const data = new FormData();

    for (let i = 0; i < files.length; i++) {
      data.append('photos', files[i]);
    };

    axios.post('/upload', data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      }
    }).then((res) => {
      const { data: filenames } = res;

      setAddedPhotos((prevValue) => {
        return [...prevValue, ...filenames];
      });
    });
  };

  const getCleanImageUrl = (imageLink) => {
    let cleaned = imageLink.replace(/\\/g, '/');

    if (cleaned.startsWith('uploads/')) {
      cleaned = cleaned.substring('uploads/'.length);
    };

    return `http://localhost:4000/uploads/${cleaned}`;
  };

  return (
    <>
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
          <div key={imageLink} className='h-32 flex'>
            <img
              src={getCleanImageUrl(imageLink)}
              alt='Uploaded place photo'
              className='object-cover'
            />
          </div>
        ))}

        <label className='h-32 cursor-pointer flex items-center gap-2 border bg-transparent rounded-2xl p-2 text-2xl text-gray-600'>
          <input
            type='file'
            className='hidden'
            multiple
            onChange={handleUploadPhoto}
          />
          <FaCloudUploadAlt />
          <span>Upload</span>
        </label>
      </div>
    </>
  );
};

export default PhotosUploader;