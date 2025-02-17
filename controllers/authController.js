import { StatusCodes } from "http-status-codes";
import User from "../models/UserModel.js";
import { hashPassword ,comparePassword} from "../utils/passwordUtils.js";
import { UnauthenticatedError } from "../errors/customErrors.js";
import { createJWT } from "../utils/tokenUtils.js";

export const register = async (req, res) => {
  const isFirstAccount = (await User.countDocuments()) === 0;
  req.body.role = isFirstAccount ? 'admin' : 'user';
  const hashedPassword = await hashPassword(req.body.password);
  req.body.password = hashedPassword;
  const user = await User.create(req.body);
  res.status(StatusCodes.CREATED).json({ message: `User ${user.name} ${user.lastName} created successfully` });
}

export const login = async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) throw new UnauthenticatedError("Invalid credentials");
  const isPasswordCorrect = await comparePassword(req.body.password, user.password);
  if (!isPasswordCorrect) throw new UnauthenticatedError("Invalid credentials");
  const token = createJWT({ userId: user._id,role:user.role });

  const jwtExpireTime = 1000 * 60 * 60 * 24 * parseInt(process.env.JWT_EXPIRES_IN,10);
  res.cookie("token", token, {
    httpOnly: true,
    expires: new Date(Date.now() + jwtExpireTime),
    secure: process.env.NODE_ENV === "production",
  });
  res.status(StatusCodes.OK).json({ message: "Login successful"});
}

export const logout = async (req, res) => {
  res.cookie("token","logout",{
    httpOnly:true,
    expires:new Date(Date.now())
  });
  res.status(StatusCodes.OK).json({ message: "User Logged out successful!" });
}