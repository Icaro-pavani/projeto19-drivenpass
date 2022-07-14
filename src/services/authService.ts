import bcrypt from "bcrypt";

import { conflictError } from "../middlewares/handleErrorsMiddleware.js";
import * as userRepository from "../repositories/userRepository.js";

export async function addNewUser(userInfo: userRepository.CreateUserData) {
  const userRegistred = await userRepository.findByEmail(userInfo.email);
  if (!!userRegistred) {
    throw conflictError("Email already registred!");
  }

  await userRepository.insert(userInfo);
}
