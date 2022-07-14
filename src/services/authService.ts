import bcrypt from "bcrypt";

import { conflictError } from "../middlewares/handleErrorsMiddleware.js";
import * as userRepository from "../repositories/userRepository.js";

export async function addNewUser(userInfo: userRepository.CreateUserData) {
  const SALT = 10;
  const userRegistred = await userRepository.findByEmail(userInfo.email);
  if (!!userRegistred) {
    throw conflictError("Email already registred!");
  }

  const hashPassword = bcrypt.hashSync(userInfo.password, SALT);
  userInfo.password = hashPassword;

  await userRepository.insert(userInfo);
}
