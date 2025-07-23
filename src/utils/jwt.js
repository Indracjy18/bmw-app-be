import JsonWebToken from "jsonwebtoken";
import "dotenv/config";

//  Generate Access Token
const generateAccessToken = (user) => {
  return JsonWebToken.sign(
    {
      id: user.id,
      email: user.email,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRES_IN || "7d",
    }
  );
};

// Verify Access Token
const verifyAccesToken = (token) => {
  try {
    return JsonWebToken.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    return null; // Jangan return error langsung
  }
};

//  Generate Refresh Token
const generateRefreshToken = (user) => {
  return JsonWebToken.sign(
    {
      id: user.id,
      email: user.email,
    },
    process.env.JWT_REFRESH_SECRET,
    {
      expiresIn: process.env.JWT_REFRESH_EXPIRES_IN || "7d",
    }
  );
};

//  Verify Refresh Token
const verifyRefreshToken = (token) => {
  try {
    return JsonWebToken.verify(token, process.env.JWT_REFRESH_SECRET);
  } catch (error) {
    return null;
  }
};

//  Decode JWT (tanpa verifikasi, hanya untuk debug)
const parseJWT = (token) => {
  try {
    return JSON.parse(Buffer.from(token.split(".")[1], "base64").toString());
  } catch (error) {
    return null;
  }
};

export {
  generateAccessToken,
  verifyAccesToken,
  generateRefreshToken,
  verifyRefreshToken,
  parseJWT,
};
