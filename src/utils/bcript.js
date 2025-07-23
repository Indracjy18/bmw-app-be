import bcrypt from "bcryptjs";

const saltRounds = 10;

//  Enkripsi password (async)
export const encryptPassword = async (password) => {
  const hashed = await bcrypt.hash(password, saltRounds);
  return hashed;
};

// cek password (async)
export const comparePassword = async (password, hashedPassword) => {
  const isMatch = await bcrypt.compare(password, hashedPassword);
  return isMatch;
};
