import fs from 'fs';
import path from 'path';
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import cookieParser from 'cookie-parser';
import imageDownloader from 'image-downloader';
import multer from 'multer';
import User from './models/User.js';
import Place from './models/Place.js';
import Booking from './models/Booking.js';
import 'dotenv/config';

const app = express();

await mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

const __dirname = path.resolve();

const bcryptSalt = bcrypt.genSaltSync(10);

const jwtSecret = process.env.JWT_SECRET;

app.use(express.json());
app.use(cookieParser());
app.use('/uploads', express.static(__dirname + '/uploads'));
app.use(cors({
  credentials: true,
  origin: 'http://localhost:5173',
}));

app.get('/test', (req, res) => {
  res.json('test ok');
});

app.post('/register', async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const newUser = await User.create({
      name,
      email,
      password: bcrypt.hashSync(password, bcryptSalt)
    });

    res.json(newUser);
  } catch (e) {
    console.error(e);
    res.status(422).json(e);
  };
});

app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  const userDoc = await User.findOne({ email });

  if (userDoc) {
    const passwordOk = bcrypt.compareSync(password, userDoc.password);

    if (passwordOk) {
      jwt.sign({
        email: userDoc.email,
        id: userDoc._id,
      }, jwtSecret, {}, (err, token) => {
        if (err) throw err;
        res.cookie('token', token).json(userDoc);
      });
    } else {
      res.status(422).json('pass not ok');
    };
  } else {
    res.json('not found');
  };
});

app.get('/profile', (req, res) => {
  const { token } = req.cookies;

  if (token) {
    jwt.verify(token, jwtSecret, {}, async (err, userData) => {
      if (err) throw err;

      const userDoc = await User.findById(userData.id);

      const { name, email, _id } = userDoc;

      res.json({ name, email, _id });
    });
  } else {
    res.json(null);
  };
});

app.post('/logout', (req, res) => {
  res.cookie('token', '').json(true);
});

app.post('/upload-by-link', async (req, res) => {
  const { link } = req.body;

  const uploadedImage = 'photo' + Date.now() + '.jpg';

  await imageDownloader.image({
    url: link,
    dest: __dirname + '/uploads/' + uploadedImage,
  });

  res.json(uploadedImage);
});

const photosMiddleware = multer({ dest: 'uploads' });

app.post('/upload', photosMiddleware.array('photos', 100), (req, res) => {
  const uploadedFiles = [];

  for (let i = 0; i < req.files.length; i++) {
    const { path, originalname } = req.files[i];
    const parts = originalname.split('.');
    const ext = parts[parts.length - 1];
    const newPath = path + '.' + ext;
    fs.renameSync(path, newPath);
    uploadedFiles.push(newPath.replace('uploads/', ''));
  };

  res.json(uploadedFiles);
});

app.post('/places', async (req, res) => {
  const { token } = req.cookies;

  const {
    title,
    address,
    addedPhotos,
    description,
    perks,
    extraInfo,
    checkIn,
    checkOut,
    maxGuests,
    price
  } = req.body;

  jwt.verify(token, jwtSecret, {}, async (err, userData) => {
    if (err) throw err;

    const newPlace = await Place.create({
      owner: userData.id,
      title,
      address,
      photos: addedPhotos,
      description,
      perks,
      extraInfo,
      checkIn,
      checkOut,
      maxGuests,
      price
    });

    res.json(newPlace);
  });
});

app.get('/user-places', async (req, res) => {
  const { token } = req.cookies;

  jwt.verify(token, jwtSecret, {}, async (err, userData) => {
    if (err) throw err;

    const { id } = userData;

    res.json(await Place.find({ owner: id }));
  });
});

app.get('/places/:id', async (req, res) => {
  const { id } = req.params;

  res.json(await Place.findById(id));
});

app.put('/places', async (req, res) => {
  const { token } = req.cookies;

  const {
    id,
    title,
    address,
    addedPhotos,
    description,
    perks,
    extraInfo,
    checkIn,
    checkOut,
    maxGuests,
    price
  } = req.body;

  jwt.verify(token, jwtSecret, {}, async (err, userData) => {
    if (err) throw err;

    const placeDoc = await Place.findById(id);

    if (userData.id === placeDoc.owner.toString()) {
      placeDoc.set({
        title,
        address,
        photos: addedPhotos,
        description,
        perks,
        extraInfo,
        checkIn,
        checkOut,
        maxGuests,
      });

      await placeDoc.save();

      res.json('ok');
    };
  });
});

app.get('/places', async (req, res) => {
  res.json(await Place.find());
});

app.post('/bookings', async (req, res) => {
  try {
    const { token } = req.cookies;

    if (!token) {
      return res.status(401).json({
        message: 'Unauthorized: No token provided'
      });
    };

    const userData = await new Promise((resolve, reject) => {
      jwt.verify(token, jwtSecret, {}, (err, decoded) => {
        if (err) reject(err);
        else resolve(decoded);
      });
    });

    const {
      place,
      checkIn,
      checkOut,
      numberOfGuests,
      guestName,
      phone,
      price
    } = req.body;

    const overlappingBooking = await Booking.findOne({
      place,
      $or: [
        {
          checkIn: { $lt: new Date(checkOut) },
          checkOut: { $gt: new Date(checkIn) },
        },
      ],
    });

    if (overlappingBooking) {
      return res.status(409).json({
        message: 'This place is already booked for the selected dates. Please choose different dates.'
      });
    };

    const booking = await Booking.create({
      user: userData.id,
      place,
      checkIn,
      checkOut,
      numberOfGuests,
      guestName,
      phone,
      price,
    });

    res.status(201).json(booking);
  } catch (error) {
    console.error('Booking creation failed:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  };
});

app.get('/bookings', async (req, res) => {
  try {
    const { token } = req.cookies;

    if (!token) {
      return res.status(401).json({
        message: 'Unauthorized: No token provided'
      });
    };

    const userData = await new Promise((resolve, reject) => {
      jwt.verify(token, jwtSecret, {}, (err, decoded) => {
        if (err) reject(err);
        else resolve(decoded);
      });
    });

    res.json(await Booking
      .find({ user: userData.id })
      .populate('place')
    );
  } catch (error) {
    console.error('Failed to fetch bookings:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  };
});

app.listen(4000);