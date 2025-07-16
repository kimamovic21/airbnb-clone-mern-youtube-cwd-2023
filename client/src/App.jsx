import { Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { UserContextProvider } from './context/UserContext';
import axios from 'axios';

import Layout from './components/Layout';
import PrivateRoute from './components/PrivateRoute';

import IndexPage from './pages/IndexPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import AccountPage from './pages/AccountPage';
import PlacesPage from './pages/PlacesPage';
import PlacesFormPage from './pages/PlacesFormPage';
import PlacePage from './pages/PlacePage';
import BookingsPage from './pages/BookingsPage';
import BookingPage from './pages/BookingPage';

axios.defaults.baseURL = 'http://localhost:4000';
axios.defaults.withCredentials = true;

const App = () => {
  return (
    <>
      <UserContextProvider>
        <Routes>
          <Route path='/' element={<Layout />}>
            <Route index element={<IndexPage />} />
            <Route path='/login' element={<LoginPage />} />
            <Route path='/register' element={<RegisterPage />} />
            <Route path='/places/:id' element={<PlacePage />} />

            <Route
              path='/account'
              element={
                <PrivateRoute>
                  <AccountPage />
                </PrivateRoute>
              }
            />
            <Route
              path='/account/places'
              element={
                <PrivateRoute>
                  <PlacesPage />
                </PrivateRoute>
              }
            />
            <Route
              path='/account/places/new'
              element={
                <PrivateRoute>
                  <PlacesFormPage />
                </PrivateRoute>
              }
            />
            <Route
              path='/account/places/:id'
              element={
                <PrivateRoute>
                  <PlacesFormPage />
                </PrivateRoute>
              }
            />
            <Route
              path='/account/bookings'
              element={
                <PrivateRoute>
                  <BookingsPage />
                </PrivateRoute>
              }
            />
            <Route
              path='/account/bookings/:id'
              element={
                <PrivateRoute>
                  <BookingPage />
                </PrivateRoute>
              }
            />
          </Route>
        </Routes>
        <ToastContainer />
      </UserContextProvider>
    </>
  );
};

export default App;