import jwt from "jsonwebtoken";

export const generateToken = (user) => {
  console.log(process.env.JWT_SECRET);
  return jwt.sign({ user }, process.env.JWT_SECRET, { expiresIn: '24h' });
}