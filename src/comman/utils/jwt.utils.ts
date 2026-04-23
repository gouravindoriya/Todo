import jwt from "jsonwebtoken"

export const generateAccessToken = (payload: object): string => {
  const secret = process.env.JWT_ACCESS_SECRET;
  if (!secret) {
    throw new Error("JWT_ACCESS_SECRET is not defined");
  }
  return jwt.sign(payload, secret);
};



export const verifyAccessToken = (token: string):any => {
  const secret = process.env.JWT_ACCESS_SECRET;

  if (!secret) {
    throw new Error("JWT_ACCESS_SECRET is not defined");
  }
  return (jwt.verify(token, secret))
};