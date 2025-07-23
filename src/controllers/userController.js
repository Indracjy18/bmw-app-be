import { comparePassword, encryptPassword } from "../utils/bcript.js";
import prisma from "../utils/client.js";
import {
  userUpdateValidation,
  userValidation,
} from "../validation/userValidation.js";
import { generateAccessToken, generateRefreshToken } from "../utils/jwt.js";

export const createUser = async (req, res) => {
  const { error, value } = userValidation(req.body);
  if (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
  try {
    const result = await prisma.user.create({
      data: {
        email: value.email,
        password: await encryptPassword(value.password),
      },
    });
    result.password = "xxxxxxxxxxxxxxxxxxx";
    return res.status(200).json({
      message: "User created successfully",
      result,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error creating user",
    });
  }
};

export const updateUser = async (req, res) => {
  const user = await prisma.user.findUnique({
    where: {
      id: Number(req.params.id),
    },
  });
  if (!user) {
    return res.status(400).json({
      message: "User not found",
      result: null,
    });
  }
  //data validation
  const { error, value } = userUpdateValidation(req.body);
  if (error) {
    return res.status(400).json({
      message: error.message,
      result: null,
    });
  }
  let pass = user.password;
  if (value.password && value.password.length > 0) {
    pass = await encryptPassword(value.password);
  }
  try {
    const result = await prisma.user.update({
      where: {
        id: Number(req.params.id),
      },
      data: {
        email: value.email,
        password: pass,
      },
    });
    result.password = "xxxxxxxxxxxxxxxx";
    return res.status(200).json({
      message: "User updated successfully",
      result,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error updating user",
      result: null,
    });
  }
};

export const loginUser = async (req, res) => {
  try {
    const result = await prisma.user.findUnique({
      where: {
        email: req.body.email,
      },
    });

    if (!result) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const isMatch = await comparePassword(req.body.password, result.password);

    if (!isMatch) {
      return res.status(401).json({
        message: "Password is incorrect",
      });
    }

    // Password cocok
    result.password = "xxxxxxxxxxxxxxxxxx";
    const accessToken = generateAccessToken(result);
    const refreshToken = generateRefreshToken(result);

    return res.status(200).json({
      message: "User logged in successfully",
      result,
      accessToken,
      refreshToken,
    });
  } catch (error) {
    console.error("Login error:", error); // debug ke terminal
    return res.status(500).json({
      message: "Error logging in user",
      result: null,
      error: error.message,
    });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const result = await prisma.user.delete({
      where: {
        id: Number(req.params.id),
      },
    });
    result.password = "xxxxxxxxxxxxxxxxxxxxxxx";
    return res.status(200).json({
      message: "User deleted successfully",
      result,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error deleting user",
    });
  }
};
