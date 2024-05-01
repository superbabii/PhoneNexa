// utils/auth.js
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
dotenv.config();

const jwtSecret = process.env.JWT_SECRET;

export const generateToken = (userData) => {
  return jwt.sign(userData, jwtSecret, {});
};

export const hashPassword = (password) => {
  const bcryptSalt = bcrypt.genSaltSync(10);
  return bcrypt.hashSync(password, bcryptSalt);
};

export const comparePasswords = (password, hashedPassword) => {
  return bcrypt.compareSync(password, hashedPassword);
};

export const verifyToken = (token) => {
  return jwt.verify(token, jwtSecret, {});
};

export const getUserDataFromRequest = async (req) => {
    return new Promise((resolve, reject) => {
      const token = req.cookies?.token;
  
      if (token) {
        try {
          const userData = verifyToken(token);
          resolve(userData);
        } catch (error) {
          reject(error);
        }
      } else {
        reject('no token');
      }
    });
  };
