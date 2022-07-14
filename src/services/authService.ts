import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import {
  conflictError,
  unauthorizedError,
} from "../middlewares/handleErrorsMiddleware.js";
import * as userRepository from "../repositories/userRepository.js";

export async function addNewUser(userInfo: userRepository.CreateUserData) {
  const SALT: number = 10;
  const userRegistred = await userRepository.findByEmail(userInfo.email);
  if (!!userRegistred) {
    throw conflictError("Email already registred!");
  }

  const hashPassword = bcrypt.hashSync(userInfo.password, SALT);
  userInfo.password = hashPassword;

  await userRepository.insert(userInfo);
}

export async function confirmAndLoginUser(
  userInfo: userRepository.CreateUserData
) {
  const user = await userRepository.findByEmail(userInfo.email);

  if (!user) {
    throw unauthorizedError("Unregistred e-mail!");
  }
  if (!bcrypt.compareSync(userInfo.password, user.password)) {
    throw unauthorizedError("Wrong password!");
  }

  const secretKey = process.env.JWT_KEY;
  delete user.password;
  const token = jwt.sign(user, secretKey);

  return token;
}
