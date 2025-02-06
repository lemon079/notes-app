import jwt from "jsonwebtoken";
import dotenv from 'dotenv'
dotenv.config();

const secretKey = process.env.SECRET_KEY

function createToken(user) {
  return jwt.sign(
    {
      username: user.username,
      id: user._id
    },
    secretKey,
    {expiresIn: '1d'}
  );
}

function verifyToken(token) {
    try{
        return jwt.verify(token, secretKey);
    }
    catch{
        return null;
    }
}

export { createToken, verifyToken };
