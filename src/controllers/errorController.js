import { verifyAccesToken } from "../utils/jwt.js";

// isAuth middleware
export const isAuth = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res
      .status(401)
      .json({ message: "Token not provided", result: null });
  }

  const user = verifyAccesToken(token);

  if (!user) {
    return res.status(401).json({ message: "Invalid token", result: null });
  }

  req.user = user; // ⬅️ Simpan payload user (id & email) ke request
  next();
};
