// routes/auth.js
import express from 'express';
import { jwtDecode } from "jwt-decode";
import { generateToken, verifyToken, hashPassword, comparePasswords } from '../utils/auth.js';
import User from '../models/User.js';

const router = express.Router();

router.post('/login', async (req, res) => {
  if (req.body.isGoogleAuthentication) {
    const { isGoogleAuthentication, userName, email } = req.body;
    try {
      const foundUser = await User.findOne({ email });
      if (!foundUser) {
        return res.status(401).json({ error: 'User not found' });
      }

      if (foundUser.userType === 'Customer') {
        return res.status(401).json({ error: 'Invalid user type for login' });
      }

      const token = generateToken({ userId: foundUser._id, userName, picture: foundUser.picture});

      // Add isAdmin flag to the response if the user is an admin
      const responsePayload = {
        id: foundUser._id,
        isAdmin: foundUser.email === 'admin@bizetel.com', // Change this condition as needed
      };

      res.cookie('token', token, {
        sameSite: 'none',
        secure: true,
      }).status(201).json(responsePayload);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
  else {
    const { email, password } = req.body;
    try {
      const foundUser = await User.findOne({ email });
      if (!foundUser) {
        return res.status(401).json({ error: 'User not found' });
      }

      const passOk = comparePasswords(password, foundUser.password);
      if (!passOk) {
        return res.status(401).json({ error: 'Invalid password' });
      }

      if (foundUser.userType === 'Customer') {
        return res.status(401).json({ error: 'Invalid user type for login' });
      }

      const token = generateToken({ userId: foundUser._id, userName, picture: foundUser.picture });

      // Add isAdmin flag to the response if the user is an admin
      const responsePayload = {
        id: foundUser._id,
        isAdmin: foundUser.email === 'admin@bizetel.com', // Change this condition as needed
        userName: foundUser.userName,
        picture: foundUser.picture,
      };

      res.cookie('token', token, {
        sameSite: 'none',
        secure: true,
      }).status(201).json(responsePayload);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

});

router.post('/register', async (req, res) => {
  if (req.body.isGoogleAuthentication) {
    const { isGoogleAuthentication, userName, firstName, lastName, email, picture } = req.body;
    console.log("isgoogle: ", isGoogleAuthentication, "name", userName, "firstName: ", firstName, "lastname: ", lastName, " email: ", email, "picture: ", picture);
    try {
      const existingUser = await User.findOne({ email });

      if (existingUser) {
        return res.status(400).json({ errors: [{ msg: 'Email already exists' }] });
      }

      const createdUser = await User.create({ userName, firstName, lastName, email, picture });

      const token = generateToken({ userId: createdUser._id, userName, picture });

      res.cookie('token', token, { sameSite: 'none', secure: true }).status(201).json({
        id: createdUser._id,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  } else {
    console.log("isNotGoogleAuthenticaiton")
    const { userName, firstName, lastName, email, password } = req.body;
    try {
      const existingUser = await User.findOne({ email });

      if (existingUser) {
        return res.status(400).json({ errors: [{ msg: 'Email already exists' }] });
      }
      const picture = "";
      const hashedPassword = hashPassword(password);
      const createdUser = await User.create({ userName, firstName, lastName, email, password: hashedPassword, picture });

      const token = generateToken({ userId: createdUser._id, userName, picture });

      res.cookie('token', token, { sameSite: 'none', secure: true }).status(201).json({
        id: createdUser._id,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
});

router.post('/logout', (req, res) => {
  res.cookie('token', '', {
    sameSite: 'none',
    secure: true,
  }).json('ok');
});

export default router;
