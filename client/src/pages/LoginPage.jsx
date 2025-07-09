import { useContext, useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { UserContext } from '../context/UserContext';
import axios from 'axios';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [redirect, setRedirect] = useState(false);

  const { setUser } = useContext(UserContext);

  const handleLoginUser = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('/login', {
        email,
        password
      });

      setUser(response.data);

      toast.success('Login successful.');

      setRedirect(true);
    } catch (error) {
      console.error(e);
      toast.error('Login failed.');
    };
  };

  if (redirect) {
    return <Navigate to={'/'} />
  };

  return (
    <div className='mt-4 grow flex items-center justify-around'>
      <div className='mb-32'>
        <h2 className='text-4xl text-center mb-4'>
          Login
        </h2>

        <form
          className='max-w-md mx-auto'
          onSubmit={handleLoginUser}
        >
          <input
            type='email'
            placeholder='Your email address'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type='password'
            placeholder='Your password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button className='primary mt-2'>
            Login
          </button>

          <div className='text-center py-2 text-gray-500'>
            <span>
              Don&apos;t have an account yet ?
            </span>
            <Link
              to='/register'
              className='ml-1 underline text-black'
            >
              Register now
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;