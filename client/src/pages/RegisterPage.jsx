import { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';

const RegisterPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [redirect, setRedirect] = useState(false);

  const handleRegisterUser = async (e) => {
    e.preventDefault();

    try {
      await axios.post('/register', {
        name,
        email,
        password
      });
      
      setRedirect(true);

      toast.success('Registration successful. Now you can log in.');
    } catch (e) {
      console.error(e);
      toast.error('Registration failed. Please try again later.');
    };
  };

  if (redirect) {
    return <Navigate to='/login' />;
  };

  return (
    <div className='mt-4 grow flex items-center justify-around'>
      <div className='mb-32'>
        <h2 className='text-4xl text-center mb-4'>
          Register
        </h2>

        <form
          className='max-w-md mx-auto'
          onSubmit={handleRegisterUser}
        >
          <input
            required
            type='text'
            placeholder='John Doe'
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            required
            type='email'
            placeholder='Your email address'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            required
            type='password'
            placeholder='Your password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button className='primary mt-2'>
            Register
          </button>

          <div className='text-center py-2 text-gray-500'>
            <span>
              Already a member ?
            </span>
            <Link
              to='/login'
              className='ml-1 underline text-black'
            >
              Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;